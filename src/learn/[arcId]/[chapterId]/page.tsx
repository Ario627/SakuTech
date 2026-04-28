"use client";

import {use} from "react";
import { useRouter } from "next/navigation";
import StoryReader from "@/components/story/StoryReader";
import { chapters } from "@/data/chapters";
import { arcs } from "@/data/arcs";
import { useProgress } from "@/hooks/useProgress";

export default function ChapterPage({
  params,
}: {
  params: Promise<{ arcId: string; chapterId: string }>;
}) {
  const { arcId, chapterId } = use(params);
  const router = useRouter();
  const { progress, markChapterComplete, isArcUnlocked } = useProgress();

  const chapter = chapters.find((c) => c.id === chapterId);
  const arc = arcs.find((a) => a.id === arcId);

  if (!chapter || !arc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh bg-warm-bg px-6 text-center">
        <p className="font-serif text-lg text-text-primary">Chapter tidak ditemukan</p>
        <button
          onClick={() => router.push("/learn")}
          className="mt-4 text-rose-accent text-sm underline underline-offset-2"
        >
          Kembali ke daftar cerita
        </button>
      </div>
    );
  }

  const arcChapters = chapters.filter((c) => c.arcId === arcId);
  const currentIdx = arcChapters.findIndex((c) => c.id === chapterId);
  const isLastChapter = currentIdx === arcChapters.length - 1;
  const isCompleted = progress.completedChapters.includes(chapterId);

  const handleNextChapter = () => {
    if (!isCompleted) {
      markChapterComplete(chapterId);
    }

    if (isLastChapter) {
      router.push("/learn");
      return;
    }

    const nextChapter = arcChapters[currentIdx + 1];
    router.push(`/learn/${arcId}/${nextChapter.id}`);
  };

  return (
    <StoryReader
      chapter={chapter}
      onNextChapter={handleNextChapter}
    />
  );
}