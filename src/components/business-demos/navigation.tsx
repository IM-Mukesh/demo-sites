"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { BusinessConfig } from "../../types/business";
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
    <header className={`site-header ${!atHome ? "site-header--solid" : ""} ${scrolled ? "site-header--scrolled" : ""} ${menuOpen ? "site-header--open" : ""}`}>
      <div className="site-header__inner container-wide">
        <Link className="site-header__brand" href={siteHref(business)} aria-label={`${business.branding.name} home`} onClick={closeMenu}>
          <Image src="/brand/architect-wordmark.svg" width={180} height={40} alt={business.branding.name} />
        </Link>
        <nav className="site-header__nav" aria-label="Primary navigation">
          {business.navigation.map((item) => {
            const href = hrefFor(business, item.href);
            const active = pathname === href || (href !== siteHref(business) && pathname.startsWith(`${href}/`));
            return (
              <Link key={item.label} className={active ? "is-active" : ""} href={href} onClick={closeMenu}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="site-header__actions">
          <Link className="button button--small site-header__cta" href={siteHref(business, "contact")} onClick={closeMenu}>
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
      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? "mobile-navigation--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-navigation__links">
          {business.navigation.map((item) => (
            <Link key={item.label} href={hrefFor(business, item.href)} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span>0{business.navigation.indexOf(item) + 1}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
