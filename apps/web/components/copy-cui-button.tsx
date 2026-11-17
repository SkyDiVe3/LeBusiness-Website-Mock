"use client";

import { useState } from "react";

export function CopyCuiButton({ cui }: Readonly<{ cui: string }>) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(cui);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="copy-cui-wrap">
      <button
        type="button"
        className="button button-outline mono"
        onClick={() => void handleCopy()}
      >
        {copied ? `Copiat CUI ${cui}` : `Copiaza CUI ${cui}`}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? `Codul CUI ${cui} a fost copiat.` : ""}
      </span>
    </div>
  );
}
