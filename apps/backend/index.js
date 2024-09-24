const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// const next = require("next");
dotenv.config({ path: "./config.env" });
const dev = process.env.NODE_ENV != "production";

const imageRoutes = require("./routes/imageRoute");
const nftRoutes = require("./routes/nftsRoute");
const path = require("path");
const { errorHandler } = require("./middlewares/error");

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection successfully"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("./uploads", express.static(path.join(__dirname, "uploads")));

app.use(errorHandler);

// Use image generation routes
app.use("/api", imageRoutes);
app.use("/api", nftRoutes); // Expose the NFT route

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
