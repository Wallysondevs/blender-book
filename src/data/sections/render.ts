import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "eevee-vs-cycles",
    section: "render",
    title: "Eevee vs Cycles: escolhendo o motor certo",
    difficulty: "iniciante",
    subtitle: "Entenda a diferença entre os dois motores de render do Blender e quando usar cada um.",
    intro: `
O Blender vem com dois **motores de render** principais embutidos: o \`Eevee\` e o \`Cycles\`. Um **motor de render** (ou *render engine*) é o programa interno que olha para a sua cena 3D — geometria, luzes, materiais, câmera — e produz a imagem 2D final que você vê. Pense nele como o "fotógrafo" da cena: ele decide como a luz se comporta, como as sombras caem e como os reflexos aparecem. Cada motor tem uma filosofia diferente para fazer essa conversão.

O \`Eevee\` é um motor de **rasterização em tempo real**, parecido com o que jogos modernos usam (Unreal, Unity). Ele aproxima muitos efeitos de luz com truques rápidos, e por isso entrega imagens em frações de segundo. Já o \`Cycles\` é um motor de **path tracing** — ele simula raios de luz quicando pela cena, exatamente como na vida real. O resultado é fisicamente mais correto, com reflexos, refrações e iluminação global naturais, mas leva mais tempo para renderizar.

## Quando usar cada um
Use \`Eevee\` quando você precisa de **velocidade**: animações estilizadas, motion graphics, previews, projetos com prazo apertado e cenas onde o "look" mais importante que o realismo absoluto. Use \`Cycles\` quando você quer **realismo**: produtos, arquitetura, still life, vidro, líquidos, iluminação complexa. Os dois usam o mesmo sistema de materiais (\`Shader Editor\`), então é possível alternar entre eles e ver qual entrega o resultado desejado mais rápido.

Nesta trilha você vai aprender a configurar, otimizar e exportar renders nos dois motores. Comece sempre testando no \`Eevee\` para validar a composição, e depois mude para \`Cycles\` se quiser um acabamento fotorrealista.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Abra Properties Editor (ícone de impressora)\n2. Clique na aba 'Render Properties'\n3. No topo, encontre 'Render Engine'\n4. Escolha entre Eevee, Workbench ou Cycles\n5. A cena recarrega com o motor selecionado" },
      { lang: "python", code: "import bpy\n\n# Trocar para Cycles via script\nbpy.context.scene.render.engine = 'CYCLES'\n\n# Trocar para Eevee Next (Blender 4.2+)\nbpy.context.scene.render.engine = 'BLENDER_EEVEE_NEXT'\n\n# Verificar engine atual\nprint(bpy.context.scene.render.engine)" },
      { lang: "config", code: "# Comparativo rápido\nEevee:   tempo de render ~ segundos     | qualidade: estilizada\nCycles:  tempo de render ~ minutos      | qualidade: fotorrealista\nWorkbench: tempo de render ~ instantâneo | qualidade: técnica/preview" },
      { lang: "atalho", code: "F12 → renderizar frame atual  |  Ctrl+F12 → renderizar animação  |  Esc → cancelar render" },
    ],
    points: [
      "**Eevee** é rasterizado e rápido; **Cycles** é path tracing e fisicamente correto",
      "Você pode alternar de motor a qualquer momento na aba `Render Properties`",
      "Ambos compartilham o mesmo `Shader Editor`, mas alguns nós só funcionam em um deles",
      "**Workbench** é um terceiro motor, usado só para previews técnicos do viewport",
      "Comece pelo Eevee para iterar, e migre para Cycles só na finalização",
      "Armadilha comum: assumir que o material vai ficar idêntico nos dois — sempre teste",
    ],
    alerts: [
      { type: "tip", content: "Pressione \`Z\` no viewport e escolha **Rendered** para ver a cena já com o motor selecionado, sem precisar apertar \`F12\`." },
      { type: "warning", content: "No Blender 4.2+ o Eevee antigo virou **Eevee Next**. Arquivos antigos podem precisar de ajustes ao abrir." },
      { type: "info", content: "Existem motores externos populares como **LuxCore**, **Octane** e **Redshift**, instalados via add-on." },
    ],
  },
  {
    slug: "configurar-render",
    section: "render",
    title: "Configurando o render: resolução, frames e câmera",
    difficulty: "iniciante",
    subtitle: "Os primeiros parâmetros que você precisa ajustar antes de qualquer render.",
    intro: `
Antes de apertar \`F12\` para gerar uma imagem, você precisa configurar **três coisas básicas**: a resolução da imagem, o intervalo de frames (no caso de animação) e a câmera ativa. Esses parâmetros vivem na aba \`Output Properties\` (ícone de impressora pequena) do **Properties Editor**, o painel lateral direito que concentra todas as configurações da cena.

A **resolução** define quantos pixels de largura por altura sua imagem terá. Os presets mais comuns são \`1920×1080\` (Full HD), \`3840×2160\` (4K UHD) e \`1080×1920\` (vertical para redes sociais). Existe também o campo \`Resolution %\` — útil para fazer previews rápidos a 50% antes de subir para 100% no render final. Quanto maior a resolução, mais tempo o render demora, então não exagere logo de cara.

## Câmera ativa e frame range
Toda cena precisa de uma **câmera ativa** para renderizar — sem câmera, o Blender mostra um aviso. Você adiciona uma com \`Shift + A → Camera\` e a torna ativa selecionando-a e apertando \`Ctrl + Numpad 0\`. Para enquadrar manualmente, entre na visão da câmera com \`Numpad 0\` e arraste enquanto segura o botão de navegação.

O **frame range** (\`Frame Start\` e \`Frame End\`) define o intervalo da animação. Por padrão começa em 1 e vai até 250, o que corresponde a ~10 segundos a 24 fps. Sempre ajuste para o tamanho real da sua animação antes de exportar — esquecer isso é um erro clássico que faz o Blender renderizar 250 frames quando você queria 60.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Properties Editor → Output Properties\n2. Em 'Format', defina Resolution X e Y\n3. Ajuste 'Resolution %' (use 50% para preview)\n4. Defina 'Frame Rate' (24 cinema, 30 web, 60 game)\n5. Ajuste 'Frame Start' e 'Frame End'\n6. Em 'Output', escolha a pasta de destino" },
      { lang: "python", code: "import bpy\n\nscene = bpy.context.scene\n\n# Resolução Full HD\nscene.render.resolution_x = 1920\nscene.render.resolution_y = 1080\nscene.render.resolution_percentage = 100\n\n# Frame range\nscene.frame_start = 1\nscene.frame_end = 120\nscene.render.fps = 24\n\n# Pasta de saída\nscene.render.filepath = '//renders/'" },
      { lang: "config", code: "# Presets úteis\nFull HD:   1920 x 1080  (16:9)\n4K UHD:    3840 x 2160  (16:9)\nInstagram: 1080 x 1080  (1:1)\nReels/TikTok: 1080 x 1920 (9:16)\nCinema 2K: 2048 x 858   (2.39:1)" },
      { lang: "atalho", code: "Numpad 0 → ver pela câmera  |  Ctrl+Numpad 0 → tornar objeto a câmera ativa  |  Shift+~ → walk navigation" },
    ],
    points: [
      "**Resolution X/Y** define o tamanho final em pixels da imagem",
      "**Resolution %** permite previews rápidos sem mudar a resolução base",
      "Toda cena precisa de uma **câmera ativa** para renderizar",
      "**Frame Rate** padrão é 24 fps (cinema); ajuste conforme o destino",
      "O caminho \`//\` na pasta de saída significa 'relativo ao arquivo .blend'",
      "Sempre ajuste **Frame Start/End** antes de renderizar uma animação",
    ],
    alerts: [
      { type: "tip", content: "Use \`Resolution % = 50\` durante testes; isso reduz o tempo de render em até 4x." },
      { type: "warning", content: "Se aparecer **'No camera in scene'**, você esqueceu de adicionar ou ativar uma câmera." },
      { type: "info", content: "O caminho \`//renders/\` cria a pasta ao lado do seu arquivo \`.blend\`, mantendo o projeto portátil." },
    ],
  },
  {
    slug: "samples-noise",
    section: "render",
    title: "Samples e ruído: o equilíbrio entre qualidade e tempo",
    difficulty: "iniciante",
    subtitle: "Entenda o que são samples e por que renders aparecem 'granulados' no início.",
    intro: `
