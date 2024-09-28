const multer = require("multer");
const storage = multer.memoryStorage(); // Store image in memory before passing to GridFS
const upload = multer({ storage });

module.exports = upload;
