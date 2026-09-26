"use client";

import Image from "next/image";

interface ArchedFrameProps {
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Responsive image width hint for next/image */
  sizes?: string;
}

/**
 * An image inside an arched (rounded-top, flat-bottom) doorway frame.
 * When src is null, shows a labelled placeholder.
 */
export function ArchedFrame({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ArchedFrameProps) {
  return (
    <div className={`arch overflow-hidden relative ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover img-zoom"
          sizes={sizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        <div className="placeholder-img w-full h-full">
          <span className="text-[var(--muted-text)] text-xs tracking-wider">
            [ {alt} ]
          </span>
        </div>
      )}
    </div>
  );
}
