import { Button } from "@/components/button";
import { useTema } from "@/contexts/tema";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notificacoes() {
  const { cores } = useTema();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: cores.texto }]}>
          Notificações
        </Text>
        <Text style={[styles.mensagem, { color: cores.textoSecundario }]}>
          Você não tem nenhuma notificação.
        </Text>
        <Button label="Voltar" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 20 },
  titulo: { fontSize: 26, fontFamily: "Baloo2_700Bold", textAlign: "center" },
  mensagem: { fontSize: 17, textAlign: "center", lineHeight: 24 },
});
