export type Property = {
  id: number;
  name: string;
  location: string;
  type: "Apartment" | "Duplex" | "Villa";
  price: string;
  numericPrice: number;
  beds: number;
  baths: number;
  area: string;
  image: string;
  tag: string;
};

export const properties: Property[] = [
  {
    id: 1,
    name: "The Aster Residence",
    location: "Banana Island, Lagos",
    type: "Villa",
    price: "₦850,000,000",
    numericPrice: 850,
    beds: 5,
    baths: 6,
    area: "780 sqm",
    image: "/images/aster.jpg",
    tag: "Signature listing",
  },
  {
    id: 2,
    name: "Cedar Court",
    location: "Ikoyi, Lagos",
    type: "Apartment",
    price: "₦420,000,000",
    numericPrice: 420,
    beds: 3,
    baths: 4,
    area: "320 sqm",
    image: "/images/cedar.jpg",
    tag: "New to market",
  },
  {
    id: 3,
    name: "The Wren House",
    location: "Lekki Phase 1, Lagos",
    type: "Duplex",
    price: "₦295,000,000",
    numericPrice: 295,
    beds: 4,
    baths: 5,
    area: "450 sqm",
    image: "/images/wren.jpg",
    tag: "Exclusive",
  },
  {
    id: 4,
    name: "Olive Terrace",
    location: "Victoria Island, Lagos",
    type: "Apartment",
    price: "₦180,000,000",
    numericPrice: 180,
    beds: 2,
    baths: 3,
    area: "185 sqm",
    image: "/images/olive.jpg",
    tag: "City living",
  },
  {
    id: 5,
    name: "Palm Grove Villa",
    location: "Ajah, Lagos",
    type: "Villa",
    price: "₦360,000,000",
    numericPrice: 360,
    beds: 5,
    baths: 5,
    area: "560 sqm",
    image: "/images/palm.jpg",
    tag: "Private estate",
  },
  {
    id: 6,
    name: "The Linden Duplex",
    location: "Ikeja GRA, Lagos",
    type: "Duplex",
    price: "₦240,000,000",
    numericPrice: 240,
    beds: 4,
    baths: 4,
    area: "410 sqm",
    image: "/images/linden.jpg",
    tag: "Ready to move",
  },
];
