// TELA SOCIAL (gráfico de barras com o progresso dos amigos)
import { CabecalhoProgresso } from "@/components/cabecalho-progresso";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// TIPO DO AMIGO NO RANKING
type Amigo = {
  id: number;
  pontos: number;
};

const amigos: Amigo[] = [
  { id: 1, pontos: 30 },
  { id: 2, pontos: 80 },
  { id: 3, pontos: 100 },
  { id: 4, pontos: 45 },
  { id: 5, pontos: 72 },
  { id: 6, pontos: 90 },
];

// altura máxima que a maior barra pode ter, em pixels
const ALTURA_MAXIMA = 240;
const maiorValor = Math.max(...amigos.map((a) => a.pontos));

export default function Social() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <CabecalhoProgresso progresso={0.1} />

      <View style={styles.grafico}>
        {amigos.map((amigo) => {
          // proporção da barra em relação à maior de todas
          const altura = (amigo.pontos / maiorValor) * ALTURA_MAXIMA;

          return (
            <View key={amigo.id} style={styles.coluna}>
              <Image
                source={require("../../assets/Icons/user.png")}
                style={styles.avatar}
              />
              <View style={[styles.barra, { height: altura }]} />
            </View>
          );
        })}
      </View>

      {/* linha de base do gráfico */}
      <View style={styles.linhaBase} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  grafico: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 320,
    marginTop: 30,
    marginHorizontal: 30,
  },
  coluna: {
    alignItems: "center",
    gap: 6,
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E8E8E8",
  },
  barra: {
    width: 28,
    backgroundColor: "#0000CC",
    borderRadius: 10,
  },
  linhaBase: {
    height: 1,
    backgroundColor: "#000",
    opacity: 0.2,
    marginHorizontal: 30,
  },
});
