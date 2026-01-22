const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    const user = new User({ email, password: hashedPassword });
    await user.save();
    
    // Return token on registration
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ error: 'User not found' });
    
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
