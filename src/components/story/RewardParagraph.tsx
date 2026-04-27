"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";  
import type { Paragraph } from "@/data/chapters";
import NarrationBlock from "./NarrationBlock";
import DialogBubble from "./DialogBubble";

type RewardParagraphProps = {
  paragraphs: Paragraph[];
  className?: string;
};

export default function RewardParagraph({ paragraphs, className }: RewardParagraphProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "border-l-2 border-rose-accent/50 pl-4 ml-4 my-6",
        className
      )}
    >
      {paragraphs.map((para, i) => {
        if (para.type === "narration") {
          return (
            <NarrationBlock
              key={`reward-narr-${i}`}
              text={para.text}
              index={i}
            />
          );
        }
        return (
          <DialogBubble
            key={`reward-dlg-${i}`}
            text={para.text}
            character={para.character}
            index={i}
          />
        );
      })}
    </motion.div>
  );
}