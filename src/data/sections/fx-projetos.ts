import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "particulas-intro",
    section: "fx-projetos",
    title: "Introdução a Partículas",
    difficulty: "iniciante",
    subtitle: "Como o Blender simula multidões de pequenas coisas: poeira, faíscas, folhas e muito mais.",
    intro: `
Imagine que você precisa desenhar **mil folhas caindo** de uma árvore, ou a **poeira** levantada por um carro, ou ainda as **faíscas** de uma fogueira. Modelar cada elemento à mão seria impraticável. É para isso que existem os **sistemas de partículas**: eles geram automaticamente milhares (ou milhões) de pequenas instâncias seguindo regras de física, emissão e tempo. Pense em uma **fábrica invisível** que produz pontinhos pelo seu cenário — cada pontinho pode virar uma folha, uma gota, uma rocha ou qualquer objeto que você escolher.

No Blender, partículas vivem dentro de uma aba específica chamada \`Particle Properties\` (o ícone parecido com fogos de artifício, no painel à direita da viewport). Toda **emissão** parte de um objeto **emissor**, que normalmente é uma malha (mesh). Você define quantas partículas nascem, em que momento (\`Frame Start\` e \`Frame End\`) e por quanto tempo elas vivem (\`Lifetime\`). Esse é o coração do sistema.

## Os dois tipos principais
Existem dois grandes modos: **Emitter** (emissor), no qual as partículas nascem, se movem e morrem — perfeito para chuva, faíscas, fumaça leve; e **Hair** (cabelo), no qual cada partícula vira um fio estático preso à superfície, ótimo para grama, pelos e cabelo. Vamos começar com Emitter neste capítulo.

## Por que aprender partículas antes de Geometry Nodes?
Partículas são o **antepassado** do que hoje é feito com Geometry Nodes. Ainda assim, o sistema clássico permanece útil porque é simples de configurar, integra-se bem com **Force Fields** (campos de força como vento e gravidade) e ensina conceitos fundamentais — quantidade, vida útil, velocidade — que você reusará em qualquer simulação avançada.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Selecione um plano (Shift+A → Mesh → Plane)\n2. Vá na aba Particle Properties\n3. Clique em + para adicionar um sistema\n4. Mantenha Type = Emitter\n5. Pressione Espaço para tocar a animação" },
      { lang: "atalho", code: "Alt+A → tocar/parar animação  |  Shift+Esquerda → ir ao frame 1  |  N → painel lateral" },
      { lang: "config", code: "Number: 1000\nFrame Start: 1\nFrame End: 50\nLifetime: 60\nEmit From: Faces" },
      { lang: "python", code: "import bpy\n# Adiciona um sistema de partículas ao objeto ativo\nobj = bpy.context.active_object\nps = obj.modifiers.new('Particles', type='PARTICLE_SYSTEM')\nsettings = obj.particle_systems[0].settings\nsettings.count = 1000\nsettings.frame_start = 1\nsettings.frame_end = 50\nsettings.lifetime = 60" },
    ],
    points: [
      "**Emissor**: o objeto que solta as partículas, geralmente uma mesh",
      "**Number**: total de partículas emitidas no intervalo definido",
      "**Lifetime**: por quantos frames cada partícula vive antes de sumir",
      "**Emit From**: pode ser Verts, Faces ou Volume — muda muito a aparência",
      "Partículas usam física Newtoniana por padrão (gravidade já entra no cálculo)",
      "Armadilha comum: esquecer de tocar a animação — sem timeline rodando, nada acontece",
    ],
    alerts: [
      { type: "info", content: "Partículas dependem do **frame atual**. Se você está parado no frame 1 e o sistema começa no 1, talvez ainda não veja nada — avance alguns frames." },
      { type: "tip", content: "Use \`Alt+A\` para dar play e ver a simulação acontecer em tempo real na viewport." },
      { type: "warning", content: "Cuidado com **Number** muito alto (acima de 100k). O Blender pode travar dependendo da sua máquina." },
    ],
  },
  {
    slug: "hair-particles",
    section: "fx-projetos",
    title: "Cabelo e Pelos com Hair Particles",
    difficulty: "iniciante",
    subtitle: "Transforme partículas em fios para criar grama, pelagem e cabelo de personagens.",
    intro: `
Quando você muda o tipo do sistema de partículas de **Emitter** para **Hair**, cada partícula deixa de ser um pontinho voador e passa a ser um **fio** preso à superfície da malha. Esse fio pode ser um pelinho de bicho, uma lâmina de grama, um fio de barba ou um cabelo comprido — depende só de quão **longo**, **denso** e **estilizado** você o configure. É a forma mais rápida de povoar superfícies com elementos finos sem modelar nada à mão.

O processo é direto: selecione a malha, adicione um sistema de partículas, troque \`Type\` para \`Hair\` e pronto — a viewport já mostra fios aparecendo. A partir daí você ajusta \`Number\` (quantidade), \`Hair Length\` (comprimento) e entra no modo \`Particle Edit\` para **pentear** os fios usando ferramentas como \`Comb\`, \`Cut\` e \`Length\`.

## Como o Blender renderiza fios
Por baixo dos panos, cada fio é um conjunto de segmentos. No render \`Cycles\` e \`Eevee\`, eles aparecem como cilindros bem finos com material próprio. Para grama realista, normalmente substituímos o fio simples por uma **instância** de uma malha (uma folhinha modelada) usando \`Render As → Object\` ou \`Collection\`.

## Por que começar simples
Embora hoje muita gente faça grama com **Geometry Nodes**, aprender Hair Particles primeiro ensina conceitos universais: distribuição por superfície, controle por **Vertex Group**, variação aleatória e peso de gravidade. Tudo isso aparece de novo, com outra cara, nos nós.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Selecione um plano e adicione um sistema de partículas\n2. Mude Type para Hair\n3. Number: 5000, Hair Length: 0.3\n4. Vá em Render → Render As: Object e escolha sua folhinha\n5. Entre em Particle Edit (ícone na barra de modos) para pentear" },
      { lang: "atalho", code: "Particle Edit:  Ctrl+LMB → pentear  |  E → estender  |  X → cortar" },
      { lang: "config", code: "Type: Hair\nNumber: 5000\nHair Length: 0.3\nSegments: 5\nRender As: Object" },
      { lang: "python", code: "import bpy\nobj = bpy.context.active_object\nobj.modifiers.new('Hair', type='PARTICLE_SYSTEM')\nps = obj.particle_systems[0]\nps.settings.type = 'HAIR'\nps.settings.count = 5000\nps.settings.hair_length = 0.3" },
    ],
    points: [
      "**Hair** = partículas estáticas em forma de fio, presas à superfície",
      "**Particle Edit** permite pentear, cortar e alongar fios manualmente",
      "Use **Vertex Groups** para controlar onde tem mais ou menos pelo (ex: \`Density\`)",
      "**Children** geram fios extras a partir dos pais — acelera a densidade visual",
      "**Render As: Object** instancia uma malha real no lugar do fio (essencial para grama)",
      "Cuidado: muitos segmentos × muita quantidade = render lento",
    ],
    alerts: [
      { type: "tip", content: "Para grama, modele **3 folhinhas variadas** e use \`Render As: Collection\` para alternar entre elas e ganhar realismo." },
      { type: "info", content: "**Vertex Group de densidade** é o segredo de campos com clareiras: pinte preto onde não quer pelo, branco onde quer cheio." },
      { type: "warning", content: "Esquecer de aplicar o \`Scale\` do objeto (\`Ctrl+A → Scale\`) faz os fios saírem com tamanho errado." },
    ],
  },
  {
    slug: "fluido-liquido",
    section: "fx-projetos",
    title: "Simulação de Líquidos",
    difficulty: "intermediario",
    subtitle: "Água, sucos e respingos com o sistema Mantaflow.",
    intro: `
