"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useAuth } from "@/components/auth/AuthProvider";
import UserAvatar from "@/components/auth/UserAvatar";

type Tab = "masuk" | "daftar";

export default function ProfileHeader() {
  const { user, isLoggedIn, isLoading, loginWithGitHub, loginWithEmail, registerWithEmail, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("masuk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleEmailLogin = async () => {
    setError(null);
    setSubmitting(true);
    const result = await loginWithEmail(email, password);
    setSubmitting(false);
    if (result.error) setError(result.error);
  };

  const handleRegister = async () => {
    setError(null);
    setSubmitting(true);
    const result = await registerWithEmail(email, password, name);
    setSubmitting(false);
    if (result.error) setError(result.error);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-rose-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoggedIn && user) {
    const hasGitHub = user.providers.includes("github");

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-3 py-4"
      >
        <UserAvatar name={user.name} avatarUrl={user.avatarUrl} size="lg" />

        <div className="flex-1 min-w-0">
          <p className="font-heading text-lg text-text-primary truncate">
            {user.name}
          </p>
          <p className="text-text-secondary text-xs truncate">{user.email}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <button
            onClick={logout}
            className="text-text-secondary text-xs underline underline-offset-2 hover:text-rose-accent transition-colors"
          >
            Keluar
          </button>
          {!hasGitHub && (
            <button
              onClick={loginWithGitHub}
              className="text-[10px] text-teal-accent hover:underline"
            >
              Tautkan GitHub
            </button>
          )}
          {hasGitHub && (
            <span className="text-[10px] text-success">GitHub terhubung</span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-4 py-6"
    >
      <div className="w-16 h-16 rounded-full bg-warm-border flex items-center justify-center text-text-secondary text-xl font-heading">
        ?
      </div>

      <div className="text-center">
        <p className="font-heading text-lg text-text-primary">Belum masuk</p>
        <p className="text-text-secondary text-sm mt-0.5">
          Masuk untuk menyimpan progressmu
        </p>
      </div>

      <button
        onClick={loginWithGitHub}
        className="w-full max-w-70 py-3 rounded-xl bg-gray-900 text-white font-semibold text-sm flex items-center justify-center gap-2.5 active:scale-[0.97] transition-transform min-h-12"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.305-5.46-5.835 0-1.29.465-2.34 1.23-3.165-.12-.3-.54-1.5.12-3.12 0 0 1.005-.315 3.3 1.215.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.545 3.3-1.215 3.3-1.215.66 1.62.24 2.82.12 3.12.765.825 1.23 1.875 1.23 3.165 0 4.545-2.775 5.835-5.445 6.135.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        Masuk dengan GitHub
      </button>

      <div className="flex items-center gap-3 w-full max-w-70 my-1">
        <span className="flex-1 h-px bg-warm-border" />
        <span className="text-text-secondary text-xs">atau</span>
        <span className="flex-1 h-px bg-warm-border" />
      </div>

      <div className="w-full max-w-70">
        <div className="flex rounded-xl overflow-hidden border border-warm-border bg-warm-surface mb-4">
          <button
            onClick={() => { setTab("masuk"); setError(null); }}
            className={cn(
              "flex-1 py-2 text-sm font-medium transition-colors",
              tab === "masuk"
                ? "bg-rose-accent text-white"
                : "text-text-secondary hover:text-text-body"
            )}
          >
            Masuk
          </button>
          <button
            onClick={() => { setTab("daftar"); setError(null); }}
            className={cn(
              "flex-1 py-2 text-sm font-medium transition-colors",
              tab === "daftar"
                ? "bg-rose-accent text-white"
                : "text-text-secondary hover:text-text-body"
            )}
          >
            Daftar
          </button>
        </div>

        {tab === "daftar" && (
          <div className="mb-3">
            <label className="block text-xs text-text-secondary mb-1">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alaska"
              className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border bg-warm-surface text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-rose-accent transition-colors"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="block text-xs text-text-secondary mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alaska@sekolah.id"
            className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border bg-warm-surface text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-rose-accent transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs text-text-secondary mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 karakter"
            className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border bg-warm-surface text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-rose-accent transition-colors"
          />
        </div>

        {error && (
          <p className="text-error text-xs mb-3 text-center">{error}</p>
        )}

        <button
          onClick={tab === "masuk" ? handleEmailLogin : handleRegister}
          disabled={submitting}
          className={cn(
            "w-full py-3 rounded-xl font-semibold text-sm active:scale-[0.97] transition-transform min-h-12",
            submitting
              ? "bg-rose-accent/60 text-white/70 cursor-not-allowed"
              : "bg-rose-accent text-white"
          )}
        >
          {submitting ? "Memproses..." : tab === "masuk" ? "Masuk" : "Daftar"}
        </button>
      </div>
    </motion.div>
  );
}