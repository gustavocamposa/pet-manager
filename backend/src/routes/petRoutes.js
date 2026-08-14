import express from "express";
import {
  getPet,
  getPetById,
  addPet,
  updatePet,
  deletePet,
} from "../controllers/petController.js";

const router = express.Router();

router.post("/", addPet);

router.get("/", getPet);

router.get("/:id", getPetById);

router.put("/:id", updatePet);

router.delete("/:id", deletePet);

export default router;
