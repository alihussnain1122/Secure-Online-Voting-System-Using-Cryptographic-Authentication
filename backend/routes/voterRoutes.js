const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voterController');

// Routes
router.post('/', voterController.addVoter);
router.put('/:id', voterController.updateVoter);
router.delete('/:id', voterController.deleteVoter);

module.exports = router;
