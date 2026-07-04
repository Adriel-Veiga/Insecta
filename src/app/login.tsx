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
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Olá!</Text>
              <Image
                source={require("../assets/Joana/JoanaLm.gif")}
                style={styles.logo}
              />
            </View>

            <Text style={styles.subtitle}>
              Bem vindo ao insecta! Seu novo app para aprender
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <Input
                placeholder="seuemail@exemplo.com"
                placeholderTextColor="#8A8A8E"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWithIcon}>
                <Input
                  style={styles.inputInner}
                  placeholder="••••••••"
                  placeholderTextColor="#8A8A8E"
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
                        ? require("../assets/Icons/eye (1).png")
                        : require("../assets/Icons/show (1).png")
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#18181F",
    borderRadius: 24,
    padding: 24,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#A0A0A8",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 24,
  },

  form: {
    gap: 14,
  },

  label: {
    color: "#D0D0D5",
    fontSize: 13,
    marginBottom: -6,
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
    marginTop: 20,
  },

  footerLink: {
    color: "#FFC43F",
    fontWeight: "700",
  },
});
