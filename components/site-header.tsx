"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-provider";
import { HOTELS } from "@/lib/hotel-data";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [hotelsOpen, setHotelsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestinationsOpen(false);
      }
      if (hotelsRef.current && !hotelsRef.current.contains(e.target as Node)) {
        setHotelsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinkClass =
    "link-underline font-ui text-[1.05rem] tracking-[0.02em] transition-colors hover:text-[var(--gold)] cursor-pointer";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--hairline)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-10 h-[72px]">
        {/* Wordmark */}
        <Link href="/" className="flex flex-col items-center leading-none select-none" aria-label="Nanak Hotel Collection home">
          <span className="font-display text-[1.75rem] tracking-[0.2em] pl-[0.2em] text-[var(--foreground)]">
            NANAK
          </span>
          <span className="font-ui text-[0.68rem] tracking-[0.3em] pl-[0.3em] text-[var(--gold)] mt-1 whitespace-nowrap">
            HOTEL COLLECTION
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
          {/* Destinations dropdown */}
          <div ref={destRef} className="relative">
            <button
              className={navLinkClass}
              onClick={() => {
                setDestinationsOpen(!destinationsOpen);
                setHotelsOpen(false);
              }}
              aria-expanded={destinationsOpen}
              aria-haspopup="true"
            >
              Destinations
            </button>
            {destinationsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 py-4 px-6 min-w-[220px] bg-[var(--background)] border border-[var(--hairline)] rounded-sm shadow-2xl animate-in fade-in-0 slide-in-from-top-2 duration-300">
                {HOTELS.map((hotel) => (
                  <Link
                    key={hotel.id}
                    href={`/hotels/${hotel.id}`}
                    className="block py-2.5 font-serif text-lg text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
                    onClick={() => setDestinationsOpen(false)}
                  >
                    {hotel.region}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hotels dropdown */}
          <div ref={hotelsRef} className="relative">
            <button
              className={navLinkClass}
              onClick={() => {
                setHotelsOpen(!hotelsOpen);
                setDestinationsOpen(false);
              }}
              aria-expanded={hotelsOpen}
              aria-haspopup="true"
            >
              Hotels
            </button>
            {hotelsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 py-4 px-6 min-w-[260px] bg-[var(--background)] border border-[var(--hairline)] rounded-sm shadow-2xl animate-in fade-in-0 slide-in-from-top-2 duration-300">
                {HOTELS.map((hotel) => (
                  <Link
                    key={hotel.id}
                    href={`/hotels/${hotel.id}`}
                    className="block py-2.5 font-serif text-lg text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
                    onClick={() => setHotelsOpen(false)}
                  >
                    {hotel.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#dining-spa" className={navLinkClass}>
            Dining & Spa
          </Link>
          <Link href="/#journal" className={navLinkClass}>
            Journal
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center gap-2 font-ui text-[0.95rem] text-[var(--muted-text)] hover:text-[var(--gold)] transition-colors cursor-pointer"
            aria-label={`Switch to ${theme === "noir" ? "ivory" : "noir"} theme`}
          >
            <span className={`w-8 h-4 rounded-full relative transition-colors ${
              theme === "noir" ? "bg-[var(--gold)]" : "bg-[var(--muted-text)]"
            }`}>
              <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-[var(--background)] transition-transform ${
                theme === "noir" ? "left-0.5" : "left-[calc(100%-14px)]"
              }`} />
            </span>
            <span>{theme === "noir" ? "Noir" : "Ivory"}</span>
          </button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            {/* SheetTrigger (Base UI) renders its own <button>, so style it directly */}
            <SheetTrigger
              className="btn btn-outline btn-sm lg:hidden"
              aria-label="Open menu"
            >
              Menu
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] bg-[var(--background)] border-l border-[var(--hairline)] p-8 pt-16"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
                <span className="eyebrow">Explore</span>
                {HOTELS.map((hotel) => (
                  <Link
                    key={hotel.id}
                    href={`/hotels/${hotel.id}`}
                    className="heading-card text-3xl text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {hotel.name}
                  </Link>
                ))}
                <hr className="hairline my-2" />
                <Link href="/#dining-spa" className="font-ui text-lg text-[var(--muted-text)] hover:text-[var(--gold)] transition-colors" onClick={() => setMobileOpen(false)}>
                  Dining & Spa
                </Link>
                <Link href="/#journal" className="font-ui text-lg text-[var(--muted-text)] hover:text-[var(--gold)] transition-colors" onClick={() => setMobileOpen(false)}>
                  Journal
                </Link>
                <hr className="hairline my-2" />
                {/* Mobile theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 text-sm text-[var(--muted-text)] hover:text-[var(--gold)] transition-colors cursor-pointer"
                >
                  <span className={`w-8 h-4 rounded-full relative transition-colors ${
                    theme === "noir" ? "bg-[var(--gold)]" : "bg-[var(--muted-text)]"
                  }`}>
                    <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-[var(--background)] transition-transform ${
                      theme === "noir" ? "left-0.5" : "left-[calc(100%-14px)]"
                    }`} />
                  </span>
                  <span className="tracking-widest uppercase text-xs">{theme === "noir" ? "Noir" : "Ivory"}</span>
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
