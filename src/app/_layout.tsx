import { iniciarBanco } from "@/database/db";
import { Baloo2_400Regular, Baloo2_700Bold } from "@expo-google-fonts/baloo-2";
import {
  PixelifySans_400Regular,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { Stack } from "expo-router";

// o banco precisa ser inicializado logo no carregamento do app para que as telas
// consigam consultar ou gravar dados sem depender de uma ordem manual de execução
iniciarBanco();

export default function Layout() {
  // carrega as fontes personalizadas antes de renderizar a navegação, para evitar que
  // o texto apareça com um tipo errado durante o primeiro frame do app
  const [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    Baloo2_400Regular,
    Baloo2_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
