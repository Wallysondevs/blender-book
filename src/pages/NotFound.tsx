import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="text-7xl mb-4">🧊</div>
      <h1 className="text-3xl font-bold mb-2">Capítulo não encontrado</h1>
      <p className="text-stone-600 dark:text-stone-400 mb-6">
        Parece que você caiu fora do mapa do Blender. Vamos te levar de volta para o início.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-bl-orange text-white font-semibold rounded-lg hover:bg-bl-orange-dark">
        <Home size={18} /> Voltar à Home
      </Link>
    </div>
  );
}
