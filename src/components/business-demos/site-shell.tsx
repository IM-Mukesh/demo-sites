import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { BusinessConfig } from "../../types/business";
import { getCallUrl, getMapsUrl, getWhatsAppUrl } from "../../lib/site-utils";
import { Navigation } from "./navigation";
import { siteHref } from "./shared";

export function SiteShell({ business, children }: { business: BusinessConfig; children: ReactNode }) {
  return (
    <>
      <Navigation business={business} />
      <main className="site-main">{children}</main>
      <Footer business={business} />
    </>
  );
}

function Footer({ business }: { business: BusinessConfig }) {
  const year = new Date().getFullYear();
  const callUrl = getCallUrl(business.contact.phone);
  const whatsappUrl = getWhatsAppUrl(business.contact.whatsapp, "Hello, I would like to discuss a possible project.");
  const mapUrl = getMapsUrl(business.location);

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link href={siteHref(business)} aria-label={`${business.branding.name} home`}>
            <Image src="/brand/architect-wordmark.svg" width={180} height={40} alt={business.branding.name} />
          </Link>
          <p>Thoughtful spaces, material clarity and a provisional digital home for a Sector 57 design conversation.</p>
        </div>
        <div>
          <p className="footer__heading">Explore</p>
          <ul className="footer__links">
            <li><Link href={siteHref(business, "about")}>About</Link></li>
            <li><Link href={siteHref(business, "services")}>Services</Link></li>
            <li><Link href={siteHref(business, "projects")}>Projects</Link></li>
            <li><Link href={siteHref(business, "process")}>Process</Link></li>
            <li><Link href={siteHref(business, "insights")}>Insights</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer__heading">Contact</p>
          <ul className="footer__contact">
            <li>{business.contact.address.city}, {business.contact.address.region}</li>
            {callUrl ? <li><a href={callUrl}>{business.contact.phone}</a></li> : null}
            {whatsappUrl ? <li><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a></li> : null}
            {mapUrl ? <li><a href={mapUrl} target="_blank" rel="noreferrer">Google Maps directions</a></li> : null}
          </ul>
        </div>
        <div>
          <p className="footer__heading">Address</p>
          <p style={{ margin: 0, color: "rgba(245, 243, 237, 0.76)", fontSize: "0.87rem" }}>{business.contact.address.formatted}</p>
        </div>
      </div>
      {business.demoMode ? (
        <div className="container footer__disclosure">
          This is a private sales demonstration for a prospective local business. The ARCHITECT name, visual identity, service narratives, concept projects and editorial content are provisional; imagery is illustrative and not verified completed work. Confirm all information before launch.
        </div>
      ) : null}
      <div className="container footer__bottom">
        <span>© {year} {business.branding.name}. Concept preview.</span>
        <div className="footer__legal">
          <Link href={siteHref(business, "privacy")}>Privacy draft</Link>
          <Link href={siteHref(business, "terms")}>Terms draft</Link>
          <Link href={siteHref(business, "faq")}>FAQs</Link>
        </div>
      </div>
    </footer>
  );
}
