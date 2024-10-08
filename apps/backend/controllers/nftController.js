const NFT = require("../model/nftModel");
const { uploadImageToGridFS } = require("../utils/gridFsStorage");

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

const secret = JSON.parse(process.env.SOLANA_SECRET_KEY);
const keypair = Keypair.fromSecretKey(new Uint8Array(secret));
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(
    irysStorage({
      address: "https://node1.irys.network",
      providerUrl: "https://api.devnet.solana.com",
      timeout: 1000,
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
    // Convert it to a number
    const royaltyFeeNumber = Number(royaltyFee); // or use parseFloat(royaltyFee) if you're dealing with decimal values

    // Handle invalid number case
    if (isNaN(royaltyFeeNumber)) {
      return res.status(400).json({ error: "Invalid royalty fee value" });
    }

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
      royaltyFee: royaltyFeeNumber,
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
      royaltyFee: metadata.royaltyFeeNumber,
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
      royaltyFee: 5,
      attributes: metadata.attributes,
    };

    const newNft = new NFT(nftData);
    const result = await newNft.save();

    res.status(201).json({ success: true, nft, dbId: result._id });
  } catch (error) {
    console.error("Error occurred while minting NFT:", error);

    // Check for insufficient lamports error
    if (error.message.includes("insufficient lamports")) {
      res.status(400).json({
        success: false,
        message:
          "Transaction failed due to insufficient lamports. Please ensure your wallet has enough SOL to complete the transaction.",
      });
    } else {
      // Handle other errors
      res.status(500).json({ success: false, message: error.message });
    }
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
const purchaseNFT = async (req, res) => {
  try {
    const { mintAddress, buyerWalletAddress, price } = req.body;
    console.log(req.body);
    console.log(price);
    // Ensure the price is provided and is not null or undefined
    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "Price is required." });
    }

    const parsedPrice = parseFloat(price); // Get the float value
    // Convert SOL to lamports (multiply by 1e9 to convert SOL to lamports)
    const priceInLamports = BigInt(parsedPrice * 1e9);

    // Ensure priceInLamports is a valid BigInt
    if (isNaN(Number(priceInLamports)) || priceInLamports < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid price value." });
    }

    // Step 1: Retrieve the NFT from the database
    const nft = await NFT.findOne({ mintAddress });
    console.log(nft);
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

    // Calculate royalty fee and seller amount in lamports
    const royaltyAmount = BigInt(
      Math.floor((nft.royaltyFee / 100) * Number(priceInLamports))
    );
    const sellerAmount = priceInLamports - royaltyAmount;

    // Step 2: Connect to Solana cluster
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // ** Check buyer's wallet balance **
    const buyerBalance = await connection.getBalance(buyerPubKey);
    const transactionFeeBuffer = BigInt(5000);

    if (BigInt(buyerBalance) < priceInLamports + transactionFeeBuffer) {
      return res.status(400).json({
        success: false,
        message: `Insufficient funds. Buyer balance is ${buyerBalance / 1_000_000_000} SOL, but ${priceInLamports / 1_000_000_000} SOL is required.`,
      });
    }

    // Step 3: Fetch the recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();

    // Create transaction to transfer funds (unsigned)
    const totalAmount = royaltyAmount + sellerAmount;

    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: buyerPubKey,
    }).add(
      SystemProgram.transfer({
        fromPubkey: buyerPubKey,
        toPubkey: sellerPubKey,
        lamports: totalAmount,
      })
    );

    // Serialize transaction and send it to the buyer for signing
    const serializedTransaction = transaction
      .serialize({ requireAllSignatures: false })
      .toString("base64");
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

    // //Check if the file is an image
    // const mimeType = file[0].contentType;
    // if (mimeType !== "image/jpeg" && mimeType !== "image/png") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "File is not an image",
    //   });
    // }

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
const base58 = require("base-58");

const confirmAndTransferNFT = async (req, res) => {
  const { signature, mintAddress, buyerWalletAddress } = req.body;
  console.log(req.body);

  try {
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Check if signature is in the correct format
    if (signature?.type === "Buffer" && Array.isArray(signature.data)) {
      // Create a Buffer from the data
      const signatureBuffer = Buffer.from(signature.data);
      // Encode to base58
      const signatureString = base58.encode(signatureBuffer);

      console.log("Encoded Signature: ", signatureString); // Debug log

      // Confirm the transaction using the base58-encoded signature
      // const block = await connection.getLatestBlockhash("confirmed");
      // const confirmation = await connection.confirmTransaction(
      //   {
      //     signature: signatureString, // Changed from signatureString to signature
      //     ...block,
      //   },
      //   "confirmed"
      // );

      // if (confirmation?.value?.err) {
      //   return res.status(500).json({
      //     success: false,
      //     message: "Transaction confirmation failed.",
      //     error: confirmation.value.err,
      //   });
      // }

      //Retrieve the NFT object using the mint address
      const nftObj = await metaplex.nfts().findByMint({ mintAddress });

      if (!nftObj) {
        return res.status(500).json({
          success: false,
          message: "Failed to retrieve NFT object using the mint address.",
        });
      }

      // Transfer the NFT to the buyer's wallet
      const transferResponse = await metaplex.nfts().transfer({
        nftOrSft: nftObj,
        toOwner: new PublicKey(buyerWalletAddress), // Buyer's wallet
      });

      // Mark the NFT as sold in the database
      await NFT.findOneAndUpdate({ mintAddress }, { isSold: true });

      return res.json({
        success: true,
        message: "NFT transferred to buyer successfully.",
        transactionId: transferResponse.signature,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature format. Expected a Buffer object.",
      });
    }
  } catch (error) {
    console.error("Transfer error:", error);
    return res.status(500).json({
      success: false,
      message: "NFT transfer failed.",
      error: error.message || error,
    });
  }
};

module.exports = {
  purchaseNFT,
  getAllNFTs,
  mintNFT,
  recentNFTs,
  getImage,
  confirmAndTransferNFT,
};
