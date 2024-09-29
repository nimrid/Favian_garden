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
    secret: "your-sodh93ehhs-key", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set secure to true in production
      maxAge: 1000 * 60 * 30, // Session expires in 30 minutes
    },
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

// const express = require("express");
// const { MongoClient, GridFSBucket } = require("mongodb");
// const {
//   Metaplex,
//   keypairIdentity,
//   irysStorage,
// } = require("@metaplex-foundation/js");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { Connection, clusterApiUrl } = require("@solana/web3.js");
// const { Keypair } = require("@solana/web3.js");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware to parse JSON
// app.use(express.json());

// // Load keypair
// const keypairPath = path.resolve(__dirname, "my-keypair.json");
// const secret = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
// const keypair = Keypair.fromSecretKey(new Uint8Array(secret));

// // MongoDB connection
// const mongoUri = process.env.MONGODB_URL;
// const client = new MongoClient(mongoUri);
// let gridFSBucket;

// client.connect().then(() => {
//   console.log("Connected to MongoDB");
//   const db = client.db("Favian Garden");
//   gridFSBucket = new GridFSBucket(db);
// });

// // Set up multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Initialize Metaplex
// const connection = new Connection(clusterApiUrl("devnet"));
// const metaplex = Metaplex.make(connection)
//   .use(keypairIdentity(keypair)) // Use the loaded keypair
//   .use(
//     irysStorage({
//       address: "https://node1.irys.network",
//       providerUrl: "https://api.devnet.solana.com",
//       timeout: 60000,
//     })
//   );

// // Endpoint to mint NFT
// app.post("/api/v1/nfts/mint", upload.single("image"), async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const imageBuffer = req.file.buffer;

//     // Upload image to GridFS
//     const uploadStream = gridFSBucket.openUploadStream(`${name}.png`);
//     uploadStream.end(imageBuffer);
//     const fileId = uploadStream.id;

//     // Prepare metadata for the NFT
//     const metadata = {
//       name,
//       symbol: "",
//       uri: `http://localhost:${PORT}/api/v1/files/${fileId}`, // Replace with your actual URL
//       seller_fee_basis_points: 500, // 5%
//       creators: null,
//       description,
//     };

//     // Mint the NFT
//     const { nft } = await metaplex.nfts().create({
//       uri: metadata.uri,
//       name: metadata.name,
//       sellerFeeBasisPoints: metadata.seller_fee_basis_points,
//       symbol: metadata.symbol,
//       creators: metadata.creators,
//     });

//     res.status(201).json({ success: true, nft });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Endpoint to retrieve image from GridFS
// app.get("/api/v1/files/:id", async (req, res) => {
//   const fileId = req.params.id;
//   const downloadStream = gridFSBucket.openDownloadStream(fileId);

//   downloadStream.on("error", (error) => {
//     res.status(404).send("File not found");
//   });

//   downloadStream.pipe(res);
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
