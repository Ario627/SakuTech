"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NarrationBlock from "./NarrationBlock";
import DialogBubble from "./DialogBubble";
import ChapterHeader from "./ChapterHeader";
import TapLogicQuiz from "../quiz/TapLogicQuiz";
import type { Chapter, Paragraph } from "@/data/chapters";

type StoryReaderProps = {
  chapter: Chapter;
  onNextChapter: () => void;
};

function renderParagraph(para: Paragraph, index: number) {
  if (para.type === "narration") {
    return <NarrationBlock key={`narr-${index}`} text={para.text} index={index} />;
  }
  return <DialogBubble key={`dlg-${index}`} text={para.text} character={para.character} index={index} />;
}

export default function StoryReader({ chapter, onNextChapter }: StoryReaderProps) {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [allVisible, setAllVisible] = useState(false);

  const isLastChapter = false; 
  const hasQuiz = chapter.quiz !== null;
  const showContinue = hasQuiz ? quizCompleted : allVisible;

  const handleAllParagraphsVisible = () => {
    setTimeout(() => setAllVisible(true), 300);
  };

  const totalDelay = chapter.paragraphs.length * 150;

  return (
    <div className="min-h-dvh bg-warm-bg" style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(200,170,140,0.04) 24px, rgba(200,170,140,0.04) 25px)`,
    }}>
      <ChapterHeader chapterNumber={chapter.chapterNumber} title={chapter.title} />

      <main className="pt-6 pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          onAnimationComplete={handleAllParagraphsVisible}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {chapter.paragraphs.map((para, i) => {
            if (para.type === "narration") {
              return (
                <motion.div key={`p-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  <NarrationBlock text={para.text} index={0} />
                </motion.div>
              );
            }
            return (
              <motion.div key={`p-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <DialogBubble text={para.text} character={para.character} index={0} />
              </motion.div>
            );
          })}
        </motion.div>

        {hasQuiz && chapter.quiz && (
          <TapLogicQuiz
            setup={chapter.quiz.setup}
            slots={chapter.quiz.slots}
            options={chapter.quiz.options}
            correctAnswer={chapter.quiz.correctAnswer}
            rewardParagraph={chapter.rewardParagraph}
            onComplete={() => setQuizCompleted(true)}
          />
        )}

        {!hasQuiz && allVisible && !quizCompleted && chapter.rewardParagraph.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <RewardParagraph paragraphs={chapter.rewardParagraph} />
          </motion.div>
        )}

        {showContinue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mt-10 px-(--spacing-reader-x)"
          >
            <button
              onClick={onNextChapter}
              className="w-full max-w-70 py-3.5 px-6 rounded-xl bg-rose-accent text-white font-medium text-[0.9375rem] active:scale-[0.97] transition-transform"
            >
              Lanjutkan &#9654;
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}

import RewardParagraph from "./RewardParagraph";