Simular **líquido** é fazer o computador calcular como a água se comportaria quadro a quadro: para onde escorre, como respinga, como forma uma poça. O Blender usa um motor chamado **Mantaflow** para isso, integrado ao menu \`Object → Quick Effects → Quick Liquid\` ou manualmente pelo painel \`Physics Properties\`. A ideia central é ter dois objetos: um **Domain** (uma caixa que delimita onde a simulação acontece) e um **Flow** (objeto que joga ou contém o líquido).

Sem o Domain, o cálculo não tem fronteiras e simplesmente não roda. Sem um Flow, não há nada para emitir o líquido. Então pense sempre nesse par: **caixa + emissor**. Tudo que estiver dentro do Domain pode interagir com o líquido — paredes, obstáculos, ralos.

## A simulação acontece em duas etapas
Primeiro o Blender faz o **Bake** da simulação: ele calcula todos os frames e salva em cache no disco (pasta \`cache_fluid\` do seu projeto). Só depois o líquido pode ser visualizado fluido na timeline. Em seguida, opcionalmente, você gera um **Mesh** de alta resolução para o render final.

## O que muda em relação a Emitter
Diferente das partículas comuns, fluidos consideram **densidade**, **viscosidade**, **tensão superficial** e **colisão volumétrica**. É computacionalmente caro, mas o resultado é muito convincente. Comece sempre com **resoluções baixas** (\`Resolution Divisions\` em torno de 64) e só suba quando estiver feliz com o movimento.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Crie um cubo grande (será o Domain)\n2. Crie uma esfera dentro dele (será o Flow)\n3. Selecione a esfera → Object → Quick Effects → Quick Liquid\n4. Selecione o cubo → Physics → Fluid → Bake Data\n5. Aguarde o cache terminar e tecle Espaço" },
      { lang: "config", code: "Domain Type: Liquid\nResolution Divisions: 64 (teste) / 256 (final)\nFlow Type: Liquid\nFlow Behavior: Geometry (de uma vez) ou Inflow (contínuo)" },
      { lang: "atalho", code: "Espaço → play  |  Ctrl+S salve antes do Bake!  |  Esc cancela bake" },
      { lang: "python", code: "import bpy\n# Habilita fluido no objeto ativo como Domain\nbpy.ops.object.modifier_add(type='FLUID')\nobj = bpy.context.active_object\nobj.modifiers['Fluid'].fluid_type = 'DOMAIN'\nobj.modifiers['Fluid'].domain_settings.domain_type = 'LIQUID'" },
    ],
    points: [
      "**Domain**: caixa delimitadora onde a simulação roda",
      "**Flow**: objeto que emite ou contém o líquido (Inflow, Geometry, Outflow)",
      "**Bake**: cálculo prévio salvo em cache no disco",
      "Resolução baixa para teste, alta para render final",
      "**Effector** = objetos sólidos que o líquido bate (colisão)",
      "Salve o arquivo antes do bake — caches são vinculados ao caminho do .blend",
    ],
    alerts: [
      { type: "warning", content: "O **Bake pode demorar horas** em altas resoluções. Comece sempre com 64 divisions." },
      { type: "danger", content: "Mover ou renomear o arquivo \`.blend\` depois do bake quebra o cache. Refaça o bake após mover." },
      { type: "tip", content: "Use \`Mesh → Generate\` no Domain para criar uma malha suave do líquido pronta para shader de água." },
    ],
  },
  {
    slug: "fumaca-fogo",
    section: "fx-projetos",
    title: "Fumaça e Fogo",
    difficulty: "intermediario",
    subtitle: "Crie velas, explosões e nuvens densas com o mesmo motor Mantaflow.",
    intro: `
**Fumaça** e **fogo** no Blender também são feitos com o **Mantaflow**, mas no modo \`Gas\` (gás) em vez de \`Liquid\`. O conceito é o mesmo de líquidos: você precisa de um **Domain** (caixa onde a simulação acontece) e um **Flow** (objeto que emite). O atalho mais rápido é \`Object → Quick Effects → Quick Smoke\`, que prepara tudo automaticamente.

Por baixo dos panos, fumaça é um **volume 3D** — pense em uma nuvem de pontinhos com **densidade**, **temperatura** e **vetor de velocidade** em cada célula. O renderizador (Cycles ou Eevee) lê esse volume e decide quão opaco e quão brilhante exibir cada região. Isso é diferente de partículas, que são pontos discretos.

## Diferença entre fumaça e fogo
Tecnicamente os dois usam o mesmo solver. A diferença está em \`Flow Type\`: \`Smoke\` (só fumaça), \`Fire\` (só fogo), ou \`Fire + Smoke\` (combinado, o mais usado). O fogo aparece quando a temperatura passa do ponto de **ignição**; a fumaça subsequente é resíduo.

## Cuidados de performance
Fumaça é cara. \`Resolution Divisions\` controla a finura: 32 para teste, 128 ou 256 para render. O **Adaptive Domain** ajuda muito — ele só calcula nas regiões onde realmente há fumaça, economizando memória. Sempre faça bake após salvar o arquivo, igual fluidos.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Adicione um cubo (será emissor)\n2. Object → Quick Effects → Quick Smoke\n3. Selecione o Domain (cubo grande criado)\n4. Mude Flow Type do emissor para Fire + Smoke\n5. Bake Data e tecle Espaço" },
      { lang: "config", code: "Domain Type: Gas\nResolution Divisions: 64\nAdaptive Domain: ON\nFlow Type: Fire + Smoke\nFlow Behavior: Inflow" },
      { lang: "atalho", code: "Z → modo de visualização  |  Shift+Z → render preview rápido" },
      { lang: "python", code: "import bpy\nobj = bpy.context.active_object\nbpy.ops.object.modifier_add(type='FLUID')\nobj.modifiers['Fluid'].fluid_type = 'DOMAIN'\nobj.modifiers['Fluid'].domain_settings.domain_type = 'GAS'\nobj.modifiers['Fluid'].domain_settings.use_adaptive_domain = True" },
    ],
    points: [
      "Fumaça é um **volume 3D**, não partículas",
      "**Domain Type: Gas** ativa o solver de fumaça/fogo",
      "**Adaptive Domain** economiza memória ajustando a caixa dinamicamente",
      "Use \`Flow Type: Fire + Smoke\` para velas, fogueiras e explosões",
      "Material **Principled Volume** é o shader padrão para o domain",
      "Sempre **bake após salvar** o arquivo (caches dependem do path)",
    ],
    alerts: [
      { type: "tip", content: "Para uma vela suave, use Flow Behavior \`Inflow\` com \`Surface Emission\` baixo (~0.1)." },
      { type: "warning", content: "Resolution Divisions acima de 256 consome **gigabytes de RAM** rapidamente." },
      { type: "info", content: "Eevee renderiza fumaça em tempo real, mas com qualidade inferior ao Cycles." },
    ],
  },
  {
    slug: "cloth-tecido",
    section: "fx-projetos",
    title: "Simulação de Tecido (Cloth)",
    difficulty: "intermediario",
    subtitle: "Bandeiras, capas, cortinas e roupas que se mexem com o vento e a gravidade.",
    intro: `
