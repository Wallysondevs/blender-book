import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "armatures-bones",
    section: "rigging",
    title: "Armatures e Bones: o esqueleto digital",
    difficulty: "iniciante",
    subtitle: "Entenda o que são armaduras e ossos, a base de toda animação de personagens.",
    intro: `
No Blender, uma **armature** (em português, "armadura") é um tipo especial de objeto que funciona como o **esqueleto** do seu personagem. Assim como nosso corpo tem ossos que sustentam a pele e os músculos, uma malha 3D (chamada de \`mesh\`) precisa de uma armadura para se mover de forma articulada. Cada peça desse esqueleto é chamada de **bone** (osso), e juntos eles formam uma hierarquia que permite girar um braço, dobrar um joelho ou abrir uma mão.

Antes de existir o conceito de armatures, animadores 3D precisavam mover vértices um por um, ou agrupar partes do modelo em objetos separados. Era tão trabalhoso quanto parece. Softwares como Maya, 3ds Max e Blender adotaram esqueletos digitais inspirados em anatomia real para resolver isso. Hoje, **rigging** é justamente o processo de construir esse esqueleto e prepará-lo para receber animação.

## Anatomia de um bone
Cada osso tem três pontos importantes: a **head** (cabeça, onde o osso "começa"), o **tail** (rabo, onde ele "termina") e o **roll** (a rotação ao redor do próprio eixo). Você verá esses três conceitos voltando a todo momento. A cabeça de um osso pode ser conectada à ponta de outro, criando uma cadeia hierárquica — exatamente como o úmero, o rádio e a ulna formam o braço humano.

## Modos de uma armature
Uma armature tem três modos de edição: \`Object Mode\` (mover a armadura inteira), \`Edit Mode\` (criar e posicionar ossos) e \`Pose Mode\` (testar e animar poses). Confundir esses modos é um dos erros mais comuns no início — guarde bem essa distinção, porque vamos usá-la o tempo todo daqui pra frente.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Abra um arquivo novo e apague o cubo padrão (X)\n2. Vá em Add > Armature > Single Bone\n3. Entre em Edit Mode (Tab) para ver a head e o tail\n4. Selecione o tail e pressione E para extrudar um novo osso\n5. Volte para Object Mode (Tab) e teste no Pose Mode (Ctrl+Tab)" },
      { lang: "atalho", code: "Tab        → alterna Object/Edit Mode\nCtrl+Tab   → entra/sai do Pose Mode\nE          → extrudar novo bone a partir do tail\nShift+D    → duplicar bone selecionado\nAlt+P      → desconectar (clear parent)\nCtrl+P     → conectar a outro bone (set parent)" },
      { lang: "python", code: "import bpy\n\n# Cria uma armature simples via script\nbpy.ops.object.armature_add(location=(0, 0, 0))\narmature = bpy.context.object\narmature.name = \"Esqueleto\"\n\n# Entra em Edit Mode para adicionar mais ossos\nbpy.ops.object.mode_set(mode='EDIT')\nedit_bones = armature.data.edit_bones\nnovo = edit_bones.new(\"Antebraço\")\nnovo.head = (0, 0, 1)\nnovo.tail = (0, 0, 2)\nbpy.ops.object.mode_set(mode='OBJECT')" },
      { lang: "config", code: "Viewport Display > In Front: ON     # mostra ossos por cima da malha\nViewport Display > Display As: Octahedral  # forma padrão do bone\nViewport Display > Names: ON         # exibe nomes dos ossos\nViewport Display > Axes: ON          # mostra eixos locais" },
    ],
    points: [
      "**Armature** é o objeto-esqueleto; **bones** são as peças individuais dentro dele",
      "Todo bone tem **head**, **tail** e **roll** — memorize isso desde já",
      "Existem três modos: Object, Edit e Pose. Cada um faz uma coisa diferente",
      "Ative \`In Front\` na armadura para enxergar os ossos através da malha",
      "Nomeie cada osso desde o início (\`braço.L\`, \`braço.R\`) — você vai agradecer depois",
      "Armadilha comum: tentar animar no Edit Mode. Animação acontece no **Pose Mode**",
      "Bones conectados (cabeça grudada na ponta do pai) se movem juntos automaticamente",
    ],
    alerts: [
      { type: "tip", content: "Use o sufixo \`.L\` e \`.R\` nos nomes dos ossos (ex: \`mão.L\`). O Blender reconhece e permite **espelhar poses** automaticamente." },
      { type: "warning", content: "Não confunda \`Edit Mode\` com \`Pose Mode\`. Editar a posição dos bones em Edit Mode altera o **rest pose** e quebra animações já feitas." },
      { type: "info", content: "Armatures são apenas estrutura — sozinhas elas não deformam nada. No próximo capítulo veremos como ligá-las à malha." },
    ],
  },
  {
    slug: "parent-mesh-armature",
    section: "rigging",
    title: "Parent: ligando a malha ao esqueleto",
    difficulty: "iniciante",
    subtitle: "Aprenda a fazer a malha do seu personagem seguir os ossos da armadura.",
    intro: `
