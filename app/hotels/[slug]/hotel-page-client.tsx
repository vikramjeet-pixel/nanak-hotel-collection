"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArchedFrame } from "@/components/arched-frame";
import { RoomCarousel } from "@/components/room-carousel";
import { PhotoGallery } from "@/components/photo-gallery";
import { FadeUpObserver } from "@/components/fade-up-observer";
import type { Hotel } from "@/lib/hotel-data";

interface HotelPageClientProps {
  hotel: Hotel;
}

export function HotelPageClient({ hotel }: HotelPageClientProps) {
  return (
    <FadeUpObserver>
      <main className="pt-24">
        {/* ═══ BREADCRUMB & HEADING ═══ */}
        <section className="px-6 md:px-10 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 fade-up" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-[var(--muted-text)] tracking-wider">
                <li>
                  <Link href="/" className="hover:text-[var(--gold)] transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="text-[var(--hairline)]">/</li>
                <li>
                  <span className="hover:text-[var(--gold)] transition-colors">Hotels</span>
                </li>
                <li aria-hidden="true" className="text-[var(--hairline)]">/</li>
                <li className="text-[var(--foreground)]">{hotel.name}</li>
              </ol>
            </nav>

            <div className="fade-up max-w-3xl">
              <span className="eyebrow mb-5 block">{hotel.location}</span>
              <h1 className="heading-editorial text-[2.6rem] md:text-6xl lg:text-7xl mb-6">
                {hotel.name}
              </h1>
              <p className="font-serif italic text-xl md:text-2xl text-[var(--foreground)] leading-snug">
                {hotel.tagline}
              </p>
              <p className="text-base text-[var(--muted-text)] mt-3">
                {hotel.taglineSub}
              </p>
            </div>
          </div>
        </section>

        {/* ═══ GALLERY — Three arched images ═══ */}
        <section className="px-6 md:px-10 pb-16">
          <div className="max-w-6xl mx-auto fade-up">
            <div className="grid grid-cols-3 gap-3 md:gap-6 items-end">
              <ArchedFrame
                src={hotel.images.gallery[0]?.src ?? null}
                alt={hotel.images.gallery[0]?.alt ?? hotel.name}
                className="w-full aspect-[3/4]"
                priority
              />
              <ArchedFrame
                src={hotel.images.gallery[1]?.src ?? null}
                alt={hotel.images.gallery[1]?.alt ?? hotel.name}
                className="w-full aspect-[2/3]"
                priority
              />
              <ArchedFrame
                src={hotel.images.gallery[2]?.src ?? null}
                alt={hotel.images.gallery[2]?.alt ?? hotel.name}
                className="w-full aspect-[3/4]"
                priority
              />
            </div>
          </div>
        </section>

        {/* ═══ KEY FIGURES ═══ */}
        <section className="px-6 md:px-10 py-12 border-y border-[var(--hairline)]">
          <div className="max-w-6xl mx-auto fade-up">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {hotel.keyFigures.map((fig) => (
                <div key={fig.label} className="text-center">
                  <p className="font-serif text-4xl md:text-5xl font-light text-[var(--foreground)]">
                    {fig.value}
                  </p>
                  <p className="text-[0.8rem] font-semibold text-[var(--muted-text)] tracking-[0.14em] uppercase mt-2">
                    {fig.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Accreditation badges */}
            {hotel.accreditations.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {hotel.accreditations.map((acc) => (
                  <Badge
                    key={acc}
                    variant="outline"
                    className="rounded-sm border-[var(--hairline)] text-[var(--foreground)] text-[0.85rem] px-3.5 py-1.5 h-auto font-medium"
                  >
                    {acc}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ ABOUT / HERITAGE ═══ */}
        {(hotel.heritage || hotel.affiliation || hotel.estate) && (
          <section className="py-20 md:py-28 px-6 md:px-10">
            <div className="max-w-3xl mx-auto fade-up">
              <span className="eyebrow mb-5 block">About the hotel</span>
              <h2 className="heading-editorial text-[2rem] md:text-[2.75rem] mb-8">The <span className="flourish">story</span></h2>
              <div className="space-y-5 text-lg text-[var(--muted-text)] leading-relaxed">
                {hotel.heritage && <p>{hotel.heritage}</p>}
                {hotel.affiliation && <p>{hotel.affiliation}</p>}
                {hotel.estate && <p>{hotel.estate}</p>}
                <p>{hotel.capacity}</p>
              </div>
            </div>
          </section>
        )}

        {/* ═══ ROOMS ═══ */}
        <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--alt)]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 fade-up">
              <span className="eyebrow mb-5 block">Stay</span>
              <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">Rooms &amp; suites</h2>
            </div>
            <div className="fade-up">
              <RoomCarousel
                rooms={hotel.rooms.types}
                standardFeatures={hotel.rooms.standardFeatures}
              />
            </div>
            {hotel.rooms.extras.length > 0 && (
              <div className="mt-10 fade-up">
                <p className="eyebrow mb-4">Also offered</p>
                <div className="flex flex-wrap gap-2">
                  {hotel.rooms.extras.map((extra) => (
                    <Badge
                      key={extra}
                      variant="outline"
                      className="rounded-sm border-[var(--hairline)] text-[var(--foreground)] text-[0.85rem] px-3.5 py-1.5 h-auto font-medium"
                    >
                      {extra}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ═══ DINING ═══ */}
        {hotel.dining && hotel.dining.length > 0 && (
          <section className="py-20 md:py-28 px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 fade-up">
                <span className="eyebrow mb-5 block">Eat &amp; drink</span>
                <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">Dining</h2>
              </div>
              <div className="space-y-10">
                {hotel.dining.map((item, i) => (
                  <div key={item.name} className="fade-up">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="numeral">0{i + 1}</span>
                      <h3 className="heading-card text-2xl text-[var(--foreground)]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-base text-[var(--muted-text)] leading-relaxed pl-8">
                      {item.description}
                    </p>
                    {i < hotel.dining!.length - 1 && <hr className="hairline mt-8" />}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ EVENTS ═══ */}
        {hotel.events && hotel.events.length > 0 && (
          <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--alt)]">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 fade-up">
                <span className="eyebrow mb-5 block">Celebrate &amp; meet</span>
                <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">Weddings &amp; events</h2>
              </div>
              <div className="space-y-10">
                {hotel.events.map((item, i) => (
                  <div key={item.name} className="fade-up">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="numeral">0{i + 1}</span>
                      <h3 className="heading-card text-2xl text-[var(--foreground)]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-base text-[var(--muted-text)] leading-relaxed pl-8">
                      {item.description}
                    </p>
                    {i < hotel.events!.length - 1 && <hr className="hairline mt-8" />}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ WELLNESS & LEISURE ═══ */}
        {hotel.wellness && hotel.wellness.length > 0 && (
          <section className="py-20 md:py-28 px-6 md:px-10">
            <div className={`mx-auto ${hotel.wellnessImage ? "max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center" : "max-w-4xl"}`}>
              {hotel.wellnessImage && (
                <ArchedFrame
                  src={hotel.wellnessImage.src}
                  alt={hotel.wellnessImage.alt}
                  className="fade-up w-full aspect-[4/5]"
                />
              )}
              <div>
                <div className="mb-10 fade-up">
                  <span className="eyebrow mb-5 block">Unwind</span>
                  <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">Wellness <span className="flourish">&amp;</span> leisure</h2>
                </div>
                <ul className="space-y-3 fade-up">
                  {hotel.wellness.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base text-[var(--muted-text)] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ═══ AMENITIES ═══ */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <section className="py-20 md:py-28 px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 fade-up">
                <span className="eyebrow mb-5 block">Grounds</span>
                <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">The estate</h2>
              </div>
              <ul className="space-y-3 fade-up">
                {hotel.amenities.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-[var(--muted-text)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ═══ IN-ROOM FEATURES ═══ */}
        {hotel.inRoomFeatures && hotel.inRoomFeatures.length > 0 && (
          <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--alt)]">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 fade-up">
                <span className="eyebrow mb-5 block">Comforts</span>
                <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">In every room</h2>
              </div>
              <ul className="space-y-3 fade-up">
                {hotel.inRoomFeatures.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-[var(--muted-text)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ═══ PHOTO GALLERY ═══ */}
        {hotel.photos && hotel.photos.length > 0 && (
          <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--alt)]">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 fade-up">
                <span className="eyebrow mb-5 block">Gallery</span>
                <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">A look around</h2>
              </div>
              <div className="fade-up">
                <PhotoGallery photos={hotel.photos} />
              </div>
            </div>
          </section>
        )}

        {/* ═══ LOCATION & TRANSPORT ═══ */}
        <section id="location" className="py-20 md:py-28 px-6 md:px-10 border-t border-[var(--hairline)]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 fade-up">
              <span className="eyebrow mb-5 block">Location</span>
              <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">Finding us</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 fade-up">
              {/* Address & contact */}
              <div>
                <p className="eyebrow mb-4">Address</p>
                <p className="text-base text-[var(--muted-text)] leading-relaxed mb-6">
                  {hotel.contact.address}
                </p>
                {hotel.contact.phone && (
                  <p className="text-sm text-[var(--muted-text)] mb-1">
                    <span className="text-[var(--foreground)]">Phone:</span>{" "}
                    <a href={`tel:${hotel.contact.phone.replace(/\s/g, "")}`} className="hover:text-[var(--gold)] transition-colors">
                      {hotel.contact.phone}
                    </a>
                  </p>
                )}
                {hotel.contact.email && (
                  <p className="text-sm text-[var(--muted-text)]">
                    <span className="text-[var(--foreground)]">Email:</span>{" "}
                    <a href={`mailto:${hotel.contact.email}`} className="hover:text-[var(--gold)] transition-colors">
                      {hotel.contact.email}
                    </a>
                  </p>
                )}

                <hr className="hairline my-8" />

                {/* Hours */}
                <p className="eyebrow mb-4">Hours</p>
                <div className="space-y-2 text-sm text-[var(--muted-text)]">
                  {hotel.hours.reception && (
                    <p><span className="text-[var(--foreground)]">Reception:</span> {hotel.hours.reception}</p>
                  )}
                  <p><span className="text-[var(--foreground)]">Check-in:</span> {hotel.hours.checkIn}</p>
                  <p><span className="text-[var(--foreground)]">Check-out:</span> {hotel.hours.checkOut}</p>
                </div>
              </div>

              {/* Getting there */}
              <div>
                <p className="eyebrow mb-4">Getting There</p>
                <div className="space-y-4">
                  {hotel.gettingThere.map((route) => (
                    <div key={route.mode}>
                      <p className="text-sm text-[var(--foreground)] mb-1">{route.mode}</p>
                      <p className="text-base text-[var(--muted-text)] leading-relaxed">{route.detail}</p>
                    </div>
                  ))}
                </div>

                {hotel.localDining && (
                  <>
                    <hr className="hairline my-8" />
                    <p className="eyebrow mb-4">Local Dining</p>
                    <p className="text-sm text-[var(--muted-text)]">{hotel.localDining}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ NEARBY SIGHTS ═══ */}
        {hotel.nearbySights && hotel.nearbySights.length > 0 && (
          <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--alt)]">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 fade-up">
                <span className="eyebrow mb-5 block">Local area</span>
                <h2 className="heading-editorial text-[2rem] md:text-[2.75rem]">Nearby</h2>
              </div>
              <div className="space-y-4 fade-up">
                {hotel.nearbySights.map((sight, i) => (
                  <div key={sight.name} className="flex items-baseline justify-between gap-4 py-3 border-b border-[var(--hairline)]">
                    <div className="flex items-baseline gap-3">
                      <span className="numeral text-xs">0{i + 1}</span>
                      <span className="text-sm text-[var(--foreground)]">{sight.name}</span>
                    </div>
                    <span className="text-xs text-[var(--muted-text)] tracking-wider shrink-0">
                      {sight.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ GET IN TOUCH CTA ═══ */}
        <section className="py-24 md:py-32 px-6 md:px-10 text-center">
          <div className="max-w-2xl mx-auto fade-up">
            <span className="eyebrow mb-4 block">Plan your visit</span>
            <h2 className="heading-editorial text-4xl md:text-[3.4rem] mb-10">
              Get in <span className="flourish">touch</span>
            </h2>
            <a
              href="#location"
              className="btn btn-primary"
            >
              Contact the hotel
            </a>
          </div>
        </section>
      </main>
    </FadeUpObserver>
  );
}
