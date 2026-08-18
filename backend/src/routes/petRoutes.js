import express from "express";

import {
  getPet,
  getPetById,
  addPet,
  updatePet,
  deletePet,
} from "../controllers/petController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(addPet));

router.get("/", authMiddleware, asyncHandler(getPet));

router.get("/:id", authMiddleware, asyncHandler(getPetById));

router.put("/:id", authMiddleware, asyncHandler(updatePet));

router.delete("/:id", authMiddleware, asyncHandler(deletePet));

export default router;