Você criou uma armadura linda, mas quando move um osso… nada acontece com o personagem. Isso é normal! A **malha** (mesh) e a **armadura** ainda são dois objetos independentes. Para que a malha "obedeça" aos bones, precisamos criar uma relação de **parentesco** (parenting) entre os dois, com um modificador especial chamado **Armature Modifier**.

O parenting no Blender funciona como uma relação pai-filho: o filho herda transformações do pai. No caso de personagens, queremos que cada parte da malha siga um osso específico — e para isso o Blender oferece três métodos principais de parenting com armature.

## Os três métodos de parent
O primeiro, \`With Empty Groups\`, cria grupos de vértices vazios com o nome de cada osso, deixando você pintar pesos manualmente depois. O segundo, \`With Envelope Weights\`, usa cápsulas invisíveis ao redor dos bones para influenciar vértices próximos — rápido, mas impreciso. O terceiro e mais usado é \`With Automatic Weights\`, que tenta calcular sozinho quais vértices pertencem a cada osso, baseado em proximidade e volume.

## O que acontece por baixo dos panos
Quando você faz o parent, o Blender adiciona um **Armature Modifier** na malha apontando para a armadura, e cria automaticamente **vertex groups** (grupos de vértices) com o mesmo nome dos bones. Cada vértice recebe um **peso** entre 0 e 1, indicando o quanto ele segue cada osso. Esse sistema de pesos é o coração da deformação — e é o que vamos refinar no próximo capítulo, com o Weight Paint.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Selecione PRIMEIRO a malha (mesh) do personagem\n2. SHIFT+clique na armature (ela deve ficar com contorno claro)\n3. Pressione Ctrl+P\n4. Escolha \"Armature Deform > With Automatic Weights\"\n5. Entre no Pose Mode da armature e teste girando um bone (R)" },
      { lang: "atalho", code: "Ctrl+P              → menu de parent\nAlt+P               → remover parent\nCtrl+Tab            → entrar/sair do Pose Mode\nR depois X/Y/Z      → girar bone em eixo específico\nAlt+R               → resetar rotação do bone (volta à rest pose)" },
      { lang: "python", code: "import bpy\n\n# Faz parent de mesh para armature com automatic weights\nmesh = bpy.data.objects[\"Personagem\"]\narmature = bpy.data.objects[\"Esqueleto\"]\n\n# A ordem importa: mesh selecionada, armature ativa\nbpy.ops.object.select_all(action='DESELECT')\nmesh.select_set(True)\narmature.select_set(True)\nbpy.context.view_layer.objects.active = armature\n\nbpy.ops.object.parent_set(type='ARMATURE_AUTO')" },
      { lang: "config", code: "# Modificador Armature aparece automaticamente após o parent\nObject: Esqueleto              # qual armature controla\nVertex Groups: (vazio)         # usa todos os grupos por nome\nPreserve Volume: ON            # melhora deformação em rotações grandes\nDeform: Bone Envelopes: OFF    # desliga envelope se usa pesos" },
    ],
    points: [
      "**Ordem do clique importa**: malha primeiro, armature depois. O ativo (último selecionado) vira o pai",
      "**Automatic Weights** é o ponto de partida ideal para iniciantes",
      "O parent cria um **Armature Modifier** na malha — você pode editar suas opções depois",
      "Cada bone gera um **vertex group** com o mesmo nome dentro da malha",
      "Se um vértice não estiver em nenhum grupo, ele fica parado mesmo quando o esqueleto se move",
      "Armadilha: aplicar Scale na malha sem aplicar na armature causa deformações estranhas",
      "**Alt+R** no Pose Mode devolve o bone à posição original (rest pose)",
    ],
    alerts: [
      { type: "warning", content: "Antes do parent, **aplique todas as transformações** com \`Ctrl+A > All Transforms\` em ambos os objetos. Escala não-1 quebra deformações." },
      { type: "tip", content: "Se o automatic weights deformar errado em alguma região, **não comece do zero**: vá no próximo capítulo e ajuste no Weight Paint." },
      { type: "info", content: "O \`Armature Modifier\` pode ser combinado com Subdivision Surface — só lembre de deixar o Armature **antes** do Subsurf na pilha." },
    ],
  },
  {
    slug: "weight-paint",
    section: "rigging",
    title: "Weight Paint: refinando a influência dos ossos",
    difficulty: "iniciante",
    subtitle: "Pinte com a precisão de um cirurgião quais vértices cada bone controla.",
    intro: `
O **Weight Paint** (pintura de pesos) é onde você diz, vértice por vértice, o quanto cada osso influencia cada parte da malha. Imagine que cada bone tem um "campo de força" — e você está usando um pincel para definir esse campo. Pesos vão de **0** (vermelho ausente, ou seja, azul escuro: nenhuma influência) a **1** (vermelho intenso: influência total). Tons intermediários — verde, amarelo, laranja — representam influência parcial.

Esse modo existe porque o **Automatic Weights** do capítulo anterior, embora útil, raramente acerta tudo. Cotovelos esmagados, dedos colados, pescoço puxando ombro — todos esses problemas são resolvidos repintando pesos com calma. Outros softwares chamam isso de "skinning"; o conceito é o mesmo.

