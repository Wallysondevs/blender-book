// Aggregator — content lives in sections/<sectionId>.ts (one file per trail)
import type { Chapter, Section } from './types';
import { chapters as s0 } from './sections/boas-vindas';
import { chapters as s1 } from './sections/instalacao';
import { chapters as s2 } from './sections/interface';
import { chapters as s3 } from './sections/navegacao';
import { chapters as s4 } from './sections/objetos';
import { chapters as s5 } from './sections/modelagem';
import { chapters as s6 } from './sections/sculpt';
import { chapters as s7 } from './sections/uv-textura';
import { chapters as s8 } from './sections/materiais';
import { chapters as s9 } from './sections/iluminacao';
import { chapters as s10 } from './sections/render';
import { chapters as s11 } from './sections/animacao';
import { chapters as s12 } from './sections/rigging';
import { chapters as s13 } from './sections/fx-projetos';

export type { Chapter, Section, Difficulty, AlertType, CodeSample, AlertSpec } from './types';

export const sections: Section[] = [
  {
    id: "boas-vindas",
    icon: "BookOpen",
    label: "Boas-vindas e Fundamentos",
    chapterSlugs: ["bem-vindo", "o-que-e-blender", "blender-vs-outros", "historia-blender", "areas-de-uso", "como-estudar-este-livro"],
  },
  {
    id: "instalacao",
    icon: "Download",
    label: "Instalação e Primeiros Passos",
    chapterSlugs: ["requisitos-hardware", "baixar-instalar-windows", "baixar-instalar-mac", "baixar-instalar-linux", "primeira-abertura", "configurar-preferencias", "atalhos-essenciais", "salvar-projeto", "addons-basicos"],
  },
  {
    id: "interface",
    icon: "LayoutDashboard",
    label: "Interface e Workspace",
    chapterSlugs: ["tour-interface", "areas-editores", "workspaces", "outliner", "properties-editor", "timeline", "customizar-layout", "temas-cores", "modos-objeto-edicao", "header-status-bar"],
  },
  {
    id: "navegacao",
    icon: "Move3d",
    label: "Navegação 3D e Viewport",
    chapterSlugs: ["orbitar-pan-zoom", "numpad-views", "camera-walk-fly", "perspectiva-ortho", "gizmos-visuais", "shading-modes", "overlays-viewport", "foco-objeto", "viewport-clipping", "configurar-mouse-trackpad"],
  },
  {
    id: "objetos",
    icon: "Box",
    label: "Objetos Básicos",
    chapterSlugs: ["adicionar-meshes", "transformacoes-grs", "eixos-pivot-point", "snap-precisao", "duplicar-arrays", "parent-children", "collections", "origem-objeto", "mesh-vs-objeto", "modifiers-intro"],
  },
  {
    id: "modelagem",
    icon: "Hammer",
    label: "Modelagem (Edit Mode)",
    chapterSlugs: ["edit-mode-intro", "vertices-arestas-faces", "selection-tools", "extrude", "inset", "bevel", "loop-cut", "knife-bisect", "bridge-edge-loops", "fill-grid-fill", "proportional-editing", "mirror-modifier", "subdivision-surface", "projeto-cadeira"],
  },
  {
    id: "sculpt",
    icon: "Brush",
    label: "Escultura (Sculpt Mode)",
    chapterSlugs: ["sculpt-intro", "brushes-essenciais", "dyntopo", "multiresolution", "mascaras-face-sets", "remesh-voxel", "simetria", "escultura-cabeca-iniciante", "retopologia-pos-sculpt", "exportar-decimate"],
  },
  {
    id: "uv-textura",
    icon: "Layers",
    label: "UV Mapping e Texturas",
    chapterSlugs: ["por-que-uv", "marcar-seams", "unwrap", "uv-editor-tour", "uv-checker", "packing-uvs", "texturas-image-vs-procedural", "baking-textures", "normal-bake", "painting-2d-3d"],
  },
  {
    id: "materiais",
    icon: "Palette",
    label: "Materiais e Shaders",
    chapterSlugs: ["principled-bsdf", "base-color-roughness-metallic", "normal-bump-displacement", "emission-glow", "transparencia-vidro", "shader-editor-nodes", "mix-shaders", "procedural-noise-voronoi", "image-textures-pbr", "node-groups"],
  },
  {
    id: "iluminacao",
    icon: "Sun",
    label: "Iluminação",
    chapterSlugs: ["tipos-lampadas", "point-vs-area", "sun-light", "spot-light", "hdri-world", "esquema-tres-pontos", "sombras-soft-vs-hard", "color-temperature", "light-linking", "otimizar-luzes-cycles"],
  },
  {
    id: "render",
    icon: "Camera",
    label: "Render (Eevee e Cycles)",
    chapterSlugs: ["eevee-vs-cycles", "configurar-render", "samples-noise", "denoise", "viewport-render", "output-formatos", "png-jpg-exr", "render-layers", "compositor-intro", "motion-blur-dof", "gpu-render-tips", "render-animacao"],
  },
  {
    id: "animacao",
    icon: "Clapperboard",
    label: "Animação",
    chapterSlugs: ["keyframes-intro", "dope-sheet", "graph-editor", "interpolacao-curvas", "drivers", "constraints-anim", "follow-path", "shape-keys-morph", "nla-editor", "animar-camera", "principios-animacao"],
  },
  {
    id: "rigging",
    icon: "Bone",
    label: "Rigging e Personagens",
    chapterSlugs: ["armatures-bones", "parent-mesh-armature", "weight-paint", "ik-vs-fk", "rigify-intro", "custom-controllers", "andar-personagem", "lip-sync-basico"],
  },
  {
    id: "fx-projetos",
    icon: "Sparkles",
    label: "Efeitos, Geometry Nodes e Projetos",
    chapterSlugs: ["particulas-intro", "hair-particles", "fluido-liquido", "fumaca-fogo", "cloth-tecido", "soft-body", "rigid-body", "geometry-nodes-intro", "geo-scattering", "projeto-donut", "projeto-arch-viz", "exportar-fbx-gltf", "comunidade-recursos", "glossario", "proximos-passos"],
  },
];

export const chapters: Chapter[] = [
  ...s0, ...s1, ...s2, ...s3, ...s4, ...s5, ...s6,
  ...s7, ...s8, ...s9, ...s10, ...s11, ...s12, ...s13,
];

export const chapterMap: Record<string, Chapter> = Object.fromEntries(
  chapters.map(c => [c.slug, c])
);

export function chapterIndex(slug: string): number {
  return chapters.findIndex(c => c.slug === slug);
}
