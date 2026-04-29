"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const PREVIEW_LINES = [
  { type: "narration", text: "Alaska tidak pernah sengaja duduk di meja itu." },
  { type: "narration", text: "Meja paling pojok, dekat jendela yang kacanya sedikit retak." },
  { type: "narration", text: "Tapi hari itu, semua meja lain sudah penuh." },
  { type: "dialog", character: "erine", text: "Kamu dari kelas mana?" },
];

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center px-6 pt-14 pb-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="flex flex-col items-center w-full"
      >
        <motion.p
          variants={fadeUp}
          className="text-[10px] uppercase tracking-[0.25em] text-rose-accent font-semibold mb-6"
        >
          SakuTech
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-heading text-[1.75rem] leading-[1.3] text-text-primary text-center max-w-75"
        >
          Cerita yang berhenti di tengah — sampai kamu bantu Alaska menyelesaikannya.
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="mt-8 w-full max-w-[320px] rounded-2xl border border-warm-border bg-warm-surface overflow-hidden"
        >
          <div className="px-5 pt-4 pb-1">
            <p className="text-[10px] uppercase tracking-[0.15em] text-rose-accent font-semibold">
              Arc 1 &middot; Chapter 1
            </p>
          </div>

          <div className="px-5 py-4 flex flex-col gap-2.5">
            {PREVIEW_LINES.map((line, i) => {
              if (line.type === "narration") {
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
                    className="font-body text-[0.9375rem] text-text-body italic leading-[1.7] text-center"
                  >
                    {line.text}
                  </motion.p>
                );
              }

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.25, duration: 0.4, type: "spring" as const, stiffness: 260 }}
                  className="flex justify-end items-start gap-2"
                >
                  <div className="bg-alaska-bubble rounded-2xl rounded-br-md px-4 py-2.5 text-text-primary text-[0.9375rem] font-body max-w-[78%]">
                    {line.text}
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-alaska-avatar flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="px-5 pb-4 pt-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex items-center justify-end gap-1"
            >
              <span className="text-text-secondary text-xs">Baca lanjutannya</span>
              <span className="text-rose-accent text-xs">&rarr;</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 w-full max-w-70">
          <Link
            href="/learn"
            className="flex items-center justify-center w-full py-3.5 rounded-xl bg-rose-accent text-white font-semibold text-[0.9375rem] font-ui active:scale-[0.97] transition-transform"
          >
            Mulai Baca
          </Link>
          <p className="text-center text-text-secondary text-xs mt-2 font-ui">
            Gratis. Tanpa perlu daftar.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}