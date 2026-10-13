// este wrapper centraliza o estilo padrão dos inputs para manter consistência entre as telas
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { useTema } from "@/contexts/tema";

// este wrapper centraliza o estilo padrão dos inputs para manter consistência entre as telas
export function Input({ style, ...rest }: TextInputProps) {
  const { cores } = useTema();
  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: cores.superficie,
          borderColor: cores.borda,
          color: cores.texto,
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 30,
    fontSize: 16,
    paddingLeft: 12,
  },
});
