// routes/transactionRoutes.js
const express = require("express");
const { Connection, PublicKey, Transaction } = require("@solana/web3.js");
const router = express.Router();

router.post("/submit-transaction", async (req, res) => {
  try {
    const { signedTransaction } = req.body;
    const connection = new Connection(process.env.SOLANA_CLUSTER);

    // Convert the signed transaction into a Transaction object
    const transaction = Transaction.from(
      Buffer.from(signedTransaction, "base64")
    );

    // Send transaction to Solana network
    const txId = await connection.sendRawTransaction(transaction.serialize());

    res.json({ success: true, txId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
