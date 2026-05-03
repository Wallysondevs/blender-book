import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "principled-bsdf",
    section: "materiais",
    title: "Principled BSDF: o shader universal",
    difficulty: "iniciante",
    subtitle: "O ponto de partida para 90% dos materiais que você vai criar.",
    intro: `
O **Principled BSDF** é o shader padrão do Blender e provavelmente o nó mais importante que você vai aprender em toda a sua jornada. Pense nele como uma "caixa mágica" que junta, em um único lugar, dezenas de propriedades físicas que descrevem como uma superfície reage à luz: cor, brilho, metalicidade, rugosidade, transparência, emissão, entre outras. A sigla **BSDF** significa *Bidirectional Scattering Distribution Function*, ou seja, uma função matemática que descreve como a luz se espalha ao bater em uma superfície.

Antes do Principled, era preciso combinar manualmente vários shaders pequenos (\`Diffuse\`, \`Glossy\`, \`Glass\`, \`Subsurface\`) para imitar materiais reais. Hoje, esse nó implementa o modelo **PBR** (*Physically Based Rendering*), o mesmo padrão usado em engines como Unreal, Unity e softwares como Substance Painter. Isso significa que um material criado aqui tende a ficar parecido em outras ferramentas, e que ele responde de forma realista à iluminação.

## Onde encontrar
Quando você adiciona um material novo a um objeto pelo painel **Properties → Material Properties** (o ícone de esfera vermelha), o Blender já cria um Principled BSDF conectado à saída \`Surface\` do nó \`Material Output\`. Você pode ver e editar tudo isso no **Shader Editor**, abrindo um novo painel e mudando o tipo de editor para "Shader".

A grande sacada deste capítulo é entender que o Principled é "tudo em um": basta mexer nos sliders certos e você obtém madeira, metal, plástico, vidro, pele e até líquidos. Os próximos capítulos vão destrinchar cada slider; aqui você vai ganhar a visão geral.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Selecione o objeto no Viewport\n2. Vá em Properties → Material Properties (esfera vermelha)\n3. Clique em 'New' para criar um material\n4. Mude para o Shading Workspace (aba superior) para ver os nós\n5. O Principled BSDF já aparece conectado ao Material Output",
      },
      {
        lang: "atalho",
        code: "Shift+A (no Shader Editor) → Add Node  |  Ctrl+Shift+T → carregar texturas PBR  |  Z → alternar modos de visualização (Material Preview / Rendered)",
      },
      {
        lang: "config",
        code: "# Valores típicos para começar\nBase Color: cor do material (sRGB)\nMetallic: 0 (não-metal) ou 1 (metal puro) — evite valores intermediários\nRoughness: 0 (espelho) → 1 (totalmente fosco)\nIOR: 1.45 (padrão para a maioria dos não-metais)\nAlpha: 1 (opaco) → 0 (transparente)",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Cria um material novo e ativa nodes\nmat = bpy.data.materials.new(name='MeuPrincipled')\nmat.use_nodes = True\n\n# Acessa o Principled BSDF criado por padrão\nbsdf = mat.node_tree.nodes['Principled BSDF']\nbsdf.inputs['Base Color'].default_value = (0.8, 0.2, 0.2, 1.0)  # vermelho\nbsdf.inputs['Roughness'].default_value = 0.4\nbsdf.inputs['Metallic'].default_value = 0.0\n\n# Aplica no objeto ativo\nbpy.context.object.data.materials.append(mat)",
      },
    ],
    points: [
      "**Principled BSDF** é o shader 'tudo-em-um' baseado em PBR — domine ele antes de ir aos outros",
      "Os três sliders mais importantes são **Base Color**, **Roughness** e **Metallic**",
      "Materiais reais são quase sempre **Metallic = 0** OU **Metallic = 1** — evite o meio termo",
      "O **IOR** (Index of Refraction) controla refração; 1.45 vale para plásticos, 1.33 para água, 1.5 para vidro",
      "Você só vê o material no Viewport ao mudar para **Material Preview** (\`Z\` → 'Material Preview') ou **Rendered**",
      "Cada material em Blender é uma rede de nós; o Principled é apenas o nó central mais comum",
    ],
    alerts: [
      {
        type: "tip",
        content: "Use \`Ctrl+Shift+T\` no Shader Editor (com o addon **Node Wrangler** ativo) para importar várias texturas PBR de uma vez. Economiza minutos de trabalho por material.",
      },
      {
        type: "warning",
        content: "Se o material parece preto no Viewport, provavelmente você está em modo **Solid**. Aperte \`Z\` e escolha **Material Preview** ou **Rendered**.",
      },
      {
        type: "info",
        content: "O Principled BSDF mudou de visual no Blender 4.x — algumas entradas foram reorganizadas em painéis colapsáveis. A lógica permanece a mesma.",
      },
    ],
  },
  {
    slug: "base-color-roughness-metallic",
    section: "materiais",
    title: "Base Color, Roughness e Metallic: o tripé do PBR",
    difficulty: "iniciante",
    subtitle: "Os três sliders que definem se algo parece metal, plástico, madeira ou borracha.",
    intro: `
Se o Principled BSDF é um piano, então **Base Color**, **Roughness** e **Metallic** são as três teclas que você mais vai tocar. Praticamente qualquer material do mundo real pode ser razoavelmente representado ajustando apenas esses três parâmetros. Entender o que cada um faz fisicamente é o que separa um material amador de um realista.

