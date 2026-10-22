import { BUSINESS_DEMOS } from "../data/business-demos";
import type {
  Article,
  BusinessConfig,
  BusinessSlug,
  Project,
  Service,
} from "../types/business";

export type StaticDemoPage =
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

export type DetailDemoPage = "service" | "project" | "article";
export type DemoPage = StaticDemoPage | DetailDemoPage;

export interface DemoRouteParams {
  slug: string | readonly string[];
  page?: string | readonly string[];
}

interface DemoRouteBase {
  slug: BusinessSlug;
  business: BusinessConfig;
  segments: readonly string[];
}

export type DemoRoute =
  | (DemoRouteBase & { kind: "page"; page: StaticDemoPage })
  | (DemoRouteBase & {
      kind: "service";
      page: "service";
      service: Service;
    })
  | (DemoRouteBase & {
      kind: "project";
      page: "project";
      project: Project;
    })
  | (DemoRouteBase & {
      kind: "article";
      page: "article";
      article: Article;
    });

type RouteInput = string | readonly string[] | DemoRouteParams;
type PageInput = string | readonly string[] | undefined;

function isRouteParams(input: RouteInput): input is DemoRouteParams {
  return typeof input === "object" && !Array.isArray(input);
}

function decodeSegment(segment: string): string | null {
  const trimmed = segment.trim();

  if (trimmed.length === 0) {
    return null;
  }

  try {
    return decodeURIComponent(trimmed).toLowerCase();
  } catch {
    return null;
  }
}

function normalizeSegments(input: PageInput): string[] | null {
  if (input === undefined) {
    return [];
  }

  const rawSegments = typeof input === "string" ? [input] : input;
  const normalized: string[] = [];

  for (const segment of rawSegments) {
    const decoded = decodeSegment(segment);

    if (decoded === null) {
      return null;
    }

    normalized.push(decoded);
  }

  return normalized;
}

function normalizeSlug(input: string | readonly string[]): string | null {
  if (typeof input === "string") {
    return decodeSegment(input);
  }

  if (input.length !== 1) {
    return null;
  }

  return decodeSegment(input[0]);
}

function findBySlug<T extends { slug: string }>(
  records: readonly T[],
  slug: string,
): T | null {
  return records.find((record) => record.slug === slug) ?? null;
}

export function getBusinessDemo(slug: string): BusinessConfig | null {
  const normalizedSlug = decodeSegment(slug);
  return normalizedSlug === null ? null : BUSINESS_DEMOS[normalizedSlug] ?? null;
}

/** Alias useful to callers that treat the demo registry as a collection. */
export const getDemoBySlug = getBusinessDemo;

export function findServiceBySlug(
  business: BusinessConfig,
  serviceSlug: string,
): Service | null {
  const normalizedSlug = decodeSegment(serviceSlug);
  return normalizedSlug === null
    ? null
    : findBySlug(business.services, normalizedSlug);
}

export function findProjectBySlug(
  business: BusinessConfig,
  projectSlug: string,
): Project | null {
  const normalizedSlug = decodeSegment(projectSlug);
  return normalizedSlug === null
    ? null
    : findBySlug(business.projects, normalizedSlug);
}

export function findArticleBySlug(
  business: BusinessConfig,
  articleSlug: string,
): Article | null {
  const normalizedSlug = decodeSegment(articleSlug);
  return normalizedSlug === null
    ? null
    : findBySlug(business.articles, normalizedSlug);
}

type BusinessOrSlug = BusinessConfig | string;

function resolveBusiness(input: BusinessOrSlug): BusinessConfig | null {
  return typeof input === "string" ? getBusinessDemo(input) : input;
}

export function getServiceBySlug(
  business: BusinessOrSlug,
  serviceSlug: string,
): Service | null {
  const resolvedBusiness = resolveBusiness(business);
  return resolvedBusiness === null
    ? null
    : findServiceBySlug(resolvedBusiness, serviceSlug);
}

export function getProjectBySlug(
  business: BusinessOrSlug,
  projectSlug: string,
): Project | null {
  const resolvedBusiness = resolveBusiness(business);
  return resolvedBusiness === null
    ? null
    : findProjectBySlug(resolvedBusiness, projectSlug);
}

export function getArticleBySlug(
  business: BusinessOrSlug,
  articleSlug: string,
): Article | null {
  const resolvedBusiness = resolveBusiness(business);
  return resolvedBusiness === null
    ? null
    : findArticleBySlug(resolvedBusiness, articleSlug);
}

function getRouteInput(
  input: RouteInput,
  pageInput: PageInput,
): { slug: string; page: string[] } | null {
  if (isRouteParams(input)) {
    const slug = normalizeSlug(input.slug);
    const page = normalizeSegments(input.page);

    return slug === null || page === null ? null : { slug, page };
  }

  const slug = normalizeSlug(input);
  const page = normalizeSegments(pageInput);

  return slug === null || page === null ? null : { slug, page };
}

export function resolveDemoRoute(
  input: RouteInput,
  pageInput?: PageInput,
): DemoRoute | null {
  const routeInput = getRouteInput(input, pageInput);

  if (routeInput === null) {
    return null;
  }

  const business = getBusinessDemo(routeInput.slug);

  if (business === null) {
    return null;
  }

  const baseRoute: DemoRouteBase = {
    slug: business.slug,
    business,
    segments: routeInput.page,
  };

  if (routeInput.page.length === 0 || routeInput.page[0] === "home") {
    if (routeInput.page.length > 1) {
      return null;
    }

    return { ...baseRoute, kind: "page", page: "home" };
  }

  if (routeInput.page.length === 1) {
    const page = routeInput.page[0];

    if (page === "insights") {
      return { ...baseRoute, kind: "page", page: "articles" };
    }

    if (
      page === "about" ||
      page === "services" ||
      page === "projects" ||
      page === "articles" ||
      page === "contact" ||
      page === "process" ||
      page === "faq" ||
      page === "privacy" ||
      page === "terms"
    ) {
      return { ...baseRoute, kind: "page", page };
    }

    return null;
  }

  if (routeInput.page.length !== 2) {
    return null;
  }

  const [collection, itemSlug] = routeInput.page;

  if (collection === "services") {
    const service = findServiceBySlug(business, itemSlug);
    return service === null
      ? null
      : { ...baseRoute, kind: "service", page: "service", service };
  }

  if (collection === "projects") {
    const project = findProjectBySlug(business, itemSlug);
    return project === null
      ? null
      : { ...baseRoute, kind: "project", page: "project", project };
  }

  if (collection === "articles" || collection === "insights") {
    const article = findArticleBySlug(business, itemSlug);
    return article === null
      ? null
      : { ...baseRoute, kind: "article", page: "article", article };
  }

  return null;
}
