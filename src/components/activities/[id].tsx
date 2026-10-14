// TELA DE DETALHE DA ATIVIDADE (mostra o conteúdo de uma atividade específica pelo id da rota)
import { Button } from "@/components/button";
import { useTema } from "@/contexts/tema";
import {
  atividadeDesbloqueada,
  carregarProgressoAtividades,
} from "@/database/progresso-atividades";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
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
    descricao:
      "Aprenda a proteger seus dados e reconhecer riscos no ambiente digital.",
    imagem: require("../../assets/Icons/cartucho1.png"),
    objetivo:
      "Identificar boas práticas para proteger contas, dispositivos e informações pessoais.",
    passos: [
      "Crie senhas fortes e diferentes para cada conta.",
      "Desconfie de links e mensagens que pedem dados pessoais.",
      "Mantenha seus dispositivos e aplicativos atualizados.",
    ],
  },
  {
    id: 3,
    titulo: "Atividade 3",
    descricao:
      "Conheça a internet, os navegadores e como encontrar informações confiáveis.",
    imagem: require("../../assets/Icons/cartucho1.png"),
    objetivo:
      "Entender como acessar a web e avaliar a qualidade de uma informação.",
    passos: [
      "Abra um navegador e identifique a barra de endereços.",
      "Pesquise um tema usando palavras-chave específicas.",
      "Compare fontes e confira autoria e data da publicação.",
    ],
  },
  {
    id: 4,
    titulo: "Atividade 4",
    descricao:
      "Explore os sistemas operacionais e aprenda a navegar pelo computador.",
    imagem: require("../../assets/Icons/cartucho1.png"),
    objetivo: "Reconhecer as funções principais de um sistema operacional.",
    passos: [
      "Identifique a área de trabalho, o menu e a barra de tarefas.",
      "Abra e alterne entre aplicativos.",
      "Encerre os programas com segurança.",
    ],
  },
  {
    id: 5,
    titulo: "Atividade 5",
    descricao:
      "Organize arquivos e pastas para manter seus documentos fáceis de encontrar.",
    imagem: require("../../assets/Icons/cartucho1.png"),
    objetivo: "Praticar a criação e organização de arquivos e pastas.",
    passos: [
      "Crie uma pasta para um assunto de sua escolha.",
      "Salve um arquivo dentro dela com um nome claro.",
      "Localize, renomeie e mova o arquivo.",
    ],
  },
  {
    id: 6,
    titulo: "Atividade 6",
    descricao:
      "Use ferramentas digitais para se comunicar com clareza e responsabilidade.",
    imagem: require("../../assets/Icons/cartucho1.png"),
    objetivo: "Escolher formas adequadas e seguras de comunicação digital.",
    passos: [
      "Escolha a ferramenta certa para cada conversa.",
      "Escreva uma mensagem objetiva e respeitosa.",
      "Confira destinatários e anexos antes de enviar.",
    ],
  },
  {
    id: 7,
    titulo: "Atividade 7",
    descricao:
      "Reúna o que aprendeu em um desafio final de informática básica.",
    imagem: require("../../assets/Icons/cartucho1.png"),
    objetivo:
      "Aplicar os conhecimentos de hardware, segurança e uso da internet.",
    passos: [
      "Escolha um dispositivo e identifique seus componentes principais.",
      "Defina cuidados para proteger seus dados durante o uso.",
      "Pesquise um tema e organize as informações encontradas.",
    ],
  },
];

export default function DetalheAtividade() {
  const { cores } = useTema();
  // busca o id que vem pela rota dinâmica, como /atividade/1
  const { id } = useLocalSearchParams<{ id?: string }>();
  const idAtividade = Number(id);
  const [carregando, setCarregando] = useState(true);
  const [bloqueada, setBloqueada] = useState(false);

  // encontra a atividade correta com base no id recebido pela URL
  const atividade = atividades.find((item) => item.id === idAtividade);

  useEffect(() => {
    let ativa = true;
    async function carregar() {
      try {
        const atual = await carregarProgressoAtividades();
        if (!atividadeDesbloqueada(idAtividade, atual)) {
          if (ativa) setBloqueada(true);
          return;
        }
        if (ativa) setBloqueada(false);
      } catch {
        if (ativa) {
          setBloqueada(true);
          Alert.alert("Erro", "Não foi possível carregar seu progresso.");
        }
      } finally {
        if (ativa) setCarregando(false);
      }
    }
    carregar();
    return () => {
      ativa = false;
    };
  }, [idAtividade]);

  if (!atividade || bloqueada) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
        <View style={styles.containerVazio}>
          <Text style={[styles.erroTitulo, { color: cores.destaque }]}>
            {bloqueada
              ? "Conclua a atividade anterior para desbloquear esta."
              : "Atividade não encontrada"}
          </Text>
          <Button
            label="Voltar para atividades"
            onPress={() => router.replace("/(tabs)")}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.titulo, { color: cores.destaque }]}>
          {atividade.titulo}
        </Text>

        <Image source={atividade.imagem} style={styles.imagem} />

        <Text style={[styles.descricao, { color: cores.texto }]}>
          {atividade.descricao}
        </Text>

        <View style={styles.blocoTexto}>
          <Text style={[styles.subtitulo, { color: cores.destaque }]}>
            Objetivo
          </Text>
          <Text style={[styles.texto, { color: cores.textoSecundario }]}>
            {atividade.objetivo}
          </Text>
        </View>

        <View style={styles.blocoTexto}>
          <Text style={[styles.subtitulo, { color: cores.destaque }]}>
            Etapas
          </Text>
          {atividade.passos.map((passo, indice) => (
            <Text
              key={passo}
              style={[styles.texto, { color: cores.textoSecundario }]}
            >
              {indice + 1}. {passo}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: cores.fundo }]}>
        <Button
          label={carregando ? "Carregando atividade..." : "Responder atividade"}
          disabled={carregando}
          onPress={() =>
            router.push({
              pathname: "/atividade-quiz/[id]",
              params: { id: String(idAtividade) },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

// css da tela
const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  container: {
    padding: 24,
    gap: 20,
    paddingBottom: 24,
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

  footer: {
    padding: 24,
    paddingTop: 12,
  },
});
