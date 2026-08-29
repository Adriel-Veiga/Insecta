import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";

export default function NivelIntro() {
  const avancar = () => {
    router.push("/nivel");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require("../assets/Joana/JoanaU3.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Vamos descobrir seu nível!</Text>
        <Button label="Avançar" onPress={avancar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    color: "#2400FF",
    fontSize: 24,
    fontFamily: "Baloo2_700Bold",
    textAlign: "center",
  },
});
