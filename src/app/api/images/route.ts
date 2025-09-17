import type { NextRequest } from "next/server";
import { verifyKey } from "~/server/key";

const SITE_A_URL = "https://ipt-les2-sigma.vercel.app/api/images";

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key") ?? "";
  const result = await verifyKey(apiKey);
  if (!result.valid) {
    return Response.json({ error: result.reason }, { status: 401 });
  }

  const siteAUrl = new URL(SITE_A_URL);
  req.nextUrl.searchParams.forEach((value, key) => {
    siteAUrl.searchParams.set(key, value);
  });

  const res = await fetch(siteAUrl.toString());
  const text = await res.text();

  try {
    return Response.json(JSON.parse(text));
  } catch {
    return Response.json({ error: "Invalid JSON from Site A", raw: text }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key") ?? "";
  const result = await verifyKey(apiKey);
  if (!result.valid) {
    return Response.json({ error: result.reason }, { status: 401 });
  }

  const body = await req.text(); // don’t assume JSON yet
  const res = await fetch(SITE_A_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const text = await res.text();
  try {
    return Response.json(JSON.parse(text));
  } catch {
    return Response.json({ error: "Invalid JSON from Site A", raw: text }, { status: 500 });
  }
}
