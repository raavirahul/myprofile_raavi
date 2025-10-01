'use client';
import { useState } from 'react';

export default function ContactForm(){
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState<boolean|null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setPending(true); setOk(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = await fetch('/api/contact', { method:'POST', body: JSON.stringify(data) });
    setOk(r.ok); setPending(false);
  }

  return (
    <form onSubmit={submit} className="space-y-4 max-w-lg">
      <input name="name" placeholder="Your name" className="w-full rounded-xl bg-white p-3 border" />
      <input type="email" name="email" placeholder="Email" className="w-full rounded-xl bg-white p-3 border" />
      <input name="role" placeholder="Role/Company (optional)" className="w-full rounded-xl bg-white p-3 border" />
      <textarea name="message" placeholder="How can I help?" className="w-full rounded-xl bg-white p-3 h-28 border" />
      <button disabled={pending} className="btn btn-primary">
        {pending ? 'Sending…' : 'Send → Discord'}
      </button>
      {ok===true && <p className="text-green-600">Thanks! I’ll get back soon.</p>}
      {ok===false && <p className="text-red-600">Something went wrong.</p>}
    </form>
  );
}
