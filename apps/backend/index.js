const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// const next = require("next");
dotenv.config({ path: "./config.env" });
const dev = process.env.NODE_ENV != "production";
// const nextServer = next({ dev });
// const handle = nextServer.getRequestHandler();

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

const path = require("path");
const { errorHandler } = require("./middlewares/error");

const verifyToken = require("./middlewares/verifyToken");

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection successfully"));

app.use(express.json());
app.use(cookieParser());
app.use("./uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", verifyToken, userRoute);

app.use(errorHandler);

// nextServer.prepare().then(() => {
//   app.get("*", (req, res) => {
//     return handle(req, res);
//   });
// });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
