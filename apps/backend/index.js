const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const { errorHandler } = require("./middlewares/error"); // Error handling middleware

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse request body and cookies
// app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Update this to your frontend URL
    credentials: true,
  })
);
app.use(express.json());
// Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.error("DB connection error:", err));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-default-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set secure to true in production
      maxAge: 1000 * 60 * 30, // Session expires in 30 minutes
    },
  })
);

// Define routes
const imageRoute = require("./routes/imageRoute");
const nftsRoutes = require("./routes/nftsRoute");
// const walletRoute = require("./routes/walletRoute");

// Endpoint to connect wallet and store wallet address in session
app.post("/api/v1/wallet/connect", (req, res) => {
  console.log("Incoming Request Body:", req.body); // Log request body
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
});

// Error handling middleware
// Register routes
app.use("/api/v1/image", imageRoute);
app.use("/api/v1/nfts", nftsRoutes); // Expose the NFT route
// app.use("/api/v1/wallet", walletRoute); // Uncomment if using wallet routes

app.use(errorHandler);
// Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
