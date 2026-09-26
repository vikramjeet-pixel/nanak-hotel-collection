/* ─── Nanak Hotels — Structured Data ─── */

export interface GettingThere {
  mode: string;
  detail: string;
}

export interface RoomType {
  name: string;
  bed: string;
  size?: string;
  maxGuests?: string;
  description: string;
  image?: string;
}

export interface DiningEntry {
  name: string;
  description: string;
}

export interface EventEntry {
  name: string;
  description: string;
}

export interface NearbySight {
  name: string;
  detail: string;
}

export interface KeyFigure {
  label: string;
  value: string;
}

export interface GalleryImage {
  src: string | null;
  alt: string;
  caption?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  region: string;
  tagline: string;
  taglineSub: string;
  shortDescription: string;
  heritage: string | null;
  affiliation: string | null;
  estate: string | null;
  capacity: string;
  rating?: string;
  reviews?: string;
  rates?: string;
  accreditations: string[];
  images: {
    hero: string | null;
    gallery: GalleryImage[];
  };
  keyFigures: KeyFigure[];
  contact: {
    address: string;
    phone: string | null;
    email: string | null;
  };
  hours: {
    reception: string | null;
    checkIn: string;
    checkOut: string;
  };
  gettingThere: GettingThere[];
  rooms: {
    standardFeatures: string;
    types: RoomType[];
    extras: string[];
  };
  dining: DiningEntry[] | null;
  events: EventEntry[] | null;
  amenities: string[] | null;
  wellness: string[] | null;
  wellnessImage?: GalleryImage;
  /** Extra photos shown in the "A look around" gallery on the hotel page */
  photos?: GalleryImage[];
  inRoomFeatures?: string[];
  nearbySights: NearbySight[] | null;
  localDining?: string;
}

