const Message = require('../models/Message');
const { sendContactEmail } = require('../config/email');

exports.getAll = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();

    // Send email notification
    const emailSent = await sendContactEmail(
      message.name,
      message.email,
      message.message,
      message.phone || null
    );

    res.json({
      message,
      emailSent,
      notification: emailSent ? 'Email notification sent successfully' : 'Message saved but email failed'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
