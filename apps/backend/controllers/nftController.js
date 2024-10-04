const NFT = require("../model/nftModel");
const { uploadImageToGridFS } = require("../utils/gridFsStorage");
const path = require("path");
const fs = require("fs");
const {
  Metaplex,
  keypairIdentity,
  irysStorage,
} = require("@metaplex-foundation/js");

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
  createInitializeAccountInstruction,
  createMintToInstruction,
} = require("@solana/spl-token");

const keypairPath = path.resolve(__dirname, "../my-keypair.json");
const secret = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(secret));

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(
    irysStorage({
      address: "https://node1.irys.network",
      providerUrl: "https://api.devnet.solana.com",
      timeout: 6000,
    })
  );

const MINT_SIZE = MintLayout.span; // Size of the mint account
const TOKEN_ACCOUNT_SIZE = 165; // Size of the token account in bytes

// Function to create a mint account
const createMintAccount = async (connection, payer) => {
  const mint = Keypair.generate(); // Generate new mint account
  const lamports =
    await connection.getMinimumBalanceForRentExemption(MINT_SIZE);

  // Create and initialize mint account
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports: lamports,
      programId: TOKEN_PROGRAM_ID,
    }),

    createInitializeMintInstruction(
      mint.publicKey,
      0, // 0 decimal places for NFTs
      payer.publicKey, // Mint authority
      payer.publicKey, // Freeze authority
      TOKEN_PROGRAM_ID
    )
  );

  // Send and confirm the transaction
  await sendAndConfirmTransaction(connection, transaction, [payer, mint]);

  // Ensure mint account exists by waiting for the account to be fully created
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return mint.publicKey;
};

// Function to create a token account
const createTokenAccount = async (connection, mintAddress, ownerAddress) => {
  const tokenAccount = Keypair.generate(); // Generate new token account
  const lamports =
    await connection.getMinimumBalanceForRentExemption(TOKEN_ACCOUNT_SIZE);

  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: keypair.publicKey,
      newAccountPubkey: tokenAccount.publicKey,
      space: TOKEN_ACCOUNT_SIZE,
      lamports: lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeAccountInstruction(
      tokenAccount.publicKey,
      mintAddress,
      ownerAddress,
      TOKEN_PROGRAM_ID
    )
  );

  await sendAndConfirmTransaction(connection, transaction, [
    keypair,
    tokenAccount,
  ]);
  return tokenAccount.publicKey;
};

// Function to mint tokens
const mintTo = async (
  connection,
  payer,
  mintAddress,
  dest,
  authority,
  signers
) => {
  const transaction = new Transaction().add(
    createMintToInstruction(
      mintAddress,
      dest,
      authority,
      1, // Amount of tokens to mint
      [],
      TOKEN_PROGRAM_ID
    )
  );

  await sendAndConfirmTransaction(connection, transaction, [payer, ...signers]);
};

