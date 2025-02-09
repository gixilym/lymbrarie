import useLocalStorage from "@/hooks/useLocalStorage";
import type { Component, Handler, Translate } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { ChevronRight, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function FAQ(): Component {
  const [t] = useTranslation("global"),
    [openItem, setOpenItem] = useState<number | null>(null),
    toggleItem: Handler<number, void> = (index: number) =>
      setOpenItem(openItem === index ? null : index),
    [animations] = useLocalStorage("animations", true),
    [styles] = useSpring(() => ({
      from: { opacity: animations ? 0 : 1 },
      to: { opacity: 1 },
      config: { duration: 400 },
    }));

  return (
    <animated.section
      style={styles}
      className="max-w-2xl w-full space-y-4 pb-24"
    >
      <Link
        href="/"
        className="w-full p-4 text-xl underline text-center sm:text-start"
      >
        {t("back")}
      </Link>
      <div className="max-w-3xl w-full p-4 h-full">
        <ul className="space-y-4">
          {faqItems(t).map((item, i) => (
            <li
              key={i}
              className="border-2 border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-4 focus:outline-none cursor-default bg-gray-900 transition-colors duration-200"
                onClick={() => toggleItem(i)}
              >
                <span className="float-left pr-3 pt-0.5">
                  {openItem == i ? <ChevronUp /> : <ChevronRight />}
                </span>
                <span className="font-medium text-xl">{item.question}</span>
              </button>
              {openItem == i && (
                <div className="p-4 bg-gray-900 text-lg border-t-2 border-gray-800">
                  <p className="w-full max-w-2xl">{item.answer}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </animated.section>
  );
}

export default FAQ;

function faqItems(t: Translate): FAQItems[] {
  return [
    {
      question: t("question-1"),
      answer: t("answer-1"),
    },
    {
      question: t("question-2"),
      answer: t("answer-2"),
    },
    {
      question: t("question-3"),
      answer: t("answer-3"),
    },
    {
      question: t("question-4"),
      answer: t("answer-4"),
    },
    {
      question: t("question-5"),
      answer: t("answer-5"),
    },
  ];
}

type FAQItems = {
  question: string;
  answer: string;
};
