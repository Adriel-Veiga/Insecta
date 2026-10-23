//
import { useTema } from "@/contexts/tema";
import {
    calcularProgressoGeral,
    carregarProgressoAtividades,
} from "@/database/progresso-atividades";
import { useFocusEffect } from "expo-router";
import { useCallback, useState, type ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type CabecalhoProgressoProps = {
  progresso?: number;
  nivel?: string | null;
  acaoDireita?: ReactNode;
};

const iconesPorNivel: Record<string, number> = {
  iniciante: require("../assets/Icons/iniciante.png"),
  intermediario: require("../assets/Icons/intermediario.png"),
  avancado: require("../assets/Icons/avancado.png"),
};

const nomesPorNivel: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export function CabecalhoProgresso({
  progresso,
  nivel,
  acaoDireita,
}: CabecalhoProgressoProps) {
  const { cores } = useTema();
  const [progressoCarregado, setProgressoCarregado] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (progresso !== undefined) return;
      let ativo = true;
      carregarProgressoAtividades()
        .then((dados) => {
          if (ativo) setProgressoCarregado(calcularProgressoGeral(dados));
        })
        .catch(() => {
          if (ativo) setProgressoCarregado(0);
        });
      return () => {
        ativo = false;
      };
    }, [progresso]),
  );

  const nivelNormalizado = nivel?.toLowerCase() ?? "";

  return (
    <View style={styles.header}>
      <Image
        source={iconesPorNivel[nivelNormalizado] ?? iconesPorNivel.iniciante}
        style={styles.iconeEsquerda}
      />

      {nomesPorNivel[nivelNormalizado] ? (
        <Text
          numberOfLines={1}
          style={[styles.nivel, { color: cores.textoSecundario }]}
        >
          {nomesPorNivel[nivelNormalizado]}
        </Text>
      ) : null}

      <View
        style={[styles.trilho, { backgroundColor: cores.trilho }]}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: 100,
          now: Math.round((progresso ?? progressoCarregado) * 100),
        }}
      >
        <View
          style={[
            styles.preenchimento,
            {
              width: `${(progresso ?? progressoCarregado) * 100}%`,
              backgroundColor: cores.destaque,
            },
          ]}
        />
      </View>

      {acaoDireita}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  iconeEsquerda: {
    width: 42,
    height: 42,
  },
  trilho: {
    flex: 1,
    height: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  preenchimento: {
    height: "100%",
    borderRadius: 8,
  },
  nivel: { maxWidth: 80, fontSize: 12, fontWeight: "700" },
});