A simulação de **Cloth** transforma uma malha em um **pedaço de pano** que reage à gravidade, ao vento e a colisões. Pense em uma toalha caindo sobre uma cadeira: você não precisa animar dobra por dobra — basta dizer ao Blender "essa malha é tecido" e deixar a física fazer o trabalho.

Para ativar, selecione a malha (geralmente um plano subdividido várias vezes), vá em \`Physics Properties\` e clique em **Cloth**. O Blender já vem com **presets** (\`Cotton\`, \`Silk\`, \`Leather\`, \`Rubber\`...) que ajustam parâmetros internos como **rigidez**, **amortecimento** e **massa** automaticamente. Comece sempre por um preset e refine depois.

## Subdivisões importam muito
Tecido é mais convincente quanto **mais vértices** ele tiver. Um plano com poucos vértices se comporta como cartolina rígida. Adicione um \`Subdivision Surface\` ou subdivida no Edit Mode antes de simular. Como contrapartida, mais vértices = simulação mais lenta.

## Colisão é um par
Para o tecido bater em algo, esse "algo" também precisa ter física: selecione o objeto de colisão e adicione \`Physics → Collision\`. Sem isso, o pano atravessa tudo. E lembre-se: o tecido tem espessura virtual configurável em \`Cloth → Object Collisions → Distance\`.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Adicione um Plane e suba ele\n2. Edit Mode → subdivida 6 vezes (W → Subdivide repetidamente)\n3. Volte ao Object Mode\n4. Physics → Cloth → escolha preset Cotton\n5. Adicione um cubo abaixo → Physics → Collision\n6. Espaço para tocar" },
      { lang: "config", code: "Quality Steps: 5 (teste) / 10+ (final)\nMass: 0.3 kg\nPreset: Cotton\nSelf Collisions: ON (para evitar interpenetração)" },
      { lang: "atalho", code: "W → menu de subdivisões em Edit Mode  |  Espaço → play simulação" },
      { lang: "python", code: "import bpy\nbpy.ops.object.modifier_add(type='CLOTH')\nobj = bpy.context.active_object\nobj.modifiers['Cloth'].settings.mass = 0.3\nobj.modifiers['Cloth'].collision_settings.use_self_collision = True" },
    ],
    points: [
      "**Cloth** = malha que reage como tecido à física",
      "Mais **subdivisões** = dobras mais finas, mas mais lentidão",
      "**Presets** (Cotton, Silk, Denim...) são o atalho para parâmetros realistas",
      "Objetos de colisão precisam ter \`Collision\` habilitado",
      "**Pin Group** (Vertex Group) prende vértices no lugar — útil para bandeiras",
      "Sempre **bake** ao terminar para ter cache estável",
    ],
    alerts: [
      { type: "tip", content: "Para uma **bandeira**, crie um Vertex Group chamado \`Pin\`, marque os vértices da haste, e use ele em \`Shape → Pinning\`." },
      { type: "warning", content: "Aplicar Scale antes de simular é **obrigatório** — escala diferente de 1 quebra a física." },
      { type: "info", content: "Combine com **Force Field → Wind** (Shift+A → Force Field → Wind) para tecidos esvoaçantes." },
    ],
  },
  {
    slug: "soft-body",
    section: "fx-projetos",
    title: "Soft Body: Objetos Macios",
    difficulty: "intermediario",
    subtitle: "Gelatinas, almofadas e qualquer coisa que se deforma sem ser tecido.",
    intro: `
**Soft Body** é o sistema de física para objetos **deformáveis volumétricos** — coisas que não são tecido (que é fino) nem sólidas (rígidas), mas algo no meio: uma **gelatina**, uma **almofada**, um **boneco de borracha**. Cada vértice da malha é tratado como uma massa conectada por molas virtuais aos vizinhos. Quando algo bate, as molas absorvem e devolvem o impacto, gerando aquela sensação de "treme-treme".

Você ativa em \`Physics Properties → Soft Body\`. Os parâmetros principais ficam em **Edges** (rigidez das ligações entre vértices, controlada por \`Pull\` e \`Push\`) e **Self Collision** (impede que a malha entre em si mesma quando dobra). Há também \`Goal\`: um peso por vértice que diz o quanto cada ponto "quer voltar" à posição original — funciona como memória de forma.

## Quando usar Soft Body em vez de Cloth
Use **Cloth** para superfícies finas (pano, papel). Use **Soft Body** quando o objeto tem **volume**: bola murcha, geleia, brinquedo de borracha. Soft Body é mais antigo e tende a ser mais lento e instável que Cloth, mas continua sendo a melhor opção para deformações volumétricas em situações simples.

## Performance e estabilidade
Quanto mais vértices, mais cálculo. Para objetos detalhados, simule num **Low Poly** e use \`Mesh Deform\` ou \`Surface Deform\` para passar a deformação ao modelo final detalhado. Esse truque é padrão em estúdios.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Adicione uma esfera UV (Shift+A → Mesh → UV Sphere)\n2. Suba ela alguns metros\n3. Physics → Soft Body\n4. Adicione um plano abaixo → Physics → Collision\n5. Espaço para tocar e ver a esfera quicar" },
      { lang: "config", code: "Goal: OFF (para deformação livre)\nEdges Pull: 0.9\nEdges Push: 0.9\nSelf Collision: ON\nFriction: 5" },
      { lang: "atalho", code: "Shift+A → Mesh → UV Sphere  |  G+Z → mover no eixo Z" },
      { lang: "python", code: "import bpy\nbpy.ops.object.modifier_add(type='SOFT_BODY')\nsb = bpy.context.active_object.modifiers['Softbody'].settings\nsb.use_goal = False\nsb.pull = 0.9\nsb.push = 0.9" },
    ],
    points: [
      "**Soft Body** = malha deformável volumétrica",
      "**Goal** controla o quanto vértices voltam à posição inicial (memória de forma)",
      "**Edges Pull/Push** = rigidez das molas internas",
      "Para detalhe: simule low-poly e propague com **Surface Deform**",
      "Sempre habilite **Self Collision** para evitar interpenetrações",
      "Mais lento que Cloth — use só quando tem volume real",
    ],
    alerts: [
      { type: "tip", content: "Use **Surface Deform** para aplicar a simulação de uma malha simples ao modelo final detalhado — economia gigante de tempo." },
      { type: "warning", content: "Soft Body com muitos vértices pode levar **minutos** por frame. Use low-poly." },
      { type: "info", content: "Para gelatinas, baixe \`Pull\` e \`Push\` para ~0.3 — quanto mais baixo, mais mole." },
    ],
  },
  {
    slug: "rigid-body",
    section: "fx-projetos",
    title: "Rigid Body: Física de Sólidos",
    difficulty: "intermediario",
    subtitle: "Empilhe, derrube e despedace: simulação de corpos rígidos.",
    intro: `
