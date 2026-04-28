"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type ProfileHeaderProps = {
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ProfileHeader({
  name,
  email,
  avatarUrl,
  isLoggedIn,
  onLogin,
  onLogout,
}: ProfileHeaderProps) {
  if (!isLoggedIn) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col items-center gap-4 py-8"
      >
        <div className="w-20 h-20 rounded-full bg-warm-border flex items-center justify-center text-text-secondary text-2xl font-serif">
          ?
        </div>
        <div className="text-center">
          <p className="text-text-primary font-serif text-lg">Belum masuk</p>
          <p className="text-text-secondary text-sm mt-1">
            Masuk untuk menyimpan progressmu
          </p>
        </div>
        <div className="flex flex-col gap-2.5 w-full max-w-65 mt-2">
          <button
            onClick={onLogin}
            className="w-full py-3 rounded-xl bg-rose-accent text-white font-medium text-sm active:scale-[0.97] transition-transform"
          >
            Masuk dengan Google
          </button>
          <button
            onClick={onLogin}
            className="w-full py-3 rounded-xl border border-warm-border bg-warm-surface text-text-primary font-medium text-sm active:scale-[0.97] transition-transform"
          >
            Masuk dengan GitHub
          </button>
        </div>
      </motion.div>
    );
  }

  const initials = (name ?? "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="flex items-center gap-3 py-6"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name ?? "Avatar"}
          className="w-14 h-14 rounded-full object-cover border-2 border-warm-border"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-alaska-avatar flex items-center justify-center text-white font-bold text-lg">
          {initials}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-text-primary font-serif text-lg truncate">{name}</p>
        <p className="text-text-secondary text-xs truncate">{email}</p>
      </div>
      <button
        onClick={onLogout}
        className="text-text-secondary text-xs underline underline-offset-2 hover:text-rose-accent transition-colors"
      >
        Keluar
      </button>
    </motion.div>
  );
}