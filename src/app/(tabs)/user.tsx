// TELA DE PERFIL (saudação, foto e conquistas)
import { CabecalhoProgresso } from "@/components/cabecalho-progresso";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// TIPO DA CONQUISTA (por enquanto a lista começa vazia)
type Conquista = {
  id: number;
  titulo: string;
};

const conquistas: Conquista[] = [];

export default function Perfil() {
  const [apelido, setApelido] = useState<string>("Usuário");

  // recupera o apelido salvo na tela de apelido
  useEffect(() => {
    AsyncStorage.getItem("apelido")
      .then((salvo) => {
        if (salvo) setApelido(salvo);
      })
      .catch(() => {});
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <CabecalhoProgresso progresso={0.1} />

      <View style={styles.conteudo}>
        <Text style={styles.saudacao}>Olá, {apelido}</Text>

        <Image
          source={require("../../assets/Icons/user.png")}
          style={styles.foto}
        />

        <View style={styles.cardConquistas}>
          <Text style={styles.cardTitulo}>Conquistas:</Text>

          {conquistas.length === 0 ? (
            <Text style={styles.vazio}>Você não tem conquistas ainda</Text>
          ) : (
            conquistas.map((c) => (
              <Text key={c.id} style={styles.conquistaItem}>
                {c.titulo}
              </Text>
            ))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  conteudo: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  saudacao: {
    color: "#0000CC",
    fontSize: 20,
    fontWeight: "bold",
  },
  foto: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#E8E8E8",
  },
  cardConquistas: {
    width: "100%",
    minHeight: 150,
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  cardTitulo: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  vazio: {
    color: "#A0A0A0",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 12,
  },
  conquistaItem: {
    color: "#333",
    fontSize: 16,
  },
});
