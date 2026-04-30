"use client";

import { useProgress } from "@/hooks/useProgress";
import { useStreak } from "@/hooks/useStreak";
import { arcs } from "@/data/arcs";
import { chapters } from "@/data/chapters";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";
import StreakDots from "@/components/profile/StreakDots";
import { cn } from "@/lib/cn";

export default function ProgressPage() {
  const { progress } = useProgress();
  const streakData = useStreak();

  const totalChapters = chapters.length;
  const completedCount = progress.completedChapters.length;
  const percent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  return (
    <MobileShell withNav>
      <div className="px-5 pt-10 pb-8">
        <h1 className="font-heading text-2xl text-text-primary">Progress</h1>
        <p className="text-text-secondary text-sm mt-1">Sejauh mana perjalananmu</p>
      </div>

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div className="rounded-2xl border border-warm-border bg-warm-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-text-primary text-sm font-medium">Keseluruhan</p>
            <p className="font-heading text-2xl text-rose-accent font-bold">{percent}%</p>
          </div>

          <div className="w-full h-3 rounded-full bg-warm-border/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-rose-accent transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-text-secondary text-xs mt-2">
            {completedCount} dari {totalChapters} chapter selesai
          </p>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-warm-border/40">
            <p className="text-amber-accent font-heading font-bold text-lg">{progress.xp}</p>
            <p className="text-text-secondary text-xs">Poin Pengalaman</p>
          </div>
        </div>

        <StreakDots
          days={streakData.last7Days}
          currentStreak={streakData.currentStreaks}
          isTodayActive={streakData.isTodayActive}
        />

        <div className="rounded-2xl border border-warm-border bg-warm-surface p-5">
          <p className="text-text-primary text-sm font-medium mb-4">Per Arc</p>

          <div className="flex flex-col gap-3">
            {arcs.map((arc) => {
              const arcChapters = chapters.filter((c) => c.arcId === arc.id);
              const done = arcChapters.filter((c) =>
                progress.completedChapters.includes(c.id)
              ).length;
              const total = arcChapters.length;
              const arcPercent = total > 0 ? Math.round((done / total) * 100) : 0;

              return (
                <div key={arc.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-text-body text-sm">{arc.title}</p>
                    <p className="text-text-secondary text-xs">{done}/{total}</p>
                  </div>
                  <div className="w-full h-2 rounded-full bg-warm-border/40 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        arcPercent === 100 ? "bg-success" : "bg-teal-accent"
                      )}
                      style={{ width: `${arcPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileShell>
  );
}