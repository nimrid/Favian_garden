const NFT = require("../model/nftModel");
const { uploadImageToGridFS } = require("../utils/gridFsStorage");
const path = require("path");
const fs = require("fs");
const {
  Metaplex,
  keypairIdentity,
  irysStorage,
} = require("@metaplex-foundation/js");
// const { v4: uuidv4 } = require("uuid"); // Import UUID library for custom token

const {
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
  Connection,
  clusterApiUrl,
} = require("@solana/web3.js");
const {
  TOKEN_PROGRAM_ID,
  MintLayout,
  createInitializeMintInstruction,
} = require("@solana/spl-token");

const MINT_SIZE = MintLayout.span; // Size of the mint account

const createMintAccount = async (connection, payer) => {
  // Generate a new mint account keypair
  const mint = Keypair.generate();

  // Get the minimum lamports required for rent exemption
  const lamports =
    await connection.getMinimumBalanceForRentExemption(MINT_SIZE);

  // Create a transaction to create and initialize the mint account
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports: lamports, // Rent-exempt lamports
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint.publicKey, // Mint account public key
      0, // Decimal places (0 for NFTs)
      payer.publicKey, // Mint authority
      payer.publicKey, // Freeze authority (usually set to the same as mint authority)
      TOKEN_PROGRAM_ID // Solana token program
    )
  );

  // Send and confirm the transaction
  try {
    await sendAndConfirmTransaction(connection, transaction, [payer, mint]);
    console.log(
      "Mint account successfully created:",
      mint.publicKey.toBase58()
    );
  } catch (error) {
    console.error("Error creating mint account:", error);
    throw error; // Rethrow to handle it in the calling function
  }

  // Return the mint public key for further usage
  return mint.publicKey;
};

// MINT NFT
// Load keypair
const keypairPath = path.resolve(__dirname, "../my-keypair.json");
const secret = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(secret));

// Initialize Metaplex
const connection = new Connection(clusterApiUrl("devnet"));

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair)) // Use the loaded keypair
  .use(
    irysStorage({
      address: "https://node1.irys.network",
      providerUrl: "https://api.devnet.solana.com",
      timeout: 60000,
    })
  );
const mintNFT = async (req, res) => {
  try {
    const { name, description, attributes, walletAddress, price, royaltyFee } =
      req.body;

    const imageUrl = (await uploadImageToGridFS(req.file)).trim();
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Error("Invalid image URL");
    }

    console.log("Image URL for NFT:", imageUrl); // Log the image URL
    const mintAddress = await createMintAccount(connection, keypair);

    console.log("Mint account created:", mintAddress.toBase58());
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const accountInfo = await connection.getAccountInfo(mintAddress);
    if (!accountInfo) {
      throw new Error("Mint account does not exist in the blockchain.");
    }
    const metadata = {
      name,
      symbol: "NFT",
      uri: imageUrl,
      seller_fee_basis_points: 500,
      creators: null,
      description,
      price: price,
      royaltyFee: royaltyFee,
      walletAddress: walletAddress,
      attributes: attributes,
      mintAddress,
    };

    console.log("Metadata before saving:", metadata);
    console.log("imageUrl type:", typeof metadata.uri);

    const { nft } = await metaplex.nfts().create({
      uri: metadata.uri,
      name: metadata.name,
      sellerFeeBasisPoints: metadata.seller_fee_basis_points,
      symbol: metadata.symbol,
      creators: metadata.creators,
      maxSupply: 1,
      mint: mintAddress,
      price: metadata.price,
      royaltyFee: metadata.royaltyFee,
      attributes: metadata.attributes,
      mintAddress,
    });

    const nftData = {
      mintAddress: mintAddress.toBase58(),
      name: metadata.name,
      description: metadata.description,
      uri: metadata.uri,
      sellerFeeBasisPoints: metadata.seller_fee_basis_points,
      createdAt: new Date(),
      walletAddress: metadata.walletAddress,
      price: metadata.price,
      royaltyFee: metadata.royaltyFee,
      attributes: metadata.attributes,
    };

    const newNft = new NFT(nftData);
    const result = await newNft.save();

    res.status(201).json({ success: true, nft, dbId: result._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
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
