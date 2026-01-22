const express = require('express');
const projectController = require('../controllers/projectController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', projectController.getAll);
router.post('/', authenticateToken, projectController.create);
router.put('/:id', authenticateToken, projectController.update);
router.delete('/:id', authenticateToken, projectController.delete);

module.exports = router;
