const express = require('express');
const Vote = require('../models/Vote');
const verifyToken = require('../middleware/authMiddleware');  // Token verification middleware
const router = express.Router();

// Submit a vote (voter must be authenticated)
router.post('/castVote', verifyToken, async (req, res) => {
  const { voterId, candidate } = req.body;

  try {
    // Create and save the new vote document
    const vote = new Vote({ voterId, candidate });
    await vote.save();
    res.status(201).json({ message: 'Vote submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all votes (admin or commission can access this)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const votes = await Vote.find().populate('voterId', 'fullName');
    res.json(votes);  // Send all votes with the voter's full name populated
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin-only route to fetch vote results (protected by verifyToken)
router.get('/admin/results', verifyToken, async (req, res) => {
  try {
    // Aggregate vote results: count the number of votes per candidate
    const results = await Vote.aggregate([
      { $group: { _id: "$candidate", count: { $sum: 1 } } },  // Group votes by candidate
      { $sort: { count: -1 } }  // Sort by highest count
    ]);
    res.status(200).json(results);  // Return results, could be further processed or encrypted
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Error fetching results' });
  }
});

// Route to get vote results (no authentication needed for results)
router.get('/results', async (req, res) => {
  try {
    // Aggregate vote results: count votes per candidate
    const results = await Vote.aggregate([
      { $group: { _id: "$candidate", count: { $sum: 1 } } },  // Group votes by candidate
      { $sort: { count: -1 } }  // Sort by vote count
    ]);
    res.status(200).json(results);  // Return results to anyone (no token required)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching results' });
  }
});

module.exports = router;
