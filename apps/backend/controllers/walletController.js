exports.connectWallet = (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: "Wallet address is required" });
  }

  req.session.walletAddress = walletAddress; // Store wallet address in session
  console.log("Received Wallet Address:", walletAddress);
  console.log("Session Data:", req.session); // Log session data

  res
    .status(200)
    .json({ message: "Wallet address received successfully", walletAddress });
};
