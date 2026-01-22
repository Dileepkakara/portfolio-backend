const Skill = require('../models/Skill');

exports.getAll = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
