import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "bem-vindo",
    section: "boas-vindas",
    title: "Bem-vindo ao Livro do Blender",
    difficulty: "iniciante",
    subtitle: "O ponto de partida da sua jornada em 3D, contado sem pressa.",
    intro: `
Seja muito bem-vindo! Antes de qualquer botão, atalho ou render, eu quero te dar as boas-vindas de verdade. Este livro foi escrito pensando em **você que nunca abriu o Blender**, ou que abriu, se assustou com a quantidade de painéis e fechou logo em seguida. Aqui a gente começa do absoluto zero, sem assumir que você sabe o que é um \`vertex\`, um \`shader\` ou um \`render engine\`. Cada termo novo será apresentado com calma, com analogias do mundo real, e revisitado quantas vezes for preciso.

A proposta é que você sinta que tem um mentor ao lado, te explicando coisas como se estivéssemos sentados na mesma mesa. Em vez de listas frias de funcionalidades, você verá histórias, comparações com outros softwares, armadilhas comuns e, principalmente, **o "porquê" das coisas**. Saber que \`G\` move um objeto é fácil; entender por que o Blender escolheu atalhos de uma letra só, e por que isso te torna mais rápido a longo prazo, é o que diferencia um clicador de um artista 3D.

## O que esperar deste livro
Cada capítulo é dividido em uma introdução conceitual longa, blocos de **código ou atalhos práticos**, pontos-chave para revisar e alertas com dicas e armadilhas. Você pode ler do começo ao fim, ou usar como referência. Os primeiros capítulos são contemplativos: vamos entender o que é o Blender, sua história e onde ele se encaixa no mercado, antes de tocar em qualquer ferramenta.

Não tenha pressa. 3D é uma maratona, não uma corrida de 100 metros. Se um capítulo parecer denso, respire, abra o Blender ao lado e experimente. O objetivo não é decorar — é **entender**. Vamos juntos?
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Reserve 30 minutos por dia, 5 dias por semana\n2. Leia um capítulo por vez, sem pular\n3. Repita os exemplos no Blender aberto ao lado\n4. Anote dúvidas em um caderno físico ou digital\n5. Refaça o capítulo anterior antes de começar o próximo",
      },
      {
        lang: "config",
        code: "# Setup mínimo recomendado para acompanhar o livro\nBlender: versão 4.x (LTS de preferência)\nMouse: 3 botões com scroll clicável (essencial!)\nTeclado: numpad de verdade ou emulado\nMonitor: 1920x1080 ou maior",
      },
      {
        lang: "atalho",
        code: "F1 → ajuda contextual  |  Ctrl+Z → desfazer  |  Ctrl+S → salvar",
      },
    ],
    points: [
      "**Livro para iniciantes absolutos**: nenhum conhecimento prévio de 3D é assumido",
      "**Tom de mentor**: a explicação vem antes do botão, sempre",
      "**Leitura ativa**: tenha o Blender aberto ao lado, mesmo nos capítulos teóricos",
      "**Não pule capítulos** dos primeiros blocos — eles constroem o vocabulário",
      "**Erros são bem-vindos**: você aprende mais quebrando coisas do que acertando de primeira",
      "**Ritmo constante** vence sessões maratonadas de fim de semana",
    ],
    alerts: [
      {
        type: "tip",
        content: "Salve cedo, salve sempre. \`Ctrl+S\` é o melhor amigo de todo artista 3D — antes de testar qualquer ferramenta nova, salve.",
      },
      {
        type: "info",
        content: "Se você já usa outros softwares 3D, **resista à tentação** de pular para os capítulos avançados. O Blender tem uma lógica própria que vale revisitar do zero.",
      },
      {
        type: "success",
        content: "Concluir este primeiro capítulo já é uma vitória. **Comece do começo** é metade do caminho.",
      },
    ],
  },
  {
    slug: "o-que-e-blender",
    section: "boas-vindas",
    title: "O que é o Blender?",
    difficulty: "iniciante",
    subtitle: "Um estúdio 3D inteiro dentro de um único programa gratuito.",
    intro: `
