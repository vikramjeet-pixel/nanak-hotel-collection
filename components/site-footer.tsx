import Link from "next/link";
import Image from "next/image";
import { HOTELS } from "@/lib/hotel-data";

export function SiteFooter() {
  return (
    <footer className="site-footer py-20 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Top: logo + hotel links */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="select-none" aria-label="Nanak Hotel Collection home">
              <Image
                src="/logo-nanak-hotels.jpg"
                alt="Nanak Hotels — two gold lions flanking an NH monogram"
                width={160}
                height={160}
                className="mix-blend-lighten"
              />
            </Link>
          </div>

          {/* Hotels */}
          <div className="flex flex-col gap-3">
            <span className="font-ui text-[0.85rem] tracking-[0.14em] uppercase text-[#d2ad5c] mb-2">
              Our Hotels
            </span>
            {HOTELS.map((hotel) => (
              <Link
                key={hotel.id}
                href={`/hotels/${hotel.id}`}
                className="text-sm text-[#a89f8c] hover:text-[#d2ad5c] transition-colors"
              >
                {hotel.name}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-ui text-[0.85rem] tracking-[0.14em] uppercase text-[#d2ad5c] mb-2">
              Contact
            </span>
            {HOTELS.map((hotel) => (
              <div key={hotel.id} className="mb-3">
                <p className="text-sm text-[#eee6d4] mb-1">{hotel.name}</p>
                <p className="text-xs text-[#a89f8c] leading-relaxed">
                  {hotel.contact.address}
                </p>
                {hotel.contact.phone && (
                  <a
                    href={`tel:${hotel.contact.phone.replace(/\s/g, "")}`}
                    className="text-xs text-[#a89f8c] hover:text-[#d2ad5c] transition-colors"
                  >
                    {hotel.contact.phone}
                  </a>
                )}
                {hotel.contact.email && (
                  <a
                    href={`mailto:${hotel.contact.email}`}
                    className="block text-xs text-[#a89f8c] hover:text-[#d2ad5c] transition-colors"
                  >
                    {hotel.contact.email}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <span className="font-ui text-[0.85rem] tracking-[0.14em] uppercase text-[#d2ad5c] mb-2">
              Explore
            </span>
            <Link href="/#dining-spa" className="text-sm text-[#a89f8c] hover:text-[#d2ad5c] transition-colors">
              Dining & Spa
            </Link>
            <Link href="/#journal" className="text-sm text-[#a89f8c] hover:text-[#d2ad5c] transition-colors">
              Journal
            </Link>
          </div>
        </div>

        <hr className="border-t border-[rgba(238,230,212,0.12)] mb-8" />

        <p className="text-xs text-[#a89f8c] tracking-wider text-center">
          © {new Date().getFullYear()} Nanak Hotel Collection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
