// TELA DE DETALHE DA ATIVIDADE (mostra o conteúdo de uma atividade específica pelo id da rota)
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// estrutura de dados de cada atividade detalhada
type ConteudoAtividade = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: any;
  objetivo: string;
  passos: string[];
};

// lista fixa de atividades para a rota dinâmica
const atividades: ConteudoAtividade[] = [
  {
    id: 1,
    titulo: "Atividade 1",
    descricao:
      "Nessa atividade você vai aprender os conceitos básicos de hardware, identificando as principais peças de um computador.",
    imagem: require("../../assets/Icons/cartucho1.gif"),
    objetivo:
      "Entender o funcionamento dos componentes principais de um computador.",
    passos: [
      "Observe o cartucho da atividade e leia a descrição do tema.",
      "Identifique os elementos mais importantes do hardware.",
      "Aplique os conceitos aprendidos na prática durante a atividade.",
    ],
  },
  {
    id: 2,
    titulo: "Atividade 2",
    descricao: "Descrição detalhada da segunda atividade do catálogo do app.",
    imagem: require("../../assets/Icons/cartucho1.png"),
    objetivo: "Reforçar a base de noções digitais e de segurança básica.",
    passos: [
      "Leia a proposta da atividade.",
      "Relacione o conteúdo ao dia a dia do uso digital.",
      "Responda com atenção às etapas propostas.",
    ],
  },
  {
    id: 3,
    titulo: "Atividade 3",
    descricao: "Descrição detalhada da terceira atividade de aprofundamento.",
    imagem: require("../../assets/Icons/cartucho1.png"),
    objetivo:
      "Aprofundar o entendimento de conceitos mais avançados do uso digital.",
    passos: [
      "Entenda o objetivo principal da tarefa.",
      "Use o conhecimento já adquirido para resolver a atividade.",
      "Conclua a etapa final com atenção e foco.",
    ],
  },
];

export default function DetalheAtividade() {
  // busca o id que vem pela rota dinâmica, como /atividade/1
  const { id } = useLocalSearchParams<{ id?: string }>();

  // encontra a atividade correta com base no id recebido pela URL
  const atividade = atividades.find((item) => item.id === Number(id));

  if (!atividade) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.containerVazio}>
          <Text style={styles.erroTitulo}>Atividade não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>{atividade.titulo}</Text>

        <Image source={atividade.imagem} style={styles.imagem} />

        <Text style={styles.descricao}>{atividade.descricao}</Text>

        <View style={styles.blocoTexto}>
          <Text style={styles.subtitulo}>Objetivo</Text>
          <Text style={styles.texto}>{atividade.objetivo}</Text>
        </View>

        <View style={styles.blocoTexto}>
          <Text style={styles.subtitulo}>Etapas</Text>
          {atividade.passos.map((passo, indice) => (
            <Text key={passo} style={styles.texto}>
              {indice + 1}. {passo}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// css da tela
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    padding: 24,
    gap: 20,
  },

  containerVazio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  titulo: {
    color: "#2400FF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  imagem: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    borderRadius: 18,
    backgroundColor: "#F3F3F3",
  },

  descricao: {
    color: "#333333",
    fontSize: 16,
    lineHeight: 24,
  },

  blocoTexto: {
    gap: 8,
  },

  subtitulo: {
    color: "#2400FF",
    fontSize: 18,
    fontWeight: "bold",
  },

  texto: {
    color: "#4A4A4A",
    fontSize: 15,
    lineHeight: 22,
  },

  erroTitulo: {
    color: "#2400FF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
