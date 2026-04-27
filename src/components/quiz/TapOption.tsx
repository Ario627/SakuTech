"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type TapOptionProps = {
  label: string;
  isUsed: boolean;
  onTap: () => void;
};

export default function TapOption({ label, isUsed, onTap }: TapOptionProps) {
  return (
    <motion.button
      layout
      onClick={onTap}
      disabled={isUsed}
      className={cn(
        "min-h-12 min-w-12 px-5 py-2.5",
        "rounded-full font-mono text-sm",
        "border border-warm-border",
        "transition-colors duration-150",
        "select-none touch-manipulation",
        isUsed
          ? "opacity-40 pointer-events-none bg-warm-surface text-text-secondary"
          : "bg-warm-surface text-text-body active:bg-rose-accent/10 hover:border-rose-accent/50"
      )}
      whileTap={!isUsed ? { scale: 0.94 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {label}
    </motion.button>
  );
}