**Rigid Body** é a física de objetos **sólidos** que não se deformam — caixas que caem, dominós que tombam, pedras rolando ladeira abaixo. Diferente de Cloth e Soft Body, aqui o objeto mantém sua forma intacta; só sua **posição** e **rotação** mudam ao longo do tempo. É o tipo de simulação mais rápida e estável do Blender.

Para usar, selecione o objeto e em \`Physics Properties\` clique em **Rigid Body**. Você escolhe se ele é \`Active\` (responde à gravidade e colisões) ou \`Passive\` (fica parado e serve de obstáculo, como o chão). Pronto — Espaço, e ele cai.

## Tipos de colisão
A propriedade \`Collision Shape\` define a "casca invisível" usada nos cálculos. Opções: \`Box\`, \`Sphere\`, \`Capsule\`, \`Cylinder\`, \`Convex Hull\` (envoltória convexa, rápido) e \`Mesh\` (forma exata, lento mas preciso). Para uma caixa simples, **Box**. Para um vaso quebrado, **Mesh**. Escolher errado faz objetos atravessarem uns aos outros.

## Constraints: amarrando objetos
Em \`Object → Rigid Body → Connect\` você cria **vínculos** entre dois rigid bodies — funciona como dobradiças, molas, cordas. Combinado com o addon **Cell Fracture**, você consegue **destruir** objetos em pedaços que se soltam progressivamente.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Adicione um plano grande → Physics → Rigid Body → Type: Passive\n2. Adicione vários cubos acima → seleciona todos → Physics → Rigid Body → Active\n3. Espaço → veja eles caírem e empilharem" },
      { lang: "config", code: "Type: Active (cai) ou Passive (chão)\nCollision Shape: Box (rápido) | Mesh (preciso)\nMass: 1.0\nFriction: 0.5\nBounciness: 0.0" },
      { lang: "atalho", code: "Shift+A → Mesh → Cube  |  Shift+D → duplicar  |  Espaço → play" },
      { lang: "python", code: "import bpy\nbpy.ops.rigidbody.object_add()\nrb = bpy.context.active_object.rigid_body\nrb.type = 'ACTIVE'\nrb.collision_shape = 'BOX'\nrb.mass = 1.0" },
    ],
    points: [
      "**Active** = obedece à física | **Passive** = obstáculo imóvel",
      "**Collision Shape** define a casca invisível usada na colisão",
      "**Mass** afeta inércia, não velocidade de queda (gravidade é igual para todos)",
      "**Bounciness** = 0 (parado) até 1 (super-bola)",
      "Use **Convex Hull** como meio-termo entre Box e Mesh",
      "Combine com **Cell Fracture** (addon nativo) para destruições",
    ],
    alerts: [
      { type: "tip", content: "Para empilhar bem, dê \`Friction\` alto (~0.8) — senão tudo escorrega como se fosse gelo." },
      { type: "warning", content: "**Mesh collision** com muitos polígonos derruba a performance. Prefira **Convex Hull**." },
      { type: "success", content: "Após simular, use \`Object → Rigid Body → Bake to Keyframes\` para converter em animação real, sem depender da física." },
    ],
  },
  {
    slug: "geometry-nodes-intro",
    section: "fx-projetos",
    title: "Introdução a Geometry Nodes",
    difficulty: "avancado",
    subtitle: "A nova era do Blender: criando geometria com nós em vez de cliques.",
    intro: `
**Geometry Nodes** é o sistema **procedural** mais poderoso do Blender. Em vez de modelar à mão, você conecta blocos (nós) que recebem geometria, fazem operações sobre ela (mover vértices, instanciar objetos, distribuir pontos, deformar) e devolvem uma nova geometria. É como programar visualmente. Tudo é **não-destrutivo**: você pode trocar um parâmetro a qualquer momento e a malha inteira se recalcula.

Para começar, selecione qualquer objeto e abra um **Geometry Nodes Editor** (no topo do Blender, troque um dos painéis para esse editor). Clique em **New** e o Blender cria um modificador chamado \`GeometryNodes\` com dois nós básicos: \`Group Input\` (geometria que entra) e \`Group Output\` (geometria que sai). Tudo que você fizer no meio dos dois é a sua "receita".

## Por que isso mudou tudo
Antes, para criar 200 árvores diferentes em uma floresta, você precisava de partículas, cópias manuais ou scripts. Hoje, com 5 nós, você distribui pontos sobre um terreno e instancia árvores com variação automática. Tarefas que levavam horas levam minutos.

## A mentalidade procedural
Pense em **funções**: cada nó é uma pequena função que pega entrada e devolve saída. Não importa **quando** você roda, importa **o que** está conectado. Mudou a entrada? A saída se atualiza sozinha. Essa é a filosofia procedural — e dominar isso te transforma como artista 3D.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Adicione um Plane\n2. Topo → troque um painel para Geometry Nodes Editor\n3. Clique em New (cria modificador)\n4. Shift+A → Mesh → Distribute Points on Faces\n5. Conecte: Group Input → Distribute → Group Output\n6. Veja pontinhos aparecerem na malha" },
      { lang: "atalho", code: "Geometry Nodes:  Shift+A → menu de nós  |  G → mover nó  |  Ctrl+H → esconder sockets" },
      { lang: "config", code: "Distribute Points on Faces:\n  Density: 50\n  Seed: 0 (mude para variar a distribuição)" },
      { lang: "python", code: "import bpy\nobj = bpy.context.active_object\nmod = obj.modifiers.new('GeoNodes', type='NODES')\n# O grupo de nós é criado vazio; edite no Geometry Nodes Editor" },
    ],
    points: [
      "**Geometry Nodes** = sistema procedural baseado em blocos conectados",
      "**Group Input / Group Output** são as portas de entrada e saída",
      "Tudo é **não-destrutivo**: muda parâmetro, atualiza tudo",
      "**Distribute Points on Faces** é o nó mais usado para espalhar coisas",
      "**Instance on Points** transforma pontos em cópias de objetos",
      "Pense como **fluxo de dados**, não como passos sequenciais",
    ],
    alerts: [
      { type: "info", content: "Geometry Nodes substitui muitos usos antigos de partículas — mas as duas tecnologias coexistem." },
      { type: "tip", content: "Pressione \`Ctrl+Espaço\` num nó selecionado para maximizar o editor — ajuda muito em árvores complexas." },
      { type: "warning", content: "Versões antigas do Blender (antes da 3.0) tinham um sistema **fields** diferente. Use 4.x para acompanhar este capítulo." },
    ],
  },
  {
    slug: "geo-scattering",
    section: "fx-projetos",
    title: "Scattering com Geometry Nodes",
    difficulty: "avancado",
    subtitle: "Espalhe pedras, árvores e detalhes pelo cenário em segundos.",
    intro: `
