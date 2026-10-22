"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { FAQItem } from "../../types/business";

export function FAQAccordion({ items }: { items: readonly FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="faq-list">
      {items.map((item) => {
        const open = openId === item.id;
        const answerId = `faq-answer-${item.id}`;
        return (
          <div className="faq-item" key={item.id}>
            <button
              className="faq-trigger"
              type="button"
              aria-expanded={open}
              aria-controls={answerId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span>{item.question}</span>
              <Plus aria-hidden="true" size={21} strokeWidth={1.5} />
            </button>
            {open ? (
              <div className="faq-answer" id={answerId} role="region">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
