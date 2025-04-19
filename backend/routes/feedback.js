// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');  // Import the Feedback model

// Route to submit feedback
router.post('/submit', async (req, res) => {
  try {
    const { voterID, feedback } = req.body;

    if (!voterID || !feedback) {
      return res.status(400).json({ message: 'Voter ID and Feedback are required.' });
    }

    // Create a new feedback entry
    const newFeedback = new Feedback({ voterID, feedback });

    // Save feedback to the database
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Route to get all feedbacks (optional)
router.get('/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all feedbacks
    res.status(200).json(feedbacks);  // Send the feedbacks as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