## Como entrar e usar
Selecione a malha, depois **shift+clique na armature**, e mude o modo para \`Weight Paint\`. Agora, com a armature visível, você pode \`Ctrl+clicar\` em um bone para selecionar o **vertex group** correspondente. O pincel pinta no grupo daquele osso.

## Ajustes essenciais do pincel
A barra superior tem três valores cruciais: \`Weight\` (peso a aplicar, 0 a 1), \`Radius\` (tamanho do pincel) e \`Strength\` (intensidade por pincelada). Use \`F\` para mudar o raio interativamente e \`Shift+F\` para a força. O modo \`Subtract\` (segurando \`Ctrl\`) tira peso em vez de adicionar. E não esqueça do botão **Auto Normalize**, que garante que a soma dos pesos de cada vértice nunca passe de 1 — essencial para deformações limpas.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Selecione a malha\n2. SHIFT+clique na armature\n3. Mude o modo para \"Weight Paint\" no menu superior esquerdo\n4. Ative \"Auto Normalize\" no painel Tool\n5. Ctrl+clique num bone para focar no peso dele\n6. Pinte aumentando (clique) ou diminuindo (Ctrl+clique)\n7. Teste no Pose Mode girando o bone (R)" },
      { lang: "atalho", code: "F             → mudar raio do pincel\nShift+F       → mudar força (strength)\nCtrl+clique   → pintar subtraindo peso\nN             → abre painel lateral (sliders precisos)\nCtrl+clique no bone → seleciona vertex group\nWireframe (Z) → ver vértices através da malha" },
      { lang: "python", code: "import bpy\n\nmesh = bpy.data.objects[\"Personagem\"]\n\n# Lista todos os vertex groups (geralmente um por bone)\nfor vg in mesh.vertex_groups:\n    print(vg.name, vg.index)\n\n# Atribui peso 1.0 ao vértice 42 no grupo \"braço.L\"\ngrupo = mesh.vertex_groups[\"braço.L\"]\ngrupo.add([42], 1.0, 'REPLACE')   # tipos: REPLACE, ADD, SUBTRACT" },
      { lang: "config", code: "# Painel Tool no Weight Paint\nWeight: 1.0              # valor a pintar\nRadius: 50               # tamanho do pincel em pixels\nStrength: 0.5            # acúmulo por pincelada\nAuto Normalize: ON       # mantém soma dos pesos = 1\nFalloff: Smooth          # bordas suaves do pincel\nMirror X: ON             # pinta espelhado em personagens simétricos" },
    ],
    points: [
      "Cores indicam peso: **azul** = 0, **verde/amarelo** = parcial, **vermelho** = 1",
      "**Auto Normalize** evita que vértices recebam mais peso total do que 1.0",
      "**Mirror X** economiza metade do trabalho em personagens simétricos com nomes \`.L\`/\`.R\`",
      "Use \`Ctrl+clique\` num bone (com armature visível) para pular para o grupo certo",
      "Sempre **teste no Pose Mode** após pintar — gire o bone para ver a deformação",
      "Armadilha: pintar com Auto Normalize OFF cria vértices com soma >1, deformações elásticas estranhas",
      "Ative o **X-Ray** (Alt+Z) para alcançar vértices escondidos atrás da malha",
    ],
    alerts: [
      { type: "tip", content: "Comece com pinceladas suaves (Strength 0.3) e vá refinando. **Pintar peso 1.0 de cara** quase sempre cria transições duras." },
      { type: "warning", content: "Não delete vertex groups achando que vai \"limpar\" a malha. Cada grupo é a memória de um bone — sem ele, aquela parte para de se mover." },
      { type: "success", content: "O atalho \`F\` para mudar tamanho do pincel é universal: funciona em Weight Paint, Sculpt, Texture Paint e Vertex Paint." },
    ],
  },
  {
    slug: "ik-vs-fk",
    section: "rigging",
    title: "IK vs FK: dois jeitos de mover articulações",
    difficulty: "iniciante",
    subtitle: "Entenda quando girar bone por bone e quando deixar o computador calcular.",
    intro: `
Quando você anima um braço, existem dois métodos fundamentais de controle: **FK** (Forward Kinematics, cinemática direta) e **IK** (Inverse Kinematics, cinemática inversa). A diferença entre eles vai mudar completamente a forma como você anima — e entender isso cedo poupa muita frustração.

No **FK**, você gira cada bone manualmente, do ombro para a mão. Move o ombro → o braço inteiro segue. Move o cotovelo → antebraço e mão seguem. É como mover marionete por marionete. Já no **IK**, você simplesmente **agarra a mão e arrasta** — o Blender calcula automaticamente como o cotovelo e o ombro precisam girar para chegar lá. É como pegar o controle remoto da TV: a mão decide, o resto se ajeita.

