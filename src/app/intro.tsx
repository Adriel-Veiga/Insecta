// TELA DE INTRODUÇÃO (primeira tela de fato que o usuário vê ao abrir o app)
import { router } from "expo-router";
import { useTema } from "@/contexts/tema";
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
  const { cores } = useTema();
  // função para avançar para a tela de login
  const avancar = () => {
    router.push("/login");
  };
  // componentes da tela
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
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
            <Text style={[styles.title, { color: cores.destaque }]}>Olá!</Text>
            <Text style={[styles.subtitle, { color: cores.textoSecundario }]}>
              Bem vindo ao insecta! Seu novo app para aprender
            </Text>
            <Button label="Avançar" onPress={avancar} />
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
    fontFamily: "Baloo2_700Bold",
    fontSize: 30,
    opacity: 0.9,
    marginRight: 250,
  },

  subtitle: {
    fontFamily: "Baloo2_400Regular",
    fontSize: 20,
    opacity: 0.6,
    marginBottom: 24,
    marginRight: 50,
    marginLeft: 20,
  },
});
