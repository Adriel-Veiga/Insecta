// PÁGINA INICIAL DO APP (lista de atividades, progresso e configurações)
import { AppModal } from "@/components/app-modal";
import { CirculoProgresso } from "@/components/circulo-progresso";
import { useTema } from "@/contexts/tema";
import {
  atividadeDesbloqueada,
  calcularProgressoGeral,
  carregarProgressoAtividades,
  type ProgressoAtividades,
} from "@/database/progresso-atividades";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// TIPO DA ATIVIDADE (estrutura de cada item da lista)
type Atividade = {
  id: number;
  titulo: string;
  descricao: string;
  cor: string;
};

const atividades: Atividade[] = [
  {
    id: 1,
    titulo: "Atividade 1",
    descricao:
      "Nessa atividade você vai aprender os conceitos básicos de hardware, identificando as principais peças de um computador.",
    cor: "#5B5FEF",
  },
  {
    id: 2,
    titulo: "Atividade 2",
    descricao:
      "Aprenda a proteger seus dados e reconhecer riscos no ambiente digital.",
    cor: "#3730A3",
  },
  {
    id: 3,
    titulo: "Atividade 3",
    descricao:
      "Conheça a internet, os navegadores e como encontrar informações confiáveis.",
    cor: "#5B5FEF",
  },
  {
    id: 4,
    titulo: "Atividade 4",
    descricao:
      "Explore os sistemas operacionais e aprenda a navegar pelo computador.",
    cor: "#3730A3",
  },
  {
    id: 5,
    titulo: "Atividade 5",
    descricao:
      "Organize arquivos e pastas para manter seus documentos fáceis de encontrar.",
    cor: "#5B5FEF",
  },
  {
    id: 6,
    titulo: "Atividade 6",
    descricao:
      "Use ferramentas digitais para se comunicar com clareza e responsabilidade.",
    cor: "#3730A3",
  },
  {
    id: 7,
    titulo: "Atividade 7",
    descricao:
      "Reúna o que aprendeu em um desafio final de informática básica.",
    cor: "#5B5FEF",
  },
];

