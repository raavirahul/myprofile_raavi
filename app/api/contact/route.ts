import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const body = await req.json();
  const webhook = process.env.DISCORD_WEBHOOK_URL!;
  if(!webhook) return NextResponse.json({ ok:false, error:"Missing webhook" }, { status:500 });

  const content = [
    `**New Lead** — ${body.name ?? "(no name)"}`,
    `Email: ${body.email ?? "-"}`,
    `Role: ${body.role ?? "-"}`,
    `Message: ${body.message ?? "-"}`,
    `Source: ${body.source ?? "portfolio"}`
  ].join("\n");

  const r = await fetch(webhook, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ content })
  });
  return NextResponse.json({ ok: r.ok });
}
