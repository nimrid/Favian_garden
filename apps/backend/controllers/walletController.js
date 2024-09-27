const walletConnectController = (req, res) => {
  const { walletAddress } = req.body;
  console.log(walletAddress);
  if (!walletAddress) {
    return res
      .status(400)
      .json({ success: false, message: "Wallet address is required" });
  }

  // Store wallet address in session (can also use JWT or other storage methods)
  req.session.walletAddress = walletAddress;

  return res.json({ success: true, message: "Wallet address stored" });
};

module.exports = { walletConnectController };
