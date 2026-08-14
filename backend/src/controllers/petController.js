import { readDataBase, writeDataBase } from "../database.js";

async function getPet(req, res) {
  const db = await readDataBase();

  res.json(db.pets);
}

async function getPetById(req, res) {
  const db = await readDataBase();

  const pet = db.pets.find((pet) => {
    return pet.id == req.params.id;
  });

  if (!pet) {
    return res.status(404).json({ error: "Pet não encontrado" });
  }

  return res.json(pet);
}

async function addPet(req, res) {
  const db = await readDataBase();

  const { name, species, breed, age, weight, sex, notes, userId } = req.body;

  const pet = {
    id: Date.now().toString(),
    name,
    species,
    breed,
    age,
    weight,
    sex,
    notes,
    userId,
  };

  db.pets.push(pet);

  await writeDataBase();

  return res.status(201).json(pet);
}

async function updatePet(req, res) {
  const db = await readDataBase();
  const id = req.params.id;

  const pet = db.pets.find((pet) => {
    return pet.id == id;
  });

  if (!pet) {
    return res.status(404).json({ error: "Pet não encontrado" });
  }

  const data = req.body;

  const petAtt = {
    ...pet,
    ...data,
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
    return pet.id == req.params.id;
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
