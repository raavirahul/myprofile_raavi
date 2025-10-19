"use client";

import { useState } from "react";

export default function BlogCommentForm({ slug }: { slug: string }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, comment }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Failed");

      // Store locally so it persists in the browser (useful on Amplify)
      const key = `comments:${slug}`;
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([...existing, data.comment]));

      setOk(true);
      setName("");
      setComment("");
      // Safari focus fix
      (document.activeElement as HTMLElement | null)?.blur?.();
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 border-t pt-8">
      <h3 className="text-xl font-semibold mb-4">💬 Leave a comment</h3>

      <input
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={80}
      />

      <textarea
        className="w-full border rounded-lg p-2 h-28 mb-3"
        placeholder="Your comment…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        maxLength={2000}
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Submit"}
      </button>

      {ok && <p className="mt-3 text-green-600">✅ Thanks! Your comment is saved.</p>}
      {error && <p className="mt-3 text-rose-600">❌ {error}</p>}

      <p className="mt-3 text-xs text-slate-500">
        Note: comments are kept locally in your browser for display.
      </p>
    </form>
  );
}
