//SPLASH SCREEN (Não é a tela de intro, é a tela inicial do app, que aparece antes da intro.Não é importante mas também não mexer)
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";

export default function SplashScreen() {
  // deixa a tela inicial por 2 segundos antes de mandar o usuário para a intro
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/intro");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  // componentes da tela
  return (
    <LinearGradient colors={["#000166", "#0002CC"]} style={styles.container}>
      <Text style={styles.title}>Insecta</Text>
    </LinearGradient>
  );
}
// css da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 42,
    fontFamily: "PixelifySans_400Regular",
    letterSpacing: 2,
  },
});
