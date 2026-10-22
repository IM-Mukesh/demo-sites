import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircleAlert, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import type { BusinessConfig, Project, Service } from "../../types/business";
import { buildDemoPath, getCallUrl, getMapsUrl, getWhatsAppUrl } from "../../lib/site-utils";

export function siteHref(business: BusinessConfig, ...segments: string[]): string {
  return buildDemoPath(business.slug, segments, "/demo");
}

export function SiteImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const isRemote = src.startsWith("http://") || src.startsWith("https://");
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized={isRemote}
      className={className}
    />
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div style={{ maxWidth: align === "right" ? 700 : 820, marginLeft: align === "right" ? "auto" : undefined }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="display display-md" style={{ marginTop: eyebrow ? 18 : undefined }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export function ConceptNote({ children }: { children?: ReactNode }) {
  return (
    <p className="concept-note">
      <CircleAlert size={15} strokeWidth={1.7} aria-hidden="true" />
      <span>{children ?? "Illustrative concept content. Confirm with the owner before publishing."}</span>
    </p>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`text-link ${className}`.trim()} href={href}>
      {children}
      <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}

export function Breadcrumbs({
  business,
  items,
}: {
  business: BusinessConfig;
  items: readonly { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="muted" style={{ fontSize: "0.72rem", marginBottom: 23 }}>
      <Link href={siteHref(business)}>Home</Link>
      {items.map((item) => (
        <span key={item.label}>
          <span aria-hidden="true" style={{ margin: "0 9px", color: "var(--taupe)" }}>
            /
          </span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function ServiceCard({ business, service, index }: { business: BusinessConfig; service: Service; index: number }) {
  return (
    <article className="service-card">
      <Link href={siteHref(business, "services", service.slug)} aria-label={`Explore ${service.name}`}>
        <div className="image-frame service-card__image">
          <SiteImage src={service.image} alt={service.imageAlt} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" />
        </div>
        <div className="service-card__number">0{index + 1}</div>
        <h3>{service.name}</h3>
        <p>{service.summary}</p>
        <span className="text-link">View service <ArrowUpRight aria-hidden="true" /></span>
      </Link>
    </article>
  );
}

export function ProjectCard({ business, project }: { business: BusinessConfig; project: Project }) {
  return (
    <article className="project-card">
      <Link href={siteHref(business, "projects", project.slug)} aria-label={`View ${project.name} concept`}>
        <div className="image-frame project-card__image">
          <SiteImage src={project.image} alt={project.imageAlt} sizes="(max-width: 640px) 100vw, 58vw" />
        </div>
        <div className="project-card__meta">
          <span>{project.projectType}</span>
          <span>Concept visualization</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <span className="text-link">Open study <ArrowUpRight aria-hidden="true" /></span>
      </Link>
    </article>
  );
}

export function ContactActions({ business, light = false }: { business: BusinessConfig; light?: boolean }) {
  const callUrl = getCallUrl(business.contact.phone);
  const whatsappUrl = getWhatsAppUrl(
    business.contact.whatsapp,
    "Hello, I would like to discuss a possible architecture or spatial-design project.",
  );
  const mapUrl = getMapsUrl(business.location);
  const buttonClass = light ? "button button--light" : "button";

  return (
    <div className="button-row">
      {callUrl ? (
        <a className={buttonClass} href={callUrl}>
          <Phone size={15} aria-hidden="true" /> Call {business.contact.phone}
        </a>
      ) : null}
      {whatsappUrl ? (
        <a className={light ? "button button--outline" : "button button--outline"} href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={15} aria-hidden="true" /> WhatsApp
        </a>
      ) : null}
      {mapUrl ? (
        <a className="text-link" href={mapUrl} target="_blank" rel="noreferrer">
          <MapPin size={15} aria-hidden="true" /> Directions
        </a>
      ) : null}
    </div>
  );
}

export function CallToAction({ business, dark = true }: { business: BusinessConfig; dark?: boolean }) {
  return (
    <section className={`section ${dark ? "section--dark" : "section--olive"}`}>
      <div className="container cta-band">
        <div>
          <Eyebrow>Start a conversation</Eyebrow>
          <h2 className="display display-md" style={{ marginTop: 18 }}>
            Have a space in mind?
          </h2>
          <p>Share a little about the place, the people and the question you want the design to help answer.</p>
        </div>
        <div className="cta-band__actions">
          <ContactActions business={business} light />
          <div style={{ marginTop: 18 }}>
            <Link className="text-link" href={siteHref(business, "contact")}>
              Send an enquiry <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
