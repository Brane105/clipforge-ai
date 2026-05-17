"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { splitTriggerWords, triggerWords } from "@/lib/highlight-words";

type ResultSectionProps = {
  title: string;
  description: string;
  items: string[];
  badges?: string[];
  compact?: boolean;
  highlightTriggers?: boolean;
  onCopy?: (message: string) => void;
};

export function ResultSection({
  title,
  description,
  items,
  badges = [],
  compact = false,
  highlightTriggers = false,
  onCopy,
}: ResultSectionProps) {
  const [copied, setCopied] = useState<number | "all" | null>(null);

  async function copyText(text: string, index: number | "all") {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    onCopy?.(index === "all" ? `${title} copied` : "Copied!");
    window.setTimeout(() => setCopied(null), 1300);
  }

  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950/85 p-4 shadow-xl shadow-black/25">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-zinc-400 sm:text-sm">{description}</p>
          {badges.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <span key={badge} className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-100">
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <Button type="button" variant="secondary" className="min-h-8 px-3 text-xs" onClick={() => copyText(items.join("\n"), "all")}>
          {copied === "all" ? <Check size={15} /> : <Copy size={15} />}
          {copied === "all" ? "Copied!" : "Copy all"}
        </Button>
      </div>

      <div className={compact ? "flex flex-wrap gap-1.5" : "grid gap-2"}>
        {items.map((item, index) =>
          compact ? (
            <button
              key={`${item}-${index}`}
              type="button"
              className="rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/10 px-2.5 py-1.5 text-left text-xs font-semibold text-fuchsia-50 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 sm:text-sm"
              onClick={() => copyText(item, index)}
            >
              {copied === index ? "Copied!" : item}
            </button>
          ) : (
            <div key={`${item}-${index}`} className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-fuchsia-400/10 text-[11px] font-bold text-fuchsia-200 ring-1 ring-fuchsia-300/20">
                {index + 1}
              </span>
              <p className="flex-1 text-sm leading-5 text-zinc-200">
                {highlightTriggers ? <HighlightedText text={item} /> : item}
              </p>
              <button
                type="button"
                aria-label={`Copy ${item}`}
                className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-400 transition hover:bg-white/10 hover:text-white"
                onClick={() => copyText(item, index)}
              >
                {copied === index ? "Copied!" : <Copy size={15} />}
              </button>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function HighlightedText({ text }: { text: string }) {
  return splitTriggerWords(text).map((part, index) =>
    triggerWords.includes(part.toLowerCase()) ? (
      <span key={`${part}-${index}`} className="rounded bg-fuchsia-400/15 px-1 font-bold text-cyan-100 ring-1 ring-cyan-300/20">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}
