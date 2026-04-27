"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import { CaretLeft } from "phosphor-react";

type ChapterHeaderProps = {
  chapterNumber: number;
  title: string;
  className?: string;
};

export default function ChapterHeader({ chapterNumber, title, className }: ChapterHeaderProps) {
  const router = useRouter();

  return (
    <header className={cn(
      "sticky top-0 z-40 bg-warm-bg border-b border-warm-border/60",
      "flex items-center h-12 px-3",
      className
    )}>
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 -ml-1 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Kembali"
      >
        <CaretLeft size={22} />
      </button>

      <div className="flex-1 text-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-rose-accent font-medium">
          Chapter {chapterNumber}
        </span>
      </div>

      <div className="w-10" />
    </header>
  );
}