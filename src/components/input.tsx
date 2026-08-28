// este wrapper centraliza o estilo padrão dos inputs para manter consistência entre as telas
import { StyleSheet, TextInput, TextInputProps } from "react-native";

// este wrapper centraliza o estilo padrão dos inputs para manter consistência entre as telas
export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={styles.input} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#464646",
    borderRadius: 30,
    fontSize: 16,
    paddingLeft: 12,
    backgroundColor: "white",
  },
});
