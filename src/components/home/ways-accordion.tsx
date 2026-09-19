"use client";

import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

export type WayToWork = {
  name: string;
  bestFit: string;
  outcome: string;
};

/**
 * One offer open at a time. Rows open on click or keyboard everywhere, and
 * also on hover where the device has a real hover (not on touch screens).
 * A click on a row that hover just opened keeps it open; the next click
 * closes it.
 */
export function WaysAccordion({
  offers,
  whatYouGet,
  discuss,
}: {
  offers: readonly WayToWork[];
  whatYouGet: string;
  discuss: string;
}) {
  const [open, setOpen] = useState(0);
  const [canHover, setCanHover] = useState(false);
  const hoverOpened = useRef(-1);
  const reduced = useReducedMotion();
  const baseId = useId();

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div className="hv2-ways">
      {offers.map((offer, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div className="hv2-way" data-open={isOpen || undefined} key={offer.name}>
            <h3 className="hv2-way-heading">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  const keepOpen = hoverOpened.current === index;
                  hoverOpened.current = -1;
                  setOpen(isOpen && !keepOpen ? -1 : index);
                }}
                onMouseEnter={
                  canHover && !isOpen
                    ? () => {
                        hoverOpened.current = index;
                        setOpen(index);
                      }
                    : undefined
                }
              >
                <span className="hv2-way-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="hv2-way-name">{offer.name}</span>
                <span className="hv2-way-fit">{offer.bestFit}</span>
                {isOpen ? (
                  <Minus className="hv2-way-icon" aria-hidden="true" />
                ) : (
                  <Plus className="hv2-way-icon" aria-hidden="true" />
                )}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="hv2-way-panel"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className="hv2-way-panel-inner">
                    <p className="hv2-way-fit-mobile">{offer.bestFit}</p>
                    <div>
                      <span className="hv2-eyebrow">{whatYouGet}</span>
                      <p className="hv2-way-outcome">{offer.outcome}</p>
                    </div>
                    <Link
                      className="hv2-button"
                      href={`/contact?offer=${encodeURIComponent(offer.name)}`}
                    >
                      {discuss} <ArrowUpRight aria-hidden="true" />
                    </Link>
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
