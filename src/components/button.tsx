// este componente é um botão genérico que pode ser usado em qualquer parte do app
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTema } from "@/contexts/tema";

// o botão reutiliza as props do TouchableOpacity para aceitar eventos e estilos sem precisar
// criar uma API própria para cada tela, deixando o uso mais simples
type ButtonProps = TouchableOpacityProps & {
  label: string;
};

export function Button({ label, style, ...rest }: ButtonProps) {
  const { cores } = useTema();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: cores.destaque }, style]}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[styles.label, { color: cores.textoBotao }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    borderRadius: 30,
  },

  label: {
    fontSize: 16,
    fontFamily: "Baloo2_700Bold",
    fontWeight: 600,
    textAlign: "center",
    gap: "12",
    marginTop: 13,
  },
});
