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
      
      When the user uploads a code file, read the contents of the file. Analyze the code to understand its purpose, structure, key functions, and logic.
Then, automatically generate a well-structured document that includes:

A title summarizing the project or script.

A brief description of what the code does.

A list of main components (classes, functions, important variables) with explanations.

An overview of how the code flows (execution steps).

Any assumptions, requirements, or dependencies noted in the code.

Optionally, suggest improvements or best practices if applicable.

Make the document clear, concise, and professional, as if preparing technical documentation for developers.`;
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

module.exports = { uploadFile, getAllDocs, updateDoc };