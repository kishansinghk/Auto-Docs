const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const mime = require('mime-types');
const { uploadFile, getAllDocs, updateDoc, getDocById, exportDoc } = require("../controllers/docsController");
const { authMiddleware } = require("../middleware/authMiddleware");
const Model = require("../models/docsModel");
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Create unique filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept common code file extensions
  const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.html', '.css'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only code files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Export validation middleware
const validateExport = [
  body('format')
    .isIn(['markdown', 'pdf', 'html', 'docx'])
    .withMessage('Invalid export format. Supported formats are: markdown, pdf, html, docx')
];

// Protected routes
router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/docs", authMiddleware, getAllDocs);
router.put("/update/:id", authMiddleware, updateDoc);
router.get('/:id', authMiddleware, getDocById);
router.post('/export/:id', authMiddleware, validateExport, exportDoc);

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Document deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error deleting document" });
    });
});

module.exports = router;