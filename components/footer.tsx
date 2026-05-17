import Link from "next/link";

const links = [
  ["YouTube Title Generator", "/youtube-title-generator"],
  ["Gaming Title Generator", "/gaming-title-generator"],
  ["GTA Title Generator", "/gta-title-generator"],
  ["Thumbnail Text Generator", "/thumbnail-text-generator"],
  ["Shorts Title Generator", "/shorts-title-generator"],
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-zinc-400 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="font-semibold text-white">ClipForge AI</p>
          <p className="mt-2 max-w-xl">
            AI-powered YouTube title and thumbnail idea generator for creators. Zero-cost MVP,
            mock generation, no database, no paid auth, and no billing.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:text-right">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
