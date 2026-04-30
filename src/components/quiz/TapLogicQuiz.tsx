"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import TapSlot from "./Tap";
import TapOption from "./TapOption";
import RewardParagraph from "../story/RewardParagraph";
import type { Paragraph } from "@/data/chapters";

type TapLogicQuizProps = {
  setup: string;
  slots: (string | null)[];
  options: string[];
  correctAnswer: string[];
  rewardParagraph: Paragraph[];
  onComplete: () => void;
};

type SlotState = "empty" | "filled" | "correct" | "wrong";

// Normalize "___" and empty strings to null — data might use either format
function normalizeSlots(slots: (string | null)[]): (string | null)[] {
  return slots.map((s) => {
    if (s === null || s === "___" || s === "" || s === "—") return null;
    return s;
  });
}

export default function TapLogicQuiz({
  setup,
  slots: rawSlots,
  options,
  correctAnswer,
  rewardParagraph,
  onComplete,
}: TapLogicQuizProps) {
  const slots = useMemo(() => normalizeSlots(rawSlots), [rawSlots]);

  const nullSlotIndices = useMemo(
    () => slots.map((s, i) => (s === null ? i : -1)).filter((i) => i !== -1),
    [slots]
  );

  const [filledSlots, setFilledSlots] = useState<(string | null)[]>(
    () => nullSlotIndices.map(() => null)
  );
  const [usedOptions, setUsedOptions] = useState<boolean[]>(
    () => options.map(() => false)
  );
  const [slotStates, setSlotStates] = useState<SlotState[]>(
    () => nullSlotIndices.map(() => "empty")
  );
  const [phase, setPhase] = useState<"filling" | "checking" | "wrong" | "correct">("filling");

  const handleOptionTap = useCallback(
    (optionIndex: number) => {
      if (usedOptions[optionIndex] || phase !== "filling") return;

      const firstEmpty = filledSlots.findIndex((s) => s === null);
      if (firstEmpty === -1) return;

      const newFilled = [...filledSlots];
      newFilled[firstEmpty] = options[optionIndex];
      const newUsed = [...usedOptions];
      newUsed[optionIndex] = true;
      const newStates = [...slotStates];
      newStates[firstEmpty] = "filled";

      setFilledSlots(newFilled);
      setUsedOptions(newUsed);
      setSlotStates(newStates);

      const stillEmpty = newFilled.filter((s) => s === null).length;
      if (stillEmpty === 0) {
        setPhase("checking");
        setTimeout(() => {
          const isCorrect = newFilled.every(
            (val, i) => val === correctAnswer[i]
          );

          if (isCorrect) {
            setSlotStates(newStates.map(() => "correct"));
            setPhase("correct");
            setTimeout(onComplete, 600);
          } else {
            setSlotStates(newStates.map(() => "wrong"));
            setPhase("wrong");
            setTimeout(() => {
              setFilledSlots(nullSlotIndices.map(() => null));
              setUsedOptions(options.map(() => false));
              setSlotStates(nullSlotIndices.map(() => "empty"));
              setPhase("filling");
            }, 700);
          }
        }, 400);
      }
    },
    [filledSlots, usedOptions, slotStates, options, correctAnswer, nullSlotIndices, phase, onComplete]
  );

  const handleSlotRemove = useCallback(
    (slotIndex: number) => {
      if (phase !== "filling") return;

      const value = filledSlots[slotIndex];
      if (!value) return;

      // Find the option that matches this value and is currently used
      const optionIdx = options.findIndex(
        (opt, i) => opt === value && usedOptions[i]
      );

      const newFilled = [...filledSlots];
      newFilled[slotIndex] = null;
      const newUsed = [...usedOptions];
      if (optionIdx !== -1) newUsed[optionIdx] = false;
      const newStates = [...slotStates];
      newStates[slotIndex] = "empty";

      setFilledSlots(newFilled);
      setUsedOptions(newUsed);
      setSlotStates(newStates);
    },
    [filledSlots, usedOptions, slotStates, options, phase]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-5 py-6"
    >
      <div className="flex items-center justify-center gap-3 my-4 text-warm-border">
        <span className="h-px flex-1 bg-warm-border" />
        <span className="text-xs tracking-widest text-text-secondary">Quiz</span>
        <span className="h-px flex-1 bg-warm-border" />
      </div>

      <p className="text-center text-text-body leading-relaxed text-[0.9375rem] mb-5 font-body">
        {setup}
      </p>

      <div className="flex flex-wrap gap-2 justify-center my-5">
        {slots.map((staticVal, i) => {
          if (staticVal !== null) {
            return <TapSlot key={`static-${i}`} value={staticVal} isStatic state="filled" />;
          }

          const nullIndex = nullSlotIndices.indexOf(i);
          const filledVal = filledSlots[nullIndex];
          const state = slotStates[nullIndex];

          return (
            <TapSlot
              key={`slot-${i}`}
              value={filledVal}
              isStatic={false}
              state={filledVal ? state : "empty"}
              onRemove={() => handleSlotRemove(nullIndex)}
            />
          );
        })}
      </div>

      {phase === "filling" && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {options.map((opt, i) => (
            <TapOption
              key={`opt-${i}`}
              label={opt}
              isUsed={usedOptions[i]}
              onTap={() => handleOptionTap(i)}
            />
          ))}
        </div>
      )}

      {phase === "wrong" && (
        <p className="text-center text-error text-sm mt-3 font-body">
          Coba lagi — strukturnya belum tepat.
        </p>
      )}

      {phase === "correct" && (
        <>
          <div className="flex items-center justify-center gap-3 my-4 text-warm-border">
            <span className="h-px flex-1 bg-warm-border" />
            <span className="text-xs tracking-widest text-success">&#10003;</span>
            <span className="h-px flex-1 bg-warm-border" />
          </div>
          <RewardParagraph paragraphs={rewardParagraph} />
        </>
      )}
    </motion.div>
  );
}