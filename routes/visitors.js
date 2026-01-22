const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// Get visitor count
router.get('/', async (req, res) => {
  try {
    // Find or create the single visitor document
    let visitor = await Visitor.findOne();
    
    if (!visitor) {
      // If no document exists, create one with count 1
      visitor = new Visitor({ count: 1, lastVisitor: new Date() });
      await visitor.save();
    } else {
      // Increment the count
      visitor.count += 1;
      visitor.lastVisitor = new Date();
      await visitor.save();
    }
    
    res.json({ count: visitor.count });
  } catch (error) {
    console.error('Error updating visitor count:', error);
    res.status(500).json({ error: 'Failed to update visitor count' });
  }
});

// Reset visitor count (admin only)
router.post('/reset', async (req, res) => {
  try {
    await Visitor.updateOne({}, { count: 0, lastVisitor: new Date() }, { upsert: true });
    res.json({ message: 'Visitor count reset to 0' });
  } catch (error) {
    console.error('Error resetting visitor count:', error);
    res.status(500).json({ error: 'Failed to reset visitor count' });
  }
});

module.exports = router;
