import { Button } from "@/components/button";
import { useTema } from "@/contexts/tema";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Share, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Feedback() {
  const { cores } = useTema();
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function compartilharFeedback() {
    const texto = mensagem.trim();
    if (!texto || enviando) return;

    setEnviando(true);
    try {
      const resultado = await Share.share({
        title: "Feedback do Insecta",
        message: `Feedback do Insecta:\n\n${texto}`,
      });
      if (resultado.action === Share.sharedAction) setMensagem("");
    } catch {
      Alert.alert("Não foi possível compartilhar", "Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: cores.texto }]}>Feedback</Text>
        <Text style={[styles.descricao, { color: cores.textoSecundario }]}>
          Conte o que podemos melhorar. Você poderá escolher um app para
          compartilhar sua mensagem.
        </Text>
        <TextInput
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Escreva sua mensagem"
          placeholderTextColor={cores.textoSecundario}
          multiline
          maxLength={1000}
          textAlignVertical="top"
          style={[
            styles.campo,
            {
              backgroundColor: cores.superficie,
              borderColor: cores.borda,
              color: cores.texto,
            },
          ]}
        />
        <Text style={[styles.contador, { color: cores.textoSecundario }]}>
          {mensagem.length}/1000
        </Text>
        <Button
          label={
            enviando ? "Abrindo compartilhamento..." : "Compartilhar feedback"
          }
          onPress={compartilharFeedback}
          disabled={!mensagem.trim() || enviando}
        />
        <Button
          label="Voltar"
          onPress={() => router.back()}
          style={styles.secundario}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 14 },
  titulo: { fontSize: 28, fontFamily: "Baloo2_700Bold" },
  descricao: { fontSize: 15, lineHeight: 22 },
  campo: {
    minHeight: 180,
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
  contador: { textAlign: "right", fontSize: 12 },
  secundario: { backgroundColor: "#666675" },
});
