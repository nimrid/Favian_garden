const { Connection, clusterApiUrl, PublicKey } = require("@solana/web3.js");
const { Metaplex } = require("@metaplex-foundation/js");

// Use devnet for testing
const connection = new Connection("https://api.testnet.solana.com/");
const metaplex = new Metaplex(connection);

exports.getNFTs = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const ownerAddress = new PublicKey(walletAddress);

    // Fetch NFTs from the wallet address
    const nfts = await metaplex.nfts().findAllByOwner(ownerAddress);

    const nftData = nfts.map((nft) => ({
      name: nft.metadata.name,
      image: nft.metadata.image,
      description: nft.metadata.description,
    }));

    res.status(200).json(nftData);
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).json({ error: "Error fetching NFTs" });
  }
};
