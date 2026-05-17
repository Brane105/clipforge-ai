"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/site";

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Features</p>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">A faster upload packaging loop</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06 }}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/20"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/25">
                <Icon size={19} />
              </div>
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{feature.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
