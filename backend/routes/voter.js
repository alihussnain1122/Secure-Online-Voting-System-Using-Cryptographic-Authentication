const express = require('express');
const router = express.Router();
const { loginVoter } = require('../controllers/authController');
const authController = require('../controllers/authController');

router.post('/register', authController.registerVoter);
router.post('/login', loginVoter); // Login for Voter

module.exports = router;
