export const company = {
  name: "EDOLARK LTD",
  slogan: "Quality Homes. Lasting Value.",
  email: "info@edolarkltd.com",
  phone: "+234 806 212 5925",
  rawPhone: "2348062125925",
  address: ["1 Ogunyemi Street", "Pedro", "Gbagada", "Lagos State", "Nigeria"],
  whatsapp: "2348062125925",
  instagram: "https://instagram.com/edolarkltd",
  website: "https://edolarkltd.com",
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  status: "Available now" | "Completed / Sold out" | "Coming soon";
  type: string;
  summary: string;
  description: string;
  units: string;
  features: string[];
  amenities: string[];
  gallery: string[];
  contacts?: string[];
};

export const projects: Project[] = [
  {
    slug: "usi-aderun-annie-court-yaba",
    title: "USI-ADERUN & ANNIE COURT",
    location: "Grace Court Estate, Yaba, Lagos",
    status: "Available now",
    type: "Residential Apartments",
    summary: "YOUR DREAM HOME AWAITS IN YABA, LAGOS!",
    description:
      "Welcome to USI-ADERUN & ANNIE COURT, an exceptional residential development by Edolark Ltd, located at Grace Court Estate, Yaba, Lagos. Whether you're buying your first home, upgrading your family's lifestyle, investing in Lagos real estate or securing a valuable asset for the future, USI-ADERUN & ANNIE COURT is an opportunity worth exploring.",
    units: "Modern 2-bedroom and 3-bedroom apartments",
    features: [
      "Contemporary architecture and stylish interiors",
      "Spacious living rooms and comfortable bedrooms",
      "24/7 security and CCTV surveillance",
      "Steady electricity and constant water supply",
      "Secure, gated and serene residential environment",
    ],
    amenities: [
      "Just 3 minutes to Yaba–Ebute Metta Train Station",
      "Only 3 minutes from the Third Mainland Bridge",
      "Approx. 25 minutes’ drive to Murtala Muhammed Airport Terminal 2 (MM2), depending on traffic",
    ],
    gallery: [
      "/VIEW 1.png",
      "/VIEW 2.png",
      "/VIEW 3.png",
      "/VIEW 10.png",
      "/FLAT 3 KITCHEN VIEW 2.png",
    ],
    contacts: ["0813 017 7063", "0703 103 7534"],
  },
  {
    slug: "pedro-gardens-gbagada",
    title: "Pedro Gardens",
    location: "Pedro, Gbagada, Lagos",
    status: "Completed / Sold out",
    type: "Terraced Duplexes",
    summary: "A completed family-friendly estate in the heart of Gbagada.",
    description:
      "Pedro Gardens was designed for families who value space, security and accessibility. The estate features modern terraced duplexes with generous living areas, secure parking and landscaped surroundings, all within minutes of Gbagada’s commercial hubs.",
    units: "4-bedroom terraced duplexes",
    features: [
      "Spacious family layouts with private compounds",
      "Secure gated entrance and perimeter fencing",
      "Paved roads and dedicated parking spaces",
      "Landscaped common areas",
      "Reinforced concrete structure with quality finishes",
    ],
    amenities: [
      "Close to Gbagada expressway",
      "Proximity to schools, hospitals and shopping",
      "Stable power and water infrastructure",
    ],
    gallery: ["/VIEW 5.png", "/VIEW 6.png", "/VIEW 7.png", "/VIEW 8.png"],
  },
];

export const services = [
  {
    title: "Residential Sales",
    description:
      "We help buyers find homes that match their lifestyle and budget, and guide sellers through positioning, marketing and closing.",
  },
  {
    title: "Property Development",
    description:
      "From land acquisition to design, construction and handover, we deliver residential developments built to last.",
  },
  {
    title: "Investment Advisory",
    description:
      "Get clear, market-grounded advice on Lagos real estate opportunities that align with your financial goals.",
  },
  {
    title: "Project Marketing",
    description:
      "We craft launch strategies, branding and sales channels that connect developments with qualified buyers.",
  },
  {
    title: "Property Management",
    description:
      "End-to-end management services that protect asset value and keep tenants satisfied.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
};

export const team: TeamMember[] = [
  { name: "Adedoyin Ogunyemi", role: "Founder / CEO", initials: "AO" },
  { name: "Aderonke Smith", role: "Head of Sales", initials: "AS" },
  { name: "Emmanuel Okonkwo", role: "Project Manager", initials: "EO" },
  { name: "Chioma Adeleke", role: "Client Relations Lead", initials: "CA" },
];
