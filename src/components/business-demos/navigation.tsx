"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, MapPin, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { BusinessConfig } from "../../types/business";
import { getCallUrl, getMapsUrl } from "../../lib/site-utils";
import { siteHref } from "./shared";

function hrefFor(business: BusinessConfig, href: string): string {
  const segments = href.split("/").filter(Boolean);
  return siteHref(business, ...segments);
}

export function Navigation({ business }: { business: BusinessConfig }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const atHome = pathname === siteHref(business);
  const callUrl = getCallUrl(business.contact.phone);
  const mapUrl = getMapsUrl(business.location);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Top Studio Bar */}
      <div className="studio-top-ticker bg-[#0D0E0C] text-stone-300 text-[11px] py-1.5 px-4 border-b border-white/10 hidden md:block relative z-30">
        <div className="container-wide flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
              <Star size={11} className="fill-amber-300" /> 5.0 Star Studio
            </span>
            <span className="text-white/20">|</span>
            <span className="text-stone-300">
              Sector 57, Gurugram · Architectural Planning & Structural Glass
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#C5A880] font-mono">₹10,000 Discovery Consultation</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <MapPin size={11} className="text-[#C5A880]" /> Sushant Lok 2, Sector 57
              </a>
            )}
            {callUrl && (
              <a
                href={callUrl}
                className="hover:text-white transition-colors flex items-center gap-1 text-white font-semibold"
              >
                <Phone size={11} className="text-[#C5A880]" /> {business.contact.phone}
              </a>
            )}
          </div>
        </div>
      </div>

      <header
        className={`site-header ${!atHome ? "site-header--solid" : ""} ${
          scrolled ? "site-header--scrolled" : ""
        } ${menuOpen ? "site-header--open" : ""}`}
      >
        <div className="site-header__inner container-wide">
          <Link
            className="site-header__brand"
            href={siteHref(business)}
            aria-label={`${business.branding.name} home`}
            onClick={closeMenu}
          >
            <Image
              src="/brand/architect-wordmark.svg"
              width={180}
              height={40}
              alt={business.branding.name}
              priority
            />
          </Link>
          <nav className="site-header__nav" aria-label="Primary navigation">
            {business.navigation.map((item) => {
              const href = hrefFor(business, item.href);
              const active =
                pathname === href || (href !== siteHref(business) && pathname.startsWith(`${href}/`));
              return (
                <Link
                  key={item.label}
                  className={active ? "is-active" : ""}
                  href={href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="site-header__actions">
            {callUrl && (
              <a
                href={callUrl}
                className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 text-stone-300 hover:text-white hover:border-white transition-colors"
              >
                <Phone size={12} className="text-[#C5A880]" /> {business.contact.phone}
              </a>
            )}
            <Link
              className="button button--small site-header__cta"
              href={siteHref(business, "contact")}
              onClick={closeMenu}
            >
              Discuss a project
            </Link>
            <button
              className="site-header__toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div
          id="mobile-navigation"
          className={`mobile-navigation ${menuOpen ? "mobile-navigation--open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-navigation__links">
            {business.navigation.map((item) => (
              <Link
                key={item.label}
                href={hrefFor(business, item.href)}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span>0{business.navigation.indexOf(item) + 1}</span>
                {item.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-stone-800 mt-4 space-y-3">
              {callUrl && (
                <a
                  href={callUrl}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white/10 text-white font-semibold text-xs tracking-wider uppercase"
                >
                  <Phone size={14} className="text-[#C5A880]" /> Call {business.contact.phone}
                </a>
              )}
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/20 text-stone-300 text-xs tracking-wider uppercase"
                >
                  <MapPin size={14} className="text-[#C5A880]" /> Sector 57 Location
                </a>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
