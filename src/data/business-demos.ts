import type {
  Article,
  BusinessConfig,
  FAQItem,
  NavigationItem,
  ProcessStep,
  Project,
  Service,
} from "../types/business";

const conceptDisclosure =
  "Illustrative concept content for a sales demonstration; confirm the wording, scope and ownership with the business before publishing.";

const serviceApproval = {
  ownerApprovalRequired: true,
  disclosure: true,
  approvalStatus: "pending" as const,
  disclosureNote: conceptDisclosure,
};

const services: readonly Service[] = [
  {
    id: "architectural-planning",
    slug: "architectural-planning",
    name: "Architectural Design & Planning",
    summary: "A considered starting point for briefs, site questions and spatial direction.",
    description:
      "A provisional service narrative for discussing how a home, workplace or mixed-use brief might become a clear architectural direction. The final scope, statutory responsibilities and deliverables would be confirmed with the owner before launch.",
    deliverables: ["Brief and site conversation", "Early planning direction", "Concept review material"],
    focus: ["Proportion", "Orientation", "Everyday movement"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Contemporary architectural residence with monolithic stone forms and warm illumination",
    ...serviceApproval,
  },
  {
    id: "glass-facade-solutions",
    slug: "glass-facade-solutions",
    name: "Glass & Façade Solutions",
    summary: "Material-led thinking for glazing, partitions, screens and building edges.",
    description:
      "The public listing references glass-related products and services, including toughened glass, mirrors, partitions and façades. This concept page translates that lead into a refined consultation pathway without claiming a confirmed catalogue or installation capability.",
    deliverables: ["Opening and threshold review", "Glass and screening options", "Detail conversation"],
    focus: ["Reflection", "Privacy", "Weather and light"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Floor-to-ceiling architectural glass facade with bespoke slim framing",
    ...serviceApproval,
  },
  {
    id: "interior-spatial-planning",
    slug: "interior-spatial-planning",
    name: "Interior Spatial Planning",
    summary: "Layouts that make room for rhythm, storage, light and the way people live.",
    description:
      "A proposed service description for exploring room relationships, circulation, material atmosphere and daily use. Any final design, procurement or execution scope remains subject to owner confirmation.",
    deliverables: ["Adjacency and use review", "Concept layout options", "Material atmosphere prompts"],
    focus: ["Sequence", "Comfort", "Storage"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Warm minimalist interior with bespoke wood joinery and natural stone floor",
    ...serviceApproval,
  },
  {
    id: "3d-visualization",
    slug: "3d-visualization",
    name: "Three-Dimensional Visualization",
    summary: "A clear visual language for discussing an emerging architectural idea.",
    description:
      "A provisional service concept for turning a shared direction into atmospheric views, massing studies or material conversations. It is not presented as a promise of a specific software workflow or final rendering package.",
    deliverables: ["Visual direction board", "Annotated concept views", "Presentation-ready study material"],
    focus: ["Atmosphere", "Material reading", "Shared decisions"],
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Atmospheric architectural visualization study with dramatic geometry and natural light",
    ...serviceApproval,
  },
  {
    id: "material-detail-exploration",
    slug: "material-detail-exploration",
    name: "Material & Detail Exploration",
    summary: "A tactile study of stone, timber, metal, glass and the lines between them.",
    description:
      "A proposed conversation around material harmony and the small junctions that give a space its character. Specific supply, fabrication and installation services require owner approval.",
    deliverables: ["Material palette direction", "Junction and threshold prompts", "Detail review questions"],
    focus: ["Texture", "Junctions", "Patina"],
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Architectural tactile composition of fluted stone, cast glass and brushed dark metal",
    ...serviceApproval,
  },
  {
    id: "design-consultation",
    slug: "design-consultation",
    name: "Residential & Commercial Consultation",
    summary: "A focused first conversation for a new build, adaptation or design question.",
    description:
      "A simple proposed entry point for sharing a project location, priorities and open questions. Initial discovery sessions carry a baseline ₹10,000 consultation allocation.",
    deliverables: ["Initial project conversation", "Questions and constraints list", "Suggested next step"],
    focus: ["Clarity", "Priorities", "Feasibility"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Design consultation table overlooking an open natural courtyard",
    ...serviceApproval,
  },
];

const projects: readonly Project[] = [
  {
    id: "courtyard-residence",
    slug: "courtyard-residence",
    name: "The Courtyard Residence",
    summary: "A home concept shaped around a planted centre, filtered light and quieter edges.",
    description:
      "This illustrative study imagines a compact residence where the courtyard becomes both a climatic buffer and an everyday room. The architecture stays deliberately quiet so that shadow, planting and movement can do the work.",
    locationLabel: "Illustrative study · Gurugram context",
    projectType: "Residential concept",
    category: "residential",
    isConcept: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Monolithic luxury courtyard residence with reflecting pool and warm evening illumination",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    ],
    designIntent: "To make a modest centre feel generous: a place for light, planting, pause and the small rituals of a day.",
    materials: ["Pale limestone", "Warm oak", "Textured plaster", "Low-iron glass"],
    details: ["Deep overhangs", "Filtered courtyard edge", "A stair that catches morning light"],
    ...serviceApproval,
  },
  {
    id: "lightwell-house",
    slug: "lightwell-house",
    name: "The Lightwell House",
    summary: "A vertical home study using a central shaft of daylight to connect its rooms.",
    description:
      "An illustrative concept for a narrow urban plot, using a planted lightwell to bring brightness and orientation into the centre of the plan. It is a visual study, not a site-specific proposal or approved project.",
    locationLabel: "Illustrative study · Urban residential context",
    projectType: "Residential study",
    category: "residential",
    isConcept: true,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Striking contemporary home with a dramatic central lightwell atrium",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=85",
    ],
    designIntent: "To turn a constraint into an organiser, allowing a measured shaft of light to give each level a sense of connection.",
    materials: ["Charcoal brick", "Brushed steel", "Limewash", "Cedar"],
    details: ["Stacked thresholds", "Top-lit stair", "Deep window reveals"],
    ...serviceApproval,
  },
  {
    id: "urban-glass-house",
    slug: "urban-glass-house",
    name: "Urban Glass House",
    summary: "A façade study balancing openness, privacy and the changing light of the street.",
    description:
      "This concept visualization explores a glazed edge held inside a calm structural frame. Screens, planting and deep reveals are used as questions for a future design conversation—not as a claim about an existing commission.",
    locationLabel: "Illustrative study · Gurugram urban edge",
    projectType: "Façade concept",
    category: "commercial",
    isConcept: true,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Floor-to-ceiling glass pavilion residence framed by raw board-formed concrete and warm lighting",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    ],
    designIntent: "To let the building meet the street with clarity, while using shade and depth to keep the interior composed.",
    materials: ["Toughened glass", "Fluted stone", "Powder-coated metal", "Olive planting"],
    details: ["Recessed glazing", "Layered privacy screen", "Stone-to-glass junction"],
    ...serviceApproval,
  },
  {
    id: "warm-minimal-interior",
    slug: "warm-minimal-interior",
    name: "The Warm Minimal Interior",
    summary: "A quiet interior concept where material, daylight and furniture define the rooms.",
    description:
      "An illustrative interior study built around a restrained palette and a generous living sequence. It keeps the background calm so that texture, shadow and use can remain visible.",
    locationLabel: "Illustrative study · Interior concept",
    projectType: "Interior concept",
    category: "interiors",
    isConcept: true,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Warm minimal interior with custom travertine fireplace, smoked timber and soft natural lighting",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85",
    ],
    designIntent: "To give everyday life a soft frame: fewer gestures, more tactile depth, and light that changes slowly across the room.",
    materials: ["Travertine", "Smoked oak", "Brushed brass", "Linen"],
    details: ["Integrated shelving", "Low-level glow", "Continuous floor plane"],
    ...serviceApproval,
  },
  {
    id: "contemporary-workspace",
    slug: "contemporary-workspace",
    name: "The Contemporary Workspace",
    summary: "A flexible office concept with a shared table, planted threshold and quieter rooms.",
    description:
      "A speculative workplace study that treats focus, collaboration and arrival as related spatial conditions. No client, lease, location or completed work is implied.",
    locationLabel: "Illustrative study · Commercial interior",
    projectType: "Commercial interior concept",
    category: "commercial",
    isConcept: true,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Sculptural architectural workspace with acoustic paneling, shared wood table and garden light",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85",
    ],
    designIntent: "To make a shared place feel human-scale, with clear transitions between conversation, concentration and reset.",
    materials: ["Ash timber", "Acoustic felt", "Clear glass", "Terrazzo"],
    details: ["Shared work spine", "Soft acoustic ceiling", "Garden room threshold"],
    ...serviceApproval,
  },
  {
    id: "material-study-01",
    slug: "material-study-01",
    name: "Stone / Glass / Shade",
    summary: "A material composition study focused on the quiet power of a carefully held edge.",
    description:
      "A small illustrative study for thinking through how a hard mineral surface, a reflective plane and a soft shadow might meet. It is not a product catalogue or a construction detail.",
    locationLabel: "Illustrative material study",
    projectType: "Material concept",
    category: "material",
    isConcept: true,
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Detailed junction of natural honed travertine, anodized metal and shadow line",
    gallery: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    ],
    designIntent: "To make the junction between materials as legible and considered as the materials themselves.",
    materials: ["Stone", "Glass", "Dark metal", "Plaster"],
    details: ["Shadow gap", "Tactile edge", "Controlled reflection"],
    ...serviceApproval,
  },
];

