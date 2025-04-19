const express = require('express');
const router = express.Router();
const { loginCommission } = require('../controllers/commissionController');

router.post('/login', loginCommission); // ✅ this path is required

module.exports = router;
