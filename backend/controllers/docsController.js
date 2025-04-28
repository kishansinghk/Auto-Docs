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
    - Detailed technical explanation of the code's purpose and functionality
    - Architecture and design patterns used
    - Key technical decisions and their rationale
    - Integration points with other system components
    - Error handling approach
    
    ## Technical Analysis
    ### Code Structure
    - Detailed breakdown of the codebase organization
    - Module/class hierarchy and relationships
    - Design patterns implemented
    - Code complexity analysis
    - Architectural considerations
    
    ### Implementation Details
    For each function, class, or module:
    - Complete signature analysis (parameters, return types, exceptions)
    - Algorithmic complexity (Big O notation where applicable)
    - Memory usage considerations
    - Error handling mechanisms
    - Asynchronous operations handling
    - Data flow description
    - Side effects and state mutations
    
    ### Dependencies
    - Complete dependency tree
    - Version requirements and compatibility notes
    - Dependency injection patterns
    - External API interactions
    - System requirements
    
    ### Data Management
    - Data structures used and rationale
    - State management patterns
    - Data validation and sanitization
    - Database interactions (if any)
    - Caching mechanisms (if implemented)
    
    ### Security Considerations
    - Authentication/Authorization mechanisms
    - Input validation and sanitization
    - Security best practices implementation
    - Potential security vulnerabilities to address
    
    ### Performance Analysis
    - Performance optimization techniques used
    - Resource usage patterns
    - Bottleneck identification
    - Caching strategies
    - Load handling capabilities
    
    ### Error Handling
    - Comprehensive error scenarios
    - Error recovery mechanisms
    - Logging and monitoring approach
    - Debug capabilities
    
    ### Testing Considerations
    - Unit testing approach
    - Integration testing requirements
    - Edge cases to test
    - Mock requirements
    - Test coverage recommendations
    
    ### API Documentation (if applicable)
    - Complete API specifications
    - Request/Response formats
    - Authentication requirements
    - Rate limiting details
    - API versioning strategy
    
    ### Code Examples
    - Implementation examples with different scenarios
    - Integration examples
    - Error handling examples
    - Best practices demonstrations
    
    ### Maintenance and Scalability
    - Code maintainability considerations
    - Scalability design patterns
    - Potential improvement areas
    - Technical debt identification
    - Upgrade and migration considerations
    
    ### Development Guidelines
    - Coding standards adherence
    - Documentation practices
    - Version control practices
    - Code review checklist
    - Development environment setup
    
    Please format the documentation with:
    - Clear hierarchical structure
    - Code snippets where relevant
    - Technical diagrams (using ASCII/markdown) when helpful
    - Tables for structured data
    - Bullet points for lists
    - Links to related documentation
    
    Ensure all technical terms are accurately used and explained where necessary.`;

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

module.exports = { uploadFile, getAllDocs };