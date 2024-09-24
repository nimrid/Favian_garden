const express = require("express");
const { generateImage } = require("../controllers/imageController");
const {
  saveImage,
  listImage,
  purchaseImage,
} = require("../controllers/ImageHandler");

const router = express.Router();

// POST route to generate image
router.post("/generate-image", generateImage);

// Endpoint to  save an image
router.post("/save-image", saveImage);

// Endpoint to list an image for sale
router.post("/list", listImage);

// Endpoint to purchase an image
router.post("/purchase", purchaseImage);

module.exports = router;
