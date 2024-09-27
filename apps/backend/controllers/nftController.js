const { uploadImageToS3 } = require("../services/s3Service");
const { mintNFT } = require("../services/solanaService");
const NFT = require("../models/nftModel");
const mintNftController = async (req, res) => {
  const { name, description, attributes } = req.body;

  // Get the wallet address from session (or token)
  const walletAddress = req.session.walletAddress;

  if (!walletAddress) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Wallet address not found. Please connect your wallet.",
      });
  }

  try {
    // Upload image to S3
    const imageUrl = await uploadImageToS3(req.file);

    // Mint NFT on Solana using the stored wallet address
    const mintAddress = await mintNFT(name, description, attributes, imageUrl);

    // Save NFT metadata in MongoDB
    const newNFT = new NFT({
      walletAddress, // Use the wallet address from the session
      name,
      description,
      imageUrl,
      attributes,
      mintAddress,
    });

    await newNFT.save();

    res.json({ success: true, mintAddress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { mintNftController };
