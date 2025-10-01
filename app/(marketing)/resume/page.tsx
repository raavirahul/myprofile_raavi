export default function Resume(){
  return (
    <main className="container max-w-6xl py-16 space-y-4">
      <h1 className="text-4xl font-bold">Résumé</h1>
      <p className="text-slate-600">Download a concise PDF and skim highlights below.</p>
      <a className="btn btn-primary" href="/Rahul_Raavi_Resume.pdf" download>Download PDF</a>
      <section className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card p-6"><h3 className="font-semibold">Cloud</h3><p className="text-sm text-slate-600 mt-2">AWS (S3, Glue, EMR, Lambda, EBS, Redshift), Azure (ADF, Synapse), Databricks</p></div>
        <div className="card p-6"><h3 className="font-semibold">Data</h3><p className="text-sm text-slate-600 mt-2">ETL/ELT, dbt, contracts, testing, lineage, cost controls</p></div>
        <div className="card p-6"><h3 className="font-semibold">DevOps</h3><p className="text-sm text-slate-600 mt-2">Terraform, CI/CD, Docker, GitHub Actions</p></div>
      </section>
    </main>
  );
}