## Quando usar cada um
**FK** é ideal para movimentos de "arco amplo": acenar, dar tchau, lançar uma bola — qualquer ação onde a trajetória do braço importa mais que onde a mão termina. **IK** brilha quando a mão precisa ficar fixa em um ponto: apoiar na parede, segurar uma maçaneta, andar com os pés grudados no chão. Por isso, **pés sempre usam IK** em rigs de personagem.

## Como o IK funciona no Blender
O IK no Blender é um **constraint** (restrição) chamado \`IK Solver\`, aplicado ao bone da mão (ou do pé). Ele precisa de um **chain length** (quantos bones acima participam do cálculo) e geralmente de um **pole target** — um bone-alvo que indica para onde o cotovelo deve apontar, evitando que ele fique apontando para qualquer direção aleatória.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. No Pose Mode, selecione o bone da mão\n2. Vá em Bone Constraint Properties (ícone de osso com corrente)\n3. Add Bone Constraint > Inverse Kinematics\n4. Defina Chain Length: 2 (antebraço + braço)\n5. Crie um bone separado para o pole (cotovelo) e atribua em Pole Target\n6. Teste arrastando a mão (G) — o braço dobra sozinho!" },
      { lang: "atalho", code: "G              → mover bone (com IK, todo o braço se ajusta)\nR              → girar (modo FK puro)\nAlt+G          → resetar posição\nAlt+R          → resetar rotação\nI              → inserir keyframe na pose atual" },
      { lang: "python", code: "import bpy\n\narm = bpy.data.objects[\"Esqueleto\"]\nbpy.ops.object.mode_set(mode='POSE')\n\n# Adiciona IK constraint ao bone da mão\nmao = arm.pose.bones[\"mão.L\"]\nik = mao.constraints.new('IK')\nik.target = arm\nik.subtarget = \"mão.L.IK\"   # bone alvo (controle)\nik.chain_count = 2          # antebraço + braço\nik.pole_target = arm\nik.pole_subtarget = \"cotovelo.L.pole\"\nik.pole_angle = -1.5708     # -90° em radianos" },
      { lang: "config", code: "# IK Constraint - propriedades essenciais\nTarget: Esqueleto                # qual armature\nBone: mão.L.IK                   # bone-controle a perseguir\nPole Target: cotovelo.L.pole     # para onde aponta o cotovelo\nChain Length: 2                  # 0 = cadeia toda (perigoso)\nUse Tail: ON\nWeight Position: 1.0\nWeight Rotation: 0.0             # geralmente 0 para braços" },
    ],
    points: [
      "**FK**: gira osso por osso, da raiz para a ponta. Bom para arcos e gestos amplos",
      "**IK**: arrasta a ponta, o resto se ajusta. Bom para mãos/pés fixos no espaço",
      "Pés **sempre** ganham IK — sem isso, andar fica horrível",
      "**Chain Length** define até onde o IK propaga. Deixar 0 (cadeia toda) costuma travar a coluna",
      "**Pole target** evita que o cotovelo/joelho aponte para direções estranhas",
      "Rigs profissionais oferecem **switch IK/FK** no mesmo membro, com slider 0–1",
      "Armadilha: esquecer de criar o bone-controle separado para o IK. O bone deformador não pode ser alvo de si mesmo",
    ],
    alerts: [
      { type: "info", content: "O atalho **Auto IK** (no painel Tool do Pose Mode) ativa um IK temporário só para esticar e posicionar bones — útil em poses estáticas." },
      { type: "warning", content: "Sempre defina **Chain Length** maior que 0. Deixar 0 faz o IK afetar a hierarquia inteira até a raiz, e a coluna do personagem vira espaguete." },
      { type: "tip", content: "Para descobrir o **Pole Angle** correto, posicione o pole target e clique no botão \`Set Pole Angle\` (atalho disponível no painel N do Pose Mode em versões recentes)." },
    ],
  },
  {
    slug: "rigify-intro",
    section: "rigging",
    title: "Rigify: o gerador de rigs do Blender",
    difficulty: "iniciante",
    subtitle: "Use a addon oficial para criar rigs profissionais em minutos, sem montar bone por bone.",
    intro: `
