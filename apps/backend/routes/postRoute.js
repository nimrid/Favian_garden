const express = require("express");
const {
  createPostWithImagesController_V2,
  createPostWithImagesController_V3,
  getPostController,
  getUserPostController,
  getSinglePostController,
  deletePostController,
  likePostController,
  dislikePostController,
} = require("../controllers/postController");
const router = express.Router();

router.post("/create/v3/:userId", createPostWithImagesController_V3);

router.post("/create/v2/:userId", createPostWithImagesController_V2);

router.get("/all", getPostController);
router.get("/single/:userId", getSinglePostController);
router.get("/user/:userId", getUserPostController);

router.delete("/delete/:postId", deletePostController);
router.post("/like/:postId", likePostController);
router.post("/dislike/:postId", dislikePostController);

module.exports = router;
