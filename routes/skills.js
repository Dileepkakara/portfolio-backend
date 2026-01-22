const express = require('express');
const skillController = require('../controllers/skillController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', skillController.getAll);
router.post('/', authenticateToken, skillController.create);
router.put('/:id', authenticateToken, skillController.update);
router.delete('/:id', authenticateToken, skillController.delete);

module.exports = router;