Montar um rig completo do zero — com IK nos braços e pernas, FK alternativo, controles para olhos, sobrancelhas e mandíbula — pode levar dias. O **Rigify** é uma addon **oficial** do Blender que faz tudo isso para você em segundos. Ele já vem instalado: basta ativar em \`Edit > Preferences > Add-ons > Rigging: Rigify\`.

A ideia do Rigify é simples e brilhante. Você adiciona uma **meta-rig** (um esqueleto-modelo já com a estrutura humana ou de animal pronta), ajusta os bones para encaixar no seu personagem, e depois clica em **Generate Rig**. O Blender constrói automaticamente um rig completo, com controles bonitos, IK/FK switch, stretchy bones, controles faciais — tudo o que um rig de estúdio teria.

## Tipos de meta-rig
No menu \`Add > Armature\`, com Rigify ativo, aparecem várias opções: \`Human (Meta-Rig)\` para humanos completos, \`Basic Human\` para versões simplificadas, e várias para criaturas (\`Cat\`, \`Wolf\`, \`Horse\`, \`Bird\`). Você escolhe a base e adapta.

## O fluxo de trabalho
O processo é: **adicionar meta-rig → ajustar bones em Edit Mode → fazer parent da malha → clicar em Generate Rig**. Depois de gerado, você praticamente esquece da meta-rig e anima usando o rig final. Se precisar mudar algo estrutural, edita a meta-rig e gera de novo.

Este capítulo vai te ensinar o caminho rápido. Para entender o que o Rigify faz por baixo do capô — e construir seus próprios sistemas — veremos os \`Custom Controllers\` no próximo capítulo.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Edit > Preferences > Add-ons > busque \"Rigify\" e ative\n2. Add > Armature > Human (Meta-Rig)\n3. Entre em Edit Mode e ajuste cada bone para o corpo do personagem\n4. Use o atalho Shift+E para espelhar (precisa nomes .L/.R corretos)\n5. Volte para Object Mode\n6. Em Object Data Properties (boneco verde), role até \"Rigify\"\n7. Clique em \"Generate Rig\" — pronto, seu rig está criado!\n8. Faça parent da malha ao novo rig com Ctrl+P > With Automatic Weights" },
      { lang: "atalho", code: "Shift+E         → espelhar bones (precisa sufixo .L/.R)\nCtrl+N          → recalcular roll dos bones\nNumpad 1/3/7    → vistas frontal/lateral/topo (essencial pra alinhar)\nAlt+A           → desfazer ações dentro do Edit Mode\nN               → painel lateral com Item, Bone, Rigify" },
      { lang: "python", code: "import bpy\n\n# Adiciona uma meta-rig humana via script\nbpy.ops.object.armature_human_metarig_add()\nmetarig = bpy.context.object\nmetarig.name = \"MetaRig_MeuPersonagem\"\n\n# Após posicionar, gerar o rig final\n# (geralmente feito por botão; aqui o equivalente em código)\nbpy.ops.pose.rigify_generate()" },
      { lang: "config", code: "# Após Generate Rig, você terá:\nObjeto: rig                       # o rig final pronto pra animar\nObjeto: MetaRig_MeuPersonagem     # mantenha — serve pra regerar\n\n# Camadas do rig final (Bone Collections em versões 4.x):\n- Face                # controles faciais\n- Torso (IK / FK)     # coluna e quadril\n- Arm.L / Arm.R       # com switch IK/FK\n- Leg.L / Leg.R       # com switch IK/FK\n- Fingers             # detalhe de mãos" },
    ],
    points: [
      "Rigify é **oficial** e gratuito — está dentro do Blender, basta ativar",
      "Você trabalha com a **meta-rig** (modelo simplificado), gera o rig final em um clique",
      "**Não anime na meta-rig** — ela serve só de molde. Animação acontece no rig gerado",
      "Mudanças estruturais? Edite a meta-rig e clique em \`Generate Rig\` de novo",
      "O rig gerado tem **switch IK/FK** pronto, com slider \`IK_FK\` em cada membro",
      "Armadilha: posicionar bones com escala diferente de 1. Sempre aplique \`Ctrl+A > Scale\` antes",
      "Para rosto, use a meta-rig completa (com olhos, mandíbula, sobrancelhas) — não a Basic Human",
    ],
    alerts: [
      { type: "tip", content: "Use **Numpad 1** (vista frontal) e **Numpad 3** (lateral) para alinhar os bones com precisão. Tentar alinhar em vista perspectiva é receita pra desastre." },
      { type: "info", content: "Rigify também funciona como **base de aprendizado**: estude o rig gerado para ver como profissionais resolvem switches, drivers e custom shapes." },
      { type: "warning", content: "Se aparecer erro \"\`Bone X has no parent\`\" ao gerar, provavelmente você apagou um bone obrigatório da meta-rig. Comece de novo a partir de uma meta-rig limpa." },
    ],
  },
  {
    slug: "custom-controllers",
    section: "rigging",
    title: "Custom Controllers: criando seus próprios controles",
    difficulty: "intermediario",
    subtitle: "Substitua os ossos por formas customizadas e construa rigs com cara profissional.",
    intro: `
Se você abrir um rig de estúdio (Pixar, Blender Studio, MPC), vai notar que os animadores não veem ossos em formato de octaedro: eles veem **círculos, setas, quadrados, formas estilizadas** ao redor do personagem. Esses são os **custom controllers** (controles customizados), também chamados de **custom shapes** — e são essenciais por dois motivos: **clareza visual** (você sabe onde clicar) e **proteção** (você não toca por engano em bones que só deformam).

