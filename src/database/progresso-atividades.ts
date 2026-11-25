import { getUsuarioLogadoId } from "@/database/db";
import type { SQLiteDatabase } from "expo-sqlite";

export type ProgressoAtividades = Record<number, number>;

export const TOTAL_ATIVIDADES = 7;

function parsearProgresso(valor: string | null): ProgressoAtividades {
  if (!valor) return {};

  try {
    const dados: unknown = JSON.parse(valor);
    if (!dados || typeof dados !== "object" || Array.isArray(dados)) return {};

    return Object.fromEntries(
      Object.entries(dados).flatMap(([id, progresso]) => {
        const numeroId = Number(id);
        if (
          !Number.isInteger(numeroId) ||
          numeroId < 1 ||
          numeroId > TOTAL_ATIVIDADES ||
          typeof progresso !== "number" ||
          progresso < 0 ||
          progresso > 100
        ) {
          return [];
        }
        return [[numeroId, progresso]];
      }),
    );
  } catch {
    return {};
  }
}

export async function carregarProgressoAtividades(
  db: SQLiteDatabase,
): Promise<ProgressoAtividades> {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) return {};

  const usuario = await db.getFirstAsync<{ progresso_atividades: string }>(
    "SELECT progresso_atividades FROM usuarios WHERE id = ?",
    [usuarioId],
  );
  return parsearProgresso(usuario?.progresso_atividades ?? null);
}

export async function salvarProgressoAtividade(
  db: SQLiteDatabase,
  id: number,
  progresso: number,
): Promise<ProgressoAtividades> {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) throw new Error("Nenhum usuário está conectado.");

  const atual = await carregarProgressoAtividades(db);
  const atualizado = {
    ...atual,
    [id]: Math.max(atual[id] ?? 0, Math.min(100, progresso)),
  };
  const resultado = await db.runAsync(
    "UPDATE usuarios SET progresso_atividades = ? WHERE id = ?",
    [JSON.stringify(atualizado), usuarioId],
  );
  if (resultado.changes === 0) throw new Error("Usuário não encontrado.");
  return atualizado;
}

export type ResultadoPromocaoNivel =
  | "incompleto"
  | "intermediario"
  | "avancado"
  | "nivel_maximo";

export async function promoverNivelAposConcluirAtividades(
  db: SQLiteDatabase,
): Promise<ResultadoPromocaoNivel> {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) throw new Error("Nenhum usuário está conectado.");

  let resultado: ResultadoPromocaoNivel = "incompleto";
  await db.withTransactionAsync(async () => {
    const usuario = await db.getFirstAsync<{
      nivel: string | null;
      progresso_atividades: string;
    }>(
      "SELECT nivel, progresso_atividades FROM usuarios WHERE id = ?",
      [usuarioId],
    );
    if (!usuario) throw new Error("Usuário não encontrado.");

    const progresso = parsearProgresso(usuario.progresso_atividades);
    const concluiuTodas = Array.from(
      { length: TOTAL_ATIVIDADES },
      (_, indice) => indice + 1,
    ).every((id) => progresso[id] === 100);
    if (!concluiuTodas) return;

    const proximoNivel =
      usuario.nivel === "iniciante"
        ? "intermediario"
        : usuario.nivel === "intermediario"
          ? "avancado"
          : null;

    if (!proximoNivel) {
      if (usuario.nivel !== "avancado") {
        throw new Error("Não foi possível identificar o nível atual.");
      }
      resultado = "nivel_maximo";
      return;
    }

    const atualizacao = await db.runAsync(
      "UPDATE usuarios SET nivel = ?, progresso_atividades = '{}' WHERE id = ?",
      [proximoNivel, usuarioId],
    );
    if (atualizacao.changes === 0) throw new Error("Usuário não encontrado.");

    resultado = proximoNivel;
  });

  return resultado;
}

export function atividadeDesbloqueada(
  id: number,
  progresso: ProgressoAtividades,
) {
  return id === 1 || progresso[id - 1] === 100;
}

export function calcularProgressoGeral(progresso: ProgressoAtividades) {
  const soma = Object.values(progresso).reduce(
    (total, valor) => total + valor,
    0,
  );
  return soma / (TOTAL_ATIVIDADES * 100);
}
