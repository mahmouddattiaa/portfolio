"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProjectCatalogCore, ProjectMedia } from "@/lib/content";

export function CaseStudyMediaGallery({ project, heading }: { project: ProjectCatalogCore; heading?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Extract<ProjectMedia, { kind: "image" }> | null>(null);
  const images = project.media.filter((item): item is Extract<ProjectMedia, { kind: "image" }> => item.kind === "image");
  const videos = project.media.filter((item): item is Extract<ProjectMedia, { kind: "video" }> => item.kind === "video");
  if (images.length === 0 && videos.length === 0) return null;

  function openImage(media: Extract<ProjectMedia, { kind: "image" }>) {
    setSelected(media);
    dialog.current?.showModal();
  }

  return (
    <section id="section-gallery" className="cs-section cs-media-section" aria-labelledby="cs-gallery-title">
      <div>
        <p className="cs-section-eyebrow">Verified project media</p>
        <h2 id="cs-gallery-title" className="cs-section-heading">{heading ?? "Screens and walkthroughs from the project record."}</h2>
      </div>
      {videos.length ? (
        <div className="cs-video-grid" aria-label="Project video walkthroughs">
          {videos.map((media) => (
            <details key={media.src} className="cs-video-card" onToggle={(event) => {
              if (!event.currentTarget.open) event.currentTarget.querySelector("video")?.pause();
            }}>
              <summary>Watch video walkthrough</summary>
              <figure>
                <video controls preload="metadata" poster={images[0]?.src} aria-label={media.alt}>
                  <source src={media.src} type="video/mp4" />
                </video>
                <figcaption>{media.caption}</figcaption>
              </figure>
            </details>
          ))}
        </div>
      ) : null}
      {images.length ? (
        <ul className={`cs-media-grid${project.slug === "stayease" ? " cs-media-grid--stayease" : ""}`}>
          {images.map((media) => (
            <li key={media.src}>
              <figure className="cs-media-card">
                <button type="button" className="cs-media-open" onClick={() => openImage(media)} aria-label={`Enlarge: ${media.alt}`}>
                  <span className={`cs-media-frame${project.slug === "stayease" ? " cs-media-frame--portrait" : ""}`}>
                    <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 767px) 88vw, (max-width: 1199px) 42vw, 30vw" loading="lazy" />
                  </span>
                </button>
                <figcaption>{media.caption ?? media.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
      <dialog ref={dialog} className="cs-media-dialog" aria-labelledby="cs-media-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
        <div className="cs-media-dialog-content">
          <header><h3 id="cs-media-dialog-title">{selected?.caption ?? selected?.alt ?? "Project capture"}</h3><button type="button" className="cs-media-close" onClick={() => dialog.current?.close()}>Close</button></header>
          {selected ? <Image src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} sizes="90vw" /> : null}
        </div>
      </dialog>
    </section>
  );
}
