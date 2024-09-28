const { Connection, Keypair } = require("@solana/web3.js");
const { programs, actions } = require("@metaplex/js");

const mintNFT = async (name, description, attributes, imageUrl) => {
  // Connect to Solana network
  const connection = new Connection(process.env.SOLANA_RPC_URL);

  // Load the wallet (keypair)
  const wallet = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(process.env.SOLANA_PRIVATE_KEY))
  );

  // Metadata for the NFT
  const metadata = {
    name,
    description,
    symbol: "NFT",
    uri: imageUrl, // Image URL from S3
    sellerFeeBasisPoints: 500, // 5% royalties
    creators: null, // Could specify creator addresses
    collection: null,
    uses: null,
    attributes,
  };

  try {
    // Use Metaplex to create and mint the NFT
    const { mintAddress } = await actions.createMetadata({
      connection,
      wallet,
      metadata,
    });

    return mintAddress; // Return minted NFT address
  } catch (error) {
    throw new Error(`Minting failed: ${error.message}`);
  }
};

module.exports = { mintNFT };
