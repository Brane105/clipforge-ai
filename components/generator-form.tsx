"use client";

import { Flame, Gamepad2, Loader2, Sparkles, WandSparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { ResultSection } from "@/components/result-section";
import { Button } from "@/components/ui/button";
import { getToneBadges } from "@/lib/mock-results";
import { GenerationResponse, Niche, Platform, Tone, niches, platforms, tones } from "@/types/generation";

type DisplayResults = GenerationResponse;
type TrendVideo = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount?: string;
};

const trendCategories = ["Gaming", "General", "Music", "Entertainment"];

export function GeneratorForm({ preview = false }: { preview?: boolean }) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("YouTube");
  const [niche, setNiche] = useState<Niche>("GTA");
  const [tone, setTone] = useState<Tone>("Viral");
  const [isLoading, setIsLoading] = useState(false);
  const [isTrendsLoading, setIsTrendsLoading] = useState(false);
  const [trendCategory, setTrendCategory] = useState("Gaming");
  const [trends, setTrends] = useState<TrendVideo[]>([]);
  const [toast, setToast] = useState("");
  const [results, setResults] = useState<DisplayResults | null>(null);

  useEffect(() => {
    void loadTrends(trendCategory);
  }, [trendCategory]);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, platform, niche, tone }),
      });
      const data = (await response.json()) as GenerationResponse | { error?: string };

      if (!response.ok || !isGenerationResponse(data)) {
        showToast("Generated using backup mode.");
        return;
      }

      setResults(data);
      if (data.fallbackUsed && data.providerUsed === "Backup") {
        showToast("Generated using backup mode.");
      }
    } catch {
      showToast("Generated using backup mode.");
    } finally {
      setIsLoading(false);
    }
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1400);
  }

  async function loadTrends(category: string) {
    setIsTrendsLoading(true);

    try {
      const response = await fetch(`/api/trends?category=${encodeURIComponent(category)}`);
      const data = (await response.json()) as { videos?: TrendVideo[] };
      setTrends(data.videos || []);
    } catch {
      setTrends([]);
    } finally {
      setIsTrendsLoading(false);
    }
  }

  function useTrend(trend: TrendVideo) {
    setTopic(trend.title);
    setPlatform("YouTube");

    if (trendCategory === "Gaming") {
      setNiche("Gaming");
    }

    showToast("Trend selected");
  }

  return (
    <div className="relative">
      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-fuchsia-300/30 bg-zinc-950 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(217,70,239,0.28)]">
          {toast}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-lg bg-gradient-to-br from-fuchsia-500/40 via-white/10 to-cyan-400/40 p-px shadow-[0_0_70px_rgba(168,85,247,0.16)]">
          <form onSubmit={submitForm} className="rounded-lg bg-zinc-950/95 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  <WandSparkles size={14} />
                  Generator
                </p>
                <h2 className="mt-1.5 text-xl font-black text-white sm:text-2xl">Forge your upload package</h2>
              </div>
              <span className="rounded-md border border-fuchsia-300/25 bg-fuchsia-300/10 px-2.5 py-1 text-xs font-bold text-fuchsia-100">
                AI Router
              </span>
            </div>

            <div>
              <label htmlFor="topic" className="text-sm font-bold text-white">
                Video idea
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Example: GTA police chase with last-second escape"
                className="mt-2 min-h-28 w-full resize-none rounded-lg border border-white/10 bg-black/60 px-3.5 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-400/20"
              />
              <p className="mt-2 text-xs leading-5 text-zinc-400">
                Describe the core moment, challenge, or payoff. Specific stakes create better titles and thumbnail hooks.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Select label="Platform" value={platform} options={platforms} onChange={(value) => setPlatform(value as Platform)} />
              <Select label="Niche" value={niche} options={niches} onChange={(value) => setNiche(value as Niche)} />
              <Select label="Tone" value={tone} options={tones} onChange={(value) => setTone(value as Tone)} />
            </div>

            <Button type="submit" disabled={isLoading} className="mt-5 w-full">
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {isLoading ? "Forging ideas..." : "Generate creator kit"}
            </Button>

            <div className="mt-4 grid gap-2 text-xs text-zinc-400 sm:grid-cols-3">
              {["Server-side keys", "Auto fallback", "Zero database"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                  {item}
                </div>
              ))}
            </div>
          </form>

          <TrendsPicker
            category={trendCategory}
            categories={trendCategories}
            trends={trends}
            isLoading={isTrendsLoading}
            onCategoryChange={setTrendCategory}
            onUseTrend={useTrend}
          />
        </div>

        <div className="min-h-[30rem] rounded-lg border border-white/10 bg-black/45 p-3 sm:p-4">
          {isLoading ? (
            <LoadingState />
          ) : results ? (
            <Results results={results} tone={tone} onCopy={showToast} />
          ) : (
            <EmptyState preview={preview} />
          )}
        </div>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-sm font-bold text-white">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Results({ results, tone, onCopy }: { results: DisplayResults; tone: Tone; onCopy: (message: string) => void }) {
  const badges = getToneBadges(tone);

  return (
    <div className="grid gap-3">
      <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-300">
        Generated with {results.providerUsed} · {results.modelUsed}
        {results.fallbackUsed ? <span className="ml-2 text-fuchsia-200">Fallback used</span> : null}
      </div>
      <ResultSection
        title="Viral Titles"
        description="High-CTR title angles with trigger words and gaming stakes."
        items={results.titles}
        badges={badges}
        highlightTriggers
        onCopy={onCopy}
      />
      <ResultSection
        title="Thumbnail Text Ideas"
        description="Short, bold words designed to read fast on mobile thumbnails."
        items={results.thumbnailTexts}
        badges={["Short", "High CTR", "Gaming"]}
        compact
        onCopy={onCopy}
      />
      <ResultSection
        title="SEO Descriptions"
        description="Upload descriptions with keywords, payoff, and creator-friendly phrasing."
        items={results.descriptions}
        badges={["SEO", "Creator"]}
        onCopy={onCopy}
      />
      <ResultSection
        title="Hashtags"
        description="Platform and niche hashtags for Shorts, TikTok, Reels, and YouTube discovery."
        items={results.hashtags}
        badges={["SEO", "Gaming"]}
        compact
        onCopy={onCopy}
      />
      <ResultSection
        title="Pinned Comments"
        description="Comments built to increase replies, ratings, and creator engagement."
        items={results.pinnedComments}
        badges={["Engagement", "Emotional"]}
        onCopy={onCopy}
      />
    </div>
  );
}

