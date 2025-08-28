import type { NextRequest } from "next/server";
import { insertKey, listKeys, revokeKey } from "~/server/key";
import { createKeySchema, DeleteKeySchema } from "~/server/validation";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();  
        const { name } = createKeySchema.parse(body);
        const created = await insertKey(name);
        return Response.json(created, { status: 201 });
    } catch (e: any) {
        return Response.json(
            { error: e.message ?? "Failed to create API key" },
            { status: 500 }
        );
    }
}

export async function GET() {
    const rows = await listKeys();
    const items = rows.map((row) => ({
        id: row.id,
        name: row.name,
        masked: `sk_live_...${row.last4}`,
        createdAt: row.createdAt,
        revoked: row.revoked,
    }));
    return Response.json(items);
}

export async function DELETE(req: NextRequest) {
    try {
        const keyId = new URL(req.url).searchParams.get("keyId");
        const { keyId: parsedKeyId } = DeleteKeySchema.parse({ keyId });
        const ok = await revokeKey(parsedKeyId);
        if (!ok)
            return Response.json({ error: "API key not found" }, { status: 404 });
        return Response.json({ success: true });
    } catch (e: any) {
        return Response.json(
            { error: e.message ?? "Failed to revoke API key" },
            { status: 400 }
        );
    }
}