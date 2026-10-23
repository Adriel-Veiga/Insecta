import { CabecalhoProgresso } from "@/components/cabecalho-progresso";
import { useTema } from "@/contexts/tema";
import {
  carregarPerfilUsuario,
  definirSeletorSistemaAberto,
  salvarFotoPerfil,
} from "@/database/db";
import { File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FOTO_PADRAO = require("../../assets/Icons/user.png");
const TAMANHO_MAXIMO_FOTO = 5 * 1024 * 1024;

export default function Perfil() {
  const { cores } = useTema();
  const [apelido, setApelido] = useState("Usuário");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [concluiuPrimeiraAtividade, setConcluiuPrimeiraAtividade] =
    useState(false);
  const [salvandoFoto, setSalvandoFoto] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      carregarPerfilUsuario()
        .then((perfil) => {
          if (!ativo) return;
          setApelido(perfil?.apelido?.trim() || "Usuário");
          setFotoUri(perfil?.fotoPerfilUri ?? null);
          try {
            const progresso: unknown = JSON.parse(
              perfil?.progressoAtividades ?? "{}",
            );
            setConcluiuPrimeiraAtividade(
              !!progresso &&
                typeof progresso === "object" &&
                !Array.isArray(progresso) &&
                (progresso as Record<string, unknown>)["1"] === 100,
            );
          } catch {
            setConcluiuPrimeiraAtividade(false);
          }
        })
        .catch(() => {
          if (ativo) Alert.alert("Erro", "Não foi possível carregar o perfil.");
        });

      return () => {
        ativo = false;
      };
    }, []),
  );

  async function escolherFoto() {
    if (salvandoFoto) return;
    if (Platform.OS === "web") {
      Alert.alert(
        "Indisponível no navegador",
        "A foto de perfil pode ser alterada pelo aplicativo móvel.",
      );
      return;
    }
    setSalvandoFoto(true);
    definirSeletorSistemaAberto(true);
    let arquivoDestino: File | null = null;
    try {
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Autorize o acesso às fotos para escolher uma imagem de perfil.",
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
        base64: false,
        allowsMultipleSelection: false,
      });
      if (resultado.canceled) return;

      const imagem = resultado.assets[0];
      if (!imagem || imagem.type !== "image") {
        Alert.alert("Imagem inválida", "Escolha um arquivo de imagem.");
        return;
      }

      const arquivoOrigem = new File(imagem.uri);
      const tamanho = imagem.fileSize ?? arquivoOrigem.size;
      const tipo = imagem.mimeType ?? arquivoOrigem.type;
      if (
        tamanho <= 0 ||
        tamanho > TAMANHO_MAXIMO_FOTO ||
        !["image/jpeg", "image/png", "image/webp"].includes(tipo)
      ) {
        Alert.alert(
          "Imagem não aceita",
          "Use uma foto JPG, PNG ou WebP de até 5 MB.",
        );
        return;
      }

      const perfil = await carregarPerfilUsuario();
      if (!perfil) throw new Error("Usuário não encontrado.");

      const extensao =
        tipo === "image/png" ? "png" : tipo === "image/webp" ? "webp" : "jpg";
      arquivoDestino = new File(
        Paths.document,
        `perfil-${perfil.id}-${Date.now()}.${extensao}`,
      );
      arquivoOrigem.copy(arquivoDestino);
      await salvarFotoPerfil(arquivoDestino.uri);
      setFotoUri(arquivoDestino.uri);
      if (perfil.fotoPerfilUri?.startsWith(Paths.document.uri)) {
        try {
          const fotoAnterior = new File(perfil.fotoPerfilUri);
          if (fotoAnterior.exists) fotoAnterior.delete();
        } catch {
          // A limpeza antiga não deve invalidar a foto já salva.
        }
      }
    } catch {
      if (arquivoDestino?.exists) arquivoDestino.delete();
      Alert.alert("Erro", "Não foi possível salvar a foto de perfil.");
    } finally {
      definirSeletorSistemaAberto(false);
      setSalvandoFoto(false);
    }
  }

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: cores.fundo }]}
      edges={["top"]}
    >
      <CabecalhoProgresso />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.conteudo}>
          <Text style={[styles.saudacao, { color: cores.destaque }]}>
            Olá, {apelido}
          </Text>
          <Pressable
            onPress={escolherFoto}
            disabled={salvandoFoto}
            accessibilityRole="button"
            accessibilityLabel="Alterar foto de perfil"
            accessibilityHint="Abre a galeria para escolher uma nova foto"
            style={styles.controleFoto}
          >
            <Image
              source={fotoUri ? { uri: fotoUri } : FOTO_PADRAO}
              style={styles.foto}
            />
            <Text style={[styles.ajudaFoto, { color: cores.textoSecundario }]}>
              {salvandoFoto ? "Salvando foto..." : "Toque na foto para alterar"}
            </Text>
          </Pressable>

          <View
            style={[
              styles.cardConquistas,
              { backgroundColor: cores.superficieSuave },
            ]}
          >
            <Text style={[styles.cardTitulo, { color: cores.texto }]}>
              Conquistas
            </Text>
            {concluiuPrimeiraAtividade ? (
              <View style={styles.conquista}>
                <Image
                  source={require("../../assets/Trofeu.png")}
                  style={styles.trofeu}
                />
                <View style={styles.textoConquista}>
                  <Text
                    style={[styles.conquistaTitulo, { color: cores.texto }]}
                  >
                    Primeira atividade concluída
                  </Text>
                  <Text style={{ color: cores.textoSecundario }}>
                    Você concluiu sua primeira atividade.
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={[styles.vazio, { color: cores.textoSecundario }]}>
                Conclua sua primeira atividade para ganhar o troféu.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 100 },
  conteudo: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 18,
  },
  saudacao: {
    fontSize: 24,
    fontFamily: "Baloo2_700Bold",
  },
  foto: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#E6E6E8",
  },
  controleFoto: { alignItems: "center", gap: 6 },
  ajudaFoto: { fontSize: 13 },
  cardConquistas: {
    width: "100%",
    minHeight: 150,
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  cardTitulo: {
    fontSize: 20,
    fontFamily: "Baloo2_700Bold",
  },
  vazio: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  conquista: { flexDirection: "row", alignItems: "center", gap: 14 },
  trofeu: { width: 64, height: 64, resizeMode: "contain" },
  textoConquista: { flex: 1, gap: 4 },
  conquistaTitulo: { fontSize: 16, fontWeight: "700" },
});
