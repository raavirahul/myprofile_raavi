import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

export default function Blog(){
  const root = path.join(process.cwd(), "content", "blog");
  const posts = fs.existsSync(root) ? fs.readdirSync(root).filter(f=>f.endsWith(".mdx")) : [];
  return (
    <main className="container max-w-6xl py-16">
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="text-slate-600 mt-2">Notes on patterns, costs, reliability, and AWS.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {posts.map((f)=>{
          const slug = f.replace(/\.mdx$/, "");
          const title = slug.replace(/-/g, " ").replace(/\b\w/g, (m)=>m.toUpperCase());
          return (
            <Link key={slug} href={`/blog/${slug}`} className="card p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-slate-600 text-sm mt-2">Read →</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
