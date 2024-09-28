const NFT = require("../model/nftModel");
const { uploadImageToGridFS } = require("../utils/gridFsStorage");
const {
  Connection,
  clusterApiUrl,
  Keypair,
  Transaction,
  SystemProgram,
} = require("@solana/web3.js");

// const { Connection, Keypair, clusterApiUrl } = require('@solana/web3.js');
const { Metaplex, keypairIdentity, bundlrStorage } = require("@metaplex/js");

const mintNFT = async (req, res) => {
  try {
    const { name, description, attributes } = req.body;

    // Check if file was uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded " });
    }

    // Upload image to MongoDB GridFS
    const imageUrl = await uploadImageToGridFS(req.file);

    // Establish a Solana connection
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Load the wallet from the session or private key
    const keypair = Keypair.fromSecretKey(
      Uint8Array.from("bosy1VC2BH2gh5fdXA3oKn53EuATLwapLWC4VR2sGHJ")
    ); // Replace with your wallet keypair logic

    // Initialize Metaplex
    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(keypair))
      .use(bundlrStorage());

    // Mint the NFT using Metaplex
    const { nft, mintAddress } = await metaplex.nfts().create({
      uri: imageUrl, // The image URL from GridFS
      name,
      sellerFeeBasisPoints: 500, // Example of a 5% seller fee
      symbol: "NFT",
      description,
      creators: [{ address: keypair.publicKey.toBase58(), share: 100 }],
    });

    // Create new NFT entry
    const newNFT = new NFT({
      name,
      description,
      attributes,
      walletAddress: keypair.publicKey.toBase58(), // Assuming you store wallet in session
      imageUrl,
      mintAddress: mintAddress.toBase58(), // Add the mint address here
    });

    await newNFT.save();

    res.status(201).json({ success: true, data: newNFT });
  } catch (error) {
    console.error("Minting error:", error);
    res.status(500).json({
      success: false,
      message: "Minting failed",
      error: error.message,
    });
  }
};

// Get all minted NFTs
const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.json({ success: true, data: nfts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not fetch NFTs",
      error: error.message,
    });
  }
};

// Purchase NFT
const purchaseNFT = async (req, res) => {
  const { mintAddress, buyerWalletAddress, price } = req.body;

  if (!mintAddress || !buyerWalletAddress || !price) {
    return res.status(400).json({
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

    // Step 2: Connect to Solana cluster
    const connection = new Connection(
      clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

    // Step 3: Create transaction to transfer funds (unsigned)
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: buyerWalletAddress, // This should be the buyer's public wallet address
        toPubkey: nft.walletAddress, // Assuming the seller's wallet address is the NFT's wallet address
        lamports: price, // Price in lamports (1 SOL = 1,000,000,000 lamports)
      })
    );

    // Serialize transaction and send it to the buyer for signing
    const serializedTransaction = transaction
      .serialize({ requireAllSignatures: false })
      .toString("base64");

    return res.json({
      success: true,
      message: "Transaction created. Please sign the transaction.",
      transaction: serializedTransaction,
    });
  } catch (error) {
    console.error("Purchase error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Transaction creation failed." });
  }
};

module.exports = {
  purchaseNFT,
  getAllNFTs,
  mintNFT,
};
