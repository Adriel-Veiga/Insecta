// PÁGINA INICIAL DO APP (lista de atividades, progresso e configurações)
import { AppModal } from "@/components/app-modal";
import { CirculoProgresso } from "@/components/circulo-progresso";
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

// TIPO DA ATIVIDADE (estrutura de cada item da lista)
type Atividade = {
  id: number;
  titulo: string;
  descricao: string;
  progresso: number; // 0 a 100
  bloqueado: boolean;
  cor: string;
};

// LISTA DE ATIVIDADES (dados fixos do catálogo de tarefas do app)
const atividades: Atividade[] = [
  {
    id: 1,
    titulo: "Atividade 1",
    descricao:
      "Nessa atividade você vai aprender os conceitos básicos de hardware, identificando as principais peças de um computador.",
    progresso: 40,
    bloqueado: false,
    cor: "#5B5FEF",
  },
  {
    id: 2,
    titulo: "Atividade 2",
    descricao: "Descrição da atividade 2...",
    progresso: 0,
    bloqueado: false,
    cor: "#3730A3",
  },
  {
    id: 3,
    titulo: "Atividade 3",
    descricao: "Descrição da atividade 3...",
    progresso: 0,
    bloqueado: false,
    cor: "#5B5FEF",
  },
  {
    id: 4,
    titulo: "Atividade 4",
    descricao: "Descrição da atividade 4...",
    progresso: 0,
    bloqueado: true,
    cor: "#7B7FA6",
  },
  {
    id: 5,
    titulo: "Atividade 5",
    descricao: "Descrição da atividade 5...",
    progresso: 0,
    bloqueado: true,
    cor: "#A5A8DB",
  },
  {
    id: 6,
    titulo: "Atividade 6",
    descricao: "Descrição da atividade 6...",
    progresso: 0,
    bloqueado: true,
    cor: "#7B7FA6",
  },
  {
    id: 7,
    titulo: "Atividade 7",
    descricao: "Descrição da atividade 7...",
    progresso: 0,
    bloqueado: true,
    cor: "#A5A8DB",
  },
];

// PROGRESSO GERAL (conta quantas atividades já estão liberadas)
const concluidas = atividades.filter((a) => !a.bloqueado).length;
const progressoGeral = concluidas / atividades.length;

// PÁGINA INICIAL
export default function IndexPage() {
  const [selecionada, setSelecionada] = useState<Atividade | null>(null);
  const [configuracoesAberta, setConfiguracoesAberta] = useState(false);

  // FUNÇÃO PARA ABRIR DETALHES (bloqueia itens fechados)
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
              { width: `${progressoGeral * 100}%` },
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
              atividade.bloqueado && styles.pillBloqueada,
            ]}
            onPress={() => abrirDetalhes(atividade)}
            disabled={atividade.bloqueado}
            activeOpacity={0.8}
          >
            <Text style={styles.pillTexto}>{atividade.titulo}</Text>

            {atividade.bloqueado ? (
              <Image
                source={require("../../assets/Icons/lock.png")}
                style={styles.cadeadoIcone}
              />
            ) : (
              <CirculoProgresso porcentagem={atividade.progresso} />
            )}
          </TouchableOpacity>
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