const articles: readonly Article[] = [
  {
    id: "planning-home-natural-light",
    slug: "planning-home-natural-light",
    title: "How to Plan a Home Around Natural Light",
    excerpt:
      "A practical set of questions for understanding sun, shade, orientation and the way light moves through a home.",
    body: [
      "Natural light is not a finish applied at the end of a project. It is one of the first conditions that can help organise a home: where a room opens, where a wall holds privacy, and where a threshold becomes a place to pause.",
      "Start by noticing the site at different times of day. A morning-facing opening may support a slow start, while a carefully shaded west edge can protect a room from late heat. The useful question is not simply how to get more glass, but how to make each opening do the right kind of work.",
      "A courtyard, lightwell or planted edge can give daylight a deeper route into the plan. These spaces also create a relationship between rooms, so that a home feels connected without every room being exposed. The final balance depends on climate, privacy, structure and the routines of the people who will use it.",
      "Before fixing a layout, draw the day as a sequence of changing conditions. Note where you would like brightness, where a softer glow would be better, and where shadow is part of comfort. These observations can become useful design questions for a later, owner-approved brief.",
    ],
    headings: ["Begin with observation", "Think beyond more glass", "Let light become a sequence"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Evening clerestory lighting accentuating deep architectural reveals",
    readTime: "5 min read",
    publishedLabel: "Draft editorial note",
    isConcept: true,
    ...serviceApproval,
  },
  {
    id: "glass-stone-timber-material-harmony",
    slug: "glass-stone-timber-material-harmony",
    title: "Glass, Stone and Timber: Thinking About Material Harmony",
    excerpt:
      "Material harmony is less about matching finishes and more about giving each surface a clear role in the whole.",
    body: [
      "A material palette becomes convincing when it has a rhythm. Stone can provide weight, timber can hold warmth, and glass can introduce reflection or a visual connection. The aim is not to make every material speak at once.",
      "Begin with the conditions of the project. A high-touch surface may need a different degree of tactility from a façade plane. A threshold may benefit from a material that can take shadow, dust and daily contact without losing its character.",
      "Junctions deserve the same attention as the samples themselves. A small reveal, a change in level or a consistent line can keep unlike materials from becoming visually noisy. Where a glass edge meets a stone frame, depth and shadow may be more important than contrast.",
      "It can help to reduce the palette to three or four primary ideas, then test how they behave in morning light, warm artificial light and shade. This is a starting exercise for discussion, not a substitute for approved specifications or technical review.",
    ],
    headings: ["Give materials a role", "Study the junctions", "Test the palette in changing light"],
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Material study of travertine, oak and precision shadow gap",
    readTime: "4 min read",
    publishedLabel: "Draft editorial note",
    isConcept: true,
    ...serviceApproval,
  },
  {
    id: "questions-before-architecture-project",
    slug: "questions-before-architecture-project",
    title: "Questions to Consider Before Beginning an Architectural Project",
    excerpt:
      "The clearest first brief is often a collection of honest priorities, constraints and unanswered questions.",
    body: [
      "Before a project begins, it is useful to make the unknowns visible. What needs to change? What should remain? Who will use the space, and which routines should the design support more easily? A perfect brief is not required; a shared starting point is.",
      "Site information is equally important. Gather what is available about access, orientation, existing structure, approvals and neighbouring conditions. The first conversation can then focus on what is known, what needs checking and what kind of design decision comes next.",
      "Budget is best treated as a project condition rather than a number added at the end. An approximate range, priorities and areas of flexibility can help a design conversation stay practical without pretending that a quote or feasibility assessment has already been made.",
      "Finally, think about the kind of communication that would make you comfortable. Ask how options will be shared, when decisions need to be made and which responsibilities still need to be confirmed. These questions create a useful foundation for an owner-approved scope.",
    ],
    headings: ["Make the unknowns visible", "Bring the site into the first conversation", "Talk about priorities and communication"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Architectural threshold with stepped levels and balanced illumination",
    readTime: "5 min read",
    publishedLabel: "Draft editorial note",
    isConcept: true,
    ...serviceApproval,
  },
];

const faqs: readonly FAQItem[] = [
  {
    id: "first-conversation",
    question: "What should I share before an initial conversation?",
    answer:
      "A short description of the space, its location, what you would like to change and any timing or access constraints is a useful start. Photos, sketches or a simple list of priorities can also help. Initial discovery consultations carry a baseline ₹10,000 session allocation.",
    ownerApprovalRequired: true,
  },
  {
    id: "project-type",
    question: "Can I enquire about a home, interior or commercial space?",
    answer:
      "The studio concept welcomes luxury residential villas, structural glass facades, bespoke interior spatial planning, and commercial projects across Sector 57, Gurugram and the NCR region.",
    ownerApprovalRequired: true,
  },
  {
    id: "plans",
    question: "Do I need drawings or a complete brief already?",
    answer:
      "No complete brief is assumed for a first conversation. Existing drawings, measurements and references can be useful when available, while early questions about use, priorities and constraints are equally valuable.",
    ownerApprovalRequired: true,
  },
  {
    id: "fees",
    question: "How are fees and project scope discussed?",
    answer:
      "Discovery sessions carry a preliminary ₹10,000 consultation baseline. Full architectural design, statutory approval coordination, and site supervision fees are structured transparently based on project scale and complexity.",
    ownerApprovalRequired: true,
  },
  {
    id: "approvals",
    question: "Can you guarantee planning approvals or a construction timeline?",
    answer:
      "Approvals, statutory sanctioning, structural consultants, site conditions and construction timelines are managed through coordinated professional stages tailored to Gurugram municipal requirements.",
    ownerApprovalRequired: true,
  },
  {
    id: "enquiry-details",
    question: "What happens when I use the enquiry form?",
    answer:
      "In this demonstration, the form validates your brief locally and prepares your enquiry for immediate connection via WhatsApp (+91 94669 40493) or direct call.",
    ownerApprovalRequired: false,
  },
];

const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Initial conversation & Discovery",
    description: "Share the space, the people who use it and the question you want the design to help answer. Baseline ₹10,000 consultation discovery.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Collaborative design consultation table with natural illumination",
    ownerApprovalRequired: true,
  },
  {
    number: "02",
    title: "Requirements & Site Understanding",
    description: "Bring together the available information, sun angles, wind paths, structural constraints and priorities before a direction is fixed.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Site study analyzing orientation, massing and natural light",
    ownerApprovalRequired: true,
  },
  {
    number: "03",
    title: "Design Direction & Massing",
    description: "Explore the relationships between plan, light, material and the everyday experience of the space.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Cantilevered stone and glass architectural study",
    ownerApprovalRequired: true,
  },
  {
    number: "04",
    title: "Design Development & Glazing",
    description: "Refine the chosen direction through clearer drawings, material selections, facade engineering and coordinated decisions.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Refined architectural drawings and material composition",
    ownerApprovalRequired: true,
  },
  {
    number: "05",
    title: "Coordination & Execution",
    description: "Confirm statutory details, structural engineering handoffs, material procurement and site execution supervision.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Completed architectural pavilion in serene landscape",
    ownerApprovalRequired: true,
  },
];

