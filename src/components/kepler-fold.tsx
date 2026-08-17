import Image from "next/image";

type KeplerFoldProps = {
  className?: string;
  /**
   * `next/image` loading hint. Default "eager" — the fold is the LCP element
   * on the hero and must not be lazy-loaded.
   */
  loading?: "eager" | "lazy";
  /** `next/image` priority hint. Takes precedence over `loading` when true. */
  priority?: boolean;
  /**
   * Override the source. The single global-atelier fold asset is used by
   * default so we don't have to ship a separate hero/fragment PNG per section.
   */
  src?: string;
  /**
   * Intrinsic image size used when `fill` is false. Defaults match the source
   * asset so `<Image>` doesn't warn about missing dimensions.
   */
  width?: number;
  height?: number;
  /** Use `fill` mode (image fills its parent). Default true. */
  fill?: boolean;
  /** Forwarded to next/image; sensible default covers hero + fragments. */
  sizes?: string;
};

export function KeplerFold({
  className = "",
  loading = "eager",
  priority = false,
  fill = true,
  src = "/media/kepler-fold-global-atelier-v1.png",
  width = 1440,
  height = 900,
  sizes = "(max-width: 767px) 100vw, 62vw",
}: KeplerFoldProps) {
  return (
    <div className={`kepler-fold ${className}`} aria-hidden="true">
      <Image
        src={src}
        alt=""
        {...(fill
          ? { fill }
          : { width, height })}
        priority={priority}
        loading={priority ? "eager" : loading}
        sizes={sizes}
      />
    </div>
  );
}
