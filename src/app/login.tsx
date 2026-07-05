import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrar, setMostrar] = useState(false);

  const entrar = () => {
    router.push("/apelido");
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
          <View style={styles.header}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Faça login e comece agora!</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email:</Text>
            <Input
              placeholder="seuemail@exemplo.com"
              placeholderTextColor="#B0B0B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha:</Text>
            <View style={styles.inputWithIcon}>
              <Input
                placeholder="#Exemplo123"
                placeholderTextColor="#B0B0B8"
                secureTextEntry={!mostrar}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
                onPress={() => setMostrar(!mostrar)}
                style={styles.eyeButton}
              >
                <Image
                  source={
                    mostrar
                      ? require("../assets/Icons/eye.png")
                      : require("../assets/Icons/show.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.forgotText}>Esqueceu a senha?</Text>

            <Button label="Entrar" onPress={entrar} />
          </View>

          <Text style={styles.footerText}>
            Não tem uma conta?{" "}
            <Link href="/signup" style={styles.footerLink}>
              Crie aqui!
            </Link>
          </Text>
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

  header: {
    marginBottom: 8,
  },

  title: {
    color: "#2400FF",
    fontSize: 28,
    fontFamily: "Baloo2_700Bold",
    opacity: 0.9,
    marginLeft: 7,
  },

  subtitle: {
    color: "#2400FF",
    fontSize: 20,
    marginBottom: 24,
    fontFamily: "Baloo2_400Regular",
    opacity: 0.6,
    marginLeft: 7,
  },

  form: {
    gap: 12,
  },

  label: {
    color: "#535356",
    fontSize: 14,
    fontFamily: "600",
    opacity: 0.8,
    marginLeft: 9,
  },

  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputInner: {
    flex: 1,
  },

  eyeButton: {
    position: "absolute",
    right: 12,
    padding: 4,
  },

  eyeIcon: {
    width: 20,
    height: 20,
  },

  forgotText: {
    color: "#A0A0A8",
    fontSize: 13,
    textAlign: "right",
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
