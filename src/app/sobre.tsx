import { Button } from "@/components/button";
import { useTema } from "@/contexts/tema";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Sobre() {
  const { cores } = useTema();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.titulo, { color: cores.texto }]}>
          Sobre o Insecta
        </Text>
        <Text style={[styles.paragrafo, { color: cores.textoSecundario }]}>
          O Insecta é um aplicativo de aprendizagem criado para ajudar você a
          desenvolver conhecimentos de informática e cidadania digital no seu
          próprio ritmo.
        </Text>
        <Text style={[styles.paragrafo, { color: cores.textoSecundario }]}>
          As atividades apresentam temas como componentes do computador,
          segurança na internet, organização de arquivos e comunicação digital.
          Cada etapa combina conteúdo e perguntas para acompanhar o que você
          aprendeu.
        </Text>
        <Text style={[styles.paragrafo, { color: cores.textoSecundario }]}>
          Seu progresso fica associado à sua conta neste dispositivo. Conclua
          uma atividade para liberar a próxima e continuar sua jornada.
        </Text>
        <Button label="Voltar" onPress={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flexGrow: 1, justifyContent: "center", padding: 24, gap: 20 },
  titulo: { fontSize: 28, fontFamily: "Baloo2_700Bold" },
  paragrafo: { fontSize: 16, lineHeight: 25 },
});
