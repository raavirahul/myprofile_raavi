import Image from "next/image";

type Logo = { src: string; alt: string };

function LogoGrid({ title, logos }: { title: string; logos: Logo[] }) {
  return (
    <div className="card p-6 h-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 place-items-center">
        {logos.map((l) => (
          <div key={l.src} className="flex items-center justify-center">
            <Image
              src={l.src}
              alt={l.alt}
              width={56}
              height={56}
              className="h-10 w-10 md:h-12 md:w-12 object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ToolbeltLogos() {
  const CLOUD: Logo[] = [
    { src: "/logos/aws.png", alt: "AWS" },
    { src: "/logos/azure.png", alt: "Azure" },
    { src: "/logos/zoho.png", alt: "Zoho" },
    { src: "/logos/gcp.svg", alt: "gcp" },

  ];

  const ENGINEERING: Logo[] = [
    { src: "/logos/dbt.png", alt: "dbt" },
    { src: "/logos/airflow.png", alt: "Apache Airflow" },
    { src: "/logos/terraform.svg", alt: "Terraform" },
    { src: "/logos/docker.svg", alt: "Docker" },
    { src: "/logos/Github.png", alt: "GitHub Actions" },
  ];

  const ANALYTICS: Logo[] = [
    { src: "/logos/python.png", alt: "python" },
    { src: "/logos/powerbi.png", alt: "Power BI" },
  ];

  return (
    <section className="container max-w-6xl mt-12">
      {/* Divider with centered label */}
      <div className="my-8">
        <div className="flex items-center gap-4">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            I work with
          </span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>
      </div>

      {/* Three headings in one row with logos underneath */}
      <div className="grid md:grid-cols-3 gap-6">
        <LogoGrid title="Cloud" logos={CLOUD} />
        <LogoGrid title="Engineering" logos={ENGINEERING} />
        <LogoGrid title="Analytics" logos={ANALYTICS} />
      </div>
    </section>
  );
}
