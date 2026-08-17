import { readDataBase, writeDataBase } from "../database.js";

async function getPet(req, res) {
  const db = await readDataBase();
  const pets = db.pets.filter((pet) => {
    return pet.userId === req.user.id;
  });
  return res.json(pets);
}

async function getPetById(req, res) {
  const db = await readDataBase();

  const pet = db.pets.find((pet) => {
    return pet.id == req.params.id && pet.userId === req.user.id;
  });

  if (!pet) {
    return res.status(404).json({ error: "Pet não encontrado" });
  }

  return res.json(pet);
}

async function addPet(req, res, next) {
  try {
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
      return res.status(400).json({ error: "Nome não encontrado." });
    }
    if (!species || !species.trim() || !regex.test(species)) {
      return res.status(400).json({ error: "Espécie não encontrada." });
    }
    if (!Number.isInteger(age) || age < 0) {
      return res.status(400).json({
        error: "Idade inválida.",
      });
    }
    if (typeof weight !== "number" || weight <= 0) {
      return res.status(400).json({
        error: "Peso inválido.",
      });
    }

    db.pets.push(pet);

    await writeDataBase();

    return res.status(201).json(pet);
  } catch (error) {
    next(error);
  }
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
    return pet.id == req.params.id && pet.userId === req.user.id;
  });
  if (!pet) {
    return res.status(404).json({ error: "Pet não encontrado." });
  }

  const delPet = db.pets.filter((pet) => {
    return pet.id !== id;
  });
  db.pets = delPet;

  await writeDataBase();

  return res.status(200).json(delPet);
}

export { getPet, getPetById, addPet, updatePet, deletePet };
