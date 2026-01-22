const express = require('express');
const aboutController = require('../controllers/aboutController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', aboutController.get);
router.put('/', authenticateToken, aboutController.update);

module.exports = router;
