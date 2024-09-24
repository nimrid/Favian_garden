// controllers/imageController.js
const { config } = require("../config");
const axios = require("axios");

const generateImage = async (req, res) => {
  const { text, typeOfNFT, style, canvas } = req.body;

  if (!text || !style || !canvas) {
    return res.status(400).json({
      message: "Please provide all required fields: text, style, and canvas.",
    });
  }

  const prompt = `${text}, ${style} style, for a ${typeOfNFT}`;

  let imageSize = "512x512"; // Default to square

  switch (String(canvas)?.toLowerCase()) {
    case "square":
      imageSize = "512x512";
      break;
    case "portrait":
      imageSize = "512x768";
      break;
    case "landscape":
      imageSize = "768x512";
      break;
    case "custom":
      if (req.body.customSize) {
        imageSize = req.body.customSize;
      }
      break;
    default:
      imageSize = "512x512"; // Default to square
  }

  const payload = {
    prompt,
    output_format: "jpeg",
    width: parseInt(imageSize.split("x")[0]), // width based on the canvas size
    height: parseInt(imageSize.split("x")[1]), // height based on the canvas size
  };

  try {
    const response = await axios.postForm(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      axios.toFormData(payload, new FormData()),
      {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${config.STABILITY_API_KEY}`,
          Accept: "image/*",
        },
      }
    );

    if (response.status === 200) {
      res.setHeader("Content-Type", "image/jpeg");
      return res.status(200).send(Buffer.from(response.data));
    } else {
      return res.status(response.status).json({
        message: `Error generating image: ${response.status}`,
        details: response.data.toString(),
      });
    }
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
