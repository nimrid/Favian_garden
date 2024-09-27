const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true }, // Store the user's wallet address
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  attributes: [{ type: Object }], // Store attributes as an array of objects
  mintAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;
