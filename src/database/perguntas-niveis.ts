import type { Pergunta } from "@/database/perguntas";

export type NivelAtividade = "iniciante" | "intermediario" | "avancado";

type DadosPergunta = {
  id: number;
  enunciado: string;
  correta: string;
  incorretas: [string, string, string];
  explicacao: string;
};

function criarPergunta(
  nivel: NivelAtividade,
  dados: DadosPergunta,
): Pergunta {
  const deslocamentoNivel =
    nivel === "iniciante" ? 0 : nivel === "intermediario" ? 1 : 2;
  const posicaoCorreta = (dados.id + deslocamentoNivel) % 4;
  const alternativas = [...dados.incorretas];
  alternativas.splice(posicaoCorreta, 0, dados.correta);

  return {
    id: dados.id,
    enunciado: dados.enunciado,
    alternativas,
    respostaCorreta: posicaoCorreta,
    explicacao: dados.explicacao,
  };
}

function criarAtividade(
  nivel: NivelAtividade,
  dados: DadosPergunta[],
): Pergunta[] {
  return dados.map((pergunta) => criarPergunta(nivel, pergunta));
}

export const perguntasPorNivel: Record<
  NivelAtividade,
  Record<number, Pergunta[]>
> = {
  iniciante: {
    1: criarAtividade("iniciante", [
      {
        id: 1,
        enunciado: "Qual peça mostra imagens e textos do computador?",
        correta: "Monitor",
        incorretas: ["Processador", "Memória RAM", "Placa-mãe"],
        explicacao:
          "O monitor é a tela que apresenta visualmente o que o computador está fazendo.",
      },
      {
        id: 2,
        enunciado: "Qual dispositivo usamos para digitar letras?",
        correta: "Teclado",
        incorretas: ["Caixa de som", "Monitor", "Impressora"],
        explicacao:
          "O teclado permite inserir letras, números e comandos no computador.",
      },
      {
        id: 3,
        enunciado: "Qual peça ajuda a mover o cursor na tela?",
        correta: "Mouse",
        incorretas: ["Gabinete", "Impressora", "Caixa de som"],
        explicacao:
          "O mouse controla o cursor e permite selecionar itens na tela.",
      },
      {
        id: 4,
        enunciado: "Onde ficam conectadas várias peças internas do computador?",
        correta: "Placa-mãe",
        incorretas: ["Monitor", "Teclado", "Caixa de som"],
        explicacao:
          "A placa-mãe conecta componentes internos para que eles possam trabalhar juntos.",
      },
    ]),
    2: criarAtividade("iniciante", [
      {
        id: 1,
        enunciado: "O que é uma senha?",
        correta: "Um segredo usado para proteger o acesso a uma conta",
        incorretas: [
          "O nome público de um site",
          "Uma mensagem que todos devem conhecer",
          "Um tipo de arquivo de imagem",
        ],
        explicacao:
          "A senha deve ser conhecida apenas por você e ajuda a impedir acessos não autorizados.",
      },
      {
        id: 2,
        enunciado: "Qual atitude ajuda a manter sua conta segura?",
        correta: "Usar uma senha diferente para cada conta",
        incorretas: [
          "Contar a senha aos colegas",
          "Escrever a senha em uma publicação",
          "Usar 123456 em todos os serviços",
        ],
        explicacao:
          "Senhas diferentes evitam que a exposição de uma conta facilite o acesso às demais.",
      },
      {
        id: 3,
        enunciado: "Uma mensagem desconhecida pede sua senha. O que fazer?",
        correta: "Não enviar a senha e pedir ajuda a alguém de confiança",
        incorretas: [
          "Responder rapidamente com a senha",
          "Enviar também seus dados pessoais",
          "Repassar a mensagem para todos os contatos",
        ],
        explicacao:
          "Não compartilhe sua senha em mensagens. Um pedido inesperado pode ser uma tentativa de golpe.",
      },
      {
        id: 4,
        enunciado: "Por que não devemos abrir todo link que recebemos?",
        correta: "Alguns links podem levar a golpes ou páginas falsas",
        incorretas: [
          "Links sempre desligam o computador",
          "Todo link apaga as fotos",
          "Links só funcionam para adultos",
        ],
        explicacao:
          "Links suspeitos podem levar a páginas falsas. Confira quem enviou e peça ajuda se não tiver certeza.",
      },
    ]),
    3: criarAtividade("iniciante", [
      {
        id: 1,
        enunciado: "O que usamos para abrir páginas de sites?",
        correta: "Um navegador",
        incorretas: ["Uma calculadora", "Uma pasta", "Um teclado"],
        explicacao:
          "Navegadores são programas usados para visitar páginas na internet.",
      },
      {
        id: 2,
        enunciado: "Para que serve a internet?",
        correta: "Para conectar dispositivos e acessar informações e serviços",
        incorretas: [
          "Somente para imprimir documentos",
          "Para substituir todas as peças do computador",
          "Apenas para guardar senhas",
        ],
        explicacao:
          "A internet conecta dispositivos e permite acessar páginas, serviços e conteúdos.",
      },
      {
        id: 3,
        enunciado: "O que fazer antes de acreditar em uma informação online?",
        correta: "Conversar com alguém de confiança e verificar a fonte",
        incorretas: [
          "Acreditar só porque apareceu na tela",
          "Compartilhar sem ler",
          "Confiar sempre na primeira imagem",
        ],
        explicacao:
          "Verificar a origem da informação ajuda a evitar boatos e conteúdos enganosos.",
      },
      {
        id: 4,
        enunciado: "Qual item é usado para encontrar páginas sobre um assunto?",
        correta: "Uma busca com palavras sobre o assunto",
        incorretas: [
          "A lixeira do computador",
          "O botão de volume",
          "Uma senha de Wi-Fi",
        ],
        explicacao:
          "Palavras relacionadas ao assunto ajudam um mecanismo de busca a encontrar páginas relevantes.",
      },
    ]),
    4: criarAtividade("iniciante", [
      {
        id: 1,
        enunciado: "O que é um sistema operacional?",
        correta: "O programa principal que ajuda o dispositivo a funcionar",
        incorretas: [
          "Uma peça usada para imprimir",
          "Um tipo de senha",
          "Um cabo de internet",
        ],
        explicacao:
          "O sistema operacional administra o dispositivo e permite usar programas e arquivos.",
      },
      {
        id: 2,
        enunciado: "O que é um aplicativo?",
        correta: "Um programa que realiza uma tarefa",
        incorretas: [
          "Uma tomada",
          "Uma peça de plástico do monitor",
          "Um tipo de conexão elétrica",
        ],
        explicacao:
          "Aplicativos são programas usados para tarefas como escrever, desenhar ou conversar.",
      },
      {
        id: 3,
        enunciado: "Para que serve o ícone de uma lixeira no computador?",
        correta: "Para guardar temporariamente itens excluídos",
        incorretas: [
          "Para aumentar o tamanho da tela",
          "Para conectar o teclado",
          "Para abrir a internet",
        ],
        explicacao:
          "A lixeira reúne itens excluídos antes que sejam removidos permanentemente.",
      },
      {
        id: 4,
        enunciado: "O que é uma atualização do sistema?",
        correta: "Uma melhoria ou correção para o dispositivo",
        incorretas: [
          "Uma limpeza física do teclado",
          "Uma nova senha de email",
          "Uma troca automática do monitor",
        ],
        explicacao:
          "Atualizações podem corrigir problemas e melhorar o funcionamento do sistema.",
      },
    ]),
    5: criarAtividade("iniciante", [
      {
        id: 1,
        enunciado: "Para que serve uma pasta no computador?",
        correta: "Para organizar arquivos",
        incorretas: [
          "Para aumentar o brilho",
          "Para carregar a bateria",
          "Para abrir o teclado",
        ],
        explicacao:
          "Pastas ajudam a agrupar documentos e encontrá-los com mais facilidade.",
      },
      {
        id: 2,
        enunciado: "Qual nome ajuda a reconhecer uma foto depois?",
        correta: "Aniversario_da_Maria",
        incorretas: ["aaa", "Novo2", "Sem nome"],
        explicacao:
          "Um nome que descreve o conteúdo ajuda a identificar o arquivo depois.",
      },
      {
        id: 3,
        enunciado: "O que acontece quando você abre um arquivo?",
        correta: "O dispositivo mostra ou executa o conteúdo dele",
        incorretas: [
          "O arquivo vira uma pasta automaticamente",
          "O computador é desligado",
          "Todos os arquivos são apagados",
        ],
        explicacao:
          "Ao abrir um arquivo, o dispositivo exibe seu conteúdo ou inicia o programa correspondente.",
      },
      {
        id: 4,
        enunciado: "Onde é mais fácil encontrar documentos escolares?",
        correta: "Em uma pasta criada para documentos escolares",
        incorretas: [
          "Misturados com todos os outros arquivos",
          "Na lista de contatos",
          "Dentro do controle de volume",
        ],
        explicacao:
          "Separar arquivos por assunto em pastas torna a organização mais simples.",
      },
    ]),
    6: criarAtividade("iniciante", [
      {
        id: 1,
        enunciado: "Como devemos falar com outras pessoas na internet?",
        correta: "Com respeito e educação",
        incorretas: [
          "Com ofensas",
          "Compartilhando segredos de outras pessoas",
          "Enviando mensagens sem parar",
        ],
        explicacao:
          "O respeito também é importante nas conversas digitais.",
      },
      {
        id: 2,
        enunciado: "Antes de enviar uma mensagem, o que devemos conferir?",
        correta: "Para quem estamos enviando",
        incorretas: [
          "A senha da pessoa",
          "A cor do teclado dela",
          "O histórico de navegação dela",
        ],
        explicacao:
          "Conferir o destinatário ajuda a evitar que a mensagem chegue à pessoa errada.",
      },
      {
        id: 3,
        enunciado: "Posso publicar a foto de outra pessoa sem perguntar?",
        correta: "Não, devo pedir autorização",
        incorretas: [
          "Sim, qualquer foto pode ser publicada",
          "Sim, se eu escrever o nome dela",
          "Só se a foto for engraçada",
        ],
        explicacao:
          "Pedir autorização respeita a privacidade da pessoa retratada.",
      },
      {
        id: 4,
        enunciado: "O que fazer se uma conversa online deixar você desconfortável?",
        correta: "Parar de responder e contar a alguém de confiança",
        incorretas: [
          "Enviar seu endereço",
          "Marcar um encontro com desconhecidos",
          "Compartilhar sua senha",
        ],
        explicacao:
          "Você pode interromper a conversa e pedir ajuda a uma pessoa de confiança.",
      },
    ]),
    7: criarAtividade("iniciante", [
      {
        id: 1,
        enunciado: "Qual equipamento usamos para ouvir sons do computador?",
        correta: "Caixa de som ou fones de ouvido",
        incorretas: ["Mouse", "Placa-mãe", "Pasta"],
        explicacao:
          "Caixas de som e fones reproduzem áudio; mouse, placa-mãe e pastas têm outras funções.",
      },
      {
        id: 2,
        enunciado: "O que você deve fazer com uma senha?",
        correta: "Mantê-la em segredo",
        incorretas: [
          "Publicá-la na internet",
          "Contá-la para qualquer pessoa",
          "Usar seu nome como senha em todos os sites",
        ],
        explicacao:
          "Manter a senha em segredo ajuda a proteger suas contas.",
      },
      {
        id: 3,
        enunciado: "Qual programa ajuda a visitar um site?",
        correta: "Navegador",
        incorretas: ["Calculadora", "Lixeira", "Bloco de desenho"],
        explicacao:
          "O navegador é o programa usado para acessar páginas da internet.",
      },
      {
        id: 4,
        enunciado: "Qual é uma boa forma de organizar trabalhos?",
        correta: "Guardar cada trabalho em uma pasta com nome claro",
        incorretas: [
          "Apagar todos os nomes dos arquivos",
          "Guardar tudo na lixeira",
          "Enviar todos os arquivos a desconhecidos",
        ],
        explicacao:
          "Pastas e nomes claros facilitam guardar e encontrar seus trabalhos.",
      },
    ]),
  },
  intermediario: {
    1: criarAtividade("intermediario", [
      {
        id: 1,
        enunciado: "O que acontece com os dados guardados na RAM ao desligar o PC?",
        correta: "Os dados temporários são perdidos",
        incorretas: [
          "Viraram arquivos permanentes",
          "São enviados automaticamente à internet",
          "Passam para o monitor",
        ],
        explicacao:
          "A RAM é memória temporária; arquivos que precisam permanecer devem ser salvos em uma unidade de armazenamento.",
      },
      {
        id: 2,
        enunciado: "Qual componente executa as instruções de um programa?",
        correta: "Processador (CPU)",
        incorretas: ["SSD", "Monitor", "Fonte de alimentação"],
        explicacao:
          "A CPU interpreta e executa instruções; SSD, monitor e fonte têm funções diferentes.",
      },
      {
        id: 3,
        enunciado: "Por que a placa-mãe é importante?",
        correta: "Conecta componentes para que se comuniquem",
        incorretas: [
          "Armazena sozinha todos os arquivos",
          "Exibe as imagens",
          "Substitui o sistema operacional",
        ],
        explicacao:
          "A placa-mãe interliga os componentes do computador.",
      },
      {
        id: 4,
        enunciado: "Qual diferença básica entre RAM e SSD?",
        correta: "RAM é temporária; SSD mantém dados salvos",
        incorretas: [
          "RAM é uma tela; SSD é um teclado",
          "Ambas são apenas conexões de internet",
          "SSD perde todos os arquivos ao desligar",
        ],
        explicacao:
          "A RAM mantém dados em uso temporariamente, enquanto o SSD armazena arquivos de forma persistente.",
      },
    ]),
    2: criarAtividade("intermediario", [
      {
        id: 1,
        enunciado: "Por que é arriscado reutilizar a mesma senha em vários sites?",
        correta: "Um vazamento pode dar acesso a várias contas",
        incorretas: [
          "A senha deixa de funcionar sem internet",
          "O computador apaga os arquivos",
          "O teclado passa a digitar mais devagar",
        ],
        explicacao:
          "Uma senha exclusiva limita o impacto caso um serviço tenha seus dados expostos.",
      },
      {
        id: 2,
        enunciado: "Qual é a finalidade da autenticação de dois fatores?",
        correta: "Adicionar uma verificação além da senha",
        incorretas: [
          "Criar duas contas iguais",
          "Remover toda necessidade de proteger a conta",
          "Aumentar o espaço de armazenamento",
        ],
        explicacao:
          "A segunda etapa torna mais difícil acessar uma conta apenas com a senha.",
      },
      {
        id: 3,
        enunciado: "Uma mensagem urgente pede seu código de acesso. Qual é a melhor atitude?",
        correta: "Não compartilhar o código e verificar pelo canal oficial",
        incorretas: [
          "Enviar o código para evitar bloqueio",
          "Publicar o código para confirmar sua identidade",
          "Responder com a senha também",
        ],
        explicacao:
          "Códigos de autenticação são secretos. Confirme pedidos inesperados diretamente com o serviço oficial.",
      },
      {
        id: 4,
        enunciado: "Como reconhecer uma tentativa de phishing?",
        correta: "Observar pedidos inesperados, urgência e links suspeitos",
        incorretas: [
          "Toda mensagem com logotipo é verdadeira",
          "Phishing só acontece por telefone",
          "Mensagens urgentes são sempre oficiais",
        ],
        explicacao:
          "Golpistas imitam serviços conhecidos; examine o remetente e o endereço antes de agir.",
      },
    ]),
    3: criarAtividade("intermediario", [
      {
        id: 1,
        enunciado: "Qual a diferença entre navegador e mecanismo de busca?",
        correta: "O navegador abre sites; a busca localiza páginas",
        incorretas: [
          "São nomes diferentes para o teclado",
          "A busca abre arquivos locais; o navegador imprime",
          "O navegador é uma senha e a busca é uma pasta",
        ],
        explicacao:
          "O navegador é um aplicativo; o mecanismo de busca é um serviço para localizar conteúdo na web.",
      },
      {
        id: 2,
        enunciado: "O que uma URL identifica?",
        correta: "O endereço de um recurso ou página na web",
        incorretas: [
          "A memória disponível no computador",
          "A senha da rede sem fio",
          "O modelo do processador",
        ],
        explicacao:
          "A URL indica onde encontrar um recurso na web.",
      },
      {
        id: 3,
        enunciado: "Por que comparar mais de uma fonte ao pesquisar?",
        correta: "Para conferir informações e reduzir erros ou vieses",
        incorretas: [
          "Para garantir que todos os sites tenham o mesmo título",
          "Para evitar ler o conteúdo",
          "Porque o primeiro resultado nunca funciona",
        ],
        explicacao:
          "Fontes independentes ajudam a confirmar fatos e perceber informações incompletas ou incorretas.",
      },
      {
        id: 4,
        enunciado: "Qual busca tende a encontrar resultados mais úteis?",
        correta: "Usar palavras-chave específicas sobre o tema",
        incorretas: [
          "Pesquisar uma sequência aleatória de símbolos",
          "Digitar somente 'coisa'",
          "Pesquisar a senha de outra pessoa",
        ],
        explicacao:
          "Termos específicos ajudam a busca a encontrar páginas relacionadas ao que você precisa.",
      },
    ]),
    4: criarAtividade("intermediario", [
      {
        id: 1,
        enunciado: "Qual tarefa cabe ao sistema operacional?",
        correta: "Gerenciar recursos e permitir executar aplicativos",
        incorretas: [
          "Fabricar peças físicas",
          "Substituir a conexão elétrica",
          "Criar automaticamente todos os documentos",
        ],
        explicacao:
          "O sistema operacional coordena recursos do dispositivo e oferece serviços aos aplicativos.",
      },
      {
        id: 2,
        enunciado: "O que costuma aparecer na barra de tarefas?",
        correta: "Atalhos e indicação de aplicativos abertos",
        incorretas: [
          "Somente arquivos apagados",
          "A senha do usuário",
          "A lista de peças dentro do gabinete",
        ],
        explicacao:
          "A barra de tarefas facilita abrir aplicativos e alternar entre janelas.",
      },
      {
        id: 3,
        enunciado: "Por que instalar atualizações do sistema?",
        correta: "Para obter correções, melhorias e proteções recentes",
        incorretas: [
          "Para apagar todos os programas",
          "Para aumentar fisicamente a memória",
          "Para remover a necessidade de senhas",
        ],
        explicacao:
          "Atualizações corrigem falhas e podem melhorar segurança e estabilidade.",
      },
      {
        id: 4,
        enunciado: "Um aplicativo parou de responder. Qual ação é razoável primeiro?",
        correta: "Aguardar um pouco e, se persistir, fechar e reabrir o aplicativo",
        incorretas: [
          "Apagar todos os arquivos do computador",
          "Desconectar permanentemente o monitor",
          "Compartilhar a senha com o aplicativo",
        ],
        explicacao:
          "Tente recuperar ou reiniciar apenas o aplicativo com problema, sem fazer alterações desnecessárias no sistema.",
      },
    ]),
    5: criarAtividade("intermediario", [
      {
        id: 1,
        enunciado: "O que a extensão .pdf geralmente informa?",
        correta: "O formato do arquivo",
        incorretas: [
          "A senha do documento",
          "O tamanho da tela",
          "A pasta onde o arquivo está",
        ],
        explicacao:
          "A extensão ajuda a identificar o formato e os programas que podem abrir o arquivo.",
      },
      {
        id: 2,
        enunciado: "O que diferencia copiar de mover um arquivo?",
        correta: "Copiar mantém o original; mover muda sua localização",
        incorretas: [
          "Copiar apaga o arquivo e mover o envia por email",
          "Mover sempre cria duas cópias",
          "Não existe diferença",
        ],
        explicacao:
          "Copiar cria outra instância; mover transfere o arquivo para outro local.",
      },
      {
        id: 3,
        enunciado: "Qual estrutura ajuda a separar documentos de diferentes projetos?",
        correta: "Pastas organizadas por projeto",
        incorretas: [
          "Um único arquivo sem nome",
          "A lista de contatos",
          "A barra de volume",
        ],
        explicacao:
          "Pastas por projeto agrupam documentos relacionados e facilitam sua localização.",
      },
      {
        id: 4,
        enunciado: "Qual nome é mais útil para identificar um relatório?",
        correta: "Relatorio_estoque_marco",
        incorretas: ["arquivo1", "novo_final", "xyz"],
        explicacao:
          "Um nome que descreve o conteúdo e o período é mais fácil de reconhecer.",
      },
    ]),
    6: criarAtividade("intermediario", [
      {
        id: 1,
        enunciado: "O que conferir antes de enviar um email com anexo?",
        correta: "Destinatário, assunto e arquivo anexado",
        incorretas: [
          "A senha do destinatário",
          "O histórico de navegação da pessoa",
          "A marca do computador que ela usa",
        ],
        explicacao:
          "Conferir esses elementos evita expor dados ou enviar arquivos por engano.",
      },
      {
        id: 2,
        enunciado: "Como agir ao receber uma mensagem ofensiva em um grupo?",
        correta: "Não aumentar o conflito e procurar apoio ou moderação",
        incorretas: [
          "Divulgar dados pessoais do remetente",
          "Responder com ameaças",
          "Repassar a mensagem para humilhar alguém",
        ],
        explicacao:
          "Evitar retaliação e procurar apoio ajuda a interromper o comportamento prejudicial.",
      },
      {
        id: 3,
        enunciado: "Por que pedir consentimento antes de compartilhar uma foto?",
        correta: "Para respeitar a privacidade e a escolha da pessoa",
        incorretas: [
          "Para melhorar a resolução da foto",
          "Porque isso muda o formato do arquivo",
          "Para permitir que qualquer pessoa edite a imagem",
        ],
        explicacao:
          "A pessoa deve poder decidir se sua imagem será compartilhada.",
      },
      {
        id: 4,
        enunciado: "Qual canal é mais adequado para enviar dados pessoais?",
        correta: "Um canal privado e confiável, apenas a quem precisa recebê-los",
        incorretas: [
          "Uma publicação pública",
          "Um grupo com pessoas desconhecidas",
          "Qualquer link recebido por mensagem",
        ],
        explicacao:
          "Compartilhe dados pessoais somente com o destinatário necessário por um canal confiável.",
      },
    ]),
    7: criarAtividade("intermediario", [
      {
        id: 1,
        enunciado: "Qual componente mantém arquivos depois que o computador é desligado?",
        correta: "SSD ou HD",
        incorretas: ["Memória RAM", "Processador", "Monitor"],
        explicacao:
          "SSD e HD guardam dados de forma persistente; a RAM é temporária.",
      },
      {
        id: 2,
        enunciado: "Que pista pode indicar que um email é uma tentativa de phishing?",
        correta: "Um link inesperado junto com pedido urgente de senha",
        incorretas: [
          "Uma mensagem esperada de um contato conhecido",
          "O uso de uma saudação educada",
          "Um aviso que você confirmou no site oficial",
        ],
        explicacao:
          "Urgência, links inesperados e pedidos de credenciais são sinais para verificar a mensagem com cuidado.",
      },
      {
        id: 3,
        enunciado: "Qual é uma boa prática ao pesquisar um tema para um trabalho?",
        correta: "Comparar fontes e registrar de onde vieram as informações",
        incorretas: [
          "Copiar o primeiro parágrafo encontrado sem conferir",
          "Usar apenas o título dos resultados",
          "Ignorar a data e a autoria",
        ],
        explicacao:
          "Comparar fontes e registrar referências ajuda a avaliar e apresentar informações com responsabilidade.",
      },
      {
        id: 4,
        enunciado: "Como organizar arquivos de um projeto escolar?",
        correta: "Criar uma pasta do projeto e usar nomes descritivos",
        incorretas: [
          "Guardar tudo na lixeira",
          "Renomear todos os arquivos para 'novo'",
          "Enviar os arquivos para um grupo público",
        ],
        explicacao:
          "Uma pasta própria e nomes claros tornam os arquivos mais fáceis de encontrar e compartilhar com segurança.",
      },
    ]),
  },
  avancado: {
    1: criarAtividade("avancado", [
      {
        id: 1,
        enunciado: "Por que a CPU usa memória cache?",
        correta: "Para acessar rapidamente dados usados com frequência",
        incorretas: [
          "Para substituir permanentemente o SSD",
          "Para converter corrente alternada em contínua",
          "Para exibir diretamente imagens ao usuário",
        ],
        explicacao:
          "A cache é uma memória pequena e rápida que reduz o tempo de acesso a dados frequentes.",
      },
      {
        id: 2,
        enunciado: "O que tende a acontecer se a memória RAM for insuficiente?",
        correta: "O sistema pode recorrer ao armazenamento, geralmente ficando mais lento",
        incorretas: [
          "A CPU deixa de precisar executar instruções",
          "O monitor passa a armazenar os arquivos",
          "A conexão de rede aumenta a RAM física",
        ],
        explicacao:
          "Quando falta RAM, o sistema pode usar memória virtual no armazenamento, que costuma ser mais lenta.",
      },
      {
        id: 3,
        enunciado: "Qual afirmação descreve melhor a função da placa-mãe?",
        correta: "Distribui conexões e permite comunicação entre componentes",
        incorretas: [
          "Executa sozinha todos os programas",
          "Guarda todos os dados sem energia",
          "É responsável exclusivamente pela conexão Wi-Fi",
        ],
        explicacao:
          "A placa-mãe fornece interfaces e caminhos de comunicação entre CPU, memória, armazenamento e outros dispositivos.",
      },
      {
        id: 4,
        enunciado: "Qual propriedade diferencia memória volátil de armazenamento persistente?",
        correta: "Memória volátil perde os dados sem energia; armazenamento persistente os mantém",
        incorretas: [
          "Memória volátil sempre é externa",
          "Armazenamento persistente só funciona conectado à internet",
          "Não há diferença entre elas",
        ],
        explicacao:
          "A RAM é volátil; SSDs e HDs mantêm os dados mesmo quando o computador está desligado.",
      },
    ]),
    2: criarAtividade("avancado", [
      {
        id: 1,
        enunciado: "Qual é uma vantagem importante de uma chave de acesso (passkey)?",
        correta: "Pode reduzir riscos de phishing usando autenticação vinculada ao serviço",
        incorretas: [
          "É uma senha que deve ser publicada para recuperação",
          "Desativa todas as atualizações de segurança",
          "Garante proteção mesmo se o dispositivo estiver comprometido",
        ],
        explicacao:
          "Passkeys usam criptografia e são vinculadas ao site ou aplicativo, dificultando o uso em páginas falsas.",
      },
      {
        id: 2,
        enunciado: "Qual princípio deve orientar a concessão de permissões a um aplicativo?",
        correta: "Conceder apenas o acesso necessário à sua função",
        incorretas: [
          "Permitir todos os acessos sem verificar",
          "Compartilhar a conta administrativa com qualquer aplicativo",
          "Desativar a autenticação para facilitar o uso",
        ],
        explicacao:
          "O princípio do menor privilégio limita os danos caso um aplicativo seja vulnerável ou abusado.",
      },
      {
        id: 3,
        enunciado: "Por que códigos de autenticação temporários não devem ser compartilhados?",
        correta: "Eles podem permitir que outra pessoa conclua o acesso à conta",
        incorretas: [
          "Eles aumentam a velocidade da internet",
          "Eles são números públicos sem efeito na segurança",
          "Eles substituem automaticamente todas as senhas",
        ],
        explicacao:
          "Um código temporário é um fator de autenticação; compartilhá-lo pode permitir uma invasão em andamento.",
      },
      {
        id: 4,
        enunciado: "O que fazer se suspeitar que uma senha foi exposta?",
        correta: "Alterá-la no serviço oficial e revisar sessões e fatores de recuperação",
        incorretas: [
          "Usar a mesma senha em mais serviços",
          "Responder a qualquer mensagem que prometa recuperar a conta",
          "Publicar a senha para avisar os contatos",
        ],
        explicacao:
          "Troque a senha por um canal oficial, encerre sessões desconhecidas e confira opções de recuperação.",
      },
    ]),
    3: criarAtividade("avancado", [
      {
        id: 1,
        enunciado: "O que o DNS faz quando você acessa um domínio?",
        correta: "Ajuda a localizar o endereço IP associado ao domínio",
        incorretas: [
          "Criptografa automaticamente todos os arquivos do dispositivo",
          "Armazena a senha do navegador",
          "Substitui o roteador na rede local",
        ],
        explicacao:
          "O DNS resolve nomes de domínio para registros, como endereços IP, que ajudam a localizar serviços.",
      },
      {
        id: 2,
        enunciado: "O que indica o cadeado HTTPS no navegador?",
        correta: "A conexão com o site usa TLS; não garante que o site seja honesto",
        incorretas: [
          "O site foi aprovado por todas as autoridades",
          "O conteúdo do site é necessariamente verdadeiro",
          "O dispositivo está livre de qualquer malware",
        ],
        explicacao:
          "HTTPS protege a conexão e autentica o domínio apresentado no certificado, mas não garante a confiabilidade do conteúdo.",
      },
      {
        id: 3,
        enunciado: "Qual prática melhora a qualidade de uma pesquisa online?",
        correta: "Verificar autoria, evidências, data e independência das fontes",
        incorretas: [
          "Confiar apenas no número de compartilhamentos",
          "Usar somente resultados patrocinados",
          "Ignorar fontes que apresentem evidências diferentes",
        ],
        explicacao:
          "Avaliar evidências, contexto, autoria e confirmação independente ajuda a identificar informação fraca ou enviesada.",
      },
      {
        id: 4,
        enunciado: "O que caracteriza uma consulta de busca bem delimitada?",
        correta: "Termos específicos e contexto relevante, sem dados pessoais desnecessários",
        incorretas: [
          "Incluir senhas para personalizar os resultados",
          "Usar apenas palavras genéricas sem relação com o tema",
          "Pesquisar informações privadas de terceiros",
        ],
        explicacao:
          "Termos específicos melhoram os resultados; dados pessoais e segredos não devem ser incluídos na consulta.",
      },
    ]),
    4: criarAtividade("avancado", [
      {
        id: 1,
        enunciado: "Qual é a função central do kernel de um sistema operacional?",
        correta: "Gerenciar recursos de baixo nível e intermediar hardware e processos",
        incorretas: [
          "Editar documentos do usuário",
          "Substituir todos os aplicativos",
          "Fornecer conexão com a internet sem hardware",
        ],
        explicacao:
          "O kernel administra recursos como CPU, memória e dispositivos, oferecendo serviços aos processos.",
      },
      {
        id: 2,
        enunciado: "Por que executar tarefas diárias com uma conta sem privilégios administrativos?",
        correta: "Reduz o impacto de erros e de programas maliciosos",
        incorretas: [
          "Aumenta automaticamente a capacidade do SSD",
          "Impede a instalação de todas as atualizações",
          "Torna desnecessário fazer backup",
        ],
        explicacao:
          "Menos privilégios limitam as alterações que um processo ou atacante pode fazer no sistema.",
      },
      {
        id: 3,
        enunciado: "O que uma atualização de segurança normalmente corrige?",
        correta: "Vulnerabilidades conhecidas e outros defeitos do software",
        incorretas: [
          "Danos físicos no monitor",
          "A velocidade contratada da internet",
          "Arquivos removidos sem cópia",
        ],
        explicacao:
          "Atualizações de segurança corrigem falhas de software; não resolvem danos físicos nem substituem backups.",
      },
      {
        id: 4,
        enunciado: "Qual é o papel de um gerenciador de pacotes?",
        correta: "Instalar, atualizar e controlar dependências de software",
        incorretas: [
          "Gerenciar a carga elétrica da bateria",
          "Armazenar cópias de fotos automaticamente",
          "Controlar o movimento do cursor",
        ],
        explicacao:
          "Gerenciadores de pacotes automatizam a instalação e atualização de programas e suas dependências.",
      },
    ]),
    5: criarAtividade("avancado", [
      {
        id: 1,
        enunciado: "Por que a extensão de um arquivo não é prova de seu conteúdo real?",
        correta: "O nome pode ser alterado sem converter o formato do arquivo",
        incorretas: [
          "Extensões são sempre geradas pela internet",
          "O sistema operacional ignora os dados do arquivo",
          "Toda extensão identifica quem criou o arquivo",
        ],
        explicacao:
          "Renomear a extensão não converte o conteúdo; verifique a origem e use programas confiáveis.",
      },
      {
        id: 2,
        enunciado: "O que é importante verificar antes de abrir um arquivo recebido?",
        correta: "Origem, contexto e se o tipo de arquivo era esperado",
        incorretas: [
          "Somente a cor do ícone",
          "Se o nome contém a palavra 'seguro'",
          "Se o arquivo pede que você desative o antivírus",
        ],
        explicacao:
          "Arquivos inesperados podem ser maliciosos; confirme com o remetente por um canal conhecido.",
      },
      {
        id: 3,
        enunciado: "Qual é uma estratégia adequada para cópias de segurança?",
        correta: "Manter cópias separadas e testar periodicamente a restauração",
        incorretas: [
          "Manter a única cópia no mesmo disco do original",
          "Fazer backup apenas depois de perder os arquivos",
          "Deixar a cópia sempre acessível a qualquer usuário",
        ],
        explicacao:
          "Cópias separadas e restaurações testadas ajudam a recuperar dados após falhas, exclusões ou ataques.",
      },
      {
        id: 4,
        enunciado: "Por que usar nomes e pastas consistentes em um projeto?",
        correta: "Facilita localizar versões, identificar conteúdo e colaborar",
        incorretas: [
          "Aumenta automaticamente a resolução dos arquivos",
          "Impede qualquer erro de hardware",
          "Substitui a necessidade de cópias de segurança",
        ],
        explicacao:
          "Uma estrutura previsível reduz confusão e facilita colaboração, mas não substitui backups.",
      },
    ]),
    6: criarAtividade("avancado", [
      {
        id: 1,
        enunciado: "Qual é o risco de usar 'Responder a todos' sem revisar os destinatários?",
        correta: "Expor a mensagem e anexos a pessoas que não precisam recebê-los",
        incorretas: [
          "Apagar automaticamente o email do remetente",
          "Criptografar o anexo para todos os destinatários",
          "Alterar a senha de todas as contas",
        ],
        explicacao:
          "A revisão de destinatários previne exposição desnecessária de informação e erros de comunicação.",
      },
      {
        id: 2,
        enunciado: "O que significa minimizar dados ao compartilhar informações?",
        correta: "Enviar apenas os dados necessários aos destinatários autorizados",
        incorretas: [
          "Publicar todos os dados para facilitar o acesso",
          "Enviar senhas junto com os arquivos",
          "Manter cópias públicas de todas as mensagens",
        ],
        explicacao:
          "Compartilhar somente o necessário reduz exposição e respeita a privacidade.",
      },
      {
        id: 3,
        enunciado: "Como reduzir o risco de engenharia social em uma solicitação urgente?",
        correta: "Confirmar a solicitação por um canal independente e conhecido",
        incorretas: [
          "Usar o número de retorno fornecido na própria mensagem suspeita",
          "Enviar credenciais para provar identidade",
          "Ignorar os procedimentos porque há urgência",
        ],
        explicacao:
          "Um canal independente ajuda a confirmar a identidade sem depender dos dados fornecidos pelo possível impostor.",
      },
      {
        id: 4,
        enunciado: "Qual critério ajuda a escolher um canal para informação sensível?",
        correta: "Acesso restrito, destinatário verificado e proteção adequada",
        incorretas: [
          "Maior número possível de participantes",
          "Link público fácil de compartilhar",
          "Ausência de qualquer controle de acesso",
        ],
        explicacao:
          "Informações sensíveis devem ser enviadas por canais adequados e apenas a destinatários autorizados.",
      },
    ]),
    7: criarAtividade("avancado", [
      {
        id: 1,
        enunciado: "Um computador está lento com muitos programas abertos. Qual hipótese sobre a RAM é plausível?",
        correta: "A pressão de memória pode levar o sistema a usar armazenamento mais lento",
        incorretas: [
          "A RAM transforma o monitor em processador",
          "A lentidão comprova que o DNS foi alterado",
          "O sistema deixa de usar a CPU",
        ],
        explicacao:
          "Sob pressão de memória, o sistema pode mover dados para armazenamento, aumentando a latência.",
      },
      {
        id: 2,
        enunciado: "Uma página usa HTTPS, mas pede credenciais por uma mensagem suspeita. O que concluir?",
        correta: "A conexão pode ser criptografada, mas ainda é preciso verificar se o site é legítimo",
        incorretas: [
          "HTTPS prova que o pedido é legítimo",
          "O cadeado garante que não há phishing",
          "A criptografia confirma que o conteúdo é verdadeiro",
        ],
        explicacao:
          "HTTPS protege o transporte; não garante a intenção do operador do site nem a legitimidade de mensagens recebidas.",
      },
      {
        id: 3,
        enunciado: "Qual elemento torna uma cópia de segurança mais útil contra ransomware?",
        correta: "Manter uma cópia isolada ou protegida contra alteração e testar a restauração",
        incorretas: [
          "Guardar a única cópia na mesma pasta sincronizada",
          "Permitir acesso de gravação a qualquer aplicativo",
          "Nunca verificar se os arquivos podem ser restaurados",
        ],
        explicacao:
          "Cópias isoladas ou protegidas reduzem a chance de serem criptografadas junto com os arquivos originais.",
      },
      {
        id: 4,
        enunciado: "Uma solicitação de transferência chega por email e parece vir de um gestor. Qual é a resposta mais segura?",
        correta: "Confirmar a solicitação por um canal independente antes de agir",
        incorretas: [
          "Responder com dados de acesso para confirmar identidade",
          "Usar somente o telefone citado no email",
          "Ignorar as regras porque a mensagem parece urgente",
        ],
        explicacao:
          "Imitações de pessoas conhecidas são comuns em engenharia social; confirme por um contato confiável já conhecido.",
      },
    ]),
  },
};
