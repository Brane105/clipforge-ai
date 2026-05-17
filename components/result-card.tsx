"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ResultCardProps = {
  title: string;
  items: string[];
  compact?: boolean;
  onCopy?: (label: string) => void;
};

export function ResultCard({ title, items, compact = false, onCopy }: ResultCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | "all" | null>(null);

  async function copyText(text: string, label: string, index: number | "all") {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    onCopy?.(label);
    window.setTimeout(() => setCopiedIndex(null), 1400);
  }

  return (
    <article className="rounded-lg border border-white/10 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <Button
          type="button"
          variant="secondary"
          className="min-h-9 px-3 text-xs"
          onClick={() => copyText(items.join("\n"), `${title} copied`, "all")}
        >
          {copiedIndex === "all" ? <Check size={15} /> : <Copy size={15} />}
          Copy all
        </Button>
      </div>
      <div className={compact ? "flex flex-wrap gap-2" : "grid gap-2"}>
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={
              compact
                ? "inline-flex items-center gap-2 rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-2 text-sm text-fuchsia-50"
                : "flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-zinc-200"
            }
          >
            <span>{item}</span>
            {!compact && (
              <button
                type="button"
                aria-label={`Copy ${item}`}
                className="mt-0.5 rounded-md p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                onClick={() => copyText(item, "Copied", index)}
              >
                {copiedIndex === index ? <Check size={15} /> : <Copy size={15} />}
              </button>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
