import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "por-que-uv",
    section: "uv-textura",
    title: "Por que UV? Entendendo o mapeamento de texturas",
    difficulty: "iniciante",
    subtitle: "A ponte entre o mundo 3D do seu modelo e a imagem 2D que vai pintá-lo",
    intro: `
Imagine que você esculpiu um lindo bule em argila e agora quer pintar um desenho colorido nele. Para fazer isso direito, você precisaria \"descascar\" a superfície do bule e abrir essa casca em uma folha plana, como quem desmonta uma caixa de papelão. É exatamente isso que o **UV mapping** faz no Blender: ele pega cada face do seu modelo 3D e descreve onde ela mora dentro de uma imagem 2D chamada **textura**.

As letras **U** e **V** são apenas nomes para os eixos dessa imagem plana — usamos U e V porque X, Y e Z já estão ocupados pelo espaço 3D. Cada vértice do seu modelo recebe uma coordenada \`(u, v)\` entre 0 e 1, e essas coordenadas dizem ao Blender qual pixel da imagem deve aparecer naquele ponto da malha.

## Por que isso importa para você
Sem UVs bem feitas, qualquer textura aplicada ao modelo aparece esticada, espremida ou repetida de forma estranha. Se você já viu aquele "skin quebrado" em jogos antigos, com a face do personagem distorcida, era um problema de UV mal resolvido.

Neste capítulo você vai entender o conceito antes de tocar em qualquer botão. Nos próximos vamos marcar costuras, abrir a malha e finalmente pintar texturas com confiança.
    `,
    codes: [
      { lang: "atalho", code: "U → menu UV Unwrap (Edit Mode)\nTab → alternar Object/Edit Mode\nN → painel lateral (Item / Image)" },
      { lang: "passo-a-passo", code: "1. Selecione o objeto e entre em Edit Mode (Tab)\n2. Selecione todas as faces com A\n3. Pressione U e escolha 'Unwrap'\n4. Abra o workspace 'UV Editing' no topo da janela\n5. Veja a malha aberta no editor 2D à esquerda" },
      { lang: "python", code: "import bpy\n\n# Lista as UV maps de um objeto\nobj = bpy.context.active_object\nfor uv in obj.data.uv_layers:\n    print(uv.name, '— ativa:', uv.active)" },
    ],
    points: [
      "**UV** é o sistema de coordenadas 2D que mapeia uma textura sobre uma malha 3D",
      "Cada objeto pode ter uma ou mais **UV maps** (camadas), úteis para texturas diferentes",
      "Coordenadas vão de 0 a 1; fora desse intervalo a textura se repete (tile)",
      "UVs ruins causam **stretching** (esticamento) e costuras visíveis",
      "O processo padrão é: marcar `seams` → `Unwrap` → ajustar no UV Editor",
      "Sem UV, materiais procedurais ainda funcionam, mas imagens (PNG/JPG) não",
    ],
    alerts: [
      { type: "info", content: "Quando você adiciona um cubo no Blender, ele já vem com uma UV map padrão — útil para testes rápidos." },
      { type: "tip", content: "Pense em UV como **planificação**: o mesmo princípio usado em moldes de costura ou caixas de papelão." },
      { type: "warning", content: "Aplicar **Scale** sem aplicar a transformação (`Ctrl+A`) pode bagunçar a proporção do unwrap." },
    ],
  },
  {
    slug: "marcar-seams",
    section: "uv-textura",
    title: "Marcando Seams: onde cortar a casca da laranja",
    difficulty: "iniciante",
    subtitle: "Costuras estratégicas tornam o unwrap limpo e sem distorções",
    intro: `
Antes de \"abrir\" a malha em 2D, você precisa decidir **onde cortá-la**. Essas linhas de corte se chamam **seams** (costuras), e funcionam exatamente como costuras em uma roupa: ficam escondidas em lugares que ninguém vai notar, mas permitem que o tecido (sua malha) se abra plano.

No Blender, você marca seams selecionando arestas e usando \`Mesh > Edges > Mark Seam\`, ou o atalho do menu \`Ctrl+E\`. As arestas marcadas ficam vermelhas no Edit Mode, indicando ao algoritmo de \`Unwrap\` por onde "rasgar" a malha.

## Onde colocar as seams?
Pense em uma laranja: para descascá-la inteira, você corta uma linha longitudinal. Para um personagem, costumamos esconder seams **dentro de orelhas, embaixo dos braços, atrás das pernas** e no couro cabeludo. Em hard-surface (objetos rígidos), seams seguem cantos vivos naturais do modelo.

A regra de ouro é: **menos seams é melhor, mas não menos do que o necessário**. Poucas seams demais geram esticamento; muitas geram retalhos pequenos e difíceis de pintar.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl+E → menu Edge (inclui Mark/Clear Seam)\n2 → modo de seleção por aresta (Edit Mode)\nAlt+Click → selecionar edge loop\nShift+Alt+Click → adicionar loop à seleção" },
      { lang: "passo-a-passo", code: "1. Tab → Edit Mode\n2. Pressione 2 para selecionar arestas\n3. Alt+Click em uma aresta para pegar o loop inteiro\n4. Ctrl+E → Mark Seam (a aresta fica vermelha)\n5. Para remover: Ctrl+E → Clear Seam" },
      { lang: "python", code: "import bpy, bmesh\n\nobj = bpy.context.edit_object\nbm = bmesh.from_edit_mesh(obj.data)\n\n# Marca como seam todas as arestas selecionadas\nfor e in bm.edges:\n    if e.select:\n        e.seam = True\n\nbmesh.update_edit_mesh(obj.data)" },
      { lang: "config", code: "Overlays > Edge Marks: ON\nTheme > Edit Mode > Seam: vermelho (#FF0000) por padrão" },
    ],
    points: [
      "**Seams** são arestas marcadas que dizem ao unwrap onde cortar a malha",
      "Coloque seams em **regiões escondidas** ou em cantos vivos naturais",
      "Use \`Alt+Click\` para selecionar edge loops inteiros rapidamente",
      "Arestas com seam ficam **vermelhas** no Edit Mode",
      "Seam ≠ Sharp Edge: são propriedades independentes da aresta",
      "Você pode desmarcar com \`Clear Seam\` no mesmo menu (`Ctrl+E`)",
    ],
    alerts: [
      { type: "tip", content: "Ative o overlay **Edge Marks** no canto superior direito do viewport para ver seams com clareza." },
      { type: "warning", content: "Não marque seams em **cantos visíveis** do personagem; a costura da textura pode aparecer no render." },
      { type: "info", content: "Em modelos simétricos, marque seams só de um lado e use o **Mirror Modifier** para espelhar." },
    ],
  },
  {
    slug: "unwrap",
    section: "uv-textura",
    title: "Unwrap: abrindo a malha em 2D",
    difficulty: "iniciante",
    subtitle: "O comando que transforma sua escultura 3D em um molde plano",
    intro: `
Com as seams marcadas, chega a hora mágica: o **Unwrap**. Esse comando pega sua malha 3D, "rasga" pelas seams e desdobra cada pedaço em uma folha 2D. O resultado aparece no **UV Editor**, onde cada face vira um polígono plano que você poderá texturizar.

No Blender, em Edit Mode, com as faces selecionadas (\`A\` para tudo), pressione \`U\` e escolha **Unwrap**. O algoritmo padrão chama-se *Angle Based*, e tenta minimizar distorções respeitando os ângulos da malha. Existe também *Conformal*, mais rápido porém menos preciso.

## Outros métodos do menu U
- **Smart UV Project**: corta automaticamente baseado em ângulos. Ótimo para hard-surface rápido.
- **Cube/Cylinder/Sphere Projection**: projeções geométricas para formas simples.
- **Project from View**: usa o ponto de vista atual como projeção (bom para faces planas).

## Verificando o resultado
Abra o workspace **UV Editing** (topo da janela) e olhe o lado esquerdo: lá está sua malha aberta. Se vir polígonos sobrepostos ou distorcidos, volte e revise as seams. Esse ciclo é normal — quase ninguém acerta de primeira.
    `,
    codes: [
      { lang: "atalho", code: "A → selecionar tudo\nU → menu Unwrap\nU → U (Unwrap padrão)\nU → S (Smart UV Project)" },
      { lang: "passo-a-passo", code: "1. Tab → Edit Mode\n2. A → selecionar todas as faces\n3. U → Unwrap\n4. Vá ao workspace 'UV Editing' no topo\n5. Inspecione a malha aberta à esquerda\n6. Use G/R/S no UV Editor para ajustar ilhas" },
      { lang: "python", code: "import bpy\n\nbpy.ops.object.mode_set(mode='EDIT')\nbpy.ops.mesh.select_all(action='SELECT')\nbpy.ops.uv.unwrap(method='ANGLE_BASED', margin=0.001)" },
      { lang: "config", code: "Smart UV Project:\n  Angle Limit: 66°\n  Island Margin: 0.02\n  Area Weight: 0.0\n  Correct Aspect: ON" },
    ],
    points: [
      "**Unwrap** abre a malha em 2D usando as seams como linhas de corte",
      "**Angle Based** é o método mais usado e equilibrado",
      "**Smart UV Project** é ótimo para objetos rígidos quando você está com pressa",
      "Cada pedaço aberto no UV Editor é chamado de **ilha** (island)",
      "Sem nenhuma seam, o unwrap padrão geralmente gera distorção",
      "Você pode mover, girar e escalar ilhas no UV Editor com `G`, `R`, `S`",
    ],
    alerts: [
      { type: "tip", content: "Use o atalho \`U > A\` para reabrir o **menu Unwrap** rapidamente." },
      { type: "warning", content: "Se aparecer \"object has non-uniform scale\" ao fazer Unwrap, aplique a transformação com \`Ctrl+A > Scale\`." },
      { type: "success", content: "Resultado bom = ilhas com áreas proporcionais às faces 3D e pouca sobreposição." },
    ],
  },
  {
    slug: "uv-editor-tour",
    section: "uv-textura",
    title: "Tour pelo UV Editor",
    difficulty: "iniciante",
    subtitle: "Conheça o painel onde sua malha 2D vive",
    intro: `
O **UV Editor** é uma janela 2D dedicada a manipular as coordenadas UV. Você o encontra no workspace **UV Editing** (topo da tela) ou trocando o tipo de qualquer editor pelo ícone de imagem no canto superior esquerdo.

Visualmente, ele lembra um editor de imagens, mas em vez de pixels você manipula vértices, arestas e faces UV. O quadrado central, do canto \`(0,0)\` ao \`(1,1)\`, é o **espaço de textura**: tudo dentro dele aparece pintado quando você atribui uma imagem ao material.

## Elementos importantes
- **Header (topo)**: seletor de imagem, modo de seleção (vértice/aresta/face/ilha) e ferramentas.
- **N-Panel** (\`N\`): coordenadas exatas de UV selecionada, opções de display.
- **Sidebar de ferramentas** (\`T\`): seleção, mover, girar, escalar.

## Atalhos que você usará o tempo todo
\`G\` move, \`R\` gira, \`S\` escala — exatamente como no 3D. \`A\` seleciona tudo, \`L\` seleciona a ilha sob o cursor. Com \`P\` você "pinha" (Pin) um vértice para que ele não se mova durante novos unwraps.

Dominar este editor é o que separa quem **sofre com texturas** de quem **as controla com precisão**.
    `,
    codes: [
      { lang: "atalho", code: "G/R/S → mover/girar/escalar\nA → selecionar tudo  |  Alt+A → desselecionar\nL → selecionar ilha sob o cursor\nP → Pin  |  Alt+P → Unpin\nCtrl+L → selecionar ilha conectada" },
      { lang: "passo-a-passo", code: "1. Topo da tela → workspace 'UV Editing'\n2. À esquerda fica o UV Editor; à direita o 3D Viewport\n3. Selecione faces no 3D para ver suas UVs realçadas\n4. Use G, R, S no UV Editor para ajustar\n5. N para abrir o painel com coordenadas precisas" },
      { lang: "python", code: "import bpy\n\n# Acessar coordenadas UV via API\nobj = bpy.context.active_object\nuv_layer = obj.data.uv_layers.active.data\nfor i, loop in enumerate(uv_layer):\n    print(i, loop.uv)" },
      { lang: "config", code: "View > Display:\n  Modified Edges: ON  (mostra costuras)\n  Stretch: Area ou Angle  (visualiza distorção)" },
    ],
    points: [
      "O **UV Editor** mostra a malha planificada dentro do quadrado 0–1",
      "Atalhos `G`, `R`, `S` funcionam igual ao 3D",
      "**Pin** (`P`) trava vértices para próximos unwraps",
      "Modo **Stretch** colore as faces conforme a distorção",
      "Você pode carregar qualquer imagem no header para usar como referência",
      "**Sync Selection** (ícone de duas setas) liga seleção 2D ↔ 3D",
    ],
    alerts: [
      { type: "tip", content: "Ative **UV Sync Selection** para que selecionar no 3D Viewport reflita no UV Editor." },
      { type: "info", content: "Você pode abrir o UV Editor em qualquer painel: clique no ícone do canto superior esquerdo e escolha **UV Editor**." },
      { type: "warning", content: "Sem nenhuma face selecionada no 3D, o UV Editor parece **vazio** — sempre verifique sua seleção." },
    ],
  },
  {
    slug: "uv-checker",
    section: "uv-textura",
    title: "UV Checker: a textura xadrez que revela tudo",
    difficulty: "iniciante",
    subtitle: "Use uma imagem de teste para detectar esticamento e escala errada",
    intro: `
Antes de pintar qualquer coisa bonita, todo artista profissional aplica uma textura **UV Checker** no modelo. É uma imagem quadriculada com letras e números, projetada para que **qualquer distorção** salte aos olhos: quadrados viram retângulos quando há esticamento, ficam menores onde a UV está apertada e maiores onde está espaçada.

O Blender tem essa imagem embutida. No UV Editor, abra \`Image > New\` e marque **UV Grid** ou **Color Grid** como tipo gerado. Em seguida, no material do objeto, adicione um nó **Image Texture** apontando para essa imagem.

## O que observar
- **Quadrados uniformes** = ótima UV, escala consistente.
- **Retângulos** = esticamento (volte e ajuste seams ou redistribua).
- **Letras espelhadas** = ilha invertida (selecione e use \`Mesh > Mirror\`).
- **Quadrados de tamanhos diferentes** = densidade de textura inconsistente.

Esse último ponto, **texel density** (densidade de texels), é especialmente importante em jogos: você quer que o personagem todo tenha mais ou menos a mesma quantidade de pixels por centímetro, senão partes ficam borradas.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. UV Editor: Image > New\n2. Nome: UV_Checker | Generated Type: UV Grid\n3. Vá ao Shading workspace\n4. Adicione um nó Image Texture (Shift+A)\n5. Conecte Color → Base Color do Principled BSDF\n6. Selecione a textura UV_Checker no nó\n7. Mude o viewport para Material Preview (Z > 6)" },
      { lang: "atalho", code: "Z → menu de modos de viewport\nZ > 6 → Material Preview\nZ > 8 → Rendered" },
      { lang: "python", code: "import bpy\n\nimg = bpy.data.images.new('UV_Checker', 1024, 1024)\nimg.generated_type = 'UV_GRID'  # ou 'COLOR_GRID'" },
      { lang: "config", code: "Resolução típica do checker: 1024x1024 ou 2048x2048\nGenerated Type: UV_GRID (xadrez com letras)\n              ou COLOR_GRID (cores variadas)" },
    ],
    points: [
      "**UV Checker** revela esticamento e ilhas invertidas instantaneamente",
      "Quadrados iguais e bem alinhados = UV saudável",
      "Letras espelhadas indicam **ilha invertida** (mirror ou normal trocada)",
      "**Texel density** uniforme deixa toda a textura com mesma nitidez",
      "Use **UV_GRID** para checagem geométrica e **COLOR_GRID** para identificar ilhas",
      "Mantenha a checker aplicada durante todo o ajuste de UV",
    ],
    alerts: [
      { type: "tip", content: "Há addons gratuitos como **TexTools** que medem e equalizam texel density automaticamente." },
      { type: "info", content: "Você pode trocar entre UV Grid e Color Grid sem perder nada — é só uma imagem procedural." },
      { type: "danger", content: "Letras invertidas geralmente indicam **normal flipada**: use \`Shift+N\` em Edit Mode para recalcular." },
    ],
  },
  {
    slug: "packing-uvs",
    section: "uv-textura",
    title: "Packing UVs: organizando ilhas no espaço 0–1",
    difficulty: "intermediario",
    subtitle: "Encaixe as ilhas como num Tetris para aproveitar cada pixel",
    intro: `
Depois do unwrap, suas ilhas costumam ficar **espalhadas e mal organizadas** dentro do quadrado UV. **Packing** é o processo de reposicioná-las para preencher o espaço de forma eficiente, maximizando o uso da textura. Quanto melhor o pack, mais detalhe cabe na mesma resolução.

No Blender, com tudo selecionado no UV Editor, vá em \`UV > Pack Islands\`. A versão moderna (Blender 3.6+) é excelente: ela considera rotação, escala uniforme e até formas irregulares com o algoritmo **Box Pack** ou **Pack Islands** (com várias opções).

## Parâmetros úteis
- **Margin**: espaço entre ilhas, em fração do espaço 0–1. Use \`0.005\` a \`0.02\` para evitar bleeding.
- **Rotation Method**: \`Any\`, \`Cardinal\` (90°) ou \`None\`. Cardinal preserva orientação útil para texturas com direção (madeira, tijolos).
- **Lock Pinned**: ilhas com vértices pinados não se movem.
- **Shape Method**: \`Bounding Box\` (rápido) ou \`Exact Shape\` (mais lento, mais eficiente).

Bom packing é estética e técnica: você quer aproveitar cada pixel sem deixar costuras visíveis quando texturas adjacentes "vazam" entre si.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. UV Editor: A para selecionar todas as ilhas\n2. UV > Pack Islands (ou atalho Ctrl+P em algumas versões)\n3. No painel inferior (F9): ajuste Margin para 0.01\n4. Defina Rotation Method = Cardinal\n5. Confirme com Enter ou clique fora" },
      { lang: "atalho", code: "A → selecionar tudo\nU > P → Pack Islands (menu)\nF9 → reabrir últimas opções do operador" },
      { lang: "python", code: "import bpy\n\nbpy.ops.object.mode_set(mode='EDIT')\nbpy.ops.mesh.select_all(action='SELECT')\nbpy.ops.uv.select_all(action='SELECT')\nbpy.ops.uv.pack_islands(\n    margin=0.01,\n    rotate=True,\n    rotate_method='CARDINAL',\n    shape_method='CONCAVE'\n)" },
      { lang: "config", code: "Pack Islands (recomendado):\n  Margin: 0.005 – 0.02\n  Rotation Method: Cardinal\n  Shape Method: Concave\n  Scale: ON (uniforme)" },
    ],
    points: [
      "**Packing** maximiza o uso do espaço UV (0–1)",
      "Ilhas maiores devem ter prioridade — representam áreas mais visíveis",
      "**Margin** evita o **bleeding** entre texturas adjacentes",
      "Use **Cardinal** para preservar direção em texturas com padrão (madeira, listras)",
      "**Pin** (`P`) trava ilhas que você não quer que mexam",
      "Em jogos, packing eficiente reduz consumo de memória de textura",
    ],
    alerts: [
      { type: "tip", content: "Aplique **Average Islands Scale** (\`Ctrl+A\` no UV Editor) antes do pack para uniformizar texel density." },
      { type: "warning", content: "Margin muito pequeno causa **bleeding** quando o renderizador interpola pixels vizinhos." },
      { type: "info", content: "O addon **UVPackmaster** (pago) tem algoritmos ainda mais eficientes para projetos grandes." },
    ],
  },
  {
    slug: "texturas-image-vs-procedural",
    section: "uv-textura",
    title: "Texturas: imagem vs. procedural",
    difficulty: "intermediario",
    subtitle: "Quando usar PNG e quando deixar o Blender gerar a textura por matemática",
    intro: `
Existem dois grandes mundos de textura no Blender: **imagens** (arquivos PNG, JPG, EXR) e **procedurais** (geradas por algoritmos no editor de nós). Cada uma tem força e fraqueza, e dominar quando usar cada uma é o que torna seus materiais convincentes.

**Imagens** são pixels reais: fotografias, scans, pinturas digitais. Elas têm resolução fixa — se você se aproximar muito, verá os pixels (pixelização). São essenciais para detalhes específicos (rosto de personagem, logos, texturas escaneadas) e dependem 100% de UVs bem feitas.

## Texturas procedurais
Procedurais são funções matemáticas: ruído (\`Noise Texture\`), Voronoi, gradiente, xadrez (\`Checker\`), ondas. Elas têm **resolução infinita** (não pixelizam nunca), não precisam de UV (podem usar coordenadas de objeto), e ocupam quase nada de memória. São ótimas para superfícies orgânicas (pedra, madeira estilizada, mármore) e para variação aleatória.

## A regra prática
Use **imagens** quando precisa de **fidelidade fotorrealista** ou de detalhes únicos (cicatriz, etiqueta, logo). Use **procedurais** quando quer **flexibilidade**, **escalabilidade** ou variação infinita. Materiais profissionais costumam **misturar os dois**: imagem como base + procedurais para variação e desgaste.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Shading workspace (topo da tela)\n2. Shift+A no editor de nós\n3. Texture > Image Texture (para PNG/JPG)\n   ou Texture > Noise/Voronoi/Checker (procedural)\n4. Conecte Color → Base Color do Principled BSDF\n5. Para procedural sem UV: use Texture Coordinate > Object/Generated" },
      { lang: "atalho", code: "Shift+A → menu Add (no editor de nós)\nCtrl+T → adicionar Mapping + Texture Coordinate (com addon Node Wrangler)\nCtrl+Shift+Click em um nó → preview rápido" },
      { lang: "python", code: "import bpy\n\nmat = bpy.data.materials.new('MeuMaterial')\nmat.use_nodes = True\nnodes = mat.node_tree.nodes\n\n# Adiciona uma textura procedural Noise\nnoise = nodes.new('ShaderNodeTexNoise')\nnoise.inputs['Scale'].default_value = 5.0" },
      { lang: "config", code: "Image Texture:\n  Color Space: sRGB (cor) | Non-Color (mapas técnicos)\n  Interpolation: Linear (padrão) | Closest (pixel art)\n  Extension: Repeat | Extend | Clip" },
    ],
    points: [
      "**Imagens** = pixels reais, resolução fixa, dependem de UV",
      "**Procedurais** = matemática, resolução infinita, podem ignorar UV",
      "Misturar ambos é a base de materiais profissionais",
      "Use **Non-Color** para mapas de normal, roughness, metallic, etc.",
      "**Texture Coordinate** > Generated funciona sem UV (útil para procedurais)",
      "Procedurais consomem CPU/GPU em renders — imagens consomem memória",
    ],
    alerts: [
      { type: "tip", content: "O addon **Node Wrangler** (vem com o Blender) acelera o setup com \`Ctrl+T\` e \`Ctrl+Shift+T\`." },
      { type: "warning", content: "Esquecer **Non-Color** em mapas técnicos quebra a aparência do material (especialmente normal maps)." },
      { type: "info", content: "Sites como **Polyhaven**, **ambientCG** e **Texturehaven** oferecem texturas PBR gratuitas e excelentes." },
    ],
  },
  {
    slug: "baking-textures",
    section: "uv-textura",
    title: "Baking de Texturas: gravando informação na imagem",
    difficulty: "intermediario",
    subtitle: "Transforme cálculos pesados em uma imagem leve e portátil",
    intro: `
**Baking** (cozimento) é o processo de \"assar\" informação calculada — luz, sombras, cores procedurais, oclusão — diretamente em uma imagem 2D. O resultado é uma textura plana que pode ser usada em qualquer engine (Unity, Unreal, Godot) ou em renders muito mais rápidos.

Pense assim: você passou horas montando um material complexo com 30 nós procedurais? Em vez de recalcular tudo a cada frame, **bake** isso em um PNG. O Blender lê a imagem em milissegundos, sem fazer conta nenhuma.

## O que dá pra bakear
- **Diffuse / Base Color**: a cor pura do material.
- **Roughness, Metallic, Specular**: mapas técnicos de PBR.
- **Ambient Occlusion (AO)**: sombras de contato.
- **Normal**: detalhes de high-poly em low-poly (próximo capítulo).
- **Combined**: o resultado final, com luz incluída (estilo lightmap).

## Setup mínimo
Você precisa: 1) UVs prontas, 2) uma **Image Texture** vazia adicionada ao material e selecionada (não conectada), 3) **Render Engine = Cycles** (Eevee não bakeia tudo) e 4) clicar em \`Render Properties > Bake\`. O Blender preenche aquela imagem com o resultado calculado.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Garanta UVs prontas e sem sobreposição\n2. UV Editor > Image > New > Tamanho 2048x2048, nome 'BakeOut'\n3. Shading: adicione nó Image Texture, selecione 'BakeOut'\n4. Mantenha esse nó SELECIONADO mas NÃO conecte\n5. Render Properties > Render Engine = Cycles\n6. Render Properties > Bake > escolha Bake Type\n7. Clique em 'Bake' e aguarde\n8. UV Editor > Image > Save As > .png" },
      { lang: "atalho", code: "Z > 8 → Rendered (preview)\nF12 → render final\nAlt+S (UV Editor) → Save image" },
      { lang: "python", code: "import bpy\n\nbpy.context.scene.render.engine = 'CYCLES'\nbpy.context.scene.cycles.bake_type = 'DIFFUSE'\nbpy.context.scene.render.bake.use_pass_direct = False\nbpy.context.scene.render.bake.use_pass_indirect = False\nbpy.context.scene.render.bake.use_pass_color = True\nbpy.ops.object.bake(type='DIFFUSE')" },
      { lang: "config", code: "Bake Settings (Diffuse típico):\n  Type: Diffuse\n  Influence: Color (apenas)\n  Margin: 16 px (extend)\n  Output: imagem 2K ou 4K, formato PNG 8-bit" },
    ],
    points: [
      "**Baking** salva cálculos pesados em uma imagem leve",
      "Requer **Cycles** como render engine (Eevee tem suporte limitado)",
      "A **Image Texture** de destino deve estar selecionada e desconectada",
      "**Margin** evita costuras visíveis nas bordas das ilhas UV",
      "Salve a imagem após bake — ela só existe na memória até você salvar",
      "Use **Non-Color** ao reusar bakes técnicos (roughness, normal, etc.)",
    ],
    alerts: [
      { type: "warning", content: "Esquecer de **salvar** a imagem após bakear é a perda de tempo mais clássica do iniciante." },
      { type: "tip", content: "Se sua textura sair preta, verifique se o nó Image Texture está **selecionado** (borda branca) no editor." },
      { type: "info", content: "Para games, exporte sempre em **PNG** (sem perda) ou **TGA**, nunca JPG (compressão arruina mapas técnicos)." },
    ],
  },
  {
    slug: "normal-bake",
    section: "uv-textura",
    title: "Normal Bake: detalhes de high-poly em low-poly",
    difficulty: "avancado",
    subtitle: "A técnica que faz games parecerem ter milhões de polígonos",
    intro: `
