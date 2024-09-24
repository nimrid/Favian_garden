const Image = require("../model/Image");
const Transaction = require("../model/Transaction");

// Generate and save an image
exports.saveImage = async (req, res) => {
  try {
    // Assume imageUrl is returned from the image generation API
    const { imageUrl, description, price, ownerWallet } = req.body;

    const newImage = new Image({ imageUrl, description, price, ownerWallet });
    await newImage.save();

    res.status(201).json(newImage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating image", error: error.message });
  }
};

// List an image for sale
exports.listImage = async (req, res) => {
  const { id, price, description } = req.body;

  try {
    const image = await Image.findByIdAndUpdate(
      id,
      { price, description, isListed: true },
      { new: true }
    );
    res.status(200).json(image);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error listing image", error: error.message });
  }
};

// Purchase an image
exports.purchaseImage = async (req, res) => {
  const { imageId, buyerWallet } = req.body;

  try {
    const image = await Image.findById(imageId);
    if (!image || !image.isListed) {
      return res
        .status(404)
        .json({ message: "Image not found or not listed for sale" });
    }

    // Perform payment processing with Solana here (not implemented)

    // Update image ownership
    image.ownerWallet = buyerWallet;
    image.isListed = false;
    await image.save();

    // Log the transaction
    const transaction = new Transaction({
      imageId: image._id,
      buyerWallet,
      sellerWallet: image.ownerWallet,
      amount: image.price,
    });
    await transaction.save();

    res.status(200).json({ message: "Image purchased successfully", image });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error purchasing image", error: error.message });
  }
};
