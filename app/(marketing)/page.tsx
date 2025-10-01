import Link from "next/link";
import { Metric } from "@/components/Metric";
import HorizontalBanners from "@/components/HorizontalBanners";
import { getBaseUrl } from "@/lib/baseUrl";
import { getWorkCount, getBlogCount } from "@/lib/content";
import Image from "next/image";
import ToolbeltLogos from "@/components/ToolbeltLogos";




async function getStats(){
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/gh`, { cache: "no-store" });
  return res.ok ? res.json() : { stars: 0, commits: 0, repos: 0, followers:0 };
}

export default async function Home(){
  const stats = await getStats();
  const counts = { workCount: getWorkCount(), blogCount: getBlogCount() };

  return (
    <main className="container max-w-6xl py-16 space-y-20">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05]">
            Building reliable, observable data platforms on Cloud
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Data Engineer based in Paris. I design and ship ETL/ELT with Glue, EMR, Lambda,
            Redshift & dbt — with cost controls and on-call friendly observability.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/work" className="btn btn-primary">View case studies</Link>
            <Link href="/contact" className="btn btn-ghost">Contact → Discord</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Metric label="GitHub stars" value={String(stats.stars || "—")} />
            <Metric label="Repos" value={String(stats.repos || "—")} />
            <Metric label="Followers" value={String(stats.followers || "—")} />
            <Metric label="90d commits" value={String(stats.commits || "—")} />
          </div>
        </div>
        <div className="aspect-[4/3] rounded-3xl border p-4 shadow-glow" style={{borderColor:'rgba(0,0,0,0.08)'}}>
        <div className="h-full w-full rounded-2xl overflow-hidden bg-white">
        <Image src="/images/ui .jpg" alt="AWS architecture overview" width={1600} height={1200} className="h-full w-full object-cover" />
        </div>
        </div>
      </section>

      {/* HORIZONTAL GRAND BANNERS */}
      <HorizontalBanners counts={counts} />

      {/* FEATURED WORK */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured work</h2>
          <a href="/work" className="text-slate-700 hover:underline">See all →</a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <a className="card p-6 hover:shadow-lg transition" href="/work/aws-observable-pipelines">
            <h3 className="text-xl font-semibold">Cutting ETL failures by 63%</h3>
            <p className="text-slate-600 mt-2 text-sm">AWS Glue, Lambda, Redshift, dbt, CloudWatch</p>
            <p className="mt-4 text-sm text-slate-700">Contracts & tests → fewer retries, faster rebuilds, lower S3 cost.</p>
          </a>
          <a className="card p-6 hover:shadow-lg transition" href="/work/automaci">
            <h3 className="text-xl font-semibold">AUTOMACI — Internal AI + RAG</h3>
            <p className="text-slate-600 mt-2 text-sm">S3, Bedrock/OpenAI, Lambda, Step Functions</p>
            <p className="mt-4 text-sm text-slate-700">Central research, doc chunking, retrieval, dashboards.</p>
          </a>
        </div>

        <ToolbeltLogos />

      </section>
    </main>
  );
}