const navigation: readonly NavigationItem[] = [
  { label: "Home", page: "home", href: "/" },
  { label: "About", page: "about", href: "/about" },
  { label: "Services", page: "services", href: "/services" },
  { label: "Projects", page: "projects", href: "/projects" },
  { label: "Process", page: "process", href: "/process" },
  { label: "Insights", page: "articles", href: "/insights" },
  { label: "Contact", page: "contact", href: "/contact" },
];

export const architectSector57Demo: BusinessConfig = {
  slug: "architect-sector-57",
  sourceUrl: "https://glassy.in/glass-business/architect-sector-57-gurugram/",
  name: "ARCHITECT - Sector 57",
  shortName: "ARCHITECT",
  branding: {
    name: "ARCHITECT - Sector 57",
    wordmark: "ARCHITECT",
    tagline: "Bespoke Architecture, Structural Glass Facades & Spatial Design · Sector 57, Gurugram",
    primaryColor: "#111210",
    accentColor: "#A39274",
    provisional: true,
    isProvisional: true,
  },
  contact: {
    phone: "+91 94669 40493",
    whatsapp: "+91 94669 40493",
    address: {
      line1: "PLOT NO 2585P, Sector 57 Road, near MKM Market Road, Block G, Sushant Lok 2, Sector 57",
      city: "Gurugram",
      region: "Haryana",
      postalCode: "122011",
      country: "India",
      formatted:
        "PLOT NO 2585P, Sector 57 Road, near MKM Market Road, Block G, Sushant Lok 2, Sector 57, Gurugram, Haryana 122011, India",
    },
  },
  location: {
    label: "Sector 57, Gurugram",
    city: "Gurugram",
    region: "Haryana",
    country: "India",
    mapQuery:
      "https://www.google.com/maps/search/?api=1&query=ARCHITECT%20-%20Sector%2057%20Sector%2057%2C%20Gurugram%2C%20Haryana",
  },
  metadata: {
    title: "ARCHITECT · Sector 57, Gurugram | Luxury Architecture & Facade Studio",
    description:
      "Architectural planning, structural glazing facades, and warm minimal interior spatial design in Sector 57, Gurugram. Direct consultation with the studio.",
  },
  services,
  projects,
  articles,
  navigation,
  faqs,
  processSteps,
  ownerApprovalRequired: true,
  demoMode: true,
  noIndex: true,
};

export const BUSINESS_DEMOS: Readonly<Record<string, BusinessConfig>> = {
  [architectSector57Demo.slug]: architectSector57Demo,
};

export const businessDemos = BUSINESS_DEMOS;
