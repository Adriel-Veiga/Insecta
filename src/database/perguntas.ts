// DATABASE DE PERGUNTAS (perguntas de múltipla escolha para cada nível)
export type Pergunta = {
  id: number;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
};

export const perguntasIntermediario: Pergunta[] = [
  {
    id: 1,
    enunciado: "O que é um arquivo '.zip'?",
    alternativas: [
      "Um vírus",
      "Um arquivo compactado",
      "Um tipo de imagem",
      "Um programa de música",
    ],
    respostaCorreta: 1,
  },
  {
    id: 2,
    enunciado: "O que faz o atalho Ctrl + Z?",
    alternativas: [
      "Fechar tudo",
      "Desfazer a última ação",
      "Salvar",
      "Imprimir",
    ],
    respostaCorreta: 1,
  },
  {
    id: 3,
    enunciado: "O que é o 'Wi-Fi'?",
    alternativas: [
      "Um cabo de rede",
      "Uma tecnologia de internet sem fio",
      "Um programa antivírus",
      "Um tipo de teclado",
    ],
    respostaCorreta: 1,
  },
  {
    id: 4,
    enunciado: "Para que serve um 'navegador anônimo'?",
    alternativas: [
      "Deixa o computador mais rápido",
      "Não salva histórico de navegação",
      "Protege contra todos os vírus",
      "Bloqueia toda a internet",
    ],
    respostaCorreta: 1,
  },
  {
    id: 5,
    enunciado: "O que é 'phishing'?",
    alternativas: [
      "Um jogo online",
      "Uma tentativa de roubar dados se passando por algo confiável",
      "Um tipo de vírus que danifica o hardware",
      "Um programa de edição de fotos",
    ],
    respostaCorreta: 1,
  },
  {
    id: 6,
    enunciado: "O que significa 'atualizar o sistema operacional'?",
    alternativas: [
      "Apagar todos os arquivos",
      "Trocar de computador",
      "Instalar melhorias e correções de segurança",
      "Desligar o computador",
    ],
    respostaCorreta: 2,
  },
];

export const perguntasAvancado: Pergunta[] = [
  {
    id: 1,
    enunciado: "O que é uma VPN?",
    alternativas: [
      "Um vírus de computador",
      "Uma rede privada que criptografa sua conexão",
      "Um tipo de arquivo de imagem",
      "Um navegador de internet",
    ],
    respostaCorreta: 1,
  },
  {
    id: 2,
    enunciado: "O que é autenticação de dois fatores (2FA)?",
    alternativas: [
      "Usar duas senhas iguais",
      "Uma camada extra de segurança além da senha",
      "Ter duas contas de email",
      "Um tipo de vírus",
    ],
    respostaCorreta: 1,
  },
  {
    id: 3,
    enunciado: "O que é um endereço IP?",
    alternativas: [
      "O nome do seu computador",
      "Um identificador numérico de um dispositivo na rede",
      "A senha do seu roteador",
      "O nome do seu provedor de internet",
    ],
    respostaCorreta: 1,
  },
  {
    id: 4,
    enunciado: "O que diferencia HTTP de HTTPS?",
    alternativas: [
      "HTTPS é mais rápido",
      "HTTPS usa criptografia na conexão",
      "Não há diferença",
      "HTTP é mais moderno",
    ],
    respostaCorreta: 1,
  },
  {
    id: 5,
    enunciado: "O que é um 'backup'?",
    alternativas: [
      "Um vírus disfarçado",
      "Uma cópia de segurança dos seus dados",
      "Um tipo de tela de computador",
      "Um programa de edição de vídeo",
    ],
    respostaCorreta: 1,
  },
  {
    id: 6,
    enunciado: "O que é engenharia social, no contexto de segurança digital?",
    alternativas: [
      "Um curso universitário",
      "Manipular pessoas pra obter informações ou acesso indevido",
      "Um tipo de rede social",
      "Uma técnica de programação",
    ],
    respostaCorreta: 1,
  },
];
