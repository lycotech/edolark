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
      "A completed development of 4-bedroom semi-detached residential apartments delivered in Medina Estate, Gbagada. Executed as a joint venture with Mr Jerry Chimezie Eyimuche and completed in 2023, the project reflects Edolark’s commitment to quality workmanship, functional layouts and timely delivery.",
    client: "Joint Venture ",
    completedYear: "2023",
    features: [
      "4-bedroom semi-detached units",
      "Quality finishes and functional layouts",
      "Secure estate location",
      "Completed and delivered on schedule",
    ],
    gallery: [
      "/projects/medina-gbagada/19.jpeg",
      "/projects/medina-gbagada/14.jpeg",
      "/projects/medina-gbagada/1.jpeg",
      "/projects/medina-gbagada/2.jpeg",
      "/projects/medina-gbagada/3.jpeg",
      "/projects/medina-gbagada/4.jpeg",
      "/projects/medina-gbagada/5.jpeg",
      "/projects/medina-gbagada/6.jpeg",
      "/projects/medina-gbagada/7.jpeg",
      "/projects/medina-gbagada/8.jpeg",
      "/projects/medina-gbagada/15.jpeg",
      "/projects/medina-gbagada/16.jpeg",
      "/projects/medina-gbagada/17.jpeg",
      "/projects/medina-gbagada/18.jpeg",
      "/projects/medina-gbagada/20.jpeg",
      "/projects/medina-gbagada/21.jpeg",
    ],
  },
  {
    slug: "dawaki-abuja",
    title: "4-Bedroom Semi-Detached Duplex",
    location: "Dawaki, Abuja, FCT",
    status: "Completed",
    type: "Semi-Detached Residential Duplex",
    summary: "A completed 4-bedroom semi-detached duplex delivered in Dawaki, Abuja.",
    description:
      "A completed 4-bedroom semi-detached duplex at Dawaki, Abuja, delivered in 2024. The project reflects Edolark’s commitment to quality workmanship and lasting value, extending its residential work beyond Lagos.",
    completedYear: "2024",
    features: [
      "4-bedroom semi-detached duplex",
      "Quality construction and finishes",
      "Completed in 2024",
    ],
    gallery: [
      "/projects/dawaki-abuja/1.jpeg",
      "/projects/dawaki-abuja/2.jpeg",
      "/projects/dawaki-abuja/3.jpeg",
      "/projects/dawaki-abuja/4.jpeg",
      "/projects/dawaki-abuja/5.jpeg",
      "/projects/dawaki-abuja/6.jpeg",
      "/projects/dawaki-abuja/7.jpeg",
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
    client: "Madam Abeni",
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
      "/projects/omole-phase2/11.jpeg",
      "/projects/omole-phase2/12.jpeg",
      "/projects/omole-phase2/13.jpeg",
      "/projects/omole-phase2/14.jpeg",
      "/projects/omole-phase2/15.jpeg",
      "/projects/omole-phase2/16.jpeg",
      "/projects/omole-phase2/17.jpeg",
      "/projects/omole-phase2/19.jpeg",
      "/projects/omole-phase2/21.jpeg",
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
      "/projects/ikoyi-remodel/1.jpg",
      "/projects/ikoyi-remodel/2.jpg",
      "/projects/ikoyi-remodel/3.jpg",
      "/projects/ikoyi-remodel/4.jpg",
      "/projects/ikoyi-remodel/5.jpg",
      "/projects/ikoyi-remodel/6.jpg",
      "/projects/ikoyi-remodel/7.jpg",
      "/projects/ikoyi-remodel/8.jpg",
      "/projects/ikoyi-remodel/9.jpg",
      "/projects/ikoyi-remodel/10.jpg",
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
    gallery: [
      "/projects/palms-osogbo/1.jpg",
      "/projects/palms-osogbo/2.jpg",
      "/projects/palms-osogbo/3.jpg",
      "/projects/palms-osogbo/4.jpg",
      "/projects/palms-osogbo/5.jpg",
      "/projects/palms-osogbo/6.jpg",
      "/projects/palms-osogbo/7.jpg",
      "/projects/palms-osogbo/8.jpg",
    ],
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
    gallery: [
      "/projects/horizon-demolition/1.jpg",
      "/projects/horizon-demolition/2.jpg",
      "/projects/horizon-demolition/3.jpg",
      "/projects/horizon-demolition/4.jpg",
    ],
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
    gallery: [
      "/projects/nsitf-makurdi/1.jpg",
      "/projects/nsitf-makurdi/2.jpg",
      "/projects/nsitf-makurdi/3.jpg",
      "/projects/nsitf-makurdi/4.jpg",
      "/projects/nsitf-makurdi/5.jpg",
      "/projects/nsitf-makurdi/6.jpg",
      "/projects/nsitf-makurdi/7.jpg",
      "/projects/nsitf-makurdi/8.jpg",
      "/projects/nsitf-makurdi/9.jpg",
    ],
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
    gallery: [
      "/projects/alara-sabo/1.jpg",
      "/projects/alara-sabo/2.jpg",
      "/projects/alara-sabo/3.jpg",
      "/projects/alara-sabo/4.jpg",
      "/projects/alara-sabo/5.jpg",
      "/projects/alara-sabo/6.jpg",
      "/projects/alara-sabo/7.jpg",
      "/projects/alara-sabo/8.jpg",
      "/projects/alara-sabo/9.jpg",
      "/projects/alara-sabo/10.jpg",
      "/projects/alara-sabo/11.jpg",
      "/projects/alara-sabo/12.jpg",
      "/projects/alara-sabo/13.jpg",
      "/projects/alara-sabo/14.jpg",
      "/projects/alara-sabo/15.jpg",
      "/projects/alara-sabo/16.jpg",
      "/projects/alara-sabo/17.jpg",
    ],
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
    gallery: [
      "/projects/itanrin-ijebu-ode/1.jpg",
      "/projects/itanrin-ijebu-ode/2.jpg",
      "/projects/itanrin-ijebu-ode/3.jpg",
      "/projects/itanrin-ijebu-ode/4.jpg",
      "/projects/itanrin-ijebu-ode/5.jpg",
      "/projects/itanrin-ijebu-ode/6.jpg",
      "/projects/itanrin-ijebu-ode/7.jpg",
    ],
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
    gallery: [
      "/projects/makoko-paving/1.jpg",
      "/projects/makoko-paving/2.jpg",
      "/projects/makoko-paving/3.jpg",
      "/projects/makoko-paving/4.jpg",
      "/projects/makoko-paving/5.jpg",
      "/projects/makoko-paving/6.jpg",
      "/projects/makoko-paving/7.jpg",
    ],
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
    gallery: [
      "/projects/lagos-island-demolition/1.jpg",
      "/projects/lagos-island-demolition/2.jpg",
    ],
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
    name: "Kolade Olaposi Awoyera",
    role: "Chief Executive Officer | Edolark Ltd",
    initials: "KA",
    bio: "Kolade Olaposi Awoyera is an accomplished Civil Engineer, experienced Project Manager and dynamic business leader with over 13 years of professional experience in Nigeria's construction and real estate industry. As the Chief Executive Officer of Edolark Ltd, he provides strategic leadership and direction, championing the company's commitment to delivering exceptional real estate developments and high-quality construction solutions.\n\nThroughout his career, Kolade has built an impressive portfolio of successful projects, demonstrating extensive expertise in construction management, project planning, engineering coordination, development execution and quality control. His wealth of industry experience, combined with his technical knowledge and practical understanding of the construction sector, enables him to transform concepts and designs into outstanding developments.\n\nAs a member of the Project Management Institute (PMI), Kolade embraces professional project management principles, with a strong focus on efficiency, accountability, cost optimisation, quality assurance and timely project delivery.\n\nAt Edolark Ltd, his leadership is driven by a clear vision: to redefine standards in real estate and construction through innovative thinking, professional excellence and uncompromising commitment to quality. He is passionate about creating properties that offer lasting value to investors, homeowners and communities while contributing to the growth and transformation of Nigeria's built environment.\n\nKolade believes that successful property development goes beyond putting structures on the ground; it is about building trust, creating opportunities and delivering sustainable developments that stand the test of time. His leadership philosophy is founded on integrity, innovation, professionalism and a relentless pursuit of excellence.",
  },
  {
    name: "Awoniyi Olayinka Henry",
    role: "Architect | Edolark Ltd",
    initials: "AO",
    bio: "Awoniyi Olayinka is a dedicated and versatile architectural professional at Edolark Ltd, bringing together a strong academic foundation in Building Technology, practical construction experience, and professional expertise in architectural design and detailing.\n\nHis academic background in Building Technology has provided him with a solid understanding of construction methods, building materials, structural systems, construction technology, and the technical principles that underpin the built environment. This knowledge has strengthened his ability to approach architectural design not only from an aesthetic perspective but also with a practical understanding of construction feasibility, functionality, and technical execution.\n\nHe gained valuable hands-on construction experience during his time with El-alan Construction, one of the leading construction companies in Nigeria. Working within a professional construction environment exposed him to various aspects of building production, site operations, construction processes, quality control, and the coordination of building activities. This experience has given him a practical appreciation of the challenges involved in translating architectural designs into completed structures.\n\nHe further broadened his professional experience at Consultants Collaborative Partnership (CCP), a reputable multidisciplinary consultancy firm, where he gained experience in architectural design, development, and detailing across a diverse range of building typologies, including commercial, residential, industrial, and mixed-use developments. His involvement in these projects strengthened his design capabilities, technical proficiency, attention to detail, and understanding of the relationship between architectural concepts and their practical implementation.\n\nThe combination of his academic knowledge, construction-site exposure, and consultancy experience has shaped him into a well-rounded architectural professional with the ability to bridge the gap between design conception and construction execution. He brings a balanced approach to architecture, combining creativity, technical knowledge, construction awareness, and a commitment to delivering functional, aesthetically refined, and buildable design solutions.\n\nAt Edolark Ltd, Awoniyi Olayinka applies this diverse experience to contribute to the development of innovative architectural solutions, ensuring that design quality, technical precision, functionality, and construction practicality remain central to every project. His multidisciplinary exposure and passion for the built environment continue to strengthen his contribution to the firm's vision of delivering quality architectural and building solutions.",
  },
  {
    name: "Engr. Ekundayo Opeyemi",
    role: "Structural Consultant Engineer | Managing Partner, Chrestrad Consulting Limited",
    initials: "EO",
    bio: "Engr. Ekundayo Opeyemi is a Structural Consultant Engineer with experience in structural design and analysis, foundation engineering, structural integrity assessment, construction supervision, and value engineering.\n\nHe is committed to delivering safe, durable, and cost-effective structural engineering solutions that meet professional standards and client expectations.\n\nHe works collaboratively with architects, developers, contractors, and real estate professionals to provide reliable engineering consultancy services, ensuring structural safety, quality delivery, and value for investment.\n\nProfessional Motto: Engineering Excellence. Building Confidence.",
  },
  {
    name: "Awoyera Damola Oluwaseun",
    role: "Quantity Surveyor | MNIQS, RQS",
    initials: "DA",
    bio: "Awoyera Damola Oluwaseun is a member of the Nigerian Institute of Quantity Surveyors (MNIQS) and the Quantity Surveyors Registration Board of Nigeria (RQS). He is an accomplished Quantity Surveyor with nine years of professional experience in the construction industry, bringing extensive knowledge and expertise in cost management, contract administration, project management, and construction economics. He is a detail-oriented professional with a strong commitment to delivering efficient, cost-effective, and value-driven solutions across construction projects.\n\nThroughout his professional career, he has gained valuable experience working with reputable organisations across different sectors of the construction industry. His career journey began at Sageto Limited, where he undertook his industrial training and developed foundational knowledge of construction practices and quantity surveying procedures. He subsequently worked with Complete Cost Surveyors as an Assistant Quantity Surveyor, gaining practical experience in cost estimation, measurement, documentation, and other essential aspects of quantity surveying.\n\nHe further advanced his career at Lekki Gardens, where he served as a Contract Manager, taking on responsibilities involving contract administration, project coordination, cost control, and the management of construction-related activities. He later joined First Metro Infrastructure Limited as Head of Quantity Surveying, where he further strengthened his leadership, technical, and professional capabilities in managing quantity surveying functions and overseeing cost-related aspects of construction projects.\n\nHis professional expertise covers the preparation of Bills of Quantities (BOQs), preliminary cost estimates, material schedules, valuation reports, and tender reports. He is also experienced in contract administration and project management, with a strong understanding of the financial, contractual, and operational requirements necessary for the successful delivery of construction projects. In addition, he demonstrates proficiency in leveraging modern technology and digital tools for accurate measurement, quantity take-off, and cost assessment.\n\nBeyond his technical capabilities, Awoyera Damola Oluwaseun possesses excellent interpersonal and communication skills, strong analytical abilities, and the capacity to work effectively within multidisciplinary teams. He is guided by the principles of integrity, transparency, and honesty, while maintaining a target-driven approach to professional responsibilities. His ability to combine technical competence with effective coordination and problem-solving makes him a valuable contributor to project delivery.\n\nAt Edolark Ltd, he brings his wealth of experience, professional expertise, and strategic understanding of construction cost management to support the successful execution of projects. His commitment to accuracy, financial accountability, quality service delivery, and effective project management contributes to the firm's pursuit of excellence in the built environment.",
  },
  {
    name: "Sanyaolu Damilola",
    role: "Accountant",
    initials: "SD",
    bio: "Chartered Accountant with 3 years of robust experience in auditing, certification and negotiation.",
  },
];

