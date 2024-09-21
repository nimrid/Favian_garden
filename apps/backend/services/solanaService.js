// services/solanaService.js
const { Connection, PublicKey, Keypair } = require("@solana/web3.js");
const { mintNFT } = require("@metaplex/js");
const fs = require("fs");

// Set up Solana connection
const connection = new Connection(process.env.SOLANA_CLUSTER);
const wallet = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.PHANTOM_WALLET_PRIVATE_KEY))
);

const mintAIImageNFT = async (imageUri, name, symbol) => {
  try {
    const txId = await mintNFT({
      connection,
      wallet,
      uri: imageUri, // IPFS/Arweave URL
      name,
      symbol,
      sellerFeeBasisPoints: 500, // 5% royalty
    });
    return txId;
  } catch (error) {
    throw new Error("Failed to mint NFT");
  }
};

module.exports = { mintAIImageNFT };
