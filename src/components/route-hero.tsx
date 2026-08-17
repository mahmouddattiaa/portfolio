import type { ReactNode } from "react";
import { KeplerFold } from "@/components/kepler-fold";

type RouteHeroProps = {
  /** Small uppercase kicker (atelier-kicker). */
  kicker: string;
  /** Headline — pass JSX with `<span>` children for explicit line control. */
  title: ReactNode;
  /** Lead paragraph (atelier-hero-lead). */
  lead: string;
  /** Optional CTA slot (atelier-hero-actions). */
  actions?: ReactNode;
  /** Show the Kepler Fold fragment behind the hero. Default true. */
  fold?: boolean;
  /** Optional content rendered below the hero content within the same shell. */
  children?: ReactNode;
  /** Accessible id used on the h1 (e.g. route slug). */
  titleId?: string;
  /**
   * Optional extra section classNames merged with `atelier-hero`. Used to
   * attach locale-specific modifiers like `atelier-hero-ar`.
   */
  className?: string;
};

/**
 * Shared atelier route hero. Mirrors the homepage hero composition so every
 * route reads as part of the same product.
 *
 * Honors `dir="rtl"` automatically — the underlying `.hero-fold` is flipped to
 * the inline-start side by `global-atelier.css` in RTL contexts.
 */
export function RouteHero({
  kicker,
  title,
  lead,
  actions,
  fold = true,
  children,
  titleId,
  className,
}: RouteHeroProps) {
  const sectionClass = ["atelier-hero", className].filter(Boolean).join(" ");
  return (
    <section className={sectionClass} aria-labelledby={titleId}>
      {fold ? <KeplerFold className="hero-fold" priority /> : null}
      <div className="shell atelier-hero-content">
        <p className="atelier-kicker hero-kicker">{kicker}</p>
        <h1 id={titleId}>{title}</h1>
        <p className="atelier-hero-lead">{lead}</p>
        {actions ? <div className="atelier-hero-actions">{actions}</div> : null}
        {children}
      </div>
    </section>
  );
}

