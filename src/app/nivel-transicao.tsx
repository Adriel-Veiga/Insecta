// TELA DE TRANSIÇÃO (mensagem de introdução antes do usuário começar a responder as perguntas)
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";

export default function NivelTransicao() {
  const { nivelPretendido } = useLocalSearchParams<{
    nivelPretendido: "intermediario" | "avancado";
  }>();

  const comecar = () => {
    router.push({
      pathname: "/atividade",
      params: { nivelPretendido },
    });
  };
  // componentes da tela
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Hora de provar seu nível!</Text>
        <Text style={styles.subtitle}>
          Responda algumas perguntas, só para confirmar seu nível:{" "}
          {nivelPretendido === "avancado" ? "avançado" : "intermediário"}. Se
          não for, sem problema, a gente ajusta seu nível.
        </Text>
        <Button label="Começar" onPress={comecar} />
      </View>
    </SafeAreaView>
  );
}
// css da tela
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 16 },
  title: {
    color: "#2400FF",
    fontSize: 24,
    fontFamily: "Baloo2_700Bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#2400FF",
    fontSize: 16,
    fontFamily: "Baloo2_400Regular",
    opacity: 0.7,
    textAlign: "center",
  },
});
