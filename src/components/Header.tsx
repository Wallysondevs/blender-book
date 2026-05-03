import { Link } from "wouter";
import { Menu, Github } from "lucide-react";

export default function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-bl-charcoal/95 backdrop-blur border-b border-amber-100 dark:border-stone-800 shadow-sm">
      <div className="flex items-center gap-3 px-4 h-14">
        <button
          onClick={onMenu}
          className="lg:hidden p-2 -ml-2 text-stone-700 dark:text-stone-200"
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-bl-orange text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
              <path d="M12 2.2a9.8 9.8 0 1 0 9.8 9.8 9.81 9.81 0 0 0-9.8-9.8Zm4.5 13.55a4.5 4.5 0 0 1-7.93-2.42L6.5 12l2.07-1.32a4.5 4.5 0 0 1 7.93 2.42l2.07 1.32Z" />
            </svg>
          </span>
          <span className="text-bl-orange dark:text-bl-orange-light">
            Blender: Do Zero ao Avançado
          </span>
        </Link>
        <div className="ml-auto">
          <a
            href="https://github.com/Wallysondevs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-300 hover:text-bl-orange"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
