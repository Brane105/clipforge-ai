import type { Metadata } from "next";
import { GeneratorForm } from "@/components/generator-form";

export const metadata: Metadata = {
  title: "Generator",
  description:
    "Generate YouTube titles, thumbnail hooks, SEO descriptions, hashtags, and pinned comments for gaming videos and short-form clips.",
  openGraph: {
    title: "ClipForge AI Generator",
    description:
      "Create creator packaging for YouTube, Shorts, TikTok, and Reels with ClipForge AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipForge AI Generator",
    description: "Generate titles, thumbnail hooks, descriptions, hashtags, and pinned comments.",
  },
};

export default function GeneratorPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Main Tool</p>
        <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Creator Packaging Generator</h1>
        <p className="mt-3 text-base leading-7 text-zinc-300">
          Enter your video idea and get high-CTR titles, thumbnail hooks, descriptions,
          hashtags, and pinned comments instantly.
        </p>
      </div>
      <GeneratorForm />
    </main>
  );
}
