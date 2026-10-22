"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQItem } from "../../types/business";

export function FAQAccordion({ items }: { items: readonly FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="faq-list">
      {items.map((item) => {
        const open = openId === item.id;
        const answerId = `faq-answer-${item.id}`;
        return (
          <div className={`faq-item transition-colors duration-300 ${open ? "faq-item--active border-stone-800" : ""}`} key={item.id}>
            <button
              className="faq-trigger"
              type="button"
              aria-expanded={open}
              aria-controls={answerId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="font-medium text-lg tracking-tight">{item.question}</span>
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex-shrink-0 ml-4"
              >
                <Plus aria-hidden="true" size={20} strokeWidth={1.8} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={answerId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="faq-answer pb-6 pt-1 text-stone-400 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
