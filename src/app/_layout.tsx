//EXTREMAMENTE IMPORTANTE: ESTE ARQUIVO É RESPONSÁVEL POR INICIAR O BANCO DE DADOS E MUDAR O LAYOUT DE TODAS AS TELAS
import { TemaProvider } from "@/contexts/tema";
import {
    iniciarBanco,
    limparDadosDeTeste,
    sistemaSeletorAberto,
} from "@/database/db";
import { Baloo2_400Regular, Baloo2_700Bold } from "@expo-google-fonts/baloo-2";
import {
    PixelifySans_400Regular,
    useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { router, Stack } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    Baloo2_400Regular,
    Baloo2_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SQLiteProvider databaseName="insecta.db" onInit={iniciarBanco}>
      <LayoutContent />
    </SQLiteProvider>
  );
}

function LayoutContent() {
  const db = useSQLiteContext();

  useEffect(() => {
    if (!__DEV__ || Platform.OS === "web") return;

    let estadoAnterior = AppState.currentState;
    let limpezaPendente: Promise<void> | null = null;
    const inscricao = AppState.addEventListener("change", (estado) => {
      const saiuParaSegundoPlano =
        estado === "background" && estadoAnterior !== "background";
      estadoAnterior = estado;

      if (saiuParaSegundoPlano && !sistemaSeletorAberto()) {
        limpezaPendente = limparDadosDeTeste(db);
      }

      if (estado === "active" && limpezaPendente) {
        const limpeza = limpezaPendente;
        limpezaPendente = null;
        void limpeza.then(() => router.replace("/login")).catch(() => {});
      }
    });

    return () => inscricao.remove();
  }, [db]);

  //retorna a navegação com as telas do app
  return (
    <TemaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TemaProvider>
  );
}
