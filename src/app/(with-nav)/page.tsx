import HeroSection from "@/components/landing/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SakuTech — Belajar Coding Lewat Cerita",
  description: "Platform pembelajaran coding berbasis cerita romance SMA untuk siswa Indonesia.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100dvh-72px)]">
      <HeroSection />
      <footer className="mt-auto pb-6 pt-10 text-center">
        <p className="text-text-secondary text-xs">
          Dibuat untuk siswa Indonesia
        </p>
      </footer>
    </div>
  );
}