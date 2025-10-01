'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { MoveLeft, MoveRight } from 'lucide-react';

type BannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  gradient: string;
  stats?: Array<{ label: string; value: string }>;
};

function Banner({ eyebrow, title, description, href, gradient, stats }: BannerProps) {
  return (
    <article
      className="slide snap-start shrink-0 w-[92vw] md:w-[85vw] lg:w-[80vw] xl:w-[72vw] px-3 md:px-4"
      aria-label={title}
    >
      <div
        className="relative h-[320px] md:h-[380px] rounded-3xl overflow-hidden border shadow-glow"
        style={{ borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <div className="absolute inset-0" style={{ background: gradient }} />
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-wider text-slate-600">{eyebrow}</p>
            <h3 className="text-2xl md:text-4xl font-bold mt-1 md:mt-2">{title}</h3>
            <p className="mt-3 text-slate-700 max-w-2xl">{description}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Link href={href} className="btn btn-primary">Explore →</Link>
            {stats && (
              <ul className="hidden md:flex gap-6 text-sm text-slate-700">
                {stats.map((s) => (
                  <li key={s.label} className="flex flex-col items-end">
                    <span className="text-base md:text-lg font-semibold">{s.value}</span>
                    <span className="text-slate-500">{s.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HorizontalBanners({
  counts,
  autoplayMs = 2000, // change speed here
}: {
  counts: { workCount: number; blogCount: number };
  autoplayMs?: number;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideWRef = useRef<number>(0);
  const [current, setCurrent] = useState(0); // index of REAL slides: 0..n-1
  const [paused, setPaused] = useState(false);

  const slides: BannerProps[] = [
    {
      eyebrow: 'Projects',
      title: 'Architecture case studies & live demos',
      description:
        'Deep dives into how I reduce failures, control costs, and ship observable pipelines on AWS (Glue, EMR, Lambda, Redshift, dbt).',
      href: '/work',
      gradient: 'linear-gradient(135deg,#eaf2ff 0%,#f7f9fc 45%,#eef2ff 100%)',
      stats: [
        { label: 'Case studies', value: String(counts.workCount) },
        { label: 'Failure ↓', value: '−63%' },
        { label: 'Rebuild', value: '<4h' },
      ],
    },
    {
      eyebrow: 'Experience',
      title: 'Data engineering in Paris & across Europe',
      description:
        'AWS-first, production ETL/ELT, data contracts, lineage, alerting that matters, and hands-on cost stewardship.',
      href: '/resume',
      gradient: 'linear-gradient(135deg,#e6fff6 0%,#f7f9fc 45%,#dcfce7 100%)',
      stats: [
        { label: 'YoE', value: '3+' },
        { label: 'Clouds', value: 'AWS/Azure' },
        { label: 'Tooling', value: 'dbt/Kafka' },
      ],
    },
    {
      eyebrow: 'Blog',
      title: 'Patterns, costs, & reliability notes',
      description:
        'Short, practical write-ups: contracts vs. schemas, durable retries, partitioning for cost, EMR pitfalls, dbt tests that pay off.',
      href: '/blog',
      gradient: 'linear-gradient(135deg,#fff3e8 0%,#f7f9fc 45%,#ffe4e6 100%)',
      stats: [
        { label: 'Posts', value: String(counts.blogCount) },
        { label: 'Avg read', value: '4 min' },
        { label: 'Series', value: '3' },
      ],
    },
  ];
  const n = slides.length;

  // Helpers
  const getSlideWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLElement>('.slide');
    return first ? first.offsetWidth : 0;
  }, []);

  const snapTo = useCallback((realIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const el = trackRef.current;
    const w = slideWRef.current;
    if (!el || !w) return;
    // +1 because of the leading clone
    el.scrollTo({ left: w * (realIndex + 1), behavior });
    setCurrent(realIndex);
  }, []);

  const next = useCallback(() => snapTo((current + 1) % n), [current, n, snapTo]);
  const prev = useCallback(() => snapTo((current - 1 + n) % n), [current, n, snapTo]);

  // Measure width & set initial position to first REAL slide
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      slideWRef.current = getSlideWidth();
      // Jump (no animation) to the first real slide
      el.scrollTo({ left: slideWRef.current, behavior: 'auto' });
    };
    update();
    // Recompute on resize
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [getSlideWidth]);

  // Loop logic on manual scroll: if we hit clones, jump to the matching real slide (no animation)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = slideWRef.current;
      if (!w) return;
      const x = el.scrollLeft;
      const maxCloneLeft = w * (n + 1); // trailing clone position
      if (x <= 0 + 1) {
        // at leading clone -> jump to last real
        el.scrollTo({ left: w * n, behavior: 'auto' });
      } else if (x >= maxCloneLeft - 1) {
        // at trailing clone -> jump to first real
        el.scrollTo({ left: w, behavior: 'auto' });
      } else {
        // update current based on nearest real index
        const i = Math.round(x / w) - 1; // remove leading clone
        if (i >= 0 && i < n && i !== current) setCurrent(i);
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [current, n]);

  // Autoplay (pauses on hover, tab hidden, or section off-screen)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || paused) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [next, autoplayMs, paused]);

  // Pause when section not visible
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => setPaused(!entries.some((e) => e.isIntersecting)),
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <section
      ref={sectionRef as any}
      aria-label="Featured sections"
      className="mx-[max(0px,calc(50%-50vw))] py-6 md:py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        {/* Scroll track with clones at both ends */}
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="Projects, Experience, Blog"
          tabIndex={0}
        >
          {/* Leading clone = last slide */}
          <Banner {...slides[n - 1]} />
          {/* Real slides */}
          {slides.map((s, i) => <Banner key={i} {...s} />)}
          {/* Trailing clone = first slide */}
          <Banner {...slides[0]} />
        </div>

        {/* Arrows */}
        <div className="hidden md:flex gap-2 absolute top-1/2 -translate-y-1/2 right-6 z-10">
          <button onClick={prev} className="btn btn-ghost" aria-label="Previous banner">
            <MoveLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="btn btn-primary" aria-label="Next banner">
            <MoveRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: n }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => snapTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${current === i ? 'bg-blue-600' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
