const express = require('express');
const router = express.Router();
const { submitContactMessage, getSiteInfo } = require('../controllers/contactController');

router.post('/', submitContactMessage);
router.get('/info', getSiteInfo);

module.exports = router;
