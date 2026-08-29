//TELA DE APELIDO (obviamente a tela que pergunta o apelido do usuário)
import { getUsuarioLogadoId, salvarApelido } from "@/database/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
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
import { Input } from "@/components/input";

export default function IndexPage() {
  const [id_usuario, setApelido] = useState("");

  // salva o apelido no banco de dados e no AsyncStorage, e navega para a tela de usuário
  async function continuar() {
    if (!id_usuario.trim()) {
      return; // o apelido não pode ser vazio
    }

    try {
      const usuarioId = await getUsuarioLogadoId();

      if (usuarioId) {
        // salva o apelido no banco de dados, associando ao usuário logado
        await salvarApelido(usuarioId, id_usuario);
      }

      // mantém no AsyncStorage
      await AsyncStorage.setItem("apelido", id_usuario);
    } catch (erro) {
      console.log(erro);
    }
    //MUDAR! troca pra tela do usuário(porque estava testando) mas vai para a tela de avaliação!!!
    router.push("/nivel-intro");
  }
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
          <Image
            source={require("../assets/Joana/JoanaLmi.gif")}
            style={styles.image}
          />
          <View style={styles.container}>
            <Text style={styles.title}>Como podemos te chamar?</Text>
            <Text style={styles.label}>Apelido:</Text>
            <Input
              placeholder="Seu apelido"
              placeholderTextColor="#B0B0B8"
              autoCapitalize="none"
              onChangeText={setApelido}
              value={id_usuario}
            />
            <Button label="Continuar" onPress={continuar} />
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

  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },

  header: {
    marginBottom: 8,
  },

  container: {
    gap: 12,
  },

  title: {
    color: "#2400FF",
    fontSize: 28,
    fontFamily: "Baloo2_700Bold",
    opacity: 0.9,
    marginLeft: 7,
  },

  label: {
    color: "#535356",
    fontSize: 14,
    fontFamily: "600",
    opacity: 0.8,
    marginLeft: 9,
  },
});
