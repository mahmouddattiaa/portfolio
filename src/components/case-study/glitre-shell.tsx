import type { ReactNode } from "react";
import { CaseStudyGrain } from "./grain";
import { ThemeGate } from "./theme-gate";

const themeOverrideScript = `(function(){try{var p=new URLSearchParams(window.location.search);var t=p.get('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;try{window.localStorage.setItem('kepler-theme',t)}catch(e){}}}catch(e){}})();`;

/**
 * Shared chrome for the four routes under /work/glitre-loyalty-platform.
 * Renders the pre-paint `?theme=light|dark` override script, the client-side
 * `ThemeGate` companion, the grain overlay, and the `cs-shell` / `cs-layout`
 * grid. Wraps the page-specific rail + content (passed in as children).
 *
 * The override script is the same one the existing /work/[slug] page uses; it
 * lives inside `<article>` (the cs-page element) to match that working pattern,
 * which avoids the React 19 "Encountered a script tag while rendering React
 * component" error that surfaces when the same script sits in a layout
 * element. Each page wraps its output in `<article className="cs-page
 * glitre-page">` + `<GlitreShell>` so the script is a child of `<article>` at
 * the page level — the position the existing dynamic page has shipped for.
 */
export function GlitreShell({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: themeOverrideScript,
        }}
      />
      <ThemeGate />
      <CaseStudyGrain />
      <div className="cs-shell">
        <div className="cs-layout glitre-layout">{children}</div>
      </div>
    </>
  );
}