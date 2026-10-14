import { db, getUsuarioLogadoId } from "@/database/db";

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

export async function carregarProgressoAtividades(): Promise<ProgressoAtividades> {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) return {};

  const usuario = await db.getFirstAsync<{ progresso_atividades: string }>(
    "SELECT progresso_atividades FROM usuarios WHERE id = ?",
    [usuarioId],
  );
  return parsearProgresso(usuario?.progresso_atividades ?? null);
}

export async function salvarProgressoAtividade(
  id: number,
  progresso: number,
): Promise<ProgressoAtividades> {
  const usuarioId = await getUsuarioLogadoId();
  if (!usuarioId) throw new Error("Nenhum usuário está conectado.");

  const atual = await carregarProgressoAtividades();
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
