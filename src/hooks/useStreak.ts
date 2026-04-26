"use client"

import { useMemo } from "react"
import { getProgress, type UserProgresss } from "@/lib/progress"

type  StreakDay = {
    date: string;
    active: boolean;
}

function getDateString(dayAgo: number): string {
    const d = new Date();
    d.setDate(d.getDate() - dayAgo);
    return d.toISOString().split("T")[0];
}

function computeStreakData(progress: UserProgresss) {
  const { currentStreak, lastActiveDate, completedChapters } = progress;

  const last7Days: StreakDay[] = Array.from({ length: 7 }, (_, i) => {
    const date = getDateString(6 - i);
    return { date, active: false };
  });

  const completedSet = new Set(completedChapters);

  const today = getDateString(0);
  const isTodayActive = lastActiveDate === today;
  const streakDays = Math.min(currentStreak, 7);

  for (let i = 0; i < streakDays; i++) {
    const date = getDateString(i);
    const day = last7Days.find((d) => d.date === date);
    if (day) day.active = true;
  }

  return {
    currentStreak,
    isTodayActive,
    last7Days,
    totalCompleted: completedSet.size,
    lastActiveDate,
  };
}

export function useStreak(){
    const streak = useMemo(() => {
        const progress = getProgress();
        return computeStreakData(progress);
    }, []);

    return streak;
}