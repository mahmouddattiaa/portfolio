"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import type { ThemePreference } from "@/lib/content";

const navigation = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "Founder", href: "/mahmoud" },
];

/** Every word in the footer. An Arabic footer is a second object of this shape. */
const footerCopy = {
  tagline: "Kepler Dev designs and builds digital products, from first idea to production.",
  navigationLabel: "Footer navigation",
  contactLabel: "Contact",
  email: "mahmouddattiaa7@gmail.com",
  conversation: "Start a conversation",
  timeLabel: "Local time",
  clocks: [
    { city: "United Kingdom", timeZone: "Europe/London" },
    { city: "Cairo, Egypt", timeZone: "Africa/Cairo" },
  ],
  studio: "Kepler Dev",
  privacy: "Privacy",
} as const;

function BrandMark({ variant = "header" }: { variant?: "header" | "footer" }) {
  const isFooter = variant === "footer";
  // Header + footer are both dark surfaces; the dark wordmark uses
  // `currentColor` which falls back to black when loaded via <img>, so
  // dark-on-dark collapses. Use the dedicated cream variants instead.
  const src = isFooter
    ? "/brand/wordmark-a-footer-light.svg"
    : "/brand/wordmark-a-mark-light.svg";
  return (
    <Image
      src={src}
      alt="Kepler Dev"
      width={isFooter ? 116 : 152}
      height={isFooter ? 24 : 32}
      priority={!isFooter}
    />
  );
}

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="theme-select atelier-theme-select">
      <span>Appearance</span>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value as ThemePreference)}
        aria-label={`Theme preference: ${theme}`}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </label>
  );
}

function LocaleControl({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  return (
    <div
      className={`locale-control${compact ? " locale-control-compact" : ""}`}
    >
      <Link
        className="locale-trigger"
        href={isArabic ? "/" : "/ar"}
        aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
      >
        <span aria-hidden="true">
          {isArabic ? "العربية / EN" : "EN / العربية"}
        </span>
      </Link>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  const current = (href: string) => (href === pathname ? "page" : undefined);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const trigger = button.current;
    const first =
      panel.current?.querySelector<HTMLElement>("a, button, select");
    first?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }

      if (event.key !== "Tab" || !panel.current) return;
      const focusable = [
        ...panel.current.querySelectorAll<HTMLElement>("a, button, select"),
      ];
      const firstItem = focusable[0];
      const lastItem = focusable.at(-1);
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  // Tuck the header away while reading down the page and bring it back as
  // soon as the reader scrolls up. It never hides near the top of the page.
  // Distance is measured from where the direction last changed, not per
  // frame, so a slow scroll still counts once it adds up.
  useEffect(() => {
    let lastY = window.scrollY;
    let turnY = lastY;
    let goingDown = true;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y !== lastY && y > lastY !== goingDown) {
          goingDown = y > lastY;
          turnY = lastY;
        }
        if (y < 120) setHidden(false);
        else if (goingDown && y > turnY + 12) setHidden(true);
        else if (!goingDown && y < turnY - 12) setHidden(false);
        lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const dialog =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="mobile-overlay" onMouseDown={closeMenu}>
            <div
              ref={panel}
              className="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="mobile-drawer-top">
                <span id="mobile-navigation-title" className="sr-only">
                  Navigation menu
                </span>
                <Link
                  className="atelier-wordmark"
                  href="/"
                  aria-label="Kepler Dev home"
                  onClick={closeMenu}
                >
                  <BrandMark variant="header" />
                </Link>
                <button
                  className="menu-button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <nav className="mobile-navigation" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={current(item.href)}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  className="atelier-primary-action"
                  href="/contact"
                  onClick={closeMenu}
                >
                  {isArabic ? "ابدأ الحديث معنا" : "Start a conversation"}
                </Link>
              </nav>
              <div className="mobile-drawer-utilities">
                <LocaleControl compact />
                <ThemeSelector />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className="site-header atelier-header"
        data-hidden={hidden && !open ? "" : undefined}
        onFocusCapture={() => setHidden(false)}
      >
        <div className="shell header-inner">
          <Link
            className="atelier-wordmark"
            href="/"
            aria-label="Kepler Dev home"
          >
            <BrandMark variant="header" />
          </Link>
          <nav
            className="desktop-nav atelier-navigation"
            aria-label="Primary navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions atelier-header-actions">
            <LocaleControl />
            <Link
              className="atelier-primary-action desktop-cta"
              href="/contact"
            >
              {isArabic ? "تواصل معنا" : "Get in touch"}
            </Link>
            <button
              ref={button}
              className="menu-button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      {dialog}
    </>
  );
}

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date());
}

/**
 * Live local time. The server renders a placeholder and the browser fills
 * in the time after mount, so the markup never mismatches on hydration.
 */
function LiveClock({ city, timeZone }: { city: string; timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatTime(timeZone));
    tick();
    const timer = window.setInterval(tick, 20_000);
    return () => window.clearInterval(timer);
  }, [timeZone]);

  return (
    <p className="footer-clock">
      <span>{city}</span>
      <time aria-live="off" suppressHydrationWarning>
        {time ?? "--:--"}
      </time>
    </p>
  );
}

export function Footer() {
  return (
    <footer id="site-footer" className="site-footer atelier-footer">
      <div className="shell footer-grid footer-grid-v2">
        <div className="footer-brand">
          <Link
            className="atelier-wordmark"
            href="/"
            aria-label="Kepler Dev home"
          >
            <BrandMark variant="footer" />
          </Link>
          <p>{footerCopy.tagline}</p>
        </div>
        <nav aria-label={footerCopy.navigationLabel}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-column">
          <p className="footer-label">{footerCopy.contactLabel}</p>
          <a href={`mailto:${footerCopy.email}`}>{footerCopy.email}</a>
          <Link href="/contact">{footerCopy.conversation}</Link>
        </div>
        <div className="footer-column">
          <p className="footer-label">{footerCopy.timeLabel}</p>
          {footerCopy.clocks.map((clock) => (
            <LiveClock key={clock.timeZone} {...clock} />
          ))}
        </div>
      </div>
      <div className="shell footer-legal">
        <span>
          © {new Date().getFullYear()} {footerCopy.studio}
        </span>
        <Link href="/privacy">{footerCopy.privacy}</Link>
      </div>
    </footer>
  );
}