function TrendsPicker({
  category,
  categories,
  trends,
  isLoading,
  onCategoryChange,
  onUseTrend,
}: {
  category: string;
  categories: string[];
  trends: TrendVideo[];
  isLoading: boolean;
  onCategoryChange: (category: string) => void;
  onUseTrend: (trend: TrendVideo) => void;
}) {
  return (
    <section className="rounded-b-lg border-x border-b border-white/10 bg-black/35 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            <Flame size={14} />
            Latest trends
          </p>
          <p className="mt-1 text-xs text-zinc-500">Choose a YouTube trend as your video idea.</p>
        </div>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="rounded-lg border border-white/10 bg-black/60 px-2.5 py-2 text-xs font-semibold text-white outline-none transition focus:border-cyan-300/60"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="mt-3 grid gap-2">
        {isLoading ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-xs text-zinc-400">Loading latest YouTube trends...</div>
        ) : trends.length ? (
          trends.slice(0, 5).map((trend) => (
            <button
              key={trend.id}
              type="button"
              className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-2 text-left transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
              onClick={() => onUseTrend(trend)}
            >
              {trend.thumbnailUrl ? (
                <img src={trend.thumbnailUrl} alt="" className="h-12 w-20 rounded-md object-cover" />
              ) : (
                <span className="flex h-12 w-20 items-center justify-center rounded-md bg-fuchsia-400/10 text-fuchsia-200">
                  <Gamepad2 size={18} />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 text-xs font-semibold leading-5 text-zinc-100 group-hover:text-white">{trend.title}</span>
                <span className="mt-0.5 block truncate text-[11px] text-zinc-500">{trend.channelTitle}</span>
              </span>
            </button>
          ))
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-xs text-zinc-400">
            No trends loaded. Backup samples appear if YouTube is unavailable.
          </div>
        )}
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div className="flex h-full min-h-[28rem] flex-col items-center justify-center text-center">
      <Loader2 className="mb-4 animate-spin text-fuchsia-300" size={36} />
      <p className="font-bold text-white">Forging your creator kit</p>
      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
        Building titles, thumbnail text, descriptions, hashtags, and pinned comments with gaming creator patterns.
      </p>
    </div>
  );
}

function EmptyState({ preview }: { preview: boolean }) {
  return (
    <div className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-6 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-400/20 to-cyan-300/20 text-cyan-100 ring-1 ring-cyan-300/25">
        {preview ? <Flame size={26} /> : <Gamepad2 size={26} />}
      </div>
      <p className="text-lg font-black text-white">{preview ? "Preview the generator flow" : "Your creator kit will appear here"}</p>
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
        Add a video idea to generate organized sections for titles, thumbnail text, SEO descriptions, hashtags, and pinned comments.
      </p>
    </div>
  );
}

function isGenerationResponse(value: GenerationResponse | { error?: string }): value is GenerationResponse {
  return (
    "titles" in value &&
    "thumbnailTexts" in value &&
    "descriptions" in value &&
    "hashtags" in value &&
    "pinnedComments" in value &&
    "providerUsed" in value &&
    "modelUsed" in value
  );
}
