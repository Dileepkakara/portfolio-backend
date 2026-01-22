const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const aboutRoutes = require('./routes/about');
const messageRoutes = require('./routes/messages');
const uploadRoutes = require('./routes/upload');
const visitorRoutes = require('./routes/visitors');

const app = express();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

console.log('Connecting to MongoDB at', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dileep-portfolio', mongoOptions)
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch(err => {
    console.error('✗ MongoDB error:', err.message);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/visitors', visitorRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Dileep Portfolio API is running', status: 'ok' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

