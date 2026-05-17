import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ClipForge AI - YouTube Title & Thumbnail Idea Generator",
    template: "%s | ClipForge AI",
  },
  description:
    "AI-powered YouTube title and thumbnail idea generator for creators. Generate titles, thumbnail text, SEO descriptions, hashtags, and pinned comments.",
  keywords: [
    "YouTube title generator",
    "thumbnail text generator",
    "TikTok title generator",
    "viral shorts ideas",
    "gaming title generator",
    "YouTube hashtag generator",
    "pinned comment generator",
    "creator tools",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ClipForge AI",
    description:
      "AI-powered YouTube title and thumbnail idea generator for creators.",
    url: siteConfig.url,
    siteName: "ClipForge AI",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ClipForge AI" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipForge AI",
    description:
      "Generate YouTube titles, thumbnail ideas, SEO descriptions, hashtags, and pinned comments.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: siteConfig.name,
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              url: siteConfig.url,
              description:
                "AI-powered YouTube title and thumbnail idea generator for creators. Generate titles, thumbnail text, SEO descriptions, hashtags, and pinned comments.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
