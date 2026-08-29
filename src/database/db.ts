//BANCO DE DADOS SQLITE
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

// abre (ou cria) o arquivo do banco dentro do dispositivo
export const db = SQLite.openDatabaseSync("insecta.db");

// cria a tabela de usuários, se ainda não existir
export function iniciarBanco() {
  //TEMPORÀRIO! só durante desenvolvimento, apaga e recria a tabela
  // remova essas duas linhas quando for pra produção,
  // senão os usuários cadastrados são perdidos a cada reinício
  db.execSync("DROP TABLE IF EXISTS usuarios;");

  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      apelido TEXT,
      nível TEXT
    );
  `);
}

// pega o id do usuário logado atualmente (ou null, se ninguém estiver logado)
export async function getUsuarioLogadoId(): Promise<number | null> {
  const id = await AsyncStorage.getItem("usuarioId");
  return id ? Number(id) : null;
}

// salva o apelido do usuário no banco, ligado ao id dele
export async function salvarApelido(usuarioId: number, apelido: string) {
  await db.runAsync("UPDATE usuarios SET apelido = ? WHERE id = ?", [
    apelido,
    usuarioId,
  ]);
}

// verifica se existe um usuário com esse email (retorna o id, ou null)
export async function buscarUsuarioPorEmail(
  email: string,
): Promise<{ id: number } | null> {
  const usuario = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM usuarios WHERE email = ?",
    [email],
  );
  return usuario ?? null;
}

// atualiza a senha de um usuário específico
export async function redefinirSenha(usuarioId: number, novaSenhaHash: string) {
  await db.runAsync("UPDATE usuarios SET senha = ? WHERE id = ?", [
    novaSenhaHash,
    usuarioId,
  ]);
}

// salva o nível do usuário no banco, ligado ao id dele
export async function salvarNivel(usuarioId: number, nivel: string) {
  await db.runAsync("UPDATE usuarios SET nivel = ? WHERE id = ?", [
    nivel,
    usuarioId,
  ]);
}
