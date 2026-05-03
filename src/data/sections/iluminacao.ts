import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "tipos-lampadas",
    section: "iluminacao",
    title: "Tipos de Lâmpadas no Blender",
    difficulty: "iniciante",
    subtitle: "Conheça as quatro famílias de luz que existem dentro do Blender e quando usar cada uma.",
    intro: `
No mundo real, a luz pode vir de uma lâmpada de mesa, de uma janela, do sol ou de um spot de teatro. O Blender simula esses comportamentos através de **objetos de luz** (chamados \`Light\` no menu \`Add → Light\`). Entender as diferenças entre eles é o primeiro passo para sair do "tudo escuro" ou "tudo lavado" e começar a iluminar com intenção.

O Blender oferece quatro tipos principais: \`Point\` (luz pontual, como uma lâmpada nua), \`Sun\` (luz paralela, como o sol), \`Spot\` (cone direcionado, como um holofote) e \`Area\` (área retangular ou circular, como um softbox de fotografia). Cada uma resolve um problema diferente — e usar a errada é o motivo mais comum de cenas amadoras parecerem amadoras.

## Por que isso importa tanto
Em outros softwares como Maya ou 3ds Max, os nomes mudam um pouco, mas o conceito é o mesmo. O Blender só simplifica a interface: você adiciona uma luz e depois muda o **tipo** no painel de propriedades (\`Object Data Properties\`, ícone de lâmpada verde).

Neste capítulo você verá um panorama de cada tipo, com analogias do mundo real, para que nos próximos capítulos a gente mergulhe fundo em cada um. Pense neste capítulo como o "cardápio" da sua iluminação.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Abra uma cena nova (File → New → General)\n2. Apague a luz padrão (selecione e pressione X)\n3. Add → Light → Point (ou Sun, Spot, Area)\n4. Vá em Object Data Properties (ícone de lâmpada verde)\n5. No topo, mude o tipo no dropdown 'Type'" },
      { lang: "atalho", code: "Shift + A → menu Add  |  X → deletar  |  N → painel lateral  |  0 → câmera" },
      { lang: "python", code: "import bpy\n\n# Cria uma luz Point na origem\nbpy.ops.object.light_add(type='POINT', location=(0, 0, 3))\nlight = bpy.context.object\nlight.data.energy = 1000  # potência em Watts (Cycles)\nlight.data.color = (1.0, 0.9, 0.8)  # leve tom quente" },
      { lang: "config", code: "Tipo        | Uso típico                  | Sombra\nPoint       | lâmpadas, velas, fogueiras  | macia se Radius>0\nSun         | sol, luz da lua             | direcional, paralela\nSpot        | holofote, lanterna, abajur  | cônica, focada\nArea        | janela, softbox, painel LED | mais realista" },
    ],
    points: [
      "**Point**: emite luz em todas as direções a partir de um ponto, como uma lâmpada incandescente sem cúpula.",
      "**Sun**: ignora a posição e usa só a rotação; a intensidade não cai com a distância.",
      "**Spot**: cone com ângulo ajustável; ótimo para destacar um objeto.",
      "**Area**: superfície que emite luz; gera as sombras mais suaves e realistas.",
      "Você troca o tipo a qualquer momento em \`Object Data Properties\`, sem precisar deletar o objeto.",
      "A unidade de intensidade muda entre Eevee e Cycles — não estranhe os números diferentes.",
    ],
    alerts: [
      { type: "tip", content: "Sempre que adicionar uma luz, dê um nome a ela no \`Outliner\` (ex: \`Key\`, \`Fill\`, \`Rim\`). Isso salva sua sanidade em cenas grandes." },
      { type: "info", content: "A luz padrão da cena nova é uma \`Point\` posicionada em (4, 1, 6). Você pode apagá-la com **X** quando quiser começar do zero." },
      { type: "warning", content: "Nunca confunda **rotação** com **posição** numa \`Sun\`: mover ela pelo espaço não muda nada na iluminação." },
    ],
  },
  {
    slug: "point-vs-area",
    section: "iluminacao",
    title: "Point vs Area: a diferença que muda tudo",
    difficulty: "iniciante",
    subtitle: "A escolha entre uma luz pontual e uma luz de área define o realismo da sua cena.",
    intro: `
