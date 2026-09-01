// TELA FINAL DE ATIVIDADE (mensagem de falha, caso o usuário não tenha atingido a nota mínima)
import { router } from "expo-router";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";

export default function Intro() {
  // função para avançar para a tela de login
  const voltar = () => {
    router.push("/nivel");
  };
  // componentes da tela
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: "height" })}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Image
              source={require("../assets/Joana/JoanaBm.gif")}
              style={styles.image}
            />
            <Text style={styles.title}>Caramba!</Text>
            <Text style={styles.subtitle}>
              É, você não deveria estar aqui ainda. Mas tudo bem, vamos te levar
              de volta para a tela de escolha de nível.
            </Text>
            <Button label="Voltar" onPress={voltar} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
// css da tela
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  content: {
    alignItems: "center",
  },

  image: {
    width: 250,
    height: 250,
    marginTop: 10,
    marginBottom: 16,
  },

  title: {
    color: "#243AA9",
    fontFamily: "Baloo2_700Bold",
    fontSize: 30,
    opacity: 0.9,
    marginRight: 175,
  },

  subtitle: {
    color: "#243AA9",
    fontFamily: "Baloo2_400Regular",
    fontSize: 20,
    opacity: 0.6,
    marginBottom: 24,
    marginRight: 50,
    marginLeft: 20,
  },
});
