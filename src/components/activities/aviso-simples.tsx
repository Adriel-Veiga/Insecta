import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AvisoSimplesProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export function AvisoSimples({ title, message, onClose }: AvisoSimplesProps) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFC43F",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: { color: "#fff", fontSize: 16, marginBottom: 20 },
  button: {
    backgroundColor: "#FFC43F",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: { color: "#101016", fontWeight: "600" },
});
