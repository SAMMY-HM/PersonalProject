const express = require('express');
const router = express.Router();
const generateResumeController = require('../controllers/generateResumeController');

router.get('/download-resume', generateResumeController.downloadResume);

module.exports = router;
