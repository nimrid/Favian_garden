// routes/mintRoutes.js
const express = require("express");
const { mintNFT } = require("../controllers/mintController");
const router = express.Router();

router.post("/", mintNFT);

module.exports = router;
