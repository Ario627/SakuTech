"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type NarrationBlockProps = {
  text: string;
  index: number;
  className?: string;
};

export default function NarrationBlock({ text, index, className }: NarrationBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "flex justify-center px-(--spacing-reader-x) py-2",
        className
      )}
    >
      <p className="text-center italic text-text-body leading-loose max-w-70 border-y border-warm-border/40 py-3 px-4 bg-warm-narration rounded-sm">
        {text}
      </p>
    </motion.div>
  );
}