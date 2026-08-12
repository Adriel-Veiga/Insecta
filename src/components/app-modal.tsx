import type { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";

// Essa "type" descreve as props que o AppModal aceita.
// children é o TIPO especial que representa "qualquer JSX" (texto, view, botão...)
type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function AppModal({ visible, onClose, children }: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1B1B1B",
    borderRadius: 20,
    padding: 24,
    width: "85%",
  },
});
