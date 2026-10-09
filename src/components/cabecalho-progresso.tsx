//
import { Image, StyleSheet, View } from "react-native";

type CabecalhoProgressoProps = {
  progresso: number; // de 0 a 1
};

export function CabecalhoProgresso({ progresso }: CabecalhoProgressoProps) {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/Icons/iniciante.png")}
        style={styles.iconeEsquerda}
      />

      <View style={styles.trilho}>
        <View
          style={[styles.preenchimento, { width: `${progresso * 100}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  iconeEsquerda: {
    width: 50,
    height: 50,
  },
  trilho: {
    flex: 1,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    overflow: "hidden",
  },
  preenchimento: {
    height: "100%",
    backgroundColor: "#0000CC",
    borderRadius: 8,
  },
  iconeDireita: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
