import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";

type NivelOpcao = "iniciante" | "intermediario" | "avancado";

const opcoes: { chave: NivelOpcao; label: string; icone: any }[] = [
  {
    chave: "iniciante",
    label: "Iniciante",
    icone: require("../assets/Icons/iniciante.png"),
  },
  {
    chave: "intermediario",
    label: "Intermediário",
    icone: require("../assets/Icons/intermediario.png"),
  },
  {
    chave: "avancado",
    label: "Avançado",
    icone: require("../assets/Icons/avancado.png"),
  },
];

export default function Nivel() {
  const [selecionado, setSelecionado] = useState<NivelOpcao | null>(null);

  const avancar = () => {
    if (!selecionado) return; // não deixa avançar sem escolher

    router.push({
      pathname: "/nivel-confirmar",
      params: { nivel: selecionado },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {opcoes.map((opcao) => (
          <TouchableOpacity
            key={opcao.chave}
            style={[
              styles.opcao,
              selecionado === opcao.chave && styles.opcaoSelecionada,
            ]}
            onPress={() => setSelecionado(opcao.chave)}
          >
            <Image source={opcao.icone} style={styles.icone} />
            <Text style={styles.label}>{opcao.label}</Text>
          </TouchableOpacity>
        ))}

        <Button label="Avançar" onPress={avancar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "#F2F2F2",
  },
  opcaoSelecionada: {
    borderWidth: 2,
    borderColor: "#0002CC",
  },
  icone: { width: 50, height: 50 },
  label: {
    color: "#2400FF",
    fontSize: 16,
    fontFamily: "Baloo2_700Bold",
  },
});
