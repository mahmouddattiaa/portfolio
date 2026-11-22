import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./route-hero.module.css";

type RouteHeroProps = {
  kicker: string;
  title: ReactNode;
  lead: string;
  actions?: ReactNode;
  children?: ReactNode;
  titleId?: string;
  className?: string;
  imageSrc?: string;
};

export function RouteHero({
  kicker,
  title,
  lead,
  actions,
  children,
  titleId,
  className,
  imageSrc = "/media/home/hero-tree.webp",
}: RouteHeroProps) {
  const sectionClass = ["atelier-hero", styles.hero, className].filter(Boolean).join(" ");
  return (
    <section className={sectionClass} aria-labelledby={titleId}>
      <Image
        className={styles.image}
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={"shell atelier-hero-content " + styles.content}>
        <p className="atelier-kicker hero-kicker">{kicker}</p>
        <h1 id={titleId}>{title}</h1>
        <p className="atelier-hero-lead">{lead}</p>
        {actions ? <div className="atelier-hero-actions">{actions}</div> : null}
        {children}
      </div>
    </section>
  );
}
