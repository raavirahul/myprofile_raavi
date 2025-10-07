"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: string;
  slug: string;
  name: string;
  comment: string;
  createdAt: string; // ISO
};

export default function CommentsList({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const key = `comments:${slug}`;
    const local = JSON.parse(localStorage.getItem(key) || "[]");
    setComments(local);

    // Try server (best effort)
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.ok && Array.isArray(data.comments)) {
          // Merge unique by id
          const merged = Object.values(
            [...local, ...data.comments].reduce<Record<string, Comment>>((acc, c: Comment) => {
              acc[c.id] = c;
              return acc;
            }, {})
          ) as Comment[];
          setComments(merged);
          localStorage.setItem(key, JSON.stringify(merged));
        }
      })
      .catch(() => {});
  }, [slug]);

  if (comments.length === 0) return null;

  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Recent comments</h3>
      <ul className="space-y-3">
        {comments
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
          .map((c) => (
            <li key={c.id} className="border rounded-lg p-3">
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleString()}</div>
              <p className="mt-2 text-sm">{c.comment}</p>
            </li>
          ))}
      </ul>
    </section>
  );
}
