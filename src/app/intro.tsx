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
  const avancar = () => {
    router.push("/login");
  };

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
            <Text style={styles.title}>Olá!</Text>
            <Text style={styles.subtitle}>
              Bem vindo ao insecta! Seu novo app para aprender
            </Text>
            <Button label="Avançar" onPress={avancar} />
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
    opacity: 0.8,
    marginRight: 250,
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