Imagine acender uma vela no meio de uma sala escura. A chama é praticamente um ponto, e por isso projeta sombras nítidas, com bordas duras. Agora imagine abrir uma cortina e deixar a luz do dia entrar por uma janela grande: as sombras ficam suaves, com bordas borradas. Essa diferença, que parece sutil, é exatamente o contraste entre uma luz \`Point\` e uma luz \`Area\` no Blender.

A regra de ouro da iluminação 3D é: **quanto maior a fonte de luz em relação ao objeto, mais suave a sombra**. Uma \`Point\` é matematicamente um ponto sem dimensão, então sempre gera sombras duras (a não ser que você aumente o \`Radius\`). Uma \`Area\`, por outro lado, tem tamanho real (\`Size X\` e \`Size Y\`) e simula uma superfície emissora.

## Quando usar cada uma
Use \`Point\` para fontes pequenas e visíveis: lâmpadas nuas, velas, LEDs, vaga-lumes. Use \`Area\` para janelas, softboxes de estúdio, painéis de teto, telas de computador iluminando um rosto. Em quase todo retrato 3D que você admira na internet, a luz principal é uma \`Area\` grande.

No próximo capítulo a gente vai falar de \`Sun\`, mas guarde bem essa intuição: **tamanho da fonte controla suavidade da sombra**. Você vai usar isso para o resto da sua vida.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Add → Light → Area\n2. No painel verde de luz, ajuste 'Shape' para Square, Rectangle, Disk ou Ellipse\n3. Aumente 'Size' para sombras mais macias\n4. Ajuste 'Power' (em Watts) para a intensidade desejada\n5. Rotacione com R para apontar a face emissora" },
      { lang: "atalho", code: "R X 90 → girar 90° no eixo X  |  G Z 2 → mover 2m no Z  |  N → ver coordenadas" },
      { lang: "python", code: "import bpy\n\n# Cria uma Area do tipo softbox 1x1m\nbpy.ops.object.light_add(type='AREA', location=(2, -2, 2))\narea = bpy.context.object\narea.data.shape = 'RECTANGLE'\narea.data.size = 1.0       # tamanho X\narea.data.size_y = 0.6     # tamanho Y\narea.data.energy = 200     # Watts" },
      { lang: "config", code: "Cenário               | Tipo  | Tamanho recomendado\nVela na mesa          | Point | Radius 0.02m\nLâmpada de teto       | Point | Radius 0.05m\nJanela de quarto      | Area  | 1.5 x 2.0 m\nSoftbox de estúdio    | Area  | 0.8 x 1.2 m\nTela de notebook      | Area  | 0.3 x 0.2 m" },
    ],
    points: [
      "**Sombra dura = fonte pequena**, **sombra suave = fonte grande**. Memorize isso.",
      "Uma \`Point\` com \`Radius\` aumentado começa a se comportar como uma esfera emissora pequena.",
      "Uma \`Area\` é direcional: ela emite **só pela face frontal** (a seta amarela aponta para onde a luz vai).",
      "\`Shape\` da \`Area\` muda o formato do reflexo (catchlight) nos olhos e em superfícies brilhantes.",
      "Quanto maior a \`Area\`, mais lenta a renderização em Cycles — equilíbrio é tudo.",
      "Em retratos, uma \`Area\` grande próxima do rosto é o segredo de pele bonita.",
    ],
    alerts: [
      { type: "success", content: "Truque profissional: posicione uma \`Area\` retangular bem perto do objeto e veja como o **catchlight** nos olhos vira um retângulo bonito." },
      { type: "warning", content: "Se sua \`Area\` está apontando para o lado errado, a cena fica escura e você não entende por quê. Sempre confira a **seta amarela** dela." },
    ],
  },
  {
    slug: "sun-light",
    section: "iluminacao",
    title: "Sun Light: simulando o sol",
    difficulty: "iniciante",
    subtitle: "A luz que ignora distância e ilumina o mundo todo a partir de uma direção.",
    intro: `
A \`Sun\` é uma luz especial: ela não tem posição, só **direção**. Isso porque o sol real está tão longe da Terra que, na prática, todos os raios chegam paralelos. No Blender, não importa se você coloca a \`Sun\` a 1 metro ou a 100 metros do chão — o que importa é a **rotação** dela. Aponte-a com \`R\` e os ângulos definirão de onde vem a luz.

Esse comportamento confunde muito iniciante. Você arrasta a \`Sun\` para longe achando que vai mudar a cena, mas nada acontece. A solução é usar o \`Gizmo\` de rotação ou digitar valores em graus no painel \`N\`. Por exemplo, \`Rotation X = 60°\` simula o sol no fim da tarde, baixo no horizonte.

## A propriedade Angle e o tamanho do sol
A \`Sun\` tem uma propriedade mágica chamada \`Angle\`. Ela simula o **tamanho aparente** do sol no céu (cerca de 0.5° na vida real). Aumentando esse valor, as sombras ficam mais suaves, como num dia nublado. Diminuindo para zero, as sombras ficam perfeitamente nítidas — algo que só existe no espaço sideral.

Você verá que, combinada com um \`HDRI\` no \`World\` (próximos capítulos), uma \`Sun\` bem ajustada é tudo que você precisa para cenas externas convincentes.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Add → Light → Sun\n2. Pressione R, depois X 60 e Enter (gira 60° no eixo X)\n3. Ajuste 'Strength' (Cycles usa W/m², valores tipo 3 a 5)\n4. Aumente 'Angle' para sombras mais suaves (ex: 5°)\n5. Vá em Output → Render Engine: Cycles para resultado físico" },
      { lang: "atalho", code: "R X 60 → girar X em 60°  |  Numpad 7 → vista de topo  |  Numpad 1 → vista frontal" },
      { lang: "python", code: "import bpy, math\n\nbpy.ops.object.light_add(type='SUN')\nsun = bpy.context.object\nsun.data.energy = 4.0          # W/m² em Cycles\nsun.data.angle = math.radians(2.0)   # 2 graus de tamanho aparente\nsun.data.color = (1.0, 0.95, 0.85)   # leve tom dourado\nsun.rotation_euler = (math.radians(60), 0, math.radians(30))" },
      { lang: "config", code: "Hora do dia      | Rotation X | Color (R,G,B)\nNascer do sol    | 85°        | 1.0, 0.7, 0.5\nMeio-dia         | 10°        | 1.0, 1.0, 0.95\nFim de tarde     | 75°        | 1.0, 0.8, 0.6\nLuar             | 50°        | 0.6, 0.7, 1.0" },
    ],
    points: [
      "A \`Sun\` ignora a posição: só a **rotação** importa para a iluminação.",
      "\`Angle\` controla a **suavidade da sombra** — pense nele como o tamanho aparente do sol.",
      "Em Cycles, \`Strength\` da \`Sun\` é em W/m², e valores entre 3 e 6 já são bem fortes.",
      "Combine sempre uma \`Sun\` com um \`HDRI\` no \`World\` para cenas externas realistas.",
      "Use cores levemente quentes ou frias para sugerir hora do dia sem precisar de pós-produção.",
      "O \`Gizmo\` da \`Sun\` mostra uma seta tracejada indicando para onde a luz vai.",
    ],
    alerts: [
      { type: "tip", content: "Para alinhar a \`Sun\` com a vista atual da câmera, selecione a luz e pressione \`Ctrl + Numpad 0\` depois \`Ctrl + Alt + Numpad 0\` para levar a câmera para a vista — e vice-versa." },
      { type: "info", content: "No mundo real, o sol tem **0.53° de diâmetro angular** visto da Terra. Esse é o valor 'fisicamente correto' para o \`Angle\`." },
      { type: "danger", content: "Não confunda \`Sun\` do Blender com o sol do nó \`Sky Texture\` no \`World\`. Eles podem coexistir, mas precisam estar **alinhados** ou a cena fica esquisita." },
    ],
  },
  {
    slug: "spot-light",
    section: "iluminacao",
    title: "Spot Light: o holofote 3D",
    difficulty: "iniciante",
    subtitle: "A luz cônica perfeita para destacar objetos, criar drama e simular lanternas.",
    intro: `
