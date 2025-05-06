const fs = require("fs");
const Documentation = require("../models/docsModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Upload file and generate documentation
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileContent = fs.readFileSync(req.file.path, "utf-8");

    // AI Model - Updated model name to the current version
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    try {
      const prompt = `Generate comprehensive technical documentation for this code:
      
      ${fileContent}
      
      Please provide a detailed analysis in Markdown format with the following sections:
      
      ## Code Overview
      # Purpose: [bullet point description of the code's purpose ]
      
      # Functionality: [bullet point description of how it works]
      
      # Architecture: [bullet points about architecture]
      
      # Key technical decisions:
        * [First decision and rationale]
      
        * [Second decision and rationale]
      
        * [Additional points as needed]
      
      # Integration points with other system components:
        * [First integration point]
      
        * [Second integration point]
      
        * [Additional points as needed]
      
      # Error handling approach:
        * [Error handling strategy]
      
        * [Implementation details]
      
      ## Technical Analysis
      ### Code Structure
      # Organization:
        * [Key structure point 1]
      
        * [Key structure point 2]
      
      # Module/class hierarchy:
        * [First hierarchical relationship]
      
        * [Second hierarchical relationship]
      
      # Design patterns:
        * [First pattern]
      
        * [Second pattern]
      
      # Code complexity assessment:
        * [Complexity observations]
      
      # Architectural considerations:
        * [First consideration]
      
        * [Second consideration]
      
      ### Implementation Details
      For each function, class, or module:
      * Name: [function/class/module name]
      
        * Signature: [parameters, return types, exceptions]
      
        * Complexity: [Big O notation where applicable]
      
        * Memory usage: [observations]
      
        * Error handling: [approach used]
      
        * Async operations: [how they're handled]
      
        * Data flow: [description]
      
        * Side effects: [any state mutations]
      
      ### Dependencies
      # Primary dependencies:
        * [First dependency and version]
      
        * [Second dependency and version]
      
      # Dependency injection patterns:
        * [Pattern description if applicable]
      
        * External API interactions:
        * [API and interaction details]
      
        * System requirements:
        * [Requirement 1]
      
        * [Requirement 2]
      
      ### Data Management
      # Data structures:
        * [Structure 1 and rationale]
      
        * [Structure 2 and rationale]
      
      # State management:
        * [Approach used]
      
        * Data validation:
        * [Validation methods]
      
        * Database interactions:
        * [Database details if applicable]
      
        * Caching mechanisms:
        * [Caching strategy if implemented]
      
      ### Security Considerations
      # Authentication/Authorization:
        * [Mechanism details]
      
        * Input validation:
        * [Approach used]
      
        * Security practices:
        * [Practice 1]
      
        * [Practice 2]
      
        * Potential vulnerabilities:
        * [Vulnerability 1]
      
        * [Vulnerability 2]
      
      ### Performance Analysis
      # Optimization techniques:
        * [Technique 1]
      
        * [Technique 2]
      
        * Resource usage:
        * [Resource 1 usage pattern]
      
        * [Resource 2 usage pattern]
      
        * Bottlenecks:
        * [Bottleneck 1]
      
        * [Bottleneck 2]
      
        * Caching strategies:
        * [Strategy details]
      
        * Load handling:
        * [Capabilities]
      
      ### Error Handling
      # Error scenarios:
        * [Scenario 1]
      
        * [Scenario 2]
      
        * Recovery mechanisms:
        * [Mechanism 1]
      
        * [Mechanism 2]
      
        * Logging approach:
        * [Approach details]
      
        * Debug capabilities:
        * [Capability details]
      
      ### Testing Considerations
      # Unit testing:
        * [Approach details]
      
        * Integration testing:
        * [Requirements]
      
        * Edge cases:
        * [Case 1]
      
        * [Case 2]
      
        * Mock requirements:
        * [Requirement 1]
      
        * [Requirement 2]
      
        * Coverage recommendations:
        * [Recommendation details]
      
      ### API Documentation (if applicable)
      # API specifications:
        * [Endpoint 1]
      
        * [Endpoint 2]
      
        * Request/Response formats:
        * [Format details]
      
        * Authentication:
        * [Requirements]
      
        * Rate limiting:
        * [Details]
      
        * Versioning strategy:
        * [Strategy details]
      
      ### Code Examples
      * Implementation:
        * \`\`\`
          [code example 1]
          \`\`\`
      
        * \`\`\`
          [code example 2]
          \`\`\`
      
      * Integration:
        * \`\`\`
          [integration example]
          \`\`\`
      
      * Error handling:
        * \`\`\`
          [error handling example]
          \`\`\`
      
      ### Maintenance and Scalability
      # Maintainability factors:
        * [Factor 1]
      
        * [Factor 2]
      
        * Scalability patterns:
        * [Pattern 1]
      
        * [Pattern 2]
      
        * Improvement areas:
        * [Area 1]
      
        * [Area 2]
      
        * Technical debt:
        * [Debt item 1]
      
        * [Debt item 2]
      
        * Upgrade considerations:
        * [Consideration 1]
      
        * [Consideration 2]
      
      ### Development Guidelines
      # Coding standards:
        * [Standard 1]
      
        * [Standard 2]
      
        #  Documentation practices:
        * [Practice 1]
      
        * [Practice 2]
      
        # Version control:
        * [Practice 1]
      
        * [Practice 2]
      
        # Code review checklist:
        * [Item 1]
      
        * [Item 2]
      
        # Development environment:
        * [Setup detail 1]
      
        * [Setup detail 2]
      
      Please ensure all technical terms are accurately used and explained where necessary. Use clear bullet points throughout for better readability, and include code snippets, ASCII/markdown diagrams, tables, and links where relevant.`;
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
    const { format, template, options } = req.body;
    const doc = await Documentation.findById(req.params.id);
    
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    let content = doc.content;
    
    // Apply template formatting
    switch (template) {
      case 'minimal':
        content = applyMinimalTemplate(content, options);
        break;
      case 'technical':
        content = applyTechnicalTemplate(content, options);
        break;
      default:
        content = applyDefaultTemplate(content, options);
    }

    // Convert to requested format
    let exportedContent;
    let contentType;
    
    switch (format) {
      case 'pdf':
        exportedContent = await convertToPdf(content);
        contentType = 'application/pdf';
        break;
      case 'html':
        exportedContent = convertToHtml(content);
        contentType = 'text/html';
        break;
      case 'docx':
        exportedContent = await convertToDocx(content);
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      default: // markdown
        exportedContent = Buffer.from(content);
        contentType = 'text/markdown';
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}.${format}`);
    res.send(exportedContent);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Error exporting document' });
  }
};

function applyDefaultTemplate(content, options) {
  // Filter content based on options
  if (!options.codeSnippets) {
    content = content.replace(/```[\s\S]*?```/g, '');
  }
  if (!options.diagrams) {
    content = content.replace(/\[diagram\][\s\S]*?\[\/diagram\]/g, '');
  }
  if (!options.apiReference) {
    content = content.replace(/\[api\][\s\S]*?\[\/api\]/g, '');
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