A ideia é simples: cada bone pode ter sua aparência substituída por qualquer objeto mesh do cena. Você cria um círculo, dá o nome \`CTRL_quadril\`, e diz para o bone do quadril usar esse círculo como visual. O bone continua funcionando, mas aparece como um círculo elegante.

## A arquitetura DEF/MCH/CTRL
Rigs profissionais separam ossos em três categorias por convenção: **DEF** (deform — deformam a malha), **MCH** (mechanism — engrenagens internas, invisíveis) e **CTRL** (control — o que o animador toca). A malha tem grupos de vértices apenas para os DEF; os CTRL controlam os DEF via constraints e drivers; os MCH ficam no meio como tradutores. Essa separação é o segredo de rigs limpos e fáceis de manter.

## Custom shapes na prática
No \`Bone Properties > Viewport Display > Custom Object\`, escolha o objeto mesh que será o visual. Ajuste \`Scale\`, \`Translation\` e \`Rotation\` para encaixar no lugar certo. Use **Wireframe Display** nesse objeto para que ele apareça como linha, não como sólido — fica mais bonito.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Crie um círculo: Add > Mesh > Circle (32 vértices)\n2. Renomeie para \"CTRL_shape_circle\"\n3. Mova para uma layer/coleção escondida (por convenção)\n4. Selecione o bone do quadril em Pose Mode\n5. Bone Properties > Viewport Display > Custom Object: CTRL_shape_circle\n6. Ative Wireframe no objeto da forma\n7. Ajuste Custom Shape Scale até ficar do tamanho ideal" },
      { lang: "atalho", code: "M             → mover bone para outra Bone Collection\nCtrl+L        → linkar dados entre objetos selecionados\nN             → painel para ver Custom Shape Scale\nH             → esconder bone selecionado no Pose Mode\nAlt+H         → mostrar todos os bones escondidos" },
      { lang: "python", code: "import bpy\n\narm = bpy.data.objects[\"Esqueleto\"]\nshape = bpy.data.objects[\"CTRL_shape_circle\"]\n\nbpy.ops.object.mode_set(mode='POSE')\n\n# Atribui custom shape ao bone do quadril\nbone = arm.pose.bones[\"CTRL_quadril\"]\nbone.custom_shape = shape\nbone.custom_shape_scale_xyz = (1.5, 1.5, 1.5)\nbone.use_custom_shape_bone_size = False\n\n# Cor do bone (override visual)\nbone.color.palette = 'THEME04'   # azul" },
      { lang: "config", code: "# Convenções de nomenclatura\nDEF-braço.L      → deforma a malha (vertex group existe)\nMCH-stretch.L    → engrenagem interna (sem deformação)\nCTRL_braço.L     → controle visível para o animador\n\n# Bone Collections (substituem layers em Blender 4.x)\n- DEF             # escondida na maioria do tempo\n- MCH             # escondida sempre\n- CTRL_Body       # visível na animação corporal\n- CTRL_Face       # visível na animação facial" },
      { lang: "shell", code: "# Dica: estude rigs prontos para entender padrões\n# Baixe o rig Rain ou Snow do Blender Studio:\n# https://studio.blender.org/characters/" },
    ],
    points: [
      "**Custom shapes** trocam a aparência do bone por qualquer mesh — clareza visual gigante",
      "Convenção **DEF/MCH/CTRL** separa o que deforma, o que conecta e o que o animador toca",
      "Apenas bones **DEF** devem ter vertex groups na malha. Os outros não precisam",
      "Coloque shapes em uma **coleção escondida** para não poluir a viewport",
      "Use **Wireframe Display** nos meshes de shape — ficam como linhas, não sólidos",
      "Cores de bone (Bone Color) ajudam a identificar lados e funções rapidamente",
      "Rigs robustos têm **constraints** ligando CTRL→DEF, nunca animação direta no DEF",
    ],
    alerts: [
      { type: "tip", content: "Crie uma **biblioteca pessoal** de custom shapes (\`shapes_lib.blend\`) e linke (\`File > Link\`) em projetos novos. Reutilizar economiza horas." },
      { type: "info", content: "Em Blender 4.x, **Bone Layers** foram substituídas por **Bone Collections**. O conceito é o mesmo, só com nome novo e mais flexível." },
      { type: "warning", content: "Se um custom shape \"some\" no Pose Mode, geralmente é porque o objeto-shape foi apagado ou movido para coleção excluída. Sempre **mantenha as shapes no arquivo**." },
    ],
  },
  {
    slug: "andar-personagem",
    section: "rigging",
    title: "Animando um andar simples",
    difficulty: "intermediario",
    subtitle: "Construa um ciclo de caminhada (walk cycle) usando as poses-chave clássicas da animação.",
    intro: `
O **walk cycle** (ciclo de caminhada) é o exercício mais clássico — e mais difícil — da animação 3D. Animadores tradicionais resolveram esse problema há décadas, e o segredo é dividir o movimento em **poses-chave** específicas que se repetem. Dominar essas poses é o que separa um andar robótico de um andar com personalidade.

