import type { NivelAtividade } from "@/database/perguntas-niveis";

export type ConteudoAtividade = {
  id: number;
  titulo: string;
  descricao: string;
  introducao: string;
  topicos: { titulo: string; texto: string }[];
};

export const conteudosPorNivel: Record<
  NivelAtividade,
  Record<number, ConteudoAtividade>
> = {
  iniciante: {
    1: {
      id: 1,
      titulo: "Conhecendo o hardware",
      descricao:
        "Conheça as partes físicas do computador, para que servem e como trabalhar com os componentes com cuidado.",
      introducao:
        "Hardware é tudo o que você pode ver e tocar em um computador. As peças trabalham em conjunto: algumas recebem informações, outras processam e armazenam dados, e outras mostram o resultado.",
      topicos: [
        {
          titulo: "Entrada e saída",
          texto:
            "Teclado e mouse são dispositivos de entrada: ajudam você a dar comandos e inserir informações. O monitor e as caixas de som são de saída, pois mostram imagens e reproduzem sons.",
        },
        {
          titulo: "O que existe dentro do computador",
          texto:
            "O processador executa instruções, a memória RAM mantém temporariamente o que está em uso e a placa-mãe conecta as peças. SSD e HD guardam arquivos mesmo quando o computador está desligado.",
        },
        {
          titulo: "Cuidados com o equipamento",
          texto:
            "Mantenha líquidos longe do computador, evite puxar cabos e peça ajuda antes de abrir o gabinete. Cada peça tem uma função e deve ser manuseada com cuidado.",
        },
      ],
    },
    2: {
      id: 2,
      titulo: "Protegendo suas contas",
      descricao:
        "Aprenda hábitos simples para manter senhas e contas protegidas e reconhecer pedidos que podem ser perigosos.",
      introducao:
        "Uma conta digital pode guardar conversas, fotos e informações pessoais. Proteger o acesso começa com escolhas cuidadosas e com a atenção a mensagens inesperadas.",
      topicos: [
        {
          titulo: "Senhas são segredos",
          texto:
            "Use uma senha que outras pessoas não consigam adivinhar e não a compartilhe em conversas, jogos ou publicações. Se precisar de ajuda, fale com um adulto de confiança sem revelar a senha a desconhecidos.",
        },
        {
          titulo: "Uma conta, uma senha",
          texto:
            "Evite usar a mesma senha em todos os serviços. Se alguém descobrir uma delas, senhas diferentes ajudam a proteger suas outras contas.",
        },
        {
          titulo: "Links e mensagens",
          texto:
            "Desconfie de mensagens que pedem senha, código ou dizem que você precisa agir imediatamente. Não abra links duvidosos; procure o aplicativo ou site oficial com ajuda de alguém de confiança.",
        },
      ],
    },
    3: {
      id: 3,
      titulo: "Navegando pela internet",
      descricao:
        "Descubra como visitar sites, fazer buscas simples e conversar com alguém de confiança sobre o que encontra online.",
      introducao:
        "A internet conecta computadores e outros dispositivos, permitindo visitar páginas, assistir a vídeos e encontrar informações. Navegar bem também significa parar e pensar antes de confiar em algo.",
      topicos: [
        {
          titulo: "Navegadores e sites",
          texto:
            "Um navegador é o aplicativo usado para abrir páginas da internet. Cada site tem um endereço; confira se está no site que pretendia visitar antes de digitar informações.",
        },
        {
          titulo: "Como procurar",
          texto:
            "Escreva algumas palavras importantes sobre o assunto em uma ferramenta de busca. Palavras claras ajudam a encontrar páginas relacionadas ao que você quer aprender.",
        },
        {
          titulo: "Pense antes de acreditar ou compartilhar",
          texto:
            "Nem tudo o que aparece na internet está correto ou é apropriado. Confira quem publicou e converse com alguém de confiança antes de compartilhar algo que pareça estranho.",
        },
      ],
    },
    4: {
      id: 4,
      titulo: "Usando o sistema operacional",
      descricao:
        "Entenda o papel do sistema operacional e pratique a diferença entre usar o dispositivo, os aplicativos e seus recursos.",
      introducao:
        "Quando você liga um computador ou celular, o sistema operacional ajuda o dispositivo a funcionar. Ele organiza recursos e oferece uma forma de abrir aplicativos e trabalhar com arquivos.",
      topicos: [
        {
          titulo: "Sistema operacional",
          texto:
            "Windows, macOS, Android e outros sistemas operacionais ajudam a controlar o dispositivo. Eles permitem acessar a tela inicial, configurações e programas.",
        },
        {
          titulo: "Aplicativos e janelas",
          texto:
            "Cada aplicativo realiza tarefas, como escrever, desenhar ou conversar. Em um computador, você pode abrir e alternar entre janelas usando os controles disponíveis na tela.",
        },
        {
          titulo: "Atualizações",
          texto:
            "O sistema pode oferecer atualizações para corrigir problemas e melhorar seu funcionamento. Use as opções oficiais do dispositivo e peça ajuda se não souber o que escolher.",
        },
      ],
    },
    5: {
      id: 5,
      titulo: "Organizando arquivos e pastas",
      descricao:
        "Aprenda a guardar documentos em lugares fáceis de encontrar e a escolher nomes que expliquem o que cada arquivo contém.",
      introducao:
        "Fotos, textos e trabalhos são arquivos. Organizar os arquivos em pastas com nomes claros ajuda a encontrá-los sem precisar abrir tudo um por um.",
      topicos: [
        {
          titulo: "Pastas para cada assunto",
          texto:
            "Crie pastas para agrupar arquivos relacionados, como uma pasta para trabalhos da escola e outra para fotos. Você também pode criar uma pasta dentro de outra para separar melhor os assuntos.",
        },
        {
          titulo: "Nomes que ajudam",
          texto:
            "Dê nomes que indiquem o conteúdo, por exemplo, Trabalho_ciencias. Nomes como 'novo' ou 'arquivo2' não explicam o que está guardado.",
        },
        {
          titulo: "Abrir, mover e cuidar",
          texto:
            "Abrir um arquivo mostra seu conteúdo. Mover um arquivo muda onde ele fica guardado; confira a pasta de destino para conseguir encontrá-lo depois.",
        },
      ],
    },
    6: {
      id: 6,
      titulo: "Comunicando-se com responsabilidade",
      descricao:
        "Pratique uma comunicação respeitosa e saiba proteger sua privacidade ao conversar e compartilhar imagens.",
      introducao:
        "Mensagens, emails e chamadas ajudam as pessoas a se comunicar. Como numa conversa presencial, é importante tratar os outros com respeito e pensar no que será compartilhado.",
      topicos: [
        {
          titulo: "Respeito nas mensagens",
          texto:
            "Use palavras educadas e claras. Não envie ofensas nem repita mensagens para incomodar alguém; se uma conversa ficar desconfortável, pare e peça ajuda.",
        },
        {
          titulo: "Confira antes de enviar",
          texto:
            "Veja quem vai receber a mensagem e confira o texto e os arquivos anexados. Assim você evita enviar algo para a pessoa errada.",
        },
        {
          titulo: "Fotos e informações pessoais",
          texto:
            "Peça autorização antes de publicar uma foto de outra pessoa. Não compartilhe endereço, senha, telefone ou outras informações pessoais em espaços públicos.",
        },
      ],
    },
    7: {
      id: 7,
      titulo: "Revisão de informática básica",
      descricao:
        "Reúna o que aprendeu sobre computador, segurança, navegação e organização para resolver situações do dia a dia.",
      introducao:
        "Nesta revisão, conecte os conhecimentos das atividades anteriores. Usar tecnologia com confiança envolve saber para que servem os equipamentos, cuidar das contas e pedir ajuda quando necessário.",
      topicos: [
        {
          titulo: "Dispositivo e arquivos",
          texto:
            "Teclado e mouse ajudam a inserir informações, o monitor mostra resultados e o computador usa componentes internos para funcionar. Guarde seus arquivos em pastas com nomes fáceis de reconhecer.",
        },
        {
          titulo: "Contas protegidas",
          texto:
            "Mantenha suas senhas em segredo, desconfie de pedidos inesperados e não abra links se não tiver certeza. Peça orientação a alguém de confiança.",
        },
        {
          titulo: "Navegação responsável",
          texto:
            "Use um navegador para acessar sites, procure informações com palavras claras e pense antes de acreditar ou compartilhar. Respeite a privacidade das outras pessoas.",
        },
      ],
    },
  },
  intermediario: {
    1: {
      id: 1,
      titulo: "Componentes e desempenho",
      descricao:
        "Explore como CPU, RAM, armazenamento e placa-mãe cooperam e por que cada componente influencia o uso do computador.",
      introducao:
        "O desempenho de um computador depende da colaboração entre seus componentes. Entender o caminho dos dados ajuda a distinguir memória de trabalho, processamento e armazenamento permanente.",
      topicos: [
        {
          titulo: "Ciclo de processamento",
          texto:
            "Ao abrir um programa, seus dados são carregados do SSD ou HD para a RAM. A CPU busca instruções e dados na memória, processa as operações e envia resultados para outros componentes, como a placa de vídeo ou o monitor.",
        },
        {
          titulo: "RAM não é armazenamento",
          texto:
            "A RAM oferece espaço rápido e temporário para programas em execução; seu conteúdo normalmente se perde ao desligar. SSD e HD mantêm arquivos e aplicativos salvos, mas são usados de outra forma pelo sistema.",
        },
        {
          titulo: "Conexões e limites",
          texto:
            "A placa-mãe conecta processador, memória, armazenamento e periféricos. Uma máquina lenta pode ter diferentes causas, como pouca memória disponível, armazenamento ocupado ou muitos programas em execução.",
        },
      ],
    },
    2: {
      id: 2,
      titulo: "Proteção de contas e autenticação",
      descricao:
        "Entenda como senhas exclusivas, autenticação adicional e verificação de solicitações reduzem riscos para suas contas.",
      introducao:
        "A segurança de uma conta não depende somente de criar uma senha difícil. Também é preciso evitar reutilização, proteger códigos de autenticação e validar pedidos recebidos por mensagens.",
      topicos: [
        {
          titulo: "Senhas únicas e longas",
          texto:
            "Uma senha longa e exclusiva reduz o impacto de vazamentos em outros serviços. Um gerenciador de senhas confiável pode ajudar a criar e armazenar senhas diferentes sem precisar decorá-las todas.",
        },
        {
          titulo: "Autenticação de dois fatores",
          texto:
            "A autenticação de dois fatores combina a senha com outra prova de acesso, como uma chave de segurança ou código temporário. Nunca compartilhe códigos: alguém pode usá-los para concluir uma tentativa de login.",
        },
        {
          titulo: "Identifique tentativas de golpe",
          texto:
            "Mensagens urgentes, links inesperados e pedidos de credenciais podem indicar phishing. Não use o link recebido para confirmar: entre no serviço pelo aplicativo ou endereço oficial que você já conhece.",
        },
      ],
    },
    3: {
      id: 3,
      titulo: "Pesquisa e avaliação de fontes",
      descricao:
        "Use buscas mais precisas e avalie autoria, data e evidências para separar informação útil de conteúdo pouco confiável.",
      introducao:
        "Pesquisar na web é mais do que abrir o primeiro resultado. Uma busca clara ajuda a localizar material, e a avaliação das fontes permite julgar se a informação serve para o objetivo da pesquisa.",
      topicos: [
        {
          titulo: "Navegador, busca e URL",
          texto:
            "O navegador é o programa que acessa páginas; o mecanismo de busca localiza páginas usando termos. A URL identifica um endereço na web, então confira o domínio antes de inserir dados ou confiar em uma página.",
        },
        {
          titulo: "Refine as palavras-chave",
          texto:
            "Escolha termos específicos e acrescente contexto, como o assunto e o período de interesse. Reformular a consulta pode revelar fontes mais relevantes e reduzir resultados vagos.",
        },
        {
          titulo: "Compare as fontes",
          texto:
            "Verifique quem publicou, quando, quais evidências são apresentadas e se outras fontes independentes confirmam a afirmação. Popularidade e posição no resultado não provam que algo seja correto.",
        },
      ],
    },
    4: {
      id: 4,
      titulo: "Sistema operacional e produtividade",
      descricao:
        "Conheça as responsabilidades do sistema operacional, a gestão de aplicativos e como manter o dispositivo atualizado.",
      introducao:
        "O sistema operacional intermedeia o uso do hardware pelos programas. Ele administra recursos, organiza a execução dos aplicativos e oferece ferramentas para navegar entre janelas, arquivos e configurações.",
      topicos: [
        {
          titulo: "Recursos e aplicativos",
          texto:
            "O sistema distribui recursos como processador, memória e acesso a arquivos entre os programas. Um aplicativo solicita esses recursos para cumprir uma tarefa, enquanto o sistema coordena seu funcionamento.",
        },
        {
          titulo: "Janelas e barra de tarefas",
          texto:
            "A barra de tarefas costuma indicar programas abertos e oferecer atalhos. Alternar entre janelas e fechar aplicativos que não estão em uso ajuda a manter o espaço de trabalho organizado.",
        },
        {
          titulo: "Atualizações e estabilidade",
          texto:
            "Atualizações podem corrigir vulnerabilidades, erros e problemas de compatibilidade. Instale-as por meio dos recursos oficiais e salve seu trabalho antes de reiniciar o dispositivo.",
        },
      ],
    },
    5: {
      id: 5,
      titulo: "Arquivos, formatos e organização",
      descricao:
        "Entenda extensões, cópia e movimentação e crie uma estrutura de pastas que facilite localizar versões e documentos.",
      introducao:
        "Uma coleção de arquivos bem organizada economiza tempo e evita confusões. Para isso, combine pastas coerentes, nomes descritivos e atenção ao formato e à localização dos documentos.",
      topicos: [
        {
          titulo: "Formatos e extensões",
          texto:
            "Extensões como .pdf ou .jpg geralmente indicam o formato do arquivo e os programas que podem abri-lo. A extensão é parte do nome e, sozinha, não garante que o conteúdo seja seguro ou corresponda ao nome.",
        },
        {
          titulo: "Copiar ou mover",
          texto:
            "Copiar cria outra instância do arquivo e mantém o original. Mover altera a localização do arquivo; depois, verifique a pasta de destino e atualize atalhos ou referências, se necessário.",
        },
        {
          titulo: "Estrutura e nomes",
          texto:
            "Agrupe documentos por projeto ou assunto e use nomes que incluam informações úteis, como tema e data. Uma estrutura consistente facilita encontrar materiais e colaborar com outras pessoas.",
        },
      ],
    },
    6: {
      id: 6,
      titulo: "Comunicação digital e privacidade",
      descricao:
        "Escolha canais adequados, confira destinatários e reduza a exposição de dados pessoais em mensagens e compartilhamentos.",
      introducao:
        "Comunicar-se digitalmente exige a mesma atenção ao contexto e ao público que uma conversa presencial. Um envio equivocado pode revelar informações a pessoas que não precisavam recebê-las.",
      topicos: [
        {
          titulo: "Destinatários e anexos",
          texto:
            "Antes de enviar um email, confira endereço, assunto e anexos. Em conversas com várias pessoas, revise quem está incluído e evite usar 'Responder a todos' sem necessidade.",
        },
        {
          titulo: "Consentimento e respeito",
          texto:
            "Peça permissão antes de compartilhar imagens ou mensagens privadas. Uma comunicação respeitosa evita exposição, assédio e divulgação de conteúdo fora do contexto.",
        },
        {
          titulo: "Minimize o que compartilha",
          texto:
            "Envie apenas as informações necessárias e escolha um canal confiável para o público correto. Não inclua senhas ou códigos de autenticação em mensagens.",
        },
      ],
    },
    7: {
      id: 7,
      titulo: "Desafio integrado de informática",
      descricao:
        "Conecte hardware, segurança, pesquisa e organização para tomar decisões digitais mais seguras e eficientes.",
      introducao:
        "Situações reais raramente envolvem um único conceito. Neste desafio, pense em como o funcionamento do computador, a confiabilidade das informações e a proteção de dados se relacionam.",
      topicos: [
        {
          titulo: "Diagnostique antes de agir",
          texto:
            "Relacione o sintoma ao componente ou programa possível, sem confundir RAM com armazenamento. Observe o que está acontecendo e faça mudanças reversíveis antes de alterar configurações importantes.",
        },
        {
          titulo: "Verifique informações e solicitações",
          texto:
            "Avalie autoria, evidências e confirmação independente. Para pedidos urgentes de acesso ou dinheiro, confirme por um canal conhecido e separado da mensagem recebida.",
        },
        {
          titulo: "Organize e proteja o trabalho",
          texto:
            "Mantenha arquivos em pastas identificáveis, use nomes descritivos e tenha cópias de segurança. Compartilhe somente o material necessário com as pessoas autorizadas.",
        },
      ],
    },
  },
  avancado: {
    1: {
      id: 1,
      titulo: "Arquitetura e gargalos de hardware",
      descricao:
        "Analise a hierarquia de memória e o fluxo de dados entre CPU, RAM, cache, armazenamento e dispositivos de entrada e saída.",
      introducao:
        "O desempenho resulta da interação entre componentes com capacidades e latências diferentes. A hierarquia de memória aproxima dados frequentes da CPU, enquanto barramentos e controladores coordenam as transferências.",
      topicos: [
        {
          titulo: "CPU, cache e memória principal",
          texto:
            "A CPU executa instruções e usa caches menores e mais rápidas para reduzir acessos à RAM. A RAM mantém dados de processos ativos; cache misses e pressão de memória podem aumentar a latência e reduzir o desempenho.",
        },
        {
          titulo: "RAM versus armazenamento persistente",
          texto:
            "RAM é volátil e adequada a dados de trabalho; SSDs e HDs preservam dados sem energia. Quando a memória física se esgota, paginação ou swap pode recorrer ao armazenamento e elevar o tempo de resposta.",
        },
        {
          titulo: "Interconexões e diagnóstico",
          texto:
            "A placa-mãe fornece interfaces e caminhos de comunicação entre componentes. Para investigar lentidão, observe uso de CPU, memória, I/O e processos concorrentes em vez de atribuir todo problema a uma única peça.",
        },
      ],
    },
    2: {
      id: 2,
      titulo: "Modelos de ameaça e autenticação",
      descricao:
        "Avalie riscos de credenciais, phishing e permissões usando defesa em profundidade e o princípio do menor privilégio.",
      introducao:
        "Proteger contas envolve pensar em como um atacante poderia obter credenciais, reutilizar senhas expostas ou abusar de uma sessão autenticada. Controles diferentes reduzem riscos diferentes e devem ser combinados.",
      topicos: [
        {
          titulo: "Credenciais e exposição",
          texto:
            "Senhas exclusivas reduzem ataques de credential stuffing após vazamentos. Gerenciadores de senhas ajudam a gerar segredos fortes; passkeys podem reduzir phishing por vincular a autenticação ao domínio legítimo.",
        },
        {
          titulo: "Fatores adicionais e recuperação",
          texto:
            "MFA adiciona uma prova além da senha, mas códigos temporários continuam sensíveis. Proteja também os canais de recuperação, revogue sessões desconhecidas e prefira fatores resistentes a phishing quando disponíveis.",
        },
        {
          titulo: "Engenharia social",
          texto:
            "Urgência, autoridade simulada e links semelhantes a domínios legítimos são técnicas comuns. Verifique solicitações por um canal independente; não use os contatos ou links fornecidos pela mensagem suspeita.",
        },
      ],
    },
    3: {
      id: 3,
      titulo: "Protocolos web e investigação de fontes",
      descricao:
        "Aprofunde-se em URLs, resolução de nomes, HTTPS e métodos para avaliar a qualidade e a procedência das informações.",
      introducao:
        "A web combina protocolos, serviços de nomes e documentos publicados por organizações e indivíduos. Compreender o caminho de acesso e a procedência do conteúdo ajuda tanto na navegação quanto na verificação de alegações.",
      topicos: [
        {
          titulo: "Domínios, DNS e URLs",
          texto:
            "Uma URL identifica esquema, domínio e caminho de um recurso. O DNS ajuda a resolver nomes de domínio para registros de rede; confira cuidadosamente o domínio, pois nomes parecidos podem imitar serviços legítimos.",
        },
        {
          titulo: "O que HTTPS protege",
          texto:
            "HTTPS usa TLS para proteger a conexão e autenticar o domínio indicado pelo certificado. Isso não prova que o site é honesto, que a informação é verdadeira ou que a página recebida não seja uma tentativa de phishing.",
        },
        {
          titulo: "Verificação e evidências",
          texto:
            "Rastreie afirmações até a fonte original, observe autoria, data, método e evidências e procure confirmações independentes. Popularidade, trechos destacados e posição nos resultados não substituem a avaliação crítica.",
        },
      ],
    },
    4: {
      id: 4,
      titulo: "Sistemas operacionais e privilégios",
      descricao:
        "Estude como o sistema operacional gerencia processos e recursos, e como atualizações e permissões afetam a segurança.",
      introducao:
        "Um sistema operacional organiza a execução de processos e o acesso a recursos de hardware. Suas interfaces simplificam tarefas, mas as decisões sobre privilégios, atualizações e isolamento influenciam a estabilidade e a segurança.",
      topicos: [
        {
          titulo: "Kernel, processos e recursos",
          texto:
            "O kernel intermedeia operações de baixo nível, agenda processos e gerencia memória e dispositivos. Aplicativos usam serviços do sistema em vez de controlar diretamente todo o hardware.",
        },
        {
          titulo: "Princípio do menor privilégio",
          texto:
            "Use contas sem privilégios administrativos nas tarefas rotineiras e conceda acesso somente quando necessário. Limitar privilégios reduz o impacto de erros ou de um aplicativo comprometido.",
        },
        {
          titulo: "Atualizações e ciclo de vida",
          texto:
            "Correções de segurança mitigam vulnerabilidades conhecidas. Mantenha sistemas suportados atualizados, use fontes oficiais e planeje reinicializações e compatibilidade de aplicações.",
        },
      ],
    },
    5: {
      id: 5,
      titulo: "Integridade, formatos e recuperação de dados",
      descricao:
        "Vá além de extensões e pastas: considere procedência de arquivos, versões, integridade e estratégias de backup testáveis.",
      introducao:
        "Arquivos são dados interpretados por aplicativos, e nomes ou extensões não garantem o formato nem a segurança do conteúdo. Uma estratégia robusta combina organização, controle de versões e capacidade real de recuperação.",
      topicos: [
        {
          titulo: "Extensão não valida conteúdo",
          texto:
            "A extensão é um indicador no nome do arquivo e pode ser alterada sem converter os dados. Confirme a origem, o contexto e o tipo esperado; não habilite macros ou conteúdo ativo de fontes não confiáveis.",
        },
        {
          titulo: "Organização e versões",
          texto:
            "Estruturas previsíveis e nomes com identificadores úteis reduzem ambiguidades. Para documentos colaborativos, diferencie versões e registre mudanças importantes em vez de depender de nomes como 'final_final'.",
        },
        {
          titulo: "Backups e recuperação",
          texto:
            "Mantenha cópias separadas do original, limite quem pode alterá-las e teste restaurações. Cópias acessíveis com as mesmas permissões dos arquivos originais podem ser afetadas pelo mesmo incidente.",
        },
      ],
    },
    6: {
      id: 6,
      titulo: "Comunicação segura e minimização de dados",
      descricao:
        "Aplique verificação de destinatários, canais adequados e minimização de dados para reduzir exposição e engenharia social.",
      introducao:
        "A comunicação digital cria cópias, encaminhamentos e registros que podem alcançar mais pessoas do que o esperado. Um processo cuidadoso considera identidade, necessidade de acesso, sensibilidade e persistência da informação.",
      topicos: [
        {
          titulo: "Destinatários e contexto",
          texto:
            "Revise campos Para, Cc e Cco, listas de distribuição e anexos antes do envio. Uma resposta em massa ou um endereço semelhante pode expor conteúdo a destinatários não autorizados.",
        },
        {
          titulo: "Minimização e canais",
          texto:
            "Compartilhe somente os dados necessários e use um canal aprovado com acesso restrito. Criptografia de transporte não substitui a verificação de destinatários nem controles de acesso.",
        },
        {
          titulo: "Confirmação contra falsificação",
          texto:
            "Pedidos urgentes de pagamento ou dados podem imitar colegas e gestores. Confirme por um canal independente já conhecido e siga procedimentos de aprovação, mesmo sob pressão.",
        },
      ],
    },
    7: {
      id: 7,
      titulo: "Análise integrada de cenários digitais",
      descricao:
        "Integre arquitetura, segurança, redes, sistema operacional e resiliência para avaliar cenários com múltiplos riscos.",
      introducao:
        "Um cenário digital pode envolver simultaneamente desempenho, confiabilidade e segurança. Uma análise sólida separa fatos observados de hipóteses, valida a origem das solicitações e escolhe medidas proporcionais ao risco.",
      topicos: [
        {
          titulo: "Investigue o comportamento do sistema",
          texto:
            "Relacione lentidão a métricas observáveis, como pressão de memória, uso de CPU ou I/O. Memória virtual pode explicar latência, mas não confirma sozinha a causa raiz; compare evidências antes de agir.",
        },
        {
          titulo: "Não confunda transporte com confiança",
          texto:
            "HTTPS protege a conexão até um domínio, mas não torna legítimo qualquer pedido recebido. Verifique o domínio, a origem da solicitação e a identidade do solicitante por um canal independente.",
        },
        {
          titulo: "Preserve capacidade de recuperação",
          texto:
            "Combine permissões limitadas, atualizações, organização e backups isolados com restaurações testadas. Em incidentes, evite ações irreversíveis antes de preservar evidências e confirmar o escopo.",
        },
      ],
    },
  },
};

export function obterConteudoAtividade(
  nivel: NivelAtividade | null,
  id: number,
): ConteudoAtividade | undefined {
  if (!nivel) return undefined;
  return conteudosPorNivel[nivel][id];
}
