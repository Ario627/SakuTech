"use client"

import { useState, useCallback, useEffect } from "react"
import {
    getProgress,
    completeChapter,
    addXp,
    updateStreak,
    isChapterCompleted,
    getArcProgress,
    type UserProgresss
} from "@/lib/progress";
import { chapters } from "@/data/chapters";

export function useProgress(){
    const [progress, setProgress] = useState<UserProgresss>(getProgress);

    useEffect(() => {
        const updateId = updateStreak();
        setProgress(updateId);
    }, []);

    const markChapterComplete = useCallback(
      (chapterId: string, xpReward = 15) => {
        const updated = completeChapter(chapterId, xpReward);
        setProgress(updated);
      },
      [],
    );

    const earnXp = useCallback((amount: number) => {
      const updated = addXp(amount);
      setProgress(updated);
    }, []);

    const checkChapter = useCallback((chapterId: string) => {
      return isChapterCompleted(chapterId);
    }, []);

    const getArcCompletedCount = useCallback(
      (arcId: string, totalChapters: number) => {
        return getArcProgress(arcId, totalChapters);
      },
      [],
    );

    const refresh = useCallback(() => {
      setProgress(getProgress());
    }, []);

    const isArcUnlocked = useCallback(
      (arcIndex: number) => {
        if (arcIndex === 0) return true;
        const prevArcId = `arc-${String(arcIndex).padStart(2, "0")}`;
        const prevArcChapters = chapters.filter((c) => c.arcId === prevArcId);
        return prevArcChapters.every((c) =>
          progress.completedChapters.includes(c.id),
        );
      },
      [progress.completedChapters],
    );

    return {
      progress,
      markChapterComplete,
      earnXp,
      checkChapter,
      getArcCompletedCount,
      refresh,
      isArcUnlocked,
    };
}