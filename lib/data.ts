export const company = {
  name: "EDOLARK LIMITED",
  shortName: "EDOLARK",
  slogan: "Quality Workmanship. Lasting Value.",
  email: "info@edolark.com",
  phone: "+234 806 212 5925",
  rawPhone: "2348062125925",
  address: ["Plot 1 Ogunyemi Street", "Pedro", "Gbagada", "Lagos State", "Nigeria"],
  whatsapp: "2348062125925",
  instagram: "https://instagram.com/edolarkltd",
  website: "https://edolarkltd.com",
  rcNumber: "RC 1099055",
  incorporated: "26th of February, 2013",
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  status: "Available now" | "Completed" | "Ongoing" | "Executed" | "Coming soon";
  type: string;
  summary: string;
  description: string;
  client?: string;
  contractSum?: string;
  completedYear?: string;
  features: string[];
  gallery: string[];
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
      "An exceptional residential development by Edolark Ltd offering modern 2-bedroom and 3-bedroom apartments. Designed with contemporary architecture, stylish interiors, spacious living rooms and comfortable bedrooms, the development also features 24/7 security, CCTV surveillance, steady electricity and constant water supply within a secure, gated and serene environment.",
    features: [
      "Modern 2-bedroom and 3-bedroom apartments",
      "Contemporary architecture and stylish interiors",
      "Spacious living rooms and comfortable bedrooms",
      "24/7 security and CCTV surveillance",
      "Steady electricity and constant water supply",
      "Secure, gated and serene residential environment",
      "3 minutes to Yaba–Ebute Metta Train Station",
      "3 minutes from the Third Mainland Bridge",
      "Approx. 25 minutes’ drive to Murtala Muhammed Airport Terminal 2 (MM2)",
    ],
    gallery: [
      "/projects/usiannie-yaba/1.png",
      "/projects/usiannie-yaba/2.png",
      "/projects/usiannie-yaba/3.png",
      "/projects/usiannie-yaba/4.png",
      "/projects/usiannie-yaba/5.png",
    ],
  },
  {
    slug: "medina-estate-gbagada",
    title: "4-Bedroom Semi-Detached Homes",
    location: "Medina Estate, Gbagada, Lagos",
    status: "Completed",
    type: "Semi-Detached Residential Apartments",
    summary: "Premium semi-detached family homes in a well-established Gbagada estate.",
    description:
      "A completed development of 4-bedroom semi-detached residential apartments delivered in Medina Estate, Gbagada. Executed as a joint venture with Mr Jerry Chimezie Eyimuche and completed in 2021, the project reflects Edolark’s commitment to quality workmanship, functional layouts and timely delivery.",
    client: "Joint Venture with Mr Jerry Chimezie Eyimuche",
    completedYear: "2021",
    features: [
      "4-bedroom semi-detached units",
      "Quality finishes and functional layouts",
      "Secure estate location",
      "Completed and delivered on schedule",
    ],
    gallery: [
      "/projects/medina-gbagada/1.jpeg",
      "/projects/medina-gbagada/2.jpeg",
      "/projects/medina-gbagada/3.jpeg",
      "/projects/medina-gbagada/4.jpeg",
      "/projects/medina-gbagada/5.jpeg",
    ],
  },
  {
    slug: "omole-phase-2",
    title: "2-Bedroom Flats & Maisonette",
    location: "Atunishe Street, Omole Phase 2, Berger, Lagos",
    status: "Ongoing",
    type: "Residential Apartments",
    summary: "Two separate buildings delivering modern 2-bedroom flats and a maisonette.",
    description:
      "An ongoing joint-venture residential project in Omole Phase 2, Berger. The development comprises two separate buildings, each containing three 2-bedroom flats, plus a maisonette with 2-bedroom accommodation — designed for modern urban living in a secure neighbourhood.",
    client: "Joint Venture",
    features: [
      "Two separate residential blocks",
      "3 units of 2-bedroom flats per block",
      "Maisonette with 2-bedroom flat",
      "Modern urban layout",
      "Ongoing construction to Edolark quality standards",
    ],
    gallery: [
      "/projects/omole-phase2/1.jpeg",
      "/projects/omole-phase2/2.jpeg",
      "/projects/omole-phase2/3.jpeg",
      "/projects/omole-phase2/4.jpeg",
      "/projects/omole-phase2/5.jpeg",
    ],
  },
  {
    slug: "ademola-street-ikoyi",
    title: "Remodel of 8 Flats to 4 Maisonette Duplexes",
    location: "No 30, Ademola Street, Ikoyi, Lagos",
    status: "Ongoing",
    type: "Remodel / Residential",
    summary: "High-end remodelling transforming 8 flats into 4 duplex maisonettes in Ikoyi.",
    description:
      "A large-scale remodelling project for Commerce Alliance Property Solutions, converting an existing 8-flat block into 4 spacious maisonette duplexes. The transformation includes premium interior finishes, modern kitchens and reconfigured layouts suited to upscale Ikoyi living.",
    client: "Commerce Alliance Property Solutions",
    contractSum: "₦352,000,000",
    features: [
      "Conversion of 8 flats into 4 maisonette duplexes",
      "Premium interior finishes",
      "Modern kitchen and living spaces",
      "Upscale Ikoyi location",
    ],
    gallery: [
      "/projects/ikoyi-remodel/1.jpeg",
      "/projects/ikoyi-remodel/2.jpeg",
      "/projects/ikoyi-remodel/3.jpeg",
    ],
  },
  {
    slug: "palms-gardens-osogbo",
    title: "3-Bedroom Semi-Detached Homes",
    location: "Palms Gardens, Osogbo, Osun State",
    status: "Completed",
    type: "Semi-Detached Residential Apartments",
    summary: "Semi-detached homes delivered for Synergy Development Ltd in Osogbo.",
    description:
      "A completed development of two 3-bedroom semi-detached residential apartments at Palms Gardens, Osogbo. Delivered to Synergy Development Ltd, the project demonstrates Edolark’s ability to execute quality residential work beyond Lagos.",
    client: "Synergy Development Ltd",
    contractSum: "₦247,000,000",
    features: [
      "2 units of 3-bedroom semi-detached apartments",
      "Completed to client specification",
      "Quality construction and finishes",
    ],
    gallery: [],
  },
  {
    slug: "horizon-extension-demolition",
    title: "Demolition of G+5 Building",
    location: "Horizon Extension, Kusanla Road, Lagos",
    status: "Executed",
    type: "Demolition Works",
    summary: "Controlled demolition of a ground-plus-five structure for Lekki Gardens.",
    description:
      "Executed demolition of a G+5 building at Horizon Extension, Kusanla Road, Lagos. Carried out safely and efficiently for Lekki Gardens, the works were completed within budget and without incident.",
    client: "Lekki Gardens",
    contractSum: "₦8,200,000",
    features: [
      "Safe controlled demolition of G+5 structure",
      "Executed within budget",
      "Site clearance and rubble removal",
    ],
    gallery: [],
  },
  {
    slug: "nsitf-office-complex-makurdi",
    title: "Construction of Office Complex",
    location: "Makurdi, Benue State",
    status: "Completed",
    type: "Office Complex",
    summary: "NSITF office complex built to serve the Insurance Trust Fund in Benue State.",
    description:
      "Construction of an office complex for the Insurance Trust Fund (NSITF) in Makurdi, Benue State. The project covered foundation excavation, pad footings, column starters, block setting and general site works, delivered to institutional standards.",
    client: "Insurance Trust Fund (NSITF)",
    contractSum: "₦65,000,000",
    features: [
      "Institutional office complex",
      "Foundation and structural works",
      "Blockwork and site infrastructure",
    ],
    gallery: [],
  },
  {
    slug: "alara-street-sabo",
    title: "Demolition & Construction of Seven Blocks of Flat",
    location: "6 Alara Street, Sabo, Yaba, Lagos",
    status: "Completed",
    type: "Residential Development",
    summary: "Joint-venture redevelopment of seven residential blocks in Sabo, Yaba.",
    description:
      "A joint-venture project involving the demolition of existing structures and construction of seven blocks of flats at 6 Alara Street, Sabo, Yaba. Completed in 2024, the development spans demolition, setting out, excavation, reinforced concrete works, blockwork, roofing and finishing.",
    client: "Joint Venture",
    completedYear: "2024",
    features: [
      "Demolition and new construction",
      "Seven blocks of flats",
      "Reinforced concrete structure",
      "Roofing, plastering and finishing works",
    ],
    gallery: [],
  },
  {
    slug: "itanrin-ijebu-ode",
    title: "Construction of 4 Blocks of Flat",
    location: "Itanrin, Ijebu Ode, Ogun State",
    status: "Completed",
    type: "Residential Development",
    summary: "Four residential blocks completed for Dr Ibrahim Odunlade in Ijebu Ode.",
    description:
      "Construction of four blocks of flats at Itanrin, Ijebu Ode, Ogun State for Dr Ibrahim Odunlade. The project covered substructure works, building construction, roofing, screeding, painting and final finishes.",
    client: "Dr Ibrahim Odunlade",
    contractSum: "₦107,000,000",
    features: [
      "4 blocks of residential flats",
      "Substructure to finishing",
      "Roof installation and painting works",
    ],
    gallery: [],
  },
  {
    slug: "makoko-paving-stones",
    title: "Supply & Installation of Paving Stones",
    location: "Makoko Adekunle, Yaba, Lagos",
    status: "Completed",
    type: "Road / Civil Works",
    summary: "Road paving stone works for Hansmag Nigeria Limited and Lagos State Government.",
    description:
      "Supply and installation of paving stones for road construction at Makoko Adekunle, Yaba. Executed for Hansmag Nigeria Limited in partnership with Lagos State Government, the scope included topsoil removal, excavation, drainage installation, levelling, compaction and finished paving surface.",
    client: "Hansmag Nigeria Limited / Lagos State Government",
    contractSum: "₦31,000,000",
    features: [
      "Topsoil removal and excavation",
      "Drainage installation",
      "Levelling and compaction",
      "Finished paving stone surface",
    ],
    gallery: [],
  },
  {
    slug: "lagos-island-demolition",
    title: "Demolition of Three-Storey Buildings",
    location: "Ebute-Ero Police Post & Adeniji, Lagos Island, Lagos",
    status: "Executed",
    type: "Demolition Works",
    summary: "Controlled demolition of three-storey buildings on Lagos Island.",
    description:
      "Executed demolition and cart-away of three-storey buildings at Ebute-Ero Police Post and Adeniji on Lagos Island. Carried out for the Arisekola Family and Lagos State Government through Hansmag Nigeria Limited, the works were completed safely and the sites cleared.",
    client: "Arisekola Family / Hansmag Nigeria Limited / Lagos State Government",
    contractSum: "₦38,800,000",
    features: [
      "Demolition of three-storey buildings",
      "Safe dismantling and rubble cart-away",
      "Site clearance",
    ],
    gallery: [],
  },
];

