"use client";

import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { Key, KeyRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useEffect } from "react";

const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";



export default function DocsPage() {
  const [key, setKey] = useState("");
  const [out, setOut] = useState("");
  const [postBody, setPostBody] = useState("Hello World!");
  const [images, setImages] = useState<any[]>([]);
  
  async function runGET() {
    const res = await fetch(`${baseUrl}/api/ping`, {
      headers: {'x-api-key': key},
     });
     setOut(JSON.stringify( await res.json(), null, 2));
  }

  async function runPOST() {
    const res = await fetch(`${baseUrl}/api/echo`, {
        method: "POST",
        headers: { 'x-api-key': key,"Content-Type": "application/json" },
        body: JSON.stringify({ postBody }),
     });
     setOut(JSON.stringify( await res.json(), null, 2));
  }

  async function runImages() {
  const res = await fetch(`${baseUrl}/api/images`, {
    headers: { "x-api-key": key },
  });

  const text = await res.text();
  console.log("RAW RESPONSE:", text);

  try {
    const data = JSON.parse(text);

    // If Site A returns { ok: true, images: [...] }
    if (data.images) {
      setImages(data.images);
    } else {
      setImages(data); // fallback if it's just an array
    }

    setOut(JSON.stringify(data, null, 2));
  } catch (err) {
    setOut(`❌ Failed to parse JSON:\n\n${text}`);
  }
}



useEffect(() => {
  if (key) {  // only fetch if API key is entered
    runImages();
  }
}, [key]);

    return (
        <div className="mx-auto space-y-6 p-6">

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">API Guide</h1>
            <Link href={"/keys"}>
              <Button
              variant={"outline"}
              className="flex items-center gap-2"
              aria-label="Open API Guide"
            >
              <KeyRound />
              Keys Dashboard
            </Button>
          </Link>
        </div>
        
        <Card>
                <CardHeader>
                  <CardTitle>How Authentication Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>
                    Authentication using the  <code>x-api-key</code>header.Create a key
                    in <code>/keys</code> and store it securely.
                  </p>
                  <Separator />
                  <div>
                    <h3 className="font-semibold">Base URL</h3>
                    <pre className="overflow-x-auto">
                      <code>{baseUrl + "/api  "}</code>
                    </pre>
                  </div>
                  <Separator />
                  {/* <div className="grid gap-4 md:grid-cols-2"> */}
                  <div className="flex flex-col gap-4 ">
                    <div>
                      <h3 className="font-semibold">GET /api/ping</h3>
                      <pre className="overflow-x-auto text-sm">
                        <code>{`curl -H 'x-api-key: <YOUR _KEY>' \\
                        ${baseUrl}/api/ping`}</code> 
                      </pre>
                      <pre className="overflow-x-auto text-sm">
                        <code>{`const r = await fetch('${baseUrl}/api/ping', \\
                        {headers: {'x-api-key': process.env.MY_KEY! } });`}</code>
                      </pre>
                    </div>

                    <Separator />
                    <div>
                      <h3 className="font-semibold">POST /api/echo</h3>
                      <pre className="overflow-x-auto text-sm">
                        <code>{`curl -X POST \\
                         -H 'x-api-key: <YOUR_KEY>'\\
                         -H 'content-type: application/json' \\
                         -d '{"Hello": "World!"}' \\
                          ${baseUrl}/api/echo`}</code>
                      </pre>
                      <pre className="overflow-x-auto text-sm">
                        <code>{`const r = await fetch('${baseUrl}/api/echo', 
                        {method: 'POST', 
                        headers: {'x-api-key': process.env.MY_KEY!, 'content-type': 'application/json' },
                        body: JSON.stringify({Hello: 'World!'}) });`}</code>
                      </pre>
                  </div>
                </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Tester</CardTitle> 
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input 
                  placeholder="Paste your API key (sk...)" value={key} onChange={(e) => setKey(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={runGET}>Test GET/api/ping</Button>
                    <Button onClick={runPOST} variant="secondary">Test POST/api/echo</Button>
                    <Button onClick={runImages} variant="secondary">Test GET /api/images</Button>
                  </div>
                  <Label className="text-sm font-medium">POST body (JSON)</Label>
                  <Textarea 
                  rows={5}
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  />
                    <Label className="text-sm font-medium">Response</Label>
                    <Textarea rows={10} readOnly value={out} 
                     />
                     {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {images.map((img, i) => (
                            <div key={i} className="border rounded-lg overflow-hidden shadow">
                              <img 
                                src={img.imageUrl} 
                                alt={img.imageName || `Image ${i}`} 
                                className="w-full h-48 object-cover" 
                              />
                              <div className="p-2 text-sm">
                                <p className="font-medium">{img.imageName || "Untitled"}</p>
                                <p className="text-xs text-gray-500">{img.fileName}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                </CardContent>
              </Card>
      </div>

    );
}

