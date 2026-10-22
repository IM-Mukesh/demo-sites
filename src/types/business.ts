/**
 * Shared domain types for a business demo.
 *
 * These types intentionally describe content rather than making claims about
 * the business behind a demo.  Content can therefore be rendered by the UI
 * without losing the approval/disclosure state that belongs with it.
 */

export const APPROVAL_STATUSES = [
  "draft",
  "pending",
  "approved",
  "rejected",
] as const;

export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

export type BusinessSlug = string;

export type NavigationPage =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "articles"
  | "contact"
  | "process"
  | "faq"
  | "privacy"
  | "terms";

export interface ApprovalFields {
  /** Whether the business owner must approve this content before publishing. */
  ownerApprovalRequired: boolean;
  /** Whether the UI should show that this content is disclosed demo content. */
  disclosure: boolean;
  approvalStatus: ApprovalStatus;
  disclosureNote: string;
}

export interface Service extends ApprovalFields {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  deliverables: readonly string[];
  image: string;
  imageAlt: string;
  focus: readonly string[];
}

export interface Project extends ApprovalFields {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  locationLabel: string;
  projectType: string;
  /** Concept work is kept explicit so it cannot be presented as completed work. */
  isConcept: boolean;
  category: "residential" | "commercial" | "interiors" | "material";
  image: string;
  imageAlt: string;
  gallery: readonly string[];
  designIntent: string;
  materials: readonly string[];
  details: readonly string[];
}

export interface Article extends ApprovalFields {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: readonly string[];
  /** Articles in this demo do not imply publication or authorship approval. */
  isConcept: boolean;
  image: string;
  imageAlt: string;
  readTime: string;
  publishedLabel: string;
  headings: readonly string[];
}

export interface NavigationItem {
  label: string;
  page: NavigationPage;
  href: string;
}

export interface BrandingConfig {
  name: string;
  wordmark: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  /** Both names are kept explicit for consumers that use either convention. */
  provisional: boolean;
  isProvisional: boolean;
}

export interface PublicAddress {
  line1: string;
  city: string;
  region: string;
  postalCode?: string;
  country: string;
  formatted: string;
}

export interface ContactDetails {
  phone: string;
  whatsapp: string;
  address: PublicAddress;
}

export interface LocationDetails {
  label: string;
  city: string;
  region: string;
  country: string;
  mapQuery: string;
}

export interface MetadataConfig {
  title: string;
  description: string;
}

export interface BusinessConfig {
  slug: BusinessSlug;
  sourceUrl: string;
  name: string;
  shortName: string;
  branding: BrandingConfig;
  contact: ContactDetails;
  location: LocationDetails;
  metadata: MetadataConfig;
  services: readonly Service[];
  projects: readonly Project[];
  articles: readonly Article[];
  navigation: readonly NavigationItem[];
  faqs: readonly FAQItem[];
  processSteps: readonly ProcessStep[];
  ownerApprovalRequired: boolean;
  demoMode: boolean;
  noIndex: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  ownerApprovalRequired: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ownerApprovalRequired: boolean;
}
