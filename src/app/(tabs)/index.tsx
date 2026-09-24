// PÁGINA INICIAL DO APP (exibe os cartões de atividades, progresso e configurações)
import { AppModal } from "@/components/app-modal";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// TIPO DA ATIVIDADE (estrutura dos cards exibidos na tela inicial)
type Atividade = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: any;
  bloqueado: boolean;
};

// LISTA DE ATIVIDADES (dados fixos do catálogo de tarefas do app)
const atividades: Atividade[] = [
  {
    id: 1,
    titulo: "Atividade 1",
    descricao:
      "Nessa atividade você vai aprender os conceitos básicos de hardware, identificando as principais peças de um computador.",
    imagem: require("../../assets/Icons/cartucho1.gif"),
    bloqueado: false,
  },
  {
    id: 2,
    titulo: "Atividade 2",
    descricao: "Descrição da atividade 2...",
    imagem: require("../../assets/Icons/cartucho1.png"),
    bloqueado: true,
  },
  {
    id: 3,
    titulo: "Atividade 3",
    descricao: "Descrição da atividade 3...",
    imagem: require("../../assets/Icons/cartucho1.png"),
    bloqueado: true,
  },
];

// PROGRESSO DO USUÁRIO (conta quantas atividades já estão liberadas)
const concluidas = atividades.filter((a) => !a.bloqueado).length;
const progresso = concluidas / atividades.length;

// PÁGINA INICIAL (exibe os cartões de atividades, progresso e configurações)
export default function IndexPage() {
  const [selecionada, setSelecionada] = useState<Atividade | null>(null);
  const [configuracoesAberta, setConfiguracoesAberta] = useState(false);

  // FUNÇÃO PARA ABRIR DETALHES (bloqueia cartões fechados)
  function abrirDetalhes(atividade: Atividade) {
    if (atividade.bloqueado) return;
    setSelecionada(atividade);
  }

  // FUNÇÃO PARA INICIAR A ATIVIDADE (leva para a rota dinâmica do item selecionado)
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
    <SafeAreaView style={styles.safe}>
      {/* CABEÇALHO: progresso + notificações */}
      <View style={styles.header}>
        <View style={styles.trilhoProgresso}>
          <View
            style={[
              styles.preenchimentoProgresso,
              { width: `${progresso * 100}%` },
            ]}
          />
        </View>

        <TouchableOpacity>
          <Image
            source={require("../../assets/Icons/bell.png")}
            style={styles.sino}
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

      {/* CARTUCHOS ROLÁVEIS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trilha}
        style={styles.trilhaWrapper}
      >
        {atividades.map((atividade) => (
          <View key={atividade.id} style={styles.card}>
            <Text style={styles.cardTitulo}>{atividade.titulo}</Text>

            <View style={styles.cartuchoContainer}>
              <Image
                source={atividade.imagem}
                style={[
                  styles.cartucho,
                  atividade.bloqueado && styles.cartuchoBloqueado,
                ]}
              />
              {atividade.bloqueado && (
                <View style={styles.cadeadoOverlay}>
                  <Image
                    source={require("../../assets/Icons/lock.png")}
                    style={styles.cadeadoIcone}
                  />
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.startBotao,
                atividade.bloqueado && styles.startBotaoDesabilitado,
              ]}
              onPress={() => abrirDetalhes(atividade)}
              disabled={atividade.bloqueado}
            >
              <Text style={styles.startTexto}>Start</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* MODAL DE DESCRIÇÃO — aparece quando "selecionada" não é null */}
      <AppModal visible={!!selecionada} onClose={() => setSelecionada(null)}>
        <Text style={styles.modalTitulo}>{selecionada?.titulo}</Text>
        <Text style={styles.modalDescricao}>{selecionada?.descricao}</Text>
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

          <View style={styles.drawerPanel}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitulo}>Configurações</Text>
              <TouchableOpacity onPress={() => setConfiguracoesAberta(false)}>
                <Text style={styles.drawerClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.configItem}>
              <Text style={styles.configTexto}>Notificações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.configItem}>
              <Text style={styles.configTexto}>Privacidade</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.configItem}>
              <Text style={styles.configTexto}>Sobre o app</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalBotao}
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

// ESTILOS DA TELA (layout, tipografia e aparência dos elementos)
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

  menuBotao: {
    marginTop: 20,
    marginLeft: 20,
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

  trilhaWrapper: {
    marginTop: 50,
  },

  trilha: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  card: {
    width: 353,
    height: 396,
    backgroundColor: "#EDEDED",
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 24,
    gap: 16,
  },

  cardTitulo: {
    color: "#2400FF",
    fontSize: 20,
    fontWeight: "bold",
  },

  cartuchoContainer: {
    width: 300,
    height: 171,
    justifyContent: "center",
    alignItems: "center",
  },

  cartucho: {
    width: 500,
    height: 300,
    resizeMode: "contain",
  },

  cartuchoBloqueado: {
    opacity: 0.4,
  },

  cadeadoOverlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  cadeadoIcone: {
    width: 32,
    height: 32,
  },

  startBotao: {
    backgroundColor: "#2400FF",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  startBotaoDesabilitado: {
    backgroundColor: "#B0B0B8",
  },

  startTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#2400FF",
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
