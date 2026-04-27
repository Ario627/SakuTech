"use client";

import { useState, useCallback } from "react";
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

export default function TapLogicQuiz({
  setup,
  slots,
  options,
  correctAnswer,
  rewardParagraph,
  onComplete,
}: TapLogicQuizProps) {
  const nullSlotIndices = slots
    .map((s, i) => (s === null ? i : -1))
    .filter((i) => i !== -1);

  const [filledSlots, setFilledSlots] = useState<(string | null)[]>(
    nullSlotIndices.map(() => null)
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
        setTimeout(() => checkAnswer(newFilled, newStates), 400);
      }
    },
    [filledSlots, usedOptions, slotStates, options, phase]
  );

  const checkAnswer = (
    currentFilled: (string | null)[],
    currentStates: SlotState[]
  ) => {
    const isCorrect = currentFilled.every(
      (val, i) => val === correctAnswer[i]
    );

    if (isCorrect) {
      setSlotStates(currentStates.map(() => "correct"));
      setPhase("correct");
      setTimeout(onComplete, 600);
    } else {
      setSlotStates(currentStates.map(() => "wrong"));
      setPhase("wrong");
      setTimeout(() => {
        setFilledSlots(nullSlotIndices.map(() => null));
        setUsedOptions(options.map(() => false));
        setSlotStates(nullSlotIndices.map(() => "empty"));
        setPhase("filling");
      }, 500);
    }
  };

  const handleSlotRemove = useCallback(
    (slotIndex: number) => {
      if (phase !== "filling") return;

      const value = filledSlots[slotIndex];
      if (!value) return;

      const optionIdx = options.findIndex(
        (opt, i) => opt === value && !usedOptions[i]
      );
      const firstOptionIdx = options.findIndex(
        (opt, i) => opt === value && usedOptions[i]
      );

      const newFilled = [...filledSlots];
      newFilled[slotIndex] = null;
      const newUsed = [...usedOptions];
      if (firstOptionIdx !== -1) newUsed[firstOptionIdx] = false;
      const newStates = [...slotStates];
      newStates[slotIndex] = "empty";

      setFilledSlots(newFilled);
      setUsedOptions(newUsed);
      setSlotStates(newStates);
    },
    [filledSlots, usedOptions, slotStates, options, phase]
  );

  const renderSlots = () => (
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
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-(--spacing-reader-x) py-6"
    >
      <div className="flex items-center justify-center gap-3 my-4 text-warm-border">
        <span className="h-px flex-1 bg-warm-border" />
        <span className="text-xs tracking-widest">✦</span>
        <span className="h-px flex-1 bg-warm-border" />
      </div>

      <p className="text-center text-text-body leading-relaxed text-[0.9375rem] mb-5">
        {setup}
      </p>

      {renderSlots()}

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
        <p className="text-center text-error text-sm mt-3">
          Coba lagi — strukturnya belum tepat.
        </p>
      )}

      {phase === "correct" && (
        <>
          <div className="flex items-center justify-center gap-3 my-4 text-warm-border">
            <span className="h-px flex-1 bg-warm-border" />
            <span className="text-xs tracking-widest">✦</span>
            <span className="h-px flex-1 bg-warm-border" />
          </div>
          <RewardParagraph paragraphs={rewardParagraph} />
        </>
      )}
    </motion.div>
  );
}