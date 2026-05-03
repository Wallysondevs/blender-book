import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "edit-mode-intro",
    section: "modelagem",
    title: "Entrando no Edit Mode",
    difficulty: "iniciante",
    subtitle: "O modo onde você esculpe a geometria do objeto, vértice por vértice.",
    intro: `
Até agora, no **Object Mode**, você manipulou objetos como se fossem caixas fechadas: movia, girava, escalava — mas nunca abria a tampa para mexer no que tem dentro. O **Edit Mode** é exatamente essa "abertura da tampa". Quando você entra nele, o Blender deixa de tratar o cubo como um objeto único e passa a expor seus **vértices**, **arestas** e **faces** — a malha (do inglês \`mesh\`) que define a forma. É lá que toda a modelagem realmente acontece.

A analogia mais útil é a da argila. No Object Mode, você segura um pedaço de argila e o coloca na bancada. No Edit Mode, você mete o dedo na argila e começa a moldar. Outros softwares como o **Maya** chamam esse contexto de "Component Mode"; no **3ds Max** ele aparece dentro do "Editable Poly". O conceito é universal em modelagem poligonal: é o lugar onde a geometria é editada.

## Como entrar e sair
Você entra e sai do Edit Mode com a tecla \`Tab\`. Esse atalho é tão central que você vai apertá-lo centenas de vezes por dia. Selecione um objeto (precisa ser uma malha — um cubo, esfera, plano…) e pressione \`Tab\`. O cabeçalho da viewport mudará de "Object Mode" para "Edit Mode", e os vértices ficarão visíveis como pequenos pontos.

Não confunda Edit Mode com **Sculpt Mode**: este último é para esculpir formas orgânicas com pincéis (como ZBrush), enquanto o Edit Mode é para modelagem precisa, poligonal. Neste capítulo você dá o primeiro passo. Nos próximos, exploraremos cada componente e cada ferramenta.
    `,
    codes: [
      { lang: "atalho", code: "Tab            → alterna Object Mode ↔ Edit Mode\nCtrl+Tab       → menu radial para escolher modo (Sculpt, Weight Paint, etc.)\nNumpad .       → enquadra a seleção atual" },
      { lang: "passo-a-passo", code: "1. Abra um arquivo novo (cubo padrão selecionado).\n2. Pressione Tab para entrar em Edit Mode.\n3. Observe os 8 vértices, 12 arestas e 6 faces do cubo.\n4. Pressione A para selecionar tudo.\n5. Pressione Tab novamente para voltar ao Object Mode." },
      { lang: "python", code: "import bpy\n\n# Garante que há um objeto ativo do tipo MESH e entra em Edit Mode\nobj = bpy.context.active_object\nif obj and obj.type == 'MESH':\n    bpy.ops.object.mode_set(mode='EDIT')\nelse:\n    print('Selecione uma malha primeiro!')" },
    ],
    points: [
      "**Edit Mode**: contexto onde você edita a malha (vértices/arestas/faces) de um objeto.",
      "Só funciona em objetos do tipo **Mesh** — câmeras e luzes não entram em Edit Mode.",
      "O atalho universal é \`Tab\`. Decore-o agora.",
      "Cada objeto tem sua própria malha; só edita-se um objeto por vez (a menos que use multi-object editing).",
      "Mudanças no Edit Mode alteram a geometria; mudanças no Object Mode alteram apenas posição/rotação/escala do objeto inteiro.",
      "Sair do Edit Mode é tão importante quanto entrar — muita gente esquece e tenta mover um objeto sem retornar.",
    ],
    alerts: [
      { type: "tip", content: "Se a viewport parecer travada ou os atalhos não funcionarem, confira no canto superior esquerdo se você está em **Object Mode** ou **Edit Mode**." },
      { type: "warning", content: "Se você selecionar uma luz ou câmera e apertar \`Tab\`, nada acontece. Edit Mode só existe para malhas, curvas, superfícies e armatures." },
      { type: "info", content: "O modo selecionado é por objeto, não global. Cada objeto lembra em qual modo estava." },
    ],
  },
  {
    slug: "vertices-arestas-faces",
    section: "modelagem",
    title: "Vértices, Arestas e Faces",
    difficulty: "iniciante",
    subtitle: "Os três componentes que formam toda malha 3D no Blender.",
    intro: `
Toda malha 3D, seja um cubo simples ou o personagem mais detalhado, é construída a partir de três tipos de componentes: **vértices** (pontos no espaço), **arestas** (linhas que ligam dois vértices) e **faces** (superfícies fechadas por três ou mais arestas). Entender essa hierarquia é o que separa quem "clica em coisas" de quem realmente modela com intenção.

Pense num origami: os **vértices** são os pontos onde você dobra o papel; as **arestas** são as próprias dobras; as **faces** são os planos de papel entre as dobras. No Blender, você pode trabalhar em um nível de cada vez. Os atalhos \`1\`, \`2\` e \`3\` (no teclado principal, não o numpad) alternam entre **Vertex Select**, **Edge Select** e **Face Select**.

## Por que três modos?
Cada modo serve a uma intenção diferente. Quer ajustar o canto exato de uma forma? Vértice. Quer chanfrar uma quina? Aresta. Quer extrudar uma superfície inteira? Face. Forçar tudo num só modo é como tentar pintar uma parede só com pincel fino — funciona, mas é doloroso.

## Topologia em uma frase
A organização desses componentes chama-se **topologia**. Faces de 4 lados (\`quads\`) são preferidas porque deformam bem em animação e funcionam melhor com modificadores como o **Subdivision Surface**. Faces de 3 lados (\`tris\`) e de 5+ lados (\`n-gons\`) também existem, mas use-as com cuidado. Esse vocabulário vai voltar muitas vezes ao longo do livro.
    `,
    codes: [
      { lang: "atalho", code: "1  → modo Vertex (vértice)\n2  → modo Edge (aresta)\n3  → modo Face (face)\nA  → selecionar tudo\nAlt+A → desselecionar tudo" },
      { lang: "passo-a-passo", code: "1. Entre em Edit Mode (Tab) com o cubo padrão.\n2. Pressione 1 → veja os 8 pontos brancos (vértices).\n3. Pressione 2 → veja as 12 linhas (arestas).\n4. Pressione 3 → veja os 6 quadrados (faces).\n5. Em cada modo, clique com o botão esquerdo para selecionar um componente." },
      { lang: "config", code: "Header da viewport (Edit Mode):\n  ● ◯ ◯  ← três ícones equivalentes a 1, 2, 3\n  Segure Shift ao clicar para ativar mais de um modo simultaneamente." },
      { lang: "python", code: "import bpy\nimport bmesh\n\n# Lê a malha ativa em Edit Mode e conta componentes\nobj = bpy.context.edit_object\nbm = bmesh.from_edit_mesh(obj.data)\nprint(f'Vértices: {len(bm.verts)}')\nprint(f'Arestas:  {len(bm.edges)}')\nprint(f'Faces:    {len(bm.faces)}')" },
    ],
    points: [
      "**Vértice**: ponto sem dimensão, definido por coordenadas (x, y, z).",
      "**Aresta**: segmento de reta entre exatamente dois vértices.",
      "**Face**: polígono fechado por 3+ arestas — preferencialmente 4 (\`quad\`).",
      "Os atalhos \`1\`/\`2\`/\`3\` são na linha de números do teclado principal, **não** no numpad.",
      "Você pode segurar \`Shift\` ao apertar 1/2/3 para combinar dois modos de seleção.",
      "**N-gons** (faces com 5+ lados) podem causar artefatos visuais em sombreamento — use com moderação.",
      "Mover um vértice arrasta junto todas as arestas e faces conectadas a ele.",
    ],
    alerts: [
      { type: "tip", content: "Decore que **1 = vértice, 2 = aresta, 3 = face**. Esse é o atalho mais usado em modelagem, fácil de lembrar pela ordem hierárquica." },
      { type: "info", content: "Faces triangulares (\`tris\`) são úteis em finalização para games, mas durante a modelagem prefira **quads** sempre que possível." },
      { type: "warning", content: "Apagar um vértice apaga junto todas as arestas e faces que dependiam dele. O Blender pergunta o tipo de exclusão (\`X\` ou \`Delete\`) — preste atenção." },
    ],
  },
  {
    slug: "selection-tools",
    section: "modelagem",
    title: "Ferramentas de Seleção",
    difficulty: "iniciante",
    subtitle: "Selecionar bem é metade do trabalho — conheça as armas certas.",
    intro: `
No Edit Mode, antes de qualquer transformação, você precisa **selecionar**. E selecionar bem, em malhas com milhares de componentes, faz uma diferença gigantesca de produtividade. O Blender oferece um arsenal: clique simples, caixa, círculo, laço, loops, anéis, por material, por ângulo, por linkado e muito mais. Conhecer cada uma é como aprender os tipos de pincel num programa de pintura.

A seleção mais básica é o **clique** com o botão esquerdo. Adicione \`Shift+clique\` para incluir mais componentes na seleção, ou \`Ctrl+clique\` para selecionar todos os componentes entre o atual e o clicado (caminho mais curto). Para selecionar em massa, use \`B\` (**Box Select** — desenha um retângulo), \`C\` (**Circle Select** — pincel circular, ajustável com a roda do mouse) ou \`Ctrl+botão direito arrastando\` (**Lasso**).

## Loops e Rings
Duas seleções essenciais em modelagem: \`Alt+clique\` numa aresta seleciona todo o **edge loop** (anel de arestas que dá a volta na malha). \`Ctrl+Alt+clique\` seleciona o **edge ring** (arestas paralelas perpendiculares ao loop). Esses dois atalhos transformam sua velocidade — vale praticar até virar reflexo.

## Seleções inteligentes
No menu \`Select\` da viewport há joias escondidas: **Select Linked** (\`L\` ou \`Ctrl+L\`) seleciona toda a "ilha" conectada ao componente sob o cursor; **Select All by Trait** filtra por número de lados, faces planas, vértices soltos etc. Sempre que pensar "preciso pegar todos os X que…" — vá ao menu Select.
    `,
    codes: [
      { lang: "atalho", code: "Click           → seleciona\nShift+Click     → adiciona/remove\nCtrl+Click      → caminho mais curto até a seleção\nA               → tudo\nAlt+A           → nada\nCtrl+I          → inverter seleção\nB / C           → Box / Circle Select\nL / Ctrl+L      → Select Linked (sob cursor / da seleção)\nAlt+Click       → Edge Loop\nCtrl+Alt+Click  → Edge Ring" },
      { lang: "passo-a-passo", code: "1. Crie um cilindro (Add → Mesh → Cylinder).\n2. Tab para entrar em Edit Mode, 2 para modo aresta.\n3. Alt+clique numa aresta vertical → seleciona o anel vertical.\n4. Alt+clique numa aresta horizontal → seleciona o anel da tampa.\n5. Ctrl+Alt+clique numa aresta vertical → seleciona o ring." },
      { lang: "python", code: "import bpy\n\n# Seleciona todas as faces planas (úteis para mapear UV de tampas)\nbpy.ops.mesh.select_all(action='DESELECT')\nbpy.ops.mesh.select_face_by_sides(number=4, type='EQUAL')" },
      { lang: "config", code: "Menu Select → Checker Deselect: alterna a seleção em xadrez,\núltil para criar padrões repetidos como buracos ou parafusos." },
    ],
    points: [
      "**Box (B)**, **Circle (C)** e **Lasso** cobrem 90% das seleções em massa.",
      "**Alt+clique** em aresta = loop. Indispensável para modelar.",
      "**Ctrl+clique** preenche o caminho mais curto entre o ativo e o clicado.",
      "**L** seleciona ilhas conectadas sob o cursor — ótimo para isolar partes soltas.",
      "**Ctrl+I** inverte a seleção; muito útil em combinação com Select Linked.",
      "Em **Circle Select** (\`C\`), use a roda do mouse para mudar o raio do pincel.",
      "Sempre observe o **componente ativo** (último selecionado, em branco mais claro) — várias ferramentas o usam como referência.",
    ],
    alerts: [
      { type: "tip", content: "Para sair do **Circle Select**, pressione \`Esc\` ou botão direito. Iniciante costuma ficar preso no modo." },
      { type: "info", content: "Os atalhos de loop e ring funcionam só em **modo aresta** (\`2\`)." },
      { type: "success", content: "Domínio de seleção é o **maior salto de produtividade** depois do Tab. Invista 30 minutos só praticando seleções." },
    ],
  },
  {
    slug: "extrude",
    section: "modelagem",
    title: "Extrude — Esticando Geometria",
    difficulty: "iniciante",
    subtitle: "A ferramenta mais usada em modelagem: criar nova geometria a partir de uma seleção.",
    intro: `
**Extrude** (em português, "extrudar") é o coração da modelagem poligonal. Ela duplica a seleção atual e a conecta à original com novas arestas e faces, permitindo que você "puxe" a geometria para fora — como apertar um tubo de pasta de dente. Se você só aprender uma ferramenta neste capítulo, que seja \`E\`.

A lógica é simples: você seleciona uma face (ou aresta, ou vértice), pressiona \`E\`, move o mouse e clica para confirmar. O resultado é uma nova porção de malha "soldada" à anterior. Repita várias vezes e você desenha um cano, um braço, um galho de árvore — qualquer forma alongada nasce de extrusões sucessivas.

## Variações de extrude
Existem várias: \`E\` (livre, segue o mouse), \`E\` + \`Z\` (trava no eixo Z), **Extrude Along Normals** (\`Alt+E\` → menu) que segue a perpendicular da face, **Extrude Individual Faces** que extruda cada face por sua própria normal (ótimo para criar espinhos ou janelas em paredes), e **Extrude to Cursor** acionado com \`Ctrl+botão direito\`.

## Pegadinha clássica
Se você apertar \`E\` e mudar de ideia, **não use \`Ctrl+Z\` direto**. Pressione \`Esc\` ou botão direito primeiro — isso cancela o movimento, mas a geometria duplicada permanece no lugar (zero deslocamento), gerando faces sobrepostas invisíveis. O caminho correto é \`Esc\` seguido de \`Ctrl+Z\` para desfazer também a duplicação.
    `,
    codes: [
      { lang: "atalho", code: "E              → Extrude Region (livre)\nE depois X/Y/Z → Extrude travado em eixo\nAlt+E          → menu com todas as variações\nCtrl+RMB       → Extrude to Cursor" },
      { lang: "passo-a-passo", code: "1. Adicione um plano (Add → Mesh → Plane).\n2. Tab → Edit Mode → 3 (modo face).\n3. Selecione a face única do plano.\n4. Pressione E, mova o mouse para cima, clique para confirmar.\n5. Repita 3 ou 4 vezes — você modelou uma torre quadrada." },
      { lang: "python", code: "import bpy\nimport bmesh\n\nobj = bpy.context.edit_object\nbm = bmesh.from_edit_mesh(obj.data)\n\n# Extruda todas as faces selecionadas em 1 unidade no eixo Z\nselected_faces = [f for f in bm.faces if f.select]\nret = bmesh.ops.extrude_face_region(bm, geom=selected_faces)\nverts = [v for v in ret['geom'] if isinstance(v, bmesh.types.BMVert)]\nbmesh.ops.translate(bm, vec=(0, 0, 1), verts=verts)\nbmesh.update_edit_mesh(obj.data)" },
      { lang: "config", code: "Após confirmar um Extrude, abra o painel Operator (canto inferior\nesquerdo, \"F6\" / \"F9\") para digitar o valor exato do deslocamento." },
    ],
    points: [
      "**Extrude (\`E\`)** duplica a seleção e a conecta com novas arestas/faces.",
      "Funciona em **vértices, arestas e faces** — o resultado muda conforme o modo.",
      "Para precisão, digite o número logo após pressionar \`E\` (ex: \`E 2 Enter\`).",
      "**Extrude Individual** (\`Alt+E\`) é essencial para extrudar várias faces sem juntá-las.",
      "Cancelar com \`Esc\` deixa **geometria duplicada no lugar** — perigoso!",
      "Combine com \`S\` (escala) e \`R\` (rotação) logo depois para esculpir formas torcidas.",
    ],
    alerts: [
      { type: "danger", content: "Cancelar Extrude com \`Esc\` cria **vértices duplicados** invisíveis. Sempre desfaça com \`Ctrl+Z\` em seguida, ou use **Merge by Distance** (\`M → By Distance\`) para limpar." },
      { type: "tip", content: "Para extrudar **exatamente** 1 metro, digite \`E 1 Enter\`. Sem o número, o valor depende de quanto o mouse se moveu." },
      { type: "info", content: "Em modo aresta, extrudar uma aresta de borda cria uma nova face — útil para construir paredes a partir do contorno do chão." },
    ],
  },
  {
    slug: "inset",
    section: "modelagem",
    title: "Inset — Faces Dentro de Faces",
    difficulty: "iniciante",
    subtitle: "Cria uma cópia menor da face dentro dela mesma — base para janelas, botões e detalhes.",
    intro: `
Se Extrude é puxar a geometria para fora, **Inset** é desenhar uma "moldura" dentro de uma face existente. O atalho é \`I\`: você seleciona uma ou mais faces, aperta \`I\`, move o mouse e o Blender cria uma face menor dentro, conectada por uma borda anelar. Essa borda nova é o que permite, depois, extrudar para dentro (criando um buraco) ou para fora (criando um botão em alto-relevo).

A operação é tão usada que tem um irmão: \`I\` duas vezes (\`I I\`) ativa o **Inset Individual**, que faz o mesmo em cada face selecionada de forma independente. Útil quando você seleciona, digamos, todas as faces de uma grade e quer criar um padrão de janelas em cada uma.

## O fluxo Inset → Extrude
A combinação \`I → E\` (inset depois extrude) é uma das sequências mais frequentes do Blender. Use-a para fazer cavidades, painéis afundados, bordas de botões, recessos de tela em monitores. Aprenda esse combo agora — ele aparece em **todo** tutorial sério de modelagem hard-surface.

## Detalhes finos
O painel Operator após o Inset oferece campos como **Thickness** (espessura da moldura), **Depth** (deslocamento perpendicular) e **Boundary** (controla se bordas abertas devem ter inset). Ajustar Thickness com precisão dá controle milimétrico — muito mais limpo do que mover o mouse à mão livre.
    `,
    codes: [
      { lang: "atalho", code: "I        → Inset Region (todas as faces juntas)\nI I      → Inset Individual (cada face por si)\nB        → toggle Boundary durante o Inset\nO        → toggle Outset (cresce para fora)" },
      { lang: "passo-a-passo", code: "1. Cubo padrão em Edit Mode, modo face (3).\n2. Selecione a face de cima.\n3. Pressione I, mova o mouse → veja a moldura aparecer.\n4. Clique para confirmar.\n5. Pressione E, Z, mova para baixo → você criou uma cavidade." },
      { lang: "python", code: "import bpy\nimport bmesh\n\nobj = bpy.context.edit_object\nbm = bmesh.from_edit_mesh(obj.data)\n\nfaces = [f for f in bm.faces if f.select]\n# thickness = espessura, depth = quanto afunda/sobe\nbmesh.ops.inset_region(bm, faces=faces, thickness=0.1, depth=0.0)\nbmesh.update_edit_mesh(obj.data)" },
      { lang: "config", code: "Painel Operator (após Inset):\n  Thickness: 0.1   ← espessura da borda\n  Depth:     0.0   ← negativo afunda, positivo levanta\n  Individual Faces: ☐\n  Outset:    ☐" },
    ],
    points: [
      "**Inset (\`I\`)** cria uma face menor dentro de uma face existente.",
      "**\`I I\`** (duas vezes) faz **Inset Individual** — uma para cada face.",
      "A combinação \`I → E\` é o caminho clássico para fazer cavidades.",
      "Use \`Thickness\` no painel Operator para precisão milimétrica.",
      "Inset não funciona em vértices nem em arestas — só em faces.",
      "Se a face for n-gon (5+ lados), o resultado pode ficar estranho; cuidado.",
    ],
    alerts: [
      { type: "tip", content: "Apertou \`I\` e o resultado parece distorcido? Provavelmente você selecionou faces não-coplanares. Tente **Inset Individual** (\`I I\`)." },
      { type: "info", content: "Inset Individual é o segredo para criar padrões de **janelas em prédios** rapidamente: selecione a grade de faces, \`I I\`, depois \`E\` para extrudar para dentro." },
      { type: "warning", content: "O atalho \`O\` durante o Inset não é \"orto\" — é **Outset**, que faz a moldura crescer para fora ao invés de para dentro. Confunde no começo." },
    ],
  },
  {
    slug: "bevel",
    section: "modelagem",
    title: "Bevel — Chanfros e Quinas Suaves",
    difficulty: "iniciante",
    subtitle: "Substitui uma aresta dura por várias arestas próximas, criando uma quina arredondada.",
    intro: `
No mundo real, quase nada tem quinas perfeitamente afiadas — mesa, celular, parede, tudo tem um leve **chanfro** ou **arredondamento** na borda. É isso que faz objetos parecerem reais em renderizações, porque a luz pega a quina e cria aquele "brilho de borda" característico. A ferramenta **Bevel** (\`Ctrl+B\` em arestas, \`Ctrl+Shift+B\` em vértices) é responsável por adicionar esse detalhe.

Mecanicamente, Bevel pega a aresta selecionada e a substitui por **N arestas paralelas próximas**, separadas por uma pequena distância. O resultado é uma faixa estreita de faces no lugar da quina única. Você controla dois parâmetros principais com a roda do mouse durante a operação: **Width** (largura do chanfro) e **Segments** (quantas subdivisões — 1 cria um chanfro reto, 3+ criam um arredondamento suave).

## Bevel em vértices
\`Ctrl+Shift+B\` faz bevel em vértices, transformando um canto pontudo numa pequena face triangular ou poligonal. Útil para suavizar pontas isoladas, como o canto de um banner ou de um cartão.

## Edge crease vs Bevel
Iniciantes costumam confundir Bevel com **Edge Crease** (usado com Subdivision Surface). Bevel adiciona geometria real, sempre. Crease é só uma marcação que diz ao modificador "preserve essa quina". Vamos detalhar essa diferença no capítulo de Subdivision Surface.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl+B           → Bevel em arestas\nCtrl+Shift+B     → Bevel em vértices\nWheel (durante)  → ajusta número de Segments\nS (durante)      → ajusta perfil (Shape, 0.5 = circular)\nDigite número    → Width exato (ex: 0.05)" },
      { lang: "passo-a-passo", code: "1. Cubo em Edit Mode, modo aresta (2).\n2. Selecione todas as 12 arestas (A).\n3. Ctrl+B, mova o mouse levemente.\n4. Role a roda do mouse 2 vezes para cima → 3 segmentos.\n5. Clique para confirmar — você tem um cubo com quinas suaves." },
      { lang: "python", code: "import bpy\nimport bmesh\n\nobj = bpy.context.edit_object\nbm = bmesh.from_edit_mesh(obj.data)\n\nedges = [e for e in bm.edges if e.select]\nbmesh.ops.bevel(\n    bm,\n    geom=edges,\n    offset=0.05,\n    segments=3,\n    profile=0.5,\n    affect='EDGES'\n)\nbmesh.update_edit_mesh(obj.data)" },
      { lang: "config", code: "Painel Operator pós-Bevel:\n  Width Type: Offset | Width | Depth | Percent\n  Width:      0.05\n  Segments:   3\n  Shape:      0.5   (1.0 = quadrado, 0.5 = circular, 0.0 = côncavo)" },
    ],
    points: [
      "**Bevel (\`Ctrl+B\`)** suaviza arestas substituindo-as por várias paralelas.",
      "Use a **roda do mouse** durante a operação para mudar o número de segmentos.",
      "**Shape 0.5** dá um arredondamento perfeito; 1.0 fica anguloso, 0.0 fica côncavo.",
      "Bevel em vértices usa \`Ctrl+Shift+B\`.",
      "Mais segmentos = mais geometria = arquivo mais pesado. Use o mínimo necessário.",
      "Existe também o **Bevel Modifier** — não-destrutivo, ideal para projetos editáveis.",
    ],
    alerts: [
      { type: "tip", content: "Para um chanfro **realista de produto**, 2 ou 3 segmentos com Width pequeno (~1mm na escala real) já bastam. Não exagere." },
      { type: "warning", content: "Bevel em arestas que se cruzam em quantidades diferentes (ex: 3 arestas num vértice) pode gerar geometria estranha. Confira topologia antes." },
      { type: "info", content: "O **Bevel Modifier** (no Properties) é a versão não-destrutiva: você ajusta a qualquer momento sem perder o trabalho." },
    ],
  },
  {
    slug: "loop-cut",
    section: "modelagem",
    title: "Loop Cut — Adicionando Anéis de Arestas",
    difficulty: "iniciante",
    subtitle: "Insere um corte que dá a volta na malha, criando arestas para detalhar.",
    intro: `
Imagine que você tem um cilindro liso e precisa criar um detalhe "no meio" — uma faixa, uma articulação, uma linha de costura. Você precisa de **mais geometria** ali, mas adicionar vértices um a um seria insano. A solução é o **Loop Cut**, atalho \`Ctrl+R\`: ele detecta o "anel natural" da topologia e insere um corte completo, criando dezenas de vértices novos com um clique.

Quando você aperta \`Ctrl+R\` e passa o mouse sobre uma face, uma linha amarela aparece prevendo onde o corte vai entrar. Clique uma vez para confirmar a posição inicial — agora a linha fica laranja e você pode **deslizá-la** com o mouse para qualquer lugar entre os anéis vizinhos. Clique de novo para fixar, ou clique com botão direito (ou \`Esc\`) para deixar exatamente no centro (50%).

## Roda do mouse = múltiplos cortes
Ainda durante a previsão amarela, role a **roda do mouse para cima** e o Blender adiciona vários cortes igualmente espaçados de uma vez. Excelente para criar segmentações para curvar um cano, articular um membro, ou preparar uma malha para deformação.

## Loop Cut and Slide
O nome completo da ferramenta é **Loop Cut and Slide** porque, depois do corte, você ainda escorrega a aresta. Existe também \`G G\` (apertar G duas vezes) que faz o **Edge Slide** em arestas já existentes — útil para reposicionar loops sem criar novos.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl+R         → inicia Loop Cut\nWheel up/down  → muda número de cortes simultâneos\nLMB (1ª vez)   → confirma posição inicial → entra em slide\nLMB (2ª vez)   → confirma slide\nRMB / Esc      → confirma centralizado (50%)\nG G            → Edge Slide em aresta já existente" },
      { lang: "passo-a-passo", code: "1. Adicione um cubo, entre em Edit Mode.\n2. Pressione Ctrl+R e passe o mouse sobre uma face lateral.\n3. Veja a linha amarela horizontal ou vertical.\n4. Role a roda do mouse para cima 2x → agora 3 cortes.\n5. Clique uma vez (laranja), depois botão direito → 3 loops centralizados." },
      { lang: "python", code: "import bpy\n\n# Loop Cut programático no objeto ativo (precisa estar em Edit Mode)\n# number_cuts = quantos loops, smoothness = curvatura (para superfícies suaves)\nbpy.ops.mesh.loopcut_slide(\n    MESH_OT_loopcut={\n        'number_cuts': 1,\n        'smoothness': 0.0,\n        'falloff': 'INVERSE_SQUARE',\n        'edge_index': 0,\n    },\n    TRANSFORM_OT_edge_slide={'value': 0.0}\n)" },
      { lang: "config", code: "Após o corte, no painel Operator:\n  Factor:        0.0     (–1 a 1, posição relativa ao centro)\n  Even:          ☐       (mantém distância igual em ambos os lados)\n  Clamp:         ☑       (impede ultrapassar os anéis vizinhos)" },
    ],
    points: [
      "**Loop Cut (\`Ctrl+R\`)** adiciona um anel completo de arestas.",
      "A **roda do mouse** antes do primeiro clique controla quantos cortes simultâneos.",
      "**Botão direito** durante o slide centraliza no meio (50%) — atalho prático.",
      "**\`G G\`** desliza uma aresta já existente sem criar nova.",
      "Loop Cut requer **quads** (faces de 4 lados) — ele para em \`tris\` e \`n-gons\`.",
      "Use loops para preparar curvaturas, dobras de animação e detalhes de modelagem.",
    ],
    alerts: [
      { type: "warning", content: "Se o loop não dá a volta inteira, é porque a topologia tem **n-gons** ou **tris** no caminho. O Blender simplesmente para por ali." },
      { type: "tip", content: "Para posicionar **exatamente** a aresta após o corte, abra o painel Operator e digite o **Factor** numérico (ex: 0.25 para 25% do meio)." },
      { type: "info", content: "Loops bem posicionados são a base de **good topology**. Vale estudar imagens de \"edge flow\" em personagens 3D." },
    ],
  },
  {
    slug: "knife-bisect",
    section: "modelagem",
    title: "Knife e Bisect — Cortes Personalizados",
    difficulty: "intermediario",
    subtitle: "Quando o Loop Cut não basta: cortes livres com a faca e cortes planares com o Bisect.",
    intro: `
Loop Cut é maravilhoso quando a topologia coopera, mas e quando você precisa cortar **em diagonal**, ou seguir um contorno irregular, ou separar um pedaço da malha por um plano? Aí entram dois cuteleiros: o **Knife** (\`K\`) e o **Bisect** (no menu \`Mesh → Bisect\`).

O **Knife** é como uma faca real: você ativa com \`K\`, clica para começar a linha, clica em cada vértice/aresta intermediário e finaliza com \`Enter\` (ou \`Esc\` para cancelar). Ele cria novos vértices nos pontos onde a linha cruza arestas existentes, e novas arestas conectando esses pontos. Use \`C\` durante a operação para travar em ângulos de 45°/90°, e \`Z\` para que a faca atravesse a malha (cortar também o lado de trás).

## Bisect: corte planar
O **Bisect** é diferente: você seleciona faces, ativa o operador, e arrasta uma linha no espaço — o Blender corta toda a seleção pelo plano definido. Tem opções para **preencher** o corte com uma face nova (\`Fill\`), **remover** o lado interno ou externo (\`Clear Inner / Outer\`), efetivamente fatiando o objeto. É a ferramenta clássica para fazer um corte limpo num modelo, como serrar uma maçã ao meio.

## Quando usar cada um
- **Knife**: cortes irregulares, seguindo contornos manuais, precisão de vértice em vértice.
- **Bisect**: cortes retos por um plano definido — ideal para simetria, partição ou criação de "tampas" planas.
    `,
    codes: [
      { lang: "atalho", code: "K              → Knife\n  Click        → adiciona ponto na linha de corte\n  Enter        → confirma\n  Esc          → cancela\n  C            → trava ângulo (45°/90°)\n  Z            → atravessa a malha\n  E            → novo corte (a partir da linha atual)\nMesh → Bisect → corte planar (sem atalho padrão)" },
      { lang: "passo-a-passo", code: "Knife básico:\n1. Cubo em Edit Mode, todas as faces visíveis.\n2. Pressione K.\n3. Clique no centro de uma aresta superior.\n4. Clique no centro da aresta oposta inferior.\n5. Pressione Enter — você criou um corte diagonal.\n\nBisect:\n1. Selecione tudo (A).\n2. Mesh → Bisect.\n3. Arraste uma linha horizontal no meio do cubo.\n4. No painel Operator: marque Fill, Clear Inner.\n5. Resultado: metade superior removida, tampa plana." },
      { lang: "python", code: "import bpy\nimport bmesh\nfrom mathutils import Vector\n\nobj = bpy.context.edit_object\nbm = bmesh.from_edit_mesh(obj.data)\n\n# Bisect: corta no plano Z=0, preenche, remove parte de baixo\ngeom = list(bm.verts) + list(bm.edges) + list(bm.faces)\nbmesh.ops.bisect_plane(\n    bm,\n    geom=geom,\n    plane_co=Vector((0, 0, 0)),\n    plane_no=Vector((0, 0, 1)),\n    clear_inner=True,\n    clear_outer=False,\n)\nbmesh.update_edit_mesh(obj.data)" },
      { lang: "config", code: "Painel Operator do Bisect:\n  Plane Point:  (0, 0, 0)\n  Plane Normal: (0, 0, 1)\n  Clear Inner:  ☑\n  Clear Outer:  ☐\n  Fill:         ☑   ← gera face nova fechando o corte" },
    ],
    points: [
      "**Knife (\`K\`)**: cortes manuais, ponto a ponto.",
      "**Bisect** (menu Mesh): corte planar definido por uma linha em tela.",
      "\`C\` durante o Knife trava em ângulos retos — útil para cortes ortogonais.",
      "\`Z\` durante o Knife atravessa a malha (corta também o lado oculto).",
      "**Fill** no Bisect cria uma face nova fechando o corte — essencial para cortes \"limpos\".",
      "Knife pode gerar **n-gons** se cortar uma face em formato irregular — fique atento.",
      "Use Bisect para criar **simetria perfeita** antes de aplicar Mirror Modifier.",
    ],
    alerts: [
      { type: "tip", content: "Durante o Knife, segure \`Shift\` para snapar exatamente no meio de uma aresta — útil para cortes perfeitamente centrados." },
      { type: "warning", content: "Cancelar Knife com \`Esc\` descarta tudo; confirmar com clique do meio do mouse mantém parcialmente. Use sempre \`Enter\`." },
      { type: "info", content: "O Bisect respeita a **direção da câmera ortográfica**: para cortes precisos, vá para a vista Frontal (\`Numpad 1\`) ou Lateral (\`Numpad 3\`) antes." },
    ],
  },
  {
    slug: "bridge-edge-loops",
    section: "modelagem",
    title: "Bridge Edge Loops — Conectando Aberturas",
    difficulty: "intermediario",
    subtitle: "Une dois (ou mais) loops de arestas com faces, criando um \"túnel\" entre eles.",
    intro: `
Já te aconteceu de ter dois cilindros separados e querer conectá-los como um cano em U? Ou de cortar um buraco numa parede e precisar criar a parte de trás? **Bridge Edge Loops** é a ferramenta que faz exatamente essa "ponte" — você seleciona dois loops abertos de arestas e o Blender gera as faces que ligam um ao outro.

A operação está no menu \`Edge → Bridge Edge Loops\` (sem atalho padrão, mas você pode atribuir um). Ela funciona melhor quando os dois loops têm o **mesmo número de vértices** — caso contrário, o Blender tenta interpolar, mas o resultado pode ficar torto. Para casos com contagens diferentes, considere primeiro adicionar/remover vértices até equiparar.

## Parâmetros importantes
No painel Operator pós-operação você encontra:
- **Number of Cuts**: subdivisões ao longo da ponte (cria loops intermediários).
- **Smoothness**: curvatura — 0 deixa retinho, 1 cria uma curva suave entre os loops.
- **Profile Factor / Shape**: controla o perfil da curvatura.

## Bridge vs Grid Fill vs Fill
- **Bridge** liga **dois** loops separados.
- **Grid Fill** preenche **um** loop fechado retangular com uma malha em grade.
- **Fill (\`F\`)** cria uma única face (n-gon) fechando o loop, sem subdivisão.

Confundir essas três é um clássico de iniciante; cada uma resolve um problema distinto.
    `,
    codes: [
      { lang: "atalho", code: "Edge → Bridge Edge Loops   (sem atalho padrão)\nF                          → cria face/aresta entre vértices selecionados\nMesh → Fill → Grid Fill   → preenche loop fechado retangular" },
      { lang: "passo-a-passo", code: "1. Adicione 2 cilindros, posicione um acima do outro com gap.\n2. Selecione ambos no Object Mode, Ctrl+J → junta em um objeto.\n3. Tab para Edit Mode, modo face (3).\n4. Apague a tampa de cima do inferior e a de baixo do superior (X → Faces).\n5. Modo aresta (2), Alt+clique nas duas bordas abertas.\n6. Edge → Bridge Edge Loops → cano conectado.\n7. No painel Operator, ajuste Smoothness para 1 → curva suave." },
      { lang: "python", code: "import bpy\nimport bmesh\n\nobj = bpy.context.edit_object\nbm = bmesh.from_edit_mesh(obj.data)\n\n# Pega arestas selecionadas e faz a ponte\nedges = [e for e in bm.edges if e.select]\nbmesh.ops.bridge_loops(bm, edges=edges)\nbmesh.update_edit_mesh(obj.data)" },
      { lang: "config", code: "Painel Operator pós-Bridge:\n  Connect Loops:    Open Loop | Closed Loop | Pairs\n  Merge:            ☐\n  Twist:            0   (corrige torções inesperadas)\n  Number of Cuts:   0\n  Smoothness:       1.0\n  Profile Factor:   0.0" },
    ],
    points: [
      "**Bridge Edge Loops** une dois loops de arestas com faces interpoladas.",
      "Funciona melhor com loops de **mesma contagem de vértices**.",
      "**Smoothness** controla curvatura — combine com **Number of Cuts** para curvas elegantes.",
      "**Twist** corrige torções (típico quando loops têm orientações diferentes).",
      "Diferente de **Grid Fill** (preenche um loop fechado) e de **Fill** (cria n-gon).",
      "Pré-requisito: as arestas selecionadas precisam formar **loops reais** (caminhos conectados).",
    ],
    alerts: [
      { type: "tip", content: "Antes de fazer Bridge, conte os vértices de cada loop com \`N\` (painel lateral) → aba Item. Diferenças causam topologia ruim." },
      { type: "warning", content: "Se o resultado ficar **torcido**, ajuste o parâmetro **Twist** no painel Operator — geralmente +1 ou –1 resolve." },
      { type: "success", content: "Bridge é a forma mais rápida de fazer um **cabo, mangueira ou túnel** entre duas aberturas circulares." },
    ],
  },
  {
    slug: "fill-grid-fill",
    section: "modelagem",
    title: "Fill e Grid Fill — Fechando Aberturas",
    difficulty: "intermediario",
    subtitle: "Três jeitos de tapar buracos: Fill rápido, Grid Fill ordenado e Beauty Fill.",
    intro: `
Modelagem é, em grande parte, controlar onde há e onde não há geometria. Mas chega o momento de **fechar** — uma tampa de garrafa, o fundo de uma caixa, o topo de um cilindro recortado. O Blender oferece três operadores para isso: **Fill** (\`F\`), **Grid Fill** e **Beauty Fill**. Cada um tem seu lugar.

O mais simples é \`F\`: selecione 3 ou mais vértices conectados (ou um loop fechado de arestas) e pressione \`F\`. O Blender cria uma face única — pode ser triângulo, quad ou n-gon, dependendo de quantos vértices você selecionou. É instantâneo, mas se for muitos vértices vira um n-gon (que pode causar problemas de sombreamento).

## Grid Fill
Para loops fechados com número par de vértices, **Grid Fill** (\`Mesh → Fill → Grid Fill\` ou \`Ctrl+F → Grid Fill\`) preenche o buraco com **quads em grade**, mantendo topologia limpa. Funciona perfeitamente em buracos retangulares ou circulares com contagem par. Se a contagem for ímpar, ele falha — adicione/remova um vértice antes.

## Beauty Fill
Quando você usa \`F\` num loop com vários vértices, o resultado é um n-gon. Em seguida, com a face selecionada, use \`Mesh → Fill → Beautify Faces\` (\`Ctrl+Shift+F\`) para o Blender re-triangular esse n-gon de forma "esteticamente equilibrada". Bom para terrenos e formas orgânicas onde a topologia exata não importa.
    `,
    codes: [
      { lang: "atalho", code: "F              → Fill (cria face única)\nCtrl+F         → menu Faces (incluindo Grid Fill)\nCtrl+Shift+F   → Beautify Faces (re-triangula n-gons)\nAlt+F          → Fill com triangulação automática" },
      { lang: "passo-a-passo", code: "Grid Fill clássico:\n1. Cilindro de 16 lados.\n2. Tab → Edit Mode, modo face (3).\n3. Selecione e apague a tampa superior (X → Faces).\n4. Modo aresta, Alt+clique no loop superior (16 arestas).\n5. Mesh → Fill → Grid Fill → tampa em grade limpa." },
      { lang: "python", code: "import bpy\nimport bmesh\n\nobj = bpy.context.edit_object\nbm = bmesh.from_edit_mesh(obj.data)\n\n# Grid Fill nas arestas selecionadas\nedges = [e for e in bm.edges if e.select]\nbmesh.ops.grid_fill(bm, edges=edges, mat_nr=0, use_smooth=True)\nbmesh.update_edit_mesh(obj.data)" },
      { lang: "config", code: "Painel Operator do Grid Fill:\n  Span:    4    ← controla orientação da grade\n  Offset:  0    ← rotaciona o ponto de partida\n  Use Interp Simple: ☐" },
    ],
    points: [
      "**\`F\`** é o jeito mais rápido — cria uma face única, possivelmente n-gon.",
      "**Grid Fill** preenche loops fechados de **vértices pares** com quads em grade.",
      "**Beautify Faces (\`Ctrl+Shift+F\`)** melhora a triangulação de n-gons existentes.",
      "Para tampas circulares limpas, sempre prefira **Grid Fill** quando possível.",
      "Se Grid Fill não funcionar, conte os vértices — número ímpar é o problema 90% das vezes.",
      "Use **Span** e **Offset** no painel Operator para alinhar a direção da grade ao seu gosto.",
    ],
    alerts: [
      { type: "info", content: "**N-gons** (faces com 5+ lados) parecem ok em modo sólido, mas podem causar artefatos em sombreamento e em exportação para game engines." },
      { type: "tip", content: "Se Grid Fill falhar, dissolva uma aresta com \`Ctrl+X\` para reduzir 1 vértice e tente novamente." },
      { type: "warning", content: "Após \`F\` num loop irregular, sempre cheque a face em modo **MatCap** ou ative \`Statistics\` no overlay para ver se virou n-gon." },
    ],
  },
  {
    slug: "proportional-editing",
    section: "modelagem",
    title: "Proportional Editing — Edição Proporcional",
    difficulty: "intermediario",
    subtitle: "Move um vértice e leva os vizinhos junto, com queda suave configurável.",
    intro: `
Imagine que você tem um terreno plano (um plano subdividido várias vezes) e quer criar uma **colina suave** no meio. Mover um único vértice cria um pico afilado, totalmente irrealista. Mover todos manualmente, um por um, leva horas. **Proportional Editing** resolve esse impasse: ao ativar (\`O\` minúsculo), qualquer transformação afeta os vértices próximos com uma **queda suave** (falloff), como se você estivesse puxando um lençol elástico.

Você ativa com \`O\` (ou clicando no ícone de círculo no header da viewport, à direita dos modos de seleção). Quando ativo, ao pressionar \`G\`/\`R\`/\`S\`, um **círculo de influência** aparece em torno do vértice ativo. **Role a roda do mouse** para aumentar/diminuir o raio. Tudo dentro do círculo é afetado, com força máxima no centro e zero na borda.

## Tipos de Falloff
Há vários perfis de queda no menu ao lado do botão de Proportional Editing:
- **Smooth**: padrão, suave em S.
- **Sphere**: queda esférica.
- **Root**: cresce mais rápido perto do centro.
- **Sharp**: pico afiado no centro.
- **Linear**: gradiente reto.
- **Constant**: tudo na mesma intensidade — útil para mover ilhas inteiras.
- **Random**: deslocamentos aleatórios — ótimo para detalhe orgânico.

## Connected vs livre
\`Alt+O\` ativa **Connected**: a influência só se propaga por vértices **conectados pela malha**, não por proximidade no espaço. Ideal para personagens com partes próximas (ex: dedos colados) sem afetar uma parte ao tocar a vizinha.
    `,
    codes: [
      { lang: "atalho", code: "O          → toggle Proportional Editing\nAlt+O      → toggle Connected\nWheel ↑↓   → ajusta raio durante a operação\nShift+O    → cicla entre falloff types (em algumas versões)" },
      { lang: "passo-a-passo", code: "1. Adicione um plano, Tab → Edit Mode.\n2. Subdivida 5x (botão direito → Subdivide, ou Right Click menu).\n3. Pressione 1 (vértice), selecione o vértice central.\n4. Pressione O para ativar Proportional Editing.\n5. G + Z, mova para cima → role a roda do mouse para mudar o raio.\n6. Clique → você fez uma colina suave." },
      { lang: "python", code: "import bpy\n\n# Ativa Proportional Editing globalmente\nbpy.context.scene.tool_settings.use_proportional_edit = True\nbpy.context.scene.tool_settings.proportional_edit_falloff = 'SMOOTH'\nbpy.context.scene.tool_settings.proportional_size = 1.5  # raio em unidades" },
      { lang: "config", code: "Header (Edit Mode), à direita dos botões de seleção:\n  ◯ Proportional Editing (O)\n  ⌄ Falloff: Smooth | Sphere | Root | InvSquare | Sharp | Linear | Constant | Random\n  ☐ Connected Only (Alt+O)\n  ☐ Projected from View" },
    ],
    points: [
      "**Proportional Editing (\`O\`)** afeta vértices vizinhos com queda suave.",
      "**Roda do mouse** durante \`G\`/\`R\`/\`S\` ajusta o raio de influência.",
      "**Connected (\`Alt+O\`)** propaga só por arestas conectadas — essencial para personagens.",
      "**Smooth** é o falloff mais usado; **Random** é ouro puro para terrenos.",
      "Sem geometria suficiente (sem subdivisão), a edição proporcional não tem o que afetar.",
      "Pode ser usado em Object Mode também, afetando objetos próximos ao ativo.",
    ],
    alerts: [
      { type: "tip", content: "Se você está em Edit Mode e nada se move suavemente, **provavelmente esqueceu de subdividir** — sem vértices intermediários, não há gradiente possível." },
      { type: "warning", content: "Esquecer de **desligar** Proportional Editing depois é causa frequente de \"meu modelo se deformou todo!\". Sempre confira o ícone \`O\` no header." },
      { type: "info", content: "Para terrenos realistas: combine **Random falloff** com pequenos movimentos verticais — gera variação natural sem trabalho manual." },
    ],
  },
  {
    slug: "mirror-modifier",
    section: "modelagem",
    title: "Mirror Modifier — Trabalhando em Simetria",
    difficulty: "intermediario",
    subtitle: "Modele só uma metade — o Blender espelha automaticamente.",
    intro: `
Personagens, móveis, veículos: a maior parte do que modelamos é **simétrico**. Modelar os dois lados manualmente é redundante e propenso a erros (um lado fica diferente do outro). A solução elegante é o **Mirror Modifier**: você modela apenas metade, e o Blender gera a outra metade espelhada em tempo real, sempre sincronizada.

Modificadores são "operações ao vivo" aplicadas ao objeto sem alterar a malha base. Você os adiciona pelo painel **Properties → ícone de chave inglesa** (\`Modifier Properties\`). Clique em \`Add Modifier → Mirror\`. Imediatamente, sua malha aparece duplicada e espelhada — por padrão no eixo X.

## Configurações essenciais
- **Axis**: escolha X, Y ou Z (ou múltiplos).
- **Mirror Object**: opcionalmente, use outro objeto como "espelho" — útil para espelhar em torno de um plano arbitrário.
- **Clipping**: vértices da metade não cruzam o eixo de simetria — evita que você "vaze" a malha para o outro lado por acidente.
- **Merge**: vértices que ficam exatamente no eixo são mesclados, evitando duplicatas.

## Fluxo correto
1. Adicione um cubo, vá para Edit Mode.
2. **Apague metade** (selecione todas as faces de um lado, X → Faces).
3. Volte para Object Mode, adicione Mirror Modifier.
4. Volte para Edit Mode, ative \`Edit Mode display: On Cage\` se quiser editar vendo o resultado espelhado.
5. Trabalhe à vontade — quando estiver pronto, **Apply** (Ctrl+A no modificador) finaliza a simetria.
    `,
    codes: [
      { lang: "atalho", code: "Properties → Modifier Properties (chave inglesa)\nCtrl+A (no modificador) → Apply\nShift+A (em Edit Mode) → adiciona geometria que será espelhada" },
      { lang: "passo-a-passo", code: "1. Cubo → Edit Mode → modo face (3).\n2. Selecione as 3 faces de um lado (ex: X+).\n3. X → Faces (apaga metade).\n4. Tab → Object Mode.\n5. Properties → Modifier Properties → Add Modifier → Mirror.\n6. Veja o cubo voltar ao normal — a outra metade é espelhada.\n7. Tab de novo, edite uma face — a outra acompanha." },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.active_object\nmod = obj.modifiers.new(name='Mirror', type='MIRROR')\nmod.use_axis[0] = True   # X\nmod.use_axis[1] = False  # Y\nmod.use_axis[2] = False  # Z\nmod.use_clip = True\nmod.use_mirror_merge = True\nmod.merge_threshold = 0.001" },
      { lang: "config", code: "Painel Mirror Modifier:\n  Axis:        ☑X  ☐Y  ☐Z\n  Bisect:      ☐X  ☐Y  ☐Z   (corta antes de espelhar)\n  Flip:        ☐X  ☐Y  ☐Z   (inverte o lado retornado)\n  Mirror Object: <nenhum>\n  Clipping:     ☑\n  Merge:        ☑   Threshold: 0.001\n  UV Mirroring: ☐" },
    ],
    points: [
      "**Mirror Modifier** espelha a malha ao vivo sem alterar a base.",
      "Apague a metade antes de aplicar — evita geometria duplicada.",
      "**Clipping** trava vértices no eixo de simetria — quase sempre quero ligado.",
      "**Merge** funde vértices que coincidem na linha central.",
      "Origem do objeto define o **plano de espelhamento** — confira antes!",
      "**Apply** finaliza o modificador, mas perde a edição não-destrutiva.",
      "Para personagens, deixe o Mirror **sempre ativo** até finalizar pose/animação.",
    ],
    alerts: [
      { type: "danger", content: "Se a origem do objeto **não está no centro de simetria**, o espelhamento sai deslocado. Ajuste com \`Object → Set Origin → Origin to 3D Cursor\` (com cursor no zero)." },
      { type: "tip", content: "Ative **On Cage** (ícone de triângulo no modificador) para editar **enxergando** a metade espelhada — o feedback visual é incrível." },
      { type: "info", content: "**Bisect** dentro do Mirror corta o que ultrapassar a linha de simetria — útil para limpar geometria errante sem sair do modo." },
    ],
  },
  {
    slug: "subdivision-surface",
    section: "modelagem",
    title: "Subdivision Surface — Suavidade Algorítmica",
    difficulty: "avancado",
    subtitle: "O modificador que transforma poucos polígonos em superfícies suaves de alta qualidade.",
    intro: `
Modelar superfícies orgânicas (rostos, frutas, panos) com milhares de polígonos manualmente é insano. O **Subdivision Surface Modifier** (carinhosamente "subsurf") resolve isso: ele recebe uma malha de baixa resolução (sua "**cage**") e gera, ao vivo, uma versão subdividida e suavizada — preservando o controle pela malha simples e devolvendo a aparência de uma superfície curva contínua.

O algoritmo padrão é **Catmull-Clark**, o mesmo usado pela Pixar há décadas. Cada face é dividida em 4, e os novos vértices são posicionados pela média ponderada dos vizinhos — o que cria suavização natural. Você adiciona com \`Ctrl+1\` (1 nível), \`Ctrl+2\` (2 níveis), até \`Ctrl+5\`. Quanto mais níveis, mais suave **e mais pesado**.

## Controlando bordas: o trio sagrado
Como suavizar tudo arredonda demais, você precisa de **arestas duras** em algumas regiões. Há três técnicas:
1. **Loops de suporte**: adicionar um Loop Cut perto da quina força o algoritmo a manter aquela região mais "afiada".
2. **Edge Crease**: selecione a aresta, \`Shift+E\` e arraste — define o quanto ela "resiste" à suavização (0 a 1).
3. **Bevel pré-subsurf**: chanfrar antes do subsurf cria quinas controladas com loops automáticos.

## Cage / Real / Render
Cada modificador tem três ícones: olho (visível na viewport), tela (visível no render), triângulo (mostra a cage editável durante Edit Mode). Domine esses ícones — é o segredo de trabalhar leve mesmo com modificadores pesados.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl+1..5     → adiciona/define Subdivision Surface com N níveis\nShift+E       → Edge Crease (em modo aresta)\nCtrl+R        → Loop Cut (para suporte de quinas)" },
      { lang: "passo-a-passo", code: "1. Cubo padrão.\n2. Ctrl+2 → cubo vira esfera arredondada (subsurf nível 2).\n3. Tab → Edit Mode, modo aresta (2).\n4. Selecione uma aresta vertical do cubo original.\n5. Shift+E, arraste até 1.0 → essa quina vira afiada.\n6. Alternativa: Ctrl+R, adicione um loop perto de cada quina → mesmo efeito sem crease." },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.active_object\nmod = obj.modifiers.new(name='Subsurf', type='SUBSURF')\nmod.levels = 2          # viewport\nmod.render_levels = 3   # render final\nmod.subdivision_type = 'CATMULL_CLARK'  # ou 'SIMPLE'" },
      { lang: "config", code: "Painel Subdivision Surface:\n  Type:           Catmull-Clark | Simple\n  Viewport:       2     ← níveis durante a edição\n  Render:         3     ← níveis no F12\n  Optimal Display: ☑    ← esconde wireframe da subdivisão\n  Use Limit Surface: ☑\n  Quality:        3" },
    ],
    points: [
      "**Subdivision Surface** suaviza algoritmicamente uma malha de baixa resolução.",
      "**Catmull-Clark** é o algoritmo padrão — funciona melhor com **quads**.",
      "**Loops de suporte** próximos a uma quina preservam a dureza local.",
      "**Edge Crease (\`Shift+E\`)** é a alternativa não-destrutiva à dureza.",
      "Use **Viewport baixo + Render alto** para trabalhar leve e renderizar bonito.",
      "Triângulos e n-gons causam **artefatos visíveis** sob subsurf — evite-os.",
      "Combine com **Mirror** colocando Mirror **acima** de Subsurf na pilha.",
    ],
    alerts: [
      { type: "warning", content: "Subsurf em alta resolução (4+) com modelos densos **mata a performance**. Mantenha viewport em 1 ou 2 e suba só no render." },
      { type: "tip", content: "Para **hard surface** (objetos como celular, carro), prefira **loops de suporte** ao Edge Crease — o resultado é mais previsível em renderização." },
      { type: "info", content: "A ordem dos modificadores importa: **Mirror → Subsurf** funciona; o inverso pode duplicar geometria já suavizada de forma estranha." },
    ],
  },
  {
    slug: "projeto-cadeira",
    section: "modelagem",
    title: "Projeto: Modelando uma Cadeira",
    difficulty: "avancado",
    subtitle: "Aplicando todas as ferramentas anteriores num modelo completo, do zero ao final.",
    intro: `
Chegou a hora de juntar tudo. Neste projeto você modelará uma **cadeira simples mas elegante** — assento, encosto e quatro pernas — usando todas as ferramentas vistas até aqui: Extrude, Inset, Bevel, Loop Cut, Mirror, Subdivision Surface. Não vamos copiar uma cadeira específica; vamos seguir uma sequência clara de decisões topológicas, e ao final você terá um modelo limpo, simétrico e renderizável.

A intenção pedagógica é mostrar como um **fluxo profissional** se parece: bloquear formas → refinar topologia → aplicar modificadores → ajustar detalhes finais. Cada passo conecta um capítulo deste livro a um momento concreto do trabalho. Não é só um exercício — é um **modelo mental** que você usará em todos os seus projetos futuros.

## Estratégia geral
1. **Bloqueio**: cubos primitivos posicionados no espaço, pensando nas proporções gerais.
2. **Junção e simetria**: junte tudo num só objeto (\`Ctrl+J\`), apague metade, aplique Mirror.
3. **Detalhamento**: Loop Cut para criar segmentações, Inset+Extrude para reentrâncias, Bevel para suavizar quinas.
4. **Subsurf**: Subdivision Surface no fim para suavizar superfícies curvas (assento, encosto).
5. **Verificação**: rotacione a câmera, observe sombras, corrija topologia onde precisar.

## Dica de mentor
Cadeiras parecem simples, mas são **ótimas** para treinar topologia: têm partes retas (pernas), curvas (assento) e junções (perna-assento). Se você modela uma cadeira limpa, modela quase qualquer objeto de mobiliário.
    `,
    codes: [
      { lang: "passo-a-passo", code: "Bloqueio do assento:\n1. Add → Mesh → Cube. Escale (S) para 0.5 em Z e 1.0 em X/Y → assento achatado.\n2. Mova (G + Z) até a altura desejada (~0.5m).\n\nPerna (uma só, depois espelhamos):\n3. Add → Cube. Escale para 0.05 em X/Y e 0.5 em Z → palito vertical.\n4. Posicione (G) num canto sob o assento.\n\nEncosto:\n5. Add → Cube. Escale para 1.0 em X, 0.05 em Y, 0.6 em Z.\n6. Mova para trás do assento, alinhe verticalmente.\n\nJunção e Mirror:\n7. Selecione perna + assento + encosto, Ctrl+J → um objeto.\n8. Tab → Edit Mode → modo face → apague faces do lado X+ (X → Faces).\n9. Object Mode → Add Modifier → Mirror (eixo X, Clipping ☑, Merge ☑).\n\nDetalhamento:\n10. Edit Mode, Ctrl+R em volta de cada perna → loops de suporte.\n11. Selecione arestas verticais do assento → Ctrl+B, 3 segmentos → bordas suavizadas.\n12. Modo face, selecione face superior do encosto → I (inset) 0.05, E (extrude) –0.02 → reentrância decorativa.\n\nSuavização final:\n13. Object Mode → Add Modifier → Subdivision Surface, viewport 2, render 3.\n14. Right Click → Shade Smooth → superfícies curvas brilham." },
      { lang: "atalho", code: "Tab           → Edit / Object Mode\nE             → Extrude\nI             → Inset\nCtrl+B        → Bevel\nCtrl+R        → Loop Cut\nCtrl+J        → Join\nShift+D       → Duplicate (alternativa ao Mirror)\nCtrl+1..5     → Subsurf nível N" },
      { lang: "python", code: "import bpy\n\n# Cria assento + 1 perna + encosto, junta tudo, aplica Mirror e Subsurf\ndef add_cube(name, location, scale):\n    bpy.ops.mesh.primitive_cube_add(location=location)\n    obj = bpy.context.active_object\n    obj.name = name\n    obj.scale = scale\n    return obj\n\nassento = add_cube('Assento', (0, 0, 0.5),  (1.0,  1.0, 0.05))\nperna   = add_cube('Perna',   (-0.45, -0.45, 0.25), (0.05, 0.05, 0.5))\nencosto = add_cube('Encosto', (0, -0.95, 1.0),  (1.0,  0.05, 0.5))\n\n# Seleciona todas e junta\nfor o in (assento, perna, encosto):\n    o.select_set(True)\nbpy.context.view_layer.objects.active = assento\nbpy.ops.object.join()\n\nchair = bpy.context.active_object\nm1 = chair.modifiers.new('Mirror', 'MIRROR')\nm1.use_axis[0] = True\nm1.use_clip = True\nm2 = chair.modifiers.new('Subsurf', 'SUBSURF')\nm2.levels = 2\nm2.render_levels = 3\nbpy.ops.object.shade_smooth()" },
      { lang: "config", code: "Pilha de modificadores final (de cima para baixo):\n  1. Mirror     (Axis X, Clipping, Merge)\n  2. Subsurf    (Viewport 2, Render 3)\n\nDicas finais:\n  - Right Click → Shade Auto Smooth (30°) para mistura entre suave e duro\n  - Apply Scale (Ctrl+A → Scale) antes de exportar para evitar problemas" },
    ],
    points: [
      "Sempre **bloqueie** com primitivos antes de detalhar — economiza horas de retrabalho.",
      "**Junte (\`Ctrl+J\`)** as partes antes de aplicar Mirror para simetria global.",
      "**Apague metade** antes do Mirror — nunca mantenha geometria sobreposta.",
      "**Loops de suporte** próximos a quinas evitam que o Subsurf arredonde demais.",
      "**Shade Smooth** + **Auto Smooth (30°)** dá superfícies suaves preservando dobras.",
      "**Apply Scale** antes de exportar para softwares ou engines.",
      "Salve **incrementalmente** (\`Ctrl+S\` com nome \`cadeira_v01\`, \`v02\`…) — garante backups por etapa.",
    ],
    alerts: [
      { type: "tip", content: "Antes de aplicar qualquer modificador, **salve uma versão intermediária**. Modificadores aplicados não voltam atrás." },
      { type: "warning", content: "Se a cadeira aparecer **deformada após Subsurf**, provavelmente você tem **n-gons** ou **escala não-aplicada**. Use \`Ctrl+A → Scale\` e \`Mesh → Clean Up → Tris to Quads\`." },
      { type: "success", content: "Concluiu este projeto? Você acabou de aplicar **80% das técnicas reais de modelagem** que usará em qualquer projeto. Parabéns — você é oficialmente um modelador iniciante competente." },
    ],
  },
];