A \`Spot\` é o equivalente digital do holofote de teatro ou do farol de carro: ela emite luz dentro de um **cone** apontado para uma direção específica. Diferente da \`Point\`, que ilumina em todas as direções, a \`Spot\` é cirúrgica — você decide exatamente o que vai receber luz e o que vai ficar no escuro.

Os dois controles principais são \`Spot Size\` (o ângulo total do cone, em graus) e \`Spot Blend\` (a suavidade da borda do cone, de 0 a 1). Com \`Blend = 0\` você tem uma borda nítida, como uma lanterna velha; com \`Blend = 1\` a borda some, transformando a \`Spot\` quase numa \`Point\` direcional.

## Quando o spot é a escolha certa
Use \`Spot\` para criar drama: um único holofote sobre um personagem, um abajur projetando um cone de luz no teto, faróis de carro cortando a neblina. Combine com partículas de fumaça (\`Volume Scatter\`) e você consegue aqueles raios de luz visíveis no ar — efeito conhecido como **god rays**.

No próximo capítulo a gente entra no \`HDRI\`, mas antes brinque bastante com \`Spot\`: ela é a luz que mais ensina sobre **direção e intenção** na iluminação.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Add → Light → Spot\n2. Pressione R e aponte para o objeto\n3. Em Object Data Properties, ajuste 'Spot Size' (ex: 45°)\n4. Ajuste 'Spot Blend' (ex: 0.3 para borda suave)\n5. Ative 'Show Cone' para ver o cone na viewport\n6. Aumente 'Radius' para sombras mais macias" },
      { lang: "atalho", code: "Ctrl + T → adicionar Track To Constraint  |  Numpad . → enquadrar selecionado" },
      { lang: "python", code: "import bpy, math\n\nbpy.ops.object.light_add(type='SPOT', location=(0, -3, 4))\nspot = bpy.context.object\nspot.data.energy = 500\nspot.data.spot_size = math.radians(40)   # 40° de cone\nspot.data.spot_blend = 0.25              # borda suave\nspot.data.show_cone = True               # visualiza o cone\n\n# Aponta para o cubo da cena\ncubo = bpy.data.objects.get('Cube')\nif cubo:\n    constraint = spot.constraints.new('TRACK_TO')\n    constraint.target = cubo" },
      { lang: "config", code: "Efeito desejado     | Spot Size | Spot Blend\nLaser focado        | 5°        | 0.0\nLanterna            | 30°       | 0.15\nHolofote teatral    | 45°       | 0.3\nAbajur amplo        | 90°       | 0.6\nQuase Point         | 120°      | 1.0" },
    ],
    points: [
      "**Spot Size** = ângulo do cone em graus; **Spot Blend** = suavidade da borda.",
      "Ative \`Show Cone\` para visualizar o volume da luz na viewport — facilita muito o ajuste.",
      "Combine \`Spot\` com \`Volume Scatter\` no \`World\` para criar **god rays** visíveis no ar.",
      "Use \`Track To\` (\`Ctrl + T\`) para fazer a \`Spot\` seguir um objeto automaticamente.",
      "\`Radius\` maior que zero suaviza as sombras — a \`Spot\` deixa de ser um ponto perfeito.",
      "\`Spot\` é a escolha clássica para iluminar produtos com fundo escuro.",
    ],
    alerts: [
      { type: "tip", content: "Para fazer faróis de carro, use **duas \`Spot\`** simétricas, com \`Spot Size\` de uns 30° e \`Spot Blend\` de 0.4. Adicione fumaça leve no \`World\` para os raios aparecerem." },
      { type: "warning", content: "Ângulos de cone acima de 130° começam a perder o sentido — se você precisa de mais que isso, troque para uma \`Point\` ou \`Area\`." },
    ],
  },
  {
    slug: "hdri-world",
    section: "iluminacao",
    title: "HDRI no World: iluminando com uma foto",
    difficulty: "iniciante",
    subtitle: "Use uma única imagem de 360° para iluminar a cena inteira com realismo fotográfico.",
    intro: `