Quando você renderiza no \`Cycles\` (e em parte no Eevee), a imagem aparece **granulada**, com pontinhos coloridos espalhados — esse efeito se chama **ruído** ou *noise*. Ele acontece porque o motor está disparando raios de luz aleatórios pela cena, e com poucos raios, o resultado fica "incompleto", como uma foto tirada com pouca luz e ISO alto.

Cada raio disparado é uma **sample**. Quanto mais samples por pixel, menos ruído e mais tempo de render. O parâmetro \`Render Samples\` (em \`Render Properties → Sampling → Render\`) controla esse número. Valores típicos vão de 64 (preview rápido) até 4096 (closeups de produto). Para a maioria das cenas, **128 a 512 samples** já dão um resultado limpo o suficiente.

## Viewport vs Render samples
O Blender separa dois valores: \`Viewport Samples\` (quantos raios usar enquanto você navega na visualização \`Rendered\`) e \`Render Samples\` (quantos usar no render final via \`F12\`). Você pode deixar viewport em 32 para girar a cena fluido, e render em 512 para a imagem final.

Existe também o **Adaptive Sampling**, um recurso inteligente: o Cycles para de disparar raios em pixels que já estão "limpos" e foca nos que ainda têm ruído. Isso economiza muito tempo. Ative em \`Sampling → Adaptive Sampling\` com \`Noise Threshold\` em torno de \`0.01\`. Você verá que o render termina mais rápido sem perda visível de qualidade.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Render Properties → Sampling\n2. Em 'Render', defina samples (ex: 256)\n3. Em 'Viewport', defina samples (ex: 32)\n4. Marque 'Adaptive Sampling'\n5. Defina Noise Threshold = 0.01\n6. Renderize com F12 e observe o tempo" },
      { lang: "python", code: "import bpy\n\nscene = bpy.context.scene\ncycles = scene.cycles\n\n# Samples\ncycles.samples = 256\ncycles.preview_samples = 32\n\n# Adaptive sampling\ncycles.use_adaptive_sampling = True\ncycles.adaptive_threshold = 0.01\ncycles.adaptive_min_samples = 0  # auto" },
      { lang: "config", code: "# Guia rápido de samples (Cycles)\nPreview/teste:        32 - 64 samples\nAnimação estilizada:  128 - 256 samples\nStill realista:       512 - 1024 samples\nCloseup produto:      1024 - 4096 samples\n\nNoise Threshold:\n  0.1   → rápido, pode ter ruído\n  0.01  → bom equilíbrio (recomendado)\n  0.001 → ultra limpo, lento" },
      { lang: "atalho", code: "Z → menu de shading  |  Shift+Z → toggle Rendered/Solid  |  F12 → renderizar  |  F11 → reabrir última imagem renderizada" },
    ],
    points: [
      "**Sample** é cada raio de luz que o motor dispara para calcular a cor de um pixel",
      "Mais samples = menos ruído, mais tempo de render",
      "**Viewport Samples** afeta só a visualização Rendered, não o render final",
      "**Adaptive Sampling** economiza tempo focando em pixels com ruído",
      "Eevee não usa samples por raio; usa **Render Samples** para anti-aliasing",
      "Armadilha: subir samples para 4096 quando o problema era falta de luz",
    ],
    alerts: [
      { type: "tip", content: "Antes de aumentar samples, **adicione mais luz** à cena — luz baixa é a causa #1 de ruído." },
      { type: "info", content: "O atalho \`F11\` reabre a última imagem renderizada — útil para comparar testes." },
      { type: "warning", content: "Samples muito altos com Adaptive Sampling desligado podem dobrar o tempo de render sem ganho visível." },
    ],
  },
  {
    slug: "denoise",
    section: "render",
    title: "Denoise: removendo ruído com inteligência",
    difficulty: "iniciante",
    subtitle: "Como usar o denoiser do Blender para limpar renders sem aumentar samples.",
    intro: `
Mesmo com samples altos, sempre sobra algum ruído — especialmente em sombras, vidros e cantos escuros. Para resolver isso sem dobrar o tempo de render, o Blender oferece o **denoiser**, um filtro de inteligência artificial que olha a imagem ruidosa e "adivinha" como ela ficaria com infinitas samples.