export const services = [
  {
    title: "Building Design & Construction",
    description:
      "State-of-the-art, professional building designs, construction and installations with precision for individuals and governmental institutions.",
  },
  {
    title: "Renovation and Modification",
    description:
      "Repair of buildings and preventive maintenance of systems to keep properties functional and valuable.",
  },
  {
    title: "Project Management",
    description:
      "Project recommendations and implementation that integrate the client’s mission and goals for successful completion within stipulated time.",
  },
  {
    title: "Maintenance Services",
    description:
      "Repair of buildings and preventive maintenance of systems to extend asset life and reduce downtime.",
  },
  {
    title: "Landscaping and Beautification",
    description:
      "Professional landscape architecture services that beautify environments by designing and managing gardens, lawns and outdoor spaces.",
  },
  {
    title: "Procurement",
    description:
      "Effective supply of goods and services at favourable cost, ensuring quality, safe handling and timely delivery.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Kolade Awoyera",
    role: "Managing Director",
    initials: "KA",
    bio: "Civil Engineer and certified project manager with over 17 years of experience in road and building construction.",
  },
  {
    name: "Olalekan Oginni",
    role: "Senior Architect",
    initials: "OO",
    bio: "Registered Architect with over 14 years of experience in commercial and residential building design, modification and beautification.",
  },
  {
    name: "Aramide Olalekan",
    role: "Civil Engineer",
    initials: "AO",
    bio: "Registered Civil Engineer with over 10 years of experience in structural design and construction of civil engineering structures.",
  },
  {
    name: "Damola Awoyera",
    role: "Quantity Surveyor (NIQS)",
    initials: "DA",
    bio: "Licensed quantity surveyor with over 13 years of vast experience in cost control, management and estimations.",
  },
  {
    name: "Sanyaolu Damilola",
    role: "Accountant",
    initials: "SD",
    bio: "Chartered Accountant with 3 years of robust experience in auditing, certification and negotiation.",
  },
];
