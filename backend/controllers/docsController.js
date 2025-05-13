const fs = require("fs");
const Documentation = require("../models/docsModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const markdownpdf = require('markdown-pdf');
const htmlpdf = require('html-pdf');
const { Document, Paragraph, TextRun } = require('docx');
const fsPromises = require('fs').promises;
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Upload file and generate documentation
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileContent = fs.readFileSync(req.file.path, "utf-8");

    // AI Model - Updated model name to the current version
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
      const prompt = `Generate comprehensive technical documentation for this code:
      
      ${fileContent}
      
     # Code Analysis Template

## Code Overview
 #Purpose: [Brief description] 
 #Key Functionality: [Core capabilities]
 #Architecture: [High-level structure]
 #Technical Decisions: [Major decisions and rationale]

## Technical Analysis
### Structure & Organization
 #Module Hierarchy: [Key components and relationships]
 #Design Patterns: [Patterns employed]
 #Complexity Assessment: [Evaluation of complexity]

### Implementation Details
For key components:
- **Name & Purpose**: [Component name and function]
- **Complexity**: [Big O notation where relevant]
- **Error Handling**: [Approach to errors]
- **Data Flow**: [How data moves through the component]

### Dependencies & Integration
- **External Dependencies**: [Major libraries/systems used]
- **API Interactions**: [External service integration]
- **System Requirements**: [Runtime needs]

### Data Management
- **Data Structures**: [Key structures used]
- **State Management**: [How state is handled]
- **Data Validation**: [Validation approach]

### Security & Error Handling
- **Security Measures**: [Key protections]
- **Error Scenarios**: [Major failure modes]
- **Recovery Mechanisms**: [How failures are handled]

### Performance & Scalability
- **Optimization Techniques**: [Performance enhancements]
- **Bottlenecks**: [Performance limitations]
- **Scalability Considerations**: [Growth capability]

### Testing & Maintenance
- **Testing Approach: [Strategy for validation]
- **Edge Cases**: [Important boundary conditions]
- **Maintainability Factors**: [Code quality metrics]
- **Technical Debt**: [Areas needing improvement]

### Code Examples


### Development Guidelines
- **Coding Standards**: [Key practices]
- **Documentation Requirements**: [Documentation approach]
- **Review Checklist**: [Key verification items]`;
      // Continue with sending the prompt to API...

      const result = await model.generateContent(prompt);
      const aiGeneratedDoc = result.response.text();

      // Save to MongoDB
      const doc = new Documentation({
        filename: req.file.originalname,
        content: aiGeneratedDoc,
      });
      await doc.save();

      // Clean up the temporary file
      fs.unlinkSync(req.file.path);

      res.json({ message: "Documentation created successfully!", data: doc });
    } catch (aiError) {
      console.error("AI processing error:", aiError);
      res.status(500).json({
        error: "Failed to generate documentation with AI: " + aiError.message,
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });

    // Clean up the temporary file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};

// Fetch all generated documentation
const getAllDocs = async (req, res) => {
  try {
    const docs = await Documentation.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedDoc = await Documentation.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error("Error updating document", error);
    res.status(500).json({ error: "Failed to update document" });
  }
};

const getDocById = async (req, res) => {
  try {
    const doc = await Documentation.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching document' });
  }
};

const exportDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const { format } = req.body;
    const doc = await Documentation.findById(id);

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const tempDir = path.join(__dirname, '../temp');
    await fsPromises.mkdir(tempDir, { recursive: true });

    switch (format) {
      case 'markdown':
        // For markdown, just send the content directly
        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.md`);
        return res.send(doc.content);

      case 'pdf':
        // Convert markdown to PDF
        const pdfPath = path.join(tempDir, `${doc.filename}.pdf`);
        await new Promise((resolve, reject) => {
          markdownpdf()
            .from.string(doc.content)
            .to(pdfPath, function (err) {
              if (err) reject(err);
              else resolve();
            });
        });
        const pdfContent = await fsPromises.readFile(pdfPath);
        await fsPromises.unlink(pdfPath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.pdf`);
        return res.send(pdfContent);

      case 'html':
        // Convert markdown to HTML
        const htmlContent = markdownToHtml(doc.content);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.html`);
        return res.send(htmlContent);

      case 'docx':
        // Create Word document
        const docx = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun(doc.content)
                ],
              }),
            ],
          }],
        });

        const docxPath = path.join(tempDir, `${doc.filename}.docx`);
        const buffer = await docx.save();
        await fsPromises.writeFile(docxPath, buffer);
        const docxContent = await fsPromises.readFile(docxPath);
        await fsPromises.unlink(docxPath);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.docx`);
        return res.send(docxContent);

      default:
        return res.status(400).json({ error: 'Unsupported format' });
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Error exporting document' });
  }
};

const markdownToHtml = (markdown) => {
  // Simple markdown to HTML conversion
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Exported Documentation</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          padding: 2em;
          max-width: 900px;
          margin: 0 auto;
        }
        pre {
          background-color: #f5f5f5;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
        }
        code {
          font-family: 'Courier New', Courier, monospace;
        }
      </style>
    </head>
    <body>
      ${markdown
        .replace(/^### (.#$)/gm, '<h3>$1</h3>')
        .replace(/^## (.#$)/gm, '<h2>$1</h2>')
        .replace(/^# (.#$)/gm, '<h1>$1</h1>')
        .replace(/\#\#(.#?)\#\#/g, '<strong>$1</strong>')
        .replace(/\#(.#?)\#/g, '<em>$1</em>')
        .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
        .replace(/\n/g, '<br>')}
    </body>
    </html>
  `;
};

function applyDefaultTemplate(content, options) {
  // Filter content based on options
  if (!options.codeSnippets) {
    content = content.replace(/```[\s\S]#?```/g, '');
  }
  if (!options.diagrams) {
    content = content.replace(/\[diagram\][\s\S]#?\[\/diagram\]/g, '');
  }
  if (!options.apiReference) {
    content = content.replace(/\[api\][\s\S]#?\[\/api\]/g, '');
  }
  return content;
}

function applyMinimalTemplate(content, options) {
  content = applyDefaultTemplate(content, options);
  // Add minimal styling and structure
  return `# ${content.split('\n')[0]}\n\n${content.split('\n').slice(1).join('\n')}`;
}

function applyTechnicalTemplate(content, options) {
  content = applyDefaultTemplate(content, options);
  // Add technical documentation structure
  const date = new Date().toISOString().split('T')[0];
  return `# Technical Documentation\n\nGenerated: ${date}\n\n${content}`;
}

function convertToHtml(markdown) {
  // Convert markdown to HTML using a library like marked
  const marked = require('marked');
  const html = marked(markdown);
  return Buffer.from(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; }
          pre { background: #f6f8fa; padding: 1rem; border-radius: 4px; }
          code { font-family: monospace; }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `);
}

async function convertToPdf(markdown) {
  // Convert markdown to PDF using a library like puppeteer
  const puppeteer = require('puppeteer');
  const html = convertToHtml(markdown);
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4', margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' } });
  await browser.close();
  
  return pdf;
}

async function convertToDocx(markdown) {
  // Convert markdown to DOCX using a library like mammoth or docx
  const docx = require('docx');
  const { Document, Paragraph, TextRun } = docx;
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: markdown.split('\n').map(line => 
        new Paragraph({
          children: [new TextRun(line)]
        })
      )
    }]
  });

  const buffer = await docx.Packer.toBuffer(doc);
  return buffer;
}

module.exports = { uploadFile, getAllDocs, updateDoc, getDocById, exportDoc };