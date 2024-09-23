const express = require("express");
const { generateImage } = require("../controllers/imageController");

const router = express.Router();

// POST route to generate image
router.post("/generate-image", generateImage);

module.exports = router;
