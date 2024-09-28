const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const crypto = require("crypto");

// MongoDB connection setup
let gfs, gridfsBucket;

mongoose.connection.once("open", () => {
  gridfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  gfs = gridfsBucket;
});

const uploadImageToGridFS = (file) => {
  return new Promise((resolve, reject) => {
    const filename = crypto.randomBytes(16).toString("hex") + file.originalname;
    const writeStream = gridfsBucket.openUploadStream(filename);

    writeStream.end(file.buffer);

    writeStream.on("finish", () => {
      const imageUrl = `/api/files/${filename}`;
      resolve(imageUrl);
    });

    writeStream.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = { uploadImageToGridFS };
