//TELA PRINCIPAL {EM MANUTENÇÂO} (a tela principal do app, onde o usuário vê os exercícios e navega para outras telas)
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";


type Nivel = {
  id: number;
  titulo: string;
  desbloqueado: boolean;
};

const niveis: Nivel[] = [
  { id: 1, titulo: "Exercício 1", desbloqueado: true },
  { id: 2, titulo: "Exercício 2", desbloqueado: false },
  { id: 3, titulo: "Exercício 3", desbloqueado: false },
  { id: 4, titulo: "Exercício 4", desbloqueado: false },
  { id: 5, titulo: "Exercício 5", desbloqueado: false },
];

export default function Home() {
  const Iniciar = () => {
    Alert.alert(":(", "Não temos níveis disponíveis!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.upBar} />

      {/* TRILHA HORIZONTAL DE NÍVEIS */}
      <View style={styles.trilhaWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trilha}
        >
          {niveis.map((nivel) => (
            <View
              key={nivel.id}
              style={[styles.no, !nivel.desbloqueado && styles.noBloqueado]}
            >
              <Text style={styles.noTexto}>{nivel.id}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101016",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  upBar: {
    backgroundColor: "black",
    padding: 70,
    borderRadius: 10,
    position: "absolute",
    marginBottom: 800,
    width: 500,
  },

  // wrapper controla ONDE a trilha aparece na tela
  trilhaWrapper: {
    width: "100%",
    height: 400,
    justifyContent: "center",
  },

  // contentContainerStyle: estiliza o conteúdo que rola, não a "janela"
  trilha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    paddingHorizontal: 24,
  },

  no: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1B1B1B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFC43F",
  },

  noBloqueado: {
    borderColor: "#555",
    opacity: 0.5,
  },

  noTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },

  start: {
    backgroundColor: "#FFC43F",
    marginTop: 320,
    width: 300,
    height: 48,
    borderRadius: 8,
  },

  config: {
    width: 80,
    height: 80,
  },

  configL: {
    position: "absolute",
    marginBottom: 730,
  },

  social: {
    width: 35,
    height: 35,
  },

  socialL: {
    position: "absolute",
    marginRight: 200,
    marginTop: 705,
  },

  home: {
    width: 30,
    height: 30,
  },

  homeL: {
    position: "absolute",
    marginTop: 705,
  },

  user: {
    width: 30,
    height: 30,
  },

  userL: {
    position: "absolute",
    marginLeft: 200,
    marginTop: 705,
  },

  downBar: {
    backgroundColor: "#07070A",
    padding: 30,
    borderRadius: 30,
    marginTop: 700,
    width: 350,
    position: "absolute",
  },
});
