import { CabecalhoProgresso } from "@/components/cabecalho-progresso";
import { useTema } from "@/contexts/tema";
import {
    carregarPerfilUsuario,
    definirSeletorSistemaAberto,
    salvarFotoPerfil,
} from "@/database/db";
import { aviso } from "@/utils/aviso";
import { File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import {
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
  const db = useSQLiteContext();
  const { cores } = useTema();
  const [apelido, setApelido] = useState("Usuário");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [concluiuPrimeiraAtividade, setConcluiuPrimeiraAtividade] =
    useState(false);
  const [salvandoFoto, setSalvandoFoto] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      carregarPerfilUsuario(db)
        .then((perfil) => {
          if (!ativo) return;
          console.log("resultado consulta carregar perfil", perfil);
          setApelido(perfil?.apelido?.trim() || "Usuário");
          const fotoUri = perfil?.fotoPerfilUri ?? null;
          setFotoUri(
            Platform.OS === "web" && fotoUri?.startsWith("file://")
              ? null
              : fotoUri,
          );
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
          if (ativo) aviso("Erro", "Não foi possível carregar o perfil.");
        });

      return () => {
        ativo = false;
      };
    }, [db]),
  );

  async function escolherFoto() {
    console.log("escolher foto clicado");
    if (salvandoFoto) return;
    setSalvandoFoto(true);
    definirSeletorSistemaAberto(true);
    let arquivoDestino: File | null = null;
    try {
      if (Platform.OS !== "web") {
        const permissao =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissao.granted) {
          aviso(
            "Permissão necessária",
            "Autorize o acesso às fotos para escolher uma imagem de perfil.",
          );
          return;
        }
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
        base64: Platform.OS === "web",
        allowsMultipleSelection: false,
      });
      if (resultado.canceled) return;

      const imagem = resultado.assets[0];
      if (!imagem || imagem.type !== "image") {
        aviso("Imagem inválida", "Escolha um arquivo de imagem.");
        return;
      }

      const tamanho =
        imagem.fileSize ??
        (Platform.OS === "web"
          ? imagem.file?.size
          : new File(imagem.uri).size) ??
        0;
      const tipo =
        imagem.mimeType ??
        (Platform.OS === "web"
          ? imagem.file?.type
          : new File(imagem.uri).type) ??
        "";
      if (
        tamanho <= 0 ||
        tamanho > TAMANHO_MAXIMO_FOTO ||
        !["image/jpeg", "image/png", "image/webp"].includes(tipo)
      ) {
        aviso(
          "Imagem não aceita",
          "Use uma foto JPG, PNG ou WebP de até 5 MB.",
        );
        return;
      }

      const perfil = await carregarPerfilUsuario(db);
      console.log("resultado consulta perfil para foto", perfil);
      if (!perfil) throw new Error("Usuário não encontrado.");

      if (Platform.OS === "web") {
        if (!imagem.base64) throw new Error("Não foi possível ler a imagem.");
        const uri = `data:${tipo};base64,${imagem.base64}`;
        const resultadoSalvamento = await salvarFotoPerfil(db, uri);
        console.log("resultado salvar foto web", resultadoSalvamento);
        setFotoUri(uri);
      } else {
        const extensao =
          tipo === "image/png" ? "png" : tipo === "image/webp" ? "webp" : "jpg";
        arquivoDestino = new File(
          Paths.document,
          `perfil-${perfil.id}-${Date.now()}.${extensao}`,
        );
        new File(imagem.uri).copy(arquivoDestino);
        const resultadoSalvamento = await salvarFotoPerfil(
          db,
          arquivoDestino.uri,
        );
        console.log("resultado salvar foto nativa", resultadoSalvamento);
        setFotoUri(arquivoDestino.uri);
        if (perfil.fotoPerfilUri?.startsWith(Paths.document.uri)) {
          try {
            const fotoAnterior = new File(perfil.fotoPerfilUri);
            if (fotoAnterior.exists) fotoAnterior.delete();
          } catch {
            // A limpeza antiga não deve invalidar a foto já salva.
          }
        }
      }
    } catch {
      if (arquivoDestino?.exists) arquivoDestino.delete();
      aviso("Erro", "Não foi possível salvar a foto de perfil.");
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
