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
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    res.status(200).json(updatedAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating admin' });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting admin' });
  }
};
