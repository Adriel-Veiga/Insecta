//TELA DE RECUPERAÇÃO DE SENHA (a tela onde o usuário digita a nova senha)
import { useTema } from "@/contexts/tema";
import { buscarUsuarioPorEmail, redefinirSenha } from "@/database/db";
import { aviso } from "@/utils/aviso";
import { senhaValida } from "@/utils/senha";
import * as Crypto from "expo-crypto";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
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

export default function RecuperarSenha() {
  const db = useSQLiteContext();
  const { cores } = useTema();
  // recupera o email que veio da tela anterior (remail.tsx)
  const { email } = useLocalSearchParams<{ email: string }>();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const redefinir = async () => {
    console.log("redefinir senha clicado");
    try {
      if (!email) {
        aviso("Erro", "Email não encontrado. Tente novamente.");
        router.replace("/remail");
        return;
      }

      if (!novaSenha.trim()) {
        return aviso("Recuperar senha", "Digite a nova senha");
      }

      if (!senhaValida(novaSenha)) {
        aviso(
          "Senha",
          "A senha precisa ter 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais",
        );
        return;
      }

      if (novaSenha !== confirmarNovaSenha) {
        aviso("Senha", "As senhas não coincidem");
        return;
      }

      // busca o usuário de novo (garante que ainda existe e pega o id)
      const usuario = await buscarUsuarioPorEmail(db, email);
      console.log("resultado consulta redefinir senha", usuario);

      if (!usuario) {
        aviso("Erro", "Não encontramos essa conta");
        return;
      }

      const novaSenhaHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        novaSenha,
      );

      const resultado = await redefinirSenha(db, usuario.id, novaSenhaHash);
      console.log("resultado atualização de senha", resultado);

      aviso("Sucesso", "Senha redefinida! Faça login com a nova senha.");
      router.replace("/login");
    } catch (erro) {
      console.log(erro);
      aviso(
        "Erro",
        erro instanceof Error
          ? erro.message
          : "Não foi possível redefinir a senha.",
      );
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
              Digite sua nova senha
            </Text>
          </View>

          <Text style={[styles.subtitle, { color: cores.textoSecundario }]}>
            Verificamos o seu email, crie uma nova senha
          </Text>

          <View style={styles.form}>
            <Text style={[styles.label, { color: cores.textoSecundario }]}>
              Senha:
            </Text>
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

            <Text style={[styles.label, { color: cores.textoSecundario }]}>
              Confirmar senha:
            </Text>
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
    marginLeft: 7,
  },
  subtitle: {
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