Um ciclo completo de caminhada tem **quatro poses principais**: \`Contact\` (pé toca o chão), \`Down\` (peso afunda no pé apoiado), \`Passing\` (perna livre passa pela perna apoiada), e \`Up\` (impulso para o próximo passo). Cada uma se repete espelhada para o outro pé. Em 24fps, um ciclo confortável dura **24 frames** (1 segundo) — meio segundo por pé.

## Por que ciclos são importantes
Em vez de animar um personagem andando 10 metros, você anima **1 ciclo** e o repete. Combinado com um sistema de \`Root Motion\` (o quadril desliza para frente), o personagem caminha indefinidamente sem repetição visível. Jogos usam essa técnica desde sempre, e o cinema 3D também a usa em sequências longas.

## Estrutura prática no Blender
Você vai usar o **Pose Mode** com keyframes (atalho \`I\`) na **Dope Sheet** ou **Action Editor**. Ative \`Auto Keying\` para criar keyframes automaticamente ao mover bones. Defina os frames: 1 (Contact direito), 4 (Down), 8 (Passing), 12 (Up + Contact esquerdo), e assim até o frame 24 — que deve ser igual ao frame 1 para o loop fechar perfeitamente.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Defina o range da timeline: Start 1, End 24\n2. No Pose Mode, vá ao frame 1 e crie a pose Contact (pé direito à frente)\n3. Selecione todos os bones de controle (A) e pressione I > Whole Character\n4. Vá ao frame 4: ajuste para Down (quadril mais baixo)\n5. Frame 8: pose Passing (perna direita passa pela esquerda)\n6. Frame 12: Contact espelhado (pé esquerdo à frente)\n7. Frame 24: copie a pose do frame 1 (Ctrl+C / Ctrl+V no Pose Library)\n8. Aperte Spacebar pra ver o loop rodando" },
      { lang: "atalho", code: "I                  → inserir keyframe\nAlt+I              → remover keyframe\nCtrl+C / Ctrl+V    → copiar/colar pose\nCtrl+Shift+V       → colar pose espelhada (.L vira .R)\nA                  → selecionar todos os bones\nSpacebar           → play/pause da animação\nShift+← / Shift+→  → ir para o primeiro/último frame" },
      { lang: "python", code: "import bpy\n\narm = bpy.data.objects[\"rig\"]\nbpy.ops.object.mode_set(mode='POSE')\n\n# Define range da animação\nbpy.context.scene.frame_start = 1\nbpy.context.scene.frame_end = 24\n\n# Insere keyframe em todos os bones de controle no frame atual\nbpy.context.scene.frame_set(1)\nfor bone in arm.pose.bones:\n    if bone.name.startswith(\"CTRL_\"):\n        bone.keyframe_insert(data_path=\"location\")\n        bone.keyframe_insert(data_path=\"rotation_euler\")" },
      { lang: "config", code: "# Configurações da Action para ciclo perfeito\nAction Editor > Push Down               # arquiva como NLA strip\nNLA > Repeat: 4                         # repete o ciclo 4x\nNLA > Action Length: 24 frames\n\n# F-Curve Modifier para loop infinito\nGraph Editor > F-Curve Modifiers > Add: Cycles\n  Before: Repeat with Offset\n  After: Repeat with Offset" },
    ],
    points: [
      "**Quatro poses-chave**: Contact, Down, Passing, Up — repetem espelhadas para o outro pé",
      "Em 24fps, um ciclo natural dura **24 frames** (12 por passo)",
      "**Frame inicial = frame final**: o loop só fecha se as poses coincidirem",
      "Use \`Ctrl+Shift+V\` (paste mirrored) para espelhar poses entre lados \`.L\`/\`.R\`",
      "Ative **Auto Keying** (botão de círculo vermelho na timeline) para gravar mudanças automaticamente",
      "Armadilha: animar o quadril com \`location\` X positivo. Em ciclo, o quadril fica parado — quem se move é o **mundo**, ou o root depois",
      "Use **F-Curve Modifier > Cycles** para loop infinito sem duplicar keyframes",
    ],
    alerts: [
      { type: "tip", content: "Estude vídeos de **walk cycles** em referência real (Richard Williams, \"The Animator's Survival Kit\"). As poses são universais: a teoria vale para 2D, 3D e stop-motion." },
      { type: "warning", content: "Não esqueça do **arco vertical do quadril**: ele sobe no Passing e desce no Down. Quadril em linha reta = personagem flutuando." },
      { type: "success", content: "Quando o loop estiver pronto, pressione **Spacebar** e veja por 30 segundos. Se você não quiser desviar o olhar, está bom. Se enjoar, refine os timings." },
    ],
  },
  {
    slug: "lip-sync-basico",
    section: "rigging",
    title: "Lip-sync básico: sincronizando boca com áudio",
    difficulty: "avancado",
    subtitle: "Aprenda a fazer um personagem \"falar\" usando shape keys e fonemas-chave.",
    intro: `
**Lip-sync** é o processo de sincronizar o movimento da boca de um personagem com uma faixa de áudio falada. Não é mágica nem inteligência artificial obrigatória: é técnica antiga, baseada em **fonemas visuais** chamados **visemes**. Felizmente, o ouvido humano é generoso — você não precisa que cada som tenha boca perfeita; precisa apenas dos **fonemas-chave** caindo nos frames certos.

A maioria dos animadores usa um conjunto reduzido de 8 a 12 visemes que cobrem quase todos os sons da fala. Os mais importantes em português são: **AA** (boca aberta, "ah"), **EE** (sorriso largo, "ê"), **OO** (boca redonda, "ô"), **MM/BB/PP** (lábios fechados), **FF/VV** (lábio inferior tocando dentes superiores), **TH/SS** (dentes à mostra), **L** (língua para cima) e **rest** (boca relaxada).

