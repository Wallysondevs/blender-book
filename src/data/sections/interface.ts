import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "tour-interface",
    section: "interface",
    title: "Tour pela Interface do Blender",
    difficulty: "iniciante",
    subtitle: "Um passeio guiado pelos painéis, menus e regiões da janela principal.",
    intro: `
Quando você abre o **Blender** pela primeira vez, é normal sentir um leve choque visual. A tela está cheia de painéis, ícones e abas que parecem competir pela sua atenção. Mas calma: por trás dessa aparente bagunça existe uma lógica muito bem pensada, e em poucas horas você vai navegar tudo isso com naturalidade. A ideia deste capítulo é fazer um passeio guiado, identificando cada região da janela e explicando para que ela serve, sem ainda exigir que você execute tarefas complexas.

A interface do Blender é dividida em **áreas** (areas), e cada área pode conter um **editor** diferente — por exemplo, a \`3D Viewport\` (o espaço tridimensional onde você modela), o \`Outliner\` (a lista hierárquica de tudo que existe na cena) e o \`Properties Editor\` (o painel de propriedades à direita). No topo está o \`Topbar\` com o menu principal, e na base o \`Status Bar\` com mensagens contextuais.

## Por que a interface parece "diferente"
Diferente de softwares como Maya ou 3ds Max, o Blender foi projetado para ser usado quase 100% com **atalhos de teclado**, e a interface não bloqueia janelas modais. Você pode ter quantas \`3D Viewports\` quiser ao mesmo tempo, redimensionar tudo e até trocar o tipo de qualquer painel a qualquer momento. Essa flexibilidade é a maior força do Blender — e a fonte da confusão inicial.

Ao final deste capítulo você saberá nomear cada parte da tela, o que prepara o terreno para os próximos capítulos sobre áreas, workspaces e personalização.
    `,
    codes: [
      { lang: "atalho", code: "T → painel de ferramentas (Toolbar)\nN → painel lateral (Sidebar)\nF3 → busca por comandos (Menu Search)\nCtrl+Espaço → maximizar a área sob o cursor" },
      { lang: "passo-a-passo", code: "1. Abra o Blender e feche a janela de splash clicando fora dela.\n2. Identifique a 3D Viewport no centro.\n3. Olhe à direita: em cima está o Outliner, embaixo o Properties.\n4. Na base da tela, veja a Timeline.\n5. Passe o mouse sobre cada ícone — um tooltip explica a função." },
      { lang: "python", code: "import bpy\n\n# Lista todas as áreas da janela atual e o tipo de editor de cada uma\nfor area in bpy.context.screen.areas:\n    print(area.type, area.width, area.height)" },
    ],
    points: [
      "**Área**: cada retângulo da tela é uma área independente, redimensionável.",
      "**Editor**: o tipo de conteúdo dentro da área (3D Viewport, Outliner, etc.).",
      "**Topbar**: contém os menus File, Edit, Render, Window, Help e os Workspaces.",
      "**Status Bar**: mostra dicas de mouse e estatísticas da cena.",
      "Você pode trocar o editor de qualquer área pelo botão no canto superior esquerdo dela.",
      "Armadilha comum: clicar fora da Viewport e perder o foco — atalhos só funcionam com o mouse sobre a área correta.",
    ],
    alerts: [
      { type: "tip", content: "Sempre que se perder, pressione `F3` e digite o que quer fazer — o **Menu Search** é seu melhor amigo." },
      { type: "info", content: "O Blender usa o conceito de **hover focus**: o atalho age na área embaixo do cursor, não na que está 'selecionada'." },
      { type: "warning", content: "Não tente memorizar tudo de uma vez. Aprenda 3 atalhos por dia e em um mês você voa." },
    ],
  },
  {
    slug: "areas-editores",
    section: "interface",
    title: "Áreas e Editores",
    difficulty: "iniciante",
    subtitle: "Como dividir, juntar e trocar o tipo de cada painel da tela.",
    intro: `
No Blender, tudo o que você vê na tela vive dentro de uma **área**. Uma área é simplesmente um retângulo redimensionável que hospeda um **editor**. Pense em uma área como uma "vaga" e no editor como o "carro" estacionado nela. Você pode trocar o carro a qualquer momento, dividir a vaga em duas, ou juntar duas vagas em uma maior. Essa modularidade é o que torna o Blender tão adaptável a fluxos diferentes — modelagem, animação, edição de vídeo, escultura, tudo no mesmo software.

Cada área tem, no canto superior esquerdo, um pequeno ícone que indica o tipo de editor ativo. Clicando nele você abre um menu com **mais de 20 tipos de editores**: \`3D Viewport\`, \`Image Editor\`, \`UV Editor\`, \`Shader Editor\`, \`Geometry Nodes\`, \`Video Sequencer\`, \`Dope Sheet\`, \`Graph Editor\`, \`Text Editor\`, \`Python Console\`, e por aí vai. Trocar de tipo é instantâneo.

## Dividir e juntar áreas
Para **dividir** uma área, leve o mouse até qualquer borda dela até o cursor virar uma cruz, então clique-arraste para dentro. Para **juntar**, faça o mesmo movimento mas arraste em direção à área vizinha — uma seta indicará qual área será absorvida. Esse gesto parece estranho no começo, mas em poucos dias vira automático.

Você também pode **destacar** uma área em uma janela flutuante segurando \`Shift\` ao arrastar o canto, útil em monitores múltiplos.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Leve o mouse até a borda entre duas áreas.\n2. Quando o cursor virar uma seta dupla, clique-arraste para redimensionar.\n3. Para dividir: clique-arraste a partir do canto (ícone de listras) para dentro.\n4. Para juntar: clique-arraste a partir do canto em direção à área vizinha.\n5. Solte quando aparecer a seta indicando a fusão." },
      { lang: "atalho", code: "Ctrl+Espaço → maximizar/restaurar a área sob o cursor\nCtrl+Alt+Espaço → tela cheia (sem header)\nShift+arrastar canto → destacar área em janela flutuante" },
      { lang: "python", code: "import bpy\n\n# Troca o tipo da primeira área para Image Editor\nbpy.context.screen.areas[0].type = 'IMAGE_EDITOR'\n\n# Tipos comuns: 'VIEW_3D', 'OUTLINER', 'PROPERTIES',\n# 'IMAGE_EDITOR', 'NODE_EDITOR', 'TEXT_EDITOR', 'CONSOLE'" },
      { lang: "config", code: "Editor types mais usados:\n  VIEW_3D       → 3D Viewport\n  OUTLINER      → Outliner\n  PROPERTIES    → Properties Editor\n  NODE_EDITOR   → Shader/Geometry/Compositor Nodes\n  DOPESHEET_EDITOR → Dope Sheet / Action Editor" },
    ],
    points: [
      "**Área** é o container; **editor** é o conteúdo — um não existe sem o outro.",
      "Qualquer área pode virar qualquer editor, sem perder o trabalho.",
      "Divisões e fusões são feitas arrastando bordas e cantos, não por menus.",
      "Em monitores grandes, dividir a tela em 4 áreas (modelagem, UV, shader, preview) acelera muito o fluxo.",
      "Cada editor tem seu próprio **header** com menus específicos.",
      "Armadilha: ao 'sumir' uma área por engano, basta dividir uma vizinha e trocar o tipo.",
    ],
    alerts: [
      { type: "tip", content: "Crie o hábito de **maximizar** com `Ctrl+Espaço` quando precisar focar em uma tarefa — depois restaure com o mesmo atalho." },
      { type: "info", content: "Não existe 'salvar layout' separado: o layout faz parte do arquivo `.blend` ou do **Workspace** ativo." },
    ],
  },
  {
    slug: "workspaces",
    section: "interface",
    title: "Workspaces: Layouts Prontos para Cada Tarefa",
    difficulty: "iniciante",
    subtitle: "Abas no topo que trocam toda a interface conforme o que você está fazendo.",
    intro: `
Você já reparou nas abas no topo da tela: \`Layout\`, \`Modeling\`, \`Sculpting\`, \`UV Editing\`, \`Texture Paint\`, \`Shading\`, \`Animation\`, \`Rendering\`, \`Compositing\`, \`Geometry Nodes\`, \`Scripting\`? Essas abas são chamadas de **Workspaces**, e cada uma é um arranjo pré-configurado de áreas e editores otimizado para uma etapa do processo de produção. Ao clicar em \`Sculpting\`, por exemplo, a tela inteira reorganiza para mostrar a 3D Viewport ampliada, com pincéis e ferramentas de escultura visíveis.

Os Workspaces são uma forma genial de **separar contextos mentais**. Você não precisa ficar arrumando painéis toda vez que troca de tarefa — o Blender já tem um layout pronto, e você pode personalizar ou criar os seus.

## Criando seu próprio Workspace
Clique no ícone \`+\` ao lado da última aba. Você pode duplicar um existente (\`Duplicate Current\`) ou começar de um template. Renomeie clicando duas vezes no nome da aba. Para deletar, clique direito sobre a aba e escolha \`Delete\`.

Workspaces são salvos dentro do arquivo \`.blend\`, mas você pode marcá-los como padrão indo em \`File → Defaults → Save Startup File\` (\`Ctrl+U\`), assim toda vez que abrir o Blender seus Workspaces estarão lá.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl+PageUp / Ctrl+PageDown → alternar entre Workspaces\nClique duplo na aba → renomear\nClique direito na aba → menu de contexto (duplicar, deletar, reordenar)" },
      { lang: "passo-a-passo", code: "1. Clique no '+' à direita da última aba.\n2. Escolha 'General → 3D Viewport' ou duplique o Layout atual.\n3. Reorganize as áreas como preferir (dividir, juntar, trocar tipos).\n4. Clique duplo na aba e renomeie para algo como 'Meu Modeling'.\n5. Vá em File → Defaults → Save Startup File para tornar permanente." },
      { lang: "python", code: "import bpy\n\n# Lista todos os workspaces do arquivo\nfor ws in bpy.data.workspaces:\n    print(ws.name)\n\n# Trocar para o workspace 'Sculpting'\nbpy.context.window.workspace = bpy.data.workspaces['Sculpting']" },
    ],
    points: [
      "**Workspace** = uma combinação salva de áreas, editores e suas configurações.",
      "Os 11 Workspaces padrão cobrem quase todo o pipeline 3D.",
      "Trocar de Workspace **não** afeta a cena, só a forma como você a vê.",
      "Você pode ter Workspaces específicos por projeto salvos no `.blend`.",
      "Use `Ctrl+PageUp/Down` para alternar rapidamente sem tirar o mouse da viewport.",
      "Armadilha: editar um Workspace padrão e não salvar como Startup File — ao reabrir o Blender, suas mudanças somem.",
    ],
    alerts: [
      { type: "tip", content: "Crie um Workspace **Reference** com um Image Editor grande para olhar fotos enquanto modela." },
      { type: "success", content: "Quando seu fluxo estabilizar, salve o **Startup File** com `Ctrl+U` — você vai economizar minutos toda semana." },
      { type: "warning", content: "Não confunda Workspace com Scene: trocar de aba não cria nem apaga objetos." },
    ],
  },
  {
    slug: "outliner",
    section: "interface",
    title: "Outliner: A Lista de Tudo na Cena",
    difficulty: "iniciante",
    subtitle: "Sua árvore hierárquica de objetos, coleções, materiais e mais.",
    intro: `
O **Outliner** é o painel, normalmente no canto superior direito, que lista de forma hierárquica **todos os elementos da cena**: objetos, coleções, materiais, câmeras, luzes, modificadores, mundos, scripts, tudo. Ele é o equivalente ao "Layers panel" do Photoshop ou ao "Hypergraph" do Maya — uma visão de pássaro do projeto inteiro.

No topo do Outliner há um seletor de **modo de exibição**: o padrão é \`View Layer\`, que mostra apenas o que está na cena visível. Você também pode escolher \`Blender File\` (vê tudo o que existe no arquivo, mesmo o não usado), \`Orphan Data\` (dados órfãos prontos para limpeza), \`Data API\` (acesso direto à árvore Python do bpy), entre outros.

## Coleções: o sistema de pastas do Blender
Desde o Blender 2.8, objetos são organizados em **Collections** (coleções), que funcionam como pastas. Você pode aninhar coleções, ocultar/mostrar todas de uma vez (\`H\`), desativar para render (ícone de câmera) e até instanciar uma coleção em outro lugar da cena. Aprender a usar coleções desde cedo evita projetos que viram uma sopa de objetos com nomes como \`Cube.001\`, \`Cube.002\`, \`Cube.003\`.

Use o campo de busca no topo do Outliner para filtrar por nome — economiza muito tempo em cenas grandes.
    `,
    codes: [
      { lang: "atalho", code: "H → ocultar selecionado na viewport\nAlt+H → mostrar tudo\nM → mover para coleção\nShift+clique → expandir/colapsar todos os filhos\nF2 (sobre o nome) → renomear" },
      { lang: "passo-a-passo", code: "1. No Outliner, clique direito → New Collection.\n2. Renomeie clicando duplo (ex.: 'Personagens').\n3. Selecione objetos na viewport e pressione M → escolha 'Personagens'.\n4. Clique no ícone de olho para ocultar a coleção.\n5. Clique no ícone de câmera para excluir do render." },
      { lang: "python", code: "import bpy\n\n# Cria uma nova coleção e move um objeto para ela\nnova = bpy.data.collections.new('Personagens')\nbpy.context.scene.collection.children.link(nova)\n\nobj = bpy.data.objects['Cube']\nfor c in obj.users_collection:\n    c.objects.unlink(obj)\nnova.objects.link(obj)" },
      { lang: "config", code: "Ícones do Outliner (da esquerda para a direita):\n  Olho        → visibilidade na viewport\n  Cursor      → selecionável\n  Tela        → renderiza no Render Final\n  Câmera      → renderiza na preview" },
    ],
    points: [
      "**Outliner** lista TUDO da cena de forma hierárquica.",
      "**Collections** são pastas que substituíram as antigas Layers do Blender 2.7x.",
      "Um objeto pode estar em múltiplas coleções simultaneamente.",
      "Ocultar com `H` na viewport ≠ excluir do render — são propriedades independentes.",
      "Use o filtro de busca para encontrar objetos em cenas grandes.",
      "Armadilha: deletar uma coleção **não** deleta os objetos dentro — a menos que você use 'Delete Hierarchy'.",
    ],
    alerts: [
      { type: "tip", content: "Crie coleções por **função** (Personagens, Cenário, Luzes, Câmeras) desde o início do projeto." },
      { type: "info", content: "O modo `Orphan Data` no Outliner mostra dados sem usuários — útil para limpar o `.blend` antes de exportar." },
    ],
  },
  {
    slug: "properties-editor",
    section: "interface",
    title: "Properties Editor: O Painel de Propriedades",
    difficulty: "iniciante",
    subtitle: "Onde você ajusta render, modificadores, materiais, físicas e tudo mais.",
    intro: `
À direita da tela, abaixo do Outliner, fica o **Properties Editor** — uma coluna de ícones verticais que abre, cada um, uma aba diferente de configurações. É aqui que mora 80% do que você vai mexer no Blender depois das transformações básicas: configurações de render, dimensões da imagem final, modificadores aplicados a um objeto, materiais, texturas, físicas, partículas, restrições e muito mais.

Cada ícone representa um **contexto**: a chapinha de filme branco é \`Render Properties\`, a impressora é \`Output Properties\`, a chave inglesa é \`Modifier Properties\`, a esfera xadrez é \`Material Properties\`, e por aí vai. As abas mudam conforme o objeto selecionado — uma luz mostra propriedades diferentes de uma câmera, que mostra diferentes de um mesh.

## A lógica das abas
As abas seguem uma ordem do **global para o local**: as primeiras (\`Render\`, \`Output\`, \`View Layer\`, \`Scene\`, \`World\`) afetam a cena inteira; as do meio (\`Object\`, \`Modifiers\`, \`Particles\`, \`Physics\`, \`Constraints\`) afetam o objeto ativo; as finais (\`Object Data\`, \`Material\`, \`Texture\`) afetam os dados internos do objeto.

Reservar 10 minutos só para clicar em cada aba e ler os tooltips já adianta semanas de aprendizado. Você não precisa entender tudo agora — só precisa **saber onde fica**.
    `,
    codes: [
      { lang: "atalho", code: "N (na viewport) → abre Sidebar com propriedades rápidas\nClique direito sobre uma propriedade → Copy/Paste, Reset, Add Driver\nCtrl+clique em slider → digitar valor exato\nShift+clique em slider → arrastar com precisão" },
      { lang: "passo-a-passo", code: "1. Selecione o cubo padrão na viewport.\n2. No Properties à direita, clique no ícone de chave inglesa (Modifiers).\n3. Clique em 'Add Modifier' → Generate → Subdivision Surface.\n4. Ajuste 'Viewport' para 2 e veja o cubo arredondar.\n5. Vá na aba Material (esfera xadrez) e clique em '+ New' para criar um material." },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.object\n\n# Adiciona um modificador Subdivision Surface via Python\nmod = obj.modifiers.new(name='Subdiv', type='SUBSURF')\nmod.levels = 2          # viewport\nmod.render_levels = 3   # render final" },
      { lang: "config", code: "Abas do Properties (de cima para baixo):\n  Render        → engine, samples, denoising\n  Output        → resolução, frame range, formato\n  View Layer    → passes para composição\n  Scene         → unidades, gravidade\n  World         → HDRI, cor de fundo\n  Object        → transform, display\n  Modifiers     → pilha de modificadores\n  Particles     → sistemas de partículas\n  Physics       → rigid body, cloth, fluid\n  Object Data   → mesh, vertex groups, shape keys\n  Material      → shaders e nodes" },
    ],
    points: [
      "Os ícones são **abas de contexto**, não menus — clique para trocar de painel.",
      "As abas mudam conforme o **tipo** do objeto selecionado.",
      "**Render Properties** é onde você escolhe entre Eevee, Cycles e Workbench.",
      "**Output Properties** define resolução, FPS, frame inicial/final e formato do arquivo.",
      "**Modifier Properties** é uma pilha — a ordem importa muito.",
      "Armadilha: alterar 'Resolution' em Output sem mexer em 'Resolution %' — o render sai pequeno mesmo com res alta.",
    ],
    alerts: [
      { type: "tip", content: "Clique direito em qualquer slider e escolha **Copy Data Path** para usar em drivers ou scripts Python." },
      { type: "info", content: "A largura do Properties pode ser reduzida — quando fica muito estreito, ele vira só ícones, economizando espaço." },
      { type: "warning", content: "Mudanças no **Render Properties** afetam toda a cena. Para configurações por câmera, use Markers ou Scenes separadas." },
    ],
  },
  {
    slug: "timeline",
    section: "interface",
    title: "Timeline: O Editor de Tempo",
    difficulty: "iniciante",
    subtitle: "A faixa horizontal na base da tela onde a animação acontece.",
    intro: `
Na base da janela, ocupando a faixa horizontal estreita, está a **Timeline**. Mesmo que você ainda não pense em fazer animação, este editor é importante porque controla o **tempo da cena**: o frame atual, o intervalo de reprodução, os controles de play/pause/stop e a inserção de **keyframes** (quadros-chave que registram valores em pontos específicos do tempo).

A Timeline mostra uma régua de frames numerada. A linha azul vertical é o **playhead** (cabeça de reprodução), indicando o frame atual. Você pode arrastá-la com o mouse, ou usar as setas para avançar/retroceder. O número à esquerda no campo \`Current Frame\` também aceita digitação direta.

## Frame range e FPS
Em \`Output Properties\` você define \`Frame Start\`, \`Frame End\` e \`Frame Rate\` (FPS — frames por segundo). O padrão é 1–250 a 24 FPS, ou seja, ~10 segundos. Para vídeo do YouTube use 24 ou 30 FPS; para cinema, 24; para slow motion, 60+.

## Inserindo keyframes
Selecione um objeto, posicione o playhead no frame desejado, mude um valor (posição, rotação, escala) e pressione \`I\` sobre a viewport. Um menu pergunta o que registrar — escolha \`Location\`, \`Rotation\`, \`Scale\` ou \`LocRotScale\`. Pronto: você acabou de criar seu primeiro keyframe. A Timeline mostrará um diamante laranja no frame correspondente.
    `,
    codes: [
      { lang: "atalho", code: "Espaço → play/pause da animação\nSeta esquerda/direita → avança/retrocede 1 frame\nShift+Seta → vai para o início/fim\nI → insere keyframe (sobre a viewport)\nAlt+I → remove keyframe" },
      { lang: "passo-a-passo", code: "1. Selecione o cubo. Vá ao frame 1 na Timeline.\n2. Pressione I → escolha 'Location'. Apareceu um diamante laranja.\n3. Vá ao frame 60. Mova o cubo com G para outro lugar.\n4. Pressione I → 'Location' de novo.\n5. Pressione Espaço — o cubo se anima entre os dois pontos." },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.object\n\n# Insere keyframe na posição do frame atual\nobj.keyframe_insert(data_path='location', frame=1)\n\nobj.location.x = 5\nobj.keyframe_insert(data_path='location', frame=60)" },
      { lang: "config", code: "Output Properties → Format:\n  Frame Start: 1\n  Frame End:   250\n  Frame Rate:  24 fps  (cinema) / 30 fps (vídeo)\n  Resolution:  1920 x 1080" },
    ],
    points: [
      "**Playhead** é a barra azul vertical = frame atual.",
      "**Keyframe** = valor registrado em um frame específico; entre eles o Blender interpola.",
      "FPS define quantos frames formam um segundo de animação.",
      "Pressionar `I` sobre uma propriedade insere keyframe daquela propriedade especificamente.",
      "Diamantes na Timeline indicam os keyframes do objeto selecionado.",
      "Armadilha: animar e esquecer de ajustar `Frame End` — o render só vai até onde o range manda.",
    ],
    alerts: [
      { type: "tip", content: "Use **Auto Keying** (ícone de círculo vermelho ao lado do play) para inserir keyframes automaticamente sempre que mover algo." },
      { type: "info", content: "Para edição de curvas finas (easing, bouncing) use o **Graph Editor**; a Timeline serve para visão geral." },
    ],
  },
  {
    slug: "customizar-layout",
    section: "interface",
    title: "Customizando seu Layout",
    difficulty: "iniciante",
    subtitle: "Ajuste o Blender para refletir o jeito que você trabalha.",
    intro: `
Agora que você conhece áreas, editores e Workspaces, é hora de **fazer o Blender ser seu**. Customizar o layout não é frescura — é uma das diferenças entre um iniciante que luta com a ferramenta e um artista que voa nela. Com 30 minutos de ajuste inicial você pode economizar **horas** ao longo de um projeto.

A customização envolve três camadas: (1) **layout das áreas** (onde fica o quê), (2) **preferências da interface** em \`Edit → Preferences\` (cores, fontes, comportamento), e (3) **Startup File** — o estado salvo que aparece toda vez que você abre o Blender ou clica em \`File → New\`.

## Salvando suas preferências
Depois de organizar tudo do seu jeito, vá em \`File → Defaults → Save Startup File\` (\`Ctrl+U\`). Isso salva o layout, os Workspaces, as configurações da cena padrão e até os objetos que estiverem na viewport. Quer voltar ao padrão de fábrica? \`File → Defaults → Load Factory Settings\`.

## Salvando preferências separadamente
As preferências (atalhos, addons, temas) ficam em outro arquivo, no diretório \`config\` do Blender (\`%APPDATA%/Blender Foundation/Blender/<versão>/config\` no Windows, \`~/.config/blender/<versão>/config\` no Linux). Salve com \`Save Preferences\` na janela de Preferences. Dica: faça backup desse diretório.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl+U → Save Startup File\nCtrl+Alt+U → abrir Preferences\nF3 + 'Load Factory Settings' → resetar tudo" },
      { lang: "passo-a-passo", code: "1. Organize as áreas como prefere (divida, junte, troque tipos).\n2. Crie/personalize seus Workspaces.\n3. Vá em Edit → Preferences e ative addons úteis (ex.: Node Wrangler, LoopTools).\n4. Clique em 'Save Preferences' no canto inferior esquerdo da janela.\n5. Feche Preferences e pressione Ctrl+U para salvar o Startup File." },
      { lang: "python", code: "import bpy\n\n# Salvar Startup File via script\nbpy.ops.wm.save_homefile()\n\n# Salvar preferências (addons, temas, atalhos)\nbpy.ops.wm.save_userpref()" },
      { lang: "shell", code: "# Backup das preferências (Linux/macOS)\ncp -r ~/.config/blender/4.2/config ~/blender-backup-$(date +%Y%m%d)\n\n# Windows (PowerShell)\nCopy-Item -Recurse \"$env:APPDATA\\Blender Foundation\\Blender\\4.2\\config\" \"$env:USERPROFILE\\blender-backup\"" },
    ],
    points: [
      "**Startup File** = estado padrão da cena (layout + objetos + cena).",
      "**Preferences** = configurações globais (temas, atalhos, addons, paths).",
      "Ative o **Auto Save Preferences** em `Preferences → Save & Load` para salvar automaticamente.",
      "Faça **backup** da pasta `config` regularmente.",
      "Você pode ter múltiplos Startup Files trocando manualmente o arquivo `startup.blend`.",
      "Armadilha: salvar Startup File com a câmera deletada — toda nova cena começa sem câmera.",
    ],
    alerts: [
      { type: "tip", content: "Antes de instalar addons experimentais, faça backup do `config`. Restaurar é simples: copiar de volta." },
      { type: "warning", content: "`Load Factory Settings` apaga sua customização atual da sessão. Salve antes se quiser preservar." },
      { type: "success", content: "Um Startup File bem configurado é como um avental ajustado: muda sua produtividade para sempre." },
    ],
  },
  {
    slug: "temas-cores",
    section: "interface",
    title: "Temas e Cores da Interface",
    difficulty: "intermediario",
    subtitle: "Personalize a aparência visual do Blender — desde cor de fundo até realces.",
    intro: `
A aparência do Blender é controlada por um sistema de **Temas** (Themes) acessível em \`Edit → Preferences → Themes\`. Você pode escolher um tema pronto no dropdown do topo (\`Blender Dark\`, \`Blender Light\`, \`Deep Grey\`, \`Maya\`, \`White\`, etc.) ou ajustar **cada cor individualmente** — fundo da viewport, cor do gizmo, destaque do objeto selecionado, cor do texto dos painéis, tudo.

Para iniciantes pode parecer cosmético, mas tema certo reduz **fadiga visual** em sessões longas e melhora a leitura de elementos críticos como bordas de seleção e wireframes. Quem trabalha 8h/dia em frente ao Blender entende rapidinho.

## Importando e exportando temas
Você pode salvar seu tema personalizado clicando em \`Save As\` no canto superior direito da aba Themes. O arquivo \`.xml\` gerado pode ser compartilhado ou versionado. Para carregar um tema baixado, use \`Install\` e aponte para o \`.xml\`. A comunidade tem ótimos temas no \`blenderartists.org\` e em repositórios do GitHub.

## Cores além dos temas
Algumas cores não vêm dos temas e sim das **Preferences → Viewport** ou diretamente da \`World Properties\` da cena (ex.: cor do fundo HDRI). Não confunda: tema pinta a UI; viewport e world afetam a cena 3D em si.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Abra Edit → Preferences → Themes.\n2. No dropdown 'Presets', escolha 'Blender Dark' (ou outro).\n3. Para customizar, role e clique em 'Theme Space' → '3D Viewport'.\n4. Ajuste 'Gradient High/Off' para mudar o fundo.\n5. Clique em 'Save As' para exportar; 'Install' para importar." },
      { lang: "config", code: "Cores que valem a pena ajustar:\n  3D Viewport → Gradient: cor de fundo\n  3D Viewport → Object Selected: realce do selecionado\n  3D Viewport → Active Object: realce do ativo (mais brilhante)\n  User Interface → Editor Outline: borda das áreas\n  Text Style → Widget Label: fonte dos textos" },
      { lang: "python", code: "import bpy\n\n# Acessa o tema atual e muda a cor do objeto selecionado\ntheme = bpy.context.preferences.themes['Default']\ntheme.view_3d.object_selected = (1.0, 0.5, 0.0)  # laranja vibrante\n\n# Salvar preferências\nbpy.ops.wm.save_userpref()" },
      { lang: "shell", code: "# Localização dos arquivos de tema (.xml) — Linux\nls ~/.config/blender/4.2/scripts/presets/interface_theme/\n\n# Windows\ndir \"%APPDATA%\\Blender Foundation\\Blender\\4.2\\scripts\\presets\\interface_theme\"" },
    ],
    points: [
      "**Theme** controla cores da UI; **World** e **Viewport Shading** controlam cores da cena 3D.",
      "Temas vêm em arquivos `.xml` — fáceis de versionar e compartilhar.",
      "Aumente o contraste do **Object Selected** se você se perde na seleção.",
      "Para apresentações, troque para `Blender Light` — fica mais legível em projetor.",
      "Algumas cores afetam só uma área (Outliner, Sequencer) — explore aba por aba.",
      "Armadilha: salvar mudanças de tema mas esquecer de salvar Preferences — ao reabrir, voltam ao default.",
    ],
    alerts: [
      { type: "tip", content: "Aumente o **font size** em `Preferences → Interface → Display` se trabalha em monitor 4K." },
      { type: "info", content: "O ícone `↺` ao lado de cada cor reseta para o valor padrão do tema atual." },
    ],
  },
  {
    slug: "modos-objeto-edicao",
    section: "interface",
    title: "Modos: Object Mode vs Edit Mode (e os outros)",
    difficulty: "intermediario",
    subtitle: "A diferença crucial entre manipular objetos e editar sua geometria.",
    intro: `
No Blender, a viewport opera em **modos** diferentes, e isso é provavelmente a fonte número um de confusão para iniciantes vindos de outros softwares. O modo padrão é o \`Object Mode\` (Modo Objeto), onde você manipula objetos como um todo — move, gira, escala, duplica. Mas quando você quer **editar a geometria** (mexer em vértices, arestas e faces), precisa entrar em \`Edit Mode\` (Modo Edição).

A troca é feita pelo seletor no canto superior esquerdo da viewport, ou — muito mais rápido — com a tecla \`Tab\`. Pressione Tab uma vez para entrar em Edit Mode, Tab de novo para voltar ao Object Mode.

## Outros modos importantes
Além desses dois, existem: \`Sculpt Mode\` (escultura digital, para meshes), \`Vertex Paint\`, \`Weight Paint\` (pintura de pesos para rigging), \`Texture Paint\`, \`Edit Mode\` para curvas e armatures (com nomes ligeiramente diferentes), e \`Pose Mode\` (para animar esqueletos). Cada modo libera um conjunto de ferramentas específicas no \`Toolbar\` esquerdo (\`T\`).

## Por que isso existe?
Separar modos evita acidentes. Em Object Mode você não consegue mover um vértice por engano; em Edit Mode você não consegue duplicar o objeto inteiro com \`Shift+D\` quando queria duplicar uma face. É uma trava de segurança contextual.

Atenção: cada modo tem seu **próprio conjunto de atalhos**. \`E\` em Object Mode não faz nada útil; em Edit Mode é o famoso **Extrude**.
    `,
    codes: [
      { lang: "atalho", code: "Tab → alterna Object/Edit Mode\nCtrl+Tab → menu Pie de modos (rápido para Sculpt, Pose, etc.)\n1, 2, 3 (em Edit Mode) → modo de seleção: vértice, aresta, face\nA → selecionar tudo\nAlt+A → desselecionar tudo" },
      { lang: "passo-a-passo", code: "1. Selecione o cubo padrão. Você está em Object Mode.\n2. Pressione Tab → entrou em Edit Mode (vê os vértices).\n3. Pressione 2 para modo de aresta.\n4. Selecione uma aresta superior, pressione G + Z e arraste para cima.\n5. Tab para voltar e ver o resultado em Object Mode." },
      { lang: "python", code: "import bpy\n\n# Mudar de modo via Python\nbpy.ops.object.mode_set(mode='EDIT')\n# modos válidos: 'OBJECT', 'EDIT', 'SCULPT',\n# 'VERTEX_PAINT', 'WEIGHT_PAINT', 'TEXTURE_PAINT',\n# 'POSE' (apenas em armatures)\n\nbpy.ops.object.mode_set(mode='OBJECT')" },
      { lang: "config", code: "Modos disponíveis por tipo de objeto:\n  Mesh      → Object, Edit, Sculpt, Vertex/Weight/Texture Paint\n  Curve     → Object, Edit\n  Armature  → Object, Edit, Pose\n  Lattice   → Object, Edit\n  Empty     → apenas Object" },
    ],
    points: [
      "**Object Mode**: manipula objetos como um todo (mover, girar, escalar, duplicar).",
      "**Edit Mode**: edita a geometria interna (vértices, arestas, faces).",
      "`Tab` é o atalho universal entre Object e Edit.",
      "Cada modo tem seu próprio Toolbar e atalhos.",
      "Você só pode entrar em Edit Mode com **um objeto selecionado** (ou múltiplos do mesmo tipo).",
      "Armadilha clássica: tentar usar `Shift+D` para duplicar em Edit Mode — duplica só a geometria selecionada, não o objeto.",
    ],
    alerts: [
      { type: "tip", content: "Pressione `Ctrl+Tab` para abrir o **Pie Menu** de modos — visualmente mais rápido que o dropdown." },
      { type: "warning", content: "Mudanças em Edit Mode afetam **todos os objetos** que compartilham o mesmo mesh data (instâncias com `Alt+D`)." },
      { type: "info", content: "Em Edit Mode, atalhos como `E` (extrude), `I` (inset) e `K` (knife) são pilares da modelagem." },
    ],
  },
  {
    slug: "header-status-bar",
    section: "interface",
    title: "Header e Status Bar: As Faixas que Você Quase Ignora",
    difficulty: "avancado",
    subtitle: "Pequenas, mas cheias de informação contextual e atalhos visuais.",
    intro: `
Vamos terminar essa trilha falando das duas faixas mais discretas — e mais subutilizadas — da interface: o **Header** e o **Status Bar**. Cada área tem seu próprio Header (uma faixa fina no topo ou na base com menus específicos do editor), e a janela inteira tem um **Status Bar** na base com estatísticas, mensagens e atalhos contextuais.

O Header da \`3D Viewport\`, por exemplo, contém: o seletor de **modo** (Object/Edit/Sculpt), o seletor de **shading** (Wireframe, Solid, Material Preview, Rendered), os menus \`View\`, \`Select\`, \`Add\`, \`Object\`, e os \`Gizmos\` (controles visuais de transformação). Conhecer cada botão acelera muito a navegação.

## Status Bar: o oráculo escondido
O Status Bar mostra, da esquerda para a direita: a **versão do Blender**, dicas contextuais (ex.: "Click: Select | Shift+Click: Extend"), e — clicando direito sobre ele — você pode habilitar exibir **estatísticas da cena** (vértices, faces, objetos), **uso de memória**, **tempo de render**, **versão do Blender** e **playback FPS** durante animação. É uma fonte preciosa de informação para diagnosticar lentidão.

## Header customizável
Você pode mover o Header de cada área para o **topo** ou para a **base** clicando direito sobre ele e escolhendo \`Flip to Bottom\`/\`Flip to Top\`. Animadores costumam mover o Header da Timeline para baixo para liberar espaço acima. Detalhe pequeno, ergonomia grande.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Clique direito no Status Bar (faixa cinza na base da janela).\n2. Marque 'Scene Statistics' e 'System Memory'.\n3. Volte à viewport — agora você vê quantos vértices/faces tem a cena.\n4. Clique direito no Header da 3D Viewport → 'Flip to Bottom' (opcional).\n5. Note como menus e botões agora ficam na base do editor." },
      { lang: "atalho", code: "Alt+F10 → tela cheia (esconde Topbar e Status Bar)\nClique direito em Header → menu de contexto (flip, hide)\nF12 → render still (resultado aparece em janela separada)\nCtrl+F12 → render animation" },
      { lang: "python", code: "import bpy\n\n# Habilitar exibição de estatísticas na Status Bar\nview = bpy.context.preferences.view\nview.show_statusbar_stats = True\nview.show_statusbar_memory = True\nview.show_statusbar_vram = True\nview.show_statusbar_version = True\n\nbpy.ops.wm.save_userpref()" },
      { lang: "config", code: "Status Bar — opções via clique direito:\n  Scene Statistics → contagem de objetos/vértices/faces\n  Scene Duration   → comprimento da animação\n  System Memory    → RAM usada pelo Blender\n  Video Memory     → VRAM da GPU\n  Blender Version  → útil para reportar bugs\n  Extra Info       → mensagens do desenvolvedor" },
    ],
    points: [
      "**Header** é a faixa de menus de cada área (única por editor).",
      "**Status Bar** é a faixa global na base da janela inteira.",
      "Estatísticas no Status Bar ajudam a diagnosticar **performance** e **uso de memória**.",
      "Você pode flipar o Header para topo/base por área.",
      "Em telas pequenas, esconda o Header com `Hide Header` para ganhar espaço.",
      "Armadilha avançada: esconder Header sem lembrar como mostrar — clique direito na borda fina onde ele estava para reativar.",
    ],
    alerts: [
      { type: "tip", content: "Habilite **VRAM** no Status Bar quando usar Cycles GPU — você verá em tempo real se está estourando memória." },
      { type: "info", content: "O Header da Timeline tem o **Auto Keying** (botão de círculo vermelho) — ative-o quando estiver animando muito." },
      { type: "success", content: "Domínio dessas faixinhas separa o iniciante do usuário fluente. Parabéns por chegar até aqui!" },
    ],
  },
];
