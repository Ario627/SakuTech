"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Arc } from "@/data/arcs";

type ArcCardProps = {
  arc: Arc;
  completedChapters: number;
  isLocked: boolean;
  index: number;
};

const DIFFICULTY_LABEL: Record<Arc["difficulty"], string> = {
  starter: "Starter",
  explorer: "Explorer",
  hacker: "Hacker",
};

export default function ArcCard({ arc, completedChapters, isLocked, index }: ArcCardProps) {
  const isComplete = completedChapters === arc.totalChapters;
  const hasStarted = completedChapters > 0;
  const arcNum = String(index + 1).padStart(2, "0");

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={cn(
        "relative w-full rounded-2xl border bg-warm-surface p-5 overflow-hidden",
        "transition-colors duration-150",
        isLocked
          ? "opacity-60 border-warm-border/60 cursor-not-allowed"
          : "border-warm-border hover:border-rose-accent/40 cursor-pointer active:scale-[0.98]"
      )}
    >
      <span className="absolute top-2 right-3 font-black text-6xl leading-none text-rose-accent/8 select-none pointer-events-none">
        {arcNum}
      </span>

      <div className="relative z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-rose-accent font-medium">
          {DIFFICULTY_LABEL[arc.difficulty]}
        </span>

        <h2 className="font-serif text-lg text-text-primary leading-snug mt-1.5">
          {arc.title}
        </h2>

        <p className="text-text-secondary text-sm leading-relaxed mt-2 italic">
          {arc.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className={cn(
            "text-xs",
            isComplete ? "text-success font-medium" : "text-text-secondary"
          )}>
            {isComplete
              ? "✓ Selesai"
              : hasStarted
              ? `Chapter ${completedChapters} dari ${arc.totalChapters}`
              : `Chapter 0 dari ${arc.totalChapters}`}
          </p>

          {arc.targetSkill && !isLocked && (
            <span className="text-[10px] text-teal-accent bg-teal-accent/10 px-2 py-0.5 rounded-full">
              {arc.targetSkill}
            </span>
          )}
        </div>

        {isLocked && (
          <p className="text-text-secondary text-xs mt-3">
            Selesaikan arc sebelumnya
          </p>
        )}

        {!isLocked && !isComplete && hasStarted && (
          <div className="mt-3">
            <span className="text-rose-accent text-sm font-medium">
              Lanjutkan &#9654;
            </span>
          </div>
        )}

        {!isLocked && !hasStarted && (
          <div className="mt-3">
            <span className="text-rose-accent text-sm font-medium">
              Mulai
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (isLocked) return content;

  return <Link href={`/learn/${arc.id}/arc1-ch1`}>{content}</Link>;
}