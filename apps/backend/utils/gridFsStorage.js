const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const crypto = require("crypto");

// MongoDB connection setup
let gfs, gridfsBucket;

mongoose.connection.once("open", () => {
  gridfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads", // The bucket name in GridFS
  });
  gfs = gridfsBucket;
});

// Function to upload image to GridFS
const uploadImageToGridFS = (file) => {
  return new Promise((resolve, reject) => {
    // Create a unique filename
    const filename = crypto.randomBytes(16).toString("hex") + file.originalname;

    // Create a write stream in GridFS
    const writeStream = gridfsBucket.openUploadStream(filename);

    // Write the file buffer to GridFS
    writeStream.end(file.buffer);

    writeStream.on("finish", () => {
      // Return the generated file URL (or file ID for further use)
      const imageUrl = `http://localhost:5000/api/files/${filename}`; // You can adjust this URL to your API structure
      resolve(imageUrl);
    });

    writeStream.on("error", (err) => {
      reject(err); // Handle any errors during file upload
    });
  });
};

module.exports = { uploadImageToGridFS };
