import Link from "next/link";
import { Button } from "~/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import CopyButton from "~/components/copy-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Badge } from "~/components/ui/badge";
import { Separator } from "@radix-ui/react-separator";



export default function KeysPage() {
  const sampleApiKey = "adadadadadada";

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">API Keys</h1>
        <div className="flex gap-2">
          <Link href={"/docs"}>
            <Button
              variant={"outline"}
              className="flex items-center gap-2"
              aria-label="Open API Guide"
            >
              <BookOpen />
              View API Documentation
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Generate API Key</CardTitle>
          <Button className="flex items-center gap-2" aria-label="Create API key">
            <Plus />
            Create
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Key Name (e.g., Production)"
              aria-label="API Key Name"
            />
          </div>

          {/* Not Visible if no API keys exist */}
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">
              Here is your API Key (visible once):{" "}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="text-sm break-all">{sampleApiKey}</code>
              <CopyButton value={sampleApiKey} />
            </div>
            <p className="text-muted-foreground mt-2 text-xs">
              Save this key securely. You won't be able to see it again.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
  <CardHeader>
    <CardTitle>Your Keys</CardTitle>
  </CardHeader>
  <CardContent>
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Key</TableHead>
      <TableHead>Created</TableHead>
      <TableHead>Status</TableHead>
      
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
     <TableRow>
      <TableCell>Name of Key</TableCell>
      <TableCell className="font-mono">{sampleApiKey}</TableCell>
      <TableCell>8/21/2025</TableCell>
      <TableCell>

        <Badge variant={"secondary"}>Revoked</Badge>
        </TableCell>
      <TableCell className="text-right">
        <Button variant={"destructive"} size={"sm"}>
          Revoke
        </Button>
      </TableCell>
    </TableRow> 
    <TableRow>
      <TableCell colSpan={5}
       className="text-muted-foreground text-center text-sm"
      >
        No API Keys Yet
      </TableCell>
    </TableRow> 
  </TableBody>
</Table>
  </CardContent>
  
</Card> 

<Separator /> 
<p>Tip: Call secured endpoints with the <code>x-api-key</code> header. See{" "}
<Link className={"underline"} href ={"/docs"}>
Docs
</Link>
</p>
    </div>
  );
}