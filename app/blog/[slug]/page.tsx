// app/blog/[slug]/page.tsx
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Figure from "@/components/mdx/Figure";
import BlogCommentForm from "@/components/BlogcommentForm";
import CommentsList from "@/components/CommentsList";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Prebuild all slugs (SSG)
export async function generateStaticParams() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

// Optional: set <title>/OG from frontmatter
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`);
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const title = (data?.title as string) ?? params.slug;
  const description = (data?.description as string) ?? "";
  const ogImage = (data?.ogImage as string | undefined) ?? undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);

  // If you add custom MDX components later, pass them here:
 // ...
const components = { Figure }; // pass to MDXRemote
// ...
<MDXRemote source={content} components={components} />

  const date =
    typeof data?.date === "string"
      ? new Intl.DateTimeFormat("en-GB", {
          dateStyle: "medium",
          timeZone: "Europe/Paris",
        }).format(new Date(data.date))
      : null;

  return (
    <main className="container max-w-3xl py-16">
      <article className="prose prose-neutral">
        <h1>{(data?.title as string) ?? params.slug}</h1>
        {date && <p className="text-xs text-slate-500 -mt-4 mb-6">{date}</p>}
        <MDXRemote source={content} components={components} />
        <CommentsList slug={params.slug} />
        <BlogCommentForm slug={params.slug} />
      </article>
    </main>
  );
}
