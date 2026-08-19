import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const arquivo = new JSONFile("db.json");

const low = new Low(arquivo, {
  users: [],
  pets: [],
});

async function readDataBase() {
  await low.read();

  return low.data;
}

async function writeDataBase() {
  await low.write();
}

export { readDataBase, writeDataBase };
