"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, WandSparkles, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/generator", label: "Generator" },
  { href: "/youtube-title-generator", label: "YouTube Titles" },
  { href: "/thumbnail-text-generator", label: "Thumbnail Text" },
  { href: "/gaming-title-generator", label: "Gaming" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setIsOpen(false)} aria-label="ClipForge AI home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold text-zinc-300 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={isActive(pathname, item.href)} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/generator" className="hidden sm:inline-flex">
            <WandSparkles size={17} />
            Generate
          </ButtonLink>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav className="border-t border-white/10 bg-black/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white",
                  isActive(pathname, item.href) && "bg-fuchsia-400/10 text-fuchsia-100 ring-1 ring-fuchsia-300/20",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-white",
        active && "bg-white/[0.03] text-transparent",
      )}
    >
      <span className={active ? "bg-gradient-to-r from-fuchsia-300 to-cyan-200 bg-clip-text" : ""}>{label}</span>
      {active ? <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300 shadow-[0_0_18px_rgba(217,70,239,0.7)]" /> : null}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href;
}
