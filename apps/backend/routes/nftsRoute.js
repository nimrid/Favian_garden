const express = require("express");
const router = express.Router();
const {
  mintNFT,
  getAllNFTs,
  purchaseNFT,
  recentNFTs,
  getImage,
  confirmAndTransferNFT,
} = require("../controllers/nftController");
const upload = require("../middlewares/uploadMiddleware");

// Routes
router.post("/mint", upload.single("image"), mintNFT); // Upload image and mint NFT
router.get("/list", getAllNFTs); // Get all NFTs
router.post("/purchase", purchaseNFT); // Purchase NFT
router.get("/recent/:walletAddress", recentNFTs); // Get recent
router.get("/image/:uri", getImage); // Get image
router.post("/confirm-purchase", confirmAndTransferNFT); //
module.exports = router;
