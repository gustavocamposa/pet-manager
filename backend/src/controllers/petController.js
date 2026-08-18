import { readDataBase, writeDataBase } from "../database.js";
import { AppError } from "../errors/AppError.js";

async function getPet(req, res) {
  const db = await readDataBase();

  console.log("REQ.USER:", req.user);
  console.log("REQ.USER.ID:", req.user.id);
  console.log("PET.USER.ID:", db.pets[0]?.userId);

  const pets = db.pets.filter((pet) => {
    return pet.userId === req.user.id;
  });

  console.log("PETS FILTRADOS:", pets);

  return res.json(pets);
}
async function getPetById(req, res, next) {
  const db = await readDataBase();

  const pet = db.pets.find((pet) => {
    return pet.id == req.params.id && pet.userId === req.user.id;
  });

  if (!pet) {
    throw new AppError("Pet não encontrado", 404);
  }

  return res.status(200).json(pet);
}

async function addPet(req, res, next) {
  const db = await readDataBase();

  const { name, species, breed, age, weight, sex, notes } = req.body;

  const pet = {
    id: Date.now().toString(),
    name,
    species,
    breed,
    age,
    weight,
    sex,
    notes,
    userId: req.user.id,
  };

  const regex = /^[\p{L}\s]+$/u;

  if (!name || !name.trim() || !regex.test(name)) {
    throw new AppError("Nome inválido.", 400);
  }
  if (!species || !species.trim() || !regex.test(species)) {
    throw new AppError("Espécie inválida.", 400);
  }
  if (!Number.isInteger(age) || age < 0) {
    throw new AppError("Idade inválida.", 400);
  }
  if (typeof weight !== "number" || weight <= 0) {
    throw new AppError("Peso inválido.", 400);
  }

  db.pets.push(pet);

  await writeDataBase();

  return res.status(201).json(pet);
}

async function updatePet(req, res) {
  const db = await readDataBase();
  const id = req.params.id;

  const pet = db.pets.find((pet) => {
    return pet.id == id && pet.userId === req.user.id;
  });

  if (!pet) {
    return res.status(404).json({ error: "Pet não encontrado" });
  }

  const { name, species, breed, age, weight, sex, notes } = req.body;

  const petAtt = {
    id: pet.id,
    userId: pet.userId,
    name,
    species,
    breed,
    age,
    weight,
    sex,
    notes,
  };

  const index = db.pets.findIndex((pet) => pet.id == id);

  db.pets[index] = petAtt;

  await writeDataBase();

  return res.status(200).json(petAtt);
}

async function deletePet(req, res) {
  const db = await readDataBase();
  const id = req.params.id;

  const pet = db.pets.find((pet) => {
    return pet.id === id && pet.userId === req.user.id;
  });

  if (!pet) {
    throw new AppError("Pet not found", 404);
  }

  db.pets = db.pets.filter((pet) => {
    return pet.id !== id;
  });

  await writeDataBase();

  return res.status(200).json({
    message: "Pet deleted successfully",
  });
}
export { getPet, getPetById, addPet, updatePet, deletePet };
