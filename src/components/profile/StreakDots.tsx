"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type StreakDay = { date: string; active: boolean };

type StreakDotsProps = {
  days: StreakDay[];
  currentStreak: number;
  isTodayActive: boolean;
};

const DAY_LABELS = ["S", "S", "R", "K", "J", "S", "M"];

export default function StreakDots({ days, currentStreak, isTodayActive }: StreakDotsProps) {
  return (
    <div className="rounded-2xl border border-warm-border bg-warm-surface p-4 mt-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-text-primary text-sm font-medium">Streak Belajar</p>
        <p className="text-amber-accent font-serif font-bold text-lg">
          {currentStreak}
        </p>
      </div>

      <div className="flex items-center justify-between gap-1">
        {days.map((day, i) => (
          <motion.div
            key={day.date}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors",
                day.active
                  ? "bg-amber-accent text-white"
                  : "bg-warm-border/40 text-text-secondary"
              )}
            >
              {day.active ? "✓" : "·"}
            </div>
            <span className="text-[9px] text-text-secondary">
              {DAY_LABELS[i]}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="text-text-secondary text-[10px] mt-3 text-center">
        {isTodayActive ? "Hari ini sudah belajar!" : "Belum belajar hari ini — ayo mulai!"}
      </p>
    </div>
  );
}