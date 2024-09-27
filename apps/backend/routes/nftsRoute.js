const express = require("express");
const multer = require("multer");
const { mintNFT } = require("../services/nftService"); // Import the mintNFT function
const {
  Connection,
  clusterApiUrl,
  Keypair,
  Transaction,
  SystemProgram,
} = require("@solana/web3.js"); // Import necessary Solana libraries
const NFT = require("../model/nftModel");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/mint", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No image uploaded" });
  }

  const { name, description, attributes } = req.body;
  const imageBase64 = req.file.buffer.toString("base64");
  const imageData = `data:${req.file.mimetype};base64,${imageBase64}`;

  try {
    const mintedNFT = await mintNFT({
      name,
      description,
      attributes,
      image: imageData,
    });
    res.status(200).json({ success: true, nft: mintedNFT });
  } catch (error) {
    console.error("Minting error:", error);
    res.status(500).json({ success: false, message: "Minting failed", error });
  }
});

// GET /api/v1/nfts
router.get("/", async (req, res) => {
  try {
    const nfts = await NFT.find(); // Fetch all NFTs from the database
    res.json({ success: true, data: nfts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST /api/v1/nfts/purchase
router.post("/purchase", async (req, res) => {
  const { mintAddress, buyerWalletAddress, price } = req.body;

  if (!mintAddress || !buyerWalletAddress || !price) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Mint address, buyer wallet address, and price are required.",
      });
  }

  try {
    // Step 1: Retrieve the NFT from the database
    const nft = await NFT.findOne({ mintAddress });

    if (!nft) {
      return res
        .status(404)
        .json({ success: false, message: "NFT not found." });
    }

    // Step 2: Verify the price (optional, you might want to validate it against a stored value)

    // Step 3: Create a transaction to transfer funds or ownership
    const connection = new Connection(
      clusterApiUrl("mainnet-beta"),
      "confirmed"
    ); // Connect to the Solana cluster

    // Assuming you have the buyer's Keypair and NFT mint authority
    const buyerKeypair = Keypair.fromSecretKey(
      Uint8Array.from(buyerWalletAddress)
    ); // Replace with actual wallet keypair

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: buyerKeypair.publicKey,
        toPubkey: nft.walletAddress, // Assuming the seller's wallet address is the NFT's wallet address
        lamports: price, // Price in lamports (1 SOL = 1,000,000,000 lamports)
      })
    );

    // Step 4: Send the transaction
    const signature = await connection.sendTransaction(transaction, [
      buyerKeypair,
    ]);
    await connection.confirmTransaction(signature, "confirmed");

    // Step 5: Update the NFT ownership in your database
    nft.walletAddress = buyerWalletAddress; // Change ownership
    await nft.save();

    return res.json({
      success: true,
      message: "NFT purchased successfully.",
      transactionId: signature,
    });
  } catch (error) {
    console.error("Purchase error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Transaction failed." });
  }
});
module.exports = router;
