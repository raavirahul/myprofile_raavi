export default function Demos(){
  return (
    <main className="container max-w-6xl py-16 space-y-6">
      <h1 className="text-4xl font-bold">Interactive demos</h1>
      <p className="text-slate-600">Tiny, focused demos showing data flow & reliability levers.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-semibold">CSV → S3 → Athena (simulated)</h3>
          <p className="text-slate-600 text-sm mt-2">Upload CSV, create table DDL, preview query.
          (Hook to real AWS later.)</p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold">Streaming visual: backpressure & DLQ</h3>
          <p className="text-slate-600 text-sm mt-2">Illustrates consumer lag, retries, DLQ off-ramp.</p>
        </div>
      </div>
    </main>
  );
}