export const welcomeMessage =
  "We are dedicated to helping you successfully manage your projects in order to achieve your business and project goals — providing solutions that improve outcomes and drive value for your organisation, your customers and your collaborative partners.";

export const approach = {
  title: "Our approach",
  text: "Our results are accomplished by working closely with our clients, investing sufficient time to understand their needs, and applying state-of-the-art knowledge and expertise to render applicable, creative resolutions.",
};

export const values = [
  {
    title: "Our vision",
    text: "To become a leading and trusted name in Nigeria's real estate and construction industry, recognised for innovation, exceptional project delivery, sustainable development and the creation of enduring value.",
  },
  {
    title: "Our mission",
    text: "To deliver superior real estate, construction and engineering solutions through technical expertise, innovative thinking, quality workmanship and professional service, while consistently exceeding client expectations and contributing positively to the development of our communities.",
  },
  {
    title: "Our ultimate goal",
    text: "To build more than structures; to create landmarks, unlock investment opportunities, transform communities and establish a legacy of excellence that stands the test of time.",
  },
];

export const expertise = [
  "Residential & commercial property development",
  "Building construction",
  "Civil engineering",
  "Architectural design coordination",
  "Project management",
  "General contracting",
];

export const equipment = [
  { name: "Cutting machines", quantity: "2" },
  { name: "Concrete mixer", quantity: "1" },
  { name: "Scaffolding pipes", quantity: "400 pcs" },
  { name: "Acrow pipes", quantity: "287 pcs" },
  { name: "Concrete vibrators", quantity: "2" },
  { name: "Levelling instrument", quantity: "1" },
  { name: "Generator", quantity: "7.5 KVA" },
];

export const credentials = [
  `Incorporated ${company.incorporated}`,
  `Registered with the Corporate Affairs Commission under the Companies and Allied Matters Act — ${company.rcNumber}`,
  "All statutory obligations satisfied",
];

/** Distinct Nigerian states/territories represented in the portfolio. */
export function portfolioStates() {
  const set = new Set(
    projects.map((p) => {
      const last = p.location.split(",").pop()!.trim().replace(/ State$/i, "");
      return last;
    })
  );
  return set.size;
}
