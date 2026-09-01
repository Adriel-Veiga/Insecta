// TELA DE PERGUNTA DE MÚLTIPLA ESCOLHA (a tela onde o usuário responde a pergunta de múltipla escolha)
import { Button } from "@/components/button";
import { Pergunta } from "@/database/perguntas";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MultiplaEscolhaProps = {
  pergunta: Pergunta;
  onResponder: (indiceEscolhido: number) => void; // chamado quando o usuário confirma a resposta (próxima)
  isLast?: boolean;
};

export function MultiplaEscolha({
  pergunta,
  onResponder,
  isLast,
}: MultiplaEscolhaProps) {
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);

  useEffect(() => {
    // quando a pergunta muda, resetamos o estado para esconder o botão
    // e remover as marcações (isso evita que a seleção da pergunta
    // anterior persista na próxima pergunta)
    setSelecionado(null);
    setRespondido(false);
  }, [pergunta.id]);

  const handleEscolha = (indice: number) => {
    if (respondido) return; // não permitir mudar depois de respondido
    setSelecionado(indice);
    setRespondido(true);
  };

  const confirmar = () => {
    if (selecionado === null) return;
    onResponder(selecionado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.enunciado}>{pergunta.enunciado}</Text>

      {pergunta.alternativas.map((alternativa, indice) => {
        const marcado = respondido && selecionado === indice;
        const acertou = marcado && selecionado === pergunta.respostaCorreta;

        const containerDynamicStyle = {
          backgroundColor: marcado
            ? acertou
              ? "#E6F9EA"
              : "#FFECEC"
            : "#F2F2F2",
          borderColor: marcado
            ? acertou
              ? "#008000"
              : "#FF0000"
            : "transparent",
          borderWidth: marcado ? 2 : 0,
        } as const;

        const textoStyle = {
          color: marcado ? (acertou ? "#006400" : "#CC0000") : "#2400FF",
        } as const;

        return (
          <TouchableOpacity
            key={indice}
            style={[styles.alternativa, containerDynamicStyle]}
            onPress={() => handleEscolha(indice)}
            activeOpacity={0.8}
            disabled={respondido}
          >
            <Text style={[styles.textoAlternativa, textoStyle]}>
              {alternativa}
            </Text>
          </TouchableOpacity>
        );
      })}

      {respondido && (
        <View style={{ marginTop: 8 }}>
          <Button
            label={isLast ? "Finalizar" : "Próxima"}
            onPress={confirmar}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  enunciado: {
    color: "#2400FF",
    fontSize: 18,
    fontFamily: "Baloo2_700Bold",
    marginBottom: 8,
  },
  alternativa: {
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
    padding: 16,
  },
  textoAlternativa: {
    color: "#2400FF",
    fontSize: 15,
    fontFamily: "Baloo2_400Regular",
  },
});
