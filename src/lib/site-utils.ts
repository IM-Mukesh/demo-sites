import type {
  LocationDetails,
  MetadataConfig,
  PublicAddress,
} from "../types/business";

function cleanSegment(value: string): string {
  return value.trim().replace(/^\/+|\/+$/g, "");
}

export function normalizeBasePath(basePath = ""): string {
  const cleaned = basePath.trim().replace(/\\/g, "/");

  if (cleaned === "" || cleaned === "/") {
    return "";
  }

  return `/${cleaned.replace(/^\/+|\/+$/g, "")}`;
}

export function joinSitePath(...parts: readonly string[]): string {
  const cleaned = parts.map(cleanSegment).filter((part) => part.length > 0);
  return cleaned.length === 0 ? "/" : `/${cleaned.join("/")}`;
}

export function getDemoBasePath(
  slug: string,
  appBasePath = "",
): string {
  return joinSitePath(normalizeBasePath(appBasePath), slug);
}

export function buildDemoPath(
  slug: string,
  pageSegments: readonly string[] = [],
  appBasePath = "",
): string {
  return joinSitePath(
    normalizeBasePath(appBasePath),
    slug,
    ...pageSegments,
  );
}

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

function phoneWithOptionalPlus(phone: string): string | null {
  const trimmed = phone.trim();
  const digits = digitsOnly(trimmed);

  if (digits.length === 0) {
    return null;
  }

  return trimmed.startsWith("+") ? `+${digits}` : digits;
}

export function getWhatsAppUrl(
  phone: string,
  message?: string,
): string | null {
  const digits = digitsOnly(phone);

  if (digits.length === 0) {
    return null;
  }

  const query = message === undefined ? "" : `?text=${encodeURIComponent(message)}`;
  return `https://wa.me/${digits}${query}`;
}

export const buildWhatsAppUrl = getWhatsAppUrl;

export function getCallUrl(phone: string): string | null {
  const normalized = phoneWithOptionalPlus(phone);
  return normalized === null ? null : `tel:${normalized}`;
}

export const buildCallUrl = getCallUrl;

function locationQuery(location: LocationDetails | PublicAddress | string): string {
  if (typeof location === "string") {
    return location.trim();
  }

  if ("mapQuery" in location) {
    return location.mapQuery.trim();
  }

  return location.formatted.trim();
}

export function getMapsUrl(
  location: LocationDetails | PublicAddress | string,
): string | null {
  const query = locationQuery(location);
  if (query.startsWith("http://") || query.startsWith("https://")) {
    return query;
  }
  return query.length === 0
    ? null
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const buildMapsUrl = getMapsUrl;

function safeText(value: string, fallback: string, maxLength: number): string {
  const normalized = value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const source = normalized.length === 0 ? fallback.trim() : normalized;
  return source.length <= maxLength
    ? source
    : `${source.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function safeMetadataTitle(
  title: string | undefined,
  fallback = "",
): string {
  return safeText(title ?? "", fallback, 60);
}

export function safeMetadataDescription(
  description: string | undefined,
  fallback = "",
): string {
  return safeText(description ?? "", fallback, 160);
}

export function getSafeMetadata(
  metadata: Partial<MetadataConfig>,
  fallback: MetadataConfig,
): MetadataConfig {
  return {
    title: safeMetadataTitle(metadata.title, fallback.title),
    description: safeMetadataDescription(
      metadata.description,
      fallback.description,
    ),
  };
}
