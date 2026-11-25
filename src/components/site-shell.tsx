"use client";

import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import type { ThemePreference } from "@/lib/content";

type Locale = "en" | "ar";

const shellCopy = {
  en: {
    nav: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "Approach", href: "/#approach" },
      { label: "Studio", href: "/studio" },
    ],
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Navigation menu",
    footerNavigation: "Footer navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    home: "Kepler Dev home",
    themes: { light: "Light", dark: "Dark" },
    switchTheme: { light: "Switch to light theme", dark: "Switch to dark theme" },
    locale: "العربية",
    switchLocale: "Switch to Arabic",
    contactAction: "Request a project review",
    headerAction: "Get in touch",
    footer: {
      tagline: "Kepler Dev designs and builds digital products, from first idea to production.",
      contact: "Contact",
      conversation: "Start a conversation",
      time: "Local time",
      cities: ["United Kingdom", "Cairo, Egypt", "Riyadh, Saudi Arabia"],
      studio: "Kepler Dev",
      privacy: "Privacy",
    },
  },
  ar: {
    nav: [
      { label: "الأعمال", href: "/work" },
      { label: "الخدمات", href: "/services" },
      { label: "منهجيتنا", href: "/#approach" },
      { label: "الاستوديو", href: "/studio" },
    ],
    primaryNavigation: "التنقل الرئيسي",
    mobileNavigation: "قائمة التنقل",
    footerNavigation: "تنقل التذييل",
    openMenu: "فتح قائمة التنقل",
    closeMenu: "إغلاق قائمة التنقل",
    home: "الصفحة الرئيسية لاستوديو Kepler Dev",
    themes: { light: "فاتح", dark: "داكن" },
    switchTheme: { light: "التبديل إلى الوضع الفاتح", dark: "التبديل إلى الوضع الداكن" },
    locale: "EN",
    switchLocale: "التبديل إلى الإنجليزية",
    contactAction: "اطلب مراجعة مشروعك",
    headerAction: "تواصل معنا",
    footer: {
      tagline: "نصمم ونبني المنتجات الرقمية، من الفكرة الأولى حتى الإنتاج.",
      contact: "التواصل",
      conversation: "ابدأ محادثة",
      time: "التوقيت المحلي",
      cities: ["المملكة المتحدة", "القاهرة، مصر", "الرياض، السعودية"],
      studio: "Kepler Dev",
      privacy: "الخصوصية",
    },
  },
} as const;

function BrandMark({ variant = "header" }: { variant?: "header" | "footer" }) {
  const isFooter = variant === "footer";
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

function ThemeToggle({ locale }: { locale: Locale }) {
  const { theme, setTheme } = useTheme();
  const labels = shellCopy[locale];
  const nextTheme: ThemePreference = theme === "light" ? "dark" : "light";
  const Icon = theme === "light" ? Moon : Sun;
  return (
    <button
      className="theme-toggle atelier-theme-toggle"
      data-theme-toggle
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={labels.switchTheme[nextTheme]}
      aria-pressed={theme === "dark"}
      title={labels.switchTheme[nextTheme]}
    >
      <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
      <span className="theme-toggle-label">{labels.themes[nextTheme]}</span>
    </button>
  );
}

function LocaleControl({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const isArabic = locale === "ar";
  const labels = shellCopy[locale];
  return (
    <div className={`locale-control${compact ? " locale-control-compact" : ""}`}>
      <Link
        className="locale-trigger"
        href={isArabic ? "/" : "/ar"}
        aria-label={`${labels.locale} — ${labels.switchLocale}`}
        hrefLang={isArabic ? "en" : "ar"}
      >
        <span aria-hidden="true">{labels.locale}</span>
      </Link>
    </div>
  );
}

function focusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.getAttribute("aria-hidden") !== "true");
}