HDRI significa **High Dynamic Range Image** — uma imagem panorâmica de 360° capturada em vários níveis de exposição, capaz de armazenar valores de brilho muito além do que um JPEG comum aguenta. Quando você joga um \`HDRI\` no \`World\` do Blender, a cena é iluminada **como se estivesse de verdade naquele ambiente**: o reflexo do céu, a cor da terra, a luz do sol — tudo já incluído.

Sites como **Poly Haven** (polyhaven.com) oferecem centenas de HDRIs gratuitos em alta qualidade. Você baixa um arquivo \`.exr\` ou \`.hdr\` e pluga no Blender em poucos cliques. É o atalho mais rápido para sair de uma cena 3D parecendo plástico para algo que parece fotografia.

## Como conectar um HDRI
Vá em \`World Properties\` (ícone de globo vermelho), troque \`Color\` por \`Environment Texture\` clicando no pequeno círculo amarelo, e abra a imagem. Pronto — sua cena já tem iluminação global de qualidade. Para mais controle, abra o \`Shader Editor\` no modo \`World\` e adicione nós como \`Mapping\` (para girar o céu) e \`Background\` com \`Strength\` ajustável.

Você verá que com um bom \`HDRI\` muitas vezes você nem precisa adicionar luzes extras. É a base profissional de quase todo render arquitetônico ou de produto que você vê por aí.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Baixe um HDRI em polyhaven.com (formato .exr, 2K já basta)\n2. Em Properties, vá no globo vermelho (World Properties)\n3. Em Surface → Color, clique no círculo amarelo → Environment Texture\n4. Clique em Open e selecione o arquivo .exr\n5. Ajuste 'Strength' para controlar o brilho (1.0 é neutro)\n6. Para girar o céu: abra o Shader Editor em modo World e use um nó Mapping" },
      { lang: "atalho", code: "Z → menu de shading (escolha Rendered para ver o HDRI)  |  Shift + Z → toggle wireframe/render" },
      { lang: "python", code: "import bpy\n\nworld = bpy.context.scene.world\nworld.use_nodes = True\nnodes = world.node_tree.nodes\nlinks = world.node_tree.links\n\n# Limpa nós existentes\nnodes.clear()\n\nbg = nodes.new('ShaderNodeBackground')\nenv = nodes.new('ShaderNodeTexEnvironment')\nout = nodes.new('ShaderNodeOutputWorld')\n\nenv.image = bpy.data.images.load('/caminho/para/sua_hdri.exr')\nbg.inputs['Strength'].default_value = 1.0\n\nlinks.new(env.outputs['Color'], bg.inputs['Color'])\nlinks.new(bg.outputs['Background'], out.inputs['Surface'])" },
      { lang: "config", code: "Resolução HDRI | Uso recomendado\n1K (1024x512)  | testes rápidos, viewport\n2K             | renders intermediários\n4K             | renders finais comuns\n8K             | reflexos extremos, close-ups\n16K            | só se você tem RAM sobrando" },
    ],
    points: [
      "Um \`HDRI\` armazena luz **e** imagem ao mesmo tempo, com brilho real (não limitado a 0–255).",
      "Conecte via \`World Properties → Color → Environment Texture\`.",
      "Ajuste a rotação no eixo Z com um nó \`Mapping\` para girar o sol pelo horizonte.",
      "\`Strength\` controla a intensidade — comece em 1.0 e ajuste por gosto.",
      "Use HDRIs gratuitos do \`Poly Haven\` (CC0, pode usar comercialmente).",
      "Para esconder o céu mas manter a luz, ative \`Film → Transparent\` em \`Render Properties\`.",
    ],
    alerts: [
      { type: "tip", content: "Use o atalho \`Z → Rendered\` para ver o efeito do \`HDRI\` em tempo real. É hipnotizante." },
      { type: "info", content: "HDRIs de **interior** (estúdio, sala) e **exterior** (parque, deserto) são mundos diferentes. Tenha uma pequena coleção dos dois tipos." },
      { type: "warning", content: "Resoluções 8K+ consomem muita VRAM da GPU. Se o Blender travar ao renderizar, baixe a resolução do \`HDRI\`." },
    ],
  },
  {
    slug: "esquema-tres-pontos",
    section: "iluminacao",
    title: "Esquema de Três Pontos",
    difficulty: "intermediario",
    subtitle: "A receita clássica de cinema e fotografia para iluminar qualquer personagem ou produto.",
    intro: `
