import { StyleSheet, TextInput, TextInputProps } from "react-native";

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
