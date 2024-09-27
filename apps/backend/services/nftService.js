// services/nftService.js

const NFT = require("../model/nftModel");

const mintNFT = async (data) => {
  const { name, description, attributes, image } = data;

  const newNFT = new NFT({
    name,
    description,
    attributes,
    image,
  });

  await newNFT.save();
  return newNFT;
};

module.exports = { mintNFT };
