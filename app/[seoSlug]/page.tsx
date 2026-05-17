import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { FAQ } from "@/components/faq";
import { ButtonLink } from "@/components/ui/button";
import { seoPages, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ seoSlug: string }>;
};

export function generateStaticParams() {
  return seoPages.map((page) => ({ seoSlug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoSlug } = await params;
  const page = seoPages.find((item) => item.slug === seoSlug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      url: `${siteConfig.url}/${page.slug}`,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
    },
  };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { seoSlug } = await params;
  const page = seoPages.find((item) => item.slug === seoSlug);

  if (!page) {
    notFound();
  }

  const header = getSeoHeader(page.slug);
  const related = seoPages.filter((item) => item.slug !== page.slug).slice(0, 4);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
        <div className="grid-glow absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="inline-flex rounded-lg border border-fuchsia-300/25 bg-fuchsia-300/10 px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-100">
            {header.badge}
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-6xl">{header.h1 || page.headline}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{page.kicker}</p>
          <div className="mt-8">
            <ButtonLink href="/generator">
              {header.cta}
              <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Why It Helps</p>
          <h2 className="mt-3 text-3xl font-bold text-white">More angles before you publish</h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-zinc-300">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {["Titles", "Thumbnail Text", "Descriptions"].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-lg font-semibold text-white">{item}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Generate focused options that match the topic, trend context, niche, and tone you choose.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Related Tools</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ButtonLink key={item.slug} href={`/${item.slug}`} variant="secondary" className="justify-start text-left">
              {item.title}
            </ButtonLink>
          ))}
        </div>
      </section>

      <FAQ items={page.faqs} />

      <section className="border-y border-white/10 bg-cyan-400/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Create Now</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Turn your topic into publish-ready ideas</h2>
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

function getSeoHeader(slug: string) {
  const map: Record<string, { badge: string; h1?: string; cta: string }> = {
    "youtube-title-generator": {
      badge: "YouTube Tool",
      h1: "Free YouTube Title Generator",
      cta: "Generate YouTube Titles",
    },
    "thumbnail-text-generator": {
      badge: "Thumbnail Tool",
      h1: "Free Thumbnail Text Generator",
      cta: "Generate Thumbnail Text",
    },
    "gaming-title-generator": {
      badge: "Gaming Tool",
      h1: "Free Gaming Title Generator",
      cta: "Generate Gaming Titles",
    },
    "gta-title-generator": {
      badge: "GTA Tool",
      h1: "Free GTA Title Generator",
      cta: "Generate GTA Titles",
    },
    "shorts-title-generator": {
      badge: "Shorts Tool",
      h1: "Free Shorts Title Generator",
      cta: "Generate Shorts Titles",
    },
  };

  return map[slug] || { badge: "Creator Tool", cta: "Open Generator" };
}
