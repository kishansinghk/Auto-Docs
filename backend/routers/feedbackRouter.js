const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback, getFeedbackStats } = require('../controllers/feedbackController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Submit feedback (public route)
router.post('/submit', submitFeedback);

// Admin routes (protected)
router.get('/all', authMiddleware, getAllFeedback);
router.get('/stats', authMiddleware, getFeedbackStats);

module.exports = router;
