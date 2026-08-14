import fs, { write } from "fs";
import { readDataBase, writeDataBase } from "../database.js";
import { error } from "console";
import bcrypt from "bcrypt";

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
    return res.status(401).json({ error: "Senha errada." });
  }
}
async function getUsersById(req, res) {
  const db = await readDataBase();

  const usuario = db.users.find((usuario) => {
    return usuario.id == req.params.id;
  });

  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.json(usuario);
}

async function addUsers(req, res) {
  const db = await readDataBase();

  const { name, email, password, phone, address } = req.body;

  const pass = await bcrypt.hash(password, 10);

  const usuario = {
    id: Date.now().toString(),
    name,
    email,
    password: pass,
    phone,
    address,
  };

  db.users.push(usuario);

  await writeDataBase();

  return res.status(201).json(usuario);
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
    return user.id == req.params.id;
  });
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  const delUser = db.users.filter((user) => {
    return user.id !== id;
  });
  db.users = delUser;

  await writeDataBase();

  return res.status(200).json(delUser);
}
export { getUsers, getUsersById, addUsers, updateUser, deleteUser };