O **Blender** é um software de criação 3D **gratuito e de código aberto** (open-source) que, sozinho, faz o trabalho que normalmente exigiria cinco ou seis programas pagos diferentes. Ele modela objetos tridimensionais, texturiza superfícies, anima personagens, simula física (fogo, fumaça, água, tecidos), renderiza imagens e vídeos fotorrealistas, edita vídeo, compõe efeitos visuais e ainda permite escrever scripts em **Python** para automatizar tudo isso. É, em essência, um **estúdio de produção inteiro empacotado em menos de 300 MB**.

Para quem está começando, isso é tão impressionante quanto desconcertante. Você abre o programa pela primeira vez e vê dezenas de painéis, abas e botões. A boa notícia é que ninguém usa tudo ao mesmo tempo. Animadores ignoram os painéis de simulação; modeladores raramente abrem o editor de vídeo. O Blender é organizado em **workspaces** (espaços de trabalho), e você aprenderá a navegar entre eles conforme a tarefa.

## Um software, vários "aplicativos" dentro
Pense no Blender como um canivete suíço: \`Layout\` para cenografia, \`Modeling\` para criar formas, \`Sculpting\` para esculpir como em barro digital, \`UV Editing\` para "desembrulhar" texturas, \`Texture Paint\` para pintar diretamente no objeto, \`Shading\` para criar materiais, \`Animation\` para dar vida, \`Rendering\` para gerar a imagem final, \`Compositing\` para pós-produção e \`Video Editing\` para montar o vídeo. Tudo isso conversa entre si, sem exportar e importar arquivos.

E o melhor: o arquivo \`.blend\` carrega tudo junto — modelos, texturas, animações, configurações. Você manda um \`.blend\` para um colega e ele abre exatamente como você deixou. No próximo capítulo, vamos comparar o Blender com outros softwares para você entender onde ele brilha e onde ainda perde terreno.
    `,
    codes: [
      {
        lang: "config",
        code: "# Pacote completo do Blender (tudo isso vem instalado)\nModelagem poligonal e por curvas\nEsculpia digital (estilo ZBrush)\nMapeamento UV e pintura de textura\nNodos de material (Cycles e Eevee)\nRigging e animação por keyframes\nSimulação: fluidos, fumaça, tecidos, partículas\nMotion tracking (rastreio de câmera)\nVideo Sequence Editor (edição de vídeo)\nGrease Pencil (animação 2D dentro do 3D)\nPython API completa para scripts e add-ons",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Quem usa o Blender programaticamente fala com 'bpy'\n# Listar todos os objetos da cena atual\nfor obj in bpy.context.scene.objects:\n    print(obj.name, '->', obj.type)",
      },
      {
        lang: "shell",
        code: "# Verificar a versão instalada pelo terminal\nblender --version\n\n# Rodar o Blender em modo background (sem interface)\nblender --background arquivo.blend --render-output ./out/ --render-frame 1",
      },
      {
        lang: "atalho",
        code: "Ctrl+← / Ctrl+→ → trocar de workspace  |  T → toggle toolbar  |  N → toggle painel lateral",
      },
    ],
    points: [
      "**Blender é gratuito e open-source** — nem trial, nem versão limitada, nem watermark",
      "**Tudo-em-um**: modelagem, animação, render, simulação, edição de vídeo e mais",
      "**Workspaces** organizam a interface por tarefa, evitando que você veja tudo ao mesmo tempo",
      "O arquivo \`.blend\` carrega cena, materiais, animação e até scripts Python juntos",
      "**Python embutido**: dá para automatizar qualquer coisa via \`bpy\`",
      "Roda em **Windows, macOS e Linux** com a mesma interface e arquivos compatíveis",
    ],
    alerts: [
      {
        type: "info",
        content: "O Blender é mantido pela **Blender Foundation**, uma organização sem fins lucrativos na Holanda, financiada por doações e patrocínios de estúdios como Epic Games, NVIDIA, AMD e Microsoft.",
      },
      {
        type: "tip",
        content: "Não tente aprender todos os workspaces de uma vez. Comece por \`Layout\` e \`Modeling\` — eles cobrem 80% do que você precisa nos primeiros meses.",
      },
      {
        type: "warning",
        content: "**Cuidado com tutoriais antigos** (anteriores à versão 2.8). A interface mudou drasticamente em 2019, e atalhos antigos podem te confundir.",
      },
    ],
  },
  {
    slug: "blender-vs-outros",
    section: "boas-vindas",
    title: "Blender vs. outros softwares 3D",
    difficulty: "iniciante",
    subtitle: "Onde o Blender brilha, onde ele perde, e por que isso importa para você.",
    intro: `
No mercado de 3D existem gigantes históricos: **Autodesk Maya** (animação e VFX em estúdios de cinema), **Autodesk 3ds Max** (arquitetura e games), **Cinema 4D** (motion graphics e publicidade), **Houdini** (simulação e efeitos procedurais) e **ZBrush** (escultura digital). Cada um custa entre **R$ 1.500 e R$ 12.000 por ano** em licenças. O Blender entrega funcionalidades equivalentes (e, em alguns casos, superiores) por **zero reais**.

Isso não significa que o Blender vence em tudo. **Maya** ainda domina o pipeline de animação em estúdios grandes por questões históricas e de integração. **Houdini** é insuperável em simulações procedurais complexas. **ZBrush** tem um workflow de escultura mais maduro para quem trabalha com milhões de polígonos. Mas para 95% dos artistas independentes, freelancers, estudantes e pequenos estúdios, o Blender **mais do que dá conta do recado**.

## Onde o Blender se destaca
A integração entre todas as etapas é o maior trunfo. Em outros softwares, você modela em um, texturiza em outro, anima em um terceiro e renderiza em um quarto, exportando \`.fbx\` ou \`.obj\` o tempo todo. No Blender, está tudo no mesmo arquivo, sem perda. Os render engines internos — \`Cycles\` (path-tracing fotorrealista) e \`Eevee\` (rasterização em tempo real) — competem de igual para igual com Arnold, V-Ray e Redshift.

### Onde ele ainda perde
A interface, embora muito melhor desde a 2.8, tem uma curva de aprendizado peculiar. O suporte profissional pago é menor (você depende mais da comunidade). E em pipelines de estúdio AAA, ainda há resistência por inércia. Mas a maré está virando: estúdios como **Tangent Animation, Khara (Evangelion) e Ubisoft** já usam Blender em produção. Você está apostando no software certo na hora certa.
    `,
    codes: [
      {
        lang: "config",
        code: "# Comparação rápida de custo (licença comercial anual)\nMaya            ~ US$ 2.295 / ano\n3ds Max         ~ US$ 2.295 / ano\nCinema 4D       ~ US$ 720   / ano\nHoudini Indie   ~ US$ 269   / ano (com limites)\nZBrush          ~ US$ 399   / ano\nBlender         R$ 0,00    para sempre, uso comercial liberado",
      },
      {
        lang: "config",
        code: "# Equivalências para quem vem de outros softwares\nMaya 'Channel Box'        ≈ Blender 'Properties Panel' (N)\nMaya 'Hypergraph'         ≈ Blender 'Outliner'\n3ds Max 'Modifier Stack'  ≈ Blender 'Modifiers tab'\nCinema 4D 'Xpresso'       ≈ Blender 'Geometry Nodes'\nZBrush 'Subtools'         ≈ Blender 'Collections + Multires'\nHoudini 'SOPs'            ≈ Blender 'Geometry Nodes' (parcial)",
      },
      {
        lang: "passo-a-passo",
        code: "1. Liste as 3 tarefas que você mais quer fazer (ex: animar, modelar para impressão 3D, render arquitetônico)\n2. Pesquise se o Blender cobre essas 3 tarefas — quase certamente sim\n3. Se sim, **não perca tempo** comparando: foque em aprender Blender bem\n4. Use comparações com outros softwares apenas para entender conceitos, nunca para se distrair",
      },
    ],
    points: [
      "**Blender é gratuito**, os concorrentes custam de R$ 1.500 a R$ 12.000/ano",
      "**Maya** ainda lidera animação em grandes estúdios, mas Blender está alcançando rápido",
      "**Houdini** é melhor para simulações procedurais ultra-complexas",
      "**ZBrush** ainda tem vantagem em escultura de altíssima densidade",
      "Blender vence em **integração**: tudo num arquivo só, sem exportação intermediária",
      "**Estúdios profissionais** como Khara, Tangent e Ubisoft já adotaram Blender em produção",
      "Para freelancer, estudante e pequeno estúdio, **Blender é a escolha óbvia em 2025**",
    ],
    alerts: [
      {
        type: "info",
        content: "Não existe software 'melhor' em absoluto — existe a **ferramenta certa para o trabalho**. Mas o Blender cobre quase todos os trabalhos de quem está começando.",
      },
      {
        type: "warning",
        content: "Evite a **paralisia da comparação**. Muita gente fica meses pesquisando qual software escolher e nunca abre nenhum. Abra o Blender hoje.",
      },
      {
        type: "tip",
        content: "Se você já usa Maya ou 3ds Max no trabalho, aprender Blender em paralelo te dá **flexibilidade de mercado**. Ninguém perde por saber dois softwares.",
      },
    ],
  },
  {
    slug: "historia-blender",
    section: "boas-vindas",
    title: "A história do Blender",
    difficulty: "iniciante",
    subtitle: "De software interno de um estúdio falido à ferramenta livre mais querida do 3D.",
    intro: `
A história do Blender é uma das mais bonitas do software livre, e conhecê-la te ajuda a entender por que o programa tem a personalidade que tem. Tudo começou em **1994**, na Holanda, quando o animador **Ton Roosendaal** criou um software interno para o seu estúdio chamado **NeoGeo**. O nome "Blender" veio de uma faixa do álbum do músico Yello chamada... "Blender". Era simplesmente o nome da ferramenta usada internamente, sem pretensão comercial.

Em **1998**, Ton fundou a empresa **Not a Number (NaN)** para comercializar o Blender. O modelo de negócio era oferecer uma versão gratuita básica e cobrar por recursos avançados via "C-key". Em **2002**, no entanto, a NaN faliu por causa do estouro da bolha .com. E foi aí que a história ficou inesquecível.

## A campanha "Free Blender"
Os investidores aceitaram **liberar o código-fonte** do Blender em troca de **€ 100.000**. Ton organizou uma campanha de financiamento coletivo (em 2002, antes do Kickstarter existir!) e a comunidade levantou o valor em **sete semanas**. Em **13 de outubro de 2002**, o Blender se tornou **software livre sob licença GNU GPL**, e a **Blender Foundation** nasceu para cuidar dele.

### O renascimento e a versão 2.8
De 2002 a 2019, o Blender foi crescendo lentamente, mantido por doações e por uma comunidade fanática. Em **julho de 2019**, foi lançada a versão **2.80**, que mudou tudo: nova interface, atalhos de tecla esquerda no clique (antes era no direito!), workspaces, render engine \`Eevee\` em tempo real. Foi o ponto de virada. Doações de **Epic Games, NVIDIA, AMD, Microsoft, Apple e Ubisoft** (entre outros) começaram a chegar via **Blender Development Fund**. Hoje, o Blender tem mais de 30 desenvolvedores em tempo integral e lança versões LTS estáveis todo ano.
    `,
    codes: [
      {
        lang: "config",
        code: "# Linha do tempo essencial\n1994 → Blender criado dentro do estúdio NeoGeo (NL)\n1998 → Empresa Not a Number (NaN) fundada por Ton Roosendaal\n2002 → NaN fale; campanha 'Free Blender' arrecada € 100.000\n2002 → Blender vira open-source (GNU GPL); nasce a Blender Foundation\n2008 → Versão 2.5: grande refatoração da interface\n2011 → Cycles render engine introduzido\n2019 → Versão 2.80: revolução de UX, Eevee, novo logo\n2021 → Versão 3.0: Cycles X, asset browser\n2024+ → Versões 4.x: melhorias contínuas, foco em performance",
      },
      {
        lang: "shell",
        code: "# Você pode baixar e estudar o código-fonte oficial\ngit clone https://projects.blender.org/blender/blender.git\ncd blender\n# Mais de 2 milhões de linhas de código C, C++ e Python",
      },
      {
        lang: "passo-a-passo",
        code: "1. Acesse fund.blender.org\n2. Veja a lista atual de patrocinadores corporativos\n3. Considere doar a partir de € 5/mês como pessoa física\n4. Sua contribuição mantém o Blender gratuito para sempre",
      },
    ],
    points: [
      "**Blender nasceu em 1994** como ferramenta interna do estúdio holandês NeoGeo",
      "**Ton Roosendaal** é o criador e ainda hoje lidera a Blender Foundation",
      "Em **2002**, a comunidade comprou a liberdade do Blender por € 100.000",
      "Desde então, o Blender é **GNU GPL**, ou seja, livre para sempre",
      "A versão **2.80 (2019)** modernizou a interface e atraiu o público mainstream",
      "Hoje, **gigantes da tecnologia** como Epic, NVIDIA e AMD financiam o desenvolvimento",
      "Existem versões **LTS (Long Term Support)** com 2 anos de correções, ideais para produção",
    ],
    alerts: [
      {
        type: "success",
        content: "**O Blender é seu** — e da comunidade. Nenhuma empresa pode comprá-lo, fechar o código ou cobrar licença. Esse é o poder da licença GPL.",
      },
      {
        type: "info",
        content: "A **Blender Foundation** produz \"Open Movies\" como *Big Buck Bunny*, *Sintel* e *Charge* — curtas inteiramente feitos no Blender com fontes liberadas para estudo.",
      },
      {
        type: "tip",
        content: "Se o Blender mudar sua vida profissional, considere doar para o **Development Fund**. É assim que ele continua livre para a próxima geração.",
      },
    ],
  },
  {
    slug: "areas-de-uso",
    section: "boas-vindas",
    title: "Áreas de uso do Blender",
    difficulty: "iniciante",
    subtitle: "Onde o Blender é usado no mundo real, e onde você pode encaixar a sua carreira.",
    intro: `
Quando você aprende Blender, não está aprendendo "um software" — está aprendendo uma **plataforma** que abre portas em dezenas de mercados diferentes. E isso é importante de saber **antes** de começar a estudar, porque ajuda você a escolher um foco. Tentar aprender tudo ao mesmo tempo é o erro mais comum (e o mais frustrante) de quem começa em 3D.

Vamos passar pelas principais áreas. Em **arquitetura e interiores (ArchViz)**, o Blender é usado para criar renders fotorrealistas de prédios, casas e ambientes antes da construção. É um mercado enorme no Brasil. Em **animação**, vai de curtas autorais até filmes inteiros (Khara fez parte de *Evangelion: 3.0+1.0* em Blender). Em **VFX e cinema**, é usado para efeitos visuais, set extensions e motion tracking. Em **games**, modela personagens e cenários exportados para Unity, Unreal e Godot.

## Outras áreas crescentes
Em **impressão 3D**, o Blender modela peças que viram objetos físicos. Em **motion graphics e publicidade**, compete com Cinema 4D para vinhetas, logos animados e comerciais. Em **NFTs e arte digital** (apesar do hype ter passado), continua sendo a ferramenta de muitos artistas que vendem prints e arte 3D. Em **realidade virtual e aumentada (VR/AR)**, modela ativos para experiências imersivas.

### E as áreas menos óbvias
Em **educação e ciência**, é usado para visualização de moléculas, simulações físicas e material didático interativo. Em **medicina**, para visualização de exames e próteses customizadas. Em **engenharia mecânica**, para protótipos e renders técnicos. Você verá que o Blender é, literalmente, uma **profissão dentro de um software**. Escolha uma trilha, vá fundo, e depois expanda.
    `,
    codes: [
      {
        lang: "config",
        code: "# Áreas e ferramentas do Blender mais usadas em cada uma\nArchViz       → Cycles, HDRI, Geometry Nodes (vegetação)\nAnimação      → Rigging, NLA Editor, Grease Pencil\nVFX           → Motion Tracking, Compositor, Cycles\nGames         → Modelagem low-poly, UV unwrap, FBX export\nImpressão 3D  → Modifiers, Boolean, STL export\nMotion Design → Eevee, Geometry Nodes, Shader Editor\nVR/AR         → Otimização de meshes, baking de texturas\nCiência       → Add-ons como Molecular Nodes, BlenderBIM",
      },
      {
        lang: "passo-a-passo",
        code: "1. Liste 3 áreas que despertam sua curiosidade\n2. Procure no YouTube 'blender [área] showreel 2024'\n3. Veja se o estilo de trabalho te inspira\n4. Escolha UMA área para os próximos 3 a 6 meses\n5. Só depois pense em diversificar",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Exemplo: exportar a cena atual como STL para impressao 3D\nbpy.ops.wm.stl_export(\n    filepath='/tmp/peca.stl',\n    export_selected_objects=True,\n    apply_modifiers=True,\n)",
      },
      {
        lang: "atalho",
        code: "Shift+F1 → Append (importar de outro .blend)  |  Ctrl+L → Link (referência viva)",
      },
    ],
    points: [
      "**ArchViz** é uma das maiores oportunidades de mercado para iniciantes no Brasil",
      "**Animação 2D no Grease Pencil** é um nicho com pouca concorrência e demanda crescente",
      "**Modelagem para games** combina muito bem com Unity, Unreal e Godot",
      "**Impressão 3D** tem barreira de entrada baixa e mercado físico real",
      "**Motion graphics** paga bem e o Blender já compete de igual com C4D",
      "**Não tente abraçar tudo**: especialize antes de generalizar",
      "**Showreels** no YouTube e ArtStation são ótimos para descobrir seu estilo",
    ],
    alerts: [
      {
        type: "tip",
        content: "Antes de gastar meses estudando uma área, **faça um teste de 1 semana** assistindo tutoriais introdutórios. Se você não se diverte, mude o foco.",
      },
      {
        type: "warning",
        content: "**Cuidado com a síndrome do tutorial infinito**: assistir aula não é praticar. Modele algo seu pelo menos 1 vez por semana, mesmo que feio.",
      },
      {
        type: "info",
        content: "Plataformas como **ArtStation, Behance e Sketchfab** são vitrines profissionais. Comece a montar a sua desde os primeiros trabalhos.",
      },
    ],
  },
  {
    slug: "como-estudar-este-livro",
    section: "boas-vindas",
    title: "Como estudar este livro",
    difficulty: "iniciante",
    subtitle: "Um método simples, sustentável e à prova de desistência.",
    intro: `
Antes de virar a página e mergulhar no Blender de fato, vamos combinar **como** você vai usar este livro. Aprender 3D é uma jornada longa — pense em meses, não dias — e o segredo de quem chega ao fim não é talento ou tempo livre, é **constância**. Trinta minutos por dia, cinco dias por semana, vencem disparado dois finais de semana inteiros por mês com pausas de três semanas entre eles. Seu cérebro precisa de **repetição espaçada** para consolidar atalhos, conceitos e workflows.

A estrutura de cada capítulo é proposital. A **introdução longa** te dá o contexto e o "porquê". Os **blocos de código** trazem atalhos, passos práticos ou trechos em Python. Os **pontos-chave** são para você revisitar dias depois, como flashcards. Os **alertas** marcam dicas, armadilhas e celebrações. Leia tudo na ordem da primeira vez; depois, use como referência saltando direto ao bloco que precisa.

## O método dos 3 passos
Para cada capítulo, eu recomendo: **(1) Ler com o Blender fechado**, devagar, entendendo conceitos. **(2) Reler com o Blender aberto**, repetindo cada exemplo. **(3) Fazer um mini-projeto seu** aplicando o que aprendeu, sem olhar o livro. Esse terceiro passo é o que muda tudo. É difícil, mas é onde o aprendizado realmente acontece.

### O que NÃO fazer
Não pule capítulos por achar que "já sabe". Não fique trocando de software. Não compare seu trabalho de 3 meses com o de alguém de 10 anos. Não desista no primeiro render feio (todos são feios no começo). E o mais importante: **não estude sozinho para sempre** — entre em comunidades como o **Blender Brasil no Discord**, no Reddit \`r/blender\` ou nos grupos de Telegram. Aprender em grupo acelera tudo.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Defina um horário fixo no dia (ex: 19h às 19h30)\n2. Coloque o celular em outro cômodo\n3. Abra o livro no capítulo do dia\n4. Leia na primeira passada SEM tocar no Blender\n5. Releia abrindo o Blender e replicando exemplos\n6. Crie um mini-arquivo .blend com o que aprendeu\n7. Salve em pasta organizada por data: 2025-01-15_capX.blend\n8. Marque o capítulo como concluído no seu caderno",
      },
      {
        lang: "config",
        code: "# Estrutura de pastas recomendada\nblender-estudos/\n├── 01-boas-vindas/\n│   ├── 01-bem-vindo.blend\n│   └── notas.md\n├── 02-fundamentos/\n├── 03-modelagem/\n├── projetos-pessoais/\n└── referencias/        # imagens, PDFs, blueprints",
      },
      {
        lang: "atalho",
        code: "Ctrl+S → salvar  |  Ctrl+Shift+S → salvar como  |  Ctrl+Alt+S → save copy (versionar)",
      },
      {
        lang: "shell",
        code: "# Versionamento simples com git para projetos pessoais\ncd blender-estudos\ngit init\necho '*.blend1' > .gitignore   # ignora backups automaticos\ngit add .\ngit commit -m 'inicio dos estudos de Blender'",
      },
    ],
    points: [
      "**Constância vence intensidade**: 30 min/dia bate 5h no sábado",
      "**Leia primeiro sem o Blender aberto** para absorver conceitos",
      "**Releia replicando** os exemplos com o Blender aberto",
      "**Faça um mini-projeto** após cada capítulo, sem olhar o livro",
      "**Não pule capítulos** dos primeiros blocos, mesmo que pareçam óbvios",
      "**Entre em comunidades** — você aprende mais rápido em grupo",
      "**Salve sempre** com versionamento de pasta ou git",
      "**Comemore pequenas vitórias**: cada \`.blend\` salvo é progresso",
    ],
    alerts: [
      {
        type: "tip",
        content: "Mantenha um **caderno físico ou Notion** com perguntas que surgirem durante a leitura. Reveja semanalmente — você verá padrões nas suas dúvidas.",
      },
      {
        type: "danger",
        content: "**Nunca trabalhe horas sem salvar.** Quedas de energia, crashes e travamentos acontecem. Configure \`Edit → Preferences → Save & Load → Auto Save\` para 2 minutos.",
      },
      {
        type: "success",
        content: "Se você chegou até aqui, **já está à frente de 90% das pessoas** que baixam o Blender e desistem na primeira semana. Bora para o próximo capítulo!",
      },
    ],
  },
];
