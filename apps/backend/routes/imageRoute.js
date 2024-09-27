const express = require("express");
const { generateImage } = require("../controllers/imageController");

const router = express.Router();

// POST route to generate image
router.post("/generate", (req, res) => {
  console.log("Request received:", req.body);
  generateImage(req, res);
});

module.exports = router;
