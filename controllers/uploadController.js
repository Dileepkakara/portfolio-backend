const cloudinary = require('cloudinary').v2;

exports.upload = async (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const result = await cloudinary.uploader.upload(imageData, {
      folder: 'dileep-portfolio',
      resource_type: 'auto'
    });

    res.json({ 
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
