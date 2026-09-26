import { HOTELS, getHotelById } from "@/lib/hotel-data";
import { notFound } from "next/navigation";
import { HotelPageClient } from "./hotel-page-client";
import type { Metadata } from "next";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return HOTELS.map((hotel) => ({ slug: hotel.id }));
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotelById(slug);
  if (!hotel) return { title: "Hotel Not Found — Nanak Hotel Collection" };

  return {
    title: `${hotel.name} — Nanak Hotel Collection`,
    description: hotel.shortDescription,
  };
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const hotel = getHotelById(slug);
  if (!hotel) notFound();

  return <HotelPageClient hotel={hotel} />;
}
