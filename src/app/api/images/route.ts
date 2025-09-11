// app/api/images/route.ts in Site B
import type { NextRequest } from "next/server";
import { verifyKey } from "~/server/key";

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key") ?? "";
  const result = await verifyKey(apiKey);

  if (!result.valid) {
    return Response.json({ error: result.reason }, { status: 401 });
  }

  const res = await fetch("http://localhost:3001/api/images");

  // if Site A fails, return safe JSON
  if (!res.ok) {
    return Response.json({ error: "Failed to fetch from Site A" }, { status: 500 });
  }

  const images = await res.json();
  return Response.json({ ok: true, images });
}
