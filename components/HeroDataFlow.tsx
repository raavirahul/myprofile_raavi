'use client';

import { motion } from 'framer-motion';

const Node = ({ label }: { label: string }) => (
  <div className="rounded-xl bg-white shadow-md px-3 py-2 text-sm font-medium text-slate-800 border"
       style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
    {label}
  </div>
);

const Dot = () => (
  <motion.div
    className="w-2 h-2 rounded-full bg-blue-600"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ duration: 1.2, repeat: Infinity }}
  />
);

export default function HeroDataFlow() {
  return (
    <div className="h-full w-full rounded-2xl p-4"
         style={{ background: 'linear-gradient(140deg,#eaf2ff 0%,#f7f9fc 45%,#eef2ff 100%)' }}>
      <div className="h-full grid grid-rows-3 grid-cols-3 gap-4">
        {/* Row 1 */}
        <div className="flex items-start gap-3">
          <Node label="S3" />
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-16 bg-blue-200" />
            <Dot />
            <div className="h-[2px] w-8 bg-blue-200" />
          </div>
          <Node label="Glue" />
        </div>

        {/* Row 2 */}
        <div className="col-span-3 flex items-center justify-between px-2">
          <Node label="Lambda" />
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-24 bg-indigo-200" />
            <Dot />
            <div className="h-[2px] w-24 bg-indigo-200" />
          </div>
          <Node label="EventBridge" />
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-24 bg-indigo-200" />
            <Dot />
            <div className="h-[2px] w-24 bg-indigo-200" />
          </div>
          <Node label="dbt" />
        </div>

        {/* Row 3 */}
        <div className="col-span-3 flex items-end justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-24 bg-emerald-200" />
            <Dot />
            <div className="h-[2px] w-12 bg-emerald-200" />
          </div>
          <Node label="Redshift" />
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-12 bg-emerald-200" />
            <Dot />
            <div className="h-[2px] w-24 bg-emerald-200" />
          </div>
          <Node label="Athena" />
        </div>
      </div>
    </div>
  );
}
