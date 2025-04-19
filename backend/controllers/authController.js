require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Commission = require('../models/Commission');  // Commission model
const Admin = require('../models/Admin');            // Admin model
const Voter = require('../models/Voter');            // Voter model
const bodyParser = require('body-parser');

//const Commission = require('../models/Commission');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

// controllers/commissionController.js

const loginCommission = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Commission.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ This is where you use the line
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Commission logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Admin Login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
//get all admins       ye admin list k wqt add kia
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json(admins);
  } catch (error) {
    console.error('❌ Error fetching admins:', error);
    res.status(500).json({ message: 'Server error while fetching admins.' });
  }
};

exports.createAdmin = async (req, res) => {
  console.log('📥 Received admin data:', req.body);
  try {
    const { username, password, city } = req.body;
    
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    const newAdmin = new Admin({ username, password, city });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully!' });
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    res.status(500).json({ message: 'Server error while creating admin.' });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Error updating admin:', err);
    res.status(500).json({ message: 'Error updating admin' });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting admin:', err);
    res.status(500).json({ message: 'Error deleting admin' });
  }
};
//    ===============================     ye admin list k wqt add kia
// Voter Login (using CNIC and Voter ID)
exports.loginVoter = async (req, res) => {
  const { CNIC, voterID } = req.body;

  try {
    // Find voter by VoterID
    const voter = await Voter.findOne({ voterID }).select('+CNIC'); // Ensure CNIC is selected

    if (!voter) {
      return res.status(400).json({ message: 'Invalid Voter ID' });
    }

    // Compare entered CNIC with stored hashed CNIC
    const isMatch = await bcrypt.compare(CNIC, voter.CNIC);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid CNIC' });
    }

    // Generate JWT token for voter
    const token = jwt.sign({ id: voter._id, role: 'voter' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register Admin by Commission
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword
    });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register Voter by Commission
exports.registerVoter = async (req, res) => {
  const { CNIC, voterID, name, phone, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Hash the CNIC before saving it
    const hashedCNIC = await bcrypt.hash(CNIC, 10);

    // Create a new Voter document
    const voter = new Voter({
      CNIC: hashedCNIC,  // Store hashed CNIC
      voterID,
      name,
      phone,
      password: hashedPassword
    });

    await voter.save();
    res.status(201).json({ message: 'Voter registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
