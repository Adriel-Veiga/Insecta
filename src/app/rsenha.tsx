//TELA DE RECUPERAÇÃO DE SENHA (a tela onde o usuário digita a nova senha)
import { buscarUsuarioPorEmail, redefinirSenha } from "@/database/db";
import * as Crypto from "expo-crypto";
import { router, useLocalSearchParams } from "expo-router";
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

export default function RecuperarSenha() {
  // recupera o email que veio da tela anterior (remail.tsx)
  const { email } = useLocalSearchParams<{ email: string }>();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const redefinir = async () => {
    if (!email) {
      // segurança extra: se por algum motivo chegou aqui sem email, volta
      Alert.alert("Erro", "Email não encontrado. Tente novamente.");
      router.replace("/remail");
      return;
    }

    if (!novaSenha.trim()) {
      return Alert.alert("Recuperar senha", "Digite a nova senha");
    }

    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!regexSenha.test(novaSenha)) {
      Alert.alert(
        "Senha",
        "A senha precisa ter 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais",
      );
      return;
    }

    if (novaSenha !== confirmarNovaSenha) {
      Alert.alert("Senha", "As senhas não coincidem");
      return;
    }

    try {
      // busca o usuário de novo (garante que ainda existe e pega o id)
      const usuario = await buscarUsuarioPorEmail(email);

      if (!usuario) {
        Alert.alert("Erro", "Não encontramos essa conta");
        return;
      }

      const novaSenhaHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        novaSenha,
      );

      await redefinirSenha(usuario.id, novaSenhaHash);

      Alert.alert("Sucesso", "Senha redefinida! Faça login com a nova senha.");
      router.replace("/login");
    } catch (erro) {
      console.log(erro);
      Alert.alert(
        "Erro",
        "Não foi possível redefinir a senha. Tente novamente.",
      );
    }
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
          <View style={styles.header}>
            <Text style={styles.title}>Digite sua nova senha</Text>
          </View>

          <Text style={styles.subtitle}>
            Verificamos o seu email, crie uma nova senha
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Senha:</Text>
            <View style={styles.inputWithIcon}>
              <Input
                placeholder="#Exemplo123"
                placeholderTextColor="#B0B0B8"
                secureTextEntry={!mostrarSenha}
                value={novaSenha}
                onChangeText={setNovaSenha}
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

            <Text style={styles.label}>Confirmar senha:</Text>
            <View style={styles.inputWithIcon}>
              <Input
                placeholder="#Exemplo123"
                placeholderTextColor="#B0B0B8"
                secureTextEntry={!mostrarConfirmar}
                value={confirmarNovaSenha}
                onChangeText={setConfirmarNovaSenha}
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

            <Button label="Redefinir Senha" onPress={redefinir} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
//css da tela
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
  eyeButton: {
    position: "absolute",
    right: 12,
    padding: 4,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
});
