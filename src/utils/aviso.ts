import { Alert, Platform } from "react-native";

export function aviso(titulo: string, msg?: string) {
  if (Platform.OS === "web") {
    window.alert(msg ? `${titulo}\n${msg}` : titulo);
  } else {
    Alert.alert(titulo, msg);
  }
}
