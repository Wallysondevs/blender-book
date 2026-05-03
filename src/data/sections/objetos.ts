import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "adicionar-meshes",
    section: "objetos",
    title: "Adicionando Meshes Primitivos",
    difficulty: "iniciante",
    subtitle: "Aprenda a popular sua cena com cubos, esferas, cilindros e outras formas básicas.",
    intro: `
No Blender, tudo o que você vê no espaço 3D — personagens, cenários, móveis, planetas — começa quase sempre a partir de uma forma simples chamada **mesh primitivo**. Um mesh é, basicamente, uma malha de pontos (\`vertices\`), arestas (\`edges\`) e faces (\`faces\`) que juntos descrevem a superfície de um objeto. Os primitivos são meshes prontos, pré-fabricados, que servem como o **bloco de Lego inicial** para qualquer modelagem.

Quando você abre o Blender pela primeira vez, já encontra um cubo no centro da cena. Esse cubo não é especial: é apenas um primitivo adicionado automaticamente para você não começar com a tela vazia. Em outros softwares como Maya ou 3ds Max, o conceito é idêntico, embora os atalhos mudem. No Blender, todo o fluxo de adicionar formas gira em torno do menu \`Add\` (atalho \`Shift + A\`), que é a porta de entrada para tudo: meshes, luzes, câmeras, curvas, textos.

## Onde os meshes nascem
Os primitivos aparecem sempre na posição do **3D Cursor**, aquele pequeno alvo vermelho-e-branco que fica, por padrão, no centro do mundo (coordenada \`0, 0, 0\`). Entender isso já evita 90% da frustração inicial: se seu cubo apareceu "no lugar errado", quase sempre é porque o cursor estava deslocado.

Cada primitivo abre, logo após a criação, um pequeno painel chamado **Adjust Last Operation** no canto inferior esquerdo. Ali você ajusta tamanho, número de segmentos, suavização e outros parâmetros. Esse painel some assim que você faz qualquer outra ação — então, mexa nele imediatamente.
    `,
    codes: [
      { lang: "atalho", code: "Shift + A          → abre o menu Add\nShift + S          → snap (mover cursor / objeto)\nF9                 → reabre o painel Adjust Last Operation" },
      { lang: "passo-a-passo", code: "1. Pressione Shift + A no Viewport 3D\n2. Vá em Mesh > UV Sphere\n3. Olhe o canto inferior esquerdo: clique em 'Add UV Sphere'\n4. Ajuste 'Segments' e 'Rings' para mudar a resolução\n5. Confirme clicando fora do painel" },
      { lang: "python", code: "import bpy\n\n# Adiciona um cubo de 2m no centro do mundo\nbpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 0))\n\n# Adiciona uma esfera UV mais detalhada\nbpy.ops.mesh.primitive_uv_sphere_add(\n    segments=64,\n    ring_count=32,\n    radius=1,\n    location=(3, 0, 0),\n)" },
      { lang: "config", code: "Primitivos mais usados:\n- Plane     → chão, paredes, panos\n- Cube      → base de quase tudo\n- UV Sphere → bolas, cabeças, planetas\n- Ico Sphere→ rochas, terrenos low-poly\n- Cylinder  → copos, troncos, postes\n- Cone      → telhados, chapéus\n- Torus     → anéis, donuts" },
    ],
    points: [
      "**Mesh primitivo** é uma forma pronta (cubo, esfera, etc.) servindo de ponto de partida para modelar.",
      "Todos os primitivos surgem na posição do **3D Cursor** — controle-o com \`Shift + S\`.",
      "O painel **Adjust Last Operation** (canto inferior esquerdo) só existe até você fazer outra ação; use \`F9\` para reabri-lo.",
      "**UV Sphere** tem polos (bom para texturas) e **Ico Sphere** tem topologia uniforme (boa para deformações).",
      "Ajustar \`Segments\` na criação é mais barato que adicionar geometria depois.",
      "Você pode adicionar primitivos via \`Shift + A\` ou pelo menu superior \`Add\`.",
    ],
    alerts: [
      { type: "tip", content: "Antes de adicionar um mesh, pressione \`Shift + S\` → \`Cursor to World Origin\` para garantir que ele nasça no centro." },
      { type: "warning", content: "Não confunda **Add Mesh** com **Add Object**: adicionar um novo cubo enquanto está em **Edit Mode** o funde no objeto atual." },
      { type: "info", content: "O **donut do Blender Guru** virou o 'Olá Mundo' do Blender porque usa apenas dois primitivos: um Torus e um Plane." },
    ],
  },
  {
    slug: "transformacoes-grs",
    section: "objetos",
    title: "Transformações G, R, S",
    difficulty: "iniciante",
    subtitle: "Os três atalhos que você vai usar mais que respirar dentro do Blender.",
    intro: `
Existem três operações que, juntas, respondem por talvez **80% de tudo que você faz no Blender**: mover (\`G\` de *grab*), girar (\`R\` de *rotate*) e escalar (\`S\` de *scale*). Esses três atalhos foram pensados para ficar embaixo da mão esquerda, no teclado, enquanto a mão direita controla o mouse. Essa ergonomia é o motivo de o Blender ter fama de "rápido depois que você aprende".

Diferente de outros softwares onde você precisa clicar em um **gizmo** (aquela seta colorida) para arrastar, no Blender você simplesmente pressiona a tecla, move o mouse, e clica para confirmar. É um modelo "modal": ao apertar \`G\`, você entra no **modo mover** até clicar com o botão esquerdo (confirma) ou direito/Esc (cancela).

## Restringindo a um eixo
A mágica acontece quando você combina G/R/S com as teclas de eixo: \`X\`, \`Y\` ou \`Z\`. Pressionar \`G\` seguido de \`X\` move o objeto **apenas no eixo X**. Pressionar \`G\` → \`Shift + Z\` move em qualquer direção **menos no Z**. E digitando um número logo depois (\`G X 2\`), você move exatamente 2 metros.

### Confirmar e cancelar
Acostume-se: **clique esquerdo confirma**, **clique direito ou Esc cancela e volta o objeto ao lugar original**. Esse é um dos primeiros tropeços de quem vem de outros softwares.
    `,
    codes: [
      { lang: "atalho", code: "G              → mover (grab)\nR              → girar (rotate)\nS              → escalar (scale)\nG/R/S + X/Y/Z  → restringe ao eixo\nG/R/S + Shift+Z→ exclui o eixo Z\nG + número     → distância exata (ex: G X 2 = 2m no X)\nR + 90 + Enter → gira exatamente 90 graus" },
      { lang: "passo-a-passo", code: "1. Selecione o cubo padrão clicando nele\n2. Pressione G, mexa o mouse, clique para soltar\n3. Pressione G → X → digite 3 → Enter (move 3m no X)\n4. Pressione R → Z → 45 → Enter (gira 45° no Z)\n5. Pressione S → 2 → Enter (dobra de tamanho)\n6. Pressione Alt + G/R/S para zerar a transformação" },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.active_object\n\n# Move 3m no X\nobj.location.x += 3\n\n# Gira 45° no Z (em radianos)\nimport math\nobj.rotation_euler.z += math.radians(45)\n\n# Dobra a escala\nobj.scale *= 2" },
      { lang: "atalho", code: "Alt + G   → zera a posição\nAlt + R   → zera a rotação\nAlt + S   → zera a escala\nN         → abre o painel lateral com valores exatos" },
    ],
    points: [
      "**G, R, S** são os atalhos de mover, girar e escalar — memorize-os antes de qualquer outra coisa.",
      "Combine com \`X\`, \`Y\`, \`Z\` para travar o movimento em um eixo.",
      "Digite números após o atalho para precisão (\`S 0.5\` = metade do tamanho).",
      "**Botão direito** ou \`Esc\` cancela; **botão esquerdo** confirma.",
      "\`Alt + G/R/S\` zera transformações — útil quando algo saiu do lugar.",
      "O painel lateral \`N\` mostra Location, Rotation e Scale numéricos a qualquer momento.",
      "Pressionar a tecla do eixo **duas vezes** usa o eixo **local** do objeto, não o global.",
    ],
    alerts: [
      { type: "tip", content: "Segure \`Shift\` durante o movimento para um ajuste **fino** (movimento mais lento e preciso)." },
      { type: "warning", content: "Escalar com **Scale diferente de 1** pode bagunçar modificadores e física depois. Sempre considere aplicar a escala com \`Ctrl + A\` → \`Scale\`." },
      { type: "success", content: "Quando dominar G/R/S com restrição de eixo, sua velocidade de modelagem **triplica**." },
    ],
  },
  {
    slug: "eixos-pivot-point",
    section: "objetos",
    title: "Eixos Globais, Locais e Pivot Point",
    difficulty: "iniciante",
    subtitle: "Entenda em torno de qual ponto e direção suas transformações realmente acontecem.",
    intro: `
Quando você gira ou escala um objeto, ele sempre o faz **em torno de algum ponto** e **ao longo de alguma direção**. Esses dois conceitos — **Pivot Point** (o ponto) e **Transform Orientation** (a direção dos eixos) — são responsáveis por boa parte das frustrações iniciais do tipo "por que esse objeto está girando estranho?".

Imagine uma porta: ela gira em torno da dobradiça, não do centro do retângulo. A dobradiça é o **pivot**. Se o pivot estiver errado, a porta vai parecer "flutuar" enquanto rotaciona. No Blender, você escolhe o pivot no cabeçalho do viewport, no ícone que parece dois pontinhos. As opções mais usadas são **Median Point** (centro da seleção), **3D Cursor**, **Individual Origins** e **Active Element**.

## Eixos globais vs locais
O **eixo global** é o sistema do mundo: X aponta sempre para a mesma direção, Y para outra, Z sempre para cima. O **eixo local** acompanha a rotação do objeto: se você gira um cubo 45°, o "X local" dele também gira 45°. Pressionar \`X\` uma vez usa global; pressionar \`X X\` (duas vezes) usa local.

### Por que isso importa?
Para construir uma rampa inclinada e mover algo "ladeira acima", você precisa do eixo **local** da rampa. Para alinhar todos os objetos com o chão do mundo, você usa o **global**. Saber alternar é essencial.
    `,
    codes: [
      { lang: "atalho", code: ". (ponto)        → menu rápido de Pivot Point\n, (vírgula)      → menu rápido de Transform Orientation\nX                → eixo X global\nX X              → eixo X local\nG Z Z            → mover no Z local" },
      { lang: "passo-a-passo", code: "1. Selecione 3 cubos (clique + Shift)\n2. No cabeçalho, mude Pivot para 'Individual Origins'\n3. Pressione S → 0.5 → Enter\n4. Cada cubo encolhe em torno do próprio centro\n5. Mude para 'Median Point' e repita: agora encolhem juntos para o centro do grupo" },
      { lang: "config", code: "Pivot Points disponíveis:\n- Bounding Box Center → centro da caixa que envolve a seleção\n- 3D Cursor           → o alvo vermelho-e-branco\n- Individual Origins  → cada objeto usa o próprio pivot\n- Median Point        → média das origens da seleção\n- Active Element      → o último objeto selecionado" },
      { lang: "python", code: "import bpy\n\n# Muda o pivot point\nbpy.context.scene.tool_settings.transform_pivot_point = 'CURSOR'\n\n# Muda a orientação para Local\nbpy.context.scene.transform_orientation_slots[0].type = 'LOCAL'" },
    ],
    points: [
      "**Pivot Point** é o ponto em torno do qual rotações e escalas acontecem.",
      "**Transform Orientation** define em qual sistema de eixos (Global, Local, Normal, View) você opera.",
      "**Median Point** é o pivot padrão e funciona bem em 90% dos casos.",
      "**Individual Origins** é poderoso para escalar/girar vários objetos ao mesmo tempo, cada um no próprio centro.",
      "Pressionar a tecla do eixo **duas vezes** alterna para o eixo **local** do objeto.",
      "O \`3D Cursor\` como pivot é útil para criar simetrias e arranjos radiais.",
    ],
    alerts: [
      { type: "tip", content: "Os menus rápidos \`.\` (pivot) e \`,\` (orientation) economizam muito tempo. Decore-os." },
      { type: "warning", content: "Se uma rotação parece 'errada', 99% das vezes o problema é o **pivot point** ativo, não o objeto." },
      { type: "info", content: "Em **Edit Mode**, os mesmos pivots existem, mas atuam sobre vértices, arestas e faces selecionados." },
    ],
  },
  {
    slug: "snap-precisao",
    section: "objetos",
    title: "Snap e Precisão Numérica",
    difficulty: "iniciante",
    subtitle: "Encaixe objetos com exatidão usando snap, grid e digitação de valores.",
    intro: `
Modelar "no olho" funciona para esboços, mas, em algum momento, você vai precisar que duas peças encostem **exatamente**, que um parafuso fique **exatamente** no centro de um furo, ou que um objeto se posicione **exatamente** sobre o vértice de outro. É aí que entra o **Snap** — o recurso que faz seu cursor ou objeto "grudar" em pontos de referência.

O ícone do ímã no cabeçalho do viewport (atalho \`Shift + Tab\`) liga e desliga o snap. Ao lado dele, você escolhe o **tipo** de snap: \`Increment\` (grade), \`Vertex\`, \`Edge\`, \`Face\`, \`Volume\`, \`Edge Center\`, \`Face Nearest\`. Cada um serve para uma situação: \`Vertex\` para encaixar em um ponto exato; \`Face\` para grudar uma peça em uma superfície; \`Increment\` para mover de metro em metro.

## Digitando valores diretamente
Outra forma de precisão é digitar números durante a transformação. \`G X 2.5\` move 2,5 metros no X. \`R Z 90\` gira 90° no Z. \`S 0.5\` reduz pela metade. Combine com o painel \`N\`, onde você pode digitar coordenadas absolutas como \`Location X = 1.234\`.

### O 3D Cursor como referência
Você pode mandar o cursor pular para um vértice (\`Shift + S\` → \`Cursor to Selected\`) e depois mandar um objeto pular para o cursor (\`Shift + S\` → \`Selection to Cursor\`). É o "teletransporte" do Blender.
    `,
    codes: [
      { lang: "atalho", code: "Shift + Tab     → liga/desliga Snap\nShift + S       → menu Snap (cursor + seleção)\nCtrl (durante G)→ snap temporário enquanto move\nShift           → movimento fino e preciso" },
      { lang: "passo-a-passo", code: "1. Ative o Snap no ícone do ímã (Shift + Tab)\n2. Mude o tipo para 'Vertex'\n3. Selecione o objeto que vai mover\n4. Pressione G, aproxime o mouse de um vértice\n5. Veja o círculo laranja indicando o ponto de snap\n6. Clique para confirmar" },
      { lang: "config", code: "Tipos de Snap:\n- Increment    → grade do mundo (1m por padrão)\n- Vertex       → grude em vértices\n- Edge         → grude em arestas\n- Face         → grude em faces\n- Volume       → entra dentro de objetos\n- Edge Center  → meio de aresta\n- Face Nearest → face mais próxima (ótimo para retopo)" },
      { lang: "python", code: "import bpy\n\nts = bpy.context.scene.tool_settings\nts.use_snap = True\nts.snap_elements = {'VERTEX'}\n# Snap durante a operação será usado quando você apertar G/R/S" },
    ],
    points: [
      "**Snap** faz objetos grudarem em vértices, arestas ou faces — fim de modelagem 'mais ou menos'.",
      "O **3D Cursor** combinado com \`Shift + S\` permite teletransportar objetos com exatidão.",
      "Digitar números após \`G/R/S\` força valores precisos.",
      "Segurar \`Ctrl\` durante uma transformação ativa snap **temporariamente**, sem precisar ligar o ímã.",
      "Segurar \`Shift\` ativa o **modo fino**, ótimo para ajustes milimétricos.",
      "O painel \`N\` mostra e edita coordenadas absolutas a qualquer momento.",
    ],
    alerts: [
      { type: "tip", content: "Para arquitetura, deixe \`Increment\` snap ligado com grid de 0.1m — você modela como se estivesse em papel quadriculado." },
      { type: "warning", content: "Se o snap parece não funcionar, confira se você está em **Object Mode** ou **Edit Mode** — os tipos disponíveis variam." },
      { type: "success", content: "\`Shift + S\` → \`Selection to Cursor\` é a maneira mais rápida de zerar a posição de um objeto: jogue o cursor na origem do mundo primeiro." },
    ],
  },
  {
    slug: "duplicar-arrays",
    section: "objetos",
    title: "Duplicar, Linkar e Arrays",
    difficulty: "iniciante",
    subtitle: "Multiplique objetos de forma manual ou procedural, sem virar um faxineiro de cena.",
    intro: `
Quase nenhum projeto tem só um objeto. Florestas têm milhares de árvores; cidades têm centenas de janelas; um teclado tem dezenas de teclas iguais. Em vez de modelar cada peça do zero, o Blender oferece três caminhos: **duplicar** (\`Shift + D\`), **duplicar linkado** (\`Alt + D\`) e o modificador **Array**.

A **duplicação simples** cria uma cópia totalmente independente: você pode editar uma sem afetar a outra. A **duplicação linkada** cria um novo objeto que **compartilha o mesmo mesh interno** — editar um vértice em qualquer cópia altera **todas** ao mesmo tempo. Isso é poderosíssimo: imagine um prédio com 200 janelas idênticas; basta corrigir uma e todas se atualizam. Em outros softwares isso se chama "instance".

## Quando usar cada um
Use **Shift + D** quando as cópias precisam evoluir de forma diferente (variações). Use **Alt + D** quando você quer manter consistência (peças idênticas). Use **Array Modifier** quando precisa de muitas cópias em padrão regular: degraus de escada, postes de cerca, elos de corrente.

### Array Modifier
O Array é um **modificador**: uma operação procedural aplicada ao objeto sem destruir o mesh original. Você define quantas cópias quer e o deslocamento entre elas, e o Blender gera tudo em tempo real.
    `,
    codes: [
      { lang: "atalho", code: "Shift + D   → duplicar (cópia independente)\nAlt + D     → duplicar linkado (mesmo mesh)\nCtrl + J    → unir objetos selecionados em um só\nM           → mover para Collection" },
      { lang: "passo-a-passo", code: "1. Selecione um cubo\n2. Pressione Shift + D → X → 2 → Enter (cópia 2m à direita)\n3. Repita: Shift + R refaz a última ação\n4. Para Array procedural:\n   - Selecione o objeto\n   - Vá em Properties > Modifier (ícone de chave inglesa)\n   - Add Modifier > Array\n   - Defina Count = 10, Relative Offset X = 1.1" },
      { lang: "python", code: "import bpy\n\n# Duplicar com Python\nobj = bpy.context.active_object\nfor i in range(1, 6):\n    new_obj = obj.copy()\n    new_obj.data = obj.data  # mesh linkado\n    new_obj.location.x = i * 2\n    bpy.context.collection.objects.link(new_obj)" },
      { lang: "config", code: "Array Modifier - parâmetros principais:\n- Fit Type        → Fixed Count, Fit Length, Fit Curve\n- Count           → quantas cópias\n- Relative Offset → múltiplo do tamanho do objeto\n- Constant Offset → deslocamento absoluto em metros\n- Object Offset   → usa outro objeto como guia (ótimo para escadas em espiral)" },
    ],
    points: [
      "\`Shift + D\` cria uma **cópia independente** — útil para variações.",
      "\`Alt + D\` cria uma cópia **linkada** que compartilha o mesh; edite uma e todas mudam.",
      "**Array Modifier** gera cópias procedurais sem encher o outliner.",
      "\`Shift + R\` repete a última ação — combine com Shift + D para arrays manuais rápidos.",
      "\`Ctrl + J\` une vários objetos selecionados em um único objeto (cuidado: irreversível sem Undo).",
      "Cópias linkadas economizam **memória** e tempo de manutenção em projetos grandes.",
    ],
    alerts: [
      { type: "tip", content: "Combine **Array** com **Curve Modifier** para criar correntes, trilhos e escadas em curva sem esforço." },
      { type: "warning", content: "\`Ctrl + J\` aplica todos os modificadores e perde a origem individual. Salve antes." },
      { type: "info", content: "Cópias linkadas mostram o nome do mesh compartilhado precedido pelo número de usuários no Outliner — ex: \`2 Cube\`." },
    ],
  },
  {
    slug: "parent-children",
    section: "objetos",
    title: "Parent e Children",
    difficulty: "iniciante",
    subtitle: "Crie hierarquias para que objetos se movam juntos, como um carro e suas rodas.",
    intro: `
Em uma cena 3D, raramente os objetos vivem isolados. Um carro tem rodas, volante e portas; um boneco tem braços e pernas; uma lâmpada tem base, haste e cúpula. Se você precisar mover esse conjunto, mover peça por peça é insano. A solução é a **hierarquia parent-child** (pai-filho): você diz ao Blender "esses objetos pertencem àquele", e quando o pai se move, gira ou escala, os filhos acompanham.

A relação é simples de criar: selecione primeiro os filhos, depois o pai (o pai precisa ser o **objeto ativo**, ou seja, o último selecionado, com contorno mais claro), e pressione \`Ctrl + P\`. Aparece um menu pedindo o tipo de parent — para começar, escolha **Object (Keep Transform)**.

## Como ler a hierarquia
No painel **Outliner** (à direita), os filhos aparecem **indentados** sob o pai, como pastas dentro de pastas. Você pode reorganizar arrastando, ou desfazer um parent com \`Alt + P\` → \`Clear Parent\`.

### Cuidado com a escala
Quando o pai é escalado, os filhos também são. Se o pai tem escala diferente de 1, os filhos podem se comportar de forma estranha em modificadores. Aplique escalas (\`Ctrl + A\` → \`Scale\`) **antes** de criar a hierarquia, sempre que possível.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl + P    → Make Parent (pai = ativo)\nAlt + P     → Clear Parent\nShift + G   → Select Children/Parent" },
      { lang: "passo-a-passo", code: "1. Selecione as 4 rodas (Shift + clique)\n2. Por último, Shift + clique no chassi (ele vira ativo)\n3. Pressione Ctrl + P → Object (Keep Transform)\n4. Mova o chassi (G): as rodas seguem\n5. No Outliner, veja as rodas indentadas sob o chassi" },
      { lang: "python", code: "import bpy\n\nchassi = bpy.data.objects['Chassi']\nrodas = [bpy.data.objects[f'Roda_{i}'] for i in range(4)]\n\nfor roda in rodas:\n    roda.parent = chassi\n    # Mantém a posição visual atual\n    roda.matrix_parent_inverse = chassi.matrix_world.inverted()" },
      { lang: "config", code: "Tipos de Parent mais comuns:\n- Object              → padrão, segue posição/rotação/escala\n- Object (Keep Transform) → preserva posição visual atual\n- Vertex / 3 Vertices → filho gruda em vértices do pai\n- Bone                → filho segue um osso de um Armature\n- Empty               → controlador invisível (muito comum em rigs)" },
    ],
    points: [
      "**Parent** é o objeto pai; **child** é o filho que herda transformações.",
      "Selecione filhos primeiro, **pai por último** (ativo) e pressione \`Ctrl + P\`.",
      "\`Alt + P\` desfaz a relação, com opção de manter a transformação atual.",
      "O **Outliner** mostra a hierarquia indentada — use-o como mapa.",
      "**Empties** (objetos vazios) são pais perfeitos: invisíveis no render, ótimos para controlar grupos.",
      "Aplicar escala antes do parent evita bugs em modificadores e física.",
    ],
    alerts: [
      { type: "tip", content: "Use um **Empty** (\`Shift + A\` → \`Empty\` → \`Plain Axes\`) como pai de cenas inteiras. Você ganha um 'controle remoto' para a cena toda." },
      { type: "warning", content: "Se selecionar o pai primeiro por engano, a hierarquia inverte. Sempre confira qual objeto está com contorno **amarelo claro** (ativo)." },
      { type: "info", content: "Diferente de **Collections**, parent afeta transformações; collections só organizam visibilidade e seleção." },
    ],
  },
  {
    slug: "collections",
    section: "objetos",
    title: "Collections — Organizando a Cena",
    difficulty: "iniciante",
    subtitle: "Pastas inteligentes para agrupar, esconder e renderizar partes da sua cena.",
    intro: `
Quando a cena cresce, o **Outliner** vira um cemitério de objetos com nomes parecidos. As **Collections** são a resposta do Blender para isso: pastas onde você agrupa objetos por função, por personagem, por ambiente, ou por qualquer critério útil. Cada collection pode ser **escondida**, **isolada** ou **excluída do render** com um clique.

Diferente do parent-child, a collection **não afeta transformações**. Mover a collection no outliner não move os objetos no espaço. É puramente uma organização lógica e visual. Pense em pastas no Windows: você organiza arquivos sem alterá-los.

## Hierarquia e nesting
Collections podem conter outras collections, formando uma árvore. Um projeto típico tem algo como: \`Cena Principal > Personagens > Heroi > Roupa\` e \`Cena Principal > Cenário > Móveis > Mesas\`. Essa estrutura facilita esconder o cenário inteiro enquanto você ajusta um personagem.

### Os três botões mágicos
Cada collection tem três controles cruciais no outliner: o **olho** (visibilidade no viewport), a **seta** (visibilidade no render) e o **monitor** (excluir da cena). Use o olho para trabalhar mais rápido escondendo o que não está editando; use a seta para tirar elementos do render final.
    `,
    codes: [
      { lang: "atalho", code: "M               → mover seleção para Collection\nC (no outliner) → criar nova Collection\nH               → esconder objeto\nAlt + H         → mostrar todos\nShift + clique no olho → isolar collection" },
      { lang: "passo-a-passo", code: "1. No Outliner, clique direito > New > Collection\n2. Renomeie (duplo clique no nome) para 'Personagens'\n3. Selecione objetos no viewport\n4. Pressione M > escolha 'Personagens'\n5. Os objetos pulam para a collection nova\n6. Clique no olho ao lado para esconder/mostrar" },
      { lang: "python", code: "import bpy\n\n# Cria uma collection\nnova = bpy.data.collections.new('Personagens')\nbpy.context.scene.collection.children.link(nova)\n\n# Move um objeto para ela\nobj = bpy.data.objects['Heroi']\nfor c in obj.users_collection:\n    c.objects.unlink(obj)\nnova.objects.link(obj)" },
      { lang: "config", code: "Boa nomenclatura de collections:\n- 01_Personagens\n- 02_Cenario\n- 03_Iluminacao\n- 04_Camera\n- 99_Refs (referências, sempre ocultas)\nO prefixo numérico mantém a ordem alfabética útil." },
    ],
    points: [
      "**Collections** são pastas para organizar objetos sem afetar transformações.",
      "\`M\` move objetos selecionados para uma collection.",
      "O **olho** no outliner controla visibilidade no viewport; a **seta de câmera** controla o render.",
      "Collections aninhadas formam estruturas grandes e gerenciáveis.",
      "**Excluir** uma collection (caixa marcada) tira tudo da avaliação da cena — útil para performance.",
      "Você pode **linkar uma collection** entre arquivos .blend (\`File > Link\`), ótimo para asset libraries.",
    ],
    alerts: [
      { type: "tip", content: "Pressione \`Numpad /\` para entrar em **Local View**: só os objetos selecionados aparecem. Combine com collections para foco total." },
      { type: "warning", content: "Esconder com o **olho** é diferente de **excluir** com a caixa: o excluído não é renderizado nem afeta a cena." },
      { type: "success", content: "Cenas com 1000+ objetos rodam suavemente quando bem organizadas em collections — esconder o que não precisa **economiza FPS** no viewport." },
    ],
  },
  {
    slug: "origem-objeto",
    section: "objetos",
    title: "Origem do Objeto",
    difficulty: "intermediario",
    subtitle: "Aquele pontinho laranja que decide tudo: posição, rotação e física.",
    intro: `
Todo objeto no Blender tem um **ponto de origem**, representado por um pontinho laranja (ou amarelo, quando ativo). Esse ponto é, para o Blender, **o objeto**. Quando você lê \`Location: (1, 2, 3)\` no painel \`N\`, está vendo a posição **da origem**, não dos vértices. Quando rotaciona, gira em torno da origem (se o pivot estiver em Median Point). Quando aplica física, a massa é centrada na origem.

Por padrão, a origem fica no **centro geométrico** do mesh. Mas, ao editar vértices em **Edit Mode** e mover só alguns deles, você desloca o mesh **em relação à origem**, criando um descompasso. Isso quebra animações: imagine uma porta cuja origem ficou no meio em vez da dobradiça — ela vai girar errado.

## Como mover a origem
Você muda a origem em **Object > Set Origin**. As opções principais são:
- **Origin to Geometry** → recentraliza no meio do mesh
- **Origin to 3D Cursor** → coloca a origem onde o cursor está (precisão máxima)
- **Origin to Center of Mass** → útil para física

### Truque do 3D Cursor
Para colocar a origem em um vértice específico: em Edit Mode, selecione o vértice, \`Shift + S\` → \`Cursor to Selected\`. Volte para Object Mode, \`Object > Set Origin > Origin to 3D Cursor\`. Pronto.
    `,
    codes: [
      { lang: "atalho", code: "Shift + Ctrl + Alt + C → (versões antigas) menu Set Origin\nObject > Set Origin   → menu atual\nShift + S             → Snap (cursor para seleção)" },
      { lang: "passo-a-passo", code: "1. Em Edit Mode, selecione o vértice da dobradiça da porta\n2. Shift + S > Cursor to Selected\n3. Tab para voltar a Object Mode\n4. Object > Set Origin > Origin to 3D Cursor\n5. Agora R Z gira em torno da dobradiça" },
      { lang: "python", code: "import bpy\n\n# Move origem para o cursor\nbpy.ops.object.origin_set(type='ORIGIN_CURSOR', center='MEDIAN')\n\n# Recentraliza no centro geométrico\nbpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')" },
      { lang: "config", code: "Opções de Set Origin:\n- Geometry to Origin   → move o mesh até a origem (mesh viaja)\n- Origin to Geometry   → move a origem até o mesh (origem viaja)\n- Origin to 3D Cursor  → origem vai para o cursor\n- Origin to Center of Mass (Surface) → física de superfície\n- Origin to Center of Mass (Volume)  → física de volume" },
    ],
    points: [
      "A **origem** é o pontinho laranja que representa o objeto para o Blender.",
      "\`Location\` no painel \`N\` é a posição **da origem**, não dos vértices.",
      "Origens descentralizadas causam rotações estranhas — sempre confira ao animar.",
      "Use o **3D Cursor** como ponto preciso para reposicionar a origem.",
      "**Origin to Geometry** recentraliza rapidamente quando você fez bagunça.",
      "**Geometry to Origin** faz o mesh viajar; **Origin to Geometry** faz a origem viajar — confunde no início.",
    ],
    alerts: [
      { type: "tip", content: "Antes de exportar para engines (Unity, Unreal), garanta que a origem esteja no **chão do objeto** — facilita o posicionamento na engine." },
      { type: "warning", content: "Mover a origem **não** muda os vértices, mas muda como modificadores e física se comportam." },
      { type: "info", content: "O ícone laranja é a origem; o ponto preto-e-branco é o **3D Cursor**. Não confunda — eles são coisas totalmente diferentes." },
    ],
  },
  {
    slug: "mesh-vs-objeto",
    section: "objetos",
    title: "Mesh vs Objeto — A Distinção Mais Importante",
    difficulty: "intermediario",
    subtitle: "Por que dois cubos podem compartilhar o mesmo mesh — e por que isso muda tudo.",
    intro: `
Esta é talvez a distinção conceitual **mais importante** para entender o Blender: **objeto** e **mesh** não são a mesma coisa. Um **objeto** é um contêiner que guarda posição, rotação, escala, modificadores e materiais. O **mesh** (chamado também de **Object Data** ou \`mesh datablock\`) é a geometria pura — vértices, arestas, faces.

Um objeto **referencia** um mesh, mas múltiplos objetos podem **referenciar o mesmo mesh**. É exatamente isso que o \`Alt + D\` faz: cria um novo objeto, mas reutiliza o mesh do original. Editar a geometria de qualquer cópia altera todas, porque internamente é o **mesmo dado**.

## Por que isso importa
Em projetos grandes (centenas de janelas, milhares de árvores), reutilizar meshes economiza memória **brutalmente**. Em arquitetura, todas as cadeiras de uma sala podem ser o mesmo mesh: você modela uma e as outras seguem.

### Como ver no Outliner
No Outliner (modo \`Blender File\` ou \`Data API\`), você verá categorias separadas: **Objects**, **Meshes**, **Materials**, **Images**. Um mesh chamado \`Cube\` pode ter, ao lado do nome, um número como \`3\` — significa que **3 objetos** o usam.

Entender isso destrava conceitos avançados: linked libraries, asset browser, instancing em geometry nodes. Tudo parte daqui.
    `,
    codes: [
      { lang: "atalho", code: "Alt + D    → duplicar com mesh linkado\nU          → menu 'Make Single User' (separa o mesh)\nL          → ver linked items (no outliner)" },
      { lang: "passo-a-passo", code: "1. Adicione um cubo\n2. Pressione Alt + D, mova para o lado\n3. Tab → Edit Mode → mova um vértice\n4. Tab → Object Mode → veja: ambos cubos mudaram!\n5. Para separar: selecione um, Object > Relations > Make Single User > Object & Data" },
      { lang: "python", code: "import bpy\n\nobj_a = bpy.data.objects['Cube']\nobj_b = bpy.data.objects['Cube.001']\n\n# Verifica se compartilham mesh\nprint(obj_a.data == obj_b.data)\n\n# Quantos objetos usam este mesh?\nprint(obj_a.data.users)\n\n# Forçar mesh independente\nobj_b.data = obj_b.data.copy()" },
      { lang: "config", code: "Hierarquia de dados no Blender:\nScene\n └─ Collection\n     └─ Object (location, rotation, scale, modifiers)\n         └─ Object Data (Mesh, Curve, Light, Camera...)\n             └─ Material Slot\n                 └─ Material\n                     └─ Node Tree" },
    ],
    points: [
      "**Objeto** = contêiner com transformações; **Mesh** = geometria pura.",
      "Um mesh pode ser usado por **vários objetos** ao mesmo tempo.",
      "\`Alt + D\` cria objetos linkados ao mesmo mesh; \`Shift + D\` cria meshes independentes.",
      "**Make Single User** separa um mesh compartilhado em uma cópia única.",
      "O número ao lado do nome no outliner mostra quantos **usuários** aquele datablock tem.",
      "Materiais, texturas, animações e armatures também seguem essa lógica de **datablocks compartilhados**.",
    ],
    alerts: [
      { type: "tip", content: "Renomeie objetos e meshes com nomes diferentes (\`Cadeira\` para o objeto, \`MSH_Cadeira\` para o mesh) para identificar rapidamente no outliner." },
      { type: "warning", content: "Datablocks com **0 usuários** são apagados ao salvar e fechar o arquivo. Use o **Fake User** (ícone de escudo) para preservar." },
      { type: "info", content: "Toda a filosofia do Blender é **dados reutilizáveis**. Quando entender isso, scripts e asset libraries fazem sentido." },
    ],
  },
  {
    slug: "modifiers-intro",
    section: "objetos",
    title: "Introdução aos Modifiers",
    difficulty: "intermediario",
    subtitle: "Operações não-destrutivas que transformam seu mesh sem alterá-lo permanentemente.",
    intro: `
**Modifiers** são, na minha opinião, a feature mais subestimada do Blender por iniciantes. Um modifier é uma operação aplicada **por cima** do seu mesh original, sem alterá-lo de fato. Você pode adicionar, remover, reordenar, ligar, desligar e ajustar a qualquer momento — é totalmente **não-destrutivo**. Pense em filtros do Photoshop em camadas de ajuste: o pixel original está intacto.

Os modifiers vivem no painel **Properties**, no ícone da chave inglesa azul. Você adiciona um clicando em **Add Modifier** e escolhendo da lista categorizada (Generate, Deform, Modify, Simulate). Cada modifier tem suas opções, e você pode **empilhar vários** — a ordem importa muito, pois cada um lê o resultado do anterior.

## Os modifiers que você usará todo dia
- **Subdivision Surface**: suaviza o mesh, multiplica a geometria de forma orgânica. Atalho \`Ctrl + 1/2/3\` para níveis 1, 2, 3.
- **Mirror**: espelha o objeto em um eixo. Modele meio rosto e o outro lado aparece de graça.
- **Array**: já visto, multiplica em padrão regular.
- **Bevel**: adiciona chanfro em arestas vivas, dando realismo (nada na vida real é 100% afiado).
- **Solidify**: dá espessura a uma superfície fina (perfeito para roupas, paredes).

### Aplicar ou não aplicar?
Você pode **aplicar** um modifier (\`Ctrl + A\` no painel) para "imprimi-lo" no mesh, tornando-o permanente. Faça isso só quando tem certeza, porque depois não dá para voltar atrás sem Undo.
    `,
    codes: [
      { lang: "atalho", code: "Ctrl + 1   → aplica Subdivision Surface nível 1\nCtrl + 2   → nível 2\nCtrl + 3   → nível 3\nCtrl + A (no modifier) → aplica permanentemente" },
      { lang: "passo-a-passo", code: "1. Selecione o cubo padrão\n2. Properties > ícone da chave (Modifier)\n3. Add Modifier > Generate > Subdivision Surface\n4. Aumente Levels Viewport para 2\n5. Veja o cubo virar quase uma esfera, suavizado\n6. Tab para Edit Mode: o mesh original ainda é um cubo de 8 vértices" },
      { lang: "python", code: "import bpy\n\nobj = bpy.context.active_object\n\n# Adiciona Subdivision Surface\nsubsurf = obj.modifiers.new(name='Subsurf', type='SUBSURF')\nsubsurf.levels = 2\nsubsurf.render_levels = 3\n\n# Adiciona Mirror\nmirror = obj.modifiers.new(name='Mirror', type='MIRROR')\nmirror.use_axis[0] = True  # X" },
      { lang: "config", code: "Ordem recomendada de modifiers (de cima para baixo):\n1. Mirror         (espelha primeiro)\n2. Array          (multiplica)\n3. Solidify       (dá espessura)\n4. Bevel          (chanfra arestas)\n5. Subdivision    (suaviza por último)\nA ordem errada produz resultados inesperados." },
      { lang: "atalho", code: "Botões no header de cada modifier:\n👁️ Viewport      → mostra/esconde no viewport\n📷 Render        → inclui/exclui no render\n✏️ Edit Mode     → mostra resultado em edit mode\n△ On Cage        → permite editar vértices virtuais" },
    ],
    points: [
      "**Modifiers** são operações não-destrutivas aplicadas sobre o mesh original.",
      "Você empilha vários, e a **ordem** importa: cada um lê a saída do anterior.",
      "**Subdivision Surface** é o modifier mais usado para suavizar formas orgânicas.",
      "**Mirror** economiza metade do trabalho em modelos simétricos (rostos, carros).",
      "Aplicar um modifier (\`Ctrl + A\`) é **permanente**: faça só quando estiver certo.",
      "Cada modifier tem botões para esconder no viewport, render ou edit mode.",
      "Modifiers podem ser **copiados** entre objetos com \`Ctrl + L\` > Copy Modifiers.",
    ],
    alerts: [
      { type: "tip", content: "Combine **Mirror + Subdivision Surface + Bevel** e você cobre 80% das modelagens orgânicas e hard-surface." },
      { type: "warning", content: "Aplicar **Subdivision Surface** multiplica vértices exponencialmente. Um cubo nível 4 vira **6.144 faces**. Cuidado com a performance." },
      { type: "success", content: "Quando dominar modifiers, você nunca mais vai modelar 'na unha'. Eles **mudam o jogo**." },
    ],
  },
];
