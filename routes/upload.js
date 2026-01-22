const express = require('express');
const uploadController = require('../controllers/uploadController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, uploadController.upload);

module.exports = router;
