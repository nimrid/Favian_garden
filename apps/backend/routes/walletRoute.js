const express = require("express");
const { connectWallet } = require("../controllers/walletController");
const router = express.Router();

router.post("/connect", connectWallet);

module.exports = router;