O **esquema de três pontos** é uma receita centenária herdada do cinema e da fotografia de retrato. Ela usa três luzes com papéis bem definidos: \`Key\` (luz principal), \`Fill\` (luz de preenchimento) e \`Rim\` (também chamada \`Back Light\` ou luz de contorno). Aprender esse esquema é como aprender o acorde de Sol no violão: depois disso, você consegue tocar quase qualquer música.

A \`Key\` é a luz mais forte, geralmente a uns 45° à frente e ao lado do objeto, simulando a luz dominante (sol, janela). A \`Fill\` fica do lado oposto, com cerca de metade da intensidade, **suavizando as sombras** sem eliminá-las. A \`Rim\` vem de trás, alta, criando uma linha de luz no contorno do objeto que o **separa do fundo**.

## Por que funciona tão bem
Esse esquema funciona porque imita como o cérebro humano lê profundidade: sombra suave + contorno destacado = forma tridimensional. Fotógrafos chamam de **modelagem da luz**. No Blender, você implementa com três \`Area\` lights e ajusta intensidade e tamanho.

A regra clássica é proporção 4:2:1 entre Key, Fill e Rim, mas isso é só ponto de partida. Você verá que pequenos ajustes mudam totalmente o humor: aumente a Key e a cena fica dramática; equilibre Key e Fill e ela fica neutra, "publicitária".
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Coloque seu objeto na origem\n2. Add → Light → Area: nomeie 'Key', posicione frente-direita a 45°, Power 800W\n3. Add → Light → Area: nomeie 'Fill', posicione frente-esquerda, Power 300W, tamanho maior\n4. Add → Light → Area: nomeie 'Rim', posicione atrás-cima, Power 600W, tamanho pequeno\n5. Renderize e ajuste proporções até gostar" },
      { lang: "atalho", code: "M → mover para Collection (organize Key/Fill/Rim em uma 'Lights')  |  H → esconder  |  Alt+H → mostrar tudo" },
      { lang: "python", code: "import bpy, math\n\ndef criar_area(nome, loc, rot, power, size):\n    bpy.ops.object.light_add(type='AREA', location=loc)\n    obj = bpy.context.object\n    obj.name = nome\n    obj.rotation_euler = rot\n    obj.data.energy = power\n    obj.data.size = size\n    return obj\n\ncriar_area('Key',  (3, -3, 3),  (math.radians(60), 0, math.radians(45)),  800, 1.0)\ncriar_area('Fill', (-3, -2, 2), (math.radians(70), 0, math.radians(-30)), 300, 1.5)\ncriar_area('Rim',  (-1, 3, 4),  (math.radians(120), 0, math.radians(180)), 600, 0.5)" },
      { lang: "config", code: "Luz   | Posição relativa     | Intensidade | Tamanho\nKey   | 45° frente, alta     | 100% (forte)| médio\nFill  | 45° frente, oposta   | 30-50%      | grande (suave)\nRim   | atrás, acima         | 60-80%      | pequeno (focado)" },
    ],
    points: [
      "**Key** = luz principal, cria as sombras dominantes.",
      "**Fill** = preenche as sombras, controla o contraste geral.",
      "**Rim** = ilumina o contorno por trás, separa do fundo.",
      "Proporção clássica 4:2:1 (Key:Fill:Rim) é só um ponto de partida.",
      "Use cores levemente diferentes em cada luz para riqueza visual (ex: Key quente, Fill fria).",
      "Organize as três luzes em uma \`Collection\` chamada \`Lights\` para ligar/desligar em bloco.",
      "Esse esquema funciona para personagens, produtos, comida — praticamente qualquer assunto.",
    ],
    alerts: [
      { type: "success", content: "Faça o exercício: pegue uma esfera cinza e pratique o esquema de três pontos. Depois desligue uma luz por vez para sentir o papel de cada uma." },
      { type: "tip", content: "Para cenas dramáticas, **diminua a Fill** quase a zero. Para cenas alegres e clean, suba a Fill quase igual à Key." },
      { type: "info", content: "Em arquitetura, a 'Key' costuma ser a \`Sun\` ou janela, a 'Fill' é o céu via \`HDRI\`, e a 'Rim' aparece naturalmente do reflexo de outras superfícies." },
    ],
  },
  {
    slug: "sombras-soft-vs-hard",
    section: "iluminacao",
    title: "Sombras Soft vs Hard",
    difficulty: "intermediario",
    subtitle: "Entenda fisicamente o que produz sombras macias ou nítidas e domine o controle de mood.",
    intro: `
