const express = require('express');
const router = express.Router();
const { submitVisaInquiry, getVisaInquiries } = require('../controllers/visaController');

router.post('/', submitVisaInquiry);
router.get('/', getVisaInquiries);

module.exports = router;
