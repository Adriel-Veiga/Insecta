//BANCO DE DADOS SQLITE
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Directory, File, Paths } from "expo-file-system";
import * as SQLite from "expo-sqlite";

// abre (ou cria) o arquivo do banco dentro do dispositivo
export const db = SQLite.openDatabaseSync("insecta.db");
let seletorSistemaAberto = false;

// cria a tabela de usuários, se ainda não existir
export function iniciarBanco() {
  db.execSync("PRAGMA foreign_keys = ON;");
  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      apelido TEXT,
      nivel TEXT,
      progresso_atividades TEXT NOT NULL DEFAULT '{}',
      foto_perfil_uri TEXT
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS amizades (
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      amigo_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      PRIMARY KEY (usuario_id, amigo_id),
      CHECK (usuario_id <> amigo_id)
    );
  `);

  const colunas = db.getAllSync<{ name: string }>(
    "PRAGMA table_info(usuarios)",
  );
  if (!colunas.some((coluna) => coluna.name === "progresso_atividades")) {
    db.execSync(
      "ALTER TABLE usuarios ADD COLUMN progresso_atividades TEXT NOT NULL DEFAULT '{}';",
    );
  }
  if (!colunas.some((coluna) => coluna.name === "foto_perfil_uri")) {
    db.execSync("ALTER TABLE usuarios ADD COLUMN foto_perfil_uri TEXT;");
  }
  const possuiNivel = colunas.some((coluna) => coluna.name === "nivel");
  const possuiNivelAntigo = colunas.some((coluna) => coluna.name === "nível");
  if (!possuiNivel) {
    db.execSync("ALTER TABLE usuarios ADD COLUMN nivel TEXT;");
    if (possuiNivelAntigo) {
      db.execSync('UPDATE usuarios SET nivel = "nível" WHERE nivel IS NULL;');
    }
  }
}

export function definirSeletorSistemaAberto(aberto: boolean) {
  seletorSistemaAberto = aberto;
}

export function sistemaSeletorAberto() {
  return seletorSistemaAberto;
}

export async function limparDadosDeTeste() {
  await db.withTransactionAsync(async () => {
    await db.runAsync("DELETE FROM amizades");
    await db.runAsync("DELETE FROM usuarios");
  });
  await AsyncStorage.multiRemove(["usuarioId", "apelido"]);

  try {
    const arquivos = new Directory(Paths.document).list();
    for (const arquivo of arquivos) {
      if (
        arquivo instanceof File &&
        /^perfil-\d+-\d+\.(jpg|png|webp)$/.test(arquivo.name)
      ) {
        arquivo.delete();
      }
    }
  } catch {
    // A limpeza das fotos não deve impedir a remoção dos dados do banco.
  }
}

// pega o id do usuário logado atualmente (ou null, se ninguém estiver logado)
export async function getUsuarioLogadoId(): Promise<number | null> {
  const id = await AsyncStorage.getItem("usuarioId");
  const usuarioId = id ? Number(id) : NaN;
  return Number.isSafeInteger(usuarioId) && usuarioId > 0 ? usuarioId : null;
}

export type AmigoRanking = {
  id: number;
  apelido: string;
  atividadesConcluidas: number;
  usuarioAtual: boolean;
};

export async function adicionarAmigoPorApelido(apelidoInformado: string) {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) throw new Error("Entre na sua conta para adicionar amigos.");

  const apelido = apelidoInformado.trim().normalize("NFKC");
  if (
    !apelido ||
    apelido.length > 40 ||
    /[\u0000-\u001f\u007f]/.test(apelido)
  ) {
    throw new Error("Informe um apelido válido, com até 40 caracteres.");
  }

  const encontrados = await db.getAllAsync<{ id: number }>(
    "SELECT id FROM usuarios WHERE apelido = ? COLLATE NOCASE LIMIT 2",
    [apelido],
  );
  if (encontrados.length === 0) throw new Error("Nenhum usuário encontrado.");
  if (encontrados.length > 1) {
    throw new Error("Esse apelido não é único. Peça outro apelido à pessoa.");
  }

  const amigoId = encontrados[0].id;
  if (amigoId === usuarioId) throw new Error("Você não pode se adicionar.");

  const existente = await db.getFirstAsync<{ usuario_id: number }>(
    "SELECT usuario_id FROM amizades WHERE usuario_id = ? AND amigo_id = ?",
    [usuarioId, amigoId],
  );
  if (existente) throw new Error("Essa pessoa já está na sua lista de amigos.");

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      "INSERT INTO amizades (usuario_id, amigo_id) VALUES (?, ?)",
      [usuarioId, amigoId],
    );
    await db.runAsync(
      "INSERT INTO amizades (usuario_id, amigo_id) VALUES (?, ?)",
      [amigoId, usuarioId],
    );
  });
}

export async function carregarRankingSocial(): Promise<AmigoRanking[]> {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) return [];

  const usuarios = await db.getAllAsync<{
    id: number;
    apelido: string | null;
    progresso_atividades: string;
  }>(
    `SELECT id, apelido, progresso_atividades FROM usuarios
     WHERE id = ? OR id IN (
       SELECT amigo_id FROM amizades WHERE usuario_id = ?
     )`,
    [usuarioId, usuarioId],
  );

  return usuarios
    .map((usuario) => {
      let atividadesConcluidas = 0;
      try {
        const progresso: unknown = JSON.parse(usuario.progresso_atividades);
        if (
          progresso &&
          typeof progresso === "object" &&
          !Array.isArray(progresso)
        ) {
          atividadesConcluidas = Object.entries(progresso).filter(
            ([id, valor]) => /^[1-7]$/.test(id) && valor === 100,
          ).length;
        }
      } catch {
        atividadesConcluidas = 0;
      }

      return {
        id: usuario.id,
        apelido: usuario.apelido?.trim().slice(0, 40) || "Sem apelido",
        atividadesConcluidas,
        usuarioAtual: usuario.id === usuarioId,
      };
    })
    .sort(
      (a, b) =>
        b.atividadesConcluidas - a.atividadesConcluidas ||
        Number(b.usuarioAtual) - Number(a.usuarioAtual),
    );
}

// salva o apelido do usuário no banco, ligado ao id dele
export async function salvarApelido(usuarioId: number, apelido: string) {
  await db.runAsync("UPDATE usuarios SET apelido = ? WHERE id = ?", [
    apelido,
    usuarioId,
  ]);
}

export type PerfilUsuario = {
  id: number;
  apelido: string | null;
  fotoPerfilUri: string | null;
  progressoAtividades: string;
};

export async function carregarPerfilUsuario(): Promise<PerfilUsuario | null> {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) return null;

  const usuario = await db.getFirstAsync<{
    id: number;
    apelido: string | null;
    foto_perfil_uri: string | null;
    progresso_atividades: string;
  }>(
    "SELECT id, apelido, foto_perfil_uri, progresso_atividades FROM usuarios WHERE id = ?",
    [usuarioId],
  );
  if (!usuario) return null;

  return {
    id: usuario.id,
    apelido: usuario.apelido,
    fotoPerfilUri: usuario.foto_perfil_uri,
    progressoAtividades: usuario.progresso_atividades,
  };
}

export async function salvarFotoPerfil(uri: string) {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) throw new Error("Entre na sua conta para salvar a foto.");
  if (!uri.startsWith("file://")) throw new Error("Arquivo de foto inválido.");

  const resultado = await db.runAsync(
    "UPDATE usuarios SET foto_perfil_uri = ? WHERE id = ?",
    [uri, usuarioId],
  );
  if (resultado.changes === 0) throw new Error("Usuário não encontrado.");
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

export async function carregarNivelUsuario(): Promise<string | null> {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) return null;

  const usuario = await db.getFirstAsync<{ nivel: string | null }>(
    "SELECT nivel FROM usuarios WHERE id = ?",
    [usuarioId],
  );
  return usuario?.nivel ?? null;
}
