const express = require('express');
const router = express.Router();
const { searchJobs } = require('../controllers/externalController');

router.get('/', searchJobs);

module.exports = router;