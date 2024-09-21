// services/aiService.js
const axios = require("axios");

const generateAIImage = async () => {
  try {
    const response = await axios.post(process.env.AI_API_URL);
    return response.data.imageUrl; // Assuming the API returns the image URL
  } catch (error) {
    throw new Error("Failed to generate AI image");
  }
};

module.exports = { generateAIImage };
