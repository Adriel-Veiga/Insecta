import { getUsuarioLogadoId, salvarNivel } from "@/database/db";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";

// Objeto de configuração: a "fonte da verdade" de cada nível
const conteudoPorNivel = {
  iniciante: {
    titulo: "Iniciante",
    texto:
      "Tudo bem começar do zero! Aqui você vai aprender o básico de informática com calma, sem pressa e sem cobrança. Cada passo conta, e a gente constrói essa base juntos.",
    icone: require("../assets/Icons/iniciantem.gif"),
  },
  intermediario: {
    titulo: "Intermediário",
    texto:
      "Você já sabe algumas coisas, só que meio espalhadas, né? A gente vai te ajudar a organizar esse conhecimento, preencher as lacunas e deixar tudo mais sólido.",
    icone: require("../assets/Icons/intermediariom.gif"),
  },
  avancado: {
    titulo: "Avançado",
    texto:
      "Você já tem uma boa bagagem em informática, mas será que sabe o suficiente pra qualquer situação? Chegou a hora de testar seus limites e afiar ainda mais suas habilidades.",
    icone: require("../assets/Icons/avancadom.gif"),
  },
};

export default function NivelConfirmar() {
  const { nivel } = useLocalSearchParams<{
    nivel: keyof typeof conteudoPorNivel;
  }>();

  // Se por algum motivo o parâmetro vier errado ou vazio, evita quebrar a tela
  const dados = nivel ? conteudoPorNivel[nivel] : null;

  const confirmar = async () => {
    if (!nivel) return;

    try {
      const usuarioId = await getUsuarioLogadoId();

      if (usuarioId) {
        await salvarNivel(usuarioId, nivel);
      }

      router.push("/user");
    } catch (erro) {
      console.log(erro);
    }
  };

  if (!dados) {
    // Caso alguém chegue nessa tela sem escolher nível (ex: digitando a URL direto)
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Nível não encontrado</Text>
          <Link href="/nivel">Voltar</Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image source={dados.icone} style={styles.icone} />
            <Text style={styles.tituloCard}>{dados.titulo}</Text>
          </View>
          <Text style={styles.texto}>{dados.texto}</Text>
        </View>

        <Button label="Avançar" onPress={confirmar} />

        <Text style={styles.footerText}>
          Mudou de ideia?{" "}
          <Link href="/nivel" style={styles.footerLink}>
            Volte aqui!
          </Link>
        </Text>
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
  card: {
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icone: { width: 75, height: 75 },
  tituloCard: {
    color: "#2400FF",
    fontSize: 18,
    fontFamily: "Baloo2_700Bold",
  },
  texto: {
    color: "#2400FF",
    fontSize: 20,
    fontFamily: "Baloo2_400Regular",
    opacity: 0.8,
  },
  titulo: {
    color: "#2400FF",
    fontSize: 25,
    fontFamily: "Baloo2_700Bold",
    textAlign: "center",
  },
  footerText: {
    color: "#A0A0A8",
    textAlign: "center",
  },
  footerLink: {
    color: "#0002CC",
    fontWeight: "700",
  },
});
