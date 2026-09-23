//TELA DE PERFIL {EM MANUTENÇÂO} (a tela onde o usuário vê seu perfil, conquistas e amigos)
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function User() {
  // componentes da tela
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: "height" })}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>EM MANUTENÇÃO</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
// css da tela
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  content: {
    alignItems: "center",
  },

  image: {
    width: 250,
    height: 250,
    marginTop: 10,
    marginBottom: 16,
  },

  title: {
    color: "#243AA9",
    fontFamily: "Baloo2_700Bold",
    fontSize: 30,
    opacity: 0.9,
  },

  subtitle: {
    color: "#243AA9",
    fontFamily: "Baloo2_400Regular",
    fontSize: 20,
    opacity: 0.6,
    marginBottom: 24,
    marginRight: 50,
    marginLeft: 20,
  },
});
