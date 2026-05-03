import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ code, language = "blender" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="relative my-4 group">
      <div className="flex items-center justify-between bg-bl-blue-dark text-bl-orange-light text-xs px-4 py-2 rounded-t-lg font-mono">
        <span>{language}</span>
        <button onClick={copy} className="flex items-center gap-1 hover:text-white transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="bg-stone-900 text-stone-100 p-4 rounded-b-lg overflow-x-auto text-sm leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
