"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type StatsSummaryProps = {
  xp: number;
  completedArcs: number;
  totalArcs: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08 },
  }),
};

export default function StatsSummary({ xp, completedArcs, totalArcs }: StatsSummaryProps) {
  const stats = [
    { value: xp, label: "Poin Pengalaman", accent: "text-amber-accent" },
    { value: completedArcs, label: "Arc Terselesaikan", accent: "text-success" },
  ] as const;

  return (
    <div className="flex gap-3 mt-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex-1 rounded-2xl border border-warm-border bg-warm-surface p-4 text-center"
        >
          <p className={cn("font-serif text-2xl font-bold", stat.accent)}>
            {stat.value}
          </p>
          <p className="text-text-secondary text-xs mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}