import { Button } from "@/components/button";
import { MultiplaEscolha } from "@/components/multipla-escolha";
import { useTema } from "@/contexts/tema";
import { perguntasPorAtividade } from "@/database/perguntas";
import { salvarProgressoAtividade } from "@/database/progresso-atividades";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTA_MINIMA = 60;

export default function QuizAtividade() {
  const { cores } = useTema();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const idAtividade = Number(id);
  const perguntas = perguntasPorAtividade[idAtividade] ?? [];
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [resultado, setResultado] = useState<"aprovado" | "reprovado" | null>(
    null,
  );

  if (perguntas.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
        <View style={styles.container}>
          <Text style={[styles.titulo, { color: cores.destaque }]}>
            Atividade não encontrada
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
      await salvarProgressoAtividade(idAtividade, percentual);
    } catch {
      Alert.alert("Erro", "Não foi possível salvar seu progresso.");
      return;
    }

    if (ultimaPergunta) {
      setAcertos(novosAcertos);
      if ((novosAcertos / perguntas.length) * 100 >= NOTA_MINIMA) {
        try {
          await salvarProgressoAtividade(idAtividade, 100);
          setResultado("aprovado");
        } catch {
          Alert.alert("Erro", "Não foi possível registrar a conclusão.");
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
    setResultado(null);
  }

  function voltarParaAtividades() {
    router.dismissTo("/(tabs)");
  }

  const nota = Math.round((acertos / perguntas.length) * 100);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
      <View style={styles.container}>
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
              {resultado === "aprovado"
                ? "Atividade concluída. A próxima atividade foi desbloqueada."
                : `Você precisa de pelo menos ${NOTA_MINIMA}% para concluir.`}
            </Text>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 24 },
  progresso: { fontSize: 14, textAlign: "center" },
  resultado: { gap: 16 },
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
