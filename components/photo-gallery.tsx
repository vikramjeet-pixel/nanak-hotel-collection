"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "@/lib/hotel-data";

interface PhotoGalleryProps {
  photos: GalleryImage[];
}

/** Grid layout per position: a large lead photo, then a mosaic, with the last one wide */
function tileClass(index: number, count: number) {
  if (index === 0) return "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto";
  if (index === count - 1 && count % 3 === 1) return "aspect-[4/3] md:col-span-3 md:aspect-[3/1]";
  return "aspect-[4/3]";
}

/**
 * Mosaic of hotel photos with captions. Clicking a photo opens it full-screen;
 * arrow keys step through, Escape closes.
 */
export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const items = photos.filter((p): p is GalleryImage & { src: string } => Boolean(p.src));
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const current = open === null ? null : items[open];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {items.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-[2px] bg-[var(--alt)] cursor-zoom-in ${tileClass(i, items.length)}`}
            aria-label={`View photo: ${photo.caption ?? photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {photo.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-left font-ui text-sm md:text-base text-white">
                {photo.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Portalled to <body>: the fade-up wrapper uses transform, which would trap position:fixed */}
      {current && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.alt}
          className="fixed inset-0 z-[60] flex flex-col bg-[#0b0a09] px-4 pb-6 pt-4 md:px-10"
          onClick={close}
        >
          <div className="flex items-center justify-between text-white">
            <span className="font-ui text-sm tracking-[0.1em] text-white/70">
              {open! + 1} / {items.length}
            </span>
            <button type="button" onClick={close} className="btn btn-glass btn-sm" aria-label="Close photo">
              Close
            </button>
          </div>

          <div className="relative my-4 flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
          </div>

          <div className="flex items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)} className="btn btn-glass btn-sm" aria-label="Previous photo">
              ← Prev
            </button>
            <p className="font-ui text-center text-base text-white">{current.caption ?? current.alt}</p>
            <button type="button" onClick={() => step(1)} className="btn btn-glass btn-sm" aria-label="Next photo">
              Next →
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
