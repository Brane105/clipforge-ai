import { ArrowRight } from "lucide-react";
import { FAQ } from "@/components/faq";
import { FeatureCards } from "@/components/feature-cards";
import { GeneratorForm } from "@/components/generator-form";
import { Hero } from "@/components/hero";
import { ResultSection } from "@/components/result-section";
import { ButtonLink } from "@/components/ui/button";
import { generateClipForgeResults } from "@/lib/mock-results";
import { homeFaqs } from "@/lib/site";

const defaultResults = generateClipForgeResults({
  topic: "GTA police chase with last-second escape",
  niche: "GTA",
  tone: "Viral",
});

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Generator Preview</p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Preview the ClipForge generator flow</h2>
        </div>
        <GeneratorForm preview />
      </section>

      <FeatureCards />

      <section id="examples" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Example Output</p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">A complete upload package from one idea</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <ResultSection title="Sample Titles" description="Click-worthy GTA title angles." items={defaultResults.titles.slice(0, 5)} badges={["High CTR", "Gaming"]} highlightTriggers />
          <ResultSection title="Sample Thumbnail Text" description="Short words for mobile-first thumbnails." items={defaultResults.thumbnailTexts.slice(0, 6)} badges={["Short"]} compact />
          <ResultSection title="Sample SEO Descriptions" description="Creator-ready upload copy." items={defaultResults.descriptions} badges={["SEO"]} />
          <ResultSection title="Sample Hashtags" description="Gaming discovery tags." items={defaultResults.hashtags.slice(0, 12)} badges={["Gaming"]} compact />
        </div>
      </section>

      <FAQ items={homeFaqs} />

      <section className="border-y border-white/10 bg-fuchsia-500/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200">Ready</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Generate your next creator kit</h2>
            <p className="mt-2 max-w-2xl text-zinc-300">
              Start with one topic and leave with titles, thumbnail hooks, descriptions, hashtags, and pinned comments.
            </p>
          </div>
          <ButtonLink href="/generator">
            Open generator
            <ArrowRight size={18} />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
