"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

type Props = { value: string; ariaLabel?: string };

export default function CopyButton({
  value,
  ariaLabel = "Copy to Clipboard",
}: Props) {
  const [ok, setOk] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setOk(true);
    setTimeout(() => setOk(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      aria-label={ariaLabel}
      className="flex items-center gap-2"
    >
      {ok ? (
        <>
          <Check className="h-4 w-4" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </>
      )}
    </Button>
  );
}