export const HOTELS: Hotel[] = [
  {
    id: "kings-court",
    name: "Kings Court Hotel",
    location: "Alcester, Warwickshire",
    region: "Warwickshire",
    tagline: "A Country Escape Near Stratford-upon-Avon",
    taglineSub: "Timeless elegance · Warwickshire countryside · Unforgettable experiences",
    shortDescription:
      "Dating back to 1642, Kings Court is a historic Tudor manor house set within four acres of manicured private grounds. A Best Western–affiliated country retreat with 61 en-suite bedrooms, fine dining and a fully licensed wedding venue.",
    heritage: "Dating back to 1642; historic Tudor manor house",
    affiliation: "Part of the Best Western chain",
    estate: "Set within 4 acres of manicured private grounds and gardens",
    capacity: "61 en-suite bedrooms",
    accreditations: [
      "AA 3-Star Rated Hotel",
      "Best Country Hotel (2024)",
      "Licensed Wedding Venue",
      "Eco-Certified Property",
    ],
    images: {
      hero: null,
      gallery: [
        { src: "/images/kings-court/reception-entrance.jpg", alt: "Kings Court Hotel reception entrance behind a tree-lined planted island" },
        { src: "/images/kings-court/aerial-view.jpg", alt: "Aerial view of the Kings Court estate and surrounding Warwickshire countryside" },
        { src: "/images/kings-court/king-room.jpg", alt: "King room with oak headboard, armchair and writing desk" },
      ],
    },
    keyFigures: [
      { label: "Established", value: "1642" },
      { label: "Bedrooms", value: "61" },
      { label: "Grounds", value: "4 acres" },
      { label: "Rating", value: "AA 3-Star" },
    ],
    contact: {
      address: "Kings Court Hotel, Kings Coughton, Alcester, Warwickshire, B49 5QQ",
      phone: "01789 763 111",
      email: "info@kingscourthotel.co.uk",
    },
    hours: {
      reception: "7:00 AM – 11:00 PM",
      checkIn: "From 3:00 PM",
      checkOut: "By 11:00 AM",
    },
    gettingThere: [
      { mode: "By road", detail: "6 miles from Stratford-upon-Avon; 15 minutes from the M42 (Junction 15)" },
      { mode: "By rail", detail: "Stratford-upon-Avon Station (6 miles); Warwick Parkway Station (14 miles)" },
      { mode: "By air", detail: "Birmingham Airport (BHX – 22 miles); London Heathrow (LHR – 100 miles)" },
      { mode: "Parking", detail: "On-site parking available" },
    ],
    rooms: {
      standardFeatures:
        "Every room has an en-suite bathroom, Freeview TV, tea & coffee making facilities and complimentary Wi-Fi.",
      types: [
        { name: "King Room", bed: "1 King-size bed", description: "Spacious, premium comfort, en-suite, Freeview TV, Wi-Fi.", image: "/images/kings-court/king-room.jpg" },
        { name: "Double Room", bed: "1 Queen-size bed", description: "Standard functional room, en-suite, tea & coffee, Wi-Fi.", image: "/images/kings-court/double-room.jpg" },
        { name: "Quad Room (Family)", bed: "2 King-size beds", description: "Family room, cots/highchairs on request, free parking, gym access." },
        { name: "Single Room", bed: "1 Single bed", description: "Geared for solo travelers / corporate stopovers." },
        { name: "Twin Room", bed: "2 Single beds", description: "Standard twin setup with en-suite amenities." },
      ],
      extras: ["Group Bookings", "Corporate Stays", "Bed & Breakfast packages"],
    },
    dining: [
      {
        name: "The Restaurant & Brasserie",
        description: "Contemporary full-service restaurant serving breakfast, daily dining menus, Sunday lunch, and a Wednesday 3-course buffet.",
      },
      {
        name: "The Twisted Boot Pub",
        description: "Traditional pub atmosphere featuring log fires, craft ales, and light bites.",
      },
      {
        name: "Afternoon Tea Service",
        description: "Daily classic, signature, and cream teas.",
      },
    ],
    events: [
      {
        name: "Weddings",
        description: "Fully licensed for civil ceremonies and civil partnerships. Exclusive manor estate hire available. Up to 130 guests in the Warwick Barn. Dedicated on-site wedding coordinator, bespoke catering, and wine lists.",
      },
      {
        name: "Corporate & Business",
        description: "Conference rooms, corporate retreat packages, and group facilities.",
      },
      {
        name: "Seasonal Celebrations",
        description: "Annual Christmas & New Year's party nights, festive dining menus, and seasonal celebration packages.",
      },
    ],
    amenities: [
      "High-speed complimentary Wi-Fi across all areas",
      "On-site gym / fitness access",
      "4 acres of landscaped gardens for walks and outdoor events",
      "Dog-friendly / countryside estate grounds",
      "On-site dining & historic bar facilities",
    ],
    photos: [
      { src: "/images/kings-court/hotel-exterior.jpg", alt: "Brick and timber-framed hotel wings in evening sunlight", caption: "The hotel" },
      { src: "/images/kings-court/restaurant.jpg", alt: "Restaurant with round tables and French doors opening onto the garden", caption: "The Restaurant" },
      { src: "/images/kings-court/restaurant-tables.jpg", alt: "Tables laid with wine glasses beside garden-facing windows", caption: "Dining" },
      { src: "/images/kings-court/twisted-boot-bar.jpg", alt: "The Twisted Boot bar with copper pendant lights and bar stools", caption: "The Twisted Boot" },
      { src: "/images/kings-court/wedding-top-table.png", alt: "Wedding top table with white floral arches beneath oak beams", caption: "Weddings" },
      { src: "/images/kings-court/function-room.jpg", alt: "Beamed function room set theatre-style with a projector screen", caption: "Function room" },
      { src: "/images/kings-court/meeting-room.jpg", alt: "Boardroom with a large table, leather chairs and a wall-mounted screen", caption: "Meetings" },
      { src: "/images/kings-court/double-room.jpg", alt: "Double room with desk, armchair and tea and coffee tray", caption: "Guest rooms" },
    ],
    wellness: null,
    nearbySights: null,
  },

  {
    id: "evesham",
    name: "Evesham Hotel",
    location: "Evesham, Worcestershire",
    region: "Worcestershire",
    tagline: "A Characterful Boutique Retreat",
    taglineSub: "Personal touch · Private gardens · Leisure facilities",
    shortDescription:
      "A characterful boutique hotel with a personal, non-corporate touch, private gardens, and leisure facilities. With 36 guest rooms, a heated indoor pool, on-site spa and season deals from £100, the Evesham Hotel is a relaxed and welcoming base in the Vale of Evesham.",
    heritage: null,
    affiliation: null,
    estate: null,
    capacity: "36 guest rooms",
    rating: "3-Star Hotel",
    reviews: "Fabulous (963 reviews)",
    rates: "Season deals from £100",
    accreditations: [],
    images: {
      hero: null,
      gallery: [
        { src: "/images/evesham/front-facade.jpg", alt: "The white Georgian front of the Evesham Hotel" },
        { src: "/images/evesham/indoor-pool.jpg", alt: "Heated indoor swimming pool with garden views" },
        { src: "/images/evesham/bedroom.jpg", alt: "Guest bedroom with king-size bed and sofa" },
      ],
    },
    keyFigures: [
      { label: "Rooms", value: "36" },
      { label: "Rating", value: "3-Star" },
      { label: "Reviews", value: "Fabulous (963)" },
      { label: "From", value: "£100 / night" },
    ],
    contact: {
      address: "Coopers Lane, Evesham, Worcestershire, United Kingdom",
      phone: null,
      email: null,
    },
    hours: {
      reception: null,
      checkIn: "2:00 PM – 8:00 PM",
      checkOut: "7:00 AM – 11:00 AM",
    },
    gettingThere: [
      { mode: "By rail", detail: "~1 km from Evesham Railway Station" },
      { mode: "By bus", detail: "150 m from Mansion Gardens bus stop" },
      { mode: "Parking", detail: "On-site parking available" },
    ],
    rooms: {
      standardFeatures:
        "All 36 en-suite rooms feature flat-screen satellite TVs, electric kettles, refrigerators, sitting areas, ironing equipment, hairdryers and bath sheets.",
      types: [
        { name: "Single Room", bed: "1 Single bed", size: "25 m²", maxGuests: "Up to 2 guests", description: "Compact and functional, flat-screen TV, fridge, kettle." },
        { name: "Classic Double Room", bed: "1 King-size bed", size: "40 m²", maxGuests: "2 guests", description: "Spacious layout, sitting area, carpeted floor, en-suite bathroom." },
        { name: "Deluxe Double Room", bed: "1 King-size bed", size: "50 m²", maxGuests: "2 guests", description: "Generous floor plan, premium comfort, seating area, fridge.", image: "/images/evesham/bedroom.jpg" },
      ],
      extras: [],
    },
    dining: null,
    events: null,
    amenities: null,
    wellness: [
      "Heated indoor swimming pool",
      "On-site spa salon",
      "Landscaped outdoor garden area",
    ],
    wellnessImage: { src: "/images/evesham/pool-sauna.jpg", alt: "Indoor pool with sauna cabin and relaxation loungers" },
    photos: [
      { src: "/images/evesham/cedar-lawn.jpg", alt: "Rear lawn beneath a cedar tree, with the hotel behind", caption: "The garden" },
      { src: "/images/evesham/gardens-side.jpg", alt: "Side of the hotel with planted borders and lawns", caption: "Private gardens" },
      { src: "/images/evesham/entrance-sign.jpg", alt: "Evesham Hotel & Spa sign framed by flowers", caption: "Welcome" },
      { src: "/images/evesham/reception.jpg", alt: "Reception desk with a panelled blue counter", caption: "Reception" },
      { src: "/images/evesham/restaurant.jpg", alt: "Panelled restaurant with wooden tables and upholstered chairs", caption: "Restaurant" },
      { src: "/images/evesham/bar-lounge.jpg", alt: "Bar with blue leather tub chairs and a stocked back bar", caption: "Bar & lounge" },
      { src: "/images/evesham/lounge-detail.jpg", alt: "Lounge table set with a candle and allium flowers", caption: "The lounge" },
    ],
    inRoomFeatures: [
      "Complimentary high-speed Wi-Fi in all rooms",
      "Flat-screen satellite TV & AM/FM alarm clock",
      "Refrigerator & electric kettle",
      "Dedicated sitting area & ironing facilities",
      "Carpeted flooring",
      "Private en-suite with shower/separate toilet, hairdryer, bath sheets, and complimentary toiletries",
    ],
    nearbySights: [
      { name: "War Memorial Evesham", detail: "4-min walk (Abbey Park Waterside)" },
      { name: "The Regal Cinema", detail: "5-min walk (350 m, 41 Port Street)" },
      { name: "Wetland Garden", detail: "10-min walk" },
      { name: "Evesham Bell Tower & St Lawrence's Church", detail: "10–12-min walk" },
      { name: "The Round House", detail: "10-min walk" },
      { name: "The Valley & Evesham Vale Light Railway", detail: "3.1 km (~38-min walk / short drive)" },
      { name: "Abbey Manor House", detail: "30-min walk" },
      { name: "Middle Littleton Tithe Barn", detail: "~65-min walk / short drive" },
    ],
    localDining: "Evesham Balti (adjacent, 5-minute stroll)",
  },
];

export function getHotelById(id: string): Hotel | undefined {
  return HOTELS.find((h) => h.id === id);
}
