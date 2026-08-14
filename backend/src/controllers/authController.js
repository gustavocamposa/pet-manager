import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readDataBase } from "../database.js";

async function login(req, res) {
  const { email, password } = req.body;

  const db = await readDataBase();

  const user = db.users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(404).json({
      error: "Usuário não encontrado",
    });
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.status(401).json({
      error: "Senha errada",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "senha",
  );

  return res.status(200).json({
    message: "Login realizado com sucesso",
    token: token,
  });
}

export { login };
