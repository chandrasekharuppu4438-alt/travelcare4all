const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/authController');
const { verifyAdminToken } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', verifyAdminToken, getMe);
router.post('/logout', logout);

module.exports = router;
