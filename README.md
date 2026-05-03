# Blender: Do Zero ao Avançado

Livro on-line, **gratuito e em português brasileiro**, que conduz qualquer pessoa
do primeiro clique no Blender até produções avançadas: modelagem, escultura,
UV, materiais, iluminação, render (Eevee + Cycles), animação, rigging,
simulações e Geometry Nodes.

> **145 capítulos** organizados em **14 trilhas**, com intros didáticos longos,
> blocos de código/atalho, pontos-chave e alertas para armadilhas comuns.

## Stack

- React 19 + Vite 7
- Tailwind CSS v4
- wouter (routing)
- framer-motion (animações)
- lucide-react (ícones)

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy automático no GitHub Pages

A cada push na branch `main` o GitHub Actions roda `.github/workflows/deploy.yml`,
faz o build com `VITE_BASE=/blender-book/` e publica em **GitHub Pages**.

URL final: `https://wallysondevs.github.io/blender-book/`

Para habilitar a primeira vez:

1. Repo → **Settings → Pages**
2. **Build and deployment → Source: GitHub Actions**

## Estrutura

```
src/
  components/   Header, Sidebar, CodeBlock, AlertBox, PageContainer
  pages/        Home, Chapter, NotFound
  data/
    types.ts
    chapters.ts        agregador
    sections/<id>.ts   uma trilha por arquivo (14 trilhas)
```

Para adicionar um capítulo, edite o arquivo da trilha em `src/data/sections/`
e adicione o slug em `src/data/chapters.ts`.

## Licença

Conteúdo em pt-BR escrito por **Wallyson Devs** com apoio de IA. Uso pessoal
e educacional liberado.
