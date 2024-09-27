const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const dev = process.env.NODE_ENV != "production";

const imageRoute = require("./routes/imageRoute");
const nftsRoutes = require("./routes/nftsRoute");
const walletRoute = require("./routes/walletRoute");
const path = require("path");
const { errorHandler } = require("./middlewares/error");

const port = process.env.PORT || 8080;

app.use(
  session({
    secret: "your-sodh93ehhs-key", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection successfully"));

app.use(
  cors({
    origin: "http://localhost:3001", // Update this to your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("./uploads", express.static(path.join(__dirname, "uploads")));

app.use(errorHandler);
app.use("/api/v1/image", imageRoute);
app.use("/api/v1/nfts", nftsRoutes); // Expose the NFT route
// for wallet
app.use("/api/v1/wallet", walletRoute);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
