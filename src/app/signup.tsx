import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarsenha, setConfirmarsenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const cadastrar = () => {
    if (!email.trim() || !senha.trim()) {
      return Alert.alert("Entrar", "Preencha todo os campos para se cadastrar");
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      Alert.alert("Email", "Use um email válido");
      return;
    }

    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!regexSenha.test(senha)) {
      Alert.alert(
        "Senha",
        "A senha precisa ter 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais",
      );
      return;
    }

    if (senha !== confirmarsenha) {
      Alert.alert("Senha", "As senhas não coincidem");
      return;
    }

    const dados = { nome, email, senha };
    console.log(JSON.stringify(dados));

    Alert.alert("Cadastro", "Cadastro realizado com sucesso");
    router.replace("/");
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
              <Text style={styles.title}>Cadastre-se!</Text>
              <Image
                source={require("../assets/Joana/JoanaL1.png")}
                style={styles.logo}
              />
            </View>

            <Text style={styles.subtitle}>
              Crie uma conta para começar a aprender!
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Nome</Text>
              <Input
                placeholder="Seu nome"
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>Email</Text>
              <Input
                placeholder="seuemail@exemplo.com"
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
                  secureTextEntry={!mostrarSenha}
                  value={senha}
                  onChangeText={setSenha}
                />
                <TouchableOpacity
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                  style={styles.eyeButton}
                >
                  <Image
                    source={
                      mostrarSenha
                        ? require("../assets/Icons/eye (1).png")
                        : require("../assets/Icons/show (1).png")
                    }
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Confirmar senha</Text>
              <View style={styles.inputWithIcon}>
                <Input
                  style={styles.inputInner}
                  placeholder="••••••••"
                  secureTextEntry={!mostrarConfirmar}
                  value={confirmarsenha}
                  onChangeText={setConfirmarsenha}
                />
                <TouchableOpacity
                  onPress={() => setMostrarConfirmar(!mostrarConfirmar)}
                  style={styles.eyeButton}
                >
                  <Image
                    source={
                      mostrarConfirmar
                        ? require("../assets/Icons/eye (1).png")
                        : require("../assets/Icons/show (1).png")
                    }
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              <Button label="Cadastrar" onPress={cadastrar} />
            </View>

            <Text style={styles.footerText}>
              Já tem uma conta?{" "}
              <Link href="/" style={styles.footerLink}>
                Clique aqui!
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
    backgroundColor: "#101016",
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
    marginTop: 20,
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
