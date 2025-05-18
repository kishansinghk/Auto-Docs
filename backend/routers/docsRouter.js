const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const { uploadFile, getAllDocs, updateDoc, getDocById, exportDoc } = require("../controllers/docsController");
const { authMiddleware } = require("../middleware/authMiddleware");
const Model = require("../models/docsModel");

const router = express.Router();
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    // Accept common code file extensions
    const allowedExtensions = [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".py",
      ".java",
      ".html",
      ".css",
    ];
    const fileExt = "." + file.originalname.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only code files are allowed."));
    }
  },
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

router.get("/:id", async (req, res) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;