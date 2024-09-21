const express = require("express");
const {
  getUserController,
  updateUserController,
  buyCredit,
} = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", getUserController);
router.put("/update/:userId", updateUserController);
router.put("/credit/:userId", buyCredit);

module.exports = router;
