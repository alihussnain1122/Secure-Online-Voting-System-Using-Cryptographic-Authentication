const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.get('/admins', AdminController.getAllAdmins);
router.post('/admins', AdminController.createAdmin);
router.put('/admins/:id', AdminController.updateAdmin);
router.post('/admin/delete', AdminController.deleteAdmin);


module.exports = router;
