const express = require('express');

const auth = require('./auth');
const files = require('./files');

const router = express.Router();


router.use('/api/v1/custom/', auth);
router.use('/api/v1/files/', files);

module.exports = router;