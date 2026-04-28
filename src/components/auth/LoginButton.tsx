"use client";

import { cn } from "@/lib/cn";

type LoginButtonProps = {
  provider: "google" | "github";
  onClick: () => void;
  className?: string;
};

const PROVIDER_CONFIG = {
  google: { label: "Masuk dengan Google", icon: "G" },
  github: { label: "Masuk dengan GitHub", icon: "⌘" },
} as const;

export default function LoginButton({ provider, onClick, className }: LoginButtonProps) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2.5",
        "active:scale-[0.97] transition-transform touch-manipulation min-h-12",
        provider === "google"
          ? "bg-rose-accent text-white"
          : "border border-warm-border bg-warm-surface text-text-primary",
        className
      )}
    >
      <span className="w-5 h-5 flex items-center justify-center text-base font-bold">
        {config.icon}
      </span>
      {config.label}
    </button>
  );
}