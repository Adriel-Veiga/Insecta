import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

// Abre (ou cria) o arquivo do banco dentro do dispositivo
export const db = SQLite.openDatabaseSync("insecta.db");

// Cria a tabela de usuários, se ainda não existir
export function iniciarBanco() {
  // ⚠️ Temporário, só durante desenvolvimento — apaga e recria a tabela
  // toda vez que o app abre. Remova essas duas linhas quando for pra produção,
  // senão os usuários cadastrados são perdidos a cada reinício.
  db.execSync("DROP TABLE IF EXISTS usuarios;");

  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      apelido TEXT
    );
  `);
}

// Pega o id do usuário logado atualmente (ou null, se ninguém estiver logado)
export async function getUsuarioLogadoId(): Promise<number | null> {
  const id = await AsyncStorage.getItem("usuarioId");
  return id ? Number(id) : null;
}

// Salva o apelido do usuário no banco, ligado ao id dele
export async function salvarApelido(usuarioId: number, apelido: string) {
  await db.runAsync("UPDATE usuarios SET apelido = ? WHERE id = ?", [
    apelido,
    usuarioId,
  ]);
}
