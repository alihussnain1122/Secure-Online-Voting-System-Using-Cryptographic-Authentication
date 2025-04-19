const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Voter Schema
const voterSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  voterId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, required: true }, // Add this field
}, { timestamps: true });

// Hash CNIC before saving
voterSchema.pre('save', async function(next) {
  if (this.isModified('cnic') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt for hashing
      this.cnic = await bcrypt.hash(this.cnic, salt); // Hash the CNIC
    } catch (err) {
      next(err); // Pass any errors to the next middleware
    }
  }
  next(); // Continue with saving the document
});

// Hash password before saving (for security)
voterSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt for password
      this.password = await bcrypt.hash(this.password, salt); // Hash the password
    } catch (err) {
      next(err); // Pass any errors to the next middleware
    }
  }
  next(); // Continue with saving the document
});

module.exports = mongoose.model('Voter', voterSchema);
