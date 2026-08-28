//EXTREMAMENTE IMPORTANTE: ESTE ARQUIVO É RESPONSÁVEL POR INICIAR O BANCO DE DADOS E MUDAR O LAYOUT DE TODAS AS TELAS
import { iniciarBanco } from "@/database/db";
import { Baloo2_400Regular, Baloo2_700Bold } from "@expo-google-fonts/baloo-2";
import {
  PixelifySans_400Regular,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { Stack } from "expo-router";

// ja inicia o bannco de dados antes de renderizar as telass
iniciarBanco();

export default function Layout() {
  // carrega as fontes personalizadas antes de renderizar a navegaçãoo
  const [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    Baloo2_400Regular,
    Baloo2_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  //retorna a navegação com as telas do app
  return <Stack screenOptions={{ headerShown: false }} />;
}
