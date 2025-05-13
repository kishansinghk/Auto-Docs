const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackController');

// POST - Submit feedback
router.post('/', submitFeedback);

// GET - Get all feedback (optional, for admin)
router.get('/', getAllFeedback);

module.exports = router;
