// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  voterID: { type: String, required: true },  // Track which voter provided the feedback
  feedback: { type: String, required: true }, // Feedback text
  submittedAt: { type: Date, default: Date.now } // Timestamp of feedback submission
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
