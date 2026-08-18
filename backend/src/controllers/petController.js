import { readDataBase, writeDataBase } from "../database.js";
import { AppError } from "../errors/AppError.js";

async function getPet(req, res) {
  const db = await readDataBase();

  const pets = db.pets.filter((pet) => {
    return pet.userId === req.user.id;
  });

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

  await writeDataBase(db);

  return res.status(201).json(pet);
}

async function updatePet(req, res) {
  const db = await readDataBase();

  const id = req.params.id;

  const pet = db.pets.find((pet) => {
    return pet.id === id;
  });

  if (!pet) {
    throw new AppError("Pet not found", 404);
  }

  if (pet.userId !== req.user.id) {
    throw new AppError("You do not have permission to update this pet", 403);
  }

  const { name, species, breed, age, weight, sex, notes } = req.body;

  const regex = /^[\p{L}\s]+$/u;

  if (!name || !name.trim() || !regex.test(name)) {
    throw new AppError("Invalid name", 400);
  }

  if (!species || !species.trim() || !regex.test(species)) {
    throw new AppError("Invalid species", 400);
  }

  if (!Number.isInteger(age) || age < 0) {
    throw new AppError("Invalid age", 400);
  }

  if (typeof weight !== "number" || weight <= 0) {
    throw new AppError("Invalid weight", 400);
  }

  if (!sex || !sex.trim() || !regex.test(sex)) {
    throw new AppError("Invalid sex", 400);
  }

  const petUpdated = {
    id: pet.id,
    name,
    species,
    breed,
    age,
    weight,
    sex,
    notes,
    userId: pet.userId,
  };

  const index = db.pets.findIndex((pet) => {
    return pet.id === id;
  });

  db.pets[index] = petUpdated;

  await writeDataBase();

  return res.status(200).json(petUpdated);
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