Existem dois denoisers no Blender: o **OpenImageDenoise (OIDN)**, da Intel, ótimo para qualidade final e suportado por CPU e GPU; e o **OptiX Denoiser**, da NVIDIA, ultra rápido mas requer placa RTX. Ambos vivem em \`Render Properties → Sampling → Denoise\`. Você marca a caixa, escolhe qual usar, e pronto — o Blender aplica o denoiser automaticamente após o render.

## Onde o denoise é aplicado
O denoise pode rodar em **dois momentos**: no **viewport** (enquanto você navega na vista Rendered, deixando a imagem limpa em tempo real) e no **render final** (ao apertar \`F12\`). Você pode ligar ambos, separadamente. No viewport, prefira o OptiX por ser mais rápido; no render, OIDN costuma entregar melhor qualidade.

Existe ainda o nó \`Denoise\` no **Compositor**, útil quando você quer denoisar passes específicos (como só os reflexos) ou aplicar um denoise em renders já salvos. Esse caminho é mais avançado, mas dá controle máximo. Você verá que com denoise bem configurado, **128 samples já parecem 1024** — economia gigante de tempo.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Render Properties → Sampling\n2. Em 'Viewport', marque 'Denoise' → escolha OptiX\n3. Em 'Render', marque 'Denoise' → escolha OpenImageDenoise\n4. Em 'Prefilter', deixe Accurate (qualidade)\n5. Renderize: o denoise roda automaticamente no fim\n6. Compare com/sem denoise para ver o ganho" },
      { lang: "python", code: "import bpy\n\ncycles = bpy.context.scene.cycles\n\n# Denoise no render final\ncycles.use_denoising = True\ncycles.denoiser = 'OPENIMAGEDENOISE'  # ou 'OPTIX'\ncycles.denoising_input_passes = 'RGB_ALBEDO_NORMAL'\ncycles.denoising_prefilter = 'ACCURATE'\n\n# Denoise no viewport\ncycles.use_preview_denoising = True\ncycles.preview_denoiser = 'OPTIX'" },
      { lang: "config", code: "# Quando usar cada denoiser\nOpenImageDenoise (OIDN):\n  - Funciona em qualquer máquina (CPU/GPU)\n  - Melhor qualidade final\n  - Usa para o render final\n\nOptiX:\n  - Só placas NVIDIA RTX\n  - Muito rápido\n  - Ideal para viewport e previews\n\nInput Passes:\n  RGB                  → básico\n  RGB + Albedo         → preserva texturas\n  RGB + Albedo + Normal → melhor qualidade (recomendado)" },
      { lang: "atalho", code: "F12 → render com denoise  |  Image Editor → N (sidebar) → Image → Denoise para reaplicar" },
    ],
    points: [
      "**Denoise** é um filtro de IA que limpa o ruído sem aumentar samples",
      "**OIDN** é universal e tem melhor qualidade; **OptiX** é mais rápido (só RTX)",
      "Pode ser aplicado no **viewport** e no **render final** separadamente",
      "**Input Passes RGB+Albedo+Normal** entrega o melhor resultado",
      "Denoise mal configurado pode borrar **detalhes finos** (cabelo, texturas)",
      "No Compositor, o nó \`Denoise\` permite denoisar render já feito",
    ],
    alerts: [
      { type: "success", content: "Com denoise + 128 samples você consegue qualidade equivalente a **1024 samples sem denoise** — economia de até 8x no tempo." },
      { type: "warning", content: "Em animações, o denoise pode causar **flickering** entre frames; nesses casos use o **Temporal Denoise** (mais avançado)." },
      { type: "tip", content: "Renderize sempre com **Albedo + Normal passes** ativos — o denoise fica drasticamente melhor." },
    ],
  },
  {
    slug: "viewport-render",
    section: "render",
    title: "Viewport Render: previews rápidos sem F12",
    difficulty: "iniciante",
    subtitle: "Renderize direto da viewport para validar cenas em segundos.",
    intro: `
Nem todo render precisa passar pelo \`F12\` e esperar minutos pelo Cycles. O Blender tem um recurso chamado **Viewport Render**, que captura exatamente o que está aparecendo no seu viewport — com a iluminação atual, o motor atual e o nível de detalhe atual — e salva como imagem ou animação.

Você acessa em \`View (no header do viewport) → Viewport Render Image\` (para uma imagem) ou \`Viewport Render Animation\` (para uma sequência). Como ele usa o estado atual da viewport, é **muito mais rápido** que um render completo: ótimo para previews de animação, testes de câmera, validação de blocking ou compartilhar prévias com clientes.

## Modos de shading que afetam o resultado
O resultado do Viewport Render depende do **modo de shading** ativo (canto superior direito do viewport): \`Solid\` mostra geometria sem materiais; \`Material Preview\` mostra materiais com iluminação HDRI padrão; \`Rendered\` usa o motor escolhido (Eevee/Cycles) com a iluminação real da cena. Para um preview que simule o render final, use \`Rendered\`.

Combinado com **overlays** (botão dos dois círculos no header do viewport), você pode esconder grade, eixos e outliner para um render limpo. Você verá que para muitos vídeos de redes sociais, motion graphics simples e animações estilizadas, o Viewport Render do Eevee é mais que suficiente — e roda em tempo quase real.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Configure a viewport como quiser ver o render\n2. Mude para shading 'Rendered' (Z → Rendered)\n3. Esconda overlays (botão dos círculos no header)\n4. View → Viewport Render Image (Ctrl+J em alguns binds)\n5. Salve com Image → Save As\n6. Para animação: View → Viewport Render Animation" },
      { lang: "python", code: "import bpy\n\n# Render do viewport via script\nbpy.ops.render.opengl(\n    write_still=True,\n    view_context=True\n)\n\n# Animação do viewport\nbpy.ops.render.opengl(\n    animation=True,\n    view_context=True\n)" },
      { lang: "config", code: "# Quando usar Viewport Render\nUse para:\n  - Preview de animação para o cliente\n  - Teste de câmera e timing\n  - Playblasts em estilo cartoon/lowpoly\n  - Validar blocking e poses\n\nNão use para:\n  - Render final fotorrealista\n  - Cenas com efeitos físicos completos\n  - Comparação de iluminação fina" },
      { lang: "atalho", code: "Z → seletor de shading  |  Alt+Z → toggle X-Ray  |  Numpad 0 → câmera  |  Ctrl+B → render border" },
    ],
    points: [
      "**Viewport Render** captura o que está visível na viewport, sem F12",
      "É **muito mais rápido** que o render normal, ótimo para previews",
      "Usa o **modo de shading** atual (Solid, Material Preview ou Rendered)",
      "Esconda **overlays** antes de renderizar para imagem limpa",
      "Suporta tanto imagem única quanto **animação completa**",
      "Combinado com **Eevee + Rendered**, vira um playblast quase perfeito",
    ],
    alerts: [
      { type: "tip", content: "Use \`Ctrl + B\` para desenhar um **render border** e renderizar só uma região — economiza muito tempo em testes." },
      { type: "info", content: "Para esconder a grade, eixos e cursor: clique no botão de **overlays** no header e desmarque cada item." },
      { type: "warning", content: "Viewport Render **não aplica composição** — efeitos do Compositor não aparecem." },
    ],
  },
  {
    slug: "output-formatos",
    section: "render",
    title: "Output: pasta, nomes e codecs",
    difficulty: "iniciante",
    subtitle: "Configure onde e como o Blender salva seus renders.",
    intro: `