**Scattering** (espalhamento) é o caso de uso mais popular de Geometry Nodes: distribuir muitas instâncias de objetos sobre uma superfície. Floresta de árvores num terreno, pedras numa estrada, frutas numa tigela — qualquer cenário que precise de **muitas coisas variadas** se beneficia.

A receita básica usa três nós principais: **Distribute Points on Faces** (cria pontos sobre a malha), **Instance on Points** (substitui cada ponto por uma cópia de outro objeto) e, opcionalmente, **Random Value** + **Rotate Instances** + **Scale Instances** para dar variação. Sem variação, todas as instâncias ficam idênticas e o resultado parece artificial.

## Controlando densidade com pintura
A entrada \`Density Factor\` do Distribute aceita um **Vertex Group** ou um **Attribute**. Pinte a malha em modo \`Weight Paint\` (P como Pintura de Peso) e use esse grupo para dizer "aqui muitas árvores, aqui poucas, aqui nenhuma". É muito mais natural que distribuir uniformemente.

## Variação é o segredo
Use \`Random Value\` (modo Float) para cada instância ter rotação Z aleatória e escala entre, digamos, 0.8 e 1.2. Para variar **modelos**, conecte uma **Collection** ao Instance on Points e ative \`Pick Instance\` — cada ponto pega um objeto aleatório da coleção. É como você cria florestas com 5 espécies diferentes em 30 segundos.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Adicione um Plane grande, subdivida\n2. New Geometry Nodes\n3. Shift+A → Distribute Points on Faces (Density 5)\n4. Shift+A → Instance on Points\n5. Shift+A → Object Info → arraste sua árvore\n6. Conecte Object Info.Geometry → Instance on Points.Instance\n7. Conecte tudo até o Group Output" },
      { lang: "config", code: "Distribute: Density 5, Seed 0\nInstance on Points: Pick Instance ON\nRandom Value (Float): Min 0.8 / Max 1.2 → Scale Instances\nRandom Value (Vector): para Rotate Instances no eixo Z" },
      { lang: "atalho", code: "Shift+A → adicionar nó  |  F → conectar dois nós selecionados" },
      { lang: "python", code: "import bpy\n# Adiciona modificador Geometry Nodes vazio\nobj = bpy.context.active_object\nmod = obj.modifiers.new('Scatter', type='NODES')\n# Construa a árvore de nós manualmente no editor" },
    ],
    points: [
      "**Distribute Points on Faces** + **Instance on Points** = receita base do scatter",
      "**Density Factor** aceita Vertex Group para pintar densidade",
      "**Pick Instance** sorteia objetos de uma Collection",
      "**Random Value** + **Rotate/Scale Instances** dá variação natural",
      "Use **Realize Instances** só se precisar editar os pedaços individualmente",
      "Instâncias são leves: milhões delas continuam rápidas",
    ],
    alerts: [
      { type: "tip", content: "Para uma floresta convincente, modele **3-5 árvores diferentes** e jogue todas numa Collection. Pick Instance faz mágica." },
      { type: "warning", content: "**Realize Instances** converte instâncias em geometria real — usa MUITA memória. Só use se for absolutamente necessário." },
      { type: "info", content: "Combine scatter com simulações: pedras instanciadas podem virar Rigid Bodies via \`Make Instances Real\`." },
    ],
  },
  {
    slug: "projeto-donut",
    section: "fx-projetos",
    title: "Projeto: O Famoso Donut",
    difficulty: "iniciante",
    subtitle: "O projeto-rito de passagem do Blender, do zero ao render final.",
    intro: `
O **Donut do Blender Guru** é talvez o tutorial mais famoso da internet 3D. É um projeto de iniciante porque junta, num único exercício, **modelagem**, **escultura leve**, **materiais**, **iluminação**, **partículas** (granulado) e **render**. Se você completou os capítulos anteriores deste livro, já tem 90% do que precisa para fazer o donut do zero por conta própria.

