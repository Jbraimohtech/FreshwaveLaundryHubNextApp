"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/site-data";

export default function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#e6ece7] border-y border-[#e6ece7]">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;
        return (
          <article key={faq.question} className="py-1">
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold tracking-[-.02em] text-[#18343d] sm:py-6 sm:text-lg"
              >
                {faq.question}
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#116c83] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h2>
            {isOpen && (
              <div id={answerId} className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-[#63777e]">
                {faq.answer}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
