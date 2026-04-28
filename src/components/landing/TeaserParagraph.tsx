"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type TeaserParagraphProps = {
  className?: string;
};

const TEASER_LINES = [
  { type: "narration" as const, text: "Alaska tidak pernah sengaja duduk di meja itu." },
  { type: "dialog" as const, character: "erine" as const, text: "Kamu dari kelas mana?" },
  { type: "narration" as const, text: "Suaranya lebih hangat dari yang Alaska bayangkan." },
];

export default function TeaserParagraph({ className }: TeaserParagraphProps) {
  return (
    <div className={cn("px-6 pt-4 pb-8", className)}>
      <p className="text-[10px] uppercase tracking-[0.25em] text-rose-accent/60 mb-4">
        Cuplikan cerita
      </p>

      <div className="flex flex-col gap-2">
        {TEASER_LINES.map((line, i) => {
          if (line.type === "narration") {
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.4, duration: 0.5 }}
                className="text-center italic text-text-secondary/70 text-sm leading-loose"
              >
                {line.text}
              </motion.p>
            );
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.4, duration: 0.5 }}
              className="flex justify-end items-start gap-2"
            >
              <div className="bg-alaska-bubble rounded-2xl rounded-br-md px-4 py-2.5 text-text-primary text-sm max-w-[75%]">
                {line.text}
              </div>
              <div className="shrink-0 w-8 h-8 rounded-full bg-alaska-avatar flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="text-text-secondary/50 text-xs text-center mt-4"
      >
        ...dan ceritanya baru Dimulai.
      </motion.p>
    </div>
  );
}