const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    attributes: { type: Array, required: true },
    walletAddress: { type: String, required: true },
    imageUrl: { type: String, required: true }, // This will store the GridFS image URL
    mintAddress: { type: String }, // If applicable
  },
  { timestamps: true }
);

module.exports = mongoose.model("NFT", nftSchema);
