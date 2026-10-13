//
import { Image, StyleSheet, View } from "react-native";
import { useTema } from "@/contexts/tema";

type CabecalhoProgressoProps = {
  progresso: number; // de 0 a 1
};

export function CabecalhoProgresso({ progresso }: CabecalhoProgressoProps) {
  const { cores } = useTema();

  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/Icons/iniciante.png")}
        style={styles.iconeEsquerda}
      />

      <View style={[styles.trilho, { backgroundColor: cores.trilho }]}>
        <View
          style={[
            styles.preenchimento,
            { width: `${progresso * 100}%`, backgroundColor: cores.destaque },
          ]}
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
    overflow: "hidden",
  },
  preenchimento: {
    height: "100%",
    borderRadius: 8,
  },
  iconeDireita: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
