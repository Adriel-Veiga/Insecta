import { iniciarBanco } from "@/database/db";
import { Baloo2_400Regular, Baloo2_700Bold } from "@expo-google-fonts/baloo-2";
import {
  PixelifySans_400Regular,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { Stack } from "expo-router";
iniciarBanco();
export default function Layout() {
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
