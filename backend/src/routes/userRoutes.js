import express from "express";
import {
  getUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(addUser));

router.get("/", getUsers);

router.get("/:id", authMiddleware, asyncHandler(getUsersById));

router.put("/:id", updateUser);

router.delete("/:id", authMiddleware, asyncHandler(deleteUser));
export default router;
