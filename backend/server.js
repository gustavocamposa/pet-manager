const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;

fs.readFile("db.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }
  const db = JSON.parse(data);
  console.log(db.users);
  console.log(db.pets);
});

app.get("/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return;
    }
    const db = JSON.parse(data);
        res.json(db.users)
  });
});

app.get("/pets", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return;
    }
    const db = JSON.parse(data);
        res.json(db.pets)
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
