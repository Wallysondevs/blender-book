import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "requisitos-hardware",
    section: "instalacao",
    title: "Requisitos de Hardware: o que sua máquina precisa ter",
    difficulty: "iniciante",
    subtitle: "Entenda o que faz o Blender voar (ou engasgar) antes mesmo de instalar.",
    intro: `
Antes de baixar qualquer coisa, precisamos conversar sobre **hardware**. O **Blender** é um programa de modelagem, animação e renderização 3D — ou seja, ele lida o tempo todo com cálculos pesados de geometria, iluminação e física. Pense no seu computador como uma cozinha: a **CPU** (processador) é o chef que organiza tudo, a **GPU** (placa de vídeo) é o forno turbo que assa as imagens em paralelo, e a **RAM** (memória) é a bancada onde os ingredientes ficam à mão. Se a bancada é pequena, o chef vive correndo até o armário, e tudo demora.

Diferente de softwares como o **Photoshop** (que mexem com pixels 2D) ou o **Word** (que mexe com texto), o Blender precisa segurar na memória milhões de **vértices** (os pontinhos que formam um modelo 3D), **texturas** (imagens aplicadas nas superfícies) e dados de simulação. Por isso, o que parece "razoável" para navegação na web pode ser apertado para 3D sério.

## Mínimo, recomendado e ideal
A **Blender Foundation** publica três níveis de requisitos. O **mínimo** roda o programa, mas você sentirá lentidão em cenas com muitos objetos. O **recomendado** já permite trabalhar em projetos pequenos e médios sem sofrimento. O **ideal** é para quem vai entrar em escultura digital, simulações de fluido ou renderização com o motor \`Cycles\`.

## Por que a GPU importa tanto
O Blender oferece dois motores de render embutidos: o \`Eevee\` (rápido, baseado em rasterização, parecido com motor de jogo) e o \`Cycles\` (fisicamente correto, baseado em **path tracing**). O Cycles, em especial, fica muito mais rápido se sua **GPU** suportar **CUDA** (NVIDIA), **OptiX** (NVIDIA RTX), **HIP** (AMD) ou **Metal** (Apple Silicon). Sem GPU compatível, a renderização cai no processador e pode ficar 10× mais lenta.

Se sua máquina não atende ao recomendado, não se desespere: dá para aprender muita coisa com cenas simples. Apenas planeje upgrades futuros pensando primeiro em **RAM** (16 GB é o conforto mínimo hoje) e depois em uma **GPU dedicada** com pelo menos 6 GB de **VRAM**.
    `,
    codes: [
      {
        lang: "config",
        code: "# Mínimo oficial (Blender 4.x)\nCPU: 64-bit, 4 núcleos com SSE4.2\nRAM: 8 GB\nGPU: 2 GB VRAM, OpenGL 4.3\nDisco: ~500 MB para o programa",
      },
      {
        lang: "config",
        code: "# Recomendado para uso real\nCPU: 8+ núcleos (Ryzen 5/7, Intel i5/i7 modernos)\nRAM: 16-32 GB\nGPU: NVIDIA RTX (CUDA/OptiX) ou AMD RX (HIP) com 6-8 GB VRAM\nDisco: SSD NVMe (carrega projetos grandes em segundos)",
      },
      {
        lang: "passo-a-passo",
        code: "1. Abra o Gerenciador de Tarefas (Windows) ou Monitor de Atividade (Mac).\n2. Veja quantos GB de RAM você tem instalados.\n3. No site do fabricante da sua GPU, confirme se ela suporta CUDA, OptiX, HIP ou Metal.\n4. Verifique espaço livre no disco onde vai instalar (deixe pelo menos 5 GB de folga).\n5. Anote esses dados — vamos usá-los nos próximos capítulos.",
      },
      {
        lang: "python",
        code: "# Dentro do Blender, em Scripting, você pode checar a GPU detectada:\nimport bpy\nprefs = bpy.context.preferences.addons['cycles'].preferences\nprefs.refresh_devices()\nfor d in prefs.devices:\n    print(d.name, '-', d.type, '-', 'usar' if d.use else 'ignorar')",
      },
    ],
    points: [
      "**CPU, GPU e RAM** são o tripé do desempenho — os três precisam estar minimamente equilibrados.",
      "**VRAM da GPU** define o tamanho da cena que cabe no Cycles GPU; estourou a VRAM, o render falha.",
      "**SSD** não acelera o render, mas reduz drasticamente o tempo de abrir e salvar arquivos grandes.",
      "Notebooks com **gráfica integrada** rodam o Blender, porém esculpir e simular ficará bem limitado.",
      "**Apple Silicon** (M1/M2/M3) tem suporte nativo via Metal e desempenho muito bom em Cycles.",
      "**Drivers atualizados** da GPU evitam 80% dos crashes em cenas pesadas — atualize antes de instalar.",
      "Se for comprar máquina nova, priorize **RAM e VRAM** antes de gastar em CPU topo de linha.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Antes de gastar dinheiro, teste o Blender no que você já tem. Muita gente descobre que sua máquina dá conta de aprender o básico sem nenhum upgrade.",
      },
      {
        type: "warning",
        content: "Evite **GPUs muito antigas** (anteriores a 2016). Elas podem nem ter suporte a OpenGL 4.3 e o Blender simplesmente não abre.",
      },
      {
        type: "info",
        content: "Você pode rodar o Blender em **dois monitores** sem problema — é até recomendado para quem trabalha sério com 3D.",
      },
    ],
  },
  {
    slug: "baixar-instalar-windows",
    section: "instalacao",
    title: "Baixar e instalar no Windows",
    difficulty: "iniciante",
    subtitle: "Passo a passo seguro para instalar o Blender no Windows 10 ou 11.",
    intro: `
Vamos colocar o **Blender** para funcionar no **Windows**. Esta é provavelmente a plataforma mais usada por iniciantes, e a boa notícia é que a instalação é simples — basicamente baixar, clicar em "avançar" algumas vezes e pronto. Mas tem detalhes importantes que evitam dor de cabeça depois, especialmente sobre **versões**, **caminho de instalação** e **drivers de vídeo**.

A primeira regra de ouro: **baixe sempre do site oficial**, \`blender.org\`. Existem sites espelhos, lojas alternativas e até pacotes "modificados" por terceiros que podem vir com **adwares** ou versões desatualizadas. O Blender é 100% gratuito e de código aberto — você nunca precisa pagar nem fornecer e-mail.

## LTS, versão atual e Alpha
No site oficial você encontrará três opções: a **versão atual** (mais recente, com novidades), a **LTS** (Long Term Support, recebe correções por dois anos, ideal para produção) e a **Alpha/Beta** (instável, só para testar recursos novos). Para começar a aprender, recomendo a **versão atual estável** — você terá os recursos mais novos e tutoriais recentes vão bater com o que está vendo.

## Instalador .msi vs ZIP portátil
O Windows oferece dois formatos: o **.msi** (instalador tradicional, registra no Painel de Controle) e o **.zip** (portátil, basta descompactar e rodar). Iniciantes devem usar o \`.msi\`. Já o ZIP é ótimo para ter **várias versões lado a lado** sem conflito — útil mais para frente, quando você for testar recursos específicos.

Depois de instalar, atualize o **driver da sua placa de vídeo** (NVIDIA GeForce Experience, AMD Adrenalin ou via Windows Update). Isso evita 90% dos crashes que assustam iniciantes.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Acesse https://www.blender.org/download/\n2. O site detecta seu sistema; clique em 'Download Blender x.x.x' (.msi).\n3. Quando o download terminar, dê duplo clique no arquivo .msi.\n4. Aceite o termo de licença (GPL).\n5. Mantenha o caminho padrão (C:\\Program Files\\Blender Foundation\\Blender x.x).\n6. Clique em 'Install' e aguarde 1–2 minutos.\n7. Marque 'Launch Blender' e finalize.",
      },
      {
        lang: "shell",
        code: "# Alternativa via winget (PowerShell como administrador)\nwinget install --id BlenderFoundation.Blender -e",
      },
      {
        lang: "shell",
        code: "# Alternativa via Microsoft Store (CLI)\n# A Store também tem Blender oficial, com atualização automática:\n#   busque por 'Blender' na Microsoft Store e clique em Instalar.",
      },
      {
        lang: "atalho",
        code: "Win + R  →  digite 'blender'  →  Enter   (atalho rápido após instalado)",
      },
    ],
    points: [
      "Baixe **somente** de \`blender.org\` ou da **Microsoft Store oficial**.",
      "Prefira a **versão estável atual**; LTS só se você for trabalhar em projeto longo.",
      "**Atualize o driver da GPU** logo após instalar para evitar travamentos.",
      "Use o instalador \`.msi\` para começar; o ZIP serve para ter várias versões.",
      "Se aparecer aviso do **SmartScreen**, clique em 'Mais informações → Executar mesmo assim' (é falso positivo comum).",
      "Não instale dentro de \`Arquivos de Programas (x86)\` — o Blender é 64 bits.",
      "Após instalar, fixe o ícone na **barra de tarefas** para acesso rápido.",
    ],
    alerts: [
      {
        type: "warning",
        content: "Se o **antivírus** bloquear, libere a pasta de instalação. Alguns antivírus marcam o Blender por ele compilar shaders em tempo real.",
      },
      {
        type: "tip",
        content: "Instalado pela **Microsoft Store**, o Blender se atualiza sozinho. É a forma mais cômoda para iniciantes que esquecem de manter programas atualizados.",
      },
      {
        type: "success",
        content: "Quando a tela inicial (**splash screen**) aparecer mostrando a versão e a arte do release, parabéns: você instalou com sucesso!",
      },
    ],
  },
  {
    slug: "baixar-instalar-mac",
    section: "instalacao",
    title: "Baixar e instalar no macOS",
    difficulty: "iniciante",
    subtitle: "Instalando o Blender em Macs Intel e Apple Silicon (M1, M2, M3).",
    intro: `
No **macOS**, instalar o **Blender** é igualmente simples, mas tem um detalhe crucial: você precisa baixar a **versão correta para o seu chip**. Macs lançados a partir de 2020 usam **Apple Silicon** (M1, M2, M3, M4), enquanto modelos mais antigos usam processadores **Intel**. As duas arquiteturas são bem diferentes, e usar a versão errada faz o Blender rodar em modo de emulação \`Rosetta 2\` — funciona, mas perde até 40% de desempenho.

Para descobrir seu chip, clique no **menu Apple () → Sobre Este Mac**. Lá aparece "Apple M1/M2/M3" ou "Intel Core". Anote essa informação antes de baixar.

## Por que Apple Silicon é especial
O Blender ganhou suporte nativo para **Metal**, a API gráfica da Apple, a partir da versão 3.1. Isso permite que o **Cycles** (motor de render fisicamente correto) use a GPU integrada do M1/M2/M3, que é absurdamente boa para o que custa em energia. Em alguns benchmarks, um MacBook Air M2 renderiza tão rápido quanto uma RTX 3060 — silenciosamente, sem ventoinha.

## DMG: o instalador típico do Mac
No Mac, os programas vêm em arquivos \`.dmg\` (uma espécie de "disco virtual"). Você abre o DMG, arrasta o ícone do Blender para a pasta **Aplicativos** e pronto. Não há "instalador" no sentido tradicional — é só uma cópia.

Na primeira execução, o **Gatekeeper** (segurança da Apple) pode reclamar dizendo que o desenvolvedor não foi verificado. Não se preocupe: isso acontece com qualquer software fora da Mac App Store. Veremos como liberar nos passos abaixo.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Acesse https://www.blender.org/download/\n2. Escolha a versão certa: 'macOS Apple Silicon' OU 'macOS Intel'.\n3. Aguarde o download do arquivo .dmg (~250 MB).\n4. Dê duplo clique no .dmg para montar o disco virtual.\n5. Arraste o ícone do Blender para a pasta 'Applications'.\n6. Ejete o disco virtual (clique com botão direito → Ejetar).\n7. Abra o Launchpad e clique em Blender.",
      },
      {
        lang: "passo-a-passo",
        code: "# Se aparecer 'O Blender não pode ser aberto pois é de um desenvolvedor não verificado':\n1. Abra Ajustes do Sistema → Privacidade e Segurança.\n2. Role até a parte inferior; verá 'Blender foi bloqueado'.\n3. Clique em 'Abrir Mesmo Assim'.\n4. Confirme com sua senha.\n5. Esse aviso só aparece UMA vez.",
      },
      {
        lang: "shell",
        code: "# Alternativa via Homebrew (terminal):\nbrew install --cask blender",
      },
      {
        lang: "atalho",
        code: "⌘ + Espaço → digite 'Blender' → Enter   (Spotlight para abrir rapidinho)",
      },
    ],
    points: [
      "Identifique seu chip em ** → Sobre Este Mac** antes de baixar.",
      "Use a versão **Apple Silicon** se tiver M1/M2/M3 — desempenho até 2× melhor que a Intel sob Rosetta.",
      "Arraste para **Applications**; nunca rode o Blender de dentro do DMG montado.",
      "Na primeira abertura, libere via **Privacidade e Segurança**.",
      "**Cycles** usa Metal automaticamente em Macs modernos — não precisa configurar nada.",
      "Para múltiplas versões, instale também o ZIP em uma pasta separada (\`~/Blender/4.0\`).",
      "Mantenha o macOS atualizado: drivers Metal melhoram a cada release.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Se você usa **Homebrew**, o comando \`brew install --cask blender\` cuida de tudo, inclusive de atualizações futuras com \`brew upgrade\`.",
      },
      {
        type: "warning",
        content: "**Não baixe** Blender da Mac App Store de terceiros. A versão oficial só está em \`blender.org\` ou via Homebrew.",
      },
      {
        type: "info",
        content: "Macs com pouca **RAM unificada** (8 GB) compartilham memória entre CPU e GPU. Cuidado ao renderizar cenas grandes — pode travar o sistema.",
      },
    ],
  },
  {
    slug: "baixar-instalar-linux",
    section: "instalacao",
    title: "Baixar e instalar no Linux",
    difficulty: "iniciante",
    subtitle: "Diferentes formas de instalar o Blender em distribuições Linux populares.",
    intro: `
No **Linux**, o **Blender** é cidadão de primeira classe — afinal, boa parte do estúdio da **Blender Foundation** trabalha em Linux, e muitas produções de animação (como o filme \`Spring\` e curtas do Blender Open Movies) foram feitas inteiramente nesse sistema. Você terá várias formas de instalar, cada uma com prós e contras.

A escolha depende de duas coisas: **qual distro** você usa (Ubuntu, Fedora, Arch, Manjaro, etc.) e **se você quer a versão mais recente** ou aceita esperar pelas atualizações do gerenciador de pacotes da distro.

## Tarball oficial: sempre a versão mais nova
O método mais confiável é baixar o \`.tar.xz\` direto do \`blender.org\`. É um arquivo compactado — você descompacta em qualquer pasta (geralmente \`~/blender/\` ou \`/opt/blender/\`) e roda o executável. Vantagem: **sempre a versão mais atual**, sem depender da distro. Desvantagem: você cuida das atualizações manualmente.

## Snap, Flatpak e gerenciadores de pacotes
**Snap** (\`sudo snap install blender --classic\`) e **Flatpak** (\`flatpak install flathub org.blender.Blender\`) funcionam em qualquer distro e atualizam sozinhos. Já \`apt\` (Ubuntu/Debian), \`dnf\` (Fedora) e \`pacman\` (Arch) costumam ter versões um pouco atrasadas. Para Arch e derivados, o **AUR** (\`blender\` ou \`blender-git\`) tem versões muito atuais.

## Driver de GPU no Linux
Aqui mora a maior pegadinha. Se você tem **NVIDIA**, instale o driver proprietário da NVIDIA (não o \`nouveau\` open source, que é lento). No Ubuntu: \`ubuntu-drivers autoinstall\`. Para AMD, o driver \`amdgpu\` que vem no kernel já é excelente. Sem driver bom, esqueça **Cycles GPU**.
    `,
    codes: [
      {
        lang: "shell",
        code: "# Ubuntu / Debian (versão da distro, pode estar atrasada)\nsudo apt update\nsudo apt install blender",
      },
      {
        lang: "shell",
        code: "# Snap (sempre versão recente, atualização automática)\nsudo snap install blender --classic",
      },
      {
        lang: "shell",
        code: "# Flatpak (universal, sandbox)\nflatpak install flathub org.blender.Blender\nflatpak run org.blender.Blender",
      },
      {
        lang: "shell",
        code: "# Tarball oficial (controle total)\ncd ~/Downloads\nwget https://download.blender.org/release/Blender4.2/blender-4.2.0-linux-x64.tar.xz\ntar -xf blender-4.2.0-linux-x64.tar.xz\nmv blender-4.2.0-linux-x64 ~/blender\n~/blender/blender   # roda direto",
      },
      {
        lang: "shell",
        code: "# Arch / Manjaro\nsudo pacman -S blender\n# ou via AUR para versão de desenvolvimento:\nyay -S blender-git",
      },
    ],
    points: [
      "**Tarball oficial** é a forma mais limpa de ter sempre a versão mais nova.",
      "**Snap e Flatpak** atualizam sozinhos e funcionam em praticamente toda distro.",
      "Pacotes do \`apt\` ou \`dnf\` podem estar **vários meses atrasados**.",
      "Para **NVIDIA**, instale o driver **proprietário**, não o \`nouveau\`.",
      "Crie um atalho \`.desktop\` se baixou o tarball, para o Blender aparecer no menu.",
      "**Wayland** é suportado na versão 4.x, mas X11 ainda é o mais estável.",
      "Tablets gráficos **Wacom** funcionam sem instalar driver na maioria das distros modernas.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Para criar um lançador, copie um arquivo \`.desktop\` para \`~/.local/share/applications/blender.desktop\` apontando para o executável extraído.",
      },
      {
        type: "warning",
        content: "**Snap** roda em sandbox; alguns add-ons que precisam de bibliotecas externas podem falhar. Se isso ocorrer, use o tarball oficial.",
      },
      {
        type: "info",
        content: "Em Linux, o atalho \`Ctrl + Alt + T\` abre o terminal — útil para rodar o Blender com \`--debug\` quando algo der errado.",
      },
    ],
  },
  {
    slug: "primeira-abertura",
    section: "instalacao",
    title: "Primeira abertura: o que esperar da tela inicial",
    difficulty: "iniciante",
    subtitle: "Decifrando o splash screen, o cubo padrão e o medo inicial da interface.",
    intro: `
Você abriu o **Blender** pela primeira vez. Provavelmente assustou. Não se preocupe — **todo mundo** que vê essa interface pela primeira vez pensa "meu Deus, são mil botões". Respire. Vamos entender peça por peça nos próximos capítulos. Por enquanto, foco em **três elementos** que aparecem logo de cara.

## O Splash Screen
Ao abrir, surge uma janelinha flutuante chamada **splash screen**, com a arte do release, a versão e atalhos para arquivos recentes, ajuda e configurações de **Quick Setup** (idioma, atalhos, tema). É também onde você escolhe entre o **mouse de 3 botões padrão** (recomendado) ou outras configurações. Clique fora para fechar.

## O cubo, a câmera e a luz
Sumiu o splash, e você vê uma cena 3D com **três objetos**: um **cubo** cinza no centro, uma **câmera** (formato de pirâmide preta) e uma **luz pontual** (pequena lâmpada). Esse trio é o **"Hello World" do Blender** — o ponto de partida de toda cena nova. O cubo serve para você praticar transformações; a câmera define o que aparece no render; a luz ilumina a cena.

## O Outliner e o Properties Editor
À direita, em cima, há uma listinha hierárquica chamada **Outliner** — é o "explorador" da cena, onde você vê todos os objetos. Logo abaixo, fica o **Properties Editor**, com uma coluna de ícones. Cada ícone abre um painel com propriedades (render, mundo, objeto, modificadores, materiais, etc.).

Não tente memorizar tudo agora. Apenas **circule** o cursor pelos painéis, observe os tooltips (passe o mouse e espere 1 segundo). Familiaridade vem com repetição, não com estudo decorado.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Abra o Blender.\n2. Observe o Splash Screen — clique em qualquer lugar fora dele para fechar.\n3. Identifique no centro: Cubo, Câmera (pirâmide), Luz (lâmpada).\n4. No canto superior direito, encontre o Outliner.\n5. Logo abaixo, veja o Properties Editor com os ícones laterais.\n6. Passe o mouse sobre cada ícone e leia o tooltip.\n7. Não clique em nada novo ainda — só observe.",
      },
      {
        lang: "atalho",
        code: "Botão do meio do mouse (MMB)  → orbitar a câmera de visualização\nShift + MMB                   → mover (pan) a vista\nScroll do mouse               → aproximar/afastar (zoom)\nNumpad 0                      → ver pela câmera\nHome                          → enquadrar tudo na tela",
      },
      {
        lang: "passo-a-passo",
        code: "# Trocando o idioma para português:\n1. Edit → Preferences → Interface.\n2. Em 'Translation', escolha 'Português (Brasil)'.\n3. Marque Tooltips, Interface e New Data.\n4. Feche a janela; o Blender salva sozinho.\n# Atenção: a maioria dos tutoriais está em inglês — considere deixar em inglês para acompanhar.",
      },
      {
        lang: "python",
        code: "# Listar tudo que existe na cena padrão via console:\nimport bpy\nfor obj in bpy.context.scene.objects:\n    print(obj.name, '-', obj.type)\n# Saída esperada: Cube - MESH, Camera - CAMERA, Light - LIGHT",
      },
    ],
    points: [
      "**Splash Screen** sempre mostra a versão — útil para confirmar qual está aberta.",
      "A cena padrão tem **3 objetos**: \`Cube\`, \`Camera\` e \`Light\`.",
      "**Outliner** lista todos os objetos; **Properties Editor** mostra detalhes do selecionado.",
      "**MMB** (botão do meio) é seu melhor amigo para navegar em 3D.",
      "Tooltips aparecem ao passar o mouse — leia-os, são extremamente didáticos.",
      "Mudar idioma é possível, mas **a comunidade global usa inglês** — pondere antes de trocar.",
      "Não tenha medo de **clicar** — \`Ctrl + Z\` desfaz quase tudo.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Se sua tela parece **diferente** da dos tutoriais, é provável que esteja em outro **Workspace**. Olhe a barra de abas no topo (Layout, Modeling, Sculpting...) e volte para \`Layout\`.",
      },
      {
        type: "info",
        content: "O Blender abre na cena \`startup.blend\`. Veremos mais adiante como personalizar essa cena padrão para incluir seus objetos preferidos.",
      },
      {
        type: "warning",
        content: "Não feche o Blender clicando no X sem salvar — você perde tudo. Use \`Ctrl + S\` antes.",
      },
    ],
  },
  {
    slug: "configurar-preferencias",
    section: "instalacao",
    title: "Configurar Preferências: deixando o Blender do seu jeito",
    difficulty: "iniciante",
    subtitle: "Os ajustes em Edit → Preferences que valem ouro logo no começo.",
    intro: `
As **Preferências** do Blender (\`Edit → Preferences\` no Windows/Linux, \`Blender → Settings\` no macOS) são onde você ajusta o comportamento global do programa: temas, atalhos, sistema, add-ons, navegação. Mexer em algumas opções logo no começo evita frustração e acelera muito o aprendizado.

## Sistema: ativar a GPU para Cycles
A primeira parada é a aba **System**. Lá, na seção **Cycles Render Devices**, escolha entre \`CUDA\`, \`OptiX\`, \`HIP\`, \`Metal\` ou \`oneAPI\` — depende da sua placa. Marque sua GPU. Sem essa configuração, mesmo com placa potente, o Blender **renderiza pela CPU**, que é muito mais lento.

## Interface e tema
Em **Interface**, dá para mudar o tamanho da fonte (útil em monitores 4K), ativar a **Resolution Scale** e ligar o **Developer Extras** (mais opções avançadas). Já em **Themes**, você pode trocar do tema escuro padrão para um claro, ou importar temas customizados (\`.xml\`).

## Input: navegação e mouse
Na aba **Input**, eu recomendo manter o **Select With** em \`Left\` (botão esquerdo selecionando), porque é o padrão da indústria. Quem vem de versões antigas do Blender pode preferir \`Right\`. Também tem opção de **Emulate 3 Button Mouse** (essencial para notebooks com touchpad ou mouse de 2 botões) e **Emulate Numpad** (para teclados sem teclado numérico).

## Save & Load: autosave salva vidas
Em **Save & Load**, ative o **Auto Save** com intervalo de 2–5 minutos. O Blender criará arquivos \`.blend1\` e \`.blend@\` com versões anteriores e backup automático. Ative também **Save Versions** com pelo menos 2 — se algo corromper, você tem cópias antigas.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "1. Edit → Preferences (ou ⌘ + , no Mac).\n2. Aba System → Cycles Render Devices → marque CUDA/OptiX/HIP/Metal e selecione sua GPU.\n3. Aba Interface → ajuste 'Resolution Scale' se a fonte estiver pequena.\n4. Aba Input → marque 'Emulate 3 Button Mouse' se usa notebook.\n5. Aba Input → marque 'Emulate Numpad' se seu teclado não tem numérico.\n6. Aba Save & Load → marque 'Auto Save' (timer 2 min) e 'Save Versions = 2'.\n7. Feche a janela; preferências salvam sozinhas.",
      },
      {
        lang: "config",
        code: "# Configurações recomendadas para iniciantes:\nSelect With:                Left\nSpacebar Action:            Play (animação)\nEmulate 3 Button Mouse:     ON (se notebook)\nEmulate Numpad:             ON (se teclado sem numpad)\nAuto Save:                  ON, a cada 2 minutos\nSave Versions:              2\nRecent Files:               20",
      },
      {
        lang: "python",
        code: "# Habilitar GPU CUDA via script (útil em automação/render farm):\nimport bpy\nprefs = bpy.context.preferences.addons['cycles'].preferences\nprefs.compute_device_type = 'CUDA'   # ou 'OPTIX', 'HIP', 'METAL'\nprefs.refresh_devices()\nfor d in prefs.devices:\n    d.use = (d.type != 'CPU')   # ativa só GPU, ignora CPU\nbpy.context.scene.cycles.device = 'GPU'\nbpy.ops.wm.save_userpref()",
      },
      {
        lang: "atalho",
        code: "Ctrl + ,   (Windows/Linux)   → abre Preferences\n⌘ + ,      (macOS)            → abre Settings\nCtrl + S                       → salvar arquivo (sempre!)",
      },
    ],
    points: [
      "**Ativar GPU em System** é a configuração que mais muda a vida do iniciante.",
      "**Auto Save** previne 99% das tragédias de \"o Blender fechou sozinho\".",
      "**Emulate 3 Button Mouse** simula o botão do meio com \`Alt + clique esquerdo\`.",
      "**Emulate Numpad** mapeia as teclas \`1\` a \`9\` da fileira numérica para as funções do numpad.",
      "Você pode **exportar** suas preferências em \`File → Defaults → Save Startup File\` para reusar em outra máquina.",
      "Em **Add-ons**, ative já \`Node Wrangler\`, \`LoopTools\` e \`Extra Mesh Objects\` — clássicos.",
      "Tema **\"Blender Light\"** ajuda quem prefere ambientes claros, mas a maioria dos tutoriais usa o escuro.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Após mudar preferências, salve um \`Startup File\` (\`File → Defaults → Save Startup File\`). Assim toda nova cena já abre do seu jeito.",
      },
      {
        type: "warning",
        content: "Se ativar **Developer Extras** sem entender, pode aparecer **opções confusas** que acabam quebrando arquivos. Só ative quando precisar.",
      },
      {
        type: "success",
        content: "Com a GPU ativada e o autosave ligado, você está pronto para trabalhar **sério** — e sem perder horas de trabalho num crash.",
      },
    ],
  },
  {
    slug: "atalhos-essenciais",
    section: "instalacao",
    title: "Atalhos essenciais: o teclado é seu melhor amigo",
    difficulty: "iniciante",
    subtitle: "Os atalhos que você usará 90% do tempo, organizados para decorar de vez.",
    intro: `
O **Blender** é um dos softwares mais **dependentes de teclado** que existem. Diferente de programas como o **Maya** ou o **3ds Max**, em que muita coisa fica em menus visuais, no Blender quase toda ação tem um **atalho**. Isso parece intimidador no começo, mas se torna uma das maiores vantagens depois — você fica absurdamente rápido. Pense em um pianista: a partitura está no instrumento, não no monitor.

A boa notícia é que os atalhos seguem **padrões mnemônicos** simples. \`G\` é "grab" (mover), \`R\` é "rotate", \`S\` é "scale", \`E\` é "extrude", \`F\` é "fill". Decore esses cinco e você já consegue 70% do trabalho de modelagem básica.

## Modais: digite, depois confirme
Diferente de outros softwares, no Blender você aperta o atalho **uma vez** (sem segurar) e entra em **modo modal** — agora seu mouse controla a operação até você confirmar (\`clique esquerdo\` ou \`Enter\`) ou cancelar (\`clique direito\` ou \`Esc\`). Pode ainda **digitar números** durante o modal (\`G Z 2 Enter\` = mover 2 unidades no eixo Z) ou **travar eixos** com \`X\`, \`Y\`, \`Z\`.

## Áreas e contextos
Atalhos no Blender dependem de **onde está o mouse**. \`G\` na 3D Viewport move objetos; \`G\` no editor de nodes move nodes; \`G\` na timeline move keyframes. Sempre olhe **onde está o cursor** antes de apertar.

Vamos ao mapa essencial. Imprima, cole no monitor, decore aos poucos. Em uma semana, você usa sem pensar.
    `,
    codes: [
      {
        lang: "atalho",
        code: "=== TRANSFORMAÇÕES (na 3D Viewport) ===\nG          → mover (Grab)\nR          → girar (Rotate)\nS          → escalar (Scale)\nG X / Y / Z → mover travado em eixo\nR Z 90     → girar 90° no eixo Z\nS 2        → escalar para 200%",
      },
      {
        lang: "atalho",
        code: "=== SELEÇÃO E VISUALIZAÇÃO ===\nClique esquerdo → selecionar\nA               → selecionar tudo\nAlt + A         → desselecionar tudo\nH               → esconder selecionado\nAlt + H         → mostrar tudo\nNumpad 0        → ver pela câmera\nNumpad 1/3/7    → frente / lado / topo\nHome            → enquadrar a cena toda\n. (numpad)      → enquadrar selecionado",
      },
      {
        lang: "atalho",
        code: "=== ARQUIVO E SISTEMA ===\nCtrl + S        → salvar\nCtrl + Shift + S → salvar como\nCtrl + Z        → desfazer\nCtrl + Shift + Z → refazer\nCtrl + N        → nova cena\nF12             → renderizar imagem\nCtrl + F12      → renderizar animação",
      },
      {
        lang: "atalho",
        code: "=== EDITAR MALHA (Edit Mode) ===\nTab             → alternar Object/Edit Mode\n1 / 2 / 3       → vértices / arestas / faces\nE               → extrudar\nI               → inset (face para dentro)\nF               → criar face/aresta\nM               → merge (juntar vértices)\nCtrl + R        → loop cut",
      },
      {
        lang: "passo-a-passo",
        code: "# Exercício prático (5 minutos):\n1. Selecione o cubo (clique esquerdo).\n2. Aperte G, mova o mouse, clique para confirmar.\n3. Aperte R Z 45 Enter (gira 45° no eixo Z).\n4. Aperte S 2 Enter (dobra de tamanho).\n5. Tab → entre em Edit Mode.\n6. A → seleciona todos os vértices.\n7. E Z 1 Enter → extruda 1 unidade pra cima.\n8. Tab → volta para Object Mode.\n9. Ctrl + Z várias vezes → desfaz tudo.",
      },
    ],
    points: [
      "**G, R, S** são o trio sagrado: 90% das transformações no Blender.",
      "**Tab** alterna entre **Object Mode** e **Edit Mode** — você usará MUITO.",
      "Atalhos são **contextuais**: dependem de onde o mouse está.",
      "Após o atalho, pode **digitar valor** ou **travar eixo** com X/Y/Z.",
      "**Esc** ou **clique direito** cancela um modal; **Enter** ou **clique esquerdo** confirma.",
      "**\`F3\`** abre a busca de operadores — quando esquecer um atalho, digite o nome em inglês.",
      "**\`Ctrl + Z\`** desfaz; configure o histórico de undo em Preferences se precisar de mais passos.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Se um atalho não funcionar, verifique seu **modo** (Object/Edit) e onde o **cursor do mouse** está. 90% das confusões vêm daí.",
      },
      {
        type: "info",
        content: "Há **mapas de atalho** alternativos em \`Preferences → Keymap\` (ex: \"Industry Compatible\", parecido com Maya). Mas o padrão Blender é o mais ensinado.",
      },
      {
        type: "warning",
        content: "Não decore atalhos sem **praticar**. Faça pequenos exercícios diários: modele um copo, uma cadeira, um lápis. A repetição grava na memória muscular.",
      },
    ],
  },
  {
    slug: "salvar-projeto",
    section: "instalacao",
    title: "Salvar o projeto: .blend, backups e organização",
    difficulty: "iniciante",
    subtitle: "Como salvar, versionar e nunca mais perder horas de trabalho.",
    intro: `
Salvar parece tarefa trivial — \`Ctrl + S\` e pronto. Mas no **Blender**, com cenas complexas, texturas externas e animações longas, **organizar arquivos** vira parte do ofício. Um bom hábito de salvar evita aquela tragédia clássica: você passou 3 horas modelando, o programa fecha sozinho, e tudo se foi. Vamos blindar você contra isso.

## O formato .blend
O **Blender** salva tudo em um único arquivo \`.blend\`. Esse arquivo contém **objetos, materiais, animações, mundo, configurações de render e até o estado da interface**. É um formato binário próprio, super compacto. Quando você salva, o Blender também cria automaticamente um \`.blend1\` (o arquivo da gravação anterior). Se o atual corromper, basta renomear o \`.blend1\` para \`.blend\`.

## Salvar, salvar como, incremental
Existem três operações fundamentais. \`Ctrl + S\` (**Save**) sobrescreve o arquivo atual. \`Ctrl + Shift + S\` (**Save As**) abre o navegador para escolher novo nome ou pasta. E \`Ctrl + Alt + S\` (**Save Incremental**) cria \`projeto_001.blend\`, \`projeto_002.blend\`, ótimo para ter milestones do trabalho.

## Texturas: linkadas vs empacotadas
Atenção: **texturas e referências** geralmente ficam **fora** do \`.blend\`, apenas linkadas pelo caminho do arquivo. Se você manda o \`.blend\` para outra máquina sem as texturas, elas aparecem **rosa** (cor de "textura faltando"). Para evitar, use \`File → External Data → Pack Resources\` antes de enviar — assim tudo vira um único arquivo autônomo.

## Estrutura de pastas recomendada
Crie sempre uma pasta para cada projeto, com subpastas: \`/textures\`, \`/references\`, \`/renders\`, \`/exports\`, \`/cache\`. Salve o \`.blend\` na raiz. Esse hábito vai te poupar muito sofrimento quando o projeto crescer.
    `,
    codes: [
      {
        lang: "atalho",
        code: "Ctrl + S            → Save (sobrescreve)\nCtrl + Shift + S    → Save As (novo nome/pasta)\nCtrl + Alt + S      → Save Incremental (auto-numera versões)\nCtrl + O            → Open (abrir arquivo)\nF1                  → Open (abre o file browser também)\nCtrl + N            → New (nova cena)",
      },
      {
        lang: "passo-a-passo",
        code: "# Estrutura recomendada de projeto:\nMeuProjeto/\n├── meu_projeto.blend     ← arquivo principal\n├── textures/             ← imagens de textura\n├── references/           ← referências PNG/JPG\n├── renders/              ← saída de render\n├── exports/              ← FBX, OBJ, glTF\n└── cache/                ← simulações (fluido, fumaça)",
      },
      {
        lang: "passo-a-passo",
        code: "# Antes de mandar o .blend pra outra pessoa:\n1. File → External Data → Make Paths Relative.\n2. File → External Data → Pack Resources (empacota texturas).\n3. Ctrl + S para salvar com tudo dentro.\n4. (Opcional) Ctrl + Alt + S para criar versão final numerada.\n5. Compacte a pasta do projeto em .zip.",
      },
      {
        lang: "python",
        code: "# Salvar via script com nome dinâmico (útil em renderfarm):\nimport bpy, os, datetime\nbase = bpy.path.abspath('//')   # pasta do .blend atual\nstamp = datetime.datetime.now().strftime('%Y%m%d_%H%M')\nnovo = os.path.join(base, f'projeto_{stamp}.blend')\nbpy.ops.wm.save_as_mainfile(filepath=novo, copy=True)\nprint('Salvo em:', novo)",
      },
    ],
    points: [
      "**\`.blend\`** guarda objetos, materiais e estado de UI tudo junto.",
      "**\`.blend1\`** é o backup automático da gravação anterior — não delete!",
      "Use **\`Save Incremental\`** para milestones (final de dia, antes de mudança grande).",
      "**Texturas externas** podem sumir; use \`Pack Resources\` antes de transferir.",
      "**Caminhos relativos** (\`Make Paths Relative\`) tornam o projeto portátil entre máquinas.",
      "**Auto Save** já cria \`.blend@\` em \`%TEMP%\` — útil para recuperar crashes.",
      "**Recover Last Session** em \`File → Recover\` salva sua pele depois de um crash.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Adquira o vício do **\`Ctrl + S\` a cada operação grande**. É instinto que custa zero e protege horas de trabalho.",
      },
      {
        type: "danger",
        content: "**Nunca** salve direto na raiz do Desktop ou em pastas sincronizadas (Dropbox/OneDrive) sem cuidado: arquivos enormes podem corromper durante a sincronização.",
      },
      {
        type: "success",
        content: "Após um crash, abra \`File → Recover → Auto Save\` ou \`Last Session\`. Quase sempre o Blender recupera quase tudo.",
      },
    ],
  },
  {
    slug: "addons-basicos",
    section: "instalacao",
    title: "Add-ons básicos: turbinando o Blender desde o início",
    difficulty: "intermediario",
    subtitle: "Os add-ons gratuitos que todo iniciante deveria ativar no primeiro dia.",
    intro: `
**Add-ons** são extensões que adicionam recursos ao **Blender**. Eles podem ser **internos** (já vêm com a instalação, basta ativar em \`Preferences → Add-ons\`) ou **externos** (você baixa um arquivo \`.py\` ou \`.zip\` e instala). A comunidade do Blender é gigantesca, e existem add-ons para praticamente qualquer tarefa — modelar prédios, criar pelos, fazer animação procedural, exportar para Unity, etc.

Antes de sair instalando dezenas, comece com os **essenciais embutidos**. Eles são leves, oficiais e acompanhados de documentação. Os principais que todo mundo ativa são: **Node Wrangler**, **LoopTools**, **Extra Mesh Objects**, **Extra Curve Objects**, **Bool Tool** e **3D Print Toolbox**.

## Como funciona a aba Add-ons
Em \`Edit → Preferences → Add-ons\`, você verá uma busca e categorias (Mesh, Render, Animation, etc.). Cada add-on tem uma caixinha de seleção: **marcou, ativou**. Algumas adicionam menus novos, outras criam abas no \`N-panel\` (a barra lateral da 3D Viewport, que abre com a tecla \`N\`).

## Instalando add-ons externos
Add-ons da comunidade vêm em \`.zip\` ou \`.py\`. Em \`Preferences → Add-ons\`, clique em \`Install...\`, escolha o arquivo, e ative na lista. Cuidado: rode add-ons **só de fontes confiáveis** (BlenderMarket, GitHub oficial, Gumroad de desenvolvedores conhecidos), pois são scripts Python com acesso ao seu sistema.

## Extensions Platform (a partir do Blender 4.2)
Desde a versão **4.2**, o Blender tem um **repositório oficial de extensões** integrado, parecido com a loja de apps do celular: \`Edit → Preferences → Get Extensions\`. Lá você instala, atualiza e desativa add-ons com um clique. É o futuro — use sempre que possível.
    `,
    codes: [
      {
        lang: "passo-a-passo",
        code: "# Ativando os add-ons essenciais (embutidos):\n1. Edit → Preferences → Add-ons.\n2. No campo de busca, digite 'Node Wrangler' → marque a caixinha.\n3. Busque 'LoopTools' → ative.\n4. Busque 'Extra Objects' → ative os dois (Mesh e Curve).\n5. Busque 'Bool Tool' → ative.\n6. Busque '3D Print' → ative.\n7. Feche; ficam ativos para sempre (até desmarcar).",
      },
      {
        lang: "passo-a-passo",
        code: "# Instalando um add-on externo (.zip):\n1. Baixe o .zip de uma fonte confiável.\n2. Edit → Preferences → Add-ons → Install... (canto sup. direito).\n3. Navegue até o .zip → Install Add-on.\n4. O Blender adiciona à lista; marque a caixinha para ativar.\n5. Salve preferências (canto inf. esquerdo da janela).",
      },
      {
        lang: "config",
        code: "# Add-ons embutidos recomendados para iniciantes:\nNode Wrangler         → atalhos para nodes de material/composição\nLoopTools             → ferramentas avançadas para loops de aresta\nExtra Mesh Objects    → primitivas extras (engrenagens, parafusos)\nExtra Curve Objects   → curvas extras (espirais, formas)\nBool Tool             → operações booleanas rápidas (cortar, unir)\n3D Print Toolbox      → checa malhas para impressão 3D\nImages as Planes      → importa imagem como plano com material\nF2                    → cria faces inteligentes a partir de vértices",
      },
      {
        lang: "python",
        code: "# Habilitar add-ons via script (útil em automação):\nimport bpy\nfor name in [\n    'node_wrangler',\n    'mesh_looptools',\n    'add_mesh_extra_objects',\n    'add_curve_extra_objects',\n    'object_boolean_tools',\n    'mesh_f2',\n]:\n    bpy.ops.preferences.addon_enable(module=name)\nbpy.ops.wm.save_userpref()",
      },
      {
        lang: "atalho",
        code: "N         → abre/fecha o N-panel (onde muitos add-ons aparecem)\nF3        → busca operadores (inclui os de add-ons)\nCtrl + Shift + T   → (Node Wrangler) auto-conecta texturas a um BSDF",
      },
    ],
    points: [
      "**Node Wrangler** é praticamente obrigatório para shading e composição.",
      "**LoopTools** facilita curvar, suavizar e simetrizar laços de arestas.",
      "**Bool Tool** acelera operações booleanas (cortes complexos em malhas).",
      "Add-ons externos são scripts **Python** — só instale de fontes confiáveis.",
      "Use a **Extensions Platform** (4.2+) sempre que disponível: atualizações automáticas.",
      "Add-ons aparecem normalmente no **N-panel** (\`N\`) ou em menus do tipo \`Add → Mesh\`.",
      "Quando algo travar após instalar add-on, **desative** e veja se normaliza — assim isola o culpado.",
    ],
    alerts: [
      {
        type: "tip",
        content: "Comece com **poucos add-ons**. Demais polui menus e pode conflitar. Ative só o que de fato vai usar.",
      },
      {
        type: "warning",
        content: "Add-ons piratas ou de origem duvidosa podem conter **código malicioso**. O Blender executa Python com acesso ao seu sistema.",
      },
      {
        type: "success",
        content: "Com Node Wrangler, LoopTools e Bool Tool ativados, você já tem um Blender muito mais produtivo desde o **primeiro projeto**.",
      },
    ],
  },
];
