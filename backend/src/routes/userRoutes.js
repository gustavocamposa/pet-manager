const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, password, phone, address } = req.body;

  const usuario = {
    id: Date.now().toString(),
    name,
    email,
    password,
    phone,
    address,
  };

  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return res.status(500).json({ error: "Erro ao ler o banco de dados" });
    }

    const db = JSON.parse(data);

    db.users.push(usuario);

    fs.writeFile("db.json", JSON.stringify(db, null, 2), "utf-8", (err) => {
      if (err) {
        console.error("Erro ao salvar o arquivo:", err);
        return res.status(500).json({ error: "Erro ao salvar usuário" });
      }

      return res.status(201).json(usuario);
    });
  });
});

router.get("/", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return;
    }

    const db = JSON.parse(data);

    res.json(db.users);
  });
});

router.get("/:id", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return;
    }

    const db = JSON.parse(data);

    const usuario = db.users.find((usuario) => {
      return usuario.id == req.params.id;
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json(usuario);
  });
});

module.exports = router;
