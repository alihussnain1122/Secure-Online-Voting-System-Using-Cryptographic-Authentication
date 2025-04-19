// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { loginCommission, loginAdmin, loginVoter } = require('./controllers/authController');
const { protect } = require('./middleware/authMiddleware');
const Feedback = require('./models/Feedback');
const adminRoutes = require('./routes/admin');
const Admin = require('./models/Admin');  // Assuming you have an Admin model

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// === MIDDLEWARE ===
app.use(bodyParser.json());
app.use(cors());

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// === DB CONNECTION ===
mongoose
.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// === ROUTES ===
app.use('/api', adminRoutes);
app.post('/api/admin/login', loginAdmin);
app.post('/api/voter/login', loginVoter);

// Dashboard (Protected)
app.get('/api/commission/dashboard', protect, (req, res) => {
  res.json({
    message: 'Commission Dashboard: Access granted.',
    user: req.user,
  });
});

// Feedback (Protected)
app.post('/api/feedback', protect, async (req, res) => {
  const { feedback } = req.body;
  const voterId = req.user._id;

  try {
    const newFeedback = new Feedback({ voterId, feedback });
    await newFeedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while submitting feedback.' });
  }
});

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ message: 'Route not found' });
});

// === SERVER START ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
