"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "sakutech-tutorial-seen";


const STEPS = [
  {
    title: "Selamat datang di SakuTech",
    description: "Di sini kamu belajar coding sambil mengikuti kisah Alaska dan Erine. Setiap chapter punya kuis kecil yang harus kamu selesaikan agar ceritanya bisa lanjut.",
    visual: "story",
  },
  {
    title: "Baca ceritanya dulu",
    description: "Setiap chapter dimulai dengan narasi dan dialog. Baca perlahan — tiap kalimat muncul satu per satu.",
    visual: "narration",
  },
  {
    title: "Susun kodenya",
    description: "Di tengah cerita, ada slot kosong yang harus kamu isi. Tekan opsi yang tersedia untuk mengisi slot dalam urutan yang benar.",
    visual: "quiz",
  },
  {
    title: "Kalau salah, coba lagi",
    description: "Tidak apa-apa kalau belum tepat. Slot akan dikosongkan lagi dan kamu bisa mencoba susunan yang berbeda.",
    visual: "wrong",
  },
  {
    title: "Selesaikan untuk lanjut",
    description: "Kalau susunannya sudah benar, cerita akan berlanjut. Setiap jawaban benar memberi kamu poin pengalaman.",
    visual: "success",
  },
];

type VisualType = "story" | "narration" | "quiz" | "wrong" | "success";

function TutorialVisual({type }: {type: VisualType}) {
    return (
    <div className="flex justify-center items-center py-4">
      {type === "story" && (
        <div className="flex flex-col items-center gap-3 w-full max-w-65">
          <div className="w-10 h-10 rounded-full bg-amber-accent flex items-center justify-center text-white font-bold text-sm">
            E
          </div>
          <div className="bg-erine-bubble rounded-2xl rounded-bl-md px-4 py-2.5 text-text-body text-sm italic">
            Kamu dari kelas mana?
          </div>
          <p className="text-center text-text-secondary text-xs italic">
            Narasi dan dialog muncul satu per satu...
          </p>
        </div>
      )}

      {type === "narration" && (
        <div className="text-center max-w-60">
          <div className="border-y border-warm-border/40 bg-warm-narration py-3 px-4 rounded-sm">
            <p className="text-text-body italic leading-relaxed text-sm">
              Alaska tidak pernah sengaja duduk di meja itu.
            </p>
          </div>
          <p className="text-text-secondary text-xs mt-2 italic">
            Teks miring = narasi
          </p>
        </div>
      )}

      {type === "quiz" && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <div className="min-h-12 min-w-20 px-4 py-2.5 rounded-xl bg-code-bg border border-warm-border/60 font-mono text-sm flex items-center justify-center text-text-body">
              &lt;h1&gt;
            </div>
            <div className="min-h-12 min-w-20 px-4 py-2.5 rounded-xl border-2 border-dashed border-rose-accent/70 font-mono text-sm flex items-center justify-center">
              <span className="text-rose-accent/40 tracking-widest">___</span>
            </div>
            <div className="min-h-12 min-w-20 px-4 py-2.5 rounded-xl bg-code-bg border border-warm-border/60 font-mono text-sm flex items-center justify-center text-text-body">
              &lt;/h1&gt;
            </div>
          </div>
          <div className="flex gap-2 mt-1">
            <div className="px-4 py-2 rounded-full border border-warm-border bg-warm-surface font-mono text-sm text-text-body">
              &lt;h1&gt;
            </div>
            <div className="px-4 py-2 rounded-full border border-warm-border bg-warm-surface font-mono text-sm text-text-body">
              &lt;/h1&gt;
            </div>
          </div>
          <p className="text-text-secondary text-xs mt-1">Tekan opsi → mengisi slot</p>
        </div>
      )}

      {type === "wrong" && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <div className="min-h-12 px-4 py-2.5 rounded-xl border-2 border-solid border-error bg-wrong-bg text-text-primary font-mono text-sm flex items-center justify-center">
              &lt;p&gt;
            </div>
            <div className="min-h-12 px-4 py-2.5 rounded-xl border-2 border-solid border-error bg-wrong-bg text-text-primary font-mono text-sm flex items-center justify-center">
              &lt;/h1&gt;
            </div>
          </div>
          <p className="text-error text-sm font-medium mt-1">Coba lagi</p>
        </div>
      )}

      {type === "success" && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <div className="min-h-12 px-4 py-2.5 rounded-xl border-2 border-solid border-success bg-correct-bg text-success font-mono text-sm flex items-center justify-center">
              &lt;h1&gt;
            </div>
            <div className="min-h-12 px-4 py-2.5 rounded-xl border-2 border-solid border-success bg-correct-bg text-success font-mono text-sm flex items-center justify-center">
              &lt;/h1&gt;
            </div>
          </div>
          <p className="text-success text-sm font-medium mt-1">Benar! Cerita berlanjut...</p>
        </div>
      )}
    </div>
  );
}

export function hasSeenTutorial(): Boolean {
    if(typeof window === "undefined") return true;
    return localStorage.getItem(STORAGE_KEY) === "true";
}

export function markTutorialSeen(): void {
    if(typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, "true");
}

export default function QuizTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  const handleClose = () => {
    markTutorialSeen();
    setIsOpen(false);
  };

  const handleNext = () => {
    if (isLast) {
      handleClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentStep((prev) => prev - 1);
  };

  const handleSkip = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-end justify-center bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleSkip();
          }}
        >
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="w-full max-w-107.5 bg-warm-surface rounded-t-3xl px-6 pt-6 pb-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg text-text-primary">
                {step.title}
              </h2>
              <button
                onClick={handleSkip}
                className="text-text-secondary text-xs underline underline-offset-2 hover:text-rose-accent transition-colors"
              >
                Lewati
              </button>
            </div>

            <TutorialVisual type={step.visual as VisualType} />

            <p className="text-center text-text-body text-sm leading-relaxed mt-3 mb-6 font-body">
              {step.description}
            </p>

            <div className="flex items-center justify-center gap-1.5 mb-5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    i === currentStep ? "bg-rose-accent" : "bg-warm-border"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              {!isFirst ? (
                <button
                  onClick={handlePrev}
                  className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                >
                  Kembali
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-rose-accent text-white font-semibold text-sm active:scale-[0.97] transition-transform"
              >
                {isLast ? "Mulai Baca" : "Lanjut"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}