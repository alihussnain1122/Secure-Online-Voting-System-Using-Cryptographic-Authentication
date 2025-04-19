const Admin = require('../models/Admin');  // Ensure you have an Admin model defined

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = new Admin({ name, email, password });
    await admin.save();
    res.status(201).json(admin);  // Respond with the newly created admin
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating admin' });
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
