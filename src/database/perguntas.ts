// DATABASE DE PERGUNTAS (perguntas de múltipla escolha para cada nível)
export type Pergunta = {
  id: number;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  explicacao?: string;
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

export const perguntasPorAtividade: Record<number, Pergunta[]> = {
  1: [
    {
      id: 1,
      enunciado: "Qual componente executa instruções e cálculos no computador?",
      alternativas: ["Processador (CPU)", "Monitor", "Teclado", "Gabinete"],
      respostaCorreta: 0,
      explicacao:
        "A CPU processa instruções e cálculos. Monitor, teclado e gabinete têm outras funções e não executam os programas.",
    },
    {
      id: 2,
      enunciado: "Para que serve principalmente a memória RAM?",
      alternativas: [
        "Guardar arquivos mesmo com o computador desligado",
        "Armazenar temporariamente dados dos programas em uso",
        "Exibir imagens na tela",
        "Conectar o computador à internet",
      ],
      respostaCorreta: 1,
      explicacao:
        "A RAM guarda temporariamente os dados dos programas em uso. Arquivos que precisam permanecer salvos ficam no SSD ou HD.",
    },
    {
      id: 3,
      enunciado: "Qual peça conecta os principais componentes do computador?",
      alternativas: ["Placa-mãe", "Caixa de som", "Mouse", "Impressora"],
      respostaCorreta: 0,
      explicacao:
        "A placa-mãe permite que os principais componentes se conectem e se comuniquem. Os demais itens não fazem essa ligação interna.",
    },
    {
      id: 4,
      enunciado: "Qual é a função do SSD ou HD?",
      alternativas: [
        "Resfriar o processador",
        "Armazenar arquivos e programas",
        "Controlar o cursor",
        "Fornecer energia da tomada",
      ],
      respostaCorreta: 1,
      explicacao:
        "SSD e HD são unidades de armazenamento: guardam arquivos e programas. Não servem para resfriar o processador, controlar o cursor ou fornecer energia.",
    },
  ],
  2: [
    {
      id: 1,
      enunciado: "O que é phishing?",
      alternativas: [
        "Uma tentativa de enganar alguém para roubar dados",
        "Uma cópia de segurança dos arquivos",
        "Uma atualização do sistema",
        "Um tipo de conexão sem fio",
      ],
      respostaCorreta: 0,
      explicacao:
        "Phishing é uma tentativa de enganar alguém para obter dados. Backup, atualização e conexão sem fio são conceitos diferentes.",
    },
    {
      id: 2,
      enunciado: "Qual senha é mais segura?",
      alternativas: [
        "12345678",
        "A mesma senha usada em todos os sites",
        "Uma combinação longa e única de palavras, números e símbolos",
        "Seu nome e ano de nascimento",
      ],
      respostaCorreta: 2,
      explicacao:
        "Uma senha longa e exclusiva é mais difícil de adivinhar e evita que a exposição de uma conta comprometa outras. Senhas previsíveis ou reutilizadas são arriscadas.",
    },
    {
      id: 3,
      enunciado: "O que a autenticação de dois fatores acrescenta à conta?",
      alternativas: [
        "Uma segunda etapa de verificação além da senha",
        "Uma segunda senha igual à primeira",
        "Mais espaço para arquivos",
        "Acesso sem precisar de senha",
      ],
      respostaCorreta: 0,
      explicacao:
        "A autenticação de dois fatores pede uma confirmação adicional além da senha. Ela não cria outra senha igual nem remove a necessidade de autenticação.",
    },
    {
      id: 4,
      enunciado:
        "Você recebeu um link inesperado pedindo sua senha. O que fazer?",
      alternativas: [
        "Abrir o link e preencher os dados",
        "Encaminhar a mensagem para todos os contatos",
        "Não abrir e confirmar a solicitação por um canal oficial",
        "Responder com sua senha para verificar a mensagem",
      ],
      respostaCorreta: 2,
      explicacao:
        "Links inesperados que pedem senha podem ser phishing. Não os abra; confirme a solicitação diretamente por um canal oficial.",
    },
  ],
  3: [
    {
      id: 1,
      enunciado: "Qual programa usamos para abrir páginas da internet?",
      alternativas: [
        "Navegador",
        "Calculadora",
        "Editor de texto",
        "Explorador de arquivos",
      ],
      respostaCorreta: 0,
      explicacao:
        "O navegador abre e exibe páginas da internet. Calculadora, editor de texto e explorador de arquivos têm outras finalidades.",
    },
    {
      id: 2,
      enunciado: "Para que serve um mecanismo de busca?",
      alternativas: [
        "Encontrar páginas e informações usando palavras-chave",
        "Consertar peças do computador",
        "Criar uma senha para o Wi-Fi",
        "Apagar o histórico de todos os sites",
      ],
      respostaCorreta: 0,
      explicacao:
        "Um mecanismo de busca localiza páginas e informações com palavras-chave. Ele não conserta peças nem altera a conexão Wi-Fi.",
    },
    {
      id: 3,
      enunciado: "O que é o endereço URL de um site?",
      alternativas: [
        "O endereço que identifica uma página na web",
        "A memória temporária do computador",
        "A senha da conta de email",
        "Um tipo de arquivo compactado",
      ],
      respostaCorreta: 0,
      explicacao:
        "A URL é o endereço que identifica uma página na web. Memória temporária, senha e arquivo compactado não são endereços de sites.",
    },
    {
      id: 4,
      enunciado:
        "Como avaliar melhor se uma informação encontrada é confiável?",
      alternativas: [
        "Verificar autoria, data e comparar com outras fontes",
        "Confiar apenas no título da página",
        "Compartilhar antes de ler",
        "Escolher sempre o primeiro resultado",
      ],
      respostaCorreta: 0,
      explicacao:
        "Autoria, data e comparação com outras fontes ajudam a avaliar a confiabilidade. Título, posição no resultado ou compartilhamento rápido não garantem que algo seja verdadeiro.",
    },
  ],
  4: [
    {
      id: 1,
      enunciado: "O que é um sistema operacional?",
      alternativas: [
        "O software que administra o computador e seus programas",
        "Um tipo de cabo de energia",
        "Um documento de texto",
        "Uma peça usada para imprimir",
      ],
      respostaCorreta: 0,
      explicacao:
        "O sistema operacional administra o computador e seus programas. Cabos, documentos e peças de impressão não desempenham esse papel.",
    },
    {
      id: 2,
      enunciado: "Qual item costuma mostrar aplicativos abertos e atalhos?",
      alternativas: [
        "Barra de tarefas",
        "Lixeira",
        "Pasta de downloads",
        "Tela de impressão",
      ],
      respostaCorreta: 0,
      explicacao:
        "A barra de tarefas costuma reunir atalhos e mostrar aplicativos abertos. Lixeira, downloads e tela de impressão têm outras funções.",
    },
    {
      id: 3,
      enunciado: "Por que instalar atualizações do sistema operacional?",
      alternativas: [
        "Para receber melhorias e correções de segurança",
        "Para apagar automaticamente todos os documentos",
        "Para substituir o monitor",
        "Para desativar os programas instalados",
      ],
      respostaCorreta: 0,
      explicacao:
        "Atualizações trazem melhorias e correções de segurança. Elas não apagam documentos nem substituem peças do computador.",
    },
    {
      id: 4,
      enunciado: "O que é um aplicativo?",
      alternativas: [
        "Um programa que executa uma tarefa no dispositivo",
        "Uma tomada elétrica",
        "Um cabo que conecta o monitor",
        "Um tipo de memória permanente",
      ],
      respostaCorreta: 0,
      explicacao:
        "Um aplicativo é um programa que executa uma tarefa no dispositivo. Tomada, cabo e memória são elementos físicos com outras funções.",
    },
  ],
  5: [
    {
      id: 1,
      enunciado: "Para que serve uma pasta no computador?",
      alternativas: [
        "Organizar arquivos relacionados",
        "Aumentar o brilho da tela",
        "Conectar à internet",
        "Proteger o computador contra quedas",
      ],
      respostaCorreta: 0,
      explicacao:
        "Pastas agrupam arquivos relacionados para facilitar a organização. Brilho, conexão e proteção física não são funções de uma pasta.",
    },
    {
      id: 2,
      enunciado:
        "O que normalmente indica a extensão de um arquivo, como .pdf?",
      alternativas: [
        "O formato ou tipo do arquivo",
        "O tamanho da tela",
        "A senha usada para abrir o computador",
        "A data em que o computador foi comprado",
      ],
      respostaCorreta: 0,
      explicacao:
        "A extensão geralmente indica o formato do arquivo, como PDF. Ela não informa tamanho da tela, senha ou quando o computador foi comprado.",
    },
    {
      id: 3,
      enunciado: "O que acontece ao mover um arquivo para outra pasta?",
      alternativas: [
        "Ele passa a ficar guardado no novo local",
        "Ele é enviado automaticamente por email",
        "Ele vira uma imagem",
        "Ele é copiado para a internet",
      ],
      respostaCorreta: 0,
      explicacao:
        "Ao mover um arquivo, ele passa a ficar no novo local. Isso não o envia por email, não muda seu formato e não o publica na internet.",
    },
    {
      id: 4,
      enunciado: "Qual nome facilita encontrar um documento depois?",
      alternativas: [
        "Relatorio_vendas_junho",
        "aaaaa",
        "Sem título 27",
        "Documento novo final final",
      ],
      respostaCorreta: 0,
      explicacao:
        "Um nome descritivo identifica melhor o conteúdo do documento. Nomes genéricos ou repetidos tornam mais difícil encontrá-lo depois.",
    },
  ],
  6: [
    {
      id: 1,
      enunciado: "Qual atitude demonstra respeito em uma conversa online?",
      alternativas: [
        "Escrever com clareza e respeito",
        "Compartilhar mensagens privadas sem permissão",
        "Enviar a mesma mensagem repetidamente",
        "Usar letras maiúsculas para gritar",
      ],
      respostaCorreta: 0,
      explicacao:
        "Uma conversa respeitosa usa linguagem clara e não expõe mensagens privadas. Repetir mensagens e escrever em maiúsculas pode incomodar ou parecer agressivo.",
    },
    {
      id: 2,
      enunciado: "Antes de enviar um email, o que é importante conferir?",
      alternativas: [
        "Destinatário, assunto e anexos",
        "A cor do computador",
        "O histórico de navegação de quem recebe",
        "A senha de todos os destinatários",
      ],
      respostaCorreta: 0,
      explicacao:
        "Conferir destinatário, assunto e anexos evita enviar a mensagem ou arquivos errados. Senhas e histórico de navegação de outras pessoas não devem ser solicitados.",
    },
    {
      id: 3,
      enunciado: "O que fazer antes de publicar uma foto de outra pessoa?",
      alternativas: [
        "Pedir autorização",
        "Publicar sem avisar",
        "Adicionar os dados pessoais dela",
        "Enviar para desconhecidos",
      ],
      respostaCorreta: 0,
      explicacao:
        "Pedir autorização respeita a privacidade da pessoa retratada. Publicar sem avisar ou compartilhar dados pessoais pode expô-la sem consentimento.",
    },
    {
      id: 4,
      enunciado:
        "Qual ferramenta é mais adequada para uma conversa rápida com um colega?",
      alternativas: [
        "Um aplicativo de mensagens usado por ambos",
        "Um site público de avaliações",
        "Uma postagem visível para todos",
        "Um arquivo de sistema",
      ],
      respostaCorreta: 0,
      explicacao:
        "Uma ferramenta de mensagens apropriada permite conversar diretamente com o colega. Uma publicação pública expõe a conversa a outras pessoas.",
    },
  ],
  7: [
    {
      id: 1,
      enunciado: "Qual componente executa instruções no computador?",
      alternativas: ["Processador (CPU)", "Monitor", "Teclado", "Impressora"],
      respostaCorreta: 0,
      explicacao:
        "A CPU executa instruções. Monitor, teclado e impressora são dispositivos de saída ou entrada, não o componente que processa as instruções.",
    },
    {
      id: 2,
      enunciado:
        "Uma mensagem pede sua senha por um link inesperado. Qual é a atitude segura?",
      alternativas: [
        "Não abrir e verificar pelo canal oficial",
        "Preencher a senha rapidamente",
        "Repassar o link aos contatos",
        "Enviar também o código de verificação",
      ],
      respostaCorreta: 0,
      explicacao:
        "Um pedido inesperado de senha pode ser phishing. Não abra o link nem compartilhe sua senha ou código; procure o serviço pelo canal oficial.",
    },
    {
      id: 3,
      enunciado: "Qual programa permite visitar sites?",
      alternativas: ["Navegador", "Calculadora", "Bloco de notas", "Lixeira"],
      respostaCorreta: 0,
      explicacao:
        "O navegador é o programa usado para visitar sites. Calculadora, bloco de notas e lixeira não têm essa função.",
    },
    {
      id: 4,
      enunciado: "Qual é uma boa forma de proteger arquivos importantes?",
      alternativas: [
        "Manter uma cópia de segurança",
        "Usar a mesma senha em todos os sites",
        "Apagar as atualizações do sistema",
        "Compartilhar a senha com colegas",
      ],
      respostaCorreta: 0,
      explicacao:
        "Uma cópia de segurança permite recuperar arquivos se os originais forem perdidos. Reutilizar senhas, apagar atualizações ou compartilhá-las não protege os arquivos.",
    },
  ],
};