export function Header({ locale }: { locale: Locale }) {
  const labels = shellCopy[locale];
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const open = openPath === pathname;
  const current = (href: string) => (href === pathname ? "page" : undefined);
  const closeMenu = () => setOpenPath(null);

  useEffect(() => {
    if (!open) return;
    const trigger = button.current;
    const drawer = panel.current;
    if (!drawer) return;
    const previousOverflow = document.body.style.overflow;
    const first = focusableElements(drawer)[0];
    (first ?? drawer).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = focusableElements(drawer);
      const firstItem = focusable[0];
      const lastItem = focusable.at(-1);
      if (!firstItem || !lastItem) {
        event.preventDefault();
        drawer.focus();
      } else if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && drawer.contains(event.target)) return;
      (focusableElements(drawer)[0] ?? drawer).focus();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => trigger?.focus());
    };
  }, [open]);

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
              id="mobile-navigation-dialog"
              className="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
              tabIndex={-1}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="mobile-drawer-top">
                <span id="mobile-navigation-title" className="sr-only">
                  {labels.mobileNavigation}
                </span>
                <Link
                  className="atelier-wordmark"
                  href="/"
                  aria-label={labels.home}
                  onClick={closeMenu}
                >
                  <BrandMark variant="header" />
                </Link>
                <button
                  className="menu-button"
                  onClick={closeMenu}
                  aria-label={labels.closeMenu}
                  type="button"
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <nav className="mobile-navigation" aria-label={labels.mobileNavigation}>
                {labels.nav.map((item) => (
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
                  {labels.contactAction}
                </Link>
              </nav>
              <div className="mobile-drawer-utilities">
                <LocaleControl locale={locale} compact />
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
          <Link className="atelier-wordmark" href="/" aria-label={labels.home}>
            <BrandMark variant="header" />
          </Link>
          <nav className="desktop-nav atelier-navigation" aria-label={labels.primaryNavigation}>
            {labels.nav.map((item) => (
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
            <LocaleControl locale={locale} />
            <ThemeToggle locale={locale} />
            <Link className="atelier-primary-action desktop-cta" href="/contact">
              {labels.headerAction}
            </Link>
            <button
              ref={button}
              className="menu-button"
              onClick={() => setOpenPath(pathname)}
              aria-label={labels.openMenu}
              aria-expanded={open}
              aria-controls="mobile-navigation-dialog"
              aria-haspopup="dialog"
              type="button"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                <path d="M4 6.5h16M4 12h16M4 17.5h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {dialog}
    </>
  );
}

function formatTime(timeZone: string, locale: Locale) {
  const dateLocale = locale === "ar" ? "ar-EG-u-nu-latn" : "en-GB";
  return new Intl.DateTimeFormat(dateLocale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  }).format(new Date());
}

function LiveClock({
  city,
  timeZone,
  locale,
}: {
  city: string;
  timeZone: string;
  locale: Locale;
}) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(formatTime(timeZone, locale));
    tick();
    const timer = window.setInterval(tick, 20_000);
    return () => window.clearInterval(timer);
  }, [locale, timeZone]);
  return (
    <p className="footer-clock">
      <span>{city}</span>
      <time dir="ltr" aria-live="off" suppressHydrationWarning>
        {time ?? "--:--"}
      </time>
    </p>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const labels = shellCopy[locale];
  const clocks = [
    { city: labels.footer.cities[0], timeZone: "Europe/London" },
    { city: labels.footer.cities[1], timeZone: "Africa/Cairo" },
    { city: labels.footer.cities[2], timeZone: "Asia/Riyadh" },
  ];
  return (
    <footer id="site-footer" className="site-footer atelier-footer">
      <div className="shell footer-grid footer-grid-v2">
        <div className="footer-brand">
          <Link className="atelier-wordmark" href="/" aria-label={labels.home}>
            <BrandMark variant="footer" />
          </Link>
          <p>{labels.footer.tagline}</p>
        </div>
        <nav aria-label={labels.footerNavigation}>
          {labels.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-column">
          <p className="footer-label">{labels.footer.contact}</p>
          <a href="mailto:hello@keplerdev.uk">
            <bdi dir="ltr">hello@keplerdev.uk</bdi>
          </a>
          <Link href="/contact">{labels.footer.conversation}</Link>
        </div>
        <div className="footer-column">
          <p className="footer-label">{labels.footer.time}</p>
          {clocks.map((clock) => (
            <LiveClock key={clock.timeZone} {...clock} locale={locale} />
          ))}
        </div>
      </div>
      <div className="shell footer-legal">
        <span>
          © <bdi dir="ltr">{new Date().getFullYear()}</bdi>{" "}
          <bdi dir="ltr">{labels.footer.studio}</bdi>
        </span>
        <Link href="/privacy">{labels.footer.privacy}</Link>
      </div>
    </footer>
  );
}
