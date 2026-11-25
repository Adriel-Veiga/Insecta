//TELA E ATIVIDADE DE QUIZ (a tela que aparece quando o usuário clica em uma atividade de quiz)
import { Button } from "@/components/button";
import { MultiplaEscolha } from "@/components/multipla-escolha";
import { useTema } from "@/contexts/tema";
import { carregarNivelUsuario } from "@/database/db";
import type { Pergunta } from "@/database/perguntas";
import {
  perguntasPorNivel,
  type NivelAtividade,
} from "@/database/perguntas-niveis";
import {
  promoverNivelAposConcluirAtividades,
  salvarProgressoAtividade,
  TOTAL_ATIVIDADES,
  type ResultadoPromocaoNivel,
} from "@/database/progresso-atividades";
import { aviso } from "@/utils/aviso";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTA_MINIMA = 60;

export default function QuizAtividade() {
  const db = useSQLiteContext();
  const { cores } = useTema();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const idAtividade = Number(id);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [nivel, setNivel] = useState<NivelAtividade | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState(false);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [promocao, setPromocao] = useState<ResultadoPromocaoNivel | null>(null);
  const [resultado, setResultado] = useState<"aprovado" | "reprovado" | null>(
    null,
  );

  useEffect(() => {
    let ativo = true;
    async function carregarPerguntas() {
      try {
        const nivelUsuario = await carregarNivelUsuario(db);
        if (
          nivelUsuario !== "iniciante" &&
          nivelUsuario !== "intermediario" &&
          nivelUsuario !== "avancado"
        ) {
          if (ativo) setErroCarregamento(true);
          return;
        }

        const perguntasNivel = perguntasPorNivel[nivelUsuario][idAtividade];
        if (!perguntasNivel?.length) {
          if (ativo) setErroCarregamento(true);
          return;
        }

        if (ativo) {
          setNivel(nivelUsuario);
          setPerguntas(perguntasNivel);
        }
      } catch {
        if (ativo) {
          setErroCarregamento(true);
          aviso("Erro", "Não foi possível carregar as perguntas da atividade.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarPerguntas();
    return () => {
      ativo = false;
    };
  }, [db, idAtividade]);

  if (carregando) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
        <View style={styles.container}>
          <Text style={[styles.titulo, { color: cores.destaque }]}>
            Carregando atividade...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (perguntas.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
        <View style={styles.container}>
          <Text style={[styles.titulo, { color: cores.destaque }]}>
            {erroCarregamento
              ? "Não foi possível carregar as perguntas desta atividade."
              : "Atividade não encontrada"}
          </Text>
          <Button label="Voltar" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const perguntaAtual = perguntas[indiceAtual];
  const ultimaPergunta = indiceAtual === perguntas.length - 1;

  async function responder(indiceEscolhido: number) {
    const novosAcertos =
      indiceEscolhido === perguntaAtual.respostaCorreta ? acertos + 1 : acertos;
    const percentual = Math.min(
      99,
      Math.round((novosAcertos / perguntas.length) * 100),
    );

    try {
      await salvarProgressoAtividade(db, idAtividade, percentual);
    } catch {
      aviso("Erro", "Não foi possível salvar seu progresso.");
      return;
    }

    setRespostas((atuais) => {
      const atualizadas = [...atuais];
      atualizadas[indiceAtual] = indiceEscolhido;
      return atualizadas;
    });

    if (ultimaPergunta) {
      setAcertos(novosAcertos);
      if ((novosAcertos / perguntas.length) * 100 >= NOTA_MINIMA) {
        try {
          await salvarProgressoAtividade(db, idAtividade, 100);
          if (idAtividade === TOTAL_ATIVIDADES) {
            const resultadoPromocao =
              await promoverNivelAposConcluirAtividades(db);
            setPromocao(resultadoPromocao);
          }
          setResultado("aprovado");
        } catch {
          aviso("Erro", "Não foi possível registrar a conclusão.");
        }
      } else {
        setResultado("reprovado");
      }
      return;
    }

    setAcertos(novosAcertos);
    setIndiceAtual(indiceAtual + 1);
  }

  function tentarNovamente() {
    setIndiceAtual(0);
    setAcertos(0);
    setRespostas([]);
    setResultado(null);
  }

  function voltarParaAtividades() {
    router.dismissTo("/(tabs)");
  }

  const nota = Math.round((acertos / perguntas.length) * 100);
  const respostasErradas = perguntas.flatMap((pergunta, indice) => {
    const respostaEscolhida = respostas[indice];
    if (
      respostaEscolhida === undefined ||
      respostaEscolhida === pergunta.respostaCorreta
    ) {
      return [];
    }
    return [{ pergunta, respostaEscolhida, numero: indice + 1 }];
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {resultado ? (
          <View style={styles.resultado}>
            <Text style={[styles.titulo, { color: cores.destaque }]}>
              {resultado === "aprovado" ? "Muito bem!" : "Quase lá!"}
            </Text>
            <Text
              style={[styles.textoResultado, { color: cores.textoSecundario }]}
            >
              Você acertou {acertos} de {perguntas.length} perguntas ({nota}%).
            </Text>
            <Text
              style={[styles.textoResultado, { color: cores.textoSecundario }]}
            >
              {resultado === "reprovado"
                ? `Você precisa de pelo menos ${NOTA_MINIMA}% para concluir.`
                : promocao === "intermediario"
                  ? "Você concluiu as sete atividades e avançou para o nível intermediário! A mesma trilha foi reiniciada para o novo nível."
                  : promocao === "avancado"
                    ? "Você concluiu as sete atividades e avançou para o nível avançado! A mesma trilha foi reiniciada para o novo nível."
                    : promocao === "nivel_maximo"
                      ? "Você concluiu as sete atividades e já está no nível avançado, o nível máximo."
                      : `Atividade concluída no nível ${nivel}. A próxima atividade foi desbloqueada.`}
            </Text>
            {respostasErradas.length > 0 && (
              <View style={styles.relatorio}>
                <Text style={[styles.subtitulo, { color: cores.destaque }]}>
                  Vamos revisar suas respostas
                </Text>
                {respostasErradas.map(
                  ({ pergunta, respostaEscolhida, numero }) => (
                    <View
                      key={pergunta.id}
                      style={[
                        styles.itemRelatorio,
                        { backgroundColor: cores.superficieSuave },
                      ]}
                    >
                      <Text
                        style={[
                          styles.perguntaRelatorio,
                          { color: cores.texto },
                        ]}
                      >
                        {numero}. {pergunta.enunciado}
                      </Text>
                      <Text
                        style={[
                          styles.respostaErrada,
                          { color: "#C62828" },
                        ]}
                      >
                        Sua resposta: {pergunta.alternativas[respostaEscolhida]}
                      </Text>
                      <Text
                        style={[
                          styles.respostaCorreta,
                          { color: "#267A36" },
                        ]}
                      >
                        Resposta correta:{" "}
                        {pergunta.alternativas[pergunta.respostaCorreta]}
                      </Text>
                      <Text
                        style={[
                          styles.explicacao,
                          { color: cores.textoSecundario },
                        ]}
                      >
                        {pergunta.explicacao ??
                          `A alternativa correta é "${pergunta.alternativas[pergunta.respostaCorreta]}".`}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            )}
            {resultado === "aprovado" ? (
              <Button
                label="Voltar para atividades"
                onPress={voltarParaAtividades}
              />
            ) : (
              <>
                <Button label="Tentar novamente" onPress={tentarNovamente} />
                <Button
                  label="Voltar para atividades"
                  onPress={voltarParaAtividades}
                  style={styles.botaoSecundario}
                />
              </>
            )}
          </View>
        ) : (
          <>
            <Text style={[styles.progresso, { color: cores.textoSecundario }]}>
              Pergunta {indiceAtual + 1} de {perguntas.length}
            </Text>
            <MultiplaEscolha
              pergunta={perguntaAtual}
              onResponder={responder}
              isLast={ultimaPergunta}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flexGrow: 1, justifyContent: "center", padding: 24, gap: 24 },
  progresso: { fontSize: 14, textAlign: "center" },
  resultado: { gap: 16 },
  relatorio: { gap: 12 },
  itemRelatorio: { gap: 8, padding: 16, borderRadius: 16 },
  subtitulo: { fontSize: 18, fontWeight: "bold" },
  perguntaRelatorio: { fontSize: 16, fontWeight: "bold" },
  respostaErrada: { fontSize: 14, fontWeight: "600" },
  respostaCorreta: { fontSize: 14, fontWeight: "600" },
  explicacao: { fontSize: 14, lineHeight: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  textoResultado: {
    fontSize: 16,
    textAlign: "center",
  },
  botaoSecundario: {
    backgroundColor: "#5B5FEF",
    borderRadius: 30,
    width: "100%",
    height: 48,
  },
});