// PÁGINA INICIAL
export default function IndexPage() {
  const [selecionada, setSelecionada] = useState<Atividade | null>(null);
  const [configuracoesAberta, setConfiguracoesAberta] = useState(false);
  const [progressoAtividades, setProgressoAtividades] =
    useState<ProgressoAtividades>({});
  const { escuro, cores, definirTemaEscuro } = useTema();

  useFocusEffect(
    useCallback(() => {
      let ativa = true;
      carregarProgressoAtividades()
        .then((progresso) => {
          if (ativa) setProgressoAtividades(progresso);
        })
        .catch(() => {
          if (ativa) setProgressoAtividades({});
        });
      return () => {
        ativa = false;
      };
    }, []),
  );

  const progressoGeral = calcularProgressoGeral(progressoAtividades);

  function abrirDetalhes(atividade: Atividade) {
    if (!atividadeDesbloqueada(atividade.id, progressoAtividades)) return;
    setSelecionada(atividade);
  }

  function iniciarAtividade() {
    if (!selecionada) return;

    const id = selecionada.id;
    setSelecionada(null);
    router.push({ pathname: "/atividade/[id]", params: { id: String(id) } });
  }

  // FUNÇÃO PARA ABRIR O MODAL DE CONFIGURAÇÕES
  function abrirConfiguracoes() {
    setConfiguracoesAberta(true);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.fundo }]}>
      {/* CABEÇALHO: progresso + notificações */}
      <View style={styles.header}>
        <View
          style={[styles.trilhoProgresso, { backgroundColor: cores.trilho }]}
        >
          <View
            style={[
              styles.preenchimentoProgresso,
              {
                width: `${progressoGeral * 100}%`,
                backgroundColor: cores.destaque,
              },
            ]}
          />
        </View>

        <TouchableOpacity onPress={() => router.push("/notificacoes")}>
          <Image
            source={require("../../assets/Icons/bell.png")}
            style={[styles.sino, { tintColor: cores.destaque }]}
          />
        </TouchableOpacity>
      </View>

      {/* BOTÃO DE MENU (abre o painel lateral de configurações) */}
      <TouchableOpacity
        style={styles.menuCirculo}
        onPress={abrirConfiguracoes}
        activeOpacity={0.8}
      >
        <Image
          source={require("../../assets/Icons/menu-burger.png")}
          style={styles.menuIcone}
        />
      </TouchableOpacity>

      {/* LISTA VERTICAL DE ATIVIDADES */}
      <ScrollView
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >
        {atividades.map((atividade) => (
          <TouchableOpacity
            key={atividade.id}
            style={[
              styles.pill,
              { backgroundColor: atividade.cor },
              !atividadeDesbloqueada(atividade.id, progressoAtividades) &&
                styles.pillBloqueada,
            ]}
            onPress={() => abrirDetalhes(atividade)}
            disabled={!atividadeDesbloqueada(atividade.id, progressoAtividades)}
            activeOpacity={0.8}
          >
            <Text style={styles.pillTexto}>{atividade.titulo}</Text>

            {!atividadeDesbloqueada(atividade.id, progressoAtividades) ? (
              <Image
                source={require("../../assets/Icons/lock.png")}
                style={styles.cadeadoIcone}
              />
            ) : (
              <CirculoProgresso
                porcentagem={progressoAtividades[atividade.id] ?? 0}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* MODAL DE DESCRIÇÃO — aparece quando "selecionada" não é null */}
      <AppModal visible={!!selecionada} onClose={() => setSelecionada(null)}>
        <Text style={[styles.modalTitulo, { color: cores.destaque }]}>
          {selecionada?.titulo}
        </Text>
        <Text style={[styles.modalDescricao, { color: cores.texto }]}>
          {selecionada?.descricao}
        </Text>
        <TouchableOpacity style={styles.modalBotao} onPress={iniciarAtividade}>
          <Text style={styles.startTexto}>Começar</Text>
        </TouchableOpacity>
      </AppModal>

      {/* ABA LATERAL DE CONFIGURAÇÕES — painel branco que abre ao clicar no botão do menu */}
      <Modal
        visible={configuracoesAberta}
        transparent
        animationType="slide"
        onRequestClose={() => setConfiguracoesAberta(false)}
      >
        <View style={styles.drawerOverlay}>
          <TouchableOpacity
            style={styles.drawerBackdrop}
            activeOpacity={1}
            onPress={() => setConfiguracoesAberta(false)}
          />

          <View
            style={[styles.drawerPanel, { backgroundColor: cores.superficie }]}
          >
            <View style={styles.drawerHeader}>
              <Text style={[styles.drawerTitulo, { color: cores.destaque }]}>
                Configurações
              </Text>
              <TouchableOpacity onPress={() => setConfiguracoesAberta(false)}>
                <Text style={[styles.drawerClose, { color: cores.destaque }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.configItem,
                { backgroundColor: cores.superficieSuave },
              ]}
              onPress={() => {
                setConfiguracoesAberta(false);
                router.push("/notificacoes");
              }}
            >
              <Text style={[styles.configTexto, { color: cores.texto }]}>
                Notificações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.configItem,
                { backgroundColor: cores.superficieSuave },
              ]}
              onPress={() => {
                setConfiguracoesAberta(false);
                router.push("/sobre");
              }}
            >
              <Text style={[styles.configTexto, { color: cores.texto }]}>
                Sobre o app
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.configItem,
                { backgroundColor: cores.superficieSuave },
              ]}
              onPress={() => {
                setConfiguracoesAberta(false);
                router.push("/feedback");
              }}
            >
              <Text style={[styles.configTexto, { color: cores.texto }]}>
                Feedback
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.configItem,
                { backgroundColor: cores.superficieSuave },
              ]}
              onPress={() => {
                setConfiguracoesAberta(false);
                router.push("/ajuda");
              }}
            >
              <Text style={[styles.configTexto, { color: cores.texto }]}>
                Ajuda
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.configItem,
                styles.temaItem,
                { backgroundColor: cores.superficieSuave },
              ]}
            >
              <Text style={[styles.configTexto, { color: cores.texto }]}>
                Tema escuro
              </Text>
              <Switch
                value={escuro}
                onValueChange={(valor) => {
                  void definirTemaEscuro(valor).catch(() => {
                    Alert.alert(
                      "Erro",
                      "Não foi possível salvar a preferência de tema.",
                    );
                  });
                }}
                trackColor={{ false: cores.borda, true: cores.destaque }}
              />
            </View>

            <TouchableOpacity
              style={[styles.modalBotao, { backgroundColor: cores.destaque }]}
              onPress={() => setConfiguracoesAberta(false)}
            >
              <Text style={styles.startTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ESTILOS DA TELA
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  trilhoProgresso: {
    flex: 1,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    overflow: "hidden",
  },

  preenchimentoProgresso: {
    height: "100%",
    backgroundColor: "#2400FF",
    borderRadius: 8,
  },

  sino: {
    width: 24,
    height: 24,
  },

  menuCirculo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2400FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },

  menuIcone: {
    width: 22,
    height: 22,
  },

  lista: {
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120, // espaço pra não ficar atrás da tab bar flutuante
  },

  pill: {
    height: 70,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },

  pillBloqueada: {
    opacity: 0.85,
  },

  pillTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  cadeadoIcone: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },

  modalTitulo: {
    color: "#2400FF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },

  modalDescricao: {
    color: "#333",
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },

  modalBotao: {
    backgroundColor: "#2400FF",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 12,
  },

  startTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  drawerOverlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  drawerBackdrop: {
    flex: 1,
  },

  drawerPanel: {
    width: "78%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },

  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  drawerTitulo: {
    color: "#2400FF",
    fontSize: 24,
    fontWeight: "bold",
  },

  drawerClose: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },

  configItem: {
    backgroundColor: "#F3F3F7",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  configTexto: {
    color: "#1C1C1E",
    fontSize: 15,
    fontWeight: "600",
  },
});
