"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type SlotState = "empty" | "filled" | "correct" | "wrong";

type TapSlotProps = {
  value: string | null;
  isStatic: boolean;
  state: SlotState;
  onRemove?: () => void;
};

const shakeKeyframes = [0, -8, 8, -6, 6, 0];
const pulseKeyframes = [1, 1.04, 1];

export default function TapSlot({ value, isStatic, state, onRemove }: TapSlotProps) {
  const isEmpty = state === "empty";
  const isCorrect = state === "correct";
  const isWrong = state === "wrong";

  const animateX = isWrong ? shakeKeyframes : 0;
  const animateScale = isCorrect ? pulseKeyframes : 1;

  const handleClick = () => {
    if (!isStatic && !isEmpty && onRemove) onRemove();
  };

  return (
    <motion.div
      animate={{ x: animateX, scale: animateScale }}
      transition={isWrong ? { duration: 0.4 } : isCorrect ? { duration: 0.4, ease: "easeInOut" } : undefined}
      onClick={handleClick}
      className={cn(
        "min-h-12 min-w-20 px-4 py-2.5",
        "flex items-center justify-center",
        "font-mono text-sm rounded-xl select-none",
        "transition-colors duration-200",
        isStatic && "bg-code-bg text-text-body border border-warm-border/60",
        isEmpty && "border-2 border-dashed border-rose-accent/70",
        !isStatic && state === "filled" && "border-2 border-solid border-rose-accent bg-warm-surface text-rose-accent cursor-pointer active:scale-95",
        isCorrect && "border-2 border-solid border-success bg-correct-bg text-success",
        isWrong && "border-2 border-solid border-error bg-wrong-bg text-text-primary",
      )}
    >
      {isEmpty ? (
        <span className="tracking-widest text-rose-accent/40">___</span>
      ) : (
        <span>{value}</span>
      )}
    </motion.div>
  );
}