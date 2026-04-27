"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type XpFloatProps = {
  amount: number;
  className?: string;
};

export default function XpFloat({ amount, className }: XpFloatProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "text-amber-accent font-bold text-sm font-serif select-none pointer-events-none",
        className
      )}
    >
      +{amount} XP
    </motion.div>
  );
}