**Normal Map** é uma imagem mágica: ela armazena a **direção da superfície** em cada pixel, usando RGB para representar X, Y e Z. Quando aplicada a uma malha simples (low-poly), o renderizador finge que existem todos os detalhes da malha complexa (high-poly), sem o custo computacional.

Esse é o segredo de games modernos: o personagem que parece ter milhões de polígonos na verdade tem 30 mil, mas usa um normal map bakeado de uma versão de **5 milhões** de polígonos esculpidos. Você ganha desempenho e qualidade visual ao mesmo tempo.

## Workflow do normal bake
1. Tenha duas malhas: **high-poly** (esculpida, com todo detalhe) e **low-poly** (otimizada, com UVs).
2. Selecione primeiro a high-poly, depois com Shift a low-poly (a ativa).
3. Em \`Render Properties > Bake\`, marque **Selected to Active** e tipo **Normal**.
4. Ajuste **Cage Extrusion** ou **Ray Distance** para evitar erros de projeção.
5. Bake e salve como **Non-Color**.

## Cuidados críticos
Normal maps são extremamente sensíveis: **Color Space deve ser Non-Color**, o **Tangent Space** deve ser consistente entre Blender e a engine de destino, e qualquer artefato no bake aparece como **costura visível** no shader. Vale gastar tempo ajustando.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Selecione a high-poly\n2. Shift+Click na low-poly (ativa)\n3. UV Editor: New Image 'Normal_Bake' (Non-Color)\n4. Adicione Image Texture na low-poly, selecione a imagem\n5. Render Properties > Bake:\n   - Bake Type: Normal\n   - Selected to Active: ON\n   - Extrusion: 0.05  |  Max Ray Distance: 0.1\n   - Margin: 16\n6. Clique em Bake\n7. Salve a imagem como PNG (Non-Color)" },
      { lang: "atalho", code: "Shift+Click → adicionar à seleção (último = ativo)\nN (Render Properties) → painel lateral com opções de bake\nAlt+S (UV Editor) → salvar imagem" },
      { lang: "python", code: "import bpy\n\nscene = bpy.context.scene\nscene.render.engine = 'CYCLES'\nscene.cycles.bake_type = 'NORMAL'\nscene.render.bake.use_selected_to_active = True\nscene.render.bake.cage_extrusion = 0.05\nscene.render.bake.max_ray_distance = 0.1\nscene.render.bake.margin = 16\n\nbpy.ops.object.bake(type='NORMAL')" },
      { lang: "config", code: "Normal Map Node (uso):\n  Image Texture > Color Space: Non-Color\n  Conectar: Image > Color → Normal Map > Color\n              Normal Map > Normal → Principled BSDF > Normal\n  Space: Tangent (padrão)" },
    ],
    points: [
      "**Normal map** simula relevo sem adicionar polígonos",
      "Workflow padrão: bake **high-poly → low-poly** com 'Selected to Active'",
      "**Color Space = Non-Color** é obrigatório para normal maps",
      "**Cage Extrusion** controla a distância de projeção dos raios",
      "Sempre conecte via nó **Normal Map** antes do Principled BSDF",
      "Bake errado gera costuras e erros nas silhuetas — paciência e iteração",
    ],
    alerts: [
      { type: "danger", content: "Conectar normal map direto no **Base Color** (sem o nó Normal Map) é erro brutal: vira textura azul-roxa visível." },
      { type: "warning", content: "Diferenças de **tangent space** entre Blender e Unity/Unreal podem causar artefatos sutis — valide na engine final." },
      { type: "tip", content: "Use **Cage Object** (uma cópia ligeiramente maior da low-poly) para bakes complexos — controla melhor os raios." },
    ],
  },
  {
    slug: "painting-2d-3d",
    section: "uv-textura",
    title: "Texture Painting: pintando 2D e 3D",
    difficulty: "avancado",
    subtitle: "Desenhe diretamente na malha ou na imagem, em tempo real",
    intro: `
