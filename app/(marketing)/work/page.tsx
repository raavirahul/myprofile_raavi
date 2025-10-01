import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

export default async function Work(){
  const root = path.join(process.cwd(), "content", "work");
  const items = fs.existsSync(root) ? fs.readdirSync(root).filter(f=>f.endsWith(".mdx")) : [];
  return (
    <main className="container max-w-6xl py-16">
      <h1 className="text-4xl font-bold">Case studies</h1>
      <p className="text-slate-600 mt-2">Problem → Approach → Architecture → Results. No fluff.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {items.map((f)=>{
          const slug = f.replace(/\.mdx$/, "");
          const title = slug.replace(/-/g, " ").replace(/\b\w/g, (m)=>m.toUpperCase());
          return (
            <Link key={slug} href={`/work/${slug}`} className="card p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-slate-600 text-sm mt-2">Read the full breakdown →</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
