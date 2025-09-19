"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, KeyRound, FileText, Terminal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Separator } from "~/components/ui/separator";
import { Label } from "@radix-ui/react-label";

const baseUrl =
  typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<"guide" | "tester">("guide");
  const [key, setKey] = useState("");
  const [out, setOut] = useState("");
  const [postBody, setPostBody] = useState("Hello World!");
  const [images, setImages] = useState<any[]>([]);

  async function runGET() {
    const res = await fetch(`${baseUrl}/api/ping`, {
      headers: { "x-api-key": key },
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function runPOST() {
    const res = await fetch(`${baseUrl}/api/echo`, {
      method: "POST",
      headers: { "x-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ postBody }),
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function runImages() {
    let bodyObj = {};
    try {
      bodyObj = JSON.parse(postBody);
    } catch {
      bodyObj = { name: postBody };
    }

    const res = await fetch(`${baseUrl}/api/images`, {
      method: "POST",
      headers: {
        "x-api-key": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data.images) {
        setImages(data.images);
      } else {
        setImages(data);
      }
      setOut(JSON.stringify(data, null, 2));
    } catch {
      setOut(`❌ Failed to parse JSON:\n\n${text}`);
    }
  }

  useEffect(() => {
    if (key) {
      runImages();
    }
  }, [key]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-emerald-900 bg-black/50 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-emerald-400">API Docs</h2>
        <nav className="flex flex-col gap-2">
          <Button
            variant={activeTab === "guide" ? "default" : "outline"}
            onClick={() => setActiveTab("guide")}
            className={`flex items-center gap-2 justify-start ${
              activeTab === "guide"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "border-emerald-600 text-emerald-400 hover:bg-emerald-700/30"
            }`}
          >
            <FileText size={16} /> API Guide
          </Button>
          <Button
            variant={activeTab === "tester" ? "default" : "outline"}
            onClick={() => setActiveTab("tester")}
            className={`flex items-center gap-2 justify-start ${
              activeTab === "tester"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "border-emerald-600 text-emerald-400 hover:bg-emerald-700/30"
            }`}
          >
            <Terminal size={16} /> Interactive Tester
          </Button>
        </nav>

        <Separator className="bg-emerald-900" />

        <Link href={"/keys"}>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-emerald-600 text-emerald-400 hover:bg-emerald-700/30 w-full"
          >
            <KeyRound size={16} /> Keys Dashboard
          </Button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {activeTab === "guide" && (
          <Card className="border-emerald-900 bg-black/40">
            <CardHeader>
              <CardTitle className="text-emerald-400">How Authentication Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                Authentication uses the{" "}
                <code className="text-emerald-400">x-api-key</code> header. Create a key
                in <code className="text-emerald-400">/keys</code> and store it securely.
              </p>
              <Separator className="bg-emerald-900" />

              <div>
                <h3 className="font-semibold text-emerald-300">Base URL</h3>
                <pre className="overflow-x-auto rounded-md bg-black/50 p-2 text-emerald-200">
                  <code>{baseUrl + "/api"}</code>
                </pre>
              </div>

              <Separator className="bg-emerald-900" />
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-semibold text-emerald-300">GET /api/ping</h3>
                  <pre className="overflow-x-auto text-sm bg-black/50 p-2 rounded-md">
                    <code>{`curl -H 'x-api-key: <YOUR_KEY>' \\
${baseUrl}/api/ping`}</code>
                  </pre>
                </div>

                <Separator className="bg-emerald-900" />
                <div>
                  <h3 className="font-semibold text-emerald-300">POST /api/echo</h3>
                  <pre className="overflow-x-auto text-sm bg-black/50 p-2 rounded-md">
                    <code>{`curl -X POST \\
  -H 'x-api-key: <YOUR_KEY>' \\
  -H 'content-type: application/json' \\
  -d '{"Hello": "World!"}' \\
  ${baseUrl}/api/echo`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "tester" && (
          <Card className="border-emerald-900 bg-black/40">
            <CardHeader>
              <CardTitle className="text-emerald-400">Interactive Tester</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Paste your API key (sk...)"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-black/50 border-emerald-800 text-white placeholder-gray-400"
              />

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={runGET}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Test GET /api/ping
                </Button>
                <Button
                  onClick={runPOST}
                  variant="secondary"
                  className="border-emerald-600 text-emerald-400 hover:bg-emerald-700/30"
                >
                  Test POST /api/echo
                </Button>
                <Button
                  onClick={runImages}
                  variant="secondary"
                  className="border-emerald-600 text-emerald-400 hover:bg-emerald-700/30"
                >
                  Test GET /api/images
                </Button>
              </div>

              <Label className="text-sm font-medium text-emerald-300">POST body (JSON)</Label>
              <Textarea
                rows={5}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                className="bg-black/50 border-emerald-800 text-white placeholder-gray-400"
              />

              <Label className="text-sm font-medium text-emerald-300">Response</Label>
              <Textarea
                rows={10}
                readOnly
                value={out}
                className="bg-black/50 border-emerald-800 text-emerald-200 font-mono"
              />

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-emerald-800 bg-black/50 shadow"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.imageName || `Image ${i}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-2 text-sm">
                        <p className="font-medium text-white">
                          {img.imageName || "Untitled"}
                        </p>
                        <p className="text-xs text-gray-400">{img.fileName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
