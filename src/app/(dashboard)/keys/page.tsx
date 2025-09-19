"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { BookOpen, KeyRound, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import CopyButton from "~/components/copy-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { useEffect, useState } from "react";

type KeyItem = {
  id: string;
  name: string;
  masked: string;
  createdAt: string;
  revoked: boolean;
};

export default function KeysPage() {
  const [name, setName] = useState("My API Key");
  const [justCreated, setJustCreated] = useState<{ key: string; id: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<KeyItem[]>([]);

  async function createKey() {
    setLoading(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setJustCreated({ key: data.key, id: data.id });
        await load();
      } else {
        alert(data.error ?? "Failed to create API key");
      }
    } finally {
      setLoading(false);
    }
  }

  async function load() {
    const res = await fetch("/api/keys", { cache: "no-store" });
    const data = await res.json();
    setItems(data ?? []);
  }

  async function revokeKey(id: string) {
    const res = await fetch(`/api/keys?keyId=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) alert(data.error ?? "Failed to revoke API key");
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 text-white">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-emerald-900/40 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            <KeyRound className="h-6 w-6 text-emerald-400" />
            API Keys
          </h1>
          <Link href={"/docs"}>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-emerald-600 text-emerald-400 hover:bg-emerald-700/30 transition"
              aria-label="Open API Guide"
            >
              <BookOpen className="h-4 w-4" />
              View Docs
            </Button>
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          Manage and generate API keys for accessing your account programmatically.
        </p>
      </div>

      {/* Generate Key */}
      <Card className="border-emerald-900 bg-black/40 backdrop-blur-md shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-emerald-400">Generate API Key</CardTitle>
          <Button
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white transition"
            aria-label="Create API key"
            onClick={createKey}
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input
            placeholder="Key Name (e.g., Production)"
            aria-label="API Key Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black/50 border-emerald-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-600"
          />

          {justCreated && (
            <div className="rounded-md border border-emerald-800 bg-emerald-950/70 p-4 shadow-inner">
              <p className="text-sm font-medium text-emerald-300">
                🎉 New key generated! (visible once):
              </p>
              <div className="mt-2 flex items-center gap-2">
                <code className="text-sm break-all text-white bg-black/40 px-2 py-1 rounded">
                  {justCreated.key}
                </code>
                <CopyButton value={justCreated.key} />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Save this key securely. You won’t be able to see it again.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Your Keys */}
      <Card className="border-emerald-900 bg-black/40 backdrop-blur-md shadow-md">
        <CardHeader>
          <CardTitle className="text-emerald-400">Your Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-emerald-800">
                <TableHead className="text-emerald-300">Name</TableHead>
                <TableHead className="text-emerald-300">Key</TableHead>
                <TableHead className="text-emerald-300">Created</TableHead>
                <TableHead className="text-emerald-300">Status</TableHead>
                <TableHead className="text-emerald-300 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-emerald-800 hover:bg-emerald-900/30 transition"
                >
                  <TableCell className="text-white">{row.name}</TableCell>
                  <TableCell className="font-mono text-emerald-200">{row.masked}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(row.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {row.revoked ? (
                      <Badge variant="secondary" className="bg-gray-700 text-white">
                        Revoked
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-600 text-white">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={row.revoked}
                      onClick={() => revokeKey(row.id)}
                      className="bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <KeyRound className="h-6 w-6 text-emerald-500" />
                      <p>No API keys yet. Create one above.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Separator className="bg-emerald-900" />
      <p className="text-sm text-gray-400">
        Tip: Call secured endpoints with the{" "}
        <code className="text-emerald-400">x-api-key</code> header. See{" "}
        <Link className="underline text-emerald-400 hover:text-emerald-300" href={"/docs"}>
          Docs
        </Link>
        .
      </p>
    </div>
  );
}
