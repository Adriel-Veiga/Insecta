//
import { useTema } from "@/contexts/tema";
import { carregarNivelUsuario } from "@/database/db";
import {
  calcularProgressoGeral,
  carregarProgressoAtividades,
} from "@/database/progresso-atividades";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState, type ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";

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

export function CabecalhoProgresso({
  progresso,
  nivel,
  acaoDireita,
}: CabecalhoProgressoProps) {
  const db = useSQLiteContext();
  const { cores } = useTema();
  const [progressoCarregado, setProgressoCarregado] = useState(0);
  const [nivelCarregado, setNivelCarregado] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (progresso !== undefined && nivel !== undefined) return;
      let ativo = true;
      Promise.all([carregarProgressoAtividades(db), carregarNivelUsuario(db)])
        .then(([dados, nivelUsuario]) => {
          if (!ativo) return;
          setProgressoCarregado(calcularProgressoGeral(dados));
          setNivelCarregado(nivelUsuario);
        })
        .catch(() => {
          if (!ativo) return;
          setProgressoCarregado(0);
          setNivelCarregado(null);
        });
      return () => {
        ativo = false;
      };
    }, [db, nivel, progresso]),
  );

  const nivelNormalizado =
    (nivel ?? nivelCarregado)
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase() ?? "";

  return (
    <View style={styles.header}>
      <Image
        source={iconesPorNivel[nivelNormalizado] ?? iconesPorNivel.iniciante}
        style={styles.iconeEsquerda}
      />

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
