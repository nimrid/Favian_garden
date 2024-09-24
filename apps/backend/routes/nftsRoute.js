// backend/routes/nfts.js
const express = require("express");
const { getNFTs } = require("../controllers/nftsController");

const router = express.Router();

router.get("/get-nfts/:walletAddress", getNFTs);

module.exports = router;
