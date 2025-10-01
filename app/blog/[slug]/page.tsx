import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

export default function BlogPost({ params }: { params: { slug: string } }){
  const p = path.join(process.cwd(), "content", "blog", `${params.slug}.mdx`);
  if(!fs.existsSync(p)) return notFound();
  const mdx = fs.readFileSync(p, "utf8");
  return (
    <main className="container max-w-3xl py-16 prose">
      <article dangerouslySetInnerHTML={{ __html: mdx
        .replace(/^# (.*)$/m, '<h1>$1</h1>')
        .replace(/\n\n/g, '<br/><br/>') }} />
    </main>
  );
}