A **Base Color** define a cor "pura" do objeto — aquela que ele teria sob luz branca difusa, sem reflexos. Para não-metais, ela é a cor do pigmento (a tinta da parede, por exemplo). Para metais, é a cor do reflexo (ouro reflete dourado, cobre reflete avermelhado). Importantíssimo: cores de Base Color devem evitar valores absolutos como preto puro \`(0,0,0)\` ou branco puro \`(1,1,1)\`, pois nenhum material real absorve ou reflete 100% da luz.

## Roughness: liso ou áspero
A **Roughness** (rugosidade) controla quão polida ou áspera é a superfície *microscopicamente*. Em \`0\`, você tem um espelho perfeito (raríssimo na natureza). Em \`1\`, a luz se espalha em todas as direções e você tem um material super fosco como giz. A maioria dos materiais reais vive entre \`0.3\` e \`0.7\`.

## Metallic: condutor ou dielétrico
O **Metallic** é binário no mundo real: ou o material é um *condutor* (metal) ou um *dielétrico* (todo o resto). Por isso, deixe esse slider em \`0\` para tudo que **não** seja metal puro, e em \`1\` para metais. Valores intermediários só fazem sentido em casos como pintura metálica ou metal sujo, onde duas camadas se misturam.
    `,
    codes: [
      {
        lang: "config",
        code: "# Valores típicos por material\nMadeira polida: Base #6b4423 | Roughness 0.45 | Metallic 0\nPlástico fosco: Base #cccccc | Roughness 0.7  | Metallic 0\nOuro polido:    Base #ffd700 | Roughness 0.15 | Metallic 1\nFerro escovado: Base #888888 | Roughness 0.55 | Metallic 1\nBorracha:       Base #1a1a1a | Roughness 0.9  | Metallic 0",
      },
      {
        lang: "passo-a-passo",
        code: "1. Adicione um material novo ao seu objeto\n2. Clique no quadrado de cor ao lado de 'Base Color'\n3. Use o seletor para escolher uma cor (mantenha entre #1a1a1a e #f0f0f0)\n4. Ajuste Roughness arrastando o slider — observe o reflexo mudando\n5. Para metais, mude Metallic para 1 e ajuste a cor para a do metal real",
      },
      {
        lang: "python",
        code: "import bpy\n\ndef criar_material_pbr(nome, cor_rgba, roughness, metallic):\n    mat = bpy.data.materials.new(name=nome)\n    mat.use_nodes = True\n    bsdf = mat.node_tree.nodes['Principled BSDF']\n    bsdf.inputs['Base Color'].default_value = cor_rgba\n    bsdf.inputs['Roughness'].default_value = roughness\n    bsdf.inputs['Metallic'].default_value = metallic\n    return mat\n\n# Exemplos\ncriar_material_pbr('Ouro', (1.0, 0.84, 0.0, 1.0), 0.15, 1.0)\ncriar_material_pbr('Madeira', (0.42, 0.27, 0.13, 1.0), 0.45, 0.0)",
      },
      {
        lang: "atalho",
        code: "F (no slot de cor) → abre o color picker  |  Ctrl+clique no slider → digitar valor exato  |  Shift+arrastar → ajuste fino",
      },
    ],
    points: [
      "**Base Color** é a cor pura sem reflexo, no espaço **sRGB** — use texturas marcadas como sRGB também",
      "Nunca use **preto puro** ou **branco puro** como Base Color — não existem materiais perfeitos assim",
      "**Roughness 0** vira espelho; **Roughness 1** vira giz. A vida fica entre 0.2 e 0.8",
      "**Metallic** é binário: 0 ou 1. Tudo que não é metal puro deve ser 0",
      "Para metais, a Base Color define o tom do reflexo (ouro, cobre, alumínio) — não a cor difusa",
      "Mudanças de Roughness só ficam visíveis no modo **Material Preview** ou **Rendered**",
      "Texturas de Roughness e Metallic devem ter o **Color Space** trocado para \`Non-Color\` no nó Image Texture",
    ],
    alerts: [
      {
        type: "tip",
        content: "Crie uma esfera de teste com seu material e gire-a — superfícies curvas revelam Roughness e Metallic muito melhor que cubos.",
      },
      {
        type: "danger",
        content: "Esquecer de marcar texturas de Roughness/Metallic como **Non-Color Data** é o erro #1 dos iniciantes. Resultado: materiais com cor errada e brilho estranho.",
      },
      {
        type: "info",
        content: "Bibliotecas como **AmbientCG**, **Polyhaven** e **Texture Haven** oferecem texturas PBR gratuitas no formato correto para o Principled.",
      },
    ],
  },
  {
    slug: "normal-bump-displacement",
    section: "materiais",
    title: "Normal, Bump e Displacement: o relevo da superfície",
    difficulty: "iniciante",
    subtitle: "Três técnicas para fazer superfícies parecerem mais detalhadas do que realmente são.",
    intro: `
Modelar cada poro de uma pele ou cada fio de uma madeira seria insano em termos de polígonos. Por isso, computação gráfica inventou três truques poderosos para *fingir* relevo sem aumentar a malha: **Normal Maps**, **Bump Maps** e **Displacement**. Eles funcionam de maneiras diferentes e têm custos distintos — entender quando usar cada um é uma marca de quem domina shading.

O **Bump** é o mais simples: ele recebe uma textura em escala de cinza (\`Non-Color\`) onde branco significa "alto" e preto significa "baixo". O Blender usa essa informação apenas para *enganar* o cálculo de iluminação, escurecendo e clareando como se houvesse relevo. A geometria, porém, continua plana — qualquer silhueta vai entregar a ilusão.

## Normal Map: a versão profissional do bump
O **Normal Map** é mais sofisticado. Em vez de tons de cinza, ele usa cores azuladas que codificam a direção da normal em cada pixel (X no canal vermelho, Y no verde, Z no azul). Isso permite simular relevos muito mais ricos e direcionais. É o padrão da indústria de games e renderização realtime. No Blender, conecte o nó \`Image Texture\` (em \`Non-Color\`) a um \`Normal Map\` e este à entrada \`Normal\` do Principled.

## Displacement: o relevo de verdade
Já o **Displacement** modifica *de fato* a geometria — os vértices se movem. Isso gera silhuetas reais e sombras corretas, mas exige uma malha densa (com muitas subdivisões). Use o modificador \`Subdivision Surface\` em modo *adaptive* ou ative \`Experimental\` no Cycles para deslocamento real. Em Eevee, o displacement é apenas visual.

A regra prática é: comece com Bump/Normal para a maioria dos casos, e só recorra a Displacement quando a silhueta for visível em close-up.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. No Shader Editor, Shift+A → Texture → Image Texture\n2. Carregue sua textura de bump (em escala de cinza)\n3. Mude o Color Space da imagem para 'Non-Color'\n4. Shift+A → Vector → Bump\n5. Conecte: Image Texture (Color) → Bump (Height) → Principled (Normal)\n6. Ajuste a Strength do Bump (geralmente entre 0.1 e 1.0)",
      },
      {
        lang: "passo-a-passo",
        code: "# Para Normal Map\n1. Image Texture → carregue o normal map (azulado)\n2. Color Space: Non-Color\n3. Shift+A → Vector → Normal Map\n4. Conecte: Image Texture (Color) → Normal Map (Color) → Principled (Normal)\n5. Confirme que o 'Space' do Normal Map está em 'Tangent' (padrão)",
      },
      {
        lang: "python",
        code: "import bpy\n\nmat = bpy.data.materials['MeuMaterial']\nnodes = mat.node_tree.nodes\nlinks = mat.node_tree.links\n\n# Cria os nós necessários\ntex = nodes.new('ShaderNodeTexImage')\ntex.image = bpy.data.images.load('/caminho/normal.png')\ntex.image.colorspace_settings.name = 'Non-Color'\n\nnormal_map = nodes.new('ShaderNodeNormalMap')\nbsdf = nodes['Principled BSDF']\n\nlinks.new(tex.outputs['Color'], normal_map.inputs['Color'])\nlinks.new(normal_map.outputs['Normal'], bsdf.inputs['Normal'])",
      },
      {
        lang: "config",
        code: "# Quando usar cada técnica\nBump:         detalhes finos, distantes, baratos | Strength 0.1–1.0\nNormal Map:   detalhes médios, padrão da indústria | Strength 0.5–1.5\nDisplacement: silhueta visível em close, exige malha densa | Scale 0.05–0.5\n\n# No Material Properties:\nSettings → Surface → Displacement: 'Bump Only' | 'Displacement Only' | 'Both'",
      },
    ],
    points: [
      "**Bump** usa escala de cinza e só engana a iluminação — não muda geometria",
      "**Normal Map** usa cores RGB para direções X,Y,Z e dá detalhes muito melhores",
      "**Displacement** move vértices de verdade, mas precisa de subdivisão alta",
      "Sempre marque texturas de relevo como \`Non-Color\` — senão os valores ficam errados",
      "**Eevee** não faz displacement real; **Cycles** faz, mas só com 'Experimental' ativado",
      "Use o modificador \`Subdivision Surface\` em modo **Adaptive** para displacement performante",
      "Combine Bump (microdetalhe) + Normal Map (médio) para resultado profissional",
    ],
    alerts: [
      {
        type: "warning",
        content: "Normal maps que parecem \"invertidos\" (dentro pra fora) geralmente são do tipo **DirectX** e não **OpenGL**. Inverta o canal verde com um nó \`Separate Color\` + \`Combine Color\` ou use \`Invert\` no canal G.",
      },
      {
        type: "tip",
        content: "Para testar rapidamente se o normal map está funcionando, role a câmera ao redor do objeto. As sombras de microdetalhe devem se mover de forma coerente com a luz.",
      },
      {
        type: "info",
        content: "Bake de Normal Maps é um capítulo à parte: você esculpe um modelo high-poly, gera um normal e aplica em uma versão low-poly. Isso é o coração de assets para games.",
      },
    ],
  },
  {
    slug: "emission-glow",
    section: "materiais",
    title: "Emission e Glow: superfícies que emitem luz",
    difficulty: "iniciante",
    subtitle: "Como criar lâmpadas, neon, lava e qualquer coisa que brilhe sozinha.",
    intro: `
Nem toda iluminação em uma cena precisa vir de objetos do tipo \`Light\`. Você pode transformar qualquer superfície em uma fonte luminosa usando o canal **Emission** do Principled BSDF — ou um nó dedicado chamado \`Emission\`. É assim que se faz lâmpadas, telas de TV, neons, lava, partículas brilhantes, e até iluminação de estúdio com paineis (os famosos *softboxes*).

Tecnicamente, **Emission** adiciona luz à superfície sem calcular sombreamento. Ela ignora a iluminação ambiente: mesmo no escuro, o objeto continua brilhando. Em **Cycles**, essa luz emitida ilumina objetos vizinhos de verdade (chamamos isso de **iluminação indireta**). Já em **Eevee**, por padrão, ela apenas brilha visualmente — para que ilumine a cena, você precisa ativar **Bloom** e/ou **Irradiance Volumes** ou usar o novo Eevee Next com **Light Probes**.

## Como controlar a intensidade
Dentro do Principled, abra a seção **Emission** e ajuste **Emission Color** (a cor da luz) e **Emission Strength** (intensidade, em watts/m²). Valores típicos vão de \`1\` (pouco brilho) até \`50+\` (lâmpada potente). Para criar o efeito de **glow** — aquele halo luminoso ao redor do objeto — ative **Bloom** em \`Render Properties → Bloom\` (Eevee) ou use o **Compositor** com o nó \`Glare\` em Cycles.

## Quando usar Emission vs Lights
Use \`Emission\` quando o objeto luminoso *aparece na cena* (uma lâmpada visível). Use objetos do tipo \`Light\` (Point, Sun, Area) quando você quer iluminar sem que a fonte seja vista. Em renders profissionais, ambos coexistem.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Selecione o objeto que vai brilhar\n2. Abra o Principled BSDF e role até a seção 'Emission'\n3. Clique na cor de Emission e escolha a tonalidade (ex: branco para lâmpada)\n4. Aumente 'Emission Strength' para 5, 10, 20…\n5. Em Eevee: Render Properties → Bloom (ative) — para ver o halo\n6. Em Cycles: já funciona, e ainda ilumina os objetos próximos",
      },
      {
        lang: "config",
        code: "# Valores típicos de Emission Strength\nVela:         1–3\nLâmpada quente: 5–15 (cor #ffcc88)\nLâmpada fria:   10–25 (cor #e8f0ff)\nNeon:           20–50 (cor saturada)\nSol direto:     100+\nLava:           3–8 (cor #ff4400)",
      },
      {
        lang: "python",
        code: "import bpy\n\nmat = bpy.data.materials.new('LampadaQuente')\nmat.use_nodes = True\nbsdf = mat.node_tree.nodes['Principled BSDF']\n\n# Configura emissão\nbsdf.inputs['Emission Color'].default_value = (1.0, 0.85, 0.6, 1.0)  # quente\nbsdf.inputs['Emission Strength'].default_value = 12.0\n\n# Para Eevee detectar como luz, ative Bloom:\nbpy.context.scene.eevee.use_bloom = True  # Eevee Legacy",
      },
      {
        lang: "atalho",
        code: "Z → Rendered (para ver o brilho real) | F12 → render final | Ctrl+B (Compositor) → Bounding box para Glare",
      },
    ],
    points: [
      "**Emission** transforma uma superfície em fonte de luz — ideal para lâmpadas, neon e telas",
      "Em **Cycles**, emission ilumina objetos vizinhos de verdade (luz indireta)",
      "Em **Eevee**, ative **Bloom** para ver o halo característico de objetos brilhantes",
      "**Emission Strength** vai de 0 a 100+; comece pequeno e suba até parecer natural",
      "Você pode misturar emission com base color: o material brilha **e** mostra textura",
      "Para halos artísticos exagerados, use o nó \`Glare\` no Compositor ao invés de só Bloom",
      "Emission **não** projeta sombras de si mesma — é luz pura adicionada ao final",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para criar uma **TV ligada**, conecte uma textura de imagem ou vídeo (\`Image Texture\` com sequência) na entrada **Emission Color** do Principled. Brilhante e literal.",
      },
      {
        type: "warning",
        content: "Cuidado com Emission Strength acima de 50 em Cycles — pode gerar **fireflies** (pixels brancos aleatórios). Aumente as samples ou use Clamp Indirect em Render Properties.",
      },
      {
        type: "success",
        content: "Combinar um plano com Emission alta + um modificador \`Solidify\` cria painéis de luz tipo softbox perfeitos para retratos 3D estilo estúdio.",
      },
    ],
  },
  {
    slug: "transparencia-vidro",
    section: "materiais",
    title: "Transparência e Vidro: do plástico fino ao cristal",
    difficulty: "iniciante",
    subtitle: "Tudo que você precisa para criar materiais translúcidos convincentes.",
    intro: `
Materiais transparentes são um dos pontos onde renderização fica visivelmente mais cara — mas também onde o resultado impressiona mais. Em Blender, há basicamente três caminhos para criar transparência: o canal **Alpha** do Principled (para coisas como folhas, decalques e plásticos finos), o canal **Transmission** (para vidro, água, gelo) e o shader dedicado **Glass BSDF** (a versão clássica, ainda útil em alguns casos).

A diferença fundamental é: **Alpha** apenas "apaga" o pixel, sem refração; **Transmission** simula luz atravessando um meio com índice de refração (\`IOR\`), gerando aquela distorção característica do vidro. Para uma janela ou copo, você quer Transmission. Para uma folha de árvore, basta Alpha com uma textura que tenha canal alfa.

## Configurando vidro com Transmission
No Principled, ajuste **Transmission Weight** para \`1.0\`, **Roughness** para algo entre \`0\` (cristal) e \`0.3\` (vidro fosco), e **IOR** para \`1.45\` (vidro comum). Em Cycles o resultado é fotográfico; em Eevee você precisa marcar a opção **Screen Space Refraction** em \`Render Properties\` *e* ativar **Refraction** em \`Material Properties → Settings\`.

## Backface culling e blend mode
Para Alpha funcionar bem em Eevee, mude \`Settings → Blend Mode\` para **Alpha Blend** ou **Alpha Hashed**. \`Alpha Clip\` também serve para casos binários (folhas). Em Cycles, isso não é necessário — Alpha funciona automaticamente.

Vidro é também onde o conceito de **Caustics** aparece: aqueles padrões luminosos que se formam ao atravessar curvas de vidro. Cycles os calcula nativamente, mas a custo alto.
    `,
    codes: [
      {
        lang: "config",
        code: "# Valores comuns para vidro / transparência\nVidro de janela: Transmission 1, Roughness 0,    IOR 1.45\nVidro fosco:     Transmission 1, Roughness 0.25, IOR 1.45\nÁgua:            Transmission 1, Roughness 0,    IOR 1.33\nCristal:         Transmission 1, Roughness 0,    IOR 1.55\nFolha de árvore: Alpha (textura), sem Transmission",
      },
      {
        lang: "passo-a-passo",
        code: "# Vidro em Eevee\n1. Material → Principled BSDF\n2. Transmission Weight = 1.0\n3. Roughness = 0\n4. IOR = 1.45\n5. Render Properties → Screen Space Reflections → marque 'Refraction'\n6. Material Properties → Settings → marque 'Screen Space Refraction'\n7. Mude para modo Rendered (Z)",
      },
      {
        lang: "passo-a-passo",
        code: "# Folha com canal alfa\n1. Image Texture com PNG transparente → Principled.Base Color\n2. Conecte Image.Alpha → Principled.Alpha\n3. Material Properties → Settings → Blend Mode: 'Alpha Hashed'\n4. Marque 'Backface Culling' se necessário",
      },
      {
        lang: "python",
        code: "import bpy\n\nmat = bpy.data.materials.new('Vidro')\nmat.use_nodes = True\nbsdf = mat.node_tree.nodes['Principled BSDF']\n\nbsdf.inputs['Transmission Weight'].default_value = 1.0\nbsdf.inputs['Roughness'].default_value = 0.0\nbsdf.inputs['IOR'].default_value = 1.45\nbsdf.inputs['Base Color'].default_value = (1.0, 1.0, 1.0, 1.0)\n\n# Eevee precisa de configurações extras no material\nmat.use_screen_refraction = True\nmat.blend_method = 'BLEND'",
      },
    ],
    points: [
      "**Alpha** apaga o pixel; **Transmission** simula refração com IOR — não confunda os dois",
      "**IOR** padrão: água 1.33, vidro 1.45, cristal 1.5–1.55, diamante 2.4",
      "Em **Eevee**, vidro exige ativar Screen Space Refraction em dois lugares (Render e Material)",
      "Use **Alpha Hashed** para texturas com transparência parcial; **Alpha Blend** para vidros suaves",
      "**Cycles** lida com vidro automaticamente, mas é mais lento — aumente as Transmission Bounces",
      "Vidro com **Roughness > 0** vira vidro fosco (jateado), ótimo para banheiros",
      "**Caustics** (padrões de luz) só funcionam bem em Cycles e exigem amostras altas",
    ],
    alerts: [
      {
        type: "warning",
        content: "Modelar vidro como uma única face (sem espessura) gera refração errada em Cycles. Sempre use o modificador \`Solidify\` para dar **espessura** ao vidro.",
      },
      {
        type: "tip",
        content: "Para vidro colorido (garrafas), use **Volume Absorption** dentro do nó Volume do Material Output, com cor e densidade. O resultado fica muito mais realista que só mudar a Base Color.",
      },
      {
        type: "info",
        content: "Em Eevee, a ordem dos objetos transparentes pode causar artefatos. Use **Material Properties → Settings → Sort** para corrigir transparências sobrepostas.",
      },
    ],
  },
  {
    slug: "shader-editor-nodes",
    section: "materiais",
    title: "Shader Editor: pensando em nós",
    difficulty: "iniciante",
    subtitle: "Conhecendo o ambiente onde toda a mágica de materiais acontece.",
    intro: `
Até agora você usou o Principled BSDF como uma "interface amigável" através do painel Material Properties. Mas o verdadeiro poder dos materiais no Blender está no **Shader Editor**, um espaço visual onde você conecta blocos (chamados **nós**) por linhas (chamadas **links**) para construir comportamentos complexos. É como Lego: cada peça tem entradas e saídas, e o resultado final aparece em tempo real no viewport.

Para abrir o Shader Editor, divida sua tela ou troque um painel existente clicando no ícone de tipo de editor (canto superior esquerdo) e escolha **Shader Editor**. Confirme que o modo está em **Object** e que há um material ativo no objeto selecionado. Você verá o **Principled BSDF** já conectado ao **Material Output** — esse é o nó "saída final" que entrega o material para o motor de render.

## Adicionando e conectando nós
Use \`Shift+A\` para abrir o menu **Add**, organizado em categorias: \`Texture\`, \`Color\`, \`Vector\`, \`Converter\`, \`Shader\` e mais. Para conectar dois nós, clique e arraste de um soquete de saída (à direita) para um soquete de entrada (à esquerda). As cores dos soquetes indicam o tipo de dado: amarelo para cores, cinza para valores numéricos, roxo para vetores, verde para shaders.

## Boas práticas desde o início
Use \`G\` para mover, \`Shift+D\` para duplicar, \`M\` para silenciar (mute) e \`Ctrl+J\` para agrupar nós em quadros (frames) coloridos. Instale o addon **Node Wrangler** (vem com o Blender) e ative-o em \`Edit → Preferences → Add-ons\` — ele adiciona dezenas de atalhos essenciais. Pensar em nós é uma habilidade transferível: Substance Designer, Houdini, Unreal e ComfyUI usam o mesmo paradigma.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Shift+A → Add Node\nG → Mover  |  Shift+D → Duplicar  |  X → Deletar\nF → Conectar nós selecionados  |  Ctrl+X → Deletar mantendo conexão\nM → Silenciar nó  |  Ctrl+J → Agrupar em Frame\nCtrl+Shift+clique → Visualizar saída do nó (com Node Wrangler)\nCtrl+T → Adicionar Mapping + Texture Coordinate (Node Wrangler)",
      },
      {
        lang: "passo-a-passo",
        code: "1. Vá ao topo da tela e clique na aba 'Shading' (workspace pré-configurado)\n2. O Shader Editor já aparece embaixo do viewport\n3. Selecione um objeto com material; os nós aparecem\n4. Edit → Preferences → Add-ons → busque 'Node Wrangler' e marque\n5. Volte ao Shader Editor e teste: Ctrl+Shift+T → carregar PBR pack\n6. Use a roda do mouse para zoom; clique do meio para pan",
      },
      {
        lang: "config",
        code: "# Cores dos soquetes (sockets)\nAmarelo:    cor RGBA\nCinza:      valor numérico (float)\nRoxo:       vetor 3D (X,Y,Z) — coordenadas, normais\nVerde:      shader (BSDF, Emission, Volume)\nAzul claro: string ou outros\n\n# Linhas pontilhadas = conversão automática (gray↔color)",
      },
      {
        lang: "python",
        code: "import bpy\n\nmat = bpy.data.materials['Material']\nnt = mat.node_tree\n\n# Limpa todos os nós existentes\nnt.nodes.clear()\n\n# Adiciona Principled BSDF e Output\nbsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')\nout = nt.nodes.new('ShaderNodeOutputMaterial')\n\n# Posiciona\nbsdf.location = (0, 0)\nout.location = (300, 0)\n\n# Conecta\nnt.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])",
      },
    ],
    points: [
      "**Shader Editor** é onde você desenha materiais como um diagrama de blocos",
      "**Material Output** é o nó final que entrega o resultado ao render — sempre precisa estar conectado",
      "Cores dos soquetes indicam tipos: **amarelo=cor**, **cinza=número**, **roxo=vetor**, **verde=shader**",
      "**Node Wrangler** é obrigatório — ative em Preferences e ganhe dezenas de atalhos",
      "\`Ctrl+Shift+clique\` em um nó (com Node Wrangler) liga ele direto ao output: ótimo para debug",
      "Use \`Ctrl+J\` para criar **Frames** (quadros) e organizar seus nós por função",
      "O paradigma de nós é universal: o que aprender aqui serve em Substance, Houdini e Unreal",
    ],
    alerts: [
      {
        type: "tip",
        content: "Salve seus materiais favoritos como **Asset** clicando direito no material e marcando **Mark as Asset**. Eles aparecerão no Asset Browser para reutilização em outros projetos.",
      },
      {
        type: "warning",
        content: "Se um nó está cinza/desabilitado, você o silenciou com \`M\`. Aperte \`M\` novamente para reativá-lo.",
      },
      {
        type: "info",
        content: "Você pode arrastar uma imagem direto do Explorer/Finder para dentro do Shader Editor — ela vira automaticamente um nó \`Image Texture\`.",
      },
    ],
  },
  {
    slug: "mix-shaders",
    section: "materiais",
    title: "Mix Shaders: combinando materiais",
    difficulty: "intermediario",
    subtitle: "Como misturar dois ou mais shaders para criar materiais compostos realistas.",
    intro: `
Materiais reais raramente são "puros". Uma maçã tem áreas brilhantes e áreas opacas; uma estátua de mármore tem partes polidas e partes desgastadas; um carro tem pintura, metal e adesivos coexistindo. Para representar essa complexidade, o Blender oferece o nó **Mix Shader** — uma forma de **interpolar** dois shaders inteiros, controlado por um **fator** (Fac) que vai de 0 a 1.

Quando \`Fac = 0\`, você vê 100% do shader de cima. Quando \`Fac = 1\`, você vê 100% do de baixo. Valores intermediários geram blend linear. O grande poder vem ao usar uma **textura** ou uma **máscara procedural** como Fac: aí você consegue dizer "essas partes são metal e aquelas são tinta", pixel por pixel.

## Tipos de mistura úteis
Existem três variações principais: **Mix Shader** (combina dois shaders), **Add Shader** (soma — útil para emissão sobre superfície) e o nó **Mix** com tipo *Color* (para misturar texturas antes do shader). Saber qual usar depende do efeito desejado.

## Casos clássicos
Pintura sobre metal, gelo sobre rocha, sangue sobre pele, ferrugem em estrutura, esmalte em cerâmica — todos usam Mix Shader com uma máscara. A máscara pode ser uma textura pintada, um nó \`Noise Texture\`, um \`Pointiness\` (para destacar quinas) ou um \`Color Ramp\` aplicado a qualquer entrada.

Dominar Mix Shader é o que separa um material plano de um material **convincente**. Você verá que muitos materiais fotorrealistas são, na verdade, dois ou três Principleds misturados com inteligência.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "# Pintura desgastada sobre metal\n1. Crie dois Principled BSDF: 'tinta' (Metallic 0) e 'metal' (Metallic 1)\n2. Shift+A → Shader → Mix Shader\n3. Conecte tinta → entrada superior, metal → entrada inferior\n4. Conecte Mix Shader → Material Output (Surface)\n5. Adicione Noise Texture + Color Ramp como Fac\n6. Ajuste Color Ramp para criar 'manchas' onde o metal aparece",
      },
      {
        lang: "config",
        code: "# Quando usar cada nó\nMix Shader: combina 2 shaders por Fac (0–1)\nAdd Shader: soma intensidades (útil p/ emissão extra sobre material)\nMix (Color): mistura cores/valores antes do shader\nMix (Vector): mistura coordenadas/normais\n\n# Estratégias de máscara comuns\nNoise Texture + Color Ramp → manchas orgânicas\nPointiness (Geometry) → desgaste em quinas\nVertex Color → controle pintado à mão\nUV Texture pintada → controle fino em áreas específicas",
      },
      {
        lang: "python",
        code: "import bpy\n\nmat = bpy.data.materials.new('PinturaSobreMetal')\nmat.use_nodes = True\nnt = mat.node_tree\nnt.nodes.clear()\n\ntinta = nt.nodes.new('ShaderNodeBsdfPrincipled')\ntinta.inputs['Base Color'].default_value = (0.8, 0.1, 0.1, 1)\ntinta.inputs['Roughness'].default_value = 0.4\n\nmetal = nt.nodes.new('ShaderNodeBsdfPrincipled')\nmetal.inputs['Base Color'].default_value = (0.5, 0.5, 0.5, 1)\nmetal.inputs['Metallic'].default_value = 1.0\nmetal.inputs['Roughness'].default_value = 0.6\n\nmix = nt.nodes.new('ShaderNodeMixShader')\nout = nt.nodes.new('ShaderNodeOutputMaterial')\n\nnt.links.new(tinta.outputs['BSDF'], mix.inputs[1])\nnt.links.new(metal.outputs['BSDF'], mix.inputs[2])\nnt.links.new(mix.outputs['Shader'], out.inputs['Surface'])",
      },
      {
        lang: "atalho",
        code: "Shift+A → Shader → Mix Shader  |  Ctrl+Shift+clique no Mix (Node Wrangler) → preview do mix",
      },
    ],
    points: [
      "**Mix Shader** combina dois shaders por meio de um **Fac** (fator de 0 a 1)",
      "Use **texturas** como Fac para criar materiais compostos realistas",
      "**Add Shader** soma intensidades; útil para empilhar emissão sobre uma base",
      "**Pointiness** (Geometry) cria desgaste automático em arestas — efeito 'envelhecido'",
      "Combine \`Noise Texture\` + \`Color Ramp\` para máscaras orgânicas e variadas",
      "Você pode encadear vários Mix Shaders para 3+ materiais — mas vire **Node Group** para organizar",
      "Materiais profissionais tipicamente são 2–4 Principleds misturados, não um só",
    ],
    alerts: [
      {
        type: "tip",
        content: "Use **Vertex Paint** (\`Object Mode → Vertex Paint\`) para pintar máscaras à mão e conectá-las via \`Vertex Color\` no Shader Editor. Controle artístico total.",
      },
      {
        type: "warning",
        content: "Mix Shader **dobra o custo** de render (ele calcula os dois shaders e mistura). Em cenas pesadas, considere usar texturas pré-bakeadas se possível.",
      },
      {
        type: "success",
        content: "O nó **Geometry → Pointiness** é o segredo dos materiais com desgaste realista nas quinas. Funciona melhor em Cycles e exige um pouco de subdivisão na malha.",
      },
    ],
  },
  {
    slug: "procedural-noise-voronoi",
    section: "materiais",
    title: "Texturas Procedurais: Noise, Voronoi e Musgrave",
    difficulty: "intermediario",
    subtitle: "Crie texturas matemáticas infinitamente escaláveis, sem usar imagens.",
    intro: `
Texturas **procedurais** são geradas por equações matemáticas, não por arquivos de imagem. A vantagem é gigantesca: elas têm **resolução infinita** (você pode dar zoom até o nível atômico sem perder qualidade), são **sem repetições** óbvias, ocupam zero espaço em disco e podem ser modificadas dinamicamente por parâmetros. A desvantagem é que dão um pouco mais de trabalho mental para configurar.

O Blender vem com várias texturas procedurais embutidas, acessadas em \`Shift+A → Texture\`. As três mais usadas são **Noise Texture** (padrão orgânico tipo nuvem), **Voronoi Texture** (padrão de células, ótimo para pedras, escamas, pele) e **Musgrave Texture** (variações fractais — ótimo para terreno e madeira).

## Combinando com Color Ramp
Texturas procedurais sozinhas geram tons de cinza ou padrões "crus". O segredo é conectá-las a um **Color Ramp** (\`Shift+A → Converter → Color Ramp\`), que permite mapear esses valores para cores ou contrastes específicos. Ajustar os *stops* do Color Ramp transforma uma noise plana em mármore, em camuflagem militar ou em mapa de altitude.

## Mapping e Texture Coordinate
Para controlar a escala, rotação e posição da textura, use os nós **Texture Coordinate** + **Mapping**. Isso é tão essencial que o Node Wrangler tem um atalho: \`Ctrl+T\` com a textura selecionada já adiciona os dois corretamente conectados. Sem eles, a textura aparece "grudada" no objeto sem controle.

Texturas procedurais são a base para criar materiais únicos, sem depender de bibliotecas — e brilham em projetos abstratos, motion design e ambientes 3D estilizados.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "# Mármore procedural simples\n1. Shift+A → Texture → Noise Texture\n2. Shift+A → Converter → Color Ramp\n3. Conecte Noise.Fac → ColorRamp.Fac\n4. ColorRamp → Principled.Base Color\n5. Adicione mais 2 stops no Color Ramp e use cores de mármore (branco, cinza, bege)\n6. Ajuste Noise.Scale (5–20) e Noise.Detail (10) para complexidade\n7. Selecione a Noise → Ctrl+T (Node Wrangler) para Mapping/TexCoord",
      },
      {
        lang: "config",
        code: "# Parâmetros de Noise Texture\nScale:        tamanho geral do padrão (1–50)\nDetail:       quantos níveis de detalhe (0–15)\nRoughness:    contraste entre níveis (0–1)\nDistortion:   torce o padrão (0–10)\n\n# Voronoi Texture\nFeature: F1 (células), F2 (bordas), Smooth F1 (suave)\nDistance: Euclidean (padrão), Manhattan (quadrado), Chebychev\nRandomness: 0 (grade) → 1 (caótico)\n\n# Musgrave Texture\nType: fBM (orgânico), Multifractal, Hetero Terrain (relevo)",
      },
      {
        lang: "python",
        code: "import bpy\n\nmat = bpy.data.materials.new('Marmore')\nmat.use_nodes = True\nnt = mat.node_tree\n\nnoise = nt.nodes.new('ShaderNodeTexNoise')\nnoise.inputs['Scale'].default_value = 8.0\nnoise.inputs['Detail'].default_value = 12.0\nnoise.inputs['Distortion'].default_value = 1.5\n\nramp = nt.nodes.new('ShaderNodeValToRGB')\nramp.color_ramp.elements[0].color = (0.9, 0.88, 0.85, 1)\nramp.color_ramp.elements[1].color = (0.4, 0.38, 0.35, 1)\n\nbsdf = nt.nodes['Principled BSDF']\nnt.links.new(noise.outputs['Fac'], ramp.inputs['Fac'])\nnt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])",
      },
      {
        lang: "atalho",
        code: "Ctrl+T (Node Wrangler) → adiciona Texture Coordinate + Mapping\nCtrl+Shift+clique → preview de qualquer nó\nShift+A → Texture → escolher procedural",
      },
    ],
    points: [
      "**Procedural** = matemática, não imagem; resolução infinita e zero peso em disco",
      "**Noise Texture** gera padrões orgânicos tipo nuvens — base para muitos materiais naturais",
      "**Voronoi** cria células — perfeito para pedras, escamas de réptil e padrões biológicos",
      "**Musgrave** gera fractais — excelente para terreno, madeira e relevo",
      "Sempre combine procedurais com **Color Ramp** para controlar tons e contrastes",
      "Use **Texture Coordinate + Mapping** (\`Ctrl+T\`) para controlar escala, posição e rotação",
      "Procedurais funcionam em qualquer escala — útil para zoom extremo sem perder detalhe",
    ],
    alerts: [
      {
        type: "tip",
        content: "Empilhe duas Noise Textures em escalas diferentes (uma grande e uma pequena) misturadas com nó \`Mix\` para padrões mais ricos e menos uniformes.",
      },
      {
        type: "info",
        content: "Voronoi com **Smooth F1** e Randomness alta cria materiais incrivelmente naturais — pele, arenito, granito. Vale experimentar.",
      },
      {
        type: "warning",
        content: "Procedurais com **Detail** muito alto (>10) ficam pesadas para renderizar. Ajuste com moderação e use só onde a câmera realmente vai chegar perto.",
      },
    ],
  },
  {
    slug: "image-textures-pbr",
    section: "materiais",
    title: "Image Textures e o fluxo PBR completo",
    difficulty: "intermediario",
    subtitle: "Como montar materiais profissionais usando packs PBR de bibliotecas reais.",
    intro: `
Embora procedurais sejam poderosas, a maioria dos materiais fotorrealistas em produção usa **image textures** — fotos ou pinturas digitalizadas de superfícies reais. O fluxo padrão da indústria é o **PBR** (*Physically Based Rendering*), que organiza um material em vários mapas, cada um responsável por um aspecto: cor, rugosidade, metalicidade, relevo, oclusão de ambiente.

Um pack PBR típico vem com 4 a 6 imagens, com nomes como \`wood_albedo.png\`, \`wood_roughness.png\`, \`wood_normal.png\`, \`wood_ao.png\`, \`wood_displacement.png\`. Cada uma vai em uma entrada diferente do Principled BSDF, com configurações específicas de **Color Space** e nós intermediários.

## Color Space é tudo
A regra de ouro: **apenas a Base Color (Albedo) fica em sRGB**; todas as outras texturas devem ser marcadas como **Non-Color**. Isso porque sRGB aplica uma curva gamma que distorce valores numéricos — ótimo para cores, péssimo para dados como rugosidade.

## Atalho de ouro: Node Wrangler
Com o **Node Wrangler** ativo, selecione o Principled BSDF e aperte \`Ctrl+Shift+T\`. Uma janela abre, você seleciona todas as texturas do pack PBR de uma vez, e o Blender automaticamente: cria os \`Image Texture\`, ajusta o Color Space, conecta nas entradas certas, adiciona \`Normal Map\` e \`Bump\` quando necessário, e até cria o \`Mapping\` + \`Texture Coordinate\`. Trabalho de 5 minutos vira 5 segundos.

## Onde achar texturas
**Polyhaven**, **AmbientCG** e **Texture Haven** oferecem milhares de packs PBR gratuitos em CC0 (uso livre, comercial inclusive). Baixe sempre na resolução adequada (\`2K\` para uso comum, \`4K\` para closes).
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "# Fluxo manual completo\n1. Image Texture (Albedo)   → Principled.Base Color    [sRGB]\n2. Image Texture (Roughness)→ Principled.Roughness    [Non-Color]\n3. Image Texture (Metallic) → Principled.Metallic     [Non-Color]\n4. Image Texture (Normal)   → Normal Map → Principled.Normal [Non-Color]\n5. Image Texture (AO)       → Mix(Multiply) com Albedo → Base Color [Non-Color]\n6. Image Texture (Disp.)    → Displacement → Material Output.Displacement [Non-Color]\n7. Conecte Texture Coordinate.UV → Mapping → todas as texturas",
      },
      {
        lang: "atalho",
        code: "# Com Node Wrangler ativo:\nSelecione Principled → Ctrl+Shift+T → escolha as texturas → pronto!\n\n# Outros\nCtrl+T → Mapping + TexCoord\nCtrl+Shift+clique → preview\nShift+Ctrl+W → ligar nós em série",
      },
      {
        lang: "config",
        code: "# Color Space por tipo de mapa\nAlbedo / Base Color / Diffuse: sRGB\nRoughness:                     Non-Color\nMetallic:                      Non-Color\nNormal:                        Non-Color\nDisplacement / Height:         Non-Color\nAmbient Occlusion:             Non-Color\nEmission Color:                sRGB\n\n# Resoluções recomendadas\nMobiliário distante: 1K  (1024×1024)\nUso geral:           2K  (2048×2048)\nClose-up / hero:     4K  (4096×4096)\nCinema:              8K+ (com cuidado de RAM)",
      },
      {
        lang: "python",
        code: "import bpy\nimport os\n\ndef carrega_pbr(mat, pasta):\n    nt = mat.node_tree\n    bsdf = nt.nodes['Principled BSDF']\n\n    mapas = {\n        'albedo':    ('Base Color',  'sRGB'),\n        'roughness': ('Roughness',   'Non-Color'),\n        'metallic':  ('Metallic',    'Non-Color'),\n    }\n    for nome, (entrada, espaco) in mapas.items():\n        path = os.path.join(pasta, f'{nome}.png')\n        if not os.path.exists(path):\n            continue\n        tex = nt.nodes.new('ShaderNodeTexImage')\n        tex.image = bpy.data.images.load(path)\n        tex.image.colorspace_settings.name = espaco\n        nt.links.new(tex.outputs['Color'], bsdf.inputs[entrada])",
      },
    ],
    points: [
      "Pack PBR padrão tem **Albedo + Roughness + Metallic + Normal**, opcionalmente AO e Displacement",
      "**Apenas o Albedo** fica em sRGB; todo o resto deve ser **Non-Color**",
      "**Node Wrangler + Ctrl+Shift+T** automatiza a criação completa de um material PBR",
      "Sempre adicione **Texture Coordinate + Mapping** para controlar escala da textura no objeto",
      "Use **Polyhaven**, **AmbientCG** e **Texture Haven** — tudo CC0 e excelente qualidade",
      "**AO** se conecta ao Base Color via nó \`Mix\` em modo Multiply, com Fac entre 0.5 e 1.0",
      "Texturas em **4K** consomem muita RAM — use 2K como padrão e suba só quando necessário",
    ],
    alerts: [
      {
        type: "danger",
        content: "Esquecer de marcar Roughness/Normal como **Non-Color** é o erro mais comum. O sintoma é: material com brilho e relevo errados, mesmo parecendo conectado certinho.",
      },
      {
        type: "tip",
        content: "Com o Node Wrangler, salve packs PBR em uma pasta padrão. \`Ctrl+Shift+T\` lembra do último diretório, agilizando o fluxo enormemente.",
      },
      {
        type: "info",
        content: "Para tiles repetitivos, use o nó **Texture Coordinate → UV** e ajuste a escala em **Mapping**. Para evitar repetição visível, considere o nó **Brick Texture** ou **Wear Layer** com noise.",
      },
    ],
  },
  {
    slug: "node-groups",
    section: "materiais",
    title: "Node Groups: encapsulando materiais reutilizáveis",
    difficulty: "avancado",
    subtitle: "Transforme redes complexas de nós em \"caixas\" limpas e parametrizadas.",
    intro: `
Quando suas redes de shader passam de 20 nós, fica difícil enxergar a lógica. É aí que entram os **Node Groups**: uma forma de pegar um conjunto de nós e empacotá-los em um único bloco, com entradas e saídas customizadas. O resultado é um nó "personalizado" que se comporta como qualquer outro do Blender — você pode reutilizá-lo, copiá-lo entre arquivos e até compartilhá-lo como asset.

Pense em Node Groups como **funções** na programação: você define os parâmetros de entrada, encapsula a lógica complexa e expõe apenas o que importa. Isso traz três grandes benefícios: **organização** (uma rede de 50 nós vira 1 bloco limpo), **reutilização** (mesmo material em vários objetos, com variações), e **manutenção** (mudou algo dentro do grupo? todas as instâncias atualizam).

## Como criar um Node Group
Selecione os nós que quer agrupar e aperte \`Ctrl+G\`. O Blender abre o "interior" do grupo, mostrando dois nós especiais: **Group Input** e **Group Output**. Você arrasta sockets dos nós internos para esses dois para definir o que entra e o que sai. Para sair do grupo, aperte \`Tab\` ou \`Ctrl+Tab\`.

## Boas práticas
Dê **nomes descritivos** às entradas/saídas (em vez de "Value", use "Wear Amount"). Defina **valores padrão** sensatos. Para parâmetros numéricos, configure **min/max** para evitar valores quebrados. Documente complexidade com **Frame Notes**.

## Reutilizando entre arquivos
Para usar um Node Group em outro arquivo .blend, vá em \`File → Append → Materials\` ou \`File → Append → Node Tree\`. Melhor ainda: marque o grupo como **Asset** (\`Mark as Asset\` no clique direito), e ele aparece no **Asset Browser** de qualquer projeto, prontinho para arrastar.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Selecione os nós que quer agrupar (caixa de seleção ou Shift+clique)\n2. Aperte Ctrl+G — o Blender entra no 'interior' do grupo\n3. Você vê 'Group Input' (esquerda) e 'Group Output' (direita)\n4. Arraste sockets dos nós internos para Input/Output para expô-los\n5. No painel N → Group, renomeie entradas e ajuste defaults/min/max\n6. Tab para sair do grupo\n7. O bloco resultante pode ser duplicado e reutilizado livremente",
      },
      {
        lang: "atalho",
        code: "Ctrl+G        → criar Node Group dos nós selecionados\nCtrl+Alt+G    → desfazer agrupamento (ungroup)\nTab           → entrar/sair de um Node Group\nN             → painel lateral com propriedades do grupo\nShift+A → Group → reusar grupo existente",
      },
      {
        lang: "config",
        code: "# Estrutura típica de um Node Group reutilizável\nEntradas (Inputs):\n  - Base Color (Color, default: cinza)\n  - Wear Amount (Float, 0–1, default: 0.3)\n  - Roughness Variation (Float, 0–1, default: 0.5)\n  - Scale (Float, 0.1–100, default: 1.0)\n\nSaídas (Outputs):\n  - Shader (Shader)\n  - Mask (Color, opcional para debug)\n\n# Marque como Asset:\nClique direito no grupo → Mark as Asset → Catalog: 'Meus Materiais'",
      },
      {
        lang: "python",
        code: "import bpy\n\n# Cria um Node Group programaticamente\ngroup = bpy.data.node_groups.new('MeuGrupo', 'ShaderNodeTree')\n\n# Adiciona Input/Output\ngroup_in = group.nodes.new('NodeGroupInput')\ngroup_out = group.nodes.new('NodeGroupOutput')\ngroup_in.location = (-300, 0)\ngroup_out.location = (300, 0)\n\n# Define interface (Blender 4.x usa group.interface)\ngroup.interface.new_socket('Color', in_out='INPUT', socket_type='NodeSocketColor')\ngroup.interface.new_socket('Shader', in_out='OUTPUT', socket_type='NodeSocketShader')\n\n# Adiciona um Principled dentro\nbsdf = group.nodes.new('ShaderNodeBsdfPrincipled')\ngroup.links.new(group_in.outputs['Color'], bsdf.inputs['Base Color'])\ngroup.links.new(bsdf.outputs['BSDF'], group_out.inputs['Shader'])",
      },
    ],
    points: [
      "**Node Groups** são como funções: encapsulam lógica complexa em um único bloco",
      "Use \`Ctrl+G\` para agrupar e \`Ctrl+Alt+G\` para desfazer",
      "Defina **nomes claros**, **defaults** e **min/max** para entradas — isso vira a 'API' do grupo",
      "**Mark as Asset** torna o grupo disponível no Asset Browser de qualquer projeto",
      "Mudanças no interior do grupo afetam **todas** as instâncias automaticamente",
      "Para isolar uma instância, use \`Make Single User\` no clique direito",
      "Comunidades como **Blender Market** e **Gumroad** vendem packs profissionais de Node Groups",
    ],
    alerts: [
      {
        type: "tip",
        content: "Crie um Node Group chamado **'PBR Mixer'** com entradas para Base Color, Roughness, Metallic, Normal, Wear Mask. Você vai reusar em 90% dos seus materiais.",
      },
      {
        type: "warning",
        content: "Cuidado ao apagar uma instância de Node Group: se for a última, o grupo fica como 'orphan data' e pode ser perdido ao salvar. Marque como **Fake User** (\`F\` no Outliner) para preservar.",
      },
      {
        type: "success",
        content: "Aprender a construir Node Groups limpos é o que separa um usuário casual de um **Technical Artist**. É também a base para criar add-ons de shading e packs comerciais.",
      },
    ],
  },
];
