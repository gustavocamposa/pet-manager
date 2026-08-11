const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUsersById,
  addUsers,
} = require("../controllers/userController");

router.post("/", addUsers);

router.get("/", getUsers);

router.get("/:id", getUsersById);

router.put("");

module.exports = router;
