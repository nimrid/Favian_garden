const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  buyerWallet: { type: String, required: true },
  sellerWallet: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
