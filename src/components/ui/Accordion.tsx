"use client";

import { useRef, useState, useId } from "react";

export type AccordionItem = {
  title: string;
  body: string;
  points?: readonly string[];
  badge?: string;
};

/**
 * Accessible, smoothly-animated accordion. Height animates via max-height on a
 * measured inner panel; one open at a time. Keyboard operable.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <Row
          key={item.title}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
}

function Row({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`panel-${id}`}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left"
        >
          <span className="flex items-baseline gap-4">
            <span className="font-display text-2xl text-white transition-colors group-hover:text-accent md:text-3xl">
              {item.title}
            </span>
            {item.badge && (
              <span className="eyebrow text-accent">{item.badge}</span>
            )}
          </span>
          <span
            className={`relative h-5 w-5 shrink-0 transition-transform duration-500 ${
              isOpen ? "rotate-45" : ""
            }`}
            aria-hidden
          >
            <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-white" />
            <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-white" />
          </span>
        </button>
      </h3>
      <div
        id={`panel-${id}`}
        ref={panelRef}
        role="region"
        className="overflow-hidden transition-[max-height,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          maxHeight: isOpen ? `${panelRef.current?.scrollHeight ?? 1500}px` : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="grid grid-cols-1 gap-6 pb-9 md:grid-cols-12">
          <p className="text-lg leading-relaxed text-white-dim md:col-span-7">
            {item.body}
          </p>
          {item.points && (
            <ul className="space-y-2 md:col-span-5">
              {item.points.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-sm leading-relaxed text-white-dim"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
