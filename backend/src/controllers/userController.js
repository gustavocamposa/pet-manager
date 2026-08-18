import fs, { write } from "fs";
import { readDataBase, writeDataBase } from "../database.js";
import { error } from "console";
import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError.js";

async function getUsers(req, res) {
  const db = await readDataBase();

  res.json(db.users);
}

async function login(req, res) {
  const { email, password } = req.body;

  const db = await readDataBase();

  const user = db.users.find((user) => {
    return user.email === email;
  });
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  const result = await bcrypt.compare(password, user.password);
  if (result == false) {
    return res.status(401).json({ error: "Senha inválida." });
  }
}

async function getUsersById(req, res) {
  const db = await readDataBase();

  const usuario = db.users.find((usuario) => {
    return usuario.id === req.params.id;
  });

  if (!usuario) {
    throw new AppError("User not found", 404);
  }

  if (req.user.id !== req.params.id) {
    throw new AppError("You do not have permission to access this user", 403);
  }

  return res.status(200).json(usuario);
}

async function addUser(req, res) {
  const db = await readDataBase();

  const { name, email, password, phone, address } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  };

  db.users.push(user);

  await writeDataBase(db);

  return res.status(201).json(user);
}
async function updateUser(req, res) {
  const db = await readDataBase();
  const id = req.params.id;

  const user = db.users.find((user) => {
    return user.id == id;
  });

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const data = req.body;

  const userAtt = {
    ...user,
    ...data,
  };

  const index = db.users.findIndex((user) => user.id == id);

  db.users[index] = userAtt;

  await writeDataBase();

  return res.status(200).json(userAtt);
}

async function deleteUser(req, res) {
  const db = await readDataBase();
  const id = req.params.id;

  const user = db.users.find((user) => {
    return user.id === id;
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (req.user.id !== id) {
    throw new AppError("You do not have permission to delete this user", 403);
  }

  db.users = db.users.filter((user) => {
    return user.id !== id;
  });

  await writeDataBase();

  return res.status(200).json({
    message: "User deleted successfully",
  });
}
export { getUsers, getUsersById, addUser, updateUser, deleteUser };
