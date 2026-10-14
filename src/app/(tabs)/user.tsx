// TELA DE PERFIL (saudação, foto e conquistas)
import { CabecalhoProgresso } from "@/components/cabecalho-progresso";
import { useTema } from "@/contexts/tema";
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
  const { cores } = useTema();
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
    <SafeAreaView
      style={[styles.safe, { backgroundColor: cores.fundo }]}
      edges={["top"]}
    >
      <CabecalhoProgresso progresso={0.1} />

      <View style={styles.conteudo}>
        <Text style={[styles.saudacao, { color: cores.destaque }]}>
          Olá, {apelido}
        </Text>

        <Image
          source={require("../../assets/Icons/user.png")}
          style={styles.foto}
        />

        <View
          style={[
            styles.cardConquistas,
            { backgroundColor: cores.superficieSuave },
          ]}
        >
          <Text style={[styles.cardTitulo, { color: cores.texto }]}>
            Conquistas:
          </Text>

          {conquistas.length === 0 ? (
            <Text style={[styles.vazio, { color: cores.textoSecundario }]}>
              Você não tem conquistas ainda
            </Text>
          ) : (
            conquistas.map((c) => (
              <Text
                key={c.id}
                style={[styles.conquistaItem, { color: cores.texto }]}
              >
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
  },
  conteudo: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  saudacao: {
    fontSize: 20,
    fontWeight: "bold",
  },
  foto: {
    width: 190,
    height: 190,
    borderRadius: 95,
  },
  cardConquistas: {
    width: "100%",
    minHeight: 150,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  vazio: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 12,
  },
  conquistaItem: {
    fontSize: 16,
  },
});
