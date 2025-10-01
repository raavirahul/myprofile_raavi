'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/demos', label: 'Demos' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Résumé' },
];

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={[
        "relative px-1 py-1 text-[13px] md:text-sm font-medium tracking-wide",
        active ? "text-slate-900" : "text-slate-700 hover:text-slate-900"
      ].join(' ')}
    >
      {/* Animated underline */}
      <span
        className={[
          "absolute left-0 -bottom-0.5 h-[2px] rounded-full transition-all",
          active ? "w-full bg-blue-600" : "w-0 bg-slate-300 group-hover:w-full"
        ].join(' ')}
      />
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
      <nav className="container max-w-6xl flex items-center justify-between py-3 md:py-4">
        {/* Left: Brand (avatar + name) */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/raavi.jpg"
            alt="Rahul Raavi"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm"
            priority
          />
          <div className="leading-tight">
            <span className="text-sm md:text-base font-semibold tracking-tight text-slate-900">
              Rahul <span className="font-bold tracking-wide uppercase">Raavi</span>
            </span>
            {/* optional micro-tagline */}
            {/* <div className="text-[11px] text-slate-500">Paris • Europe</div> */}
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5 group">
          {links.map((l) => <NavItem key={l.href} href={l.href} label={l.label} />)}
          <Link href="/contact" className="btn btn-primary h-9 px-4 text-sm">Contact</Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t bg-white"
             style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
          <div className="container max-w-6xl py-3 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-slate-800"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary h-10 justify-center">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
