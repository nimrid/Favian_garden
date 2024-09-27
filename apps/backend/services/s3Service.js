const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// Initialize S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Upload image to S3
const uploadImageToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${Date.now()}_${path.basename(file.path)}`, // Unique file name
    Body: fileStream,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location); // Return the URL of the uploaded image
      }
    });
  });
};

module.exports = { uploadImageToS3 };
