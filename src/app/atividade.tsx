// TELA DE ATIVIDADE (perguntas de múltipla escolha)
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { MultiplaEscolha } from "@/components/multipla-escolha";
import { getUsuarioLogadoId, salvarNivel } from "@/database/db";
import {
    perguntasAvancado,
    perguntasIntermediario,
} from "@/database/perguntas";

// nota de porcentagem mínima pra ser aprovado
const NOTA_MINIMA = 60;

// se reprovar, cai pro nível abaixo
const nivelInferior = {
  avancado: "intermediario",
  intermediario: "iniciante",
} as const;

export default function Atividade() {
  const { nivelPretendido } = useLocalSearchParams<{
    nivelPretendido: "intermediario" | "avancado";
  }>();

  const perguntas =
    nivelPretendido === "avancado" ? perguntasAvancado : perguntasIntermediario;

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [resultado, setResultado] = useState<null | "passou" | "reprovou">(
    null,
  );

  const perguntaAtual = perguntas[indiceAtual];
  const ultimaPergunta = indiceAtual === perguntas.length - 1;

  const responder = async (indiceEscolhido: number) => {
    const acertou = indiceEscolhido === perguntaAtual.respostaCorreta;
    const novosAcertos = acertou ? acertos + 1 : acertos;

    if (ultimaPergunta) {
      const percentual = (novosAcertos / perguntas.length) * 100;
      const passou = percentual >= NOTA_MINIMA;

      if (passou) {
        // mostra mensagem de parabéns nesta mesma página
        setResultado("passou");
        return;
      }

      // reprovou: envia pra tela de atividadeT que mostra mensagem de falha
      setResultado("reprovou");
      router.replace({ pathname: "/atividadeT" });
      return;
    }

    setAcertos(novosAcertos);
    setIndiceAtual(indiceAtual + 1);
  };
  // componentes da tela
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {resultado === "passou" ? (
          <View style={{ gap: 12 }}>
            <Text
              style={{ color: "#2400FF", fontSize: 20, textAlign: "center" }}
            >
              Parabéns — você foi aprovado!
            </Text>
            <Text style={{ color: "#A0A0A8", textAlign: "center" }}>
              Toque abaixo para ir para seu perfil.
            </Text>
            <View style={{ marginTop: 8 }}>
              <Button
                label="Ir para meu perfil"
                onPress={async () => {
                  try {
                    const usuarioId = await getUsuarioLogadoId();
                    if (usuarioId && nivelPretendido) {
                      await salvarNivel(usuarioId, nivelPretendido);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                  router.replace({ pathname: "/user" });
                }}
              />
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.progresso}>
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
// css da tela
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 24 },
  progresso: { color: "#A0A0A8", fontSize: 14, textAlign: "center" },
});
