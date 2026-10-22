import Link from "next/link";
import { ArrowDown, ArrowUpRight, ShieldCheck, Star, Phone, MessageCircle, MapPin, Compass, Sparkles } from "lucide-react";
import type { BusinessConfig } from "../../types/business";
import { ArrowLink, CallToAction, ConceptNote, Eyebrow, ProjectCard, SectionHeading, ServiceCard, SiteImage, siteHref } from "./shared";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { ProjectScopeBuilder, MaterialPaletteExplorer, StudioLocationCard } from "./interactive-studio";
import { getCallUrl, getMapsUrl, getWhatsAppUrl } from "../../lib/site-utils";

export function HomePage({ business }: { business: BusinessConfig }) {
  const callUrl = getCallUrl(business.contact.phone);
  const whatsappUrl = getWhatsAppUrl(
    business.contact.whatsapp,
    "Hello ARCHITECT Studio, I would like to schedule an initial discovery consultation for our project in Gurugram.",
  );
  const mapUrl = getMapsUrl(business.location);

  return (
    <>
      {/* ========================================================================= */}
      {/* HERO SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="hero relative min-h-[100svh] sm:min-h-[92vh] flex items-end overflow-hidden bg-[#0C0D0B] text-white">
        <div className="hero__image absolute inset-0">
          <SiteImage
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Modern luxury residence with cantilevered stone planes and warm evening illumination"
            sizes="100vw"
            priority
          />
          {/* Robust cinematic gradient overlays for pristine contrast on all devices */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0B] via-black/85 to-black/55 z-[1]" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-[1]" />
        </div>

        <div className="hero__content relative z-10 w-[min(100%-32px,1440px)] mx-auto pt-24 sm:pt-36 pb-12 sm:pb-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[#C5A880] text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
                <Compass size={12} className="text-[#C5A880]" />
                <span>Sector 57, Gurugram</span>
                <span className="text-white/25">•</span>
                <span className="text-amber-300 inline-flex items-center gap-1 font-sans">
                  <Star size={11} className="fill-amber-300" /> 5.0
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-stone-300 text-xs font-mono">
                Bespoke Architectural Studio
              </span>
            </div>

            <h1 className="display display-xl text-[#F5F3ED] font-serif max-w-4xl drop-shadow-sm">
              Spaces shaped with purpose. Details designed to endure.
            </h1>

            <p className="hero__lead text-stone-200 text-sm sm:text-base md:text-lg max-w-2xl mt-4 sm:mt-6 leading-relaxed font-light">
              A bespoke architectural, structural glass façade and warm interior practice rooted in Sector 57, Gurugram. We craft considered environments where proportion, daylight, and honest materials live together.
            </p>

            <div className="button-row mt-6 sm:mt-8 gap-3 sm:gap-4 flex-col sm:flex-row items-stretch sm:items-center">
              <Link className="button button--light w-full sm:w-auto" href={siteHref(business, "about")}>
                Explore Our Approach <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              {whatsappUrl && (
                <a
                  className="button button--outline border-white/35 text-white hover:bg-white/10 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={15} className="text-emerald-400" /> WhatsApp Studio
                </a>
              )}
              {callUrl && (
                <a
                  className="button button--outline border-white/25 text-stone-300 hover:text-white hover:border-white/50 items-center gap-2 !hidden sm:!inline-flex"
                  href={callUrl}
                >
                  <Phone size={14} className="text-[#C5A880]" /> Call Studio
                </a>
              )}
            </div>

            <div className="hero__bottom mt-8 sm:mt-16 pt-5 sm:pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 text-xs text-stone-300">
              <div className="flex items-center gap-3 text-[11px] sm:text-xs">
                <span className="font-mono text-[#C5A880]">28.4326° N, 77.0862° E</span>
                <span className="text-white/20">/</span>
                <span className="truncate">Plot 2585P, Sector 57, Gurugram</span>
              </div>
              <span className="hero__scroll hidden sm:inline-flex items-center gap-2 tracking-widest uppercase text-stone-400 text-xs">
                <ArrowDown size={14} aria-hidden="true" /> Scroll To Explore
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STUDIO METRICS BAND                                                      */}
      {/* ========================================================================= */}
      <section className="bg-[#121311] border-y border-white/10 py-10 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal delay={0.05} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif text-[#C5A880] font-medium">5.0 ★</span>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-300">Studio Rating</p>
              <p className="text-xs text-stone-400">Verified Sector 57 Gurugram practice listing</p>
            </Reveal>

            <Reveal delay={0.1} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif text-[#C5A880] font-medium">Bespoke</span>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-300">Spatial Practice</p>
              <p className="text-xs text-stone-400">Comprehensive site orientation & brief review</p>
            </Reveal>

            <Reveal delay={0.15} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif text-[#C5A880] font-medium">100%</span>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-300">Custom Detailing</p>
              <p className="text-xs text-stone-400">Bespoke structural glass, stone & timber joints</p>
            </Reveal>

            <Reveal delay={0.2} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif text-[#C5A880] font-medium">Sector 57</span>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-300">Prime Gurugram</p>
              <p className="text-xs text-stone-400">Block G, Sushant Lok 2 studio access</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* POINT OF VIEW / EDITORIAL INTRODUCTION                                   */}
      {/* ========================================================================= */}
      <section className="section section--tight bg-[#F5F3ED]">
        <div className="container intro-grid">
          <Reveal>
            <Eyebrow>A Point Of View</Eyebrow>
          </Reveal>
          <Reveal delay={0.08} className="intro-grid__copy">
            <h2 className="display display-md font-serif text-[#20211E]">
              Good architecture is felt in the way a space lives.
            </h2>
            <p className="text-stone-700 leading-relaxed">
              Planning, natural light, volume, and material selections should work together so an environment feels both specific and effortlessly calm. Located in Sector 57, Gurugram, our practice bridges structural discipline with sensory warmth—from private multi-generational villas to high-performance structural glass façades.
            </p>
            <div style={{ marginTop: 29 }}>
              <ArrowLink href={siteHref(business, "about")}>Read Our Architectural Philosophy</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE SCOPE & BRIEF BUILDER                                         */}
      {/* ========================================================================= */}
      <section className="section bg-[#0E0F0D] text-white" style={{ paddingTop: 70, paddingBottom: 70 }}>
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Interactive Discovery"
              title="Tailor your project scope before scheduling."
            >
              <p className="text-stone-400 text-sm max-w-2xl mt-4">
                Use our interactive brief configurator to select your typology, site size, and structural needs before scheduling a studio consultation.
              </p>
            </SectionHeading>
          </Reveal>

          <div className="mt-10">
            <Reveal delay={0.1}>
              <ProjectScopeBuilder business={business} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICES SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="section" style={{ paddingTop: 80 }}>
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Core Disciplines"
              title="A design language built around the space, not the sales pitch."
            >
              <p className="muted" style={{ maxWidth: 620, margin: "20px 0 0" }}>
                From early statutory master-planning to structural low-iron glass facades and interior stone detailing. Each discipline is delivered with obsessive clarity.
              </p>
            </SectionHeading>
          </Reveal>

          <div className="service-grid mt-12">
            {business.services.map((service, index) => (
              <Reveal key={service.id} className="service-card-motion" delay={Math.min(index * 0.04, 0.2)}>
                <ServiceCard business={business} service={service} index={index} />
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <ArrowLink href={siteHref(business, "services")}>View all studio services</ArrowLink>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURED PROJECTS ARCHIVE                                                 */}
      {/* ========================================================================= */}
      <section className="section section--tight bg-[#ECE8DE]">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Curated Portfolio"
              title="Concepts that make spatial intention visible."
            >
              <p className="muted" style={{ maxWidth: 600, margin: "20px 0 0" }}>
                A collection of residential, structural glass, and interior projects crafted for the light, dust, and climatic rhythms of Gurugram and North India.
              </p>
            </SectionHeading>
          </Reveal>

          <div className="project-grid mt-12">
            {business.projects.slice(0, 4).map((project, index) => (
              <Reveal key={project.id} className="project-card-motion" delay={index * 0.06}>
                <ProjectCard business={business} project={project} />
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 30 }}>
            <ArrowLink href={siteHref(business, "projects")}>Explore the complete project archive</ArrowLink>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE TACTILE MATERIAL EXPLORER                                     */}
      {/* ========================================================================= */}
      <section className="section bg-[#0B0C0A] text-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <Reveal>
            <MaterialPaletteExplorer />
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SPLIT PHILOSOPHY FEATURE                                                  */}
      {/* ========================================================================= */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <Reveal>
          <div className="split-feature">
            <div className="image-frame split-feature__image relative min-h-[460px] overflow-hidden">
              <SiteImage
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85"
                alt="Tactile architectural detail showing stone, timber, glass and a precise shadow joint"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="split-feature__copy">
              <Eyebrow>Design Philosophy</Eyebrow>
              <h2 className="display display-sm font-serif" style={{ marginTop: 19 }}>
                The quiet work is often the work that lasts.
              </h2>
              <p className="text-stone-600 leading-relaxed mt-4">
                Proportion gives a room its measure. Light gives it time. Material gives it touch. Spatial flow gives it a reason to be inhabited. Together, these subtle decisions make an ambitious idea feel completely natural.
              </p>
              <ul className="principle-list mt-6 grid grid-cols-2 gap-3">
                <li className="font-medium text-stone-800">01. Proportion & Massing</li>
                <li className="font-medium text-stone-800">02. Natural Daylighting</li>
                <li className="font-medium text-stone-800">03. Material Sincerity</li>
                <li className="font-medium text-stone-800">04. Structural Glazing</li>
                <li className="font-medium text-stone-800">05. Climatic Buffers</li>
                <li className="font-medium text-stone-800">06. 10mm Shadow Joints</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ========================================================================= */}
      {/* STUDIO SECTOR 57 LOCATION & MAP SECTION                                   */}
      {/* ========================================================================= */}
      <section className="section bg-[#121311] text-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <Reveal>
            <StudioLocationCard business={business} />
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROCESS TIMELINE                                                          */}
      {/* ========================================================================= */}
      <section className="section section--dark bg-[#0E0F0D]">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Our Process"
              title="From a first question to a completed sanctuary."
            >
              <p className="muted" style={{ maxWidth: 600, margin: "20px 0 0" }}>
                A disciplined five-stage methodology balancing spatial poetry with statutory accuracy and rigorous on-site coordination.
              </p>
            </SectionHeading>
          </Reveal>

          <div className="process-grid mt-12">
            {business.processSteps.map((step, index) => (
              <Reveal key={step.number} delay={Math.min(index * 0.05, 0.25)} className="process-step">
                <div className="process-step__number font-mono text-[#C5A880]">{step.number}</div>
                <h3 className="font-serif text-lg text-white mt-2">{step.title}</h3>
                <p className="text-stone-400 text-xs mt-2 leading-relaxed">{step.description}</p>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 44 }}>
            <Link className="text-link" href={siteHref(business, "process")} style={{ color: "var(--paper)" }}>
              Explore the five-stage delivery roadmap <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CALL TO ACTION                                                           */}
      {/* ========================================================================= */}
      <CallToAction business={business} />
    </>
  );
}
