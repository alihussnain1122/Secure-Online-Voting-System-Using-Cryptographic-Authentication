const mongoose = require('mongoose');

// Vote Schema
const voteSchema = new mongoose.Schema({
  voterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Voter', 
    required: true 
  }, // Reference to the Voter model
  electionId: { 
    type: String, 
    required: true 
  }, // Election ID (can be used to track different elections)
  voteChoice: { 
    type: String, 
    required: true 
  }, // Voted choice or candidate
  timestamp: { 
    type: Date, 
    default: Date.now 
  } // Timestamp for the vote
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Vote', voteSchema);
