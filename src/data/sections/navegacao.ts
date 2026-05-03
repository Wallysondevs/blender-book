import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "orbitar-pan-zoom",
    section: "navegacao",
    title: "Orbitar, Pan e Zoom: Os Três Movimentos da Câmera",
    difficulty: "iniciante",
    subtitle: "Aprenda a girar, deslocar e aproximar a viewport — a base de tudo no 3D.",
    intro: `
Antes de modelar qualquer coisa, você precisa aprender a **olhar** para sua cena. No Blender, a janela onde aparece o cubo padrão chama-se \`3D Viewport\`, e dentro dela existe uma câmera invisível chamada **viewport camera** (não confunda com a câmera de renderização). Toda a navegação 3D consiste em mover essa câmera invisível em torno da cena, e isso é feito com três operações fundamentais: **orbitar** (girar em torno de um ponto), **fazer pan** (deslocar lateralmente) e **dar zoom** (aproximar ou afastar).

Essas três operações são tão essenciais que você as fará milhares de vezes por dia. Por isso, o Blender as mapeia no botão do meio do mouse (\`MMB\`) — apertar e arrastar orbita; segurar \`Shift\` e arrastar faz pan; girar a roda dá zoom. Em programas como Maya o padrão usa \`Alt\`, e no ZBrush você arrasta no fundo da tela; o Blender escolheu o \`MMB\` justamente para deixar a mão esquerda livre para atalhos de teclado.

## O ponto de pivô da órbita
Quando você orbita, está girando em torno de um ponto invisível chamado **point of interest**. Por padrão, esse ponto fica no centro da cena (origem 0,0,0), e isso pode te confundir quando você se afasta de lá: a câmera passa a girar "longe demais". Pressione \`Numpad .\` (ponto) para centralizar a órbita no objeto selecionado, ou ative \`Auto Depth\` em \`Preferences > Navigation\` para que o pivô siga o cursor.

Quem domina pan, zoom e orbit nas primeiras horas economiza semanas de frustração. Vamos firmar esses três gestos antes de qualquer outra coisa.
    `,
    codes: [
      {
        lang: "atalho",
        code: "MMB (arrastar)        → Orbitar\nShift + MMB (arrastar) → Pan (deslocar)\nCtrl + MMB (arrastar)  → Zoom contínuo\nScroll Wheel           → Zoom em passos\nNumpad .               → Centrar órbita no selecionado\nHome                   → Enquadrar a cena inteira",
      },
      {
        lang: "passo-a-passo",
        code: "1. Abra o Blender — você verá o cubo padrão na 3D Viewport.\n2. Segure o botão do meio do mouse e arraste para orbitar ao redor do cubo.\n3. Solte, segure Shift + MMB e arraste — a cena desliza no plano da tela (pan).\n4. Gire a rodinha do mouse para frente: você se aproxima do cubo (zoom in).\n5. Selecione o cubo com clique esquerdo e pressione Numpad . para centralizar a órbita nele.",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Enquadrar todos os objetos visíveis na viewport ativa\nfor area in bpy.context.screen.areas:\n    if area.type == 'VIEW_3D':\n        with bpy.context.temp_override(area=area):\n            bpy.ops.view3d.view_all(center=False)\n        break",
      },
      {
        lang: "config",
        code: "# Edit > Preferences > Navigation\nOrbit Method: Turntable        # mantém o eixo Z para cima (recomendado)\nZoom To Mouse Position: ON     # zoom converge no cursor, não no centro\nAuto Depth: ON                 # pivô segue o que está sob o cursor",
      },
    ],
    points: [
      "**Orbitar**: \`MMB + arrastar\` — gira a câmera em torno do point of interest.",
      "**Pan**: \`Shift + MMB\` — desliza horizontal/vertical sem girar.",
      "**Zoom**: \`scroll\` ou \`Ctrl + MMB\` — aproxima/afasta a câmera invisível.",
      "Use \`Numpad .\` para reposicionar o pivô no objeto selecionado — resolve 90% das frustrações iniciais.",
      "\`Home\` enquadra a cena inteira; \`Numpad Home\` no Edit Mode enquadra a malha.",
      "Ative **Zoom To Mouse Position** nas preferências para um zoom muito mais natural.",
      "Armadilha comum: orbitar longe da origem dá a sensação de que a câmera 'patina' — é o pivô fixo no centro do mundo.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Se você não tem botão do meio, vá em \`Preferences > Input\` e ative **Emulate 3 Button Mouse**: \`Alt + clique esquerdo\` passará a orbitar.",
      },
      {
        type: "warning",
        content: "Não confunda a **viewport camera** (sua visão de trabalho) com a **câmera da cena** (objeto \`Camera\` que renderiza). São coisas totalmente diferentes.",
      },
      {
        type: "info",
        content: "No notebook sem mouse, use \`Numpad 4/6\` (orbitar lateral), \`Numpad 8/2\` (orbitar vertical) e \`Numpad +/-\` (zoom).",
      },
    ],
  },
  {
    slug: "numpad-views",
    section: "navegacao",
    title: "Numpad Views: As Vistas Ortográficas Essenciais",
    difficulty: "iniciante",
    subtitle: "Domine front, side, top e perspective — o vocabulário visual de todo modelador 3D.",
    intro: `
Todo modelador 3D — seja no Blender, no Maya ou no SolidWorks — trabalha alternando entre **vistas ortográficas canônicas**: frente, lado, topo e perspectiva. Essas vistas existem porque modelar com precisão na perspectiva é praticamente impossível: a deformação cônica engana o olho, e você acaba colocando vértices fora do lugar. As vistas ortográficas eliminam a perspectiva, mostrando as coisas em projeção paralela — exatamente como nas pranchas técnicas de engenharia.

No Blender, essas vistas estão mapeadas no **teclado numérico** (Numpad), o bloco de números à direita. Cada tecla é uma vista: \`Numpad 1\` mostra a frente, \`Numpad 3\` mostra o lado direito, \`Numpad 7\` mostra o topo, e \`Numpad 5\` alterna entre **perspectiva** e **ortográfica**. Pressionar \`Ctrl\` antes inverte: \`Ctrl + Numpad 1\` mostra a parte de trás, \`Ctrl + Numpad 3\` o lado esquerdo, e assim por diante.

## Por que isso importa tanto
Quando você está modelando um personagem, precisa olhar pela frente para ajustar simetria, pelo lado para ajustar profundidade, e pelo topo para conferir proporção dos ombros. Modeladores experientes pressionam \`Numpad 1\`, \`3\`, \`7\` dezenas de vezes por minuto, sem olhar para o teclado. É um hábito que vale ouro.

## E se eu não tenho Numpad?
Notebooks frequentemente vêm sem teclado numérico. Vá em \`Edit > Preferences > Input\` e ative **Emulate Numpad** — assim os números da fileira de cima passam a fazer o mesmo papel. Existe também o menu \`View > Viewpoint\` para acessar tudo pelo mouse.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Numpad 1   → Front (Y-)\nCtrl+Num 1 → Back  (Y+)\nNumpad 3   → Right (X+)\nCtrl+Num 3 → Left  (X-)\nNumpad 7   → Top   (Z+)\nCtrl+Num 7 → Bottom (Z-)\nNumpad 5   → Toggle Perspective/Orthographic\nNumpad 0   → View through active Camera",
      },
      {
        lang: "passo-a-passo",
        code: "1. Selecione o cubo padrão.\n2. Pressione Numpad 1 — você verá o cubo de frente, em projeção ortográfica.\n3. Pressione Numpad 3 — vista lateral direita.\n4. Pressione Numpad 7 — vista de cima (planta).\n5. Pressione Numpad 0 — agora você olha pela câmera de renderização.\n6. Pressione Numpad 5 para alternar entre perspectiva e orto e sentir a diferença.",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Forçar a viewport ativa para vista frontal ortográfica\nfor area in bpy.context.screen.areas:\n    if area.type == 'VIEW_3D':\n        with bpy.context.temp_override(area=area):\n            bpy.ops.view3d.view_axis(type='FRONT')\n            # garantir orthographic\n            area.spaces.active.region_3d.view_perspective = 'ORTHO'\n        break",
      },
      {
        lang: "config",
        code: "# Edit > Preferences > Input\nEmulate Numpad: ON   # 1,2,3... da fileira superior viram numpad\n# Útil em notebooks; desativa o uso desses números para selecionar layers",
      },
    ],
    points: [
      "**Vista ortográfica**: projeção sem perspectiva, ideal para modelar com precisão.",
      "**Vista em perspectiva**: simula o olho humano, ideal para julgar composição e renderização.",
      "\`Numpad 1/3/7\` = front/right/top; segurar \`Ctrl\` inverte para back/left/bottom.",
      "\`Numpad 5\` alterna perspectiva ↔ ortográfica — memorize, é o atalho mais usado depois de salvar.",
      "\`Numpad 0\` te coloca olhando **pela câmera da cena**, útil para enquadrar a renderização.",
      "Em notebook, ative **Emulate Numpad** ou use \`~\` (til) para abrir o pie menu de vistas.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Pressione \`~\` (til, acima do Tab) para abrir o **pie menu de vistas** — ótimo quando o numpad está longe.",
      },
      {
        type: "info",
        content: "O canto superior esquerdo da viewport mostra o nome da vista atual (\`Front Orthographic\`, etc). Confira sempre antes de modelar.",
      },
      {
        type: "warning",
        content: "Modelar em perspectiva induz a erros de profundidade. Para precisão milimétrica, **sempre alterne para orto** com \`Numpad 5\`.",
      },
    ],
  },
  {
    slug: "camera-walk-fly",
    section: "navegacao",
    title: "Walk e Fly Mode: Navegação em Primeira Pessoa",
    difficulty: "iniciante",
    subtitle: "Caminhe ou voe pela cena como em um jogo FPS — perfeito para arquitetura e ambientes grandes.",
    intro: `
Orbitar é ótimo para examinar um objeto pequeno, mas quando você está montando um cenário grande — uma sala, um castelo, uma rua inteira — a navegação orbital fica desconfortável. Para esses casos, o Blender oferece dois modos de navegação em primeira pessoa: **Walk Mode** e **Fly Mode**. Eles transformam temporariamente sua viewport num jogo de FPS: você anda com \`WASD\`, olha com o mouse e ainda pode pular ou aplicar gravidade.

O **Walk Mode** simula uma pessoa caminhando: existe gravidade, sua "altura dos olhos" se mantém, e você pode pular pressionando \`V\`. É o modo predileto de quem trabalha com **arquitetura** ou **ambientes interativos**, porque já te dá uma sensação real de escala. O **Fly Mode**, por outro lado, é livre: você voa em qualquer direção, ideal para reposicionar uma câmera de renderização ou explorar uma cena gigante.

## Como entrar e sair
O atalho padrão para entrar em Walk Mode é \`Shift + ~\` (til). Você verá uma cruz no centro da tela e a barra de status muda. Movimente o mouse para olhar, use \`WASD\` para caminhar, \`Q/E\` (ou \`Space\`) para subir/descer livre, \`Shift\` para correr e \`Tab\` para alternar entre Walk e Fly. Confirme a posição final com **clique esquerdo** ou \`Enter\`; cancele com **clique direito** ou \`Esc\`.

Você verá que esses modos parecem brincadeira no começo, mas são ferramentas profissionais sérias — especialmente se você posiciona câmeras de cena.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Shift + ~  → Entrar em Walk/Fly Mode\nW A S D    → Andar frente/esquerda/trás/direita\nQ / E      → Subir / descer\nShift      → Correr (acelerar)\nV          → Pular (Walk Mode)\nTab        → Alternar Walk ↔ Fly\nLMB / Enter→ Confirmar posição\nRMB / Esc  → Cancelar e voltar",
      },
      {
        lang: "passo-a-passo",
        code: "1. Numa cena com algum objeto, pressione Shift + ~ — surge a cruz no centro.\n2. Mova o mouse para olhar ao redor (sem clicar).\n3. Pressione W para andar para frente; A/D para os lados; S para trás.\n4. Segure Shift enquanto anda para correr.\n5. Pressione Tab para alternar para Fly — agora você flutua livremente.\n6. Clique com o botão esquerdo para confirmar a posição final da viewport.",
      },
      {
        lang: "config",
        code: "# Edit > Preferences > Navigation > Fly & Walk\nMouse Sensitivity: 0.5     # quanto menor, mais devagar a câmera vira\nWalk Speed: 1.6 m/s        # velocidade de caminhada padrão\nGravity: ON                # ativa queda livre no Walk Mode\nView Height: 1.6 m         # altura dos olhos (humano médio)\nJump Height: 0.4 m         # quão alto V pula",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Disparar Walk Mode na viewport ativa via script\nfor area in bpy.context.screen.areas:\n    if area.type == 'VIEW_3D':\n        with bpy.context.temp_override(area=area):\n            bpy.ops.view3d.walk('INVOKE_DEFAULT')\n        break",
      },
    ],
    points: [
      "**Walk Mode**: navegação tipo FPS com gravidade — perfeito para escala humana.",
      "**Fly Mode**: navegação livre em 6 graus de liberdade — perfeito para câmeras aéreas.",
      "\`Shift + ~\` entra; \`Tab\` alterna entre Walk e Fly; \`LMB\` confirma; \`Esc\` cancela.",
      "\`Shift\` acelera o movimento (correr) e funciona como modificador universal.",
      "Use Walk Mode em projetos de **arquitetura** para sentir se um corredor está apertado demais.",
      "Ajuste **Mouse Sensitivity** nas preferências se a câmera virar rápido demais.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Antes de entrar no Walk Mode, **selecione a câmera da cena** e pressione \`Ctrl + Numpad 0\`. Assim, ao confirmar com \`LMB\`, a câmera de renderização adota a nova posição.",
      },
      {
        type: "warning",
        content: "Se você cancelar com \`Esc\`, **toda a navegação é descartada**. Use \`LMB\` ou \`Enter\` para preservar a posição.",
      },
      {
        type: "info",
        content: "No Fly Mode, \`scroll\` do mouse acelera/desacelera a velocidade base — ótimo para explorar cenas enormes.",
      },
    ],
  },
  {
    slug: "perspectiva-ortho",
    section: "navegacao",
    title: "Perspectiva vs Ortográfica: Quando Usar Cada Uma",
    difficulty: "iniciante",
    subtitle: "Entenda a diferença visual e prática entre as duas projeções da câmera.",
    intro: `
Toda câmera 3D — virtual ou real — projeta o mundo em um plano 2D (sua tela). Existem duas maneiras matemáticas de fazer essa projeção: **perspectiva** e **ortográfica**. A diferença parece sutil, mas muda completamente a forma como você modela.

Na **projeção em perspectiva**, objetos distantes parecem menores, e linhas paralelas convergem para pontos de fuga. É exatamente como o olho humano vê o mundo: trilhos de trem se encontram no horizonte, prédios "se inclinam" para trás. Já na **projeção ortográfica**, não existe distância no sentido visual: dois cubos do mesmo tamanho parecem iguais, mesmo que um esteja a 2 metros e o outro a 200. Linhas paralelas continuam paralelas para sempre.

## Quando cada uma brilha
A **perspectiva** é insubstituível para julgar composição, iluminação, drama visual e enquadramento de câmera de renderização. Mas é péssima para modelagem precisa: você não consegue alinhar dois vértices "no olho" em perspectiva — eles parecem alinhados, mas não estão.

A **ortográfica** é insubstituível para modelar com precisão, conferir simetria e seguir blueprints. Quase todo modelador profissional passa **80% do tempo** em vista ortográfica e só vai para perspectiva no final, para ajustar a renderização.

## Como alternar
\`Numpad 5\` alterna entre as duas a qualquer momento. O canto superior esquerdo da viewport te diz qual está ativa: \`User Perspective\`, \`Front Orthographic\`, etc. Memorize esse atalho — é o mais usado depois das vistas numpad.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Numpad 5      → Toggle Perspective ↔ Orthographic\nNumpad 1/3/7  → Vistas frontais (entram em ortho automaticamente)\nMMB drag      → Em perspectiva: orbita; em orto: ainda orbita mas sem deformação\nN (sidebar)   → Painel View > Lens / Clip Start / End",
      },
      {
        lang: "passo-a-passo",
        code: "1. Na viewport, pressione Numpad 1 — vista frontal, ortográfica.\n2. Pressione Numpad 5 — agora frontal em perspectiva; note a leve deformação.\n3. Crie dois cubos: um pequeno (S 0.5) e outro grande (S 2).\n4. Afaste o cubo pequeno bem para o fundo (G Y 5).\n5. Em perspectiva, o pequeno parece minúsculo; em ortográfica, ele continua exatamente do mesmo tamanho na tela.",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Forçar perspectiva na viewport ativa\narea = next(a for a in bpy.context.screen.areas if a.type == 'VIEW_3D')\nrv3d = area.spaces.active.region_3d\nrv3d.view_perspective = 'PERSP'   # ou 'ORTHO' ou 'CAMERA'\n\n# Ajustar a 'lente' da viewport perspectiva (em mm)\narea.spaces.active.lens = 50      # 50mm = lente 'natural', sem distorção",
      },
      {
        lang: "config",
        code: "# Painel N (lateral) > View > View\nFocal Length: 50 mm     # padrão; aumente para 'achatar' (telefoto)\nClip Start: 0.1         # nada renderiza antes desta distância\nClip End: 1000          # nem depois desta\nLock Camera to View: OFF",
      },
    ],
    points: [
      "**Perspectiva**: simula o olho humano; objetos distantes encolhem; linhas paralelas convergem.",
      "**Ortográfica**: projeção paralela; tamanho na tela independe da distância; ideal para precisão.",
      "Use **ortográfica** para modelar, alinhar e seguir blueprints; use **perspectiva** para julgar render.",
      "\`Numpad 5\` alterna entre as duas — atalho essencial.",
      "O canto superior esquerdo da viewport sempre indica qual projeção está ativa.",
      "Modelar em perspectiva pode esconder vértices desalinhados — sempre confira em ortográfica.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para conferir simetria, vá para \`Numpad 1\` (frontal ortográfica) e pressione \`Z\` para alternar para wireframe — qualquer assimetria salta aos olhos.",
      },
      {
        type: "info",
        content: "Em vista de câmera (\`Numpad 0\`), a projeção é definida pela própria câmera, **não** pelo \`Numpad 5\`. Mude no painel da câmera (\`Object Data > Lens > Type\`).",
      },
    ],
  },
  {
    slug: "gizmos-visuais",
    section: "navegacao",
    title: "Gizmos Visuais: Os Controles Coloridos da Viewport",
    difficulty: "iniciante",
    subtitle: "Aprenda a usar (ou desligar) os widgets de transformação e navegação.",
    intro: `
Quando você abre o Blender, vê pequenos elementos coloridos no canto superior direito da viewport: setas, um cubo de eixos, uma lupa, um ícone de câmera. Esses elementos são chamados de **gizmos** ou **widgets**. Eles são controles gráficos que permitem fazer operações navegacionais e transformações **com o mouse**, sem decorar atalhos.

Os gizmos são especialmente úteis para iniciantes que ainda não memorizaram \`G\`/\`R\`/\`S\` (mover, girar, escalar). Mas usuários experientes geralmente os desligam, pois preferem o teclado — o gizmo ocupa pixels valiosos da viewport. O Blender te dá controle total: você decide quais gizmos aparecem.

## Os principais gizmos
O **Navigation Gizmo** (canto superior direito) tem o mini-cubo dos eixos (clique em qualquer face para alinhar a vista), uma lupinha para zoom, uma mãozinha para pan e uma câmera para ir à vista de câmera. Os **Object Gizmos** (no objeto selecionado) são as setas/arcos coloridos para mover, girar ou escalar — vermelho = X, verde = Y, azul = Z (a mesma convenção universal do 3D).

## Onde controlar
No cabeçalho da viewport existe um pequeno ícone parecido com dois círculos sobrepostos (\`Show Gizmo\`); clicando nele abre um dropdown com checkboxes para cada gizmo. Você verá que separar **Navigate**, **Active Tools** e **Object Gizmos** ajuda muito a manter a viewport limpa para tarefas específicas.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. No cabeçalho da 3D Viewport, encontre o ícone 'Show Gizmo' (parece dois círculos).\n2. Clique nele para abrir o painel de opções.\n3. Desmarque 'Navigate' para esconder o widget de navegação no canto.\n4. Desmarque 'Move/Rotate/Scale' em Object Gizmos para esconder as setas coloridas.\n5. Clique no mini-cubo de eixos (canto sup. dir.) e arraste para orbitar; clique numa face para snap na vista.",
      },
      {
        lang: "atalho",
        code: "Ctrl + ` (crase)  → Toggle gizmos (mostra/esconde tudo)\nClique no eixo X (vermelho) → travar mover/girar/escalar no eixo X\nShift + clique eixo → travar nos outros dois eixos (plano)\nClique no centro do gizmo → mover livre no plano da tela",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Esconder/mostrar gizmos da viewport ativa\nspace = next(a.spaces.active for a in bpy.context.screen.areas if a.type == 'VIEW_3D')\nspace.show_gizmo = True              # master switch\nspace.show_gizmo_navigate = False    # esconde widget de navegação\nspace.show_gizmo_object_translate = True\nspace.show_gizmo_object_rotate = False\nspace.show_gizmo_object_scale = False",
      },
      {
        lang: "config",
        code: "# Header da Viewport > Show Gizmo (dropdown)\nNavigate: OFF                 # libera espaço no canto sup. dir.\nActive Tools: ON              # gizmo da ferramenta atual da Toolbar\nObject Gizmos > Move: ON      # setinhas RGB ao redor do objeto\nObject Gizmos > Rotate: OFF\nObject Gizmos > Scale: OFF",
      },
    ],
    points: [
      "**Gizmo**: widget visual que substitui (ou complementa) atalhos de teclado.",
      "**Navigation Gizmo**: cubo de eixos + lupa + pan + câmera, no canto superior direito.",
      "**Object Gizmos**: setas RGB para mover, arcos para girar, cubinhos para escalar.",
      "Convenção universal: **vermelho = X, verde = Y, azul = Z**.",
      "\`Ctrl + \\\`\` (crase) liga/desliga todos os gizmos de uma vez.",
      "Iniciantes ganham com gizmos visíveis; veteranos ganham desligando para liberar espaço.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Clique numa **face do mini-cubo** de eixos para ir direto à vista frontal/lateral/topo, equivalente ao \`Numpad 1/3/7\` mas com mouse.",
      },
      {
        type: "info",
        content: "O gizmo da ferramenta ativa muda conforme você seleciona algo na **Toolbar** (\`T\`). Ao escolher 'Rotate', surge a esfera com arcos.",
      },
    ],
  },
  {
    slug: "shading-modes",
    section: "navegacao",
    title: "Shading Modes: Wireframe, Solid, Material e Rendered",
    difficulty: "iniciante",
    subtitle: "Os quatro modos de visualização da viewport e quando usar cada um.",
    intro: `
A viewport pode mostrar sua cena de quatro maneiras diferentes, chamadas **shading modes**. Cada modo prioriza algo diferente: estrutura, forma, material ou renderização final. Os botões ficam no canto superior direito do header da viewport, como quatro esferinhas. O atalho \`Z\` abre um pie menu para alternar rapidamente.

## Wireframe
**Wireframe** mostra apenas as **arestas** (\`edges\`) da malha — sem faces. É como ver o esqueleto da geometria. Ideal para entender topologia, selecionar coisas escondidas, ou trabalhar em malhas muito densas onde as faces atrapalham.

## Solid
**Solid** é o padrão. Mostra as faces preenchidas com uma cor base (cinza por padrão), iluminadas por uma luz fictícia da viewport chamada **MatCap** ou **Studio light**. Não usa os materiais reais nem a iluminação da cena — é leve, rápido e perfeito para modelar.

## Material Preview
**Material Preview** usa os materiais reais que você criou no \`Shader Editor\` (cores, texturas, metalicidade), iluminados por uma **HDRI** padrão (um mapa de iluminação esférico). Não usa as luzes da cena. Ótimo para ajustar materiais sem esperar render.

## Rendered
**Rendered** mostra a cena exatamente como o motor de render (Eevee ou Cycles) vai produzir: materiais reais + luzes reais + sombras + reflexos. É o mais pesado; use só quando for julgar o resultado final.

Você verá que alternar entre esses modos durante o trabalho é tão natural quanto trocar de óculos: cada um te dá uma "lente" diferente sobre a mesma cena.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Z              → Pie menu de shading modes\nShift + Z      → Toggle Rendered ↔ Solid (rápido)\nZ depois 1     → Wireframe\nZ depois 2     → Solid\nZ depois 3     → Material Preview\nZ depois 4     → Rendered\nAlt + Z        → Toggle X-Ray (transparência geral)",
      },
      {
        lang: "passo-a-passo",
        code: "1. Pressione Z — surge o pie menu com 4 opções ao redor do cursor.\n2. Mova o mouse para a opção desejada e solte (ou aperte 1/2/3/4).\n3. Em Material Preview, clique no globo no header para escolher um HDRI diferente.\n4. Em Rendered com Eevee, ative 'Screen Space Reflections' no painel Render Properties para ver reflexos.\n5. Use Alt + Z para ativar X-Ray e selecionar geometria escondida.",
      },
      {
        lang: "python",
        code: "import bpy\n\nspace = next(a.spaces.active for a in bpy.context.screen.areas if a.type == 'VIEW_3D')\n\n# Trocar shading mode da viewport ativa\nspace.shading.type = 'SOLID'      # 'WIREFRAME' | 'SOLID' | 'MATERIAL' | 'RENDERED'\n\n# Em modo Solid, escolher MatCap em vez de Studio light\nspace.shading.light = 'MATCAP'\nspace.shading.studio_light = 'basic_1.exr'",
      },
      {
        lang: "config",
        code: "# Dropdown ao lado dos botões de shading (seta para baixo)\nLighting: Studio | MatCap | Flat\nColor: Material | Object | Random | Vertex | Texture | Single\nBackground: Theme | World | Viewport\nCavity: ON   # realça reentrâncias (ótimo p/ esculpir)\nShadow: ON   # contato com o chão",
      },
    ],
    points: [
      "**Wireframe (Z→1)**: só arestas; ideal para topologia e seleção através da malha.",
      "**Solid (Z→2)**: padrão; faces simples; rápido e perfeito para modelar.",
      "**Material Preview (Z→3)**: materiais reais com HDRI; ótimo para shading sem render.",
      "**Rendered (Z→4)**: motor real (Eevee/Cycles); pesado; use no final.",
      "\`Alt + Z\` ativa **X-Ray**: tudo fica semitransparente — útil para selecionar atrás.",
      "\`Shift + Z\` alterna direto entre Solid e Rendered, atalho profissional.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Modele em **Solid** com **Cavity** ligado: as reentrâncias da malha ficam escuras e você enxerga muito melhor o volume.",
      },
      {
        type: "warning",
        content: "**Rendered** com Cycles trava placas de vídeo fracas. Use Eevee para preview em tempo real e Cycles só para a renderização final.",
      },
      {
        type: "info",
        content: "Material Preview usa HDRIs internos do Blender; você não precisa criar um World inteiro só para ver materiais.",
      },
    ],
  },
  {
    slug: "overlays-viewport",
    section: "navegacao",
    title: "Overlays da Viewport: Grade, Eixos, Estatísticas e Mais",
    difficulty: "iniciante",
    subtitle: "Controle todos os elementos auxiliares desenhados sobre sua cena.",
    intro: `
Além da geometria em si, a viewport desenha vários elementos **auxiliares** sobre a cena: a grade do chão (\`grid\`), os eixos coloridos, o cursor 3D, o nome dos objetos, normais de faces, estatísticas... Tudo isso são **overlays** — sobreposições visuais que não fazem parte da renderização final, mas existem para te ajudar a trabalhar.

O Blender tem um botão dedicado no header da viewport para isso: dois círculos sobrepostos com uma seta para baixo (logo à esquerda dos shading modes). Ali você liga e desliga cada overlay individualmente. Existe também o botão master \`Show Overlays\` que apaga **todos** de uma vez — útil para tirar screenshots limpos da viewport.

## Overlays mais úteis
- **Grid Floor**: a grade do chão; pode causar moiré em prints.
- **Axes (X/Y/Z)**: as linhas vermelha/verde/azul cruzando a origem.
- **Floor**: a "borda" do chão.
- **3D Cursor**: a miradinha vermelha-e-branca onde novos objetos nascem.
- **Origins**: o ponto laranja em cada objeto.
- **Wireframes**: contorno das malhas em Object Mode.
- **Statistics**: contagem de vértices, faces, triângulos no canto.
- **Face Orientation**: pinta faces voltadas pra fora de azul e invertidas de vermelho — essencial para detectar normals invertidas.

Você vai descobrir que cada projeto pede uma combinação diferente de overlays. Modelar pede grid + origin; esculpir pede tudo desligado; arquitetura pede grid grande e measurements ligados.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Alt + Shift + Z  → Toggle Show Overlays (master switch)\nN                → Painel lateral (View > Overlays no Edit Mode)\nShift + S        → Snap menu (relacionado ao 3D Cursor)\nShift + RMB      → Posicionar 3D Cursor onde clicou",
      },
      {
        lang: "passo-a-passo",
        code: "1. No header da viewport, clique no botão 'Overlays' (dois círculos com seta).\n2. Desmarque 'Floor' e 'Axes' — a grade some.\n3. Marque 'Statistics' — surge no canto superior esquerdo a contagem de vértices/faces.\n4. No Edit Mode, abra o mesmo dropdown e ative 'Face Orientation'.\n5. Faces vermelhas indicam normals invertidas; selecione e pressione Shift + N para recalcular.",
      },
      {
        lang: "python",
        code: "import bpy\n\nspace = next(a.spaces.active for a in bpy.context.screen.areas if a.type == 'VIEW_3D')\novl = space.overlay\n\novl.show_overlays = True       # master switch\novl.show_floor = False         # esconder grade\novl.show_axis_x = True\novl.show_axis_y = True\novl.show_axis_z = False        # esconder linha azul\novl.show_stats = True          # mostrar estatísticas\novl.show_face_orientation = True",
      },
      {
        lang: "config",
        code: "# Header > Overlays (dropdown)\nGuides:\n  Grid: ON, Scale 1.0, Subdivisions 10\n  Floor: ON\n  Axes X/Y: ON, Z: OFF\n  3D Cursor: ON\nObjects:\n  Origins: ON, Origins (All): OFF\n  Relationship Lines: OFF   # esconde tracejados de parent\n  Outline Selected: ON",
      },
    ],
    points: [
      "**Overlays**: tudo que aparece na viewport mas não vai pra renderização (grid, eixos, cursor).",
      "Botão **Show Overlays** no header desliga todos de uma vez (\`Alt + Shift + Z\`).",
      "**Statistics** mostra contagem de vértices/faces — fundamental para otimizar performance.",
      "**Face Orientation** revela normals invertidas pintando faces problemáticas de vermelho.",
      "**3D Cursor** é onde novos objetos nascem; \`Shift + S\` abre o menu de snap dele.",
      "Cada modo (Object/Edit/Sculpt) tem seu conjunto de overlays — explore as preferências de cada um.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Antes de tirar um print da viewport para mostrar a alguém, pressione \`Alt + Shift + Z\` para desligar overlays e \`N\` para fechar o painel lateral.",
      },
      {
        type: "info",
        content: "O **3D Cursor** parece bobo, mas é poderosíssimo: serve como ponto de pivô temporário, origem de novos objetos e referência de snap.",
      },
      {
        type: "warning",
        content: "Se você não vê **vértices** no Edit Mode mesmo selecionando, confira se o overlay 'Vertices' está ligado no dropdown.",
      },
    ],
  },
  {
    slug: "foco-objeto",
    section: "navegacao",
    title: "Foco no Objeto: Numpad . e Frame Selected",
    difficulty: "iniciante",
    subtitle: "Centralize a câmera no que importa — o atalho que muda sua vida.",
    intro: `
Um dos maiores motivos de frustração para iniciantes é a sensação de "perder" um objeto na viewport. Você importou um modelo, mas ele aparece minúsculo no canto, ou tão grande que enche toda a tela, ou simplesmente fora do enquadramento. A solução é **focar a viewport no objeto selecionado**, e o Blender oferece dois atalhos essenciais para isso: **Numpad .** (Frame Selected) e **Numpad Home** (Frame All).

\`Numpad .\` (a tecla do ponto/decimal no teclado numérico) faz duas coisas ao mesmo tempo: aproxima o zoom até o objeto selecionado preencher confortavelmente a viewport, **e** reposiciona o ponto de pivô da órbita exatamente no centro desse objeto. Isso resolve a queixa mais comum de quem está aprendendo: "minha câmera gira longe do que estou modelando".

## Frame All vs Frame Selected
\`Numpad Home\` (ou só \`Home\`) faz o **Frame All**: enquadra **todos** os objetos visíveis na cena. Útil quando você se perdeu e quer voltar para uma visão geral. Já \`Numpad /\` ativa o **Local View**: isola visualmente o selecionado, escondendo todo o resto. Pressione \`Numpad /\` de novo para voltar.

## Frame Selected no Edit Mode
No \`Edit Mode\`, \`Numpad .\` enquadra apenas os **vértices/arestas/faces selecionados** — não a malha inteira. Isso é maravilhoso para trabalhar em detalhes específicos, como ajustar a curvatura de uma orelha num personagem ou um parafuso num modelo industrial.

Memorize esses três atalhos hoje: \`Numpad .\`, \`Numpad Home\`, \`Numpad /\`. Eles vão acompanhar você em todos os projetos.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Numpad .       → Frame Selected (foca no selecionado e move pivô)\nNumpad Home    → Frame All (enquadra tudo na cena)\nNumpad /       → Toggle Local View (isola selecionado)\nShift + C      → Centraliza o cursor 3D na origem e enquadra cena\nNumpad *       → Alinha a vista ao normal da face selecionada",
      },
      {
        lang: "passo-a-passo",
        code: "1. Selecione qualquer objeto da cena (clique esquerdo).\n2. Pressione Numpad . — a viewport faz zoom suave até centralizar nele.\n3. Agora orbite com MMB; note que a câmera gira ao redor desse objeto.\n4. Pressione Numpad / para entrar em Local View — só ele aparece.\n5. Pressione Numpad / de novo para voltar à cena completa.\n6. Pressione Numpad Home para ver todos os objetos.",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Focar a viewport ativa no objeto selecionado\nfor area in bpy.context.screen.areas:\n    if area.type == 'VIEW_3D':\n        with bpy.context.temp_override(area=area):\n            bpy.ops.view3d.view_selected(use_all_regions=False)\n        break\n\n# Frame All\n# bpy.ops.view3d.view_all()\n# Local View toggle\n# bpy.ops.view3d.localview()",
      },
      {
        lang: "config",
        code: "# Edit > Preferences > Navigation\nAuto Depth: ON         # pivô segue o que está sob o cursor\nZoom To Mouse Position: ON\nRotate Around Selection: ON   # ALTERNATIVA: orbita sempre em torno do selecionado",
      },
    ],
    points: [
      "**Numpad .** (Frame Selected): zoom + recentralização de pivô no selecionado.",
      "**Numpad Home** (Frame All): enquadra todos os objetos visíveis.",
      "**Numpad /** (Local View): isola visualmente o selecionado para trabalhar focado.",
      "No **Edit Mode**, \`Numpad .\` enquadra os vértices/faces selecionados, não a malha inteira.",
      "Ative **Rotate Around Selection** nas preferências para que a órbita siga o selecionado o tempo todo.",
      "\`Shift + C\` reseta o cursor 3D na origem e ainda enquadra a cena — combo de 'reset visual'.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Pegou um arquivo \`.blend\` de outra pessoa e não vê nada? Pressione \`A\` (selecionar tudo) e depois \`Numpad .\` — você acha o conteúdo na hora.",
      },
      {
        type: "success",
        content: "Local View (\`Numpad /\`) é **subestimadíssimo**. Em cenas complexas, isolar só o que você está editando acelera tudo.",
      },
      {
        type: "info",
        content: "\`Numpad *\` alinha a vista perpendicular à **normal** da face selecionada — útil para modelar detalhes em superfícies inclinadas.",
      },
    ],
  },
  {
    slug: "viewport-clipping",
    section: "navegacao",
    title: "Viewport Clipping: Quando Objetos Somem ao Aproximar",
    difficulty: "intermediario",
    subtitle: "Entenda Clip Start e Clip End — e por que sua malha 'desaparece' às vezes.",
    intro: `
Já passou por isso? Você está modelando, dá zoom para examinar um detalhe, e parte da malha **desaparece** — fica cortada como se tivesse sumido pela frente. Ou então cria uma cena gigante (um terreno enorme, uma cidade) e os objetos distantes simplesmente somem. Isso não é um bug: é o **viewport clipping** entrando em ação.

Toda câmera 3D — virtual ou real — só "vê" objetos dentro de uma faixa de distância chamada **clipping range**, definida por dois valores: \`Clip Start\` (a distância mínima) e \`Clip End\` (a máxima). Qualquer coisa mais perto que \`Clip Start\` ou mais longe que \`Clip End\` é simplesmente descartada do desenho. Isso existe por motivos matemáticos: o renderizador precisa de um intervalo finito para calcular profundidade com precisão (o famoso **z-buffer**).

## Os valores padrão
Por padrão, o Blender usa \`Clip Start = 0.1 m\` e \`Clip End = 1000 m\`. Para a maioria das cenas isso é ótimo, mas você terá problemas em dois casos:

1. **Cenas muito pequenas** (joalheria, miniatura): ao aproximar o zoom, a câmera fica a menos de 0.1m e a malha some pela frente. Solução: reduzir \`Clip Start\` para \`0.001\`.
2. **Cenas muito grandes** (cidade, paisagem): objetos a mais de 1000m somem. Solução: aumentar \`Clip End\` para \`10000\` ou mais.

## Onde mexer
Pressione \`N\` para abrir o painel lateral, vá na aba **View**, e ajuste \`Clip Start\` e \`Clip End\`. Cada viewport tem sua própria configuração — não esqueça de ajustar a câmera de renderização separadamente, no \`Object Data Properties\` da câmera.
    `,
    codes: [
      {
        lang: "atalho",
        code: "N           → Abre painel lateral\nView tab    → Clip Start / Clip End\n(camera selected) Properties > Object Data > Lens > Clip Start / End",
      },
      {
        lang: "passo-a-passo",
        code: "1. Crie um cubo bem pequeno: Add > Mesh > Cube, depois S 0.01 (1cm).\n2. Tente dar zoom bem perto — ele some! É o Clip Start cortando.\n3. Pressione N, vá na aba View.\n4. Mude Clip Start de 0.1 para 0.001.\n5. Agora o zoom funciona até pertinho. Para cenas grandes, aumente Clip End para 10000.",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Ajustar clipping da viewport ativa\nspace = next(a.spaces.active for a in bpy.context.screen.areas if a.type == 'VIEW_3D')\nspace.clip_start = 0.001    # mostra coisas até 1mm de distância\nspace.clip_end = 10000.0    # cenas até 10km\n\n# Ajustar clipping da câmera de renderização (objeto Camera)\ncam = bpy.data.objects['Camera'].data\ncam.clip_start = 0.01\ncam.clip_end = 5000.0",
      },
      {
        lang: "config",
        code: "# Painel N > View > View\nClip Start: 0.01     # padrão 0.1; reduza para joalheria\nClip End:   5000     # padrão 1000; aumente para paisagens\nLens:       50 mm    # foco da viewport perspectiva",
      },
    ],
    points: [
      "**Clip Start**: distância mínima que a câmera renderiza; mais perto que isso, soma.",
      "**Clip End**: distância máxima; mais longe que isso, some.",
      "Padrão: 0.1m / 1000m — bom para cenas humanas, mas precisa ajustar para extremos.",
      "Cenas pequenas (jóias, miniaturas): reduzir \`Clip Start\` para \`0.001\`.",
      "Cenas grandes (cidades, paisagens): aumentar \`Clip End\` para \`10000\` ou mais.",
      "Cada viewport tem **clipping próprio**; a câmera de render também — ajuste ambos.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Reduzir \`Clip Start\` para valores muito baixos (\`0.0001\`) e aumentar \`Clip End\` para valores muito altos (\`100000\`) ao mesmo tempo causa **z-fighting**: faces piscam por imprecisão numérica. Mantenha a razão entre os dois razoável.",
      },
      {
        type: "tip",
        content: "Se sua malha some ao dar zoom em **Edit Mode**, é quase sempre Clip Start. Antes de procurar bugs, abra o painel \`N\`.",
      },
      {
        type: "info",
        content: "A câmera de renderização tem clipping **separado** da viewport. Renderizou e cortou? Vá em \`Object Data Properties\` da câmera.",
      },
    ],
  },
  {
    slug: "configurar-mouse-trackpad",
    section: "navegacao",
    title: "Configurando Mouse e Trackpad para Navegação Fluida",
    difficulty: "intermediario",
    subtitle: "Adapte o Blender ao seu hardware — mouse de 2 botões, trackpad ou tablet gráfico.",
    intro: `
O Blender foi historicamente desenhado para um **mouse de 3 botões** (esquerdo, direito e roda clicável no meio). Mas hoje em dia muita gente usa notebook com **trackpad**, **mouse de 2 botões**, ou **tablet gráfico** (Wacom, Huion). Sem ajustes, esses usuários ficam frustrados — não conseguem orbitar, dar pan ou zoom corretamente. Felizmente, o Blender oferece ajustes profundos para todos esses casos.

A área onde tudo isso vive é \`Edit > Preferences > Input\` e \`Edit > Preferences > Navigation\`. Vamos passar pelos cenários mais comuns.

## Mouse sem botão do meio
Ative **Emulate 3 Button Mouse** em \`Input\`. A partir daí, \`Alt + clique esquerdo\` funciona como o botão do meio: orbitar, pan (\`Shift + Alt + LMB\`) e zoom (\`Ctrl + Alt + LMB\`).

## Notebook com trackpad
Ative **Emulate 3 Button Mouse** e use **gestos do trackpad**: dois dedos arrastando = pan; pinçar = zoom; dois dedos com \`Alt\` = orbitar. Em macOS, o suporte a gestos é nativo e excelente; em Windows depende do driver do touchpad.

## Sem teclado numérico
Ative **Emulate Numpad** em \`Input\`. A fileira de números 1-9 (acima das letras) passa a funcionar como o numpad. Você perde a possibilidade de usar esses números para selecionar layers/coleções via teclado, mas para 99% dos usuários é um ótimo trade-off.

## Tablet gráfico
Em \`Preferences > Input > Tablet\`, escolha o **API** correto (\`Windows Ink\` ou \`Wintab\`). Configure os botões da caneta para imitar MMB e RMB. Algumas tablets profissionais têm botões extras programáveis — mapeie um para \`Numpad .\` e seu fluxo melhora muito.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Abra Edit > Preferences > Input.\n2. Marque 'Emulate 3 Button Mouse' (se não tem MMB).\n3. Marque 'Emulate Numpad' (se não tem teclado numérico).\n4. Vá para a aba 'Tablet': escolha 'Windows Ink' (ou 'Automatic').\n5. Vá em 'Navigation': ative 'Zoom To Mouse Position' e 'Rotate Around Selection'.\n6. Salve com 'Save Preferences' no canto inferior esquerdo.",
      },
      {
        lang: "config",
        code: "# Edit > Preferences > Input\nEmulate 3 Button Mouse: ON      # Alt+LMB substitui MMB\nEmulate Numpad: ON              # 1..9 viram Numpad 1..9\nDouble Click Speed: 350 ms\n\n# Edit > Preferences > Input > Tablet\nTablet API: Windows Ink         # ou 'Wintab' p/ Wacom antigos\nMax Threshold: 1.0\n\n# Edit > Preferences > Navigation\nOrbit Style: Turntable\nZoom To Mouse Position: ON\nRotate Around Selection: ON\nAuto Depth: ON",
      },
      {
        lang: "atalho",
        code: "(com Emulate 3 Button Mouse ATIVO)\nAlt + LMB        → Orbitar (substitui MMB)\nShift + Alt + LMB → Pan (substitui Shift + MMB)\nCtrl + Alt + LMB  → Zoom (substitui Ctrl + MMB)\n\n(com Emulate Numpad ATIVO)\n1..9 (linha de cima) → vistas Numpad 1..9\n5  → Toggle perspectiva\n0  → Vista de câmera",
      },
      {
        lang: "python",
        code: "import bpy\n\nprefs = bpy.context.preferences\ninputs = prefs.inputs\n\ninputs.use_mouse_emulate_3_button = True\ninputs.use_numeric_input_advanced = False\nprefs.inputs.use_emulate_numpad = True\n\nnav = prefs.inputs\n# alguns flags moraram em prefs.view nas versões mais novas\nprefs.view.use_zoom_to_mouse = True\nprefs.view.use_rotate_around_active = True\n\nbpy.ops.wm.save_userpref()",
      },
    ],
    points: [
      "**Emulate 3 Button Mouse**: \`Alt + LMB\` passa a fazer o papel do botão do meio.",
      "**Emulate Numpad**: a fileira numérica do teclado vira numpad — salva a vida em notebooks.",
      "**Zoom To Mouse Position**: o zoom converge no ponto onde o cursor está, em vez do centro.",
      "**Rotate Around Selection**: a órbita acompanha o objeto selecionado, sem precisar de \`Numpad .\`.",
      "**Tablet API** correto evita travamentos e pressão errática em Wacom/Huion.",
      "Sempre **Save Preferences** após mudar — caso contrário, as alterações somem na próxima sessão.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Se você usa Wacom e a pressão da caneta sumiu após uma atualização, alterne entre \`Windows Ink\` e \`Wintab\` em Preferences > Input > Tablet — quase sempre resolve.",
      },
      {
        type: "warning",
        content: "Ativar **Emulate Numpad** desativa o uso dos números 1-9 para seleção de coleções via teclado. Pondere o trade-off antes.",
      },
      {
        type: "success",
        content: "Quando finalmente personaliza tudo (mouse, numpad, zoom-to-mouse, rotate-around-selection), você sente que o Blender 'vira uma extensão da mão'. Vale o tempo investido.",
      },
    ],
  },
];
