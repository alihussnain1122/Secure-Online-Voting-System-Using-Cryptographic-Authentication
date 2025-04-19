const Voter = require('../models/Voter');

// ADD
exports.addVoter = async (req, res) => {
  try {
    const { name, cnic, email } = req.body;
    const newVoter = new Voter({ name, cnic, email });
    await newVoter.save();
    res.status(201).json({ message: 'Voter added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add voter', error: error.message });
  }
};

// UPDATE
exports.updateVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Voter.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Voter not found' });
    res.json({ message: 'Voter updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update voter', error: error.message });
  }
};

// DELETE
exports.deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Voter.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Voter not found' });
    res.json({ message: 'Voter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete voter', error: error.message });
  }
};
