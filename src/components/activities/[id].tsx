// TELA DE CONTEÚDO (ensina os tópicos da atividade antes do quiz)
import { Button } from "@/components/button";
import { useTema } from "@/contexts/tema";
import { carregarNivelUsuario } from "@/database/db";
import {
  obterConteudoAtividade,
  type ConteudoAtividade,
} from "@/database/conteudos-atividades";
import {
  perguntasPorNivel,
  type NivelAtividade,
} from "@/database/perguntas-niveis";
import {
  atividadeDesbloqueada,
  carregarProgressoAtividades,
} from "@/database/progresso-atividades";
import { aviso } from "@/utils/aviso";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetalheAtividade() {
  const db = useSQLiteContext();
  const { cores } = useTema();
  // busca o id que vem pela rota dinâmica, como /atividade/1
  const { id } = useLocalSearchParams<{ id?: string }>();
  const idAtividade = Number(id);
  const [carregando, setCarregando] = useState(true);
  const [bloqueada, setBloqueada] = useState(false);
  const [nivel, setNivel] = useState<NivelAtividade | null>(null);
  const [erroCarregamento, setErroCarregamento] = useState(false);

  // encontra a atividade correta com base no id recebido pela URL
  const licao: ConteudoAtividade | undefined = obterConteudoAtividade(
    nivel,
    idAtividade,
  );

  useEffect(() => {
    let ativa = true;
    async function carregar() {
      try {
        const [atual, nivelUsuario] = await Promise.all([
          carregarProgressoAtividades(db),
          carregarNivelUsuario(db),
        ]);
        if (
          nivelUsuario !== "iniciante" &&
          nivelUsuario !== "intermediario" &&
          nivelUsuario !== "avancado"
        ) {
          if (ativa) {
            setBloqueada(true);
            setErroCarregamento(true);
          }
          return;
        }
        if (!perguntasPorNivel[nivelUsuario][idAtividade]?.length) {
          if (ativa) setBloqueada(true);
          return;
        }
        if (!atividadeDesbloqueada(idAtividade, atual)) {
          if (ativa) setBloqueada(true);
          return;
        }
        if (ativa) {
          setNivel(nivelUsuario);
          setBloqueada(false);
        }
      } catch {
        if (ativa) {
          setBloqueada(true);
          setErroCarregamento(true);
          aviso("Erro", "Não foi possível carregar seu progresso.");
        }
      } finally {
        if (ativa) setCarregando(false);
      }
    }
    carregar();
    return () => {
      ativa = false;
    };
  }, [db, idAtividade]);

  if (carregando) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
        <View style={styles.containerVazio}>
          <Text style={[styles.texto, { color: cores.textoSecundario }]}>
            Carregando conteúdo...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!licao || bloqueada) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
        <View style={styles.containerVazio}>
          <Text style={[styles.erroTitulo, { color: cores.destaque }]}>
            {erroCarregamento
              ? "Não foi possível carregar o conteúdo. Volte e tente novamente."
              : bloqueada
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
          {licao.titulo}
        </Text>

        <Text style={[styles.subtitulo, { color: cores.destaque }]}>
          Conteúdo da lição ·{" "}
          {nivel === "iniciante"
            ? "Iniciante"
            : nivel === "intermediario"
              ? "Intermediário"
              : "Avançado"}
        </Text>
        <Text style={[styles.descricao, { color: cores.texto }]}>
          {licao.introducao}
        </Text>

        {licao.topicos.map((topico) => (
          <View key={topico.titulo} style={styles.blocoTexto}>
            <Text style={[styles.subtitulo, { color: cores.destaque }]}>
              {topico.titulo}
            </Text>
            <Text style={[styles.texto, { color: cores.textoSecundario }]}>
              {topico.texto}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: cores.fundo }]}>
        <Button
          label={carregando ? "Carregando lição..." : "Começar atividade"}
          disabled={carregando}
          onPress={() =>
            router.replace({
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
