import { Button } from "@/components/button";
import { useTema } from "@/contexts/tema";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ajuda() {
  const { cores } = useTema();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: cores.texto }]}>Ajuda</Text>
        <View style={[styles.item, { backgroundColor: cores.superficieSuave }]}>
          <Text style={[styles.pergunta, { color: cores.texto }]}>
            Como avanço?
          </Text>
          <Text style={[styles.resposta, { color: cores.textoSecundario }]}>
            Responda às perguntas e alcance pelo menos 60% de acertos para
            concluir a atividade e desbloquear a próxima.
          </Text>
        </View>
        <View style={[styles.item, { backgroundColor: cores.superficieSuave }]}>
          <Text style={[styles.pergunta, { color: cores.texto }]}>
            Onde vejo meu progresso?
          </Text>
          <Text style={[styles.resposta, { color: cores.textoSecundario }]}>
            O círculo de cada atividade e a barra no topo mostram seu progresso.
            Ele é salvo na sua conta neste dispositivo.
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.item, { backgroundColor: cores.superficieSuave }]}
          onPress={() => router.push("/notificacoes")}
        >
          <Text style={[styles.link, { color: cores.destaque }]}>
            Ver notificações
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, { backgroundColor: cores.superficieSuave }]}
          onPress={() => router.push("/feedback")}
        >
          <Text style={[styles.link, { color: cores.destaque }]}>
            Enviar feedback
          </Text>
        </TouchableOpacity>
        <Button label="Voltar" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 14 },
  titulo: { fontSize: 28, fontFamily: "Baloo2_700Bold", marginBottom: 4 },
  item: { padding: 16, borderRadius: 8, gap: 6 },
  pergunta: { fontSize: 16, fontWeight: "700" },
  resposta: { fontSize: 14, lineHeight: 21 },
  link: { fontSize: 15, fontWeight: "700" },
});