## Shape Keys: a base técnica
No Blender, cada viseme vira uma **shape key** (também chamada de \`blend shape\` ou \`morph target\`). Você esculpe a boca em cada formato e o Blender interpola entre eles. Cada shape tem um valor de 0 a 1, animável com keyframes na timeline.

## O fluxo de trabalho
Importe o áudio na timeline (\`Add > Sound\`), ative o **waveform** para ver os picos sonoros, e use o **scrub** (arrastar o cursor de tempo) para ouvir frame a frame. Identifique cada fonema-chave, vá ao frame correspondente e ajuste os sliders das shape keys. Adicione transições suaves: visemes mudam a cada 4–8 frames em fala normal — mais rápido que isso vira tremor, mais lento parece preguiça.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Esculpa cada viseme como shape key:\n   - Object Data Properties > Shape Keys > Basis (a base)\n   - + para adicionar AA, depois esculpa em Edit Mode\n   - Repita para EE, OO, MM, FF, etc.\n2. Add > Sound > escolha o arquivo .wav/.mp3\n3. Na timeline: View > Show Waveforms\n4. Ative Sync: AV-sync e Audio Scrubbing nas preferências\n5. Vá frame por frame, identifique fonemas e anime os sliders\n6. Use Auto Keying para gravar automaticamente\n7. Suavize na Graph Editor (F-Curves)" },
      { lang: "atalho", code: "Tab            → Edit Mode (esculpir shape key)\nI              → keyframe no slider da shape\n← / →          → frame a frame\nShift+← / →    → primeiro/último frame\nCtrl+Espaço    → maximizar/minimizar área da timeline\nN              → painel da timeline com sync e waveform" },
      { lang: "python", code: "import bpy\n\nmesh = bpy.data.objects[\"Personagem\"]\nshape_keys = mesh.data.shape_keys.key_blocks\n\n# Anima a shape key \"AA\" do frame 10 ao 14\nshape_keys[\"AA\"].value = 0.0\nshape_keys[\"AA\"].keyframe_insert(\"value\", frame=8)\nshape_keys[\"AA\"].value = 1.0\nshape_keys[\"AA\"].keyframe_insert(\"value\", frame=12)\nshape_keys[\"AA\"].value = 0.0\nshape_keys[\"AA\"].keyframe_insert(\"value\", frame=16)\n\n# Adiciona uma faixa de áudio na timeline\nbpy.ops.sound.open(filepath=\"//audio/dialogo.wav\")" },
      { lang: "config", code: "# Lista mínima de visemes para PT-BR\nAA   → \"a\", \"ã\" (boca aberta vertical)\nEE   → \"e\", \"é\" (sorriso largo)\nII   → \"i\" (lábios estreitos)\nOO   → \"o\", \"ô\" (boca arredondada média)\nUU   → \"u\" (boca arredondada estreita)\nMBP  → \"m\", \"b\", \"p\" (lábios totalmente fechados)\nFV   → \"f\", \"v\" (lábio inferior nos dentes)\nTHS  → \"t\", \"d\", \"s\" (dentes visíveis)\nL    → \"l\", \"n\" (língua no céu da boca)\nREST → boca neutra/relaxada" },
      { lang: "shell", code: "# Ferramenta auxiliar: Rhubarb Lip Sync (gratuita, externa)\n# Analisa o áudio e gera lista de visemes com timing\n# Existe addon \"Rhubarb Lipsync NG\" para Blender\n# https://github.com/Premik/Blender-Rhubarb-Lipsync-NG" },
    ],
    points: [
      "**Visemes** são poses visuais da boca, não fonemas sonoros. Sons parecidos compartilham viseme",
      "**8 a 12 shape keys** cobrem 95% das falas em português",
      "**Fonemas-chave caem nos picos**: aplique keyframe nos momentos de impacto sonoro",
      "Use **waveform na timeline** para ver onde estão os picos sem precisar ouvir tudo",
      "Movimento médio: **um viseme a cada 4–8 frames** em fala normal (24fps)",
      "Combine com **animação de mandíbula** (bone) para realismo: shape keys formam a boca, jaw bone abre",
      "Armadilha: animar **toda sílaba** vira tremor. Anime apenas as **transições marcantes** — o cérebro completa o resto",
    ],
    alerts: [
      { type: "info", content: "Para projetos sérios, use o **Rhubarb Lip Sync** — ele lê o áudio e gera automaticamente a lista de visemes com timestamps. Você só refina." },
      { type: "tip", content: "Ative **Audio Scrubbing** em \`Edit > Preferences > Animation\` para ouvir o som ao arrastar o cursor da timeline. Indispensável para sincronizar." },
      { type: "warning", content: "Não esculpa shape keys com a malha **deformada** pela armature. Sempre vá em \`Edit Mode\` da malha original (a deformação acontece depois, em cima da shape)." },
    ],
  },
];
