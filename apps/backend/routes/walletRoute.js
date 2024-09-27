const express = require("express");
const { walletConnectController } = require("../controllers/walletController");
const router = express.Router();

router.post("/connect", walletConnectController); // Route for saving wallet address

module.exports = router;
