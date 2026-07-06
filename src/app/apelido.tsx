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

  async function continuar() {
    try {
      await AsyncStorage.setItem("apelido", id_usuario);
    } catch (erro) {}
    router.push("/user");
  }

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
