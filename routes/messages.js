const express = require('express');
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, messageController.getAll);
router.post('/', messageController.create);
router.delete('/:id', authenticateToken, messageController.delete);

module.exports = router;
