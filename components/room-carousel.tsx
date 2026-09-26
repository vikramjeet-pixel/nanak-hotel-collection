"use client";

import { useRef } from "react";
import type { RoomType } from "@/lib/hotel-data";
import { ArchedFrame } from "@/components/arched-frame";

interface RoomCarouselProps {
  rooms: RoomType[];
  standardFeatures: string;
}

export function RoomCarousel({ rooms, standardFeatures }: RoomCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.65;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <p className="text-base text-[var(--muted-text)] mb-10 max-w-xl leading-relaxed">
        {standardFeatures}
      </p>

      <div className="relative">
        {/* Nav arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full border border-[var(--hairline)] bg-[var(--background)] text-[var(--foreground)] shadow-lg hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-colors duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Previous room"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full border border-[var(--hairline)] bg-[var(--background)] text-[var(--foreground)] shadow-lg hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-colors duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Next room"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="room-carousel flex gap-6 overflow-x-auto scroll-smooth pb-4 px-2"
          role="list"
        >
          {rooms.map((room, i) => (
            <div
              key={room.name}
              className="flex-shrink-0 w-[300px] md:w-[340px]"
              role="listitem"
            >
              <ArchedFrame
                src={room.image ?? null}
                alt={room.name}
                className="w-full h-[220px] md:h-[260px] mb-5"
                sizes="340px"
              />
              <div className="px-1">
                <span className="numeral mr-2">0{i + 1}</span>
                <h3 className="inline heading-card text-2xl text-[var(--foreground)]">
                  {room.name}
                </h3>
                <p className="eyebrow mt-2">{room.bed}</p>
                {room.size && (
                  <p className="text-sm text-[var(--muted-text)] mt-1.5">{room.size}{room.maxGuests ? ` · ${room.maxGuests}` : ""}</p>
                )}
                <p className="text-base text-[var(--muted-text)] mt-3 leading-relaxed">{room.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
