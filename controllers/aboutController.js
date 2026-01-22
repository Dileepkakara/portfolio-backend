const About = require('../models/About');

exports.get = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    let about = await About.findOne();
    
    if (!about) {
      about = new About(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true });
    }
    
    await about.save();
    res.json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
