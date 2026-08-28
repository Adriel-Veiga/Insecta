// este componente é um modal genérico que pode ser usado em qualquer parte do app
import type { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";

// esta type define a estrutura mínima que o modal precisa receber: visibilidade,
// callback de fechamento e o conteúdo dinâmico que será renderizado dentro dele
// children é o tipo especial que aceita qualquer JSX, como texto, botões e componentes
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
