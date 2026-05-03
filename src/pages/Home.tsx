import { Link } from "wouter";
import { motion } from "framer-motion";
import { sections, chapters, chapterMap } from "@/data/chapters";
import * as Icons from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const first = chapters[0];
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bl-orange via-bl-orange-dark to-bl-blue-dark text-white p-8 sm:p-12 mb-10 shadow-xl"
      >
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-bl-orange-light/30 rounded-full blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs uppercase tracking-wider font-semibold mb-4">
            <Sparkles size={14} /> Edição completa · pt-BR
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Blender: Do Zero ao Avançado
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl">
            Um livro pedagógico, profundo e prático sobre Blender 4.x. Você começa sem nunca ter
            aberto o programa e termina modelando, esculpindo, animando, iluminando e renderizando
            cenas profissionais — passando por shaders, rigging, simulações e Geometry Nodes.
          </p>
          {first && (
            <Link
              href={`/c/${first.slug}`}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white text-bl-orange-dark font-bold rounded-lg shadow hover:scale-[1.02] transition-transform"
            >
              Começar agora <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </motion.section>

      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-1">Trilhas de aprendizado</h2>
      <p className="text-stone-600 dark:text-stone-400 mb-6">
        {chapters.length} capítulos organizados em {sections.length} trilhas, do clique inicial às
        produções avançadas. Cada capítulo traz teoria explicada, código/configuração comentada,
        pontos-chave e alertas de armadilhas comuns.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((s, i) => {
          const Icon = (Icons as any)[s.icon] || Icons.BookOpen;
          const first = chapterMap[s.chapterSlugs[0]];
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link
                href={first ? `/c/${first.slug}` : "/"}
                className="block bg-white dark:bg-stone-900 border border-amber-100 dark:border-stone-800 hover:border-bl-orange dark:hover:border-bl-orange rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-bl-orange/10 text-bl-orange flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider font-semibold text-bl-orange/80">
                      Trilha {i + 1}
                    </div>
                    <div className="font-bold text-stone-900 dark:text-white truncate">{s.label}</div>
                    <div className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      {s.chapterSlugs.length} capítulos
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <footer className="mt-16 pt-8 border-t border-amber-100 dark:border-stone-800 text-center text-sm text-stone-500 dark:text-stone-400">
        Feito com carinho por <a className="text-bl-orange font-semibold" href="https://github.com/Wallysondevs" target="_blank" rel="noreferrer">Wallyson Devs</a>.
      </footer>
    </div>
  );
}
