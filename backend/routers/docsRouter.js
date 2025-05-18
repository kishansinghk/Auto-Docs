const express = require("express");
const multer = require("multer");
const { uploadFile, getAllDocs, updateDoc } = require("../controllers/docsController");
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

router.post("/upload", upload.single("file"), uploadFile);
router.get("/docs", getAllDocs);

router.put("/update/:id", updateDoc);

router.delete("/delete/:id", async (req, res) => {
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