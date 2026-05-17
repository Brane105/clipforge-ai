"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="grid-glow absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100">
            <Zap size={14} />
            AI-powered creator packaging
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Generate Viral YouTube Titles & Thumbnail Ideas in Seconds
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            ClipForge AI helps creators craft click-worthy titles, bold thumbnail text,
            SEO descriptions, hashtags, and pinned comments for videos, Shorts, TikToks, and Reels.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/generator">
              Start generating
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="#examples" variant="secondary">
              <Play size={18} />
              See examples
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="rounded-lg border border-white/10 bg-zinc-950/80 p-3 shadow-[0_0_60px_rgba(168,85,247,0.16)]"
        >
          <div className="rounded-lg border border-fuchsia-300/20 bg-black p-3">
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-yellow-300" />
              <span className="size-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-zinc-500">generator-preview</span>
            </div>
            <div className="space-y-2">
              {[
                "This GTA Escape Looks Scripted",
                "Wait until the final turn.",
                "Open with the crash, rewind 3 seconds, then reveal the escape.",
                "SEO: GTA escape, viral gaming clip, high-stakes chase...",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.05] p-2.5 text-sm text-zinc-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
