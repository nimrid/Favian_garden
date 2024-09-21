// routes/imageRoutes.js
const express = require("express");
const { generateImage } = require("../controllers/imageController");
const router = express.Router();

router.post("/generate", generateImage);

module.exports = router;
