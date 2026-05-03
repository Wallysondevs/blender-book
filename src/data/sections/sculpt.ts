import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "sculpt-intro",
    section: "sculpt",
    title: "Introdução ao Sculpt Mode",
    difficulty: "iniciante",
    subtitle: "Entenda o que é esculpir digitalmente e por que o Blender é tão poderoso nisso.",
    intro: `
Imagine que você tem um pedaço de **argila digital** nas mãos. Em vez de mover vértices um a um, você passa um "pincel" pela superfície e empurra, puxa, alisa e belisca a malha como se fosse barro de verdade. Isso é o **Sculpt Mode** (Modo de Escultura) do Blender. Ele transforma o jeito de modelar: você deixa de pensar em geometria e começa a pensar em **forma, volume e silhueta**.

O Sculpt Mode nasceu para competir com programas como **ZBrush** e **Mudbox**, que dominaram o mercado de personagens e criaturas por anos. Hoje, o Blender oferece pincéis, máscaras, simetria e até remalhamento automático com qualidade profissional — e tudo isso de graça. Você verá que muitos artistas já usam só o Blender para esculpir bustos, monstros, roupas detalhadas e props orgânicos.

## Quando usar Sculpt em vez de Edit Mode?
Use **Sculpt Mode** quando a forma for **orgânica** (rostos, animais, panos, rochas) ou quando você precisar de **muito detalhe** (poros, rugas, escamas). Use **Edit Mode** quando a forma for **dura e geométrica** (carros, prédios, cadeiras), pois lá você controla cada vértice com precisão milimétrica.

Ao longo desta trilha, você vai dominar pincéis, máscaras, **Dyntopo**, **Multiresolution**, **Remesh** e até retopologia. No fim, você terá esculpido sua primeira cabeça humana e exportado um modelo limpo para usar em qualquer engine ou render. Respire fundo: vamos brincar de barro digital.
    `,
    codes: [
      { lang: "atalho", code: "Tab → trocar entre Object/Edit  |  Ctrl+Tab → menu de modos (escolha Sculpt)\nF → tamanho do pincel  |  Shift+F → força (strength)\nCtrl → inverter o pincel (puxar vira empurrar)" },
      { lang: "passo-a-passo", code: "1. Abra o Blender e apague o cubo padrão (X → Delete).\n2. Shift+A → Mesh → Ico Sphere para ter mais triângulos uniformes.\n3. Com a esfera selecionada, Ctrl+Tab → Sculpt Mode.\n4. Pressione F, arraste para definir um pincel médio, clique para confirmar.\n5. Pinte a esfera com cliques: você está esculpindo!" },
      { lang: "python", code: "import bpy\n\n# Entrar em Sculpt Mode via script\nbpy.ops.object.mode_set(mode='SCULPT')\n\n# Listar pincéis disponíveis\nfor brush in bpy.data.brushes:\n    if brush.use_paint_sculpt:\n        print(brush.name)" },
      { lang: "config", code: "Recomendações iniciais para o pincel Draw:\n  Radius: 50 px\n  Strength: 0.5\n  Auto-smooth: 0.1 (suaviza levemente cada pincelada)\n  Front Faces Only: ON (não esculpe o lado oposto)" },
    ],
    points: [
      "**Sculpt Mode** trata a malha como argila: você pinta volume em vez de mover vértices.",
      "Funciona melhor em malhas com **muitos polígonos** uniformes (Ico Sphere, Subdivided Cube, Multires).",
      "Os atalhos `F` (tamanho) e `Shift+F` (força) são seus melhores amigos — decore-os agora.",
      "Segurar `Ctrl` durante uma pincelada **inverte** o efeito (Draw vira Crease invertida, etc.).",
      "Sem geometria suficiente, o pincel parece 'não fazer nada': aumente a subdivisão ou use Dyntopo.",
      "Sculpt é ideal para **formas orgânicas**; geometria dura ainda é melhor em Edit Mode.",
    ],
    alerts: [
      { type: "tip", content: "Use uma **mesa digitalizadora** se possível — a sensibilidade à pressão é detectada automaticamente em `Brush Settings → Stroke`." },
      { type: "warning", content: "Não tente esculpir um cubo padrão de 8 vértices: você não verá efeito algum. Adicione subdivisões antes!" },
      { type: "info", content: "O Sculpt Mode é um dos módulos que mais evoluiu do Blender 2.8 ao 4.x. Mantenha sua versão atualizada para ganhar pincéis novos." },
    ],
  },
  {
    slug: "brushes-essenciais",
    section: "sculpt",
    title: "Pincéis Essenciais",
    difficulty: "iniciante",
    subtitle: "Conheça os pincéis que cobrem 90% do trabalho de qualquer escultor.",
    intro: `
O Blender vem com **dezenas de pincéis** (brushes), e isso assusta no começo. A boa notícia é que, na prática, você usará uns **seis ou sete** o tempo todo. Cada pincel é uma "ferramenta de mão": um para empurrar volume, outro para alisar, outro para criar vincos. Pense como um escultor de barro que tem espátulas, dedos e pentes — cada um tem um papel.

Os pincéis ficam na **toolbar** à esquerda quando você entra em **Sculpt Mode** (atalho \`T\` para mostrar/esconder). Cada um tem um atalho de teclado de uma letra só, e isso acelera muito o fluxo. Você verá que pintar com \`D\` (Draw), apertar \`S\` (Smooth) para alisar e \`G\` (Grab) para puxar volume já resolve a maior parte do trabalho.

## Os pincéis que você precisa decorar primeiro
**Draw (X)** adiciona volume; segure \`Ctrl\` para tirar. **Clay Strips (C)** é como passar fitas de argila — ótimo para construir massa rápida. **Smooth (S)** alisa; **Grab (G)** agarra e puxa um pedaço inteiro. **Crease (Shift+C)** cria vincos finos (cantos da boca, dobras de pano). **Inflate (I)** infla regiões; **Pinch (P)** belisca para afiar arestas.

### Stroke e Falloff
Cada pincel tem um **Stroke** (como o traço se aplica: por espaço, por tempo, em linha reta) e um **Falloff** (a curva da influência do centro à borda). Ajustar essas duas coisas muda completamente a sensação. Não tenha pressa: brinque e descubra seu estilo.
    `,
    codes: [
      { lang: "atalho", code: "X → Draw         S → Smooth        G → Grab\nC → Clay Strips  Shift+C → Crease  I → Inflate\nP → Pinch        L → Layer         M → Mask\n[ e ] → diminuir/aumentar tamanho do pincel" },
      { lang: "passo-a-passo", code: "1. Em Sculpt Mode, pressione X (Draw) e faça um traço para criar volume.\n2. Pressione S e passe sobre o traço — veja como ele 'derrete' suavemente.\n3. Pressione G, clique e arraste: um pedaço inteiro acompanha o cursor.\n4. Pressione C (Clay Strips) e construa formas em camadas, como pincelando argila.\n5. Use Shift+C para um vinco fino — aperte mais força para um sulco profundo." },
      { lang: "python", code: "import bpy\n\n# Trocar o pincel ativo por código\nbpy.context.tool_settings.sculpt.brush = bpy.data.brushes['Clay Strips']\n\n# Ajustar tamanho e força\nbrush = bpy.context.tool_settings.sculpt.brush\nbrush.size = 60\nbrush.strength = 0.6" },
      { lang: "config", code: "Combinações úteis:\n  Draw + Auto-smooth 0.2  → traços suaves naturais\n  Clay Strips + Accumulate ON → empilha argila a cada passada\n  Crease + Strength 1.0 + Pinch 0.5 → vincos afiados\n  Smooth + Strength 0.3 → 'derrete' sem apagar detalhe" },
    ],
    points: [
      "**Draw, Smooth, Grab, Clay Strips, Crease, Inflate** cobrem a maior parte do trabalho.",
      "Decore os atalhos de uma letra: tirar a mão do mouse para clicar quebra o ritmo.",
      "**Auto-smooth** dentro de cada pincel evita que sua escultura fique 'cheia de bicos'.",
      "`Accumulate` ON faz o pincel somar a cada passada; OFF respeita o limite de uma só pincelada.",
      "**Falloff** define a curva: experimente `Sharp` para detalhes e `Smooth` para volume.",
      "Cada pincel pode ser duplicado e customizado — crie sua própria 'paleta' pessoal.",
    ],
    alerts: [
      { type: "tip", content: "Mantenha **Smooth (S)** sempre à mão: 80% do tempo de escultura é alisar e refinar." },
      { type: "info", content: "O painel `Brush Settings` (lateral direita, ícone de pincel) mostra TODOS os parâmetros. Vale explorar com calma." },
      { type: "warning", content: "Forçar muito o **Pinch** afina arestas até elas virarem 'lâminas' impossíveis de renderizar bem. Use com moderação." },
    ],
  },
  {
    slug: "dyntopo",
    section: "sculpt",
    title: "Dyntopo: Topologia Dinâmica",
    difficulty: "iniciante",
    subtitle: "Adicione polígonos automaticamente onde você esculpe — argila infinita.",
    intro: `
Um problema clássico: você começa esculpindo uma esfera e, quando vai detalhar o nariz, descobre que **não há vértices suficientes** ali. A solução manual seria subdividir a malha inteira, o que pesa o computador. A solução elegante chama-se **Dyntopo** (Dynamic Topology, ou Topologia Dinâmica): o Blender **cria triângulos novos** dinamicamente, só onde o seu pincel passa.

Pense no Dyntopo como ter um **bloco de argila que cresce sozinho**: quanto mais você mexe, mais material aparece. Isso libera você para esculpir formas livres sem se preocupar com geometria de base. É a maneira mais rápida de **bloquear** (blockout) uma criatura ou personagem do zero.

## Como ativar e ajustar
Em Sculpt Mode, pressione \`Ctrl+D\` ou abra o painel \`Sculpt → Dyntopo\`. Defina o **Detail Size** (em pixels): valores baixos como \`6 px\` geram MUITOS triângulos (ótimo para detalhe), valores altos como \`20 px\` geram poucos (ótimo para blockout). Há três modos: **Relative Detail** (depende do zoom), **Constant Detail** (independente do zoom — mais previsível) e **Brush Detail** (segue o tamanho do pincel).

### Quando NÃO usar Dyntopo
Dyntopo é incrível para esboço, mas gera **malhas triangulares bagunçadas**, ruins para animação. Para detalhamento final controlado, prefira **Multiresolution** (próximo capítulo). Use Dyntopo nas fases iniciais e migre depois.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl+D → liga/desliga Dyntopo\nR → ajusta o Detail Size na hora (com Dyntopo ativo)\nCtrl+R → faz remalhamento (Detail Flood Fill)" },
      { lang: "passo-a-passo", code: "1. Adicione uma Ico Sphere (Shift+A → Mesh → Ico Sphere, 2 subdivisões).\n2. Entre em Sculpt Mode (Ctrl+Tab → Sculpt).\n3. Pressione Ctrl+D — pode aparecer um aviso sobre 'shape keys'; confirme.\n4. No header, mude para Constant Detail e ajuste para 12 px.\n5. Esculpa: você verá triângulos novos surgirem sob o pincel." },
      { lang: "python", code: "import bpy\n\n# Ativar Dyntopo via script\nbpy.ops.sculpt.dynamic_topology_toggle()\n\n# Configurar detalhe constante\nsculpt = bpy.context.tool_settings.sculpt\nsculpt.detail_type_method = 'CONSTANT'\nsculpt.constant_detail_resolution = 12  # em voxels do mundo" },
      { lang: "config", code: "Configuração recomendada para blockout de personagem:\n  Detail Type: Constant Detail\n  Resolution: 8–15\n  Refine Method: Subdivide Collapse (adiciona e remove tri)\n  Symmetry: X ON (espelha pinceladas)" },
    ],
    points: [
      "**Dyntopo** cria triângulos onde você esculpe: nunca mais 'fique sem geometria'.",
      "Use **Constant Detail** para resultados previsíveis independentes do zoom.",
      "Detail Size **baixo** = muitos polígonos = computador sofre; balanceie!",
      "Dyntopo apaga **UV maps**, **vertex groups** e **shape keys** — confirme antes de ativar.",
      "Ideal para **blockout** rápido; troque por Multires no detalhamento final.",
      "Salve cópias do arquivo (`Ctrl+S` com versionamento) antes de explosões de detalhe.",
    ],
    alerts: [
      { type: "warning", content: "Ativar Dyntopo **destrói UVs e shape keys** existentes. O Blender avisa, mas é fácil clicar OK sem ler." },
      { type: "tip", content: "Mantenha o **Detail Size** alto no início (formas grandes) e diminua aos poucos para ir adicionando detalhe — assim como um escultor real." },
      { type: "info", content: "O modo `Brush Detail` deixa o tamanho do pincel controlar a densidade — útil para alternar entre áreas grosseiras e finas." },
    ],
  },
  {
    slug: "multiresolution",
    section: "sculpt",
    title: "Multiresolution: Detalhe em Camadas",
    difficulty: "iniciante",
    subtitle: "Esculpa em vários níveis de detalhe sem perder a malha base limpa.",
    intro: `
O **Multiresolution** (Multires, para os íntimos) é um modificador mágico: ele permite que sua malha tenha **vários níveis de subdivisão** ao mesmo tempo. Você pode trabalhar a forma grande no nível 1 (poucos polígonos), os volumes médios no nível 3 e os poros da pele no nível 6. E pode pular entre eles a qualquer momento.

A grande sacada é que, diferente do Dyntopo, o Multires **preserva a topologia base** (a malha original organizada em quads). Isso significa que sua escultura continua **animável** e **exportável**. Outros softwares chamam isso de "subdivision sculpting" e é o método padrão da indústria para detalhamento final.

## Como funciona na prática
Adicione o modificador \`Multiresolution\` ao objeto, clique em \`Subdivide\` algumas vezes (cada clique multiplica os polígonos por 4) e entre em Sculpt Mode. Use \`Page Up\` / \`Page Down\` para subir e descer entre os níveis. Detalhes feitos em níveis altos **somam-se** aos de níveis baixos, sem apagá-los.

### Workflow profissional
Comece com uma malha base bem feita (retopologia limpa). Aplique Multires. Esculpa volume nos níveis 2–3. Detalhe pele e rugas nos níveis 5–6. No fim, você pode **bake** os detalhes em um **Normal Map** e voltar a usar a malha de baixa resolução para games e animação. Isso é o melhor dos dois mundos.
    `,
    codes: [
      { lang: "atalho", code: "Page Up → próximo nível (mais detalhe)\nPage Down → nível anterior (menos detalhe)\nShift+Page Up/Down → pula direto ao topo/base\nCtrl+1..5 → atalho global de subdivisão (em Object Mode)" },
      { lang: "passo-a-passo", code: "1. Selecione sua malha base (uma esfera ou cabeça low-poly).\n2. No painel Modifiers (chave inglesa), Add Modifier → Multiresolution.\n3. Clique em Subdivide 3 vezes — você terá ~64x mais polígonos.\n4. Entre em Sculpt Mode.\n5. Page Down até o nível 1, esculpa a forma grande.\n6. Page Up até o nível 3, detalhe volumes médios.\n7. Page Up até o nível final, capriche nos poros." },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.active_object\n\n# Adicionar Multires\nmod = obj.modifiers.new(name='Multires', type='MULTIRES')\n\n# Subdividir 3x\nfor _ in range(3):\n    bpy.ops.object.multires_subdivide(modifier='Multires', mode='CATMULL_CLARK')\n\n# Definir nível de visualização\nmod.levels = 2          # nível no viewport\nmod.sculpt_levels = 3   # nível durante esculpir\nmod.render_levels = 3   # nível no render" },
      { lang: "config", code: "Boas práticas:\n  Subdivision Type: Catmull-Clark (suave) ou Simple (mantém forma)\n  Sculpt Level: 1 a menos que o final, para ter performance\n  Render Level = nível final\n  Sempre salve antes de aplicar (apply é destrutivo!)" },
    ],
    points: [
      "**Multires** preserva a malha base e adiciona detalhe em camadas.",
      "Cada `Subdivide` multiplica os polígonos por **4** — cuidado com a memória.",
      "Use `Page Up`/`Page Down` para navegar entre níveis e trabalhar formas em escala apropriada.",
      "Detalhes em níveis altos **somam** aos de níveis baixos: não apagam a forma grande.",
      "Permite **bake de Normal Map** para usar a low-poly em games preservando o detalhe visual.",
      "É a base do workflow profissional de escultura — domine antes do Dyntopo no longo prazo.",
    ],
    alerts: [
      { type: "tip", content: "Trabalhe a **forma grande** sempre no nível mais baixo possível. É tentador subir cedo e detalhar — resista." },
      { type: "danger", content: "Aplicar (`Apply`) o modificador Multires **congela a subdivisão** e você perde a capacidade de descer níveis. Faça apenas no fim." },
      { type: "info", content: "Multires não combina bem com Dyntopo. Escolha um por vez por objeto." },
    ],
  },
  {
    slug: "mascaras-face-sets",
    section: "sculpt",
    title: "Máscaras e Face Sets",
    difficulty: "iniciante",
    subtitle: "Isole áreas para esculpir só onde importa.",
    intro: `
Quando você quer esculpir o nariz **sem afetar** o resto do rosto, precisa de uma forma de "isolar" essa região. O Blender oferece duas ferramentas para isso: **Máscaras** (Masks) e **Face Sets**. Pense em máscaras como uma fita-crepe que você cola na escultura: as áreas mascaradas ficam **protegidas** dos pincéis. Face Sets são como **etiquetas de cor** que dividem a malha em regiões selecionáveis.

Esse controle muda tudo. Em vez de esculpir com medo de estragar áreas vizinhas, você trabalha com tranquilidade dentro de uma "zona segura". Profissionais usam máscaras o tempo todo: máscara para tudo menos os olhos, esculpe pálpebras; máscara para tudo menos a boca, refina lábios.

## Pincel de Máscara (M)
Pressione \`M\` para o pincel **Mask**. Pinte e a região fica **escurecida** (mascarada). \`Ctrl+M\` desmascara. \`Alt+M\` limpa todas as máscaras. \`Ctrl+I\` **inverte** a máscara (super útil!).

### Face Sets
Face Sets atribuem **IDs coloridos** a grupos de faces. Use \`Ctrl+W\` para criar um face set a partir da seleção mascarada, ou pelo menu \`Face Sets → Init\`. Depois, segurar \`H\` esconde face sets que não estejam sob o cursor — você foca só na região visível. Isso acelera demais o trabalho em malhas pesadas.
    `,
    codes: [
      { lang: "atalho", code: "M → pincel Mask (pinta máscara)\nCtrl+M (com Mask ativo) → apaga máscara local\nAlt+M → limpa todas as máscaras\nCtrl+I → inverte a máscara\nA → seleciona tudo (em Face Sets)\nH → esconde face sets sob o cursor (toggle)\nAlt+H → mostra todos novamente" },
      { lang: "passo-a-passo", code: "1. Em Sculpt Mode, pressione M.\n2. Pinte a área que você QUER PROTEGER — ela fica cinza.\n3. Pressione Ctrl+I para inverter (agora protege o resto).\n4. Volte ao pincel Draw (X) e esculpa: só a área não-mascarada responde.\n5. Quando terminar, Alt+M limpa a máscara." },
      { lang: "python", code: "import bpy\n\n# Limpar todas as máscaras do objeto ativo\nbpy.ops.paint.mask_flood_fill(mode='VALUE', value=0)\n\n# Inverter máscara\nbpy.ops.paint.mask_flood_fill(mode='INVERT')\n\n# Criar Face Set a partir da máscara atual\nbpy.ops.sculpt.face_sets_create(mode='MASKED')" },
      { lang: "config", code: "Fluxo comum para esculpir um olho:\n  1. Mask Brush + Falloff Smooth\n  2. Pinte ao redor do olho (máscara protege o entorno)\n  3. Ctrl+I para inverter (agora só o olho responde)\n  4. Use Grab + Crease para detalhar a pálpebra\n  5. Alt+M para limpar quando terminar" },
    ],
    points: [
      "**Máscara** protege áreas: pincéis não afetam regiões mascaradas.",
      "**Face Sets** dividem a malha em regiões coloridas selecionáveis.",
      "`Ctrl+I` para inverter máscara é o atalho mais usado da seção.",
      "Esconda face sets com `H` para focar em uma região e ganhar performance.",
      "Máscaras podem ter **gradientes** (cinza intermediário = proteção parcial).",
      "Combine com simetria para mascarar dos dois lados ao mesmo tempo.",
    ],
    alerts: [
      { type: "tip", content: "Quase sempre você quer **inverter** a máscara depois de pintar — é mais fácil pintar a área pequena que proteger." },
      { type: "info", content: "Em Multires, a máscara é por nível: máscara feita no nível 5 não aparece no nível 2." },
      { type: "warning", content: "Esquecer máscara ativa e tentar esculpir outra área é fonte clássica de frustração: 'por que não está funcionando?!' — sempre cheque com `Alt+M`." },
    ],
  },
  {
    slug: "remesh-voxel",
    section: "sculpt",
    title: "Remesh com Voxel",
    difficulty: "iniciante",
    subtitle: "Reorganize a topologia automaticamente para continuar esculpindo limpo.",
    intro: `
Depois de esculpir bastante com Dyntopo ou puxões agressivos, sua malha vira um **emaranhado de triângulos** — funciona, mas fica difícil continuar refinando. O **Voxel Remesh** é o "botão mágico" que reconstrói a malha do zero: ele cria uma grade de **voxels** (cubinhos no espaço 3D) e reconstrói uma superfície limpa em cima do volume da escultura.

A analogia: imagine que sua escultura é um molde imerso em areia. O Voxel Remesh "embala" tudo em uma malha nova e uniforme, como se você tivesse passado uma forma de gesso por cima. Você perde a topologia exata, mas ganha **distribuição uniforme** de polígonos — perfeito para continuar esculpindo.

## Como usar
Em Sculpt Mode, pressione \`R\` para visualizar o **Voxel Size** (tamanho do voxel) e clique-arraste para ajustar. Quanto **menor** o voxel, mais polígonos. Pressione \`Ctrl+R\` para aplicar o remesh. Em segundos, você tem uma malha limpa pronta para mais detalhe.

### Quando remalhar
Remalhe sempre que sentir que o pincel está "engasgando" ou que a topologia ficou irregular demais. Faça vários ciclos: esculpa grosso → remesh com voxel grande → esculpa médio → remesh com voxel menor → detalhe fino. Esse é o pão-com-manteiga do escultor digital moderno.
    `,
    codes: [
      { lang: "atalho", code: "R → preview do Voxel Size (clique-arraste para ajustar)\nCtrl+R → executa o Voxel Remesh\nShift+R → repete último remesh com mesmas configs" },
      { lang: "passo-a-passo", code: "1. Em Sculpt Mode, abra o painel Remesh no header (ícone de cubo).\n2. Pressione R, arraste para ver um cubo de referência do tamanho do voxel.\n3. Comece com Voxel Size: 0.05 m (para um objeto de tamanho humano).\n4. Pressione Ctrl+R — sua malha é reconstruída em segundos.\n5. Continue esculpindo com a malha mais uniforme." },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.active_object\n\n# Configurar e executar Voxel Remesh\nobj.data.remesh_voxel_size = 0.03\nobj.data.remesh_voxel_adaptivity = 0.0   # 0 = uniforme, >0 = adaptativo\nobj.data.use_remesh_preserve_paint_mask = True\nobj.data.use_remesh_preserve_volume = True\nbpy.ops.object.voxel_remesh()" },
      { lang: "config", code: "Boas configurações para personagem humano (escala 1.8m):\n  Voxel Size: 0.04 (blockout) → 0.01 (detalhe)\n  Adaptivity: 0.0 (mantém uniforme)\n  Preserve: Paint Mask, Face Sets (se usar)\n  Fix Poles: ON (corrige cantos estranhos)" },
    ],
    points: [
      "**Voxel Remesh** reconstrói a malha com polígonos uniformes baseado em voxels.",
      "Use ciclos: **esculpe → remesh → esculpe** para evoluir a forma sem travar a malha.",
      "**Voxel Size** menor = mais polígonos = computador trabalha mais.",
      "Preserve **máscaras** e **face sets** marcando as opções no painel Remesh.",
      "Não preserva **UVs** — faça UV só depois da retopologia final.",
      "Funciona melhor em malhas **fechadas** (sem buracos abertos).",
    ],
    alerts: [
      { type: "tip", content: "Antes de cada remesh agressivo, salve uma versão (`Ctrl+Shift+S` com nome novo). É barato e te salva de erros." },
      { type: "warning", content: "Voxel Size muito pequeno (ex.: 0.001) pode travar o Blender por **horas**. Comece grande e diminua aos poucos." },
      { type: "success", content: "Combinado com Dyntopo, o Voxel Remesh é o segredo da fluidez moderna do Sculpt Mode no Blender." },
    ],
  },
  {
    slug: "simetria",
    section: "sculpt",
    title: "Simetria e Espelhamento",
    difficulty: "iniciante",
    subtitle: "Esculpa os dois lados ao mesmo tempo e economize metade do trabalho.",
    intro: `
Quase tudo na natureza tem **simetria bilateral**: rostos, corpos, asas, folhas. Sem ajuda do software, você teria que esculpir o lado esquerdo, depois replicar manualmente o direito — um sofrimento. O Blender resolve isso com a **simetria de Sculpt Mode**: cada pincelada feita de um lado **espelha automaticamente** no outro.

A simetria do Sculpt Mode funciona em torno do **ponto de origem** do objeto (origin) e dos **eixos do mundo**. Por isso é fundamental que sua malha esteja **centralizada na origem** antes de esculpir. Se o objeto estiver torto, a simetria sai torta também.

## Ativando simetria
No header de Sculpt Mode, há três botões pequenos \`X\`, \`Y\`, \`Z\`. Clique no \`X\` para espelhar pelo eixo X (o mais comum: lado esquerdo/direito de um rosto). Você verá um ponto-fantasma do pincel no outro lado, indicando onde a pincelada vai cair.

### Simetria radial
Para esculpir flores, engrenagens ou estrelas, ative **Radial Symmetry**: você define quantas repetições em torno de um eixo. Pinta uma pétala, ganha 8 iguais. Magia para artes geométricas e orgânicas radiais.

Quando você quebrar a simetria de propósito (ex.: cicatriz num lado só), **desligue** o eixo correspondente para não estragar o trabalho do outro lado.
    `,
    codes: [
      { lang: "atalho", code: "Os botões X / Y / Z no header da Sculpt ligam/desligam simetria\nNenhum atalho global por padrão — atribua via Right Click → Assign Shortcut\nTilt do Brush respeita simetria automaticamente" },
      { lang: "passo-a-passo", code: "1. Em Object Mode, garanta que o objeto está na origem (Object → Set Origin → Origin to Geometry).\n2. Entre em Sculpt Mode.\n3. No header, clique no botão 'X' (Symmetry).\n4. Esculpa um lado: o outro acompanha em tempo real.\n5. Para flor com 6 pétalas, abra Symmetry → Radial → Z = 6." },
      { lang: "python", code: "import bpy\n\nsculpt = bpy.context.tool_settings.sculpt\n\n# Ativar simetria no eixo X\nsculpt.use_symmetry_x = True\nsculpt.use_symmetry_y = False\nsculpt.use_symmetry_z = False\n\n# Simetria radial em Z (ex.: flor de 6 pétalas)\nsculpt.radial_symmetry[2] = 6" },
      { lang: "config", code: "Configurações típicas:\n  Personagem humano: Symmetry X = ON, Y/Z = OFF\n  Asa de inseto:     Symmetry X e Y = ON\n  Flor 8 pétalas:    Radial Z = 8\n  Mirror (Tile):     X-Mirror para mover origem do espelho" },
    ],
    points: [
      "Ative **Symmetry X** para personagens — esculpe os dois lados de uma vez.",
      "A simetria depende da **origem** do objeto: centralize antes de começar.",
      "Use **Radial Symmetry** para formas circulares (engrenagens, flores).",
      "Desligue a simetria para criar **assimetrias intencionais** (cicatrizes, expressões).",
      "Funciona com Multires e Dyntopo, mas pode causar artefatos se a malha estiver assimétrica.",
      "O ponto-fantasma do pincel mostra onde a pincelada espelhada vai cair.",
    ],
    alerts: [
      { type: "tip", content: "Use `Mesh → Symmetrize` em Edit Mode para forçar uma malha levemente assimétrica a ficar perfeitamente espelhada antes de esculpir." },
      { type: "warning", content: "Se sua escultura sair 'torta' apesar da simetria ativa, o problema quase sempre é a **origem deslocada** ou rotação do objeto não aplicada." },
      { type: "info", content: "A simetria do Sculpt Mode é diferente do **Mirror Modifier**: ela é só visual, não cria geometria nova." },
    ],
  },
  {
    slug: "escultura-cabeca-iniciante",
    section: "sculpt",
    title: "Esculpindo uma Cabeça (Projeto Iniciante)",
    difficulty: "intermediario",
    subtitle: "Aplique tudo que aprendeu em um projeto real, do blockout aos detalhes.",
    intro: `
Hora da prova prática. Vamos esculpir uma **cabeça humana estilizada** do zero usando todas as ferramentas das aulas anteriores. Não vamos buscar realismo fotográfico — o objetivo é praticar o **fluxo completo**: começar de uma esfera, bloquear o crânio, achar olhos e boca, refinar planos do rosto e adicionar detalhes finais.

O segredo é avançar em **camadas de complexidade**: nunca pule para detalhes pequenos antes da forma grande estar resolvida. Escultores chamam isso de "primary, secondary, tertiary forms" — formas primárias (volume da cabeça), secundárias (planos do rosto), terciárias (rugas, poros).

## Plano de ataque
1. Esfera → estique para uma forma de ovo (crânio).
2. Achate a frente para criar o **plano facial**.
3. Marque com Crease as cavidades dos olhos e a linha da boca.
4. Use Grab para puxar nariz e queixo.
5. Voxel Remesh para limpar a topologia.
6. Multires e detalhes finais.

### Dicas de proporção
Use a regra clássica: a cabeça tem **5 olhos de largura**, os olhos ficam **na metade vertical**, a base do nariz está a 1/3 entre olhos e queixo, e a boca a 1/3 abaixo do nariz. Marque essas linhas com referências visuais antes de detalhar.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Shift+A → Mesh → UV Sphere. Em Edit Mode, aperte S e Z para esticar verticalmente (forma de ovo).\n2. Object Mode → Ctrl+Tab → Sculpt Mode.\n3. Ative Symmetry X.\n4. Use Grab (G) para definir mandíbula e queixo.\n5. Crease (Shift+C) leve para sulcar olhos, base do nariz e linha da boca.\n6. Clay Strips (C) para construir bochechas, testa, queixo.\n7. Voxel Remesh (Ctrl+R) com Voxel Size 0.02 para limpar a malha.\n8. Adicione modificador Multires e Subdivide 2x.\n9. Detalhe pálpebras, lábios e nariz no nível 2.\n10. Suba ao nível 3 e adicione poros com Brush 'Skin' personalizado." },
      { lang: "atalho", code: "Atalhos-chave deste projeto:\n  G (Grab), S (Smooth), C (Clay Strips)\n  Shift+C (Crease), I (Inflate), P (Pinch)\n  M (Mask) + Ctrl+I (invert)\n  R (preview voxel) + Ctrl+R (remesh)\n  Page Up/Down (níveis Multires)" },
      { lang: "python", code: "import bpy\n\n# Setup automatizado para começar a escultura\nbpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(0,0,0))\nobj = bpy.context.active_object\nobj.scale.z = 1.3   # forma de ovo\nbpy.ops.object.transform_apply(scale=True)\n\n# Entrar em Sculpt Mode com simetria X\nbpy.ops.object.mode_set(mode='SCULPT')\nbpy.context.tool_settings.sculpt.use_symmetry_x = True" },
      { lang: "config", code: "Sequência de pincéis recomendada por etapa:\n  Blockout: Grab + Clay Strips (Strength 0.7)\n  Refino:   Smooth + Crease (Strength 0.3-0.5)\n  Detalhe:  Inflate + Pinch (Strength 0.2)\n  Sempre Auto-smooth 0.1-0.2" },
    ],
    points: [
      "Trabalhe em **camadas**: forma grande → planos médios → detalhes finos.",
      "**Não pule etapas**: corrigir uma proporção errada depois de detalhar é caro.",
      "Use **Grab (G)** generosamente no começo — é a forma mais rápida de mover volume.",
      "Faça **Voxel Remesh** entre fases para manter a malha trabalhável.",
      "Adicione **Multires** apenas quando o blockout estiver aprovado.",
      "Reúna **referências fotográficas** antes de começar — esculpir 'da cabeça' raramente funciona.",
      "Salve versões numeradas (`cabeca_v01.blend`, `cabeca_v02.blend`...) — vai querer voltar.",
    ],
    alerts: [
      { type: "tip", content: "Coloque uma imagem de referência de frente e perfil no viewport com `Shift+A → Image → Reference`. Mude para isso é um divisor de águas." },
      { type: "warning", content: "Não detalhe rugas antes do nariz estar no lugar certo. Detalhe sem proporção é tempo perdido." },
      { type: "success", content: "Termine a escultura mesmo que esteja imperfeita: você aprende mais com 5 projetos finalizados do que com 50 inacabados." },
    ],
  },
  {
    slug: "retopologia-pos-sculpt",
    section: "sculpt",
    title: "Retopologia Pós-Sculpt",
    difficulty: "intermediario",
    subtitle: "Transforme sua escultura caótica em uma malha limpa pronta para animação.",
    intro: `
Sua escultura ficou linda, mas tem **milhões de triângulos** desorganizados. Para usar em animação, jogos ou subdivision controlada, você precisa de uma malha com **quads bem distribuídos** seguindo o fluxo dos músculos. Esse processo se chama **retopologia** — literalmente "refazer a topologia" por cima da escultura.

Pense na escultura como uma **estátua de gesso** e na retopologia como uma **rede de barbante** que você estica por cima, criando faces quadradas que respeitam os contornos. O resultado é uma malha leve, animável e pronta para receber o detalhe original via **Normal Map** (assunto do próximo capítulo).

## Métodos de retopologia
**Manual com Poly Build (T)**: você desenha quad por quad seguindo a forma. É lento mas dá controle total. **Quad Remesher** (addon pago) ou **Voxel Remesh com Quadriflow**: automático, ótimo para iteração rápida. **Shrinkwrap + Mirror**: técnica híbrida onde você modela uma malha base e a "cola" na escultura.

### Boas práticas de loops
Siga os **loops naturais** do rosto: anéis ao redor dos olhos e da boca, fluxo descendo pelas bochechas. Mantenha **densidade uniforme** salvo onde precisar de mais detalhe (boca, olhos). Evite **triângulos** e **N-gons** em áreas que vão deformar.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Duplique sua escultura (Shift+D) e renomeie como 'Retopo'.\n2. Adicione Modifier → Shrinkwrap, target: a escultura original.\n3. Mude Wrap Method para 'Project' e ajuste para grudar bem.\n4. Em outro objeto novo (Plane), entre em Edit Mode.\n5. Use o Tool 'Poly Build' (atalho T no painel Tools).\n6. Clique para criar vértices que se alinham à superfície via Snap (ímã ativo).\n7. Construa quads seguindo loops do rosto (boca, olhos, mandíbula).\n8. Aplique o Shrinkwrap quando a malha estiver completa." },
      { lang: "atalho", code: "Snap: pressione Shift+Tab para ligar/desligar Snap\nNo header de snap: Face → projeta no objeto sob o cursor\nAlt+M → merge vertices (juntar)\nCtrl+R → loop cut (corta anéis)\nE → extrude (estende uma aresta)" },
      { lang: "python", code: "import bpy\n\n# Adicionar Shrinkwrap apontando para a escultura\ntarget = bpy.data.objects['EsculturaOriginal']\nretopo = bpy.context.active_object\n\nmod = retopo.modifiers.new(name='Shrinkwrap', type='SHRINKWRAP')\nmod.target = target\nmod.wrap_method = 'PROJECT'\nmod.use_project_z = True\nmod.use_negative_direction = True\nmod.use_positive_direction = True" },
      { lang: "config", code: "Configurações úteis para retopologia manual:\n  Snap: ON, modo Face\n  Snap Target: Closest, Project Onto Self: OFF\n  Shrinkwrap Offset: 0.001 (evita z-fighting)\n  Mirror Modifier: X (espelha enquanto trabalha)\n  Display: Wire em cima do sólido (X-Ray ON)" },
      { lang: "shell", code: "# Para usar Quad Remesher (Exoside, addon pago):\n# 1. Compre e baixe em https://exoside.com/quadremesher\n# 2. Edit → Preferences → Add-ons → Install... → escolha o .zip\n# 3. Ative o addon, reinicie o Blender" },
    ],
    points: [
      "**Retopologia** transforma escultura em malha animável com quads uniformes.",
      "Siga **loops** dos músculos: olhos, boca, mandíbula têm anéis naturais.",
      "Use **Shrinkwrap + Snap** para grudar a nova malha na escultura.",
      "Evite **triângulos** e **N-gons** em áreas que vão deformar (rosto, articulações).",
      "Densidade pode variar: mais polígonos onde houver detalhe e movimento.",
      "Addons como **Quad Remesher** ou **RetopoFlow** aceleram demais o processo.",
      "Para games, mire em **5–15 mil tris** num personagem; cinema pode ter 50k+.",
    ],
    alerts: [
      { type: "tip", content: "Mantenha sempre o **Mirror Modifier** ativo durante a retopologia: você refaz só metade do rosto." },
      { type: "warning", content: "Esquecer o **Snap em modo Face** faz seus vértices ficarem flutuando no ar — sempre confirme." },
      { type: "info", content: "Existe o addon nativo **'Mesh: F2'** que acelera muito o preenchimento de faces vizinhas. Ative em Preferences." },
    ],
  },
  {
    slug: "exportar-decimate",
    section: "sculpt",
    title: "Exportando e o Modificador Decimate",
    difficulty: "avancado",
    subtitle: "Reduza polígonos com inteligência e prepare sua escultura para o mundo.",
    intro: `
Sua escultura está pronta, mas tem 5 milhões de polígonos — pesada demais para enviar a um cliente, abrir em Substance Painter ou imprimir em 3D. É hora de **otimizar** e **exportar**. O Blender oferece duas estratégias: **retopologia limpa** (já vimos) ou o modificador **Decimate**, que reduz polígonos automaticamente preservando a forma.

O **Decimate** é a "tesoura inteligente" do Blender. Ele analisa a malha e remove os polígonos menos significativos, mantendo silhueta e detalhes mais salientes. Não substitui retopologia para animação, mas é perfeito para **impressão 3D**, **prototipagem** e **assets estáticos**.

## Os três modos do Decimate
**Collapse**: une vértices vizinhos. Defina **Ratio** (0.5 = metade dos polígonos). Mais agressivo, ótimo para reduzir muito. **Un-Subdivide**: faz o inverso de subdividir; bom em malhas que vieram de Subdivision. **Planar**: une faces que estão quase no mesmo plano (ótimo para arquitetura, ruim para orgânico).

### Formatos de exportação
Para **impressão 3D**: STL ou OBJ. Para **engines de jogo** (Unity, Unreal): FBX ou GLTF/GLB. Para **web e visualização**: GLB (compacto, com texturas embutidas). Para **outro Blender**: o próprio \`.blend\` ou o universal \`.usd\`.

Sempre **aplique modificadores** antes de exportar (Object → Convert → Mesh, ou Apply Modifier individualmente). E confira escala: 1 unidade Blender = 1 metro por padrão; ajuste no exportador se sua engine usar outra escala.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Selecione a escultura.\n2. Modifiers → Add → Decimate.\n3. Mode: Collapse, Ratio: 0.1 (mantém 10% dos polígonos).\n4. Confira se a forma sobreviveu — se sim, Apply.\n5. File → Export → escolha o formato (STL para impressão, FBX para games).\n6. Configure a escala (Apply Scale, Forward: -Z, Up: Y para Unity)." },
      { lang: "atalho", code: "Atalhos do Decimate via menu (sem padrão):\n  N → painel lateral mostra contagem de tris (canto superior direito)\n  Stats overlay → mostra Verts/Faces/Tris em tempo real\nCtrl+A em Object Mode → Apply (aplica todas as transforms)" },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.active_object\n\n# Aplicar Decimate Collapse 10%\nmod = obj.modifiers.new(name='Decimate', type='DECIMATE')\nmod.decimate_type = 'COLLAPSE'\nmod.ratio = 0.1\nmod.use_collapse_triangulate = True\nbpy.ops.object.modifier_apply(modifier='Decimate')\n\n# Exportar para GLB com texturas embutidas\nbpy.ops.export_scene.gltf(\n    filepath='/tmp/personagem.glb',\n    export_format='GLB',\n    export_apply=True,\n)" },
      { lang: "config", code: "Configurações por uso final:\n  Impressão 3D (STL): 50–200k tris, watertight (sem buracos)\n  Game asset (FBX):   5–30k tris, com UVs e Normal Map\n  Web (GLB):          1–10k tris, texturas em PNG comprimido\n  ZBrush import (OBJ): mais alto possível, sem Multires aplicado" },
      { lang: "shell", code: "# Verificar tamanho do arquivo exportado\nls -lh personagem.glb\n\n# Otimizar GLB ainda mais com gltfpack (instale via npm)\nnpm install -g gltfpack\ngltfpack -i personagem.glb -o personagem.optim.glb -cc" },
    ],
    points: [
      "**Decimate Collapse** é o modo padrão para reduzir polígonos preservando forma.",
      "Sempre **aplique modificadores** antes de exportar para garantir resultado consistente.",
      "Para **impressão 3D**: malha precisa ser **manifold** (sem buracos, sem faces internas).",
      "**FBX e GLTF** são os mais compatíveis entre engines e ferramentas externas.",
      "Verifique **escala** e **orientação dos eixos** — cada engine tem convenções diferentes.",
      "Mantenha sempre uma versão **alta resolução** salva separada da exportada.",
      "Use **Stats Overlay** (canto sup. direito) para monitorar contagem de polígonos em tempo real.",
    ],
    alerts: [
      { type: "tip", content: "Antes de aplicar Decimate, **duplique** o objeto. Assim você guarda o original e trabalha na cópia." },
      { type: "danger", content: "Decimate Planar com ângulo muito permissivo **destrói detalhes orgânicos**. Use só em superfícies duras (caixas, pisos)." },
      { type: "success", content: "Combinando **Multires + Bake Normal Map + Decimate** você obtém um asset leve com aparência de milhões de polígonos. É o pulo-do-gato profissional." },
      { type: "info", content: "Para impressão 3D, rode também `Mesh → Clean Up → Make Manifold` — evita falhas no slicer." },
    ],
  },
];