// MINT NFT Function
const mintNFT = async (req, res) => {
  try {
    const { name, description, attributes, walletAddress, price, royaltyFee } =
      req.body;

    const imageUrl = (await uploadImageToGridFS(req.file)).trim();
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Error("Invalid image URL");
    }

    console.log("Image URL for NFT:", imageUrl);
    const balance = await connection.getBalance(keypair.publicKey);
    console.log(`Balance of the keypair is: ${balance} lamports`);

    // Convert walletAddress to PublicKey
    let userPublicKey;
    try {
      userPublicKey = new PublicKey(walletAddress);
    } catch (error) {
      throw new Error("Invalid wallet address format.");
    }

    // Create mint account and specify the user as the mint authority
    const mintAddress = await createMintAccount(
      connection,
      keypair // Keep the keypair as payer for transaction costs
    );

    // Create token account for the user's wallet address
    const userTokenAccount = await createTokenAccount(
      connection,
      mintAddress,
      userPublicKey
    );

    // Mint the NFT to the user's token account
    await mintTo(
      connection,
      keypair, // Use the keypair to sign the transaction
      mintAddress,
      userTokenAccount,
      keypair.publicKey, // Use the keypair as the mint authority
      [] // No additional signers
    );

    // Metadata for NFT
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

    // Mint the NFT using Metaplex
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

    // Save to database
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
    // Fetch only NFTs that have not been sold
    const nfts = await NFT.find({ isSold: false });
    res.json({ success: true, data: nfts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not fetch NFTs",
      error: error.message,
    });
  }
};
// PURCHASE NFT
const purchaseNFT = async (req, res) => {
  console.log(req.body);
  const { mintAddress, buyerWalletAddress, price } = req.body;
  // Convert price back to a number
  const parsedPrice = Number(price);

  if (isNaN(parsedPrice)) {
    return res.status(400).json({
      success: false,
      message: "Invalid price value.",
    });
  }
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

    // Check if the NFT has royalty and creator information
    if (!nft.royaltyFee || !nft.walletAddress) {
      return res.status(400).json({
        success: false,
        message: "NFT does not have royalty or creator information.",
      });
    }

    // Ensure wallet addresses are PublicKey objects
    const buyerPubKey = new PublicKey(buyerWalletAddress);
    const sellerPubKey = new PublicKey(nft.walletAddress);

    // Calculate royalty fee
    const royaltyAmount = (nft.royaltyFee / 100) * price;
    const sellerAmount = price - royaltyAmount;

    // Step 2: Connect to Solana cluster
    const connection = new Connection(
      clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

    // ** Check buyer's wallet balance **
    const buyerBalance = await connection.getBalance(buyerPubKey);

    // Check if the buyer has enough balance to cover price + transaction fees
    const transactionFeeBuffer = 5000; // A small buffer for transaction fees
    if (buyerBalance < price + transactionFeeBuffer) {
      return res.status(400).json({
        success: false,
        message: `Insufficient funds. Buyer balance is ${
          buyerBalance / 1_000_000_000
        } SOL, but ${price / 1_000_000_000} SOL is required.`,
      });
    }

    // Step 3: Create transaction to transfer funds (unsigned)
    const transaction = new Transaction()
      // Transfer royalty to the creator's wallet
      .add(
        SystemProgram.transfer({
          fromPubkey: buyerPubKey, // Buyer's wallet as PublicKey
          toPubkey: sellerPubKey, // Seller's wallet as PublicKey
          lamports: royaltyAmount, // Royalty amount in lamports
        })
      )
      // Transfer remaining amount to the seller's wallet
      .add(
        SystemProgram.transfer({
          fromPubkey: buyerPubKey, // Buyer's wallet as PublicKey
          toPubkey: sellerPubKey, // Seller's wallet as PublicKey
          lamports: sellerAmount, // Remaining amount after royalty
        })
      );

    // Serialize transaction and send it to the buyer for signing
    const serializedTransaction = transaction
      .serialize({ requireAllSignatures: false })
      .toString("base64");

    // ** Update the NFT to mark it as sold after the transaction is successfully created **
    await NFT.findOneAndUpdate({ mintAddress }, { isSold: true });

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

// Get recently minted NFTs for a user
const recentNFTs = async (req, res) => {
  const { walletAddress } = req.params;

  try {
    // Find NFTs minted by the specified wallet address, sorted by mintedAt in descending order
    const nfts = await NFT.find({ walletAddress })
      .sort({ mintedAt: -1 }) // Sort by the most recently minted
      .limit(3); // Limit to the most recent 10 NFTs
    console.log(nfts);
    return res.status(200).json({
      success: true,
      nfts,
    });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const { getGfs } = require("../utils/gridFsStorage");
// Get image file by imageUrl
const getImage = async (req, res) => {
  const { uri } = req.params; // Get the image URL from the request

  try {
    const gfs = getGfs(); // Retrieve gfs safely

    // Assuming the imageUrl is the filename, you can directly extract it
    const filename = uri; // Adjust this if the uri is a full URL

    // Find the file in GridFS using the filename
    const file = await gfs.find({ filename }).toArray(); // Use gfs, not uploadImageToGridFS
    console.log(file);
    // Check if the file exists
    if (!file || file.length === 0) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    //Check if the file is an image
    const mimeType = file[0].contentType;
    if (mimeType !== "image/jpeg" && mimeType !== "image/png") {
      return res.status(400).json({
        success: false,
        message: "File is not an image",
      });
    }

    // Stream the image to the response
    const readStream = gfs.openDownloadStreamByName(filename); // Open a download stream
    readStream.pipe(res); // Pipe the stream to the response
  } catch (error) {
    console.error("Error retrieving image:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
module.exports = {
  purchaseNFT,
  getAllNFTs,
  mintNFT,
  recentNFTs,
  getImage,
};
