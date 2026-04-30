"use client";

import { useProgress } from "@/hooks/useProgress";
import { useStreak } from "@/hooks/useStreak";
import { useAuth } from "@/components/auth/AuthProvider";
import { arcs } from "@/data/arcs";
import { chapters } from "@/data/chapters";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsSummary from "@/components/profile/StatsSummary";
import StreakDots from "@/components/profile/StreakDots";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";

export default function ProfilePage() {
  const { progress } = useProgress();
  const streakData = useStreak();
  const { isLoggedIn } = useAuth();

  const completedArcs = arcs.filter((arc) => {
    const arcChapters = chapters.filter((c) => c.arcId === arc.id);
    return arcChapters.every((c) => progress.completedChapters.includes(c.id));
  }).length;

  return (
    <MobileShell withNav>
      <div className="px-5 pt-10 pb-8">
        <h1 className="font-heading text-2xl text-text-primary">Profil</h1>
        <p className="text-text-secondary text-sm mt-1">Progress dan statistikmu</p>
      </div>

      <div className="px-5 pb-8 flex flex-col gap-4">
        <ProfileHeader />

        <StatsSummary
          xp={progress.xp}
          completedArcs={completedArcs}
          totalArcs={arcs.length}
        />

        {isLoggedIn && (
          <StreakDots
            days={streakData.last7Days}
            currentStreak={streakData.currentStreaks}
            isTodayActive={streakData.isTodayActive}
          />
        )}

        {progress.completedChapters.length > 0 && (
          <div className="rounded-2xl border border-warm-border bg-warm-surface p-4 mt-1">
            <p className="text-text-primary text-sm font-medium mb-3">
              Chapter Selesai
            </p>
            <div className="flex flex-col gap-2">
              {progress.completedChapters.map((chId) => {
                const ch = chapters.find((c) => c.id === chId);
                if (!ch) return null;
                return (
                  <div key={chId} className="flex items-center justify-between text-sm">
                    <span className="text-text-body truncate">{ch.title}</span>
                    <span className="text-success text-xs shrink-0 ml-2">&#10003;</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileShell>
  );
}