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
  { label: "Studio", href: "/#studio" },
];

function BrandMark() {
  return (
    <Image
      src="/brand/kepler-dev-horizontal-reverse.svg"
      alt="Kepler Dev"
      width={179}
      height={32}
      priority
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
                  <BrandMark />
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
      <header className="site-header atelier-header">
        <div className="shell header-inner">
          <Link
            className="atelier-wordmark"
            href="/"
            aria-label="Kepler Dev home"
          >
            <BrandMark />
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
              {isArabic ? "ابدأ الحديث معنا" : "Start a conversation"}
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

export function Footer() {
  return (
    <footer className="site-footer atelier-footer">
      <div className="shell footer-grid">
        <div>
          <Link
            className="atelier-wordmark"
            href="/"
            aria-label="Kepler Dev home"
          >
            <BrandMark />
          </Link>
          <p>Independent digital product studio · Cairo · Working worldwide</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="atelier-footer-meta">
          <Link href="/contact">Start a conversation</Link>
          <span>© {new Date().getFullYear()} Kepler Dev</span>
        </div>
      </div>
    </footer>
  );
}
