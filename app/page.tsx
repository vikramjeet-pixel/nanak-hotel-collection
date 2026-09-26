"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HOTELS } from "@/lib/hotel-data";
import { ArchedFrame } from "@/components/arched-frame";
import { FadeUpObserver } from "@/components/fade-up-observer";

const HEADER_HEIGHT = 72;

/** 0 before `edge0`, 1 after `edge1`, smooth in between */
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      {muted ? (
        <path d="m22 9-6 6M16 9l6 6" />
      ) : (
        <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
      )}
    </svg>
  );
}

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  // "Open the door": as the page scrolls, the arched video widens to full width
  // and its rounded top flattens, then it stays pinned full-screen briefly.
  useEffect(() => {
    const track = trackRef.current;
    const door = doorRef.current;
    if (!track || !door) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const distance = trackTop - HEADER_HEIGHT;
      const progress = reduceMotion.matches || distance <= 0
        ? 1
        : Math.min(1, Math.max(0, window.scrollY / distance));

      const startWidth = window.innerWidth < 768 ? 0.72 : 0.4;
      const widthFraction = startWidth + (1 - startWidth) * smoothstep(0, 1, progress);
      const width = widthFraction * track.clientWidth;
      const radius = (width / 2) * (1 - smoothstep(0.7, 1, progress));

      door.style.width = `${widthFraction * 100}%`;
      door.style.borderRadius = `${radius}px ${radius}px 0 0`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <FadeUpObserver>
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative">
          {/* Intro — the arch peeks up from below this */}
          <div className="flex min-h-[74svh] md:min-h-[76svh] flex-col items-center justify-center px-6 pt-[96px] pb-8 text-center">
            <p className="mb-6 md:mb-8 max-w-2xl font-ui text-lg md:text-xl leading-relaxed text-[var(--muted-text)]">
              Welcome to Nanak Hotel Collection — country-house hotels in the heart of England
            </p>
            <h1 className="heading-display text-[2.3rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] max-w-6xl mx-auto">
              Open the door
              <br />
              to inspiration
            </h1>
          </div>

          {/* Scroll track — the door is pinned under the header while it opens, then holds full-screen */}
          <div ref={trackRef} className="relative h-[calc(145svh-72px)]">
            <div className="sticky top-[72px] flex h-[calc(100svh-72px)] justify-center">
              <div ref={doorRef} className="hero-door relative h-full overflow-hidden bg-[var(--alt)]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                >
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>

                <button
                  onClick={toggleSound}
                  className="btn btn-glass btn-sm absolute bottom-5 right-5 md:bottom-8 md:right-8 z-10"
                  aria-label={muted ? "Turn sound on" : "Turn sound off"}
                  aria-pressed={!muted}
                >
                  <SoundIcon muted={muted} />
                  {muted ? "Sound off" : "Sound on"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ OUR HOTELS ═══ */}
        <section className="py-24 md:py-32 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-24 fade-up">
              <span className="eyebrow mb-5 block">The collection</span>
              <h2 className="heading-editorial text-4xl md:text-[3.4rem]">Our hotels</h2>
            </div>

            <div className="space-y-28 md:space-y-36">
              {HOTELS.map((hotel, index) => (
                <div
                  key={hotel.id}
                  className={`fade-up flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-10 md:gap-16 items-center`}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <ArchedFrame
                      src={hotel.images.gallery[0]?.src ?? null}
                      alt={hotel.images.gallery[0]?.alt ?? hotel.name}
                      className="w-full aspect-[3/4]"
                    />
                  </div>

                  {/* Info */}
                  <div className="w-full md:w-1/2 max-w-md">
                    <span className="numeral block mb-4">0{index + 1}</span>
                    <h3 className="heading-card text-3xl md:text-[2.75rem] mb-3">
                      {hotel.name}
                    </h3>
                    <p className="eyebrow mb-6">
                      {hotel.location}
                    </p>
                    <p className="font-serif italic text-xl text-[var(--foreground)] leading-snug mb-4">
                      {hotel.tagline}
                    </p>
                    <p className="text-base text-[var(--muted-text)] leading-relaxed mb-10">
                      {hotel.shortDescription}
                    </p>
                    <Link href={`/hotels/${hotel.id}`} className="btn btn-outline">
                      Discover the hotel
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="fade-up mt-28 md:mt-36 text-center">
              <hr className="hairline max-w-[4rem] mx-auto mb-8" />
              <p className="eyebrow">More hotels coming soon</p>
            </div>
          </div>
        </section>

        {/* ═══ DINING & SPA ═══ */}
        <section id="dining-spa" className="py-24 md:py-32 px-6 md:px-10 bg-[var(--alt)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-24 fade-up">
              <span className="eyebrow mb-5 block">Eat, drink &amp; unwind</span>
              <h2 className="heading-editorial text-4xl md:text-[3.4rem]">
                Dining <span className="flourish">&amp;</span> spa
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Dining */}
              <div className="fade-up">
                <ArchedFrame
                  src="/images/kings-court/restaurant.jpg"
                  alt="The Restaurant at Kings Court, with French doors onto the garden"
                  className="w-full aspect-[3/4] mb-8"
                />
                <h3 className="heading-card text-2xl md:text-3xl mb-3">Dining</h3>
                <p className="text-base text-[var(--muted-text)] leading-relaxed">
                  From the country-house warmth of The Restaurant & Brasserie at Kings Court to the traditional charm of The Twisted Boot Pub, each of our kitchens has its own character.
                </p>
              </div>

              {/* Spa */}
              <div className="fade-up">
                <ArchedFrame
                  src="/images/evesham/indoor-pool.jpg"
                  alt="Heated indoor swimming pool at the Evesham Hotel"
                  className="w-full aspect-[3/4] mb-8"
                />
                <h3 className="heading-card text-2xl md:text-3xl mb-3">Wellness</h3>
                <p className="text-base text-[var(--muted-text)] leading-relaxed">
                  The Evesham Hotel offers a heated indoor swimming pool, on-site spa salon, and landscaped garden — a quiet place to unwind after a day in the Vale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ JOURNAL ═══ */}
        <section id="journal" className="py-24 md:py-32 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-24 fade-up">
              <span className="eyebrow mb-5 block">Stories &amp; guides</span>
              <h2 className="heading-editorial text-4xl md:text-[3.4rem]">The journal</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10 fade-up">
              {[
                {
                  title: "A Walk Through Warwickshire",
                  snippet: "Exploring the footpaths and country lanes around Kings Court.",
                  image: "/images/kings-court/aerial-view.jpg",
                  alt: "Kings Court set among Warwickshire fields and woodland",
                },
                {
                  title: "Afternoon Tea, Done Properly",
                  snippet: "The art of a proper afternoon tea at Kings Court.",
                  image: "/images/kings-court/restaurant-tables.jpg",
                  alt: "Tables laid beside garden-facing windows at Kings Court",
                },
                {
                  title: "The Vale in Bloom",
                  snippet: "Spring gardens and local walks from the Evesham Hotel.",
                  image: "/images/evesham/gardens-side.jpg",
                  alt: "Planted borders and lawns beside the Evesham Hotel",
                },
              ].map((story, i) => (
                <article key={i} className="group">
                  <ArchedFrame
                    src={story.image}
                    alt={story.alt}
                    className="w-full aspect-[4/5] mb-6"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <span className="numeral block mb-2">0{i + 1}</span>
                  <h3 className="heading-card text-2xl mb-2 transition-colors group-hover:text-[var(--gold)]">
                    {story.title}
                  </h3>
                  <p className="text-base text-[var(--muted-text)] leading-relaxed">
                    {story.snippet}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </FadeUpObserver>
  );
}
