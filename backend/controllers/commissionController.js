const Commission = require('../models/Commission');
const jwt = require('jsonwebtoken');

exports.loginCommission = async (req, res) => {
  const { username, password } = req.body;

  try {
    const commission = await Commission.findOne({ username });

    if (!commission || commission.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: commission._id }, 'pakraaz_secret', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error('Commission login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
