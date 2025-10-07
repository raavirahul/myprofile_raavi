// app/blog/page.tsx
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";

type PostMeta = {
  slug: string;
  title: string;
  description?: string;
  date?: string;       // ISO string in frontmatter, e.g. "2025-10-07"
  tags?: string[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);

    const titleFromSlug = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

    return {
      slug,
      title: (data?.title as string) || titleFromSlug,
      description: (data?.description as string) || "",
      date: (data?.date as string) || undefined,
      tags: (data?.tags as string[]) || [],
    };
  });

  // Sort by date desc (missing dates go last)
  posts.sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });

  return posts;
}

export default function Blog() {
  const posts = getAllPosts();

  const fmt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Europe/Paris",
  });

  return (
    <main className="container max-w-6xl py-16">
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="text-slate-600 mt-2">
        Notes on patterns, costs, reliability, and AWS.
      </p>

      {posts.length === 0 ? (
        <p className="mt-8 text-slate-500">No posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-xl border p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>

              {p.description && (
                <p className="text-slate-600 text-sm mt-2 line-clamp-3">
                  {p.description}
                </p>
              )}

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{p.date ? fmt.format(new Date(p.date)) : "—"}</span>
                <span className="truncate">
                  {p.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="mr-2 rounded bg-slate-100 px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
