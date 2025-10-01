export function Metric({ label, value, hint }: {label:string; value:string; hint?:string}){
  return (
    <div className="card p-4">
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}