Depois de configurar o motor, samples e denoise, falta dizer ao Blender **onde** e **como** salvar a imagem ou animação. Toda essa configuração mora em \`Output Properties → Output\`. Esse é um passo simples mas que muitos iniciantes esquecem — e perdem horas de render porque o arquivo nunca foi salvo.

O campo principal é \`Output Path\`. Ele aceita caminho absoluto (\`C:\\renders\\\`) ou relativo ao arquivo \`.blend\` (\`//renders/\`). O \`//\` é uma convenção: significa "a partir de onde o .blend está". Isso é ouro para projetos portáteis — copie a pasta inteira e tudo continua funcionando.

## Nomes e numeração de frames
O Blender adiciona automaticamente o número do frame ao final do nome (ex: \`render_0001.png\`, \`render_0002.png\`...). Você pode controlar isso usando \`#\` no nome: \`shot01_####\` vira \`shot01_0001\`, \`shot01_0002\`, etc. Para imagens únicas (still), o Blender usa o número do frame atual.

## Formato e codec
Em \`File Format\` você escolhe entre dezenas de formatos: \`PNG\`, \`JPEG\`, \`OpenEXR\`, \`TIFF\`, \`FFmpeg Video\` etc. Para **animações**, a melhor prática é renderizar como **sequência de imagens** (PNG ou EXR) e depois montar o vídeo no compositor ou em editor externo. Isso evita perder horas de render se o Blender travar no meio: você só re-renderiza os frames que faltam.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Output Properties → Output\n2. Em 'Output Path', clique na pasta e escolha destino\n3. Use prefixo: 'shot01_' (vira shot01_0001.png)\n4. File Format → PNG (ou EXR para alta qualidade)\n5. Color → RGB (ou RGBA se quer transparência)\n6. Color Depth → 8 (PNG) ou 16/32 (EXR)" },
      { lang: "python", code: "import bpy\n\nrender = bpy.context.scene.render\n\n# Caminho relativo ao .blend\nrender.filepath = '//renders/shot01_'\n\n# Formato\nrender.image_settings.file_format = 'PNG'\nrender.image_settings.color_mode = 'RGBA'\nrender.image_settings.color_depth = '16'\nrender.image_settings.compression = 15\n\n# Para EXR\n# render.image_settings.file_format = 'OPEN_EXR_MULTILAYER'\n# render.image_settings.color_depth = '32'" },
      { lang: "config", code: "# Quando usar cada formato\nPNG:   bom padrão, suporta alpha, lossless\nJPEG:  pequeno, sem alpha, com perda — só preview\nTIFF:  alta qualidade, suporta 16-bit, grande\nEXR:   profissional, 32-bit float, suporta layers\nFFmpeg: vídeo direto (mp4, mov), bom para final\n\nPara animação:\n  1. Renderize sequência PNG/EXR\n  2. Monte vídeo no Video Sequencer ou DaVinci" },
      { lang: "atalho", code: "F12 → render still  |  Ctrl+F12 → render animation  |  F3 (na Image Editor) → Save As" },
    ],
    points: [
      "**Output Path** define onde salvar; \`//\` significa relativo ao .blend",
      "Use \`####\` no nome para padding de números de frame",
      "**File Format** escolhe entre PNG, JPEG, EXR, FFmpeg etc.",
      "Para animação, prefira **sequência de imagens** ao invés de vídeo direto",
      "**RGBA** habilita canal alpha para fundo transparente",
      "**Color Depth 16/32** em EXR preserva range para composição",
    ],
    alerts: [
      { type: "warning", content: "Renderizar animação direto como **MP4** é arriscado: se travar no frame 200/300, você perde tudo." },
      { type: "tip", content: "Sempre cheque a pasta de saída antes de \`Ctrl+F12\` — se o caminho estiver errado, o Blender renderiza sem salvar." },
      { type: "info", content: "O caminho \`//\` no início torna o projeto **portátil** entre máquinas e sistemas operacionais." },
    ],
  },
  {
    slug: "png-jpg-exr",
    section: "render",
    title: "PNG, JPG e EXR: qual escolher?",
    difficulty: "iniciante",
    subtitle: "As diferenças práticas entre os três formatos de imagem mais usados em render.",
    intro: `
