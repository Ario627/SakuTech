"use client";

import { arcs } from "@/data/arcs";
import { chapters } from "@/data/chapters";
import ArcCard from "@/components/learn/ArcCard";
import { useProgress } from "@/hooks/useProgress";
import  MobileShell  from "@/components/layout/MobileShell";
import  BottomNav  from "@/components/layout/BottomNav";

export default function LearnPage() {
  const { progress, isArcUnlocked } = useProgress();

  return (
    <MobileShell withNav>
      <div className="px-5 pt-10 pb-8">
        <h1 className="font-serif text-2xl text-text-primary">Cerita</h1>
        <p className="text-text-secondary text-sm mt-1">Pilih arc petualanganmu</p>
      </div>

      <div className="flex flex-col gap-4 px-5 pb-8">
        {arcs.map((arc, i) => {
          const arcChapters = chapters.filter((c) => c.arcId === arc.id);
          const completedCount = arcChapters.filter((c) =>
            progress.completedChapters.includes(c.id)
          ).length;
          const isLocked = !isArcUnlocked(i);

          return (
            <ArcCard
              key={arc.id}
              arc={arc}
              completedChapters={completedCount}
              isLocked={isLocked}
              index={i}
            />
          );
        })}
      </div>

      <BottomNav />
    </MobileShell>
  );
}