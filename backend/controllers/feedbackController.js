const Feedback = require('../models/feedbackModel');

// Submit new feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, subject, message, feedbackType, rating } = req.body;

      const newFeedback = new Feedback({
        name,
        email,
        subject,
        message,
        feedbackType,
        rating
      });

      await newFeedback.save();      res.status(201).json({
        status: 'success',
        message: 'Feedback submitted successfully',
        data: newFeedback
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit feedback',
        error: error.message
      });
    }
};

// Get all feedback (for admin)
exports.getAllFeedback = async (req, res) => {
    try {
      const feedback = await Feedback.find()
        .sort({ submittedAt: -1 }); // Most recent first

      res.status(200).json({
        status: 'success',
        data: feedback
      });
    } catch (error) {
      console.error('Error fetching feedback:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch feedback',
        error: error.message
      });
    }
};

// Get feedback statistics (for admin)
exports.getFeedbackStats = async (req, res) => {
    try {
      const stats = await Feedback.aggregate([
        {
          $group: {
            _id: null,
            totalFeedback: { $sum: 1 },
            averageRating: { $avg: '$rating' },
            feedbackTypes: {
              $push: '$feedbackType'
            }
          }
        },
        {
          $addFields: {
            typeStats: {
              suggestion: {
                $size: {
                  $filter: {
                    input: '$feedbackTypes',
                    cond: { $eq: ['$$this', 'suggestion'] }
                  }
                }
              },
              bug: {
                $size: {
                  $filter: {
                    input: '$feedbackTypes',
                    cond: { $eq: ['$$this', 'bug'] }
                  }
                }
              },
              feature: {
                $size: {
                  $filter: {
                    input: '$feedbackTypes',
                    cond: { $eq: ['$$this', 'feature'] }
                  }
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            totalFeedback: 1,
            averageRating: 1,
            typeStats: 1
          }
        }
      ]);

      res.status(200).json({
        status: 'success',
        data: stats[0] || {
          totalFeedback: 0,
          averageRating: 0,
          typeStats: { suggestion: 0, bug: 0, feature: 0 }
        }
      });
    } catch (error) {
      console.error('Error fetching feedback stats:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch feedback statistics',
        error: error.message
      });
    }
};
