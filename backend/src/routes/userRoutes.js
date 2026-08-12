import express from "express";
import {
  getUsers,
  getUsersById,
  addUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", addUsers);

router.get("/", getUsers);

router.get("/:id", getUsersById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