Quando você abre o seletor \`File Format\` no Blender, encontra dezenas de opções. Mas no dia a dia, três dominam: \`PNG\`, \`JPEG\` e \`OpenEXR\`. Entender quando usar cada um evita problemas comuns: imagem com fundo errado, perda de qualidade, arquivo gigante, ou impossibilidade de fazer composição depois.

O \`PNG\` é o "feijão com arroz": **lossless** (sem perda de qualidade), suporta canal **alpha** (transparência) e tem 8 ou 16 bits por canal. É o padrão para a maioria dos renders, ilustrações e thumbnails. Arquivo razoável, abre em qualquer lugar, ótima escolha quando em dúvida.

O \`JPEG\` é **com perda**: ele descarta informação para diminuir o arquivo. Não suporta alpha. Use só para previews leves, e-mails ou web onde tamanho importa mais que qualidade absoluta. Nunca, jamais, use JPEG para um render que você vai composiçar depois — os artefatos da compressão estragam tudo.

## OpenEXR: o formato profissional
O \`OpenEXR\` (ou só EXR) é o **padrão da indústria** em VFX. Ele guarda imagens em **32 bits float**, ou seja, com precisão muito maior que PNG ou JPEG. Isso permite **ajuste de exposição sem perda**, compositing avançado, e múltiplos passes (diffuse, specular, normal, depth) num único arquivo (\`OpenEXR MultiLayer\`).

A contrapartida é o tamanho: um EXR pode ser 10x maior que um PNG. Mas para projetos sérios — produção, finalização, pós-produção pesada — é o caminho. Você verá que com EXR multilayer, o seu Compositor vira uma ferramenta poderosíssima, capaz de relight, cor seletiva por pass e muito mais.
    `,
    codes: [
      { lang: "config", code: "# Tabela comparativa\n\nFormato | Compressão | Alpha | Bits  | Uso típico\n--------|------------|-------|-------|------------\nPNG     | lossless   | sim   | 8/16  | render padrão, web\nJPEG    | lossy      | não   | 8     | preview, e-mail\nEXR     | lossless   | sim   | 16/32 | VFX, composição\nTIFF    | lossless   | sim   | 8/16  | impressão\nWebP    | lossy/less | sim   | 8     | web moderna" },
      { lang: "passo-a-passo", code: "1. Output Properties → Output\n2. File Format → escolha o formato\n3. Para PNG: Color = RGBA, Depth = 16, Compression = 15\n4. Para JPEG: Quality = 90 (não menos)\n5. Para EXR: escolha 'OpenEXR MultiLayer' se for usar passes\n6. Color Depth = 32-bit Float (EXR)\n7. Codec = ZIP ou DWAA (DWAA = menor, mais lento)" },
      { lang: "python", code: "import bpy\n\nimg = bpy.context.scene.render.image_settings\n\n# PNG padrão\nimg.file_format = 'PNG'\nimg.color_mode = 'RGBA'\nimg.color_depth = '16'\nimg.compression = 15\n\n# JPEG para preview\n# img.file_format = 'JPEG'\n# img.quality = 90\n\n# EXR para composição\n# img.file_format = 'OPEN_EXR_MULTILAYER'\n# img.color_depth = '32'\n# img.exr_codec = 'ZIP'" },
      { lang: "atalho", code: "Image Editor → Alt+S → Save As (com formato escolhido na sidebar)" },
    ],
    points: [
      "**PNG** é lossless com alpha — bom padrão para 90% dos casos",
      "**JPEG** é com perda e sem alpha — só para preview leve",
      "**EXR** é o padrão da indústria, 32-bit float com multilayer",
      "Nunca use **JPEG** para algo que será composiçado depois",
      "**RGBA** ativa transparência; **RGB** ignora o canal alpha",
      "Compressão **DWAA** no EXR reduz tamanho significativamente",
    ],
    alerts: [
      { type: "danger", content: "Salvar render como **JPEG** e jogar fora o .blend é um caminho sem volta: você perde alpha, range e detalhes para sempre." },
      { type: "tip", content: "Para Instagram/web, renderize em PNG e converta para JPEG depois com qualidade 90 — você mantém o original limpo." },
      { type: "info", content: "**OpenEXR MultiLayer** guarda diffuse, specular, normal e depth no mesmo arquivo — economia massiva no pipeline." },
    ],
  },
  {
    slug: "render-layers",
    section: "render",
    title: "Render Layers e View Layers",
    difficulty: "intermediario",
    subtitle: "Separe sua cena em camadas para compor com flexibilidade total.",
    intro: `
Em projetos profissionais, raramente você renderiza tudo numa imagem só. O caminho normal é separar a cena em **camadas** — personagem em uma, cenário em outra, efeitos em uma terceira — e depois juntar tudo no **Compositor**. Isso permite ajustar cada elemento independentemente, regravar uma camada sem renderizar a cena inteira, e aplicar efeitos seletivos (blur só no fundo, color grade só no personagem).

No Blender isso se chama **View Layer**. Cada View Layer é como uma "câmera virtual" da mesma cena, mas que renderiza só os objetos que você marcou para aquele layer. Você cria um novo View Layer no topo do Blender, ao lado do nome da cena, clicando no ícone "+".

## Como organizar
A organização funciona via **Collections**. Em cada View Layer, você decide quais Collections estão visíveis (ícone de olhinho), quais são "Holdout" (criam recorte transparente) e quais são "Indirect Only" (só contribuem com luz, sem aparecer). Esse controle dá flexibilidade enorme.

## Passes
Além das camadas, cada View Layer pode renderizar vários **passes**: \`Combined\` (imagem final), \`Diffuse\`, \`Glossy\`, \`Transmission\`, \`Z Depth\`, \`Normal\`, \`Mist\`, \`Cryptomatte\` e muitos mais. Esses passes são a matéria-prima do Compositor: com eles você consegue mudar cor de materiais, isolar reflexos, aplicar profundidade de campo em pós e outras mágicas. Você verá que dominar View Layers + Passes é o que separa o iniciante do profissional.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. No topo do Blender, ao lado da cena, clique no '+' para criar View Layer\n2. Renomeie (ex: 'Personagem')\n3. View Layer Properties → escolha collections visíveis\n4. Em 'Passes', marque Diffuse, Glossy, Z, Normal, Cryptomatte\n5. Crie outro layer ('Cenario') com outras collections\n6. Renderize: cada layer aparece separado no compositor" },
      { lang: "python", code: "import bpy\n\nscene = bpy.context.scene\n\n# Criar novo view layer\nnew_layer = scene.view_layers.new('Personagem')\n\n# Ativar passes úteis\nnew_layer.use_pass_diffuse_color = True\nnew_layer.use_pass_glossy_direct = True\nnew_layer.use_pass_z = True\nnew_layer.use_pass_normal = True\nnew_layer.use_pass_cryptomatte_object = True\n\n# Esconder uma collection deste layer\ncol = bpy.data.collections['Cenario']\nlayer_col = new_layer.layer_collection.children[col.name]\nlayer_col.exclude = True" },
      { lang: "config", code: "# Passes mais usados\nCombined         → imagem final\nDiffuse Color    → cor base sem luz\nDiffuse Direct   → só luz direta difusa\nGlossy Direct    → reflexos diretos\nZ                → profundidade (para DOF em pós)\nNormal           → para relight\nMist             → névoa atmosférica\nCryptomatte      → máscara automática por objeto/material\n\n# Collection modes\nVisible       → renderiza normalmente\nHoldout       → recorta (vira buraco transparente)\nIndirect Only → não aparece, mas afeta luz" },
      { lang: "atalho", code: "Ctrl+L (no Outliner) → Link to Collection  |  M → mover para collection  |  Shift+clique no olho → solo collection" },
    ],
    points: [
      "**View Layer** = uma camada de render da mesma cena",
      "Cada View Layer escolhe **quais collections** estão visíveis",
      "**Passes** são canais extras (diffuse, glossy, depth) usáveis no compositor",
      "**Holdout** cria recorte transparente; **Indirect Only** afeta só a luz",
      "**Cryptomatte** gera máscaras automáticas por objeto/material",
      "Permite re-renderizar **só uma camada** sem refazer tudo",
    ],
    alerts: [
      { type: "tip", content: "Marque **Cryptomatte Object e Material** sempre — é o pass que mais salva tempo na composição." },
      { type: "warning", content: "Mais passes = render mais lento e mais memória; ative só os que você vai usar." },
      { type: "info", content: "Salve View Layers em **EXR MultiLayer** para guardar todos os passes num arquivo só." },
    ],
  },
  {
    slug: "compositor-intro",
    section: "render",
    title: "Compositor: introdução ao pós-processamento",
    difficulty: "intermediario",
    subtitle: "Aplique color grade, glow, vinheta e correções sem sair do Blender.",
    intro: `
O **Compositor** é o editor de pós-produção embutido do Blender. Ele funciona em **node graph** (gráfico de nós): você pega o resultado do render, conecta filtros (blur, glow, color balance, lens distortion), mistura imagens e gera a saída final. É o equivalente do After Effects ou Nuke, integrado direto na cena.

Para acessar, mude um workspace para **Compositing** (aba no topo) ou abra um \`Compositor\` em qualquer área. O primeiro passo é marcar \`Use Nodes\` no header. Aí você vê dois nós: \`Render Layers\` (a entrada, traz o render da cena) e \`Composite\` (a saída, é o que vai parar no arquivo).

## O fluxo básico
Entre os dois você adiciona qualquer filtro com \`Shift + A\`. Os mais comuns são: \`Color Balance\` (mexe lift/gamma/gain), \`Glare\` (cria glow em áreas claras), \`Lens Distortion\` (curva da lente), \`Vignette\` (escurecer cantos via Gradient), \`Denoise\` (limpar ruído), \`Mix\` (combinar duas imagens) e \`Viewer\` (preview na tela).

O **Viewer** é seu melhor amigo: conecte ele em qualquer ponto do grafo para ver o que está saindo daquele nó. Marque \`Backdrop\` no painel N para usar o viewport do compositor como tela de preview.

Você verá que com 4 ou 5 nós bem escolhidos, mesmo um render simples ganha vida: cor mais quente, glow nas luzes, leve grain, vinheta sutil. Esses ajustes finos são o que separam um render "ok" de um render "uau".
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Mude para workspace 'Compositing'\n2. Marque 'Use Nodes' no header\n3. Veja os nós Render Layers e Composite\n4. Shift+A → Color → Color Balance (cor)\n5. Shift+A → Filter → Glare (glow)\n6. Shift+A → Output → Viewer (preview)\n7. Conecte: Render Layers → filtros → Composite\n8. F12 para renderizar com pós" },
      { lang: "python", code: "import bpy\n\nscene = bpy.context.scene\nscene.use_nodes = True\ntree = scene.node_tree\n\n# Limpar nós\ntree.nodes.clear()\n\n# Criar nós\nrl = tree.nodes.new('CompositorNodeRLayers')\nglare = tree.nodes.new('CompositorNodeGlare')\ncomp = tree.nodes.new('CompositorNodeComposite')\n\nglare.glare_type = 'FOG_GLOW'\nglare.threshold = 1.0\n\n# Conectar\ntree.links.new(rl.outputs['Image'], glare.inputs['Image'])\ntree.links.new(glare.outputs['Image'], comp.inputs['Image'])" },
      { lang: "config", code: "# Receita básica de finalização\n\nRender Layers\n   ↓\nDenoise (se não fez no render)\n   ↓\nColor Balance (clima de cor)\n   ↓\nGlare (glow nas luzes — Fog Glow)\n   ↓\nLens Distortion (sutil, 0.02)\n   ↓\nVignette (Mix com Gradient)\n   ↓\nComposite + Viewer" },
      { lang: "atalho", code: "Shift+A → adicionar nó  |  Ctrl+Shift+clique → conectar Viewer no nó  |  N → painel lateral  |  Ctrl+J → join em frame" },
    ],
    points: [
      "**Compositor** é o editor de pós embutido, baseado em nós",
      "Marque \`Use Nodes\` para ativar o grafo",
      "Nós principais: \`Render Layers\` (entrada) e \`Composite\` (saída)",
      "**Viewer** funciona como preview em tempo real",
      "**Glare**, **Color Balance**, **Vignette** são essenciais para finalização",
      "Ctrl+Shift+clique conecta o Viewer instantaneamente em qualquer nó",
    ],
    alerts: [
      { type: "tip", content: "Use o **Backdrop** (painel N → Backdrop) para ver o resultado do Viewer no fundo do compositor." },
      { type: "info", content: "O Compositor roda **depois do render** — você pode ajustar nós e re-rodar só ele com \`Render → Render Image\` no menu do compositor." },
      { type: "warning", content: "Se desligar **Use Nodes**, o Blender ignora o compositor e salva o render bruto." },
    ],
  },
  {
    slug: "motion-blur-dof",
    section: "render",
    title: "Motion Blur e Depth of Field",
    difficulty: "intermediario",
    subtitle: "Adicione realismo com borrão de movimento e desfoque de campo.",
    intro: `
Duas características que diferenciam um render amador de um render cinematográfico: **motion blur** (borrão de movimento) e **depth of field** (profundidade de campo, ou DOF). Ambos imitam o comportamento de uma câmera real, e ambos estão disponíveis no Eevee e no Cycles.

O **motion blur** é o rastro que objetos em movimento deixam quando você fotografa com obturador lento. Sem ele, animações ficam com aparência "quadradinha", de stop-motion. No Blender, você ativa em \`Render Properties → Motion Blur\`. O parâmetro \`Shutter\` controla o quão longo é o borrão (\`0.5\` = obturador padrão de cinema). Cycles tem motion blur por sample (mais preciso); Eevee usa pós-processamento (mais rápido).

## Depth of Field
O **DOF** simula o foco de uma lente: o que está no plano focal aparece nítido, e o resto fica desfocado. É o que dá aquele bokeh suave em fotos de retrato. Você ativa nas **propriedades da câmera**: selecione a câmera, vá em \`Object Data Properties (ícone de câmera) → Depth of Field\`, marque a caixa, e defina o \`Focus Object\` (um objeto que serve de "alvo do foco") ou o \`Focus Distance\` (distância manual em metros).

O parâmetro \`F-Stop\` controla a abertura: quanto **menor** o F-Stop (ex: \`f/1.4\`), mais desfoque; quanto **maior** (ex: \`f/16\`), mais coisa em foco. Combine motion blur + DOF + um bom HDRI e você verá que sua cena ganha **camadas de realismo** que samples extras nunca trariam.
    `,
    codes: [
      { lang: "passo-a-passo", code: "MOTION BLUR\n1. Render Properties → Motion Blur (marcar)\n2. Shutter = 0.5 (cinemático)\n3. Position = Center\n4. Steps = 1 (Cycles, aumente para deformação)\n\nDEPTH OF FIELD\n1. Selecione a câmera\n2. Object Data Properties → Depth of Field\n3. Marque o checkbox\n4. Focus Object → escolha um objeto alvo\n5. Aperture F-Stop → 2.8 (retrato), 5.6 (geral)\n6. Renderize" },
      { lang: "python", code: "import bpy\n\nscene = bpy.context.scene\ncam = bpy.data.cameras['Camera']\n\n# Motion blur\nscene.render.use_motion_blur = True\nscene.render.motion_blur_shutter = 0.5\n\n# DOF\ncam.dof.use_dof = True\ncam.dof.focus_object = bpy.data.objects['Personagem']\ncam.dof.aperture_fstop = 2.8\n# Sem focus_object: usar focus_distance\n# cam.dof.focus_distance = 5.0" },
      { lang: "config", code: "# Guia de F-Stop (abertura)\nf/1.4   → bokeh forte, retratos cinema\nf/2.8   → retratos clássicos\nf/4.0   → bom equilíbrio\nf/5.6   → DOF moderado\nf/8.0   → quase tudo em foco\nf/16    → tudo em foco (paisagem)\n\n# Shutter (motion blur)\n0.25 → blur sutil\n0.50 → padrão cinema (180° rule)\n1.00 → blur exagerado\n2.00 → efeito artístico (fluxos, lights)" },
      { lang: "atalho", code: "Numpad 0 → câmera  |  Selecione câmera + N → Object Data → DOF  |  Ctrl+Numpad 0 → tornar ativa" },
    ],
    points: [
      "**Motion Blur** simula o borrão de obturador lento — essencial em animação",
      "**Shutter 0.5** segue a regra de 180° do cinema",
      "**DOF** simula foco de lente; ativa nas propriedades da câmera",
      "**F-Stop baixo** = mais desfoque; **F-Stop alto** = tudo nítido",
      "**Focus Object** mantém o foco grudado num alvo, mesmo se ele se mexe",
      "Eevee faz motion blur em pós; Cycles faz por sample (mais preciso)",
    ],
    alerts: [
      { type: "tip", content: "Para retrato cinematográfico clássico, use **f/2.8 + Shutter 0.5 + 50mm de lente**." },
      { type: "warning", content: "DOF muito agressivo (\`f/1.4\`) em cenas com muita geometria pode deixar o render bem mais lento no Cycles." },
      { type: "info", content: "No Eevee, ative \`Bokeh\` em Render Properties → Depth of Field para formato de íris realista." },
    ],
  },
  {
    slug: "gpu-render-tips",
    section: "render",
    title: "GPU Render: configurando placa de vídeo",
    difficulty: "avancado",
    subtitle: "Como usar sua GPU para renderizar dezenas de vezes mais rápido.",
    intro: `
Por padrão, o Blender renderiza usando a **CPU** (processador). Isso funciona, mas é lento. Se você tem uma placa de vídeo dedicada (GPU), pode ativar o render por GPU e ver tempos de render caírem de **horas para minutos**. A diferença é gigante: GPUs modernas executam milhares de cálculos em paralelo, perfeito para path tracing.

A configuração mora em \`Edit → Preferences → System → Cycles Render Devices\`. Lá você escolhe o **backend**: \`CUDA\` ou \`OptiX\` para NVIDIA; \`HIP\` para AMD; \`Metal\` para Mac (Apple Silicon e AMD); \`oneAPI\` para Intel Arc. Marque a sua GPU na lista. Para render híbrido (GPU + CPU juntos), marque também a CPU.

Depois de configurar nas Preferences, vá em \`Render Properties → Device\` e escolha **GPU Compute**. Pronto: o próximo render vai usar a placa.

## Cuidados importantes
GPUs têm **menos memória** que CPUs (8/12/24 GB tipicamente). Cenas com texturas pesadas, muitos polígonos ou volumetria podem **estourar a VRAM** e o render falhar com mensagem de \`out of memory\`. Soluções: reduzir resolução de texturas, desativar volumetria pesada, usar **texture caching**, ou ativar **Tile Size** menor.

Outro ponto: **OptiX** (NVIDIA RTX) costuma ser ~30% mais rápido que CUDA, e habilita o **denoiser OptiX**. Se você tem RTX, sempre prefira. Você verá que com GPU bem configurada, fluxos que demoravam o dia inteiro viram coisa de uma cafezinho.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Edit → Preferences → System\n2. Em 'Cycles Render Devices', escolha o backend:\n   - NVIDIA: OptiX (RTX) ou CUDA\n   - AMD: HIP\n   - Mac: Metal\n   - Intel Arc: oneAPI\n3. Marque a sua GPU (e CPU se quiser híbrido)\n4. Salve preferences (botão hambúrguer → Save)\n5. Render Properties → Device → GPU Compute\n6. F12 e veja a velocidade" },
      { lang: "python", code: "import bpy\n\nprefs = bpy.context.preferences\ncprefs = prefs.addons['cycles'].preferences\n\n# Escolher backend (CUDA, OPTIX, HIP, METAL, ONEAPI)\ncprefs.compute_device_type = 'OPTIX'\ncprefs.refresh_devices()\n\n# Ativar todas as devices\nfor device in cprefs.devices:\n    device.use = True\n    print(device.name, device.type)\n\n# Setar Device para GPU na cena\nbpy.context.scene.cycles.device = 'GPU'" },
      { lang: "config", code: "# Tile Size recomendado\nGPU moderna (8GB+):  2048 x 2048\nGPU média (4-6GB):   1024 x 1024\nGPU fraca:            512 x 512\nCPU:                   16 x 16 (clássico)\n\n# Diagnóstico VRAM\nWindows: Task Manager → Performance → GPU\nLinux:   nvidia-smi (NVIDIA) / radeontop (AMD)\nMac:     Activity Monitor → GPU\n\n# Out of memory: o que cortar\n1. Texturas 8K → 4K ou 2K\n2. Volumetria densa\n3. Subdivision Surface alto\n4. Persistent Data desligado" },
      { lang: "shell", code: "# Linux: monitorar uso da GPU em tempo real\nwatch -n 1 nvidia-smi\n\n# Mac: ver processos GPU\nsudo powermetrics --samplers gpu_power\n\n# Windows (PowerShell)\nGet-Counter '\\GPU Engine(*engtype_3D)\\Utilization Percentage'" },
      { lang: "atalho", code: "Edit → Preferences → System (sem atalho fixo)  |  F12 → render" },
    ],
    points: [
      "**GPU Compute** acelera render em 10x ou mais",
      "Ative em **Preferences → System → Cycles Render Devices**",
      "**OptiX** > CUDA para placas RTX (mais rápido + denoiser)",
      "GPUs têm **menos VRAM**: cuidado com texturas pesadas",
      "**Híbrido GPU+CPU** somando todos os devices acelera ainda mais",
      "Erro comum: esquecer de salvar Preferences depois de marcar a GPU",
    ],
    alerts: [
      { type: "success", content: "Render que levava **2 horas no CPU** pode cair para **8 minutos no GPU** com OptiX bem configurado." },
      { type: "danger", content: "Erro \`CUDA out of memory\` significa VRAM estourada — reduza texturas ou desative volumetria." },
      { type: "tip", content: "No Linux, instale o driver proprietário da NVIDIA (\`nvidia-driver-535\` ou superior) para OptiX funcionar." },
    ],
  },
  {
    slug: "render-animacao",
    section: "render",
    title: "Renderizando animação: estratégias e segurança",
    difficulty: "avancado",
    subtitle: "Como exportar uma animação completa sem perder horas por travamentos.",
    intro: `
Renderizar uma animação no Blender é simples no botão (\`Ctrl + F12\`), mas no mundo real envolve **estratégia**: cenas longas podem demorar horas ou dias, qualquer travamento perde trabalho, e exportar para o formato errado força refazer tudo. Esse capítulo é o playbook para exportar animações com segurança e eficiência.

A regra de ouro: **renderize em sequência de imagens**, nunca direto em vídeo. Use \`PNG\` ou \`EXR\` no \`File Format\` e nomeie como \`shot01_####\`. Se o Blender travar no frame 200/500, você só re-renderiza do 200 em diante — sem perder os 199 anteriores. Depois, monta o vídeo no **Video Sequencer** do próprio Blender, em DaVinci Resolve, FFmpeg ou similar.

## Frames faltando e renderização parcial
Use a opção \`Overwrite\` em \`Output Properties\`: desmarque para não regravar frames já existentes. Combine com \`Placeholders\` (cria arquivos vazios reservando o número) para evitar dois processos renderizarem o mesmo frame.

## Render farms e batches
Para projetos grandes, divida o range em pedaços (\`1–60\`, \`61–120\`...) e rode em **múltiplas instâncias do Blender em paralelo**, ou use serviços de **render farm** (Sheepit, Garagefarm, RenderStreet). O Blender também tem **Persistent Data** (\`Render Properties → Performance → Persistent Data\`) que reaproveita BVH entre frames, acelerando bastante quando a câmera é o que mais muda.

Você verá que com sequência de imagens + Persistent Data + GPU + denoise, animações que pareciam impossíveis em casa viram totalmente viáveis. Disciplina no setup do output salva semanas de retrabalho.
    `,
    codes: [
      { lang: "passo-a-passo", code: "1. Output Properties → Output Path: //frames/shot01_\n2. File Format → PNG (ou EXR)\n3. Color = RGBA, Depth = 16\n4. Marque 'Overwrite' DESLIGADO (para retomar)\n5. Marque 'Placeholders' LIGADO\n6. Render Properties → Performance → Persistent Data ON\n7. Ctrl+F12 para renderizar a animação\n8. Depois, monte vídeo no Video Sequencer ou DaVinci" },
      { lang: "python", code: "import bpy\n\nscene = bpy.context.scene\nrender = scene.render\n\n# Output como sequência de PNG\nrender.filepath = '//frames/shot01_'\nrender.image_settings.file_format = 'PNG'\nrender.image_settings.color_mode = 'RGBA'\nrender.image_settings.color_depth = '16'\n\n# Não regravar frames já feitos\nrender.use_overwrite = False\nrender.use_placeholder = True\n\n# Persistent Data (acelera animação)\nscene.render.use_persistent_data = True\n\n# Iniciar render de animação\nbpy.ops.render.render(animation=True, write_still=True)" },
      { lang: "shell", code: "# Renderizar via linha de comando (background, sem GUI)\nblender -b cena.blend -o //frames/shot01_#### -F PNG -s 1 -e 120 -a\n\n# Render de range específico\nblender -b cena.blend -s 60 -e 120 -a\n\n# Em paralelo (4 instâncias dividindo frames)\nblender -b cena.blend -s 1   -e 30  -a &\nblender -b cena.blend -s 31  -e 60  -a &\nblender -b cena.blend -s 61  -e 90  -a &\nblender -b cena.blend -s 91  -e 120 -a &\n\n# Montar MP4 a partir de PNGs com FFmpeg\nffmpeg -framerate 24 -i frames/shot01_%04d.png \\\n  -c:v libx264 -pix_fmt yuv420p -crf 18 final.mp4" },
      { lang: "config", code: "# Checklist antes de Ctrl+F12\n[ ] Frame Start e End corretos\n[ ] Camera ativa e enquadrada\n[ ] Sequência de imagens (PNG/EXR), não MP4\n[ ] Output Path com //\n[ ] Overwrite OFF + Placeholders ON\n[ ] Persistent Data ON\n[ ] GPU configurada\n[ ] Denoise ativo\n[ ] Salvar .blend antes (Ctrl+S)\n[ ] Bateria/UPS no laptop\n[ ] Espaço em disco suficiente (1080p PNG ≈ 5MB/frame)" },
      { lang: "atalho", code: "Ctrl+F12 → renderizar animação  |  Esc → cancelar  |  Ctrl+S → salvar antes" },
    ],
    points: [
      "**Renderize em sequência de imagens** (PNG/EXR), não direto em vídeo",
      "Use \`####\` para padding e \`//frames/\` para caminho relativo",
      "**Overwrite OFF + Placeholders ON** permite retomar render interrompido",
      "**Persistent Data** reaproveita BVH e acelera muito animações de câmera",
      "Renderize em **paralelo** dividindo o range em múltiplas instâncias",
      "Monte o vídeo final com **Video Sequencer**, DaVinci ou FFmpeg",
      "Sempre **salve o .blend** antes do Ctrl+F12",
    ],
    alerts: [
      { type: "danger", content: "Renderizar 500 frames direto em **MP4** e o Blender travar no frame 480 = você perde tudo. Sempre sequência." },
      { type: "tip", content: "Ative **Persistent Data** e veja animações ficarem 2-3x mais rápidas em cenas com câmera animada." },
      { type: "success", content: "O fluxo **PNG → FFmpeg → MP4** é o padrão profissional: máxima qualidade, controle total e zero retrabalho." },
    ],
  },
];
