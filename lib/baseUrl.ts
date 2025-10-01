import { headers } from "next/headers";

export function getBaseUrl(){
  const h = headers();
  const proto = h.get("x-forwarded-proto") || "http";
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:5173";
  return `${proto}://${host}`;
}