Sombra **dura** (\`hard shadow\`) tem borda bem definida, quase recortada. Sombra **macia** (\`soft shadow\`) tem uma transição gradual entre luz e penumbra. Essa diferença não é uma escolha estética arbitrária: ela é resultado físico do **tamanho aparente da fonte de luz** vista do ponto onde a sombra cai.

Quando a fonte é pequena (ou está muito longe, como o sol), os raios chegam quase paralelos e a sombra é nítida. Quando a fonte é grande (ou está muito perto), raios chegam de vários ângulos diferentes, criando uma região de penumbra suave nas bordas. Isso é o que os fotógrafos chamam de **soft light** e é a base de iluminação de retrato.

## Como controlar no Blender
Em todas as luzes do Blender, você tem propriedades que controlam essa suavidade: \`Radius\` em \`Point\` e \`Spot\`, \`Size\` em \`Area\`, \`Angle\` em \`Sun\`. Aumentar esses valores aumenta o tamanho aparente da fonte e suaviza as sombras — mas custa mais tempo de render em Cycles.

Você verá que mood dramático (filme noir, terror) usa sombras duras, enquanto mood suave (publicidade de cosmético, retrato) usa sombras bem macias. Saber escolher é metade da batalha de uma boa iluminação.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Crie uma cena simples: chão + esfera\n2. Add → Light → Point, posicione acima\n3. Em Object Data Properties, ache 'Radius' e ajuste de 0 a 1m\n4. Renderize cada valor e compare as sombras\n5. Repita o teste com Area e ajuste 'Size'" },
      { lang: "atalho", code: "F12 → render final  |  Ctrl + B → render border (renderiza só uma região)" },
      { lang: "python", code: "import bpy, math\n\n# Compara sombras: cria uma Sun com angle pequeno (sol nítido)\nbpy.ops.object.light_add(type='SUN', rotation=(math.radians(45), 0, 0))\nsol_nitido = bpy.context.object\nsol_nitido.data.angle = math.radians(0.5)  # sol real\nsol_nitido.data.energy = 4.0\n\n# Outra Sun com angle grande (dia nublado)\nbpy.ops.object.light_add(type='SUN', rotation=(math.radians(45), 0, math.radians(90)))\nsol_difuso = bpy.context.object\nsol_difuso.data.angle = math.radians(15)\nsol_difuso.data.energy = 2.0" },
      { lang: "config", code: "Atmosfera     | Tipo  | Tamanho/Angle\nDeserto sol   | Sun   | Angle 0.5°\nDia nublado   | Sun   | Angle 15-30°\nVela íntima   | Point | Radius 0.01m\nEstúdio       | Area  | Size 1.5-2m\nCozinha LED   | Area  | Size 0.4-0.6m" },
    ],
    points: [
      "**Soft = fonte grande/perto**, **Hard = fonte pequena/longe**.",
      "\`Radius\` (Point/Spot), \`Size\` (Area) e \`Angle\` (Sun) controlam essa suavidade.",
      "Sombras macias custam mais render em Cycles — equilibre qualidade e tempo.",
      "Em Eevee, sombras suaves vêm de \`Soft Shadows\` em \`Render Properties → Shadows\`.",
      "Use \`Render Border\` (\`Ctrl + B\`) para renderizar só a região da sombra e iterar rápido.",
      "Sombras duras passam sensação de calor seco, sol forte, drama; macias passam intimidade e calma.",
    ],
    alerts: [
      { type: "tip", content: "Quer sombras ainda mais macias sem aumentar tanto a luz? **Aproxime** a luz do objeto. Distância importa tanto quanto tamanho." },
      { type: "warning", content: "\`Size\` muito grande em \`Area\` pode fazer o ruído (noise) explodir em Cycles. Aumente as samples ou use \`Denoise\`." },
      { type: "info", content: "Em Eevee Next (Blender 4.2+), as sombras suaves usam um sistema novo chamado \`Virtual Shadow Maps\` — bem mais rápido e bonito." },
    ],
  },
  {
    slug: "color-temperature",
    section: "iluminacao",
    title: "Color Temperature: a temperatura da luz",
    difficulty: "intermediario",
    subtitle: "Quente, neutra ou fria — controle o humor da cena com Kelvin no lugar de RGB.",
    intro: `
A luz no mundo real tem uma **temperatura de cor**, medida em **Kelvin (K)**. Uma vela tem cerca de 1800K (laranja quente). Uma lâmpada incandescente fica em torno de 2700K. A luz do meio-dia ronda 5500K (neutra). O céu azul de um dia nublado pode passar de 8000K (fria). Esse intervalo cobre tudo o que seus olhos enxergam.

No Blender, em vez de adivinhar valores RGB, você pode usar o nó \`Blackbody\` no \`Shader Editor\` ou simplesmente clicar com o botão direito no campo \`Color\` da luz e escolher \`Use Single Color\`. Mas o jeito mais limpo é ligar um nó \`Blackbody\` direto no \`Color\` da luz e digitar a temperatura em Kelvin.

## Mistura de temperaturas
A mágica acontece quando você **mistura** temperaturas diferentes na mesma cena: uma janela fria (6500K) iluminando um quarto, e abajures quentes (2700K) preenchendo as sombras. Essa combinação cria contraste cromático e dá imediatamente sensação de realismo, porque é assim que vivemos no mundo real.

Você verá que dominar temperatura de cor é o que separa renders "ok" de renders "uau". Substitui muita pós-produção.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Selecione uma luz e vá em Object Data Properties\n2. Mude o workspace para 'Shading' (aba no topo)\n3. No Shader Editor, troque para 'World' ou 'Object' conforme o caso\n4. Add → Converter → Blackbody\n5. Ligue o output 'Color' do Blackbody no input 'Color' do Emission/Light\n6. Digite a temperatura em Kelvin (ex: 3200)" },
      { lang: "atalho", code: "Shift + A no Shader Editor → menu Add  |  G → mover nó  |  Ctrl + Shift + clique → preview do nó" },
      { lang: "python", code: "import bpy\n\nlight = bpy.data.lights['Point']\nlight.use_nodes = True\nnt = light.node_tree\nnodes = nt.nodes\nlinks = nt.links\n\nblackbody = nodes.new('ShaderNodeBlackbody')\nblackbody.inputs['Temperature'].default_value = 3200  # Kelvin\n\nemission = nodes['Emission']\nlinks.new(blackbody.outputs['Color'], emission.inputs['Color'])" },
      { lang: "config", code: "Fonte                    | Kelvin\nVela                     | 1800 K\nLâmpada incandescente    | 2700 K\nHalógena                 | 3200 K\nFluorescente warm        | 3500 K\nLuz do dia (meio-dia)    | 5500 K\nFlash de câmera          | 5500 K\nCéu nublado              | 6500 K\nSombra azul / luar       | 8000 K" },
    ],
    points: [
      "**Kelvin baixo = quente (laranja)**, **Kelvin alto = frio (azul)**. Contra-intuitivo mas é assim.",
      "Use o nó \`Blackbody\` para definir cores fisicamente corretas.",
      "Misturar temperaturas diferentes na mesma cena cria realismo instantâneo.",
      "Câmeras reais têm 'White Balance' — no Blender você ajusta na **pós-produção** ou no \`View Transform\`.",
      "Não exagere: variações de 1500K a 7000K já cobrem 95% das cenas realistas.",
      "Animações com mudança de temperatura (dia → noite) podem ser feitas com keyframes no nó \`Blackbody\`.",
    ],
    alerts: [
      { type: "tip", content: "Para cenas indoor noturnas, combine **interior 2700K** + **janela com luar 8000K**. O contraste já entrega a história sozinho." },
      { type: "info", content: "O termo 'temperatura' vem da física: aquece um objeto preto (blackbody) e a luz que ele emite muda de cor conforme a temperatura aumenta." },
    ],
  },
  {
    slug: "light-linking",
    section: "iluminacao",
    title: "Light Linking: luzes seletivas",
    difficulty: "avancado",
    subtitle: "Faça uma luz iluminar (ou ser bloqueada por) apenas objetos específicos.",
    intro: `
Em produções reais, às vezes você quer que uma luz ilumine **somente** certos objetos. Pense num retrato: você adiciona uma luz só para iluminar os olhos do personagem, sem afetar o resto do rosto. Ou quer que uma vela projete sombra só no chão, mas não nas paredes. Esse controle, que antes exigia render layers e composição complicada, hoje é nativo no Blender via **Light Linking**.

Disponível a partir do Blender 4.0 em **Cycles**, o \`Light Linking\` permite ligar uma luz a um conjunto específico de objetos (ou \`Collection\`). Há dois modos: \`Receiver\` (quem recebe a luz) e \`Blocker\` (quem bloqueia/projeta sombra dela).

## Como configurar
Selecione a luz, abra \`Object Properties → Shading → Light Linking\`. Crie uma nova \`Receiver Collection\` e arraste para dentro só os objetos que devem ser iluminados. O resto da cena fica intacto, como se aquela luz não existisse para eles. É um controle artístico poderoso.

Você verá que essa ferramenta abre portas para efeitos quase impossíveis antes: olhos brilhantes sem afetar a pele, halos em personagens específicos, faróis de carro que ignoram pedestres. É um dos recursos mais subutilizados de quem está começando — e um dos preferidos dos profissionais.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Render Engine: Cycles (Light Linking não funciona em Eevee)\n2. Selecione a luz\n3. Object Properties → Shading → Light Linking\n4. Em 'Receiver Collection', clique em 'New'\n5. No Outliner, arraste os objetos desejados para dentro dessa Collection\n6. Renderize: a luz só atinge esses objetos" },
      { lang: "atalho", code: "M → mover objeto para Collection  |  Outliner: arrastar com botão esquerdo" },
      { lang: "python", code: "import bpy\n\nlight = bpy.data.objects['Spot']\nesfera = bpy.data.objects['Sphere']\n\n# Cria collection receptora se não existir\nif not light.light_linking.receiver_collection:\n    coll = bpy.data.collections.new('Receivers_' + light.name)\n    bpy.context.scene.collection.children.link(coll)\n    light.light_linking.receiver_collection = coll\n\nlight.light_linking.receiver_collection.objects.link(esfera)" },
      { lang: "config", code: "Modo       | O que faz\nReceiver   | só objetos da collection recebem essa luz\nBlocker    | só objetos da collection projetam sombra dessa luz\nIncluded   | objeto incluído (default)\nExcluded   | objeto explicitamente excluído" },
    ],
    points: [
      "Disponível em **Cycles** a partir do Blender 4.0 (verifique sua versão).",
      "**Receiver Collection** = quem é iluminado pela luz.",
      "**Blocker Collection** = quem projeta sombra dela.",
      "Útil para isolar reflexos, criar catchlights nos olhos, controlar god rays.",
      "Substitui muito render layer + composição em workflows modernos.",
      "Funciona junto com \`Light Groups\` para ainda mais controle no compositor.",
    ],
    alerts: [
      { type: "info", content: "O \`Light Linking\` é uma feature do **Cycles**. Em Eevee, você precisa usar \`Render Layers\` e composição manual." },
      { type: "tip", content: "Combine com \`Light Groups\` (\`Render Properties → Passes → Light Groups\`) para ter cada luz numa pass separada e ajustar tudo na **composição**." },
      { type: "warning", content: "Esquecer de incluir o **chão** na receiver collection é a armadilha mais comum: a sombra projetada some e você não entende por quê." },
    ],
  },
  {
    slug: "otimizar-luzes-cycles",
    section: "iluminacao",
    title: "Otimizando Luzes no Cycles",
    difficulty: "avancado",
    subtitle: "Renderize cenas iluminadas mais rápido sem perder qualidade visual.",
    intro: `
O Cycles é um renderizador **path-tracer** físico — ele simula raios de luz quicando pelo cenário. Isso significa que cada luz adicional, cada sombra suave, cada material reflexivo aumenta o trabalho computacional. Sem otimização, sua cena bonita pode levar horas para terminar de renderizar. Com as técnicas certas, o mesmo resultado sai em minutos.

As principais alavancas de otimização são: número de \`Samples\`, uso de \`Denoiser\`, \`Light Tree\`, \`Multiple Importance Sampling (MIS)\`, e o tamanho real das fontes de luz. Cada uma dessas configurações tem trade-offs entre velocidade e qualidade que você precisa aprender a balancear.

## A árvore de luzes (Light Tree)
A partir do Blender 3.5, o Cycles tem a opção \`Light Tree\` (\`Render Properties → Sampling → Lights\`). Ela organiza as luzes em uma estrutura hierárquica que permite o renderizador **focar** nas luzes mais importantes para cada pixel. Em cenas com dezenas ou centenas de luzes, isso pode acelerar 5x ou mais.

Outra dica fundamental: ative o \`Denoiser\` (\`OptiX\` se você tem GPU NVIDIA, \`OpenImageDenoise\` caso contrário). Ele transforma uma imagem com pouco samples (e portanto rápida) numa imagem limpa quase instantaneamente. Você verá que esse combo \`Light Tree\` + \`Denoiser\` é o segredo dos artistas que entregam renders bonitos com prazo curto.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Render Properties → Sampling: comece com Max Samples 128\n2. Ative 'Denoise' (OptiX para NVIDIA, OpenImageDenoise universal)\n3. Em 'Lights', ative 'Light Tree'\n4. Reduza tamanho das Area lights se forem muito grandes\n5. Em luzes desnecessárias, desligue 'Cast Shadow' temporariamente\n6. Use 'Render Border' (Ctrl+B) para iterar em pedaços" },
      { lang: "atalho", code: "F12 → render full  |  Ctrl + B → render border  |  Ctrl + Alt + B → limpar border" },
      { lang: "python", code: "import bpy\n\nscene = bpy.context.scene\nscene.render.engine = 'CYCLES'\n\ncycles = scene.cycles\ncycles.samples = 128                # samples finais\ncycles.use_denoising = True         # ativa denoiser\ncycles.denoiser = 'OPTIX'           # ou 'OPENIMAGEDENOISE'\ncycles.use_light_tree = True        # acelera muitas luzes\ncycles.use_adaptive_sampling = True # para de samplear pixels limpos\ncycles.adaptive_threshold = 0.01    # qualidade do adaptive\ncycles.device = 'GPU'               # se tiver placa boa" },
      { lang: "config", code: "Otimização          | Ganho típico   | Custo\nLight Tree          | 2x a 5x        | nenhum visível\nDenoiser OptiX      | 3x a 10x       | leve perda em detalhes finos\nAdaptive Sampling   | 1.5x a 3x      | nenhum\nGPU em vez de CPU   | 5x a 20x       | requer placa boa\nReduzir Area Size   | 1.2x a 2x      | sombras menos suaves" },
    ],
    points: [
      "**Light Tree** acelera muito cenas com várias luzes (3.5+).",
      "**Denoiser** é praticamente obrigatório hoje — não tenha medo de samples baixos.",
      "**Adaptive Sampling** para de calcular pixels que já estão limpos.",
      "Áreas gigantes geram muito noise — equilibre tamanho e samples.",
      "Use \`Light Groups\` para reajustar intensidade no compositor sem re-renderizar.",
      "Para previsualização rápida, configure um segundo \`View Layer\` com samples baixíssimos.",
      "GPU bem dimensionada faz mais diferença que dobrar os samples.",
    ],
    alerts: [
      { type: "success", content: "Ativar \`Light Tree\` + \`Denoiser OptiX\` numa cena com 30 luzes pode reduzir um render de 40 minutos para 4 minutos. Sério." },
      { type: "warning", content: "Cuidado com \`samples\` muito baixos (< 32). O denoiser pode 'inventar' detalhes errados, criando manchas estranhas em superfícies lisas." },
      { type: "danger", content: "Renderizar em CPU com Cycles em laptop fraco pode **superaquecer** a máquina. Use GPU sempre que possível e monitore temperatura." },
    ],
  },
];
