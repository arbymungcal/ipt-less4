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

const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

export default function DocsPage() {
  const [key, setKey] = useState("");
  const [out, setOut] = useState("");
  
  async function runGET() {
    const res = await fetch(`${baseUrl}/api/ping`, {
      headers: {'x-api-key': out},
     });
     setOut(JSON.stringify( await res.json(), null, 2));
  }

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
                    <Button variant="secondary">Test POST/api/echo</Button>
                  </div>
                  <Label className="text-sm font-medium">POST body (JSON)</Label>
                  <Textarea 
                  rows={5}
                  // value={postBody}
                  // onChange={(e) => setPostBody(e.target.value)}
                  />
                    <Label className="text-sm font-medium">Response</Label>
                    <Textarea rows={10} readOnly value={out} 
                     />
                </CardContent>
              </Card>
      </div>

    );
}

