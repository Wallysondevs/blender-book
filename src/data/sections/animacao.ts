import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "keyframes-intro",
    section: "animacao",
    title: "Introdução aos Keyframes",
    difficulty: "iniciante",
    subtitle: "Os pontos no tempo que dão vida aos seus objetos.",
    intro: `
Animar, no fundo, é contar uma história quadro a quadro. Antes do computador, animadores desenhavam **cada quadro** à mão, mas nem sempre faziam tudo: artistas seniores desenhavam apenas as poses-chave (em inglês, **keyframes**), e os assistentes preenchiam os quadros intermediários, processo chamado de \`in-between\`. O Blender herda exatamente essa lógica: você define poses importantes em momentos específicos do tempo, e o software interpola tudo que está no meio.

Um **keyframe** no Blender é um marcador que diz: "no quadro X, esta propriedade vale Y". Você pode animar quase qualquer coisa — posição, rotação, escala, cor de um material, intensidade de uma luz, modificadores. Tudo que aparece com um valor numérico pode receber keyframe. Visualmente, um keyframe surge como um **losango colorido** na \`Timeline\` (linha do tempo) na parte de baixo da tela.

## A Timeline e o "playhead"
A \`Timeline\` mostra o tempo do projeto em quadros (frames). O cursor azul vertical chama-se **playhead** e indica em qual quadro você está. Para inserir um keyframe, basta posicionar o playhead, mudar a propriedade desejada e pressionar \`I\` no teclado com o mouse sobre o \`Viewport 3D\`.

## FPS: quadros por segundo
Por padrão, o Blender roda a 24 \`FPS\` (frames per second), o padrão do cinema. Isso significa que 24 quadros equivalem a 1 segundo de animação. Você ajusta esse valor em \`Output Properties\` → \`Frame Rate\`.

No fim deste capítulo, você verá que dominar keyframes é a base de **tudo** em animação 3D — e o resto do livro é só requinte sobre essa ideia simples.
    `,
    codes: [
      {
        lang: "atalho",
        code: "I              → inserir keyframe (menu de propriedades)\nAlt + I        → remover keyframe da propriedade atual\nShift + ←/→    → ir para o primeiro/último keyframe\nEspaço         → play/pause da animação\nCtrl + ←/→     → pular 10 quadros para trás/frente",
      },
      {
        lang: "passo-a-passo",
        code: "1. Selecione o cubo padrão no Viewport 3D\n2. Posicione o playhead no quadro 1 (na Timeline embaixo)\n3. Pressione I e escolha 'Location'\n4. Vá ao quadro 60 (clique no número 60 na Timeline)\n5. Mova o cubo com G + X + 5 + Enter\n6. Pressione I novamente e escolha 'Location'\n7. Aperte Espaço e veja o cubo atravessar a cena",
      },
      {
        lang: "python",
        code: "import bpy\n\n# pega o objeto ativo\nobj = bpy.context.active_object\n\n# insere keyframe de localizacao no quadro 1\nbpy.context.scene.frame_set(1)\nobj.location = (0, 0, 0)\nobj.keyframe_insert(data_path=\"location\", frame=1)\n\n# insere outro keyframe no quadro 60\nbpy.context.scene.frame_set(60)\nobj.location = (5, 0, 0)\nobj.keyframe_insert(data_path=\"location\", frame=60)",
      },
      {
        lang: "config",
        code: "Output Properties:\n  Frame Start: 1\n  Frame End:   250\n  Frame Rate:  24 fps  (cinema)\n               30 fps  (TV/web padrao)\n               60 fps  (jogos / slow-motion)",
      },
    ],
    points: [
      "**Keyframe**: marcador que grava o valor de uma propriedade num quadro específico",
      "**Playhead**: cursor azul que indica o quadro atual na \`Timeline\`",
      "Use \`I\` no \`Viewport 3D\` para abrir o menu de inserção de keyframe",
      "Auto Keyframe (botão de **círculo vermelho** na Timeline) grava keyframes automaticamente quando você mexe em algo",
      "Cores dos losangos indicam o tipo de interpolação: amarelo = Bezier, verde = linear, cinza = constant",
      "Armadilha clássica: esquecer de posicionar o playhead antes de mexer no objeto e gravar keyframe no quadro errado",
      "FPS define quantos quadros formam 1 segundo — mude antes de começar, não no meio do projeto",
    ],
    alerts: [
      {
        type: "tip",
        content: "Ative **Auto Keyframe** (ícone de círculo vermelho ao lado dos controles de play) para gravar keyframes sem precisar apertar \`I\` toda hora — ótimo para iniciantes.",
      },
      {
        type: "warning",
        content: "Mudar o **Frame Rate** depois que você já animou bastante coisa **não estica** os keyframes existentes — eles continuam nos mesmos quadros, mas a duração em segundos muda.",
      },
      {
        type: "info",
        content: "Você pode inserir keyframe em quase qualquer campo numérico clicando com o **botão direito** sobre ele e escolhendo \`Insert Keyframe\`.",
      },
    ],
  },
  {
    slug: "dope-sheet",
    section: "animacao",
    title: "Dope Sheet: a Visão Geral da Animação",
    difficulty: "iniciante",
    subtitle: "O painel onde você organiza, move e ajusta seus keyframes.",
    intro: `
Quando você começa a ter mais de cinco ou seis keyframes, a \`Timeline\` fica apertada e você precisa de uma visão mais detalhada. É aí que entra o **Dope Sheet**, traduzido como "ficha de exposição". O nome vem da animação tradicional: era uma planilha onde o animador anotava, linha por linha, quais desenhos apareciam em cada quadro. No Blender, o Dope Sheet faz exatamente isso, mas com keyframes em vez de desenhos.

Para abrir o Dope Sheet, mude o tipo de qualquer editor para \`Dope Sheet\` clicando no ícone do canto superior esquerdo do painel. Você verá uma lista de **canais** (channels) à esquerda — cada propriedade animada vira um canal — e os keyframes representados como losangos numa linha do tempo horizontal.

## Selecionando e movendo keyframes
Os atalhos do Dope Sheet são quase os mesmos do \`Viewport 3D\`: \`A\` seleciona tudo, \`B\` faz seleção em caixa, \`G\` move, \`S\` escala (encurta ou estica a animação), \`R\` é desabilitado (não faz sentido girar keyframes). Você pode selecionar vários keyframes e mover juntos para reajustar o ritmo.

## Modos do Dope Sheet
No topo há um seletor com vários modos: **Dope Sheet** (geral), **Action Editor** (gerencia ações nomeadas), **Shape Key Editor** (para morphs), **Grease Pencil**, **Mask** e **Cache File**. No começo você vai usar quase sempre o modo padrão.

Dominar o Dope Sheet acelera **muito** o seu fluxo: ajustar timing aqui é dez vezes mais rápido do que reinserir keyframes manualmente.
    `,
    codes: [
      {
        lang: "atalho",
        code: "A              → selecionar todos os keyframes\nAlt + A        → desselecionar tudo\nB              → seleção em caixa (box select)\nG              → mover keyframe(s) no tempo\nS              → escalar (esticar/encolher) seleção\nX ou Delete    → apagar keyframe(s)\nShift + D      → duplicar keyframe(s)\nT              → escolher tipo de interpolação",
      },
      {
        lang: "passo-a-passo",
        code: "1. Divida a tela em dois (clique direito na borda → Vertical Split)\n2. No painel novo, mude o editor para Dope Sheet\n3. Anime um cubo com 3-4 keyframes de Location\n4. No Dope Sheet, clique sobre um losango para selecioná-lo\n5. Pressione G e arraste para mudar o tempo desse keyframe\n6. Selecione todos com A, depois S + 0.5 para encurtar tudo pela metade",
      },
      {
        lang: "python",
        code: "import bpy\n\n# acessa a action (acao) do objeto ativo\nobj = bpy.context.active_object\naction = obj.animation_data.action\n\n# percorre todos os fcurves (canais animados)\nfor fcurve in action.fcurves:\n    print(f\"Canal: {fcurve.data_path}[{fcurve.array_index}]\")\n    for kp in fcurve.keyframe_points:\n        print(f\"  frame {kp.co.x} -> valor {kp.co.y:.3f}\")",
      },
      {
        lang: "config",
        code: "Filtros uteis no header do Dope Sheet:\n  - Only Selected   : mostra apenas canais do objeto selecionado\n  - Only Show Errors: util para encontrar curves quebradas\n  - Show Hidden     : exibe canais de objetos ocultos\n  - Sort: by Name / by Channel / by ZIPunused",
      },
    ],
    points: [
      "**Dope Sheet**: editor que mostra todos os keyframes em forma de losangos por canal",
      "Cada propriedade animada (location.x, rotation_euler.z, etc.) vira um **canal** na lista da esquerda",
      "Use \`G\` para deslizar keyframes no tempo sem alterar o valor",
      "\`S\` (escala) é fantástico para acelerar ou desacelerar trechos inteiros",
      "Modo **Action Editor** permite salvar sequências como \"ações\" reutilizáveis (Walk_Cycle, Idle, etc.)",
      "Armadilha: ao mover keyframes próximos a outros, eles podem se sobrepor — use snap (\`Shift + S\`) para alinhar em quadros inteiros",
      "Você pode mudar a **interpolação** de vários keyframes de uma vez selecionando-os e pressionando \`T\`",
    ],
    alerts: [
      {
        type: "tip",
        content: "Mantenha um painel \`Dope Sheet\` aberto **sempre** que estiver animando. Ele dá visão estratégica que a \`Timeline\` simples não oferece.",
      },
      {
        type: "info",
        content: "O **Summary** (linha superior com losangos cinza) representa todos os keyframes do objeto agregados. Mover essa linha move tudo junto.",
      },
      {
        type: "warning",
        content: "Apertar \`X\` apaga keyframes; apertar \`X\` no \`Viewport 3D\` apaga objetos. Confira sempre onde está o cursor antes de deletar!",
      },
    ],
  },
  {
    slug: "graph-editor",
    section: "animacao",
    title: "Graph Editor: Esculpindo o Movimento",
    difficulty: "iniciante",
    subtitle: "O editor de curvas onde você refina aceleração, suavidade e ritmo.",
    intro: `
Se o \`Dope Sheet\` mostra **quando** as coisas acontecem, o **Graph Editor** mostra **como** elas acontecem entre os keyframes. Cada propriedade animada vira uma **F-Curve** (function curve), uma linha que representa a evolução do valor ao longo do tempo. Esculpir essas curvas é o que separa uma animação robótica de uma animação viva.

Imagine que você animou um cubo subindo do quadro 1 ao 60. Por padrão, o Blender cria uma curva **suave** (Bezier), o que dá uma aceleração e desaceleração natural. Mas e se você quiser que ele suba devagar e pare de repente, como um elevador chegando ao andar? É no Graph Editor que você modela esse comportamento, ajustando os **handles** (alças tipo Bezier) de cada keyframe.

## Lendo o gráfico
O eixo **horizontal** é o tempo (em quadros) e o eixo **vertical** é o valor da propriedade. Uma curva subindo significa o valor crescendo; uma reta horizontal significa pausa; uma curva muito íngreme significa movimento rápido. Para focar em um canal só, clique no nome dele à esquerda.

## Handles Bezier
Cada keyframe tem dois **handles** (alças) que controlam a tangente da curva. Você pode movê-los como num editor vetorial. Os tipos mais usados são \`Free\`, \`Aligned\`, \`Vector\` e \`Auto Clamped\`.

No fim, você vai descobrir que **90% do polimento de uma animação acontece aqui** — vale a pena investir tempo nesse editor.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Tab            → alternar Dope Sheet / Graph Editor (em alguns layouts)\nHome           → enquadrar todas as curvas\nNumpad .       → enquadrar a seleção\nV              → mudar tipo de handle (Free/Aligned/Vector/Auto)\nT              → mudar tipo de interpolação (Bezier/Linear/Constant)\nCtrl + Tab     → alternar entre F-Curves e Drivers",
      },
      {
        lang: "passo-a-passo",
        code: "1. Anime um cubo descendo do quadro 1 (z=5) ao 30 (z=0)\n2. Abra o Graph Editor no lugar do Dope Sheet\n3. Selecione o keyframe do quadro 30\n4. Pressione V → escolha 'Vector' (handle reto)\n5. Selecione o keyframe inicial e mantenha 'Auto Clamped'\n6. Aperte Espaço: o cubo cai acelerando e bate firme no chao",
      },
      {
        lang: "python",
        code: "import bpy\n\nobj = bpy.context.active_object\nfor fcurve in obj.animation_data.action.fcurves:\n    for kp in fcurve.keyframe_points:\n        # muda o tipo de interpolacao para todos\n        kp.interpolation = 'BEZIER'\n        # ajusta tipo de handle\n        kp.handle_left_type = 'AUTO_CLAMPED'\n        kp.handle_right_type = 'AUTO_CLAMPED'\n    fcurve.update()",
      },
      {
        lang: "config",
        code: "Tipos de Handle (V):\n  Free         : handles independentes (mais liberdade)\n  Aligned      : handles colineares (suaviza picos)\n  Vector       : handles retos para os vizinhos (cantos vivos)\n  Auto         : Blender escolhe; pode 'estourar' alem dos valores\n  Auto Clamped : igual Auto, mas trava no valor (recomendado!)",
      },
    ],
    points: [
      "**F-Curve**: linha que descreve o valor de uma propriedade no tempo",
      "Eixo X = tempo (quadros), Eixo Y = valor da propriedade",
      "**Handles** controlam a tangente; mudar com \`V\` muda o caráter do movimento",
      "Curva íngreme = movimento rápido; curva plana = movimento lento ou parado",
      "Use \`Auto Clamped\` por padrão para evitar **overshoot** indesejado em animações simples",
      "Armadilha: arrastar um handle no eixo X bagunça o tempo; segure \`Shift\` para travar no eixo Y",
      "Modificadores de F-Curve (\`N\` → Modifiers) permitem ciclos automáticos, ruído e suavização",
    ],
    alerts: [
      {
        type: "tip",
        content: "Pressione \`Numpad .\` para enquadrar **a curva selecionada** — atalho que economiza horas de scroll.",
      },
      {
        type: "info",
        content: "O **N panel** (lateral direita do Graph Editor) mostra valores numéricos exatos de cada keyframe e handle. Use para precisão milimétrica.",
      },
      {
        type: "warning",
        content: "Cuidado com handles tipo **Auto**: eles podem ultrapassar o valor desejado e gerar **overshoot** invisível na Timeline. Prefira \`Auto Clamped\` quando estiver começando.",
      },
    ],
  },
  {
    slug: "interpolacao-curvas",
    section: "animacao",
    title: "Interpolação e Tipos de Curva",
    difficulty: "iniciante",
    subtitle: "Bezier, Linear, Constant e os efeitos de cada tipo no movimento.",
    intro: `
Entre dois keyframes, o Blender precisa **inventar** os valores intermediários. A regra usada para inventar esses valores chama-se **interpolação**. Trocar a interpolação muda completamente o caráter da animação, mesmo sem alterar nenhum keyframe — entender isso é um superpoder.

Os três tipos básicos são **Bezier**, **Linear** e **Constant**. O **Bezier** (padrão) cria curvas suaves, com aceleração e desaceleração naturais — bom para movimento orgânico. O **Linear** desenha uma reta entre dois keyframes, mantendo velocidade constante — ótimo para mecânica, esteiras, ponteiros de relógio. O **Constant** segura o valor sem mudar até o próximo keyframe, criando um "pulo seco" — ideal para animar visibilidade, troca de imagens, acionar/desligar.

## Easing: a curva da emoção
Além dos três básicos, o Blender oferece **modos de easing** inspirados em CSS e After Effects: \`Sinusoidal\`, \`Quadratic\`, \`Cubic\`, \`Quartic\`, \`Quintic\`, \`Exponential\`, \`Circular\`, \`Back\`, \`Bounce\` e \`Elastic\`. Cada um dá um "sabor" diferente: \`Bounce\` faz quicar, \`Elastic\` faz tremer no fim, \`Back\` faz recuar antes de avançar.

## Easing direction
Cada easing aceita uma **direção**: \`Ease In\` (acelera no começo), \`Ease Out\` (desacelera no fim) e \`Ease In/Out\` (suaviza ambos). Na prática, \`Ease Out\` é o mais usado para movimentos que "chegam" em algum lugar.

Você verá que dominar interpolação é mais sobre **escolher** do que sobre desenhar — e o Graph Editor te dá controle total para refinar depois.
    `,
    codes: [
      {
        lang: "atalho",
        code: "T              → menu 'Set Interpolation Type' (Dope Sheet/Graph Editor)\nCtrl + E       → menu de Easing Type\nShift + E      → Easing Direction (In/Out/InOut)",
      },
      {
        lang: "passo-a-passo",
        code: "1. Crie uma esfera animada caindo (z=10 no quadro 1, z=0 no quadro 30)\n2. No Dope Sheet, selecione todos com A\n3. Pressione T → escolha 'Bezier'\n4. Pressione Ctrl + E → escolha 'Bounce'\n5. Pressione Shift + E → escolha 'Ease Out'\n6. Aperte Espaço: a esfera cai e quica no chao!",
      },
      {
        lang: "python",
        code: "import bpy\n\nobj = bpy.context.active_object\nfor fc in obj.animation_data.action.fcurves:\n    for kp in fc.keyframe_points:\n        kp.interpolation = 'BOUNCE'   # tipo do easing\n        kp.easing = 'EASE_OUT'        # direcao\n    fc.update()",
      },
      {
        lang: "config",
        code: "Quando usar cada interpolacao:\n  Constant  : visibilidade, on/off, troca de textura\n  Linear    : maquinas, esteiras, rotacao constante\n  Bezier    : 95% das animacoes organicas\n  Bounce    : objetos caindo, impacto\n  Elastic   : molas, gelatina, exageros cartoon\n  Back      : antecipacao (puxa antes de pular)\n  Sinusoidal: ondas suaves, respiracao",
      },
    ],
    points: [
      "**Bezier** (padrão): suave, com aceleração e desaceleração naturais",
      "**Linear**: velocidade constante, ótimo para mecânica",
      "**Constant**: trava no valor até o próximo keyframe — perfeito para ligar/desligar",
      "**Easing** define o \"sabor\" do movimento; \`Ease Out\` é o mais comum",
      "Cores dos losangos no Dope Sheet indicam interpolação (amarelo Bezier, verde Linear, cinza Constant)",
      "Armadilha: misturar \`Linear\` com \`Bezier\` no mesmo canal cria \"solavancos\" sutis",
      "**Bounce** e **Elastic** são divertidos, mas usar demais deixa tudo cartoon — escolha consciente",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para animar a **visibilidade** de um objeto, use a propriedade \`hide_viewport\` (ou \`hide_render\`) com interpolação **Constant**. Trocar para Bezier vai gerar comportamento absurdo.",
      },
      {
        type: "success",
        content: "Combinar **Back (Ease In)** + **Bounce (Ease Out)** no mesmo movimento gera animações cartoon **lindas** com pouquíssimo esforço.",
      },
      {
        type: "info",
        content: "Em \`User Preferences → Animation\` você pode mudar a **interpolação padrão** para todos os novos keyframes — alguns animadores preferem Linear como default.",
      },
    ],
  },
  {
    slug: "drivers",
    section: "animacao",
    title: "Drivers: Animação por Fórmulas",
    difficulty: "intermediario",
    subtitle: "Conecte propriedades entre si com expressões matemáticas.",
    intro: `
Um **driver** é uma propriedade controlada por **outra propriedade** ou por uma **expressão Python**, sem precisar de keyframes. Em vez de gravar valor a valor, você diz: "a rotação dessa engrenagem é o dobro da rotação daquela", ou "o tamanho dessa luz é a distância do meu personagem até a parede". Drivers são a porta de entrada para **rigging** e automação.

Para criar um driver, clique com o **botão direito** sobre qualquer campo numérico e escolha \`Add Driver\`. O Blender abre o **Driver Editor** (uma aba do Graph Editor) onde você define **variáveis** que apontam para outras propriedades, e uma **expressão** que combina essas variáveis. A expressão pode ser tão simples quanto \`var\` (passa direto) ou tão complexa quanto \`sin(var * 2) + 1\`.

## Variáveis de driver
Cada variável tem um **tipo**: \`Single Property\` (lê uma propriedade qualquer), \`Transform Channel\` (lê posição/rotação/escala de um objeto ou bone), \`Rotational Difference\` (ângulo entre dois objetos) ou \`Distance\` (distância entre dois objetos). Esse último é ouro para rigs.

## Expressões e segurança
Por padrão, expressões Python ficam **desabilitadas** por segurança ao abrir um arquivo de outra pessoa. Você precisa ir em \`Edit → Preferences → Save & Load → Auto Run Python Scripts\` para liberar.

No fim, drivers fazem com que pequenas ações controlem coisas grandes — e são a base de qualquer rig profissional.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Botao direito no campo → Add Driver       (criar driver)\nBotao direito no campo → Edit Driver      (abrir editor)\nBotao direito no campo → Delete Driver    (remover)\nCtrl + D (sobre o campo)                  → atalho para Add Driver",
      },
      {
        lang: "passo-a-passo",
        code: "1. Crie dois cubos: 'Mestre' e 'Escravo'\n2. Selecione 'Escravo'; va em Object Properties → Rotation Z\n3. Botao direito no campo Rotation Z → Add Driver\n4. No popup, mude Variable Type para Transform Channel\n5. Object: 'Mestre' | Type: Z Rotation\n6. Em Expression escreva: var * 2\n7. Gire o Mestre: o Escravo gira no dobro!",
      },
      {
        lang: "python",
        code: "import bpy\n\nobj = bpy.data.objects[\"Escravo\"]\n# adiciona driver na rotacao Z (indice 2)\nfcurve = obj.driver_add(\"rotation_euler\", 2)\ndrv = fcurve.driver\ndrv.type = 'SCRIPTED'\ndrv.expression = \"var * 2\"\n\n# cria a variavel\nvar = drv.variables.new()\nvar.name = \"var\"\nvar.type = 'TRANSFORMS'\nvar.targets[0].id = bpy.data.objects[\"Mestre\"]\nvar.targets[0].transform_type = 'ROT_Z'\nvar.targets[0].transform_space = 'WORLD_SPACE'",
      },
      {
        lang: "config",
        code: "Tipos de variavel:\n  Single Property      : qualquer campo de qualquer datablock\n  Transform Channel    : loc/rot/scale de objeto ou bone\n  Rotational Difference: angulo entre dois objetos (em radianos)\n  Distance             : distancia mundo entre dois objetos\n\nFuncoes uteis na expressao:\n  sin, cos, tan, radians, degrees, abs, min, max, pow, sqrt",
      },
    ],
    points: [
      "**Driver**: vínculo automático entre propriedades, sem keyframes",
      "Acessível por botão direito → \`Add Driver\` em qualquer campo numérico",
      "Variáveis apontam para outras propriedades; expressão combina essas variáveis",
      "Campo com driver fica **roxo**; com keyframe fica amarelo/verde",
      "Use **Rotational Difference** para shape keys que reagem a poses (corretivos de cotovelo, joelho)",
      "Armadilha: ângulos em drivers vêm em **radianos**, não graus — use \`degrees(var)\` se precisar",
      "Auto Run Python Scripts precisa estar **ligado** para drivers com expressões funcionarem",
    ],
    alerts: [
      {
        type: "warning",
        content: "Drivers podem causar **dependência circular** (A controla B que controla A). O Blender avisa, mas o resultado fica congelado. Sempre quebre o ciclo.",
      },
      {
        type: "tip",
        content: "Para depurar uma expressão, abra o **Driver Editor** e veja a curva resultante. Se aparecer reta, sua variável provavelmente não está mudando.",
      },
      {
        type: "info",
        content: "Drivers são a base de **rigs faciais** (sliders que movem dezenas de shape keys ao mesmo tempo) e de **rigs mecânicos** (engrenagens proporcionais).",
      },
    ],
  },
  {
    slug: "constraints-anim",
    section: "animacao",
    title: "Constraints para Animação",
    difficulty: "intermediario",
    subtitle: "Restrições que automatizam relações entre objetos.",
    intro: `
Uma **constraint** (restrição) é uma regra que limita ou direciona o transform de um objeto baseado em outro. Em vez de animar manualmente uma câmera olhando para um personagem em movimento, você adiciona uma constraint **Track To** e pronto: a câmera sempre aponta para o alvo, custe o que custar. Constraints economizam horas e abrem portas para efeitos impossíveis de keyframizar à mão.

Você adiciona constraints na aba \`Object Constraint Properties\` (ícone de **corrente azul** no Properties Editor). Há dezenas, agrupadas em **Motion Tracking**, **Transform**, **Tracking** e **Relationship**. As mais usadas no dia a dia da animação são **Copy Location/Rotation/Scale**, **Track To**, **Limit Location**, **Child Of** e **Damped Track**.

## Influence: o segredo do controle fino
Toda constraint tem um slider \`Influence\` (0 a 1) que define **quanto** ela manda. E aqui está a mágica: \`Influence\` é uma propriedade animável! Você pode keyframar a influência para "ligar" e "desligar" suavemente uma constraint — fundamental para um personagem pegar e soltar objetos.

## Ordem importa
Constraints são aplicadas **de cima para baixo** na lista. Um \`Copy Location\` antes de um \`Limit Location\` produz resultado diferente do contrário. Reordene arrastando o ícone de **dois traços** ao lado do nome.

Você verá que constraints + drivers + keyframes formam a **trindade** da animação técnica no Blender.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Ctrl + Shift + C (no Viewport) → menu 'Add Constraint with Targets'\n  Necessario ter o ALVO selecionado primeiro e o objeto controlado por ultimo (active)",
      },
      {
        lang: "passo-a-passo",
        code: "1. Adicione uma camera e um cubo (alvo)\n2. Selecione o cubo, depois Shift+clique a camera (ela fica ativa)\n3. Pressione Ctrl + Shift + C → escolha 'Track To'\n4. A camera passa a apontar para o cubo automaticamente\n5. Anime o cubo: a camera sempre o segue\n6. Para ajustar: Object Constraint Properties → Track To → Track Axis: -Z, Up: Y",
      },
      {
        lang: "python",
        code: "import bpy\n\ncam = bpy.data.objects[\"Camera\"]\ntarget = bpy.data.objects[\"Cube\"]\n\n# adiciona Track To\ncon = cam.constraints.new(type='TRACK_TO')\ncon.target = target\ncon.track_axis = 'TRACK_NEGATIVE_Z'\ncon.up_axis = 'UP_Y'\ncon.influence = 1.0\n\n# anima a influencia: solta o tracking entre quadros 50 e 60\ncon.influence = 1.0\ncon.keyframe_insert(\"influence\", frame=50)\ncon.influence = 0.0\ncon.keyframe_insert(\"influence\", frame=60)",
      },
      {
        lang: "config",
        code: "Constraints essenciais para animacao:\n  Copy Location/Rotation/Scale : cola transform de outro objeto\n  Track To                     : aponta um eixo para o alvo (camera)\n  Damped Track                 : versao mais estavel do Track To\n  Limit Location/Rotation/Scale: cria batentes (parede invisivel)\n  Child Of                     : pai temporario (ideal para pick-up)\n  Floor                        : impede de atravessar uma superficie",
      },
    ],
    points: [
      "**Constraint**: regra automática que controla transform baseada em outro objeto",
      "Adicionada em \`Object Constraint Properties\` (ícone de corrente azul)",
      "Slider \`Influence\` controla quanto a constraint atua — e é animável!",
      "Ordem de aplicação importa: constraints rodam de cima para baixo",
      "**Child Of** com influência animada permite \"pegar\" e \"soltar\" objetos sem mudar pais",
      "**Damped Track** costuma dar resultado mais estável que \`Track To\` em câmeras",
      "Armadilha: constraints podem competir com keyframes do mesmo canal — o resultado final é a soma ponderada",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para câmera seguindo personagem, prefira **Damped Track** sobre **Track To**. O Damped não \"flipa\" quando o alvo passa pelo polo.",
      },
      {
        type: "info",
        content: "Animar \`Influence\` de um **Child Of** entre 0 e 1 é o truque clássico para um personagem pegar uma xícara, beber e devolver à mesa.",
      },
      {
        type: "warning",
        content: "Constraints rodam **depois** dos keyframes. Se você aplicou \`Copy Location\`, mover o objeto manualmente não terá efeito visível enquanto o alvo estiver dominando.",
      },
    ],
  },
  {
    slug: "follow-path",
    section: "animacao",
    title: "Follow Path: Animação por Caminho",
    difficulty: "iniciante",
    subtitle: "Faça objetos seguirem curvas Bezier ao longo do tempo.",
    intro: `
Animar um carro percorrendo uma estrada sinuosa quadro a quadro seria um pesadelo. Para casos assim, o Blender oferece o sistema **Follow Path**: você desenha uma curva (uma **Bezier Curve** ou **NURBS Path**), associa um objeto a ela, e ele percorre o caminho automaticamente. Editar o caminho atualiza a animação em tempo real.

Para começar, adicione uma curva em \`Add → Curve → Bezier\` (ou \`Path\`, mais simples). Depois selecione o objeto que vai andar, **Shift + clique** na curva (ela vira ativa) e use \`Ctrl + P → Follow Path\`. Pronto: o objeto gruda no início da curva.

## Animation Path: o motor do movimento
A animação não vem de keyframes no objeto, e sim da própria curva! Selecione a curva, vá em \`Object Data Properties\` (ícone de curva verde) → \`Path Animation\`. Lá você define **Frames** (duração em quadros para percorrer todo o caminho) e marca **Animation Path**. Para customizar a velocidade, anime a propriedade \`Evaluation Time\`.

## Orientação do objeto
Por padrão, o objeto não gira para acompanhar curvas — ele desliza torto. Vá em \`Object Data Properties → Path Animation\` e ative \`Follow\`. Agora ele se orienta tangente ao caminho. Ajuste o eixo "frente" em \`Track Axis\`.

Esse sistema é a base de **flythroughs**, créditos de filme, voos de drone e qualquer animação onde a trajetória importa mais que poses específicas.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Ctrl + P (com alvo curva ativo) → menu Parent\n  → Follow Path     : objeto segue a curva ao longo do tempo\n  → Path Constraint : adiciona constraint Follow Path equivalente",
      },
      {
        lang: "passo-a-passo",
        code: "1. Add → Curve → Bezier (uma curva surge na cena)\n2. Entre em Edit Mode (Tab) e modele o caminho desejado\n3. Volte ao Object Mode (Tab)\n4. Selecione um objeto (ex: carro), Shift+clique na curva\n5. Ctrl + P → Follow Path\n6. Selecione a curva → Object Data Properties → Path Animation\n7. Ative 'Follow' e ajuste 'Frames' (ex: 250 = 10 segundos a 24fps)",
      },
      {
        lang: "python",
        code: "import bpy\n\n# cria curva path simples\nbpy.ops.curve.primitive_nurbs_path_add(location=(0, 0, 0))\npath = bpy.context.active_object\npath.data.path_duration = 250  # quadros para percorrer\npath.data.use_path_follow = True\n\n# adiciona constraint Follow Path em um cubo\ncube = bpy.data.objects[\"Cube\"]\ncon = cube.constraints.new(type='FOLLOW_PATH')\ncon.target = path\ncon.use_curve_follow = True\ncon.forward_axis = 'TRACK_NEGATIVE_Y'",
      },
      {
        lang: "config",
        code: "Path Animation (Object Data Properties da curva):\n  Frames           : duracao total para percorrer 100% da curva\n  Evaluation Time  : posicao atual (0 a Frames). Animavel!\n  Follow           : objeto roda tangente ao caminho\n  Animation Path   : ativa/desativa a animacao automatica",
      },
    ],
    points: [
      "**Follow Path**: faz objetos seguirem curvas Bezier/NURBS automaticamente",
      "A animação reside na **curva**, não no objeto — edite o caminho para mudar a trajetória",
      "Propriedade \`Frames\` define quanto tempo leva para percorrer a curva inteira",
      "Marque \`Follow\` para que o objeto se oriente tangente à curva",
      "Anime \`Evaluation Time\` para velocidades variáveis (acelerar, parar, acelerar de novo)",
      "Você pode anexar **vários objetos** à mesma curva, cada um com offset diferente",
      "Armadilha: se o objeto aparece girado errado, ajuste \`Track Axis\` em vez de rotacionar manualmente",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para ter controle total de **velocidade variável**, desligue \`Animation Path\` e anime manualmente a propriedade \`Evaluation Time\` no Graph Editor.",
      },
      {
        type: "info",
        content: "Curvas tipo **NURBS Path** vêm pré-configuradas para Follow Path e são mais fáceis de começar do que Bezier puro.",
      },
      {
        type: "warning",
        content: "Aplicar \`Scale\` na curva (\`Ctrl + A → Scale\`) pode mudar drasticamente a velocidade percebida. Sempre aplique antes de animar.",
      },
    ],
  },
  {
    slug: "shape-keys-morph",
    section: "animacao",
    title: "Shape Keys: Animação por Morph",
    difficulty: "intermediario",
    subtitle: "Deforme malhas com sliders, ideal para expressões faciais.",
    intro: `
Quando você precisa animar uma boca sorrindo, um músculo flexionando ou uma bandeira ondulando, gravar a posição de cada vértice no Graph Editor seria insano. A solução elegante chama-se **Shape Keys** (em outros softwares: \`morph targets\` ou \`blendshapes\`). A ideia é simples: você duplica a malha em poses-chave (sorrindo, triste, surpreso) e o Blender interpola entre elas com sliders de 0 a 1.

A primeira shape key é sempre a **Basis** — a forma neutra. As demais são variações. Você adiciona shape keys em \`Object Data Properties\` (ícone do triângulo verde) → painel \`Shape Keys\`. Clique no \`+\` para criar uma nova, entre em **Edit Mode**, mexa nos vértices (com proportional editing, sculpt mode etc.), saia para **Object Mode** e ajuste o slider \`Value\` para ver a interpolação.

## Animando shape keys
Cada shape key tem um \`Value\` animável. Botão direito sobre o slider → \`Insert Keyframe\` cria keyframes normais. No \`Dope Sheet\` há um modo \`Shape Key Editor\` específico para visualizar todas as keys de uma vez.

## Drivers + Shape Keys = rig facial
A combinação mais poderosa é **shape keys controladas por drivers** acoplados a bones de controle. Você cria um osso "controlador da sobrancelha" e ele dispara as shape keys correspondentes — o animador anima ossos, não sliders.

Esse capítulo é a porta para **animação facial profissional** e correção de deformações em rigs corporais.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Tab            → entrar/sair do Edit Mode (para esculpir a shape key)\nBotao direito no slider Value → Insert Keyframe\nO no Edit Mode → Proportional Editing (essencial para morphs suaves)",
      },
      {
        lang: "passo-a-passo",
        code: "1. Selecione uma malha (ex: a esfera)\n2. Object Data Properties → Shape Keys → clique +  (cria 'Basis')\n3. Clique + de novo (cria 'Key 1')\n4. Com 'Key 1' selecionada, entre em Edit Mode (Tab)\n5. Mova alguns vertices (G + Z, etc.)\n6. Saia (Tab) e arraste o slider Value de 0 a 1 — veja o morph!\n7. Botao direito no Value → Insert Keyframe nos quadros 1 e 60",
      },
      {
        lang: "python",
        code: "import bpy\n\nobj = bpy.context.active_object\n\n# garante que tem shape keys\nif not obj.data.shape_keys:\n    obj.shape_key_add(name=\"Basis\")\n\n# cria nova shape key 'Sorriso'\nsk = obj.shape_key_add(name=\"Sorriso\")\nsk.value = 0.0\n\n# anima de 0 a 1\nbpy.context.scene.frame_set(1)\nsk.value = 0.0\nsk.keyframe_insert(\"value\", frame=1)\n\nbpy.context.scene.frame_set(30)\nsk.value = 1.0\nsk.keyframe_insert(\"value\", frame=30)",
      },
      {
        lang: "config",
        code: "Propriedades importantes de uma shape key:\n  Value     : 0 a 1, intensidade do morph (animavel)\n  Range Min : limite inferior (pode ser negativo: anti-morph)\n  Range Max : limite superior (pode passar de 1 para exagerar)\n  Vertex Group: limita o morph a um grupo de vertices\n  Relative To: shape de referencia (geralmente Basis)",
      },
    ],
    points: [
      "**Shape Key**: variação de pose da mesma malha, interpolada por slider",
      "**Basis** é a forma neutra; sempre presente",
      "Edição é feita em **Edit Mode** com a shape key alvo selecionada",
      "Proportional Editing (\`O\`) é seu melhor amigo para morphs suaves",
      "\`Value\` pode ir além de 1 (\`Range Max\`) para criar exageros",
      "Armadilha: alterar **topologia** (adicionar/remover vértices) depois de criar shape keys quebra todas elas",
      "Combinar com **Vertex Groups** permite morphs localizados (só na bochecha esquerda, etc.)",
    ],
    alerts: [
      {
        type: "warning",
        content: "**Nunca** adicione ou remova vértices depois de criar shape keys. Toda a sequência fica corrompida e não há como recuperar facilmente.",
      },
      {
        type: "tip",
        content: "Use o botão **\"pin\"** ao lado do nome da shape key para isolar visualmente uma key e esculpir sem distração das outras.",
      },
      {
        type: "success",
        content: "Combinando **shape keys + drivers + bones de controle**, você monta rigs faciais comparáveis a estúdios — base do **Rigify** facial e do **AutoRig Pro**.",
      },
    ],
  },
  {
    slug: "nla-editor",
    section: "animacao",
    title: "NLA Editor: Animação Não-Linear",
    difficulty: "avancado",
    subtitle: "Combine, repita e mescle ações como camadas em vídeo.",
    intro: `
O **NLA Editor** (Non-Linear Animation) é o equivalente, na animação, de uma timeline de edição de vídeo. Em vez de uma sequência única de keyframes, você organiza **strips** (faixas) com pedaços de animação que podem ser repetidos, escalonados, mesclados e empilhados em camadas. É a ferramenta indispensável para **ciclos de caminhada**, transições entre poses e bibliotecas de animações reutilizáveis.

Para usar o NLA, sua animação precisa estar guardada como uma **Action** nomeada. No \`Dope Sheet\`, mude para o modo \`Action Editor\`, clique no campo do nome e renomeie (ex: \`Walk_Cycle\`). Agora abra o **NLA Editor** (no seletor de tipo de painel) e clique em \`Push Down Action\` (botão de seta para baixo). Isso converte a action ativa numa **strip NLA**.

## Strips: o coração do NLA
Cada strip pode ser **movida** (\`G\`), **escalonada** (\`S\`) e ter \`Repeat\` configurado para tocar várias vezes. Você empilha strips em **tracks** (faixas horizontais), e o Blender mistura tudo de cima para baixo, com modos como \`Replace\`, \`Combine\` e \`Add\`.

## Influência e blending
Cada strip tem \`Influence\` (animável) e configurações de \`Blend In\` / \`Blend Out\` em quadros, criando transições suaves entre animações — exatamente como um **crossfade** em áudio.

Dominar o NLA é o que permite construir **personagens game-ready** com biblioteca de movimentos, e cenas longas onde você reaproveita animações sem reanimar.
    `,
    codes: [
      {
        lang: "atalho",
        code: "G              → mover strip no tempo\nS              → escalar strip (estica/encolhe a animacao)\nN              → painel lateral com Influence, Blend In/Out\nShift + D      → duplicar strip\nTab            → entrar em Tweak Mode (editar a action da strip)",
      },
      {
        lang: "passo-a-passo",
        code: "1. Anime um cubo pulando (10 quadros)\n2. Dope Sheet → Action Editor → renomeie a action para 'Pulo'\n3. Mude o painel para NLA Editor\n4. Clique no botao 'Push Down Action' (seta para baixo)\n5. A action vira uma strip NLA verde\n6. Selecione a strip → N → Strip → Repeat: 5\n7. Aperte Espaco: o cubo pula 5 vezes seguidas",
      },
      {
        lang: "python",
        code: "import bpy\n\nobj = bpy.data.objects[\"Cube\"]\nad = obj.animation_data\n\n# cria nova track NLA\ntrack = ad.nla_tracks.new()\ntrack.name = \"Loop_Pulo\"\n\n# adiciona strip baseada numa action existente\naction = bpy.data.actions[\"Pulo\"]\nstrip = track.strips.new(name=\"PuloStrip\", start=1, action=action)\nstrip.repeat = 5\nstrip.blend_in = 5\nstrip.blend_out = 5\nstrip.extrapolation = 'NOTHING'",
      },
      {
        lang: "config",
        code: "Modos de blend entre tracks:\n  Replace  : a track de cima sobrescreve a de baixo (default)\n  Combine  : soma os valores (otimo para corretivos)\n  Add      : adiciona ao valor existente\n  Subtract : subtrai do valor existente\n  Multiply : multiplica\n\nExtrapolation:\n  Nothing       : strip so toca no intervalo definido\n  Hold          : segura o ultimo valor depois do fim\n  Hold Forward  : segura tambem antes do inicio",
      },
    ],
    points: [
      "**NLA Editor**: organiza animações como strips em camadas, estilo timeline de vídeo",
      "Animação precisa estar como **Action** nomeada antes de virar strip",
      "\`Push Down Action\` converte a action ativa em strip NLA",
      "**Repeat** repete a strip N vezes; **Scale** estica/encolhe no tempo",
      "**Blend In/Out** cria crossfades entre animações (essencial para ciclos)",
      "Modos de blend (\`Replace\`, \`Combine\`, \`Add\`) controlam como tracks se combinam",
      "Armadilha: editar a action no Dope Sheet enquanto há strip NLA ativa pode dar resultado confuso — entre em **Tweak Mode** (\`Tab\` na strip)",
      "Camadas de **corretivos** (track Combine) permitem ajustar uma animação sem modificar o original",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para ciclos de caminhada perfeitos, use \`Repeat\` com \`Blend In/Out = 0\` e garanta que o **último quadro** da action seja idêntico ao primeiro.",
      },
      {
        type: "warning",
        content: "Esquecer de sair do **Tweak Mode** (\`Tab\`) faz parecer que a animação não está sendo modificada. Sempre confira o status no header do NLA.",
      },
      {
        type: "info",
        content: "Em pipelines **game-ready** (Unreal, Unity), cada action vira um clipe de animação separado exportado via FBX/glTF — o NLA é onde você organiza tudo no Blender.",
      },
    ],
  },
  {
    slug: "animar-camera",
    section: "animacao",
    title: "Animando a Câmera",
    difficulty: "iniciante",
    subtitle: "Movimentos de câmera convincentes para qualquer cena.",
    intro: `
A câmera é mais um "personagem" da cena: ela **conta a história** escolhendo o que mostrar e como. Animar câmera no Blender funciona igual a animar qualquer objeto — keyframes de location, rotation e propriedades específicas como \`focal length\` —, mas alguns truques deixam o resultado muito mais cinematográfico.

Há três abordagens principais. A primeira é animar a câmera diretamente com keyframes (rápido, mas difícil de manter cabeça apontada certo). A segunda é usar **constraints**: \`Track To\` ou \`Damped Track\` para sempre olhar para um alvo. A terceira é parentar a câmera num **Empty** (objeto auxiliar invisível) e animar o Empty — o "jeito profissional", porque você separa **posição** de **alvo**.

## Câmera em curva
Combinando o que vimos em **Follow Path** com constraints, você cria voos suaves: a câmera segue uma curva, e uma constraint \`Track To\` faz ela sempre apontar para o personagem. É o segredo de praticamente todo flythrough cinematográfico.

## Animando lente e foco
\`Focal Length\` (em mm) controla zoom; valores baixos (~24mm) dão sensação de espaço, altos (85mm+) achatam e isolam. Anime esse valor para um **dolly zoom** (efeito Vertigo). Animar \`Focus Distance\` no painel \`Depth of Field\` cria foco seguindo o sujeito.

Você verá que dominar câmera é tão importante quanto animar personagens — uma boa cena pode ser arruinada por câmera tremida ou zoom robótico.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Numpad 0       → ver pela camera ativa\nCtrl + Numpad 0 → tornar o objeto selecionado a camera ativa\nN → View → Lock Camera to View → ative para 'voar' com a navegacao\nShift + ` (crase) → walk navigation (WASD) na camera",
      },
      {
        lang: "passo-a-passo",
        code: "1. Add → Empty → Plain Axes (esse sera o 'olhar' da camera)\n2. Selecione a camera, Shift+clique no Empty, Ctrl+P → Object\n3. Selecione a camera; Object Constraint Properties → Add → Track To\n4. Target: o Empty | Track Axis: -Z | Up: Y\n5. Anime a posicao da camera no quadro 1 e no 120\n6. Anime a posicao do Empty separadamente para mudar o foco\n7. Numpad 0 e Espaco para revisar",
      },
      {
        lang: "python",
        code: "import bpy\n\ncam = bpy.data.objects[\"Camera\"]\n\n# anima focal length para dolly zoom\nbpy.context.scene.frame_set(1)\ncam.data.lens = 35.0\ncam.data.keyframe_insert(\"lens\", frame=1)\n\nbpy.context.scene.frame_set(60)\ncam.data.lens = 85.0\ncam.data.keyframe_insert(\"lens\", frame=60)\n\n# ativa depth of field e anima foco\ncam.data.dof.use_dof = True\ncam.data.dof.focus_distance = 5.0\ncam.data.dof.keyframe_insert(\"focus_distance\", frame=1)",
      },
      {
        lang: "config",
        code: "Lentes tipicas (focal length em mm):\n  14-24 : ultra-grande angular, paisagem, distorce muito\n  35    : padrao 'natural', proximo ao olho humano\n  50    : retrato classico\n  85    : retrato fechado, comprime fundo\n  135+  : telephoto, isola sujeito, fundo super borrado\n\nResolucao recomendada (Output Properties):\n  1920x1080 (Full HD) : padrao web/TV\n  3840x2160 (4K UHD)  : cinema/streaming moderno",
      },
    ],
    points: [
      "Câmera é animada como qualquer objeto: location, rotation e propriedades de lente",
      "Pressione \`Numpad 0\` para olhar pela câmera ativa",
      "Use **Empty + Track To** para separar **posição** de **alvo** — fluxo profissional",
      "\`Focal Length\` baixo = grande angular; alto = telephoto",
      "**Dolly Zoom** (efeito Vertigo) = câmera anda enquanto o focal length muda em sentido oposto",
      "\`Lock Camera to View\` permite navegar (\`MMB\`, \`Shift+MMB\`) gravando no própria câmera",
      "Armadilha: animar diretamente a rotação da câmera quase sempre dá tremor — use constraint para alvo",
    ],
    alerts: [
      {
        type: "tip",
        content: "Combine **Follow Path** (na câmera) com **Track To** (mirando num Empty animado) para flythroughs suaves e controláveis. É a receita de praticamente todo cinematic do YouTube.",
      },
      {
        type: "info",
        content: "O **Camera Shake** pode ser adicionado via modificadores de F-Curve (\`Noise\`) na rotação — sutil para tensão, exagerado para explosões.",
      },
      {
        type: "success",
        content: "Ative \`Depth of Field\` na câmera e anime \`Focus Distance\` para foco seguindo o personagem. Pequeno detalhe, **enorme** ganho de cinematografia.",
      },
    ],
  },
  {
    slug: "principios-animacao",
    section: "animacao",
    title: "Os 12 Princípios da Animação",
    difficulty: "iniciante",
    subtitle: "A base teórica que separa animação técnica de animação viva.",
    intro: `
Em 1981, os animadores **Frank Thomas** e **Ollie Johnston** (lendas da Disney) publicaram o livro *The Illusion of Life*, onde formalizaram os **12 princípios da animação**. Quase meio século depois, esses princípios continuam sendo a base de **toda animação que parece viva** — seja em desenho 2D, 3D Pixar ou stop-motion. Saber as ferramentas do Blender sem conhecer esses princípios é como saber tocar um piano sem nunca ter ouvido música.

Os 12 princípios são: **Squash and Stretch**, **Anticipation**, **Staging**, **Straight Ahead/Pose to Pose**, **Follow Through e Overlapping Action**, **Slow In/Slow Out**, **Arcs**, **Secondary Action**, **Timing**, **Exaggeration**, **Solid Drawing** e **Appeal**. Vamos navegar pelos mais práticos para você aplicar **hoje** nos seus projetos.

## Slow In / Slow Out
Coisas reais não começam nem param instantaneamente. Esse princípio se traduz no Blender como **interpolação Bezier** com handles \`Auto Clamped\`. Linear é robótico; Bezier é vivo. Já cobrimos isso no capítulo de interpolação — agora você sabe **por que** existe.

## Anticipation
Antes de saltar, o personagem agacha. Antes de socar, o braço puxa para trás. Sem antecipação, ações parecem **teleporte**. Adicione 4-6 quadros de movimento contrário antes da ação principal.

## Follow Through e Arcs
Cabelos, capas e antenas continuam se movendo **depois** que o corpo parou. E quase nada se move em linha reta na natureza — tudo descreve **arcos**.

Você verá que aplicar esses princípios sobre o conhecimento técnico transforma animações "ok" em animações **memoráveis**.
    `,
    codes: [
      {
        lang: "atalho",
        code: "T              → muda interpolacao (use Bezier para Slow In/Out)\nCtrl + E       → muda easing type (Bounce, Elastic, Back para exageros)\nN no Graph Editor → painel Modifiers → adicione Noise para vida secundaria",
      },
      {
        lang: "passo-a-passo",
        code: "Aplicando Anticipation a um pulo:\n1. Anime o personagem no chao (quadro 1, z=0)\n2. ANTECIPACAO: agache (quadro 6, z=-0.3)\n3. SALTO: alto (quadro 15, z=3)\n4. ATERRISSAGEM: chao (quadro 25, z=0)\n5. SQUASH: comprime ao tocar (quadro 27, scale_z=0.7)\n6. Volta normal (quadro 32, scale_z=1)\n7. No Graph Editor, garanta Bezier + Auto Clamped em todos",
      },
      {
        lang: "python",
        code: "import bpy\n\n# adiciona um modificador Noise numa fcurve para 'overlap' automatico\nobj = bpy.context.active_object\nfor fc in obj.animation_data.action.fcurves:\n    if fc.data_path == \"rotation_euler\" and fc.array_index == 2:\n        mod = fc.modifiers.new(type='NOISE')\n        mod.strength = 0.05    # intensidade pequena\n        mod.scale = 20.0       # frequencia\n        mod.phase = 0.0",
      },
      {
        lang: "config",
        code: "Os 12 principios e onde aplicar no Blender:\n  1. Squash and Stretch  : keyframes de scale\n  2. Anticipation        : poses contra-direcao antes da acao\n  3. Staging             : composicao de camera + iluminacao\n  4. Straight Ahead/PtP  : metodologia de animar (linear vs por poses)\n  5. Follow Through      : delay nos elementos secundarios (cabelo)\n  6. Slow In / Slow Out  : interpolacao Bezier + Auto Clamped\n  7. Arcs                : cuidado com trajetorias retas\n  8. Secondary Action    : movimentos paralelos (respiracao, blink)\n  9. Timing              : controle no Dope Sheet\n 10. Exaggeration        : easing Back/Bounce/Elastic\n 11. Solid Drawing       : modelagem com peso/volume\n 12. Appeal              : design que prende o olho",
      },
    ],
    points: [
      "Os **12 princípios** vêm do livro *The Illusion of Life* (1981) e regem toda animação viva",
      "**Slow In/Out** = interpolação Bezier; \`Linear\` é quase sempre o vilão de animações robóticas",
      "**Anticipation**: 4-6 quadros de movimento contrário antes da ação principal",
      "**Follow Through**: cabelos, panos e cordas continuam se movendo após o corpo parar",
      "**Arcs**: quase nada na natureza se move em linha reta; valide trajetórias no Graph Editor",
      "**Squash and Stretch** dá peso e elasticidade — escala não-uniforme em quadros-chave",
      "Armadilha de iniciante: técnica perfeita + zero princípios = animação **morta**",
    ],
    alerts: [
      {
        type: "tip",
        content: "Antes de finalizar qualquer animação, faça uma **revisão de princípios**: tem antecipação? Tem follow through? Os arcos estão respeitados? Essa checklist eleva muito o nível.",
      },
      {
        type: "info",
        content: "O canal **AlanBeckerTutorials** no YouTube tem uma série gratuita aplicando os 12 princípios — leitura obrigatória para qualquer animador.",
      },
      {
        type: "success",
        content: "Esses princípios funcionam **igualmente** para animação 2D, 3D, motion graphics e até animação de UI. Aprenda uma vez, use para sempre.",
      },
    ],
  },
];
