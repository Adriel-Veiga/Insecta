//TELA PRINCIPAL {EM MANUTENÇÂO} (a tela principal do app, onde o usuário vê os exercícios e navega para outras telas)
import { Alert, StyleSheet, View } from "react-native";

import { Button } from "@/components/button";

export default function Home() {
  const Iniciar = () => {
    Alert.alert(":(", "Não temos níveis disponíveis!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.upBar}></View>

      <Button style={styles.start} onPress={Iniciar} label="Iniciar" />
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

  card: {
    backgroundColor: "#1B1B1B",
    padding: 150,
    borderRadius: 20,
    position: "absolute",
    height: 400,
    marginBottom: 150,
  },

  miniCard: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
    position: "absolute",
    height: 250,
    marginTop: 150,
    width: 300,
    borderWidth: 2,
    borderColor: "#FFC43F",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    marginLeft: 80,
    marginTop: 30,
  },

  topCard: {
    backgroundColor: "black",
    padding: 1,
    borderRadius: 20,
    position: "absolute",
    width: 300,
    marginBottom: 150,
    height: 100,
  },

  coin: {
    width: 100,
    height: 100,
    position: "absolute",
  },

  joana: {
    width: 200,
    height: 200,
    marginLeft: 45,
  },

  start: {
    backgroundColor: "#FFC43F",
    marginTop: 320,
    width: 300,
    height: 48,
    borderRadius: 8,
  },
});
