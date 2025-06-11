const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 100
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 1000
  },
  feedbackType: {
    type: String,
    required: true,
    enum: ['suggestion', 'bug', 'feature']
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
