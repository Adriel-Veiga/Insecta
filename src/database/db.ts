import * as SQLite from "expo-sqlite";

// abre o banco
export const db = SQLite.openDatabaseSync("insecta.db");

// cria a tabela de usuários, se ainda não existir
export function iniciarBanco() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );
  `);
}
