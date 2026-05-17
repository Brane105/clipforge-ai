import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary:
    "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white shadow-[0_0_28px_rgba(217,70,239,0.35)] hover:shadow-[0_0_34px_rgba(34,211,238,0.28)] active:scale-[0.98]",
  secondary: "border border-white/15 bg-white/10 text-white hover:border-fuchsia-300/40 hover:bg-white/15 active:scale-[0.98]",
  ghost: "text-zinc-300 hover:bg-white/10 hover:text-white",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ className, variant = "primary", href, children, ...props }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition active:scale-[0.98]",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
