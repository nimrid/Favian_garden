const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attributes: {
    type: Array,
    required: false, // Set to true if you require attributes
  },
  walletAddress: {
    type: String,
    required: true, // Store the creator's wallet address
  },
  uri: {
    type: String,
    required: true, // URL where the image is stored (e.g., from GridFS)
  },

  price: {
    type: Number,
    required: true, // Optional, but you can store price if needed
  },
  royaltyFee: {
    type: Number,
    required: true, // Optional, royalty fee percentage for NFT
  },
  mintAddress: {
    type: String,
    required: true, // You can still store the mint address for blockchain reference, but it can be optional
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;