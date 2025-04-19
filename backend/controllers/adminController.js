const Admin = require('../models/Admin');  // Ensure you have an Admin model defined

// Create a new admin
exports.createAdmin = async (req, res) => {
  const { username, password, city } = req.body;

  // Validate the input data
  if (!username || !password || !city) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newAdmin = new Admin({
      username,
      password,
      city,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};


// Get all admins (for example purposes)
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching admins' });
  }
};

// Update an admin
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, password, city } = req.body;

  try {
    // 1. Check if username already exists in another admin
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin && existingAdmin._id.toString() !== id) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // 2. Find and update the admin
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    admin.username = username;
    if (password) admin.password = password; // Update only if provided
    admin.city = city;

    await admin.save();
    res.status(200).json({ message: 'Admin updated successfully' });

  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { username, password, city } = req.body;

    // Find the admin by all three fields
    const admin = await Admin.findOne({ username, password, city });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found with provided credentials' });
    }

    await Admin.findByIdAndDelete(admin._id);

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    console.error('Error deleting admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};