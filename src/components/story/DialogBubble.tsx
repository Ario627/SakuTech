"use client"

import { cn } from "@/lib/cn"
import { motion } from "framer-motion"

type Character = "alaska" | "erine";

type DialogBubbleProps = {
  text: string;
  character: Character;
  index: number;
  className?: string;
};



const CHARACTER: Record<Character, {
    avatar: string;
    avatarBg: string;
    bubbleBg: string;
    bubbleRounded: string;
    align: string;
    initial: string;
}> = {
    erine: {
    avatar: "E",
    avatarBg: "bg-erine-avatar",
    bubbleBg: "bg-erine-bubble",
    bubbleRounded: "rounded-2xl rounded-bl-md",
    align: "flex-row",
    initial: "E",
  },
  alaska: {
    avatar: "A",
    avatarBg: "bg-alaska-avatar",
    bubbleBg: "bg-alaska-bubble",
    bubbleRounded: "rounded-2xl rounded-br-md",
    align: "flex-row-reverse",
    initial: "A",
  },
}

export default function DialogBubble({ text, character, index, className }: DialogBubbleProps) {
    const config = CHARACTER[character];

    return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "flex items-start gap-2 px-(--spacing-reader-x) py-1.5",
        config.align,
        className
      )}
    >
      {character === "erine" && (
        <div className={cn(
          "shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm",
          config.avatarBg
        )}>
          {config.initial}
        </div>
      )}

      <div className={cn(
        "px-4 py-2.5 text-text-body leading-relaxed max-w-[75%] shadow-sm",
        config.bubbleBg,
        config.bubbleRounded
      )}>
        <p className="text-[0.9375rem]">{text}</p>
      </div>

      {character === "alaska" && (
        <div className={cn(
          "shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm",
          config.avatarBg
        )}>
          {config.initial}
        </div>
      )}
    </motion.div>
  );
}