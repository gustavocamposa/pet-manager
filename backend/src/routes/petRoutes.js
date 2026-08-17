import express from "express";
import {
  getPet,
  getPetById,
  addPet,
  updatePet,
  deletePet,
} from "../controllers/petController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addPet);

router.get("/", authMiddleware, getPet);

router.get("/:id", authMiddleware, getPetById);

router.get("/", authMiddleware, getPet);

router.put("/:id", authMiddleware, updatePet);

router.delete("/:id", authMiddleware, deletePet);

export default router;