O Blender vem com um sistema de **Texture Paint** completo: você pode pintar diretamente sobre o modelo 3D no viewport (modo **3D Paint**) ou na imagem 2D dentro do **Image Editor** (modo **2D Paint**). É como ter um Photoshop e um Substance Painter integrados, gratuitamente.

Para começar, ative o workspace **Texture Paint** no topo. À direita você vê o modelo 3D pronto para receber pinceladas; à esquerda, a imagem 2D que está sendo pintada. **Qualquer pincelada em um lado aparece instantaneamente no outro** — graças às UVs que você fez!

## Configurando o material para pintar
Você precisa de um material com um nó **Image Texture** apontando para uma imagem (criada no UV Editor com \`Image > New\`). Sem isso, o Blender não sabe **onde** salvar suas pinceladas.

## Pincéis e atalhos
- \`F\`: ajusta o tamanho do pincel arrastando o mouse.
- \`Shift+F\`: ajusta a força (strength).
- \`X\`: troca cor primária e secundária.
- \`[\` e \`]\`: diminui/aumenta o pincel.
- \`Ctrl\`: subtrai (em vez de adicionar) ao pintar.

Pintura 3D é uma habilidade artística por si só. Comece com formas simples, base de cor, e vá adicionando variação. Combine com **stencils** (imagens de referência projetadas) e **masks** para resultados profissionais.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. UV Editor > Image > New, 2048x2048, nome 'Diffuse'\n2. Material: Image Texture com 'Diffuse' → Base Color\n3. Topo da tela: workspace 'Texture Paint'\n4. Verifique se o slot de textura aponta para 'Diffuse'\n5. Selecione um pincel (Draw, Soften, Smear, Clone)\n6. Pinte sobre o modelo ou sobre a imagem 2D\n7. Image > Save (sempre salve!)" },
      { lang: "atalho", code: "F → tamanho do pincel\nShift+F → força do pincel\nX → trocar cores\n[  ] → diminuir/aumentar pincel\nCtrl → modo subtrair\nM → ativar máscara estêncil" },
      { lang: "python", code: "import bpy\n\n# Cria imagem para pintura\nimg = bpy.data.images.new('Diffuse', 2048, 2048, alpha=True)\nimg.generated_color = (0.5, 0.5, 0.5, 1.0)\n\n# Configura ferramenta de pintura\nbpy.context.scene.tool_settings.image_paint.brush.size = 50\nbpy.context.scene.tool_settings.image_paint.brush.strength = 0.8" },
      { lang: "config", code: "Brush Settings recomendados:\n  Size: 30–80 px\n  Strength: 0.5–0.8\n  Falloff: Smooth\n  Spacing: 10%\n  Symmetry: X (para personagens simétricos)" },
    ],
    points: [
      "**Texture Paint** integra pintura 2D e 3D em tempo real",
      "Requer um nó **Image Texture** com uma imagem associada",
      "Pincéis tipo **Draw**, **Smear**, **Clone**, **Soften** cobrem a maioria dos casos",
      "Ative **Symmetry X** para personagens — economiza metade do trabalho",
      "**Stencils** projetam fotos sobre o modelo para alta fidelidade",
      "**Salve a imagem com frequência** — `Ctrl+S` salva o `.blend` mas NÃO a imagem",
    ],
    alerts: [
      { type: "danger", content: "Fechar o Blender sem **Image > Save** perde toda a pintura, mesmo que o `.blend` esteja salvo." },
      { type: "tip", content: "Marque **Save All Modified** em \`File > External Data\` para automatizar o salvamento de imagens." },
      { type: "success", content: "Combine bakes (AO, normal) como camadas de referência e pinte por cima — fluxo profissional." },
    ],
  },
];
