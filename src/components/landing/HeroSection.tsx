"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { BookOpen, Code, Sparkle } from "phosphor-react";

const HOOKS = [
    {
        icon: BookOpen,
        label: "Cerita yang bikin penasaran",
        sub: "Tiap chapter ngasih kamu alasan buat lanjut baca.",
    },
    {
        icon: Code,
        label: "Coding yang muncul natural",
        sub: "HTML, CSS, JS — muncul di tengah cerita, bukan di whiteboard.",
    },
    {
        icon: Sparkle,
        label: "Belajar tanpa sadar",
        sub: "Kamu cuma pengen tahu kelanjutan kisahnya. Tapi skillnya nyangkut.",
    },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
} as const;

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center px-6 pt-16 pb-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="flex flex-col items-center w-full"
      >
        <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.25em] text-rose-accent mb-3">
          SakuTech
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-[1.75rem] leading-snug text-text-primary text-center max-w-75"
        >
          Belajar coding lewat cerita yang kamu nggak mau berhenti baca.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-body text-[0.9375rem] leading-relaxed text-center max-w-70 mt-4 italic"
        >
          Ada cowok pendiam di perpustakaan. Ada cewek yang selalu di meja yang sama. Dan ada kode yang harus disusun sebelum ceritanya bisa lanjut.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 w-full max-w-70">
          <Link
            href="/learn"
            className="flex items-center justify-center w-full py-3.5 rounded-xl bg-rose-accent text-white font-medium text-[0.9375rem] active:scale-[0.97] transition-transform"
          >
            Mulai Baca
          </Link>
          <p className="text-center text-text-secondary text-xs mt-2">
            Gratis. Tanpa kartu kredit.
          </p>
        </motion.div>

        <motion.ul
          variants={stagger}
          className="flex flex-col gap-5 mt-12 w-full"
        >
          {HOOKS.map(({ icon: Icon, label, sub }) => (
            <motion.li
              key={label}
              variants={fadeUp}
              className="flex items-start gap-3"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-warm-surface border border-warm-border flex items-center justify-center">
                <Icon size={20} className="text-rose-accent" />
              </div>
              <div>
                <p className="text-text-primary text-sm font-medium">{label}</p>
                <p className="text-text-secondary text-xs leading-relaxed mt-0.5">{sub}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}