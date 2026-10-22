"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, MapPin, Star, MessageCircle, ArrowUpRight, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { BusinessConfig } from "../../types/business";
import { getCallUrl, getMapsUrl, getWhatsAppUrl } from "../../lib/site-utils";
import { siteHref } from "./shared";

function hrefFor(business: BusinessConfig, href: string): string {
  const segments = href.split("/").filter(Boolean);
  return siteHref(business, ...segments);
}

export function Navigation({ business }: { business: BusinessConfig }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const atHome = pathname === siteHref(business) || pathname === `/demo/${business.slug}` || pathname === `/${business.slug}`;
  const callUrl = getCallUrl(business.contact.phone);
  const mapUrl = getMapsUrl(business.location);
  const whatsappUrl = getWhatsAppUrl(
    business.contact.whatsapp,
    "Hello ARCHITECT Studio (Sector 57), I would like to schedule a consultation.",
  );

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

  // Close menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Main Sticky Header */}
      <header
        className={`site-header ${!atHome ? "site-header--solid" : ""} ${
          scrolled ? "site-header--scrolled" : ""
        } ${menuOpen ? "site-header--open" : ""}`}
      >
        {/* Top Studio Bar (Desktop) */}
        <div className="studio-top-ticker bg-[#0D0E0C]/90 text-stone-300 text-[11px] py-1.5 px-4 border-b border-white/10 hidden md:block">
          <div className="container-wide flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
                <Star size={11} className="fill-amber-300" /> 5.0 Star Studio
              </span>
              <span className="text-white/20">|</span>
              <span className="text-stone-300">
                Sector 57, Gurugram · Architectural Planning &amp; Structural Glass
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[#C5A880] font-mono">Bespoke Architectural Studio</span>
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

        <div className="site-header__inner container-wide">
          <Link
            className="site-header__brand"
            href={siteHref(business)}
            aria-label={`${business.branding.name} home`}
            onClick={closeMenu}
          >
            <Image
              src="/brand/architect-wordmark.svg"
              width={160}
              height={40}
              alt={business.branding.name}
              priority
              style={{ width: "auto", height: "32px" }}
              className="h-8 sm:h-9 w-auto max-w-[140px] sm:max-w-[160px] object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
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

          {/* Header Action Buttons & Hamburger Toggle */}
          <div className="site-header__actions flex items-center gap-3">
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

            {/* Mobile Hamburger Button */}
            <button
              className="site-header__toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* BULLETPROOF FULLSCREEN MOBILE MENU OVERLAY (FRAMER MOTION)                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            key="mobile-nav-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#0E0F0D]/98 backdrop-blur-2xl text-white flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Link href={siteHref(business)} onClick={closeMenu} className="inline-block">
                <Image
                  src="/brand/architect-wordmark.svg"
                  width={160}
                  height={40}
                  alt={business.branding.name}
                  style={{ width: "auto", height: "28px" }}
                  className="h-7 sm:h-8 w-auto max-w-[140px] object-contain brightness-0 invert"
                />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links with Staggered Entrance */}
            <div className="px-6 py-8 flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] mb-4 block">
                Studio Directory · Sector 57
              </span>

              <nav className="space-y-2">
                {business.navigation.map((item, idx) => {
                  const href = hrefFor(business, item.href);
                  const active =
                    pathname === href || (href !== siteHref(business) && pathname.startsWith(`${href}/`));

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx, duration: 0.3 }}
                    >
                      <Link
                        href={href}
                        onClick={closeMenu}
                        className={`flex items-baseline justify-between py-3 border-b border-white/10 transition-colors ${
                          active
                            ? "text-[#C5A880] font-semibold"
                            : "text-stone-200 hover:text-white"
                        }`}
                      >
                        <span className="font-serif text-2xl sm:text-3xl tracking-tight">
                          {item.label}
                        </span>
                        <span className="text-xs font-mono text-stone-500 tracking-widest">
                          0{idx + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Quick Contact Strip */}
            <div className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-md">
              <div className="max-w-lg mx-auto space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span>Sector 57, Gurugram</span>
                  <span className="text-[#C5A880] font-mono">By Prior Appointment</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {callUrl && (
                    <a
                      href={callUrl}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-colors border border-white/10"
                    >
                      <Phone size={14} className="text-[#C5A880]" /> Call Studio
                    </a>
                  )}

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-md"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  )}
                </div>

                {mapUrl && (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-stone-400 hover:text-white text-xs transition-colors"
                  >
                    <MapPin size={13} className="text-[#C5A880]" /> Sushant Lok 2 Directions <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
