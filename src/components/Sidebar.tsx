import { Link, useLocation } from "wouter";
import { useMemo, useState } from "react";
import { sections, chapterMap } from "@/data/chapters";
import * as Icons from "lucide-react";
import { ChevronDown, Search, X } from "lucide-react";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [location] = useLocation();
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (!query.trim()) return sections;
    const q = query.toLowerCase();
    return sections
      .map((s) => ({
        ...s,
        chapterSlugs: s.chapterSlugs.filter((slug) => {
          const c = chapterMap[slug];
          return c && (c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q));
        }),
      }))
      .filter((s) => s.chapterSlugs.length > 0);
  }, [query]);

  return (
    <>
      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky lg:top-14 top-0 left-0 z-50 lg:z-10 h-screen lg:h-[calc(100vh-3.5rem)] w-72 bg-white dark:bg-bl-charcoal border-r border-amber-100 dark:border-stone-800 overflow-y-auto transition-transform ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-3 border-b border-amber-100 dark:border-stone-800 flex items-center gap-2 lg:hidden">
          <span className="font-bold text-bl-orange dark:text-bl-orange-light">Menu</span>
          <button onClick={onClose} className="ml-auto p-1"><X size={18} /></button>
        </div>
        <div className="p-3 sticky top-0 bg-white dark:bg-bl-charcoal z-10">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar capítulo…"
              className="w-full pl-8 pr-2 py-1.5 text-sm bg-amber-50 dark:bg-stone-800 rounded border border-transparent focus:border-bl-orange focus:outline-none"
            />
          </div>
        </div>
        <nav className="px-2 pb-8">
          {filtered.map((s) => {
            const Icon = (Icons as any)[s.icon] || Icons.BookOpen;
            const isCollapsed = collapsed[s.id];
            return (
              <div key={s.id} className="mb-1">
                <button
                  onClick={() => setCollapsed((c) => ({ ...c, [s.id]: !c[s.id] }))}
                  className="w-full flex items-center gap-2 px-2 py-2 text-sm font-semibold text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 rounded"
                >
                  <Icon size={16} className="text-bl-orange" />
                  <span className="flex-1 text-left">{s.label}</span>
                  <ChevronDown size={14} className={`transition-transform ${isCollapsed ? "-rotate-90" : ""}`} />
                </button>
                {!isCollapsed && (
                  <ul className="ml-4 border-l border-amber-100 dark:border-stone-800">
                    {s.chapterSlugs.map((slug) => {
                      const c = chapterMap[slug];
                      if (!c) return null;
                      const path = `/c/${slug}`;
                      const active = location === path;
                      return (
                        <li key={slug}>
                          <Link
                            href={path}
                            onClick={onClose}
                            className={`block pl-3 pr-2 py-1.5 text-sm border-l-2 -ml-px transition-colors ${
                              active
                                ? "border-bl-orange text-bl-orange dark:text-bl-orange-light font-semibold bg-bl-orange/10"
                                : "border-transparent text-stone-600 dark:text-stone-400 hover:text-bl-orange hover:border-bl-orange/30"
                            }`}
                          >
                            {c.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
