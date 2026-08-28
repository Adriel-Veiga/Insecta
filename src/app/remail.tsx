import { buscarUsuarioPorEmail } from "@/database/db";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
    Alert,
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

export default function RecuperarEmail() {
  const [email, setEmail] = useState("");

  const verificarEmail = async () => {
    if (!email.trim()) {
      return Alert.alert("Recuperar senha", "Digite seu email");
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      Alert.alert("Email", "Use um email válido");
      return;
    }

    try {
      // Confere se existe um usuário com esse email
      const usuario = await buscarUsuarioPorEmail(email);

      if (!usuario) {
        Alert.alert(
          "Recuperar senha",
          "Não encontramos uma conta com esse email",
        );
        return;
      }

      // Passa o email como parâmetro pra próxima tela
      router.push({
        pathname: "/rsenha",
        params: { email },
      });
    } catch (erro) {
      console.log(erro);
      Alert.alert(
        "Erro",
        "Não foi possível verificar o email. Tente novamente.",
      );
    }
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
            <Text style={styles.title}>Digite seu email</Text>
          </View>

          <Text style={styles.subtitle}>
            Diga-nos o email usado na sua conta
          </Text>

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

            <Button label="Enviar" onPress={verificarEmail} />
          </View>

          <Text style={styles.footerText}>
            Lembrou?{" "}
            <Link href="/login" style={styles.footerLink}>
              Volte aqui!
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
  footerText: {
    color: "#A0A0A8",
    textAlign: "center",
    marginTop: 16,
  },
  footerLink: {
    color: "#0002CC",
    fontWeight: "700",
  },
});
