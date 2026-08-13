import Image from "next/image";

type KeplerFoldProps = {
  className?: string;
  priority?: boolean;
};

export function KeplerFold({
  className = "",
  priority = false,
}: KeplerFoldProps) {
  return (
    <div className={`kepler-fold ${className}`} aria-hidden="true">
      <Image
        src="/media/kepler-fold-global-atelier-v1.png"
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 767px) 100vw, 62vw"
      />
    </div>
  );
}
