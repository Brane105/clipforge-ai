import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex size-10 items-center justify-center rounded-lg border border-fuchsia-300/30 bg-zinc-950 shadow-[0_0_26px_rgba(217,70,239,0.28)]">
        <svg viewBox="0 0 48 48" aria-hidden="true" className="size-7">
          <defs>
            <linearGradient id="clipforge-logo-gradient" x1="8" x2="40" y1="8" y2="40">
              <stop stopColor="#22d3ee" />
              <stop offset="0.55" stopColor="#a855f7" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path
            d="M9 14.5C9 10.9 12.9 8.6 16.1 10.3l22 11.5c3.4 1.8 3.4 6.6 0 8.4l-22 11.5C12.9 43.4 9 41.1 9 37.5v-23Z"
            fill="url(#clipforge-logo-gradient)"
            opacity="0.95"
          />
          <path d="M25.8 9 17 25h7.2L20.8 39 32 20.8h-7.7L25.8 9Z" fill="#05030a" />
          <path d="M36.5 8.5 38 12l3.5 1.5L38 15l-1.5 3.5L35 15l-3.5-1.5L35 12l1.5-3.5Z" fill="#f0abfc" />
        </svg>
      </span>
      {showText ? <span className="font-black tracking-wide text-white">ClipForge AI</span> : null}
    </span>
  );
}
