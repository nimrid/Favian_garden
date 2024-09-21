// controllers/imageController.js
const { generateAIImage } = require("../services/aiService");

const generateImage = async (req, res) => {
  try {
    const imageUrl = await generateAIImage();
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Image generation failed" });
  }
};

module.exports = { generateImage };
