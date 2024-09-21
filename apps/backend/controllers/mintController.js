// controllers/mintController.js
const { mintAIImageNFT } = require("../services/solanaService");

const mintNFT = async (req, res) => {
  try {
    const { imageUrl, name, symbol } = req.body;
    const txId = await mintAIImageNFT(imageUrl, name, symbol);
    res.json({ txId });
  } catch (error) {
    res.status(500).json({ error: "NFT minting failed" });
  }
};

module.exports = { mintNFT };
