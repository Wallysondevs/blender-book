import { useParams, Link } from "wouter";
import { chapterMap, chapters, chapterIndex } from "@/data/chapters";
import PageContainer from "@/components/PageContainer";
import CodeBlock from "@/components/CodeBlock";
import AlertBox from "@/components/AlertBox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import NotFound from "./NotFound";
import { useEffect } from "react";

export default function Chapter() {
  const { slug } = useParams<{ slug: string }>();
  const c = chapterMap[slug];
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);
  if (!c) return <NotFound />;
  const idx = chapterIndex(slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  const renderIntro = (text: string) => {
    // Split into blocks, then ensure h2/h3 lines start their own block even
    // when the agent forgot to leave a blank line before them.
    const rawBlocks = text.trim().split(/\n\s*\n/);
    const blocks: string[] = [];
    for (const b of rawBlocks) {
      const lines = b.split("\n");
      let buf: string[] = [];
      const flush = () => { if (buf.length) { blocks.push(buf.join("\n")); buf = []; } };
      for (const line of lines) {
        if (/^#{2,3}\s/.test(line)) {
          flush();
          blocks.push(line);
        } else {
          buf.push(line);
        }
      }
      flush();
    }
    const inline = (s: string) =>
      s.replace(/`([^`]+)`/g, "<code>$1</code>")
       .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return blocks.map((p, i) => {
      if (p.startsWith("### ")) return <h3 key={i} dangerouslySetInnerHTML={{ __html: inline(p.slice(4)) }} />;
      if (p.startsWith("## ")) return <h2 key={i} dangerouslySetInnerHTML={{ __html: inline(p.slice(3)) }} />;
      return <p key={i} dangerouslySetInnerHTML={{ __html: inline(p) }} />;
    });
  };

  return (
    <PageContainer title={c.title} subtitle={c.subtitle} difficulty={c.difficulty}>
      {renderIntro(c.intro)}

      {c.codes.length > 0 && <h2>Exemplos práticos</h2>}
      {c.codes.map((code, i) => (
        <CodeBlock key={i} code={code.code} language={code.lang} />
      ))}

      {c.points.length > 0 && (
        <>
          <h2>Pontos-chave</h2>
          <ul>
            {c.points.map((p, i) => (
              <li key={i} dangerouslySetInnerHTML={{
                __html: p.replace(/`([^`]+)`/g, "<code>$1</code>")
                        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"),
              }} />
            ))}
          </ul>
        </>
      )}

      {c.alerts.map((a, i) => (
        <AlertBox key={i} type={a.type}>
          <span dangerouslySetInnerHTML={{
            __html: a.content.replace(/`([^`]+)`/g, "<code>$1</code>")
                              .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"),
          }} />
        </AlertBox>
      ))}

      <nav className="mt-12 pt-6 border-t border-amber-100 dark:border-stone-800 flex items-center justify-between gap-3">
        {prev ? (
          <Link href={`/c/${prev.slug}`} className="flex-1 group flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-stone-900 hover:bg-bl-orange/10">
            <ArrowLeft size={18} className="text-bl-orange" />
            <div className="min-w-0">
              <div className="text-xs uppercase text-stone-500">Anterior</div>
              <div className="font-semibold truncate">{prev.title}</div>
            </div>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link href={`/c/${next.slug}`} className="flex-1 group flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-stone-900 hover:bg-bl-orange/10 text-right justify-end">
            <div className="min-w-0">
              <div className="text-xs uppercase text-stone-500">Próximo</div>
              <div className="font-semibold truncate">{next.title}</div>
            </div>
            <ArrowRight size={18} className="text-bl-orange" />
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </PageContainer>
  );
}
