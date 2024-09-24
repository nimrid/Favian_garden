const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ownerWallet: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isListed: { type: Boolean, default: true },
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