A ideia é simples: modelar um **toro** (\`Shift+A → Mesh → Torus\`), achatar levemente, aplicar um \`Subdivision Surface\` para suavizar, esculpir umas imperfeições, criar a **glacê** como um segundo toro maior por cima com **Solidify** e \`Shrinkwrap\`, e finalizar com **partículas** simulando o granulado colorido. Acabou? Faça **render** com Cycles num cenário simples (um plano com material claro e uma luz quente).

## Por que esse projeto é especial
Ele te força a passar por **todos os pilares** do Blender em um fim de semana. Cada erro que você comete (e vai cometer) te ensina a corrigir e a entender o porquê. É um projeto **terapêutico**: feio no começo, lindo no fim.

## Como abordar
Não tente perfeição na primeira passada. Modele rápido, materialize rápido, ilumine rápido — depois itere. Essa é a mentalidade real de produção 3D, e o donut é o lugar perfeito pra praticá-la.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Shift+A → Mesh → Torus (a base)\n2. S, Z, 0.7 (achatar)\n3. Modificador Subdivision Surface (nível 2)\n4. Duplicar (Shift+D), escalar levemente, virar a glacê\n5. Adicionar Shrinkwrap apontando para o donut\n6. Solidify pra dar espessura à glacê\n7. Particle System (Hair) na glacê → Render As Object (granulado)\n8. Cena: plano + luz Area + câmera → F12 render" },
      { lang: "atalho", code: "S+Z+0.7 → escalar só no Z em 70%  |  F12 → render imagem  |  Ctrl+1/2/3 → níveis de Subsurf" },
      { lang: "config", code: "Subdivision: Viewport 2 / Render 3\nShrinkwrap: Wrap Method = Project, Snap Mode = On Surface\nSolidify: Thickness 0.005\nGranulado: Hair, ~3000, length 0.005" },
      { lang: "python", code: "import bpy\nbpy.ops.mesh.primitive_torus_add(major_radius=0.5, minor_radius=0.2)\nobj = bpy.context.active_object\nbpy.ops.object.modifier_add(type='SUBSURF')\nobj.modifiers['Subdivision'].levels = 2" },
    ],
    points: [
      "Combina modelagem + materiais + partículas + render num só projeto",
      "**Torus achatado** + Subdivision Surface = forma básica do donut",
      "**Shrinkwrap** gruda a glacê na superfície do donut",
      "**Solidify** dá espessura (não fica plano)",
      "Granulado é **Hair** com Render As Object",
      "Render final em Cycles com luz Area quente",
    ],
    alerts: [
      { type: "tip", content: "Não persiga perfeição na primeira tentativa. Termine **feio** primeiro — depois refine. É assim que profissionais trabalham." },
      { type: "info", content: "O tutorial original do Blender Guru no YouTube vale ouro — assista junto com este capítulo." },
      { type: "success", content: "Ao terminar, **poste no Reddit r/blender** ou no Discord da comunidade. Feedback é o melhor combustível." },
    ],
  },
  {
    slug: "projeto-arch-viz",
    section: "fx-projetos",
    title: "Projeto: Arch Viz Básico",
    difficulty: "intermediario",
    subtitle: "Modele uma sala simples com luz natural realista — porta de entrada para arquitetura 3D.",
    intro: `
**Arch Viz** (Architectural Visualization) é a área de visualização arquitetônica — fotos foto-realistas de imóveis que ainda não foram construídos. É um nicho enorme do mercado 3D, e o Blender é totalmente capaz de competir com softwares pagos como 3ds Max + V-Ray. Neste projeto, você vai montar uma **sala de estar minimalista** com janela, sofá, mesinha e iluminação natural.

A receita é: modelar paredes (planos com \`Solidify\`), recortar a janela com **Boolean**, posicionar móveis (modele rápido ou baixe do BlenderKit/Polyhaven), e iluminar com um **Sun Light** entrando pela janela mais um **HDRI** no fundo. A mágica está nos detalhes: quinas levemente arredondadas (Bevel), texturas reais (madeira, tecido, parede pintada) e uma **câmera com 35mm** para enquadramento natural.

## Iluminação é tudo em arch viz
Use um \`World → Environment Texture → HDRI\` (baixe gratuitos em **polyhaven.com**) para a luz ambiente, e um \`Sun Light\` para os raios diretos. Ative \`Cycles → Light Paths → Caustics\` se houver vidro. O resultado fica imediatamente cinematográfico.

## Pós-produção rápida
Renderizou? Vá no **Compositor** e adicione \`Glare\` (brilho nas luzes) e um leve \`Color Balance\` para esquentar a imagem. Cinco nós de composição transformam um render bom em um render ótimo.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Plane (chão) + 4 paredes (planos verticais com Solidify)\n2. Crie um cubo onde será a janela → Booleana Difference\n3. Adicione móveis simples (cubos achatados)\n4. World → Environment Texture → HDRI\n5. Adicione um Sun Light → ângulo entrando pela janela\n6. Câmera com Focal Length 35mm\n7. Cycles, 256 samples → F12" },
      { lang: "config", code: "Render Engine: Cycles\nSamples: 256\nDenoiser: OptiX (NVIDIA) ou OpenImageDenoise\nCamera Focal Length: 35mm\nWorld Strength: 1.0 (HDRI)" },
      { lang: "atalho", code: "Numpad 0 → vista da câmera  |  Ctrl+B → Bevel  |  F12 → render" },
      { lang: "shell", code: "# Baixar HDRI gratuito (linha de comando opcional)\nwget https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_03_2k.hdr" },
    ],
    points: [
      "**Solidify** dá espessura real às paredes (não ficam planas)",
      "**Boolean Difference** abre janelas e portas",
      "**HDRI** + **Sun Light** = iluminação natural realista",
      "**Câmera 35mm** dá enquadramento de fotografia arquitetônica",
      "**Polyhaven.com** = texturas, HDRIs e modelos gratuitos profissionais",
      "**Compositor** finaliza com Glare e color balance",
    ],
    alerts: [
      { type: "tip", content: "Adicione um **leve Bevel** em todas as quinas (\`Ctrl+B\`). Quinas perfeitamente afiadas matam o realismo." },
      { type: "info", content: "Sites como **BlenderKit** (addon gratuito) trazem milhares de modelos de móveis prontos." },
      { type: "warning", content: "Cycles em CPU é lento. Se tiver GPU NVIDIA, ative \`OptiX\` em Preferences → System." },
    ],
  },
  {
    slug: "exportar-fbx-gltf",
    section: "fx-projetos",
    title: "Exportar para FBX e glTF",
    difficulty: "intermediario",
    subtitle: "Levando seu trabalho do Blender para Unity, Unreal e a web.",
    intro: `
Seu modelo está pronto, mas o cliente quer abrir em **Unity**, **Unreal Engine**, **Three.js** ou em uma página web. O Blender exporta para vários formatos, mas dois reinam: **FBX** (padrão da indústria de jogos e cinema) e **glTF** (formato moderno e leve, padrão da web 3D).

Para exportar, vá em \`File → Export\`. Escolha \`FBX (.fbx)\` ou \`glTF 2.0 (.glb/.gltf)\`. Cada formato tem dezenas de opções: o que incluir (malhas, armaduras, animações), o que aplicar (modificadores, escala), e como organizar (uma textura por arquivo, embarcada ou separada).

## FBX: o padrão estabelecido
**FBX** é proprietário da Autodesk, mas universalmente suportado. Use para Unity, Unreal, Maya, 3ds Max. **Sempre aplique a escala** (\`Ctrl+A → Scale\`) antes de exportar, porque FBX guarda escalas que muitas engines interpretam errado. Marque \`Apply Scalings: FBX All\` para evitar surpresas.

## glTF: o futuro
**glTF** é open-source, eficiente e o padrão para visualização web (modelos no Sketchfab, no AR de iPhone, em Three.js). O \`.glb\` é a versão **binária com tudo embutido** (uma só arquivo, ótimo para enviar). Use \`File → Export → glTF 2.0\` e marque \`Format: glTF Binary (.glb)\`.

## Cuidados gerais
**Aplique modificadores** críticos antes de exportar (Subsurf, Mirror, Array). **Renomeie objetos** com nomes em inglês sem acentos. **Use escala 1.0**. Esses três passos resolvem 90% dos problemas de exportação.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Selecione objetos a exportar\n2. Aplique Scale: Ctrl+A → Scale\n3. File → Export → FBX (.fbx) ou glTF 2.0 (.glb)\n4. Marque 'Selected Objects' se for exportação parcial\n5. FBX: Apply Scalings = FBX All\n6. glTF: Format = glTF Binary (.glb)\n7. Confirme e teste em outra engine" },
      { lang: "config", code: "FBX:\n  Apply Scalings: FBX All\n  Forward: -Z Forward\n  Up: Y Up\n  Apply Modifiers: ON\n\nglTF:\n  Format: glTF Binary (.glb)\n  Include: Selected Objects\n  Apply Modifiers: ON" },
      { lang: "atalho", code: "Ctrl+A → menu Apply (Scale, Rotation, Location)" },
      { lang: "python", code: "import bpy\n# Exportar FBX programaticamente\nbpy.ops.export_scene.fbx(\n    filepath='/tmp/modelo.fbx',\n    use_selection=True,\n    apply_scale_options='FBX_SCALE_ALL'\n)\n# Exportar glTF binário\nbpy.ops.export_scene.gltf(filepath='/tmp/modelo.glb', export_format='GLB')" },
    ],
    points: [
      "**FBX** = padrão de jogos e animação (Unity, Unreal, Maya)",
      "**glTF/GLB** = padrão da web 3D (Sketchfab, Three.js, AR)",
      "**Sempre aplique Scale** antes de exportar (\`Ctrl+A\`)",
      "**Apply Modifiers** ao exportar evita perder geometria",
      "Use **GLB** quando quiser um único arquivo com texturas embutidas",
      "Renomeie objetos sem acentos e em inglês",
    ],
    alerts: [
      { type: "warning", content: "Esquecer de **aplicar a escala** é a causa #1 de modelos chegarem gigantes ou minúsculos em outras engines." },
      { type: "tip", content: "Para enviar para clientes: \`.glb\` é mais conveniente — um arquivo só, abre no navegador, no celular, no Sketchfab." },
      { type: "info", content: "Unreal prefere FBX. Unity aceita ambos. Plataformas web preferem glTF/GLB." },
    ],
  },
  {
    slug: "comunidade-recursos",
    section: "fx-projetos",
    title: "Comunidade e Recursos",
    difficulty: "iniciante",
    subtitle: "Onde aprender, onde tirar dúvidas e onde achar grátis o que você precisa.",
    intro: `
A maior força do Blender é sua **comunidade**. Diferente de softwares pagos, todo o ecossistema gira em torno de pessoas dispostas a ajudar gratuitamente, criar tutoriais sem cobrar e disponibilizar assets de altíssima qualidade. Aprender onde buscar é tão importante quanto aprender o software.

Os principais hubs são: **Blender Artists** (fórum oficial), **r/blender** no Reddit, o **Blender Stack Exchange** (perguntas técnicas com respostas auditadas), o **Discord oficial do Blender** e canais no YouTube como **Blender Guru**, **CG Cookie**, **Default Cube**, **Polygon Runway** e **Ducky 3D**. Cada um tem um estilo: alguns são pacientes para iniciantes, outros aprofundam em técnica avançada.

## Recursos gratuitos profissionais
- **polyhaven.com** — HDRIs, texturas e modelos sob CC0 (domínio público).
- **ambientCG.com** — texturas PBR completas, gratuitas.
- **BlenderKit** (addon) — milhares de modelos, materiais e brushes direto dentro do Blender.
- **mixamo.com** — animações de personagens prontas, grátis.
- **sketchfab.com** — banco gigante de modelos (grátis e pagos).

## Como pedir ajuda
Quando travar, **mostre seu arquivo**. Capture a tela do problema, descreva o que você esperava e o que aconteceu, mencione a versão do Blender. Quanto mais claro o pedido, mais rápida a resposta. E **devolva** quando puder: responder dúvidas de quem está mais atrás é a melhor forma de fixar o que você aprendeu.
    `,
    codes: [
      { lang: "config", code: "Sites essenciais:\n  blenderartists.org\n  blender.stackexchange.com\n  reddit.com/r/blender\n  polyhaven.com\n  ambientcg.com\n  mixamo.com\n  sketchfab.com" },
      { lang: "passo-a-passo", code: "1. Crie conta em Blender Artists\n2. Entre no Discord oficial: blender.org/community\n3. Instale o addon BlenderKit (gratuito)\n4. Marque polyhaven.com como favorito\n5. Siga 3 canais de YouTube (escolha estilos diferentes)" },
      { lang: "atalho", code: "Edit → Preferences → Add-ons → buscar 'BlenderKit' → ativar" },
      { lang: "shell", code: "# Comando opcional para baixar texturas em massa do Polyhaven\ncurl -L -o textura.zip 'https://dl.polyhaven.org/file/ph-assets/Textures/zip/2k/wood_floor_deck/wood_floor_deck_2k.zip'" },
    ],
    points: [
      "**Blender Artists** e **Stack Exchange** = melhores fóruns para dúvidas",
      "**Polyhaven** e **ambientCG** = assets CC0 profissionais grátis",
      "**BlenderKit** integra biblioteca direto no Blender",
      "**Mixamo** entrega animações prontas para personagens",
      "Mostre **arquivo + screenshot + versão** ao pedir ajuda",
      "**Devolva** ajudando quem está atrás de você",
    ],
    alerts: [
      { type: "tip", content: "Instale o addon **BlenderKit** ainda hoje. Ter milhares de assets a um clique muda completamente o seu fluxo." },
      { type: "info", content: "A **Blender Foundation** publica curtas (Open Movies) com arquivos abertos para estudo: studio.blender.org" },
      { type: "success", content: "Compartilhar seu trabalho — mesmo cru — acelera muito o aprendizado. Não espere ficar 'bom' para postar." },
    ],
  },
  {
    slug: "glossario",
    section: "fx-projetos",
    title: "Glossário Essencial do Blender",
    difficulty: "iniciante",
    subtitle: "Os termos que você precisa decorar para ler tutoriais sem perrengue.",
    intro: `
Toda comunidade técnica tem seu próprio dialeto, e o Blender não foge à regra. Quando você lê tutoriais ou pede ajuda em fóruns, vai se deparar com palavras como **bevel**, **bake**, **rig**, **UV**, **PBR**, **modifier stack** — termos que parecem misteriosos, mas têm significados muito precisos.

Este capítulo é uma **referência rápida**. Não precisa decorar tudo de uma vez. Volte aqui sempre que cruzar uma palavra desconhecida. A repetição vai fazer o vocabulário grudar naturalmente, e em poucos meses você estará usando esses termos sem pensar.

## Princípio
Note como muitos termos vêm do **inglês técnico** sem tradução. Isso é proposital: a comunidade global se comunica em inglês, e usar os termos originais te dá acesso direto à documentação, fóruns e tutoriais internacionais. Não tente "abrasileirar" tudo — abrace o jargão.

## Como usar este glossário
Leia uma vez para ter visão geral. Marque os termos que ainda não conhece. Quando voltar a um capítulo anterior do livro, você verá esses termos aparecerem em contexto e o entendimento se cristalizará. Aprender vocabulário 3D é como aprender um idioma: imersão + repetição.
    `,
    codes: [
      { lang: "config", code: "GEOMETRIA:\n  Vertex = ponto\n  Edge = aresta\n  Face = face/polígono\n  Mesh = malha (conjunto de vértices/faces)\n  N-gon = face com >4 lados\n  Quad = face de 4 lados (ideal)\n  Tri = face de 3 lados\n\nMODELAGEM:\n  Bevel = chanfro (suaviza arestas)\n  Extrude = puxar geometria para fora\n  Loop Cut = adicionar laço de arestas\n  Subdivision Surface = subdividir e suavizar" },
      { lang: "config", code: "MATERIAIS / RENDER:\n  Shader = cálculo de superfície\n  PBR = Physically Based Rendering (base/rough/metal/normal)\n  UV = mapeamento 2D para colocar texturas em malha 3D\n  HDRI = imagem 360° usada como iluminação\n  Bake = pré-cálculo salvo em arquivo (texturas ou física)\n  Sample = raio enviado pelo render (mais = menos ruído)\n  Denoise = filtrar ruído do render" },
      { lang: "config", code: "ANIMAÇÃO / RIG:\n  Rig = esqueleto + controles\n  Armature = objeto que contém os ossos\n  Bone = osso\n  Weight Paint = peso de influência de cada osso\n  Keyframe = quadro-chave\n  IK = Inverse Kinematics\n\nFÍSICA:\n  Cloth = tecido\n  Soft Body = corpo macio\n  Rigid Body = corpo rígido\n  Domain = caixa de simulação\n  Cache = arquivos salvos da simulação" },
      { lang: "atalho", code: "Quando vir um termo novo: Google + 'blender' + termo. Ex: 'blender bevel modifier'" },
    ],
    points: [
      "**Mesh** = malha 3D (conjunto de vertices, edges, faces)",
      "**Quad/Tri/N-gon** = faces de 4, 3 ou 5+ lados (sempre prefira quads)",
      "**PBR** = Physically Based Rendering, padrão moderno de materiais",
      "**HDRI** = imagem 360° usada como luz de cenário",
      "**Bake** = qualquer coisa pré-calculada e salva em arquivo",
      "**Rig** = esqueleto pronto para animar",
      "**Modifier Stack** = pilha de modificadores aplicada em ordem",
    ],
    alerts: [
      { type: "tip", content: "Quando travar num termo, busque **\`blender + termo\`** no Google. A documentação oficial sempre está nos primeiros resultados." },
      { type: "info", content: "Em fóruns internacionais, escreva em inglês — você terá acesso a uma audiência 100x maior." },
      { type: "success", content: "Em poucos meses, esses termos virarão naturais. **Confia no processo**." },
    ],
  },
  {
    slug: "proximos-passos",
    section: "fx-projetos",
    title: "Próximos Passos: Para Onde Ir Agora",
    difficulty: "iniciante",
    subtitle: "Você terminou o livro. E agora? Caminhos para crescer no 3D.",
    intro: `
Se você chegou até aqui, **parabéns**. Você passou por modelagem, materiais, iluminação, rigging, animação, simulação física, Geometry Nodes, dois projetos completos e exportação. Você não é mais iniciante — é alguém com **base sólida** e capaz de aprender qualquer coisa nova no Blender com tempo e paciência.

Mas a jornada está apenas começando. O Blender é um software gigantesco e o 3D é uma área que evolui constantemente. A pergunta agora é: **para onde você quer ir?** Cada caminho leva a uma carreira ou hobby diferente, e a beleza é que você pode trocar de área a qualquer momento.

## Trilhas possíveis
- **Arch Viz**: visualização arquitetônica. Mercado quente, paga bem. Aprofunde em Cycles, iluminação realista, materiais arquitetônicos.
- **Personagens**: modelagem de characters, sculpting, rigging avançado, animação. Caminho para games e animação.
- **Motion Graphics**: animações curtas para redes, com Geometry Nodes pesado. Estética estilizada.
- **VFX**: integração de 3D em filmagens reais (tracking, masking, composição). Mercado de cinema/publicidade.
- **3D para Web/AR**: glTF, Three.js, modelos otimizados para tempo real. Frontend + 3D.

## Hábitos que sustentam crescimento
**Faça um projeto pequeno por semana**, mesmo que feio. **Compartilhe** no Reddit, Instagram ou Discord — feedback acelera anos. **Estude o trabalho dos outros**: baixe arquivos abertos do **studio.blender.org** e abra para ver como profissionais constroem. **Não compare seu começo com o meio de outros** — todo mundo começou ruim.

E lembre-se: o Blender é gratuito, eternamente. Você nunca vai perder o acesso a essa ferramenta. Aproveite isso. Boa jornada — agora você é parte da comunidade.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Escolha UMA trilha (Arch Viz, Characters, Motion, VFX, Web)\n2. Faça 1 projeto pequeno por semana\n3. Compartilhe cada projeto, mesmo feio\n4. Estude 1 arquivo aberto profissional por mês\n5. Em 6 meses, revise — você não vai se reconhecer" },
      { lang: "config", code: "Estudos recomendados por trilha:\n  Arch Viz: Andrew Price, Architecture Topics\n  Personagens: YanSculpts, FlippedNormals\n  Motion: Polygon Runway, Default Cube\n  VFX: Ian Hubert, CG Geek\n  Web 3D: Bruno Simon (threejs-journey)" },
      { lang: "shell", code: "# Baixar arquivos abertos da Blender Studio\n# Visite: https://studio.blender.org/films/\n# Filmes como Charge, Sprite Fright e Agent 327 têm arquivos completos" },
      { lang: "atalho", code: "Mantra:  Faça → Compartilhe → Receba feedback → Itere → Repita" },
    ],
    points: [
      "Você terminou: agora é tempo de **escolher uma trilha** e aprofundar",
      "**Projetos semanais** são o motor do crescimento real",
      "**Compartilhar** é tão importante quanto produzir",
      "Estude **arquivos abertos profissionais** (studio.blender.org)",
      "Não compare seu começo com o meio de outros",
      "Blender é gratuito para sempre — esse é o seu superpoder",
    ],
    alerts: [
      { type: "success", content: "**Você terminou um livro inteiro de Blender**. Isso por si só já te coloca à frente de 95% das pessoas que tentam aprender 3D. Comemore!" },
      { type: "tip", content: "Marque uma data daqui a 6 meses no calendário com a tarefa: 'comparar trabalhos atuais com os de hoje'. Você vai se surpreender." },
      { type: "info", content: "A Blender Foundation aceita doações em **fund.blender.org** — se o software te ajudou, retribuir mantém o projeto vivo." },
    ],
  },
];
