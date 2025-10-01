import fs from "node:fs";
import path from "node:path";

export function getWorkCount(){
  const root = path.join(process.cwd(), "content", "work");
  if(!fs.existsSync(root)) return 0;
  return fs.readdirSync(root).filter(f=>f.endsWith(".mdx")).length;
}

export function getBlogCount(){
  const root = path.join(process.cwd(), "content", "blog");
  if(!fs.existsSync(root)) return 0;
  return fs.readdirSync(root).filter(f=>f.endsWith(".mdx")).length;
}
