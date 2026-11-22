"use client";

import type { ProjectMedia } from "@/lib/content";

export function WorkGridVideo({
  media,
  poster,
}: {
  media: Extract<ProjectMedia, { kind: "video" }>;
  poster?: string;
}) {
  return (
    <details className="wv2-project-video" onToggle={(event) => {
      if (!event.currentTarget.open) event.currentTarget.querySelector("video")?.pause();
    }}>
      <summary>Play walkthrough</summary>
      <video controls preload="metadata" poster={poster} aria-label={media.alt}>
        <source src={media.src} type="video/mp4" />
      </video>
    </details>
  );
}
