//TELA DE CADASTRO (a tela onde o usuário cria uma conta)
import { db } from "@/database/db";
import { useTema } from "@/contexts/tema";
import * as Crypto from "expo-crypto";
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
  const { cores } = useTema();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarsenha, setConfirmarsenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  // esse fluxo garante que a conta só seja gravada quando todos os dados estiverem válidos
  const cadastrar = async () => {
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
    try {
      // gera um hash da senha para que o valor armazenado não fique em texto no banco de dados
      const senhaHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        senha,
      );
      // insere o usuário no banco de dados
      await db.runAsync(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senhaHash],
      );

      Alert.alert("Cadastro", "Cadastro realizado com sucesso");
      router.replace("/login");
    } catch (erro: any) {
      console.log(erro);

      if (String(erro?.message).includes("UNIQUE")) {
        Alert.alert("Cadastro", "Esse email já está cadastrado. Tente entrar.");
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar. Tente novamente.");
      }
    }
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
          <View style={styles.header}>
            <Text style={[styles.title, { color: cores.destaque }]}>
              Cadastre-se!
            </Text>
          </View>

          <Text style={[styles.subtitle, { color: cores.textoSecundario }]}>
            Crie uma conta para começar a aprender!
          </Text>

          <View style={styles.form}>
            <Text style={[styles.label, { color: cores.textoSecundario }]}>
              Nome:
            </Text>
            <Input
              placeholder="Seu nome"
              placeholderTextColor="#B0B0B8"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={[styles.label, { color: cores.textoSecundario }]}>
              Email:
            </Text>
            <Input
              placeholder="seuemail@exemplo.com"
              placeholderTextColor="#B0B0B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={[styles.label, { color: cores.textoSecundario }]}>
              Senha:
            </Text>
            <View style={styles.inputWithIcon}>
              <Input
                placeholder="#Exemplo123"
                placeholderTextColor="#B0B0B8"
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
                      ? require("../assets/Icons/eye.png")
                      : require("../assets/Icons/show.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.label, { color: cores.textoSecundario }]}>
              Confirmar senha:
            </Text>
            <View style={styles.inputWithIcon}>
              <Input
                placeholder="#Exemplo123"
                placeholderTextColor="#B0B0B8"
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
                      ? require("../assets/Icons/eye.png")
                      : require("../assets/Icons/show.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <Button label="Cadastrar" onPress={cadastrar} />
          </View>

          <Text style={[styles.footerText, { color: cores.textoSecundario }]}>
            Já tem uma conta?{" "}
            <Link
              href="/login"
              style={[styles.footerLink, { color: cores.destaque }]}
            >
              Clique aqui!
            </Link>
          </Text>
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

  header: {
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontFamily: "Baloo2_700Bold",
    opacity: 0.9,
  },

  subtitle: {
    fontSize: 20,
    marginBottom: 24,
    fontFamily: "Baloo2_400Regular",
    opacity: 0.6,
  },

  form: {
    gap: 12,
  },

  label: {
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

  footerText: {
    textAlign: "center",
  },

  footerLink: {
    fontWeight: "700",
  },
});
