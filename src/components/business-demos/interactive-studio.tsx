"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Layers,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  ExternalLink,
  Clock,
  Building2,
  Calendar,
} from "lucide-react";
import type { BusinessConfig } from "../../types/business";
import { getCallUrl, getMapsUrl, getWhatsAppUrl } from "../../lib/site-utils";

/* -------------------------------------------------------------------------- */
/* 1. PROJECT SCOPE & CONSULTATION BUILDER                                    */
/* -------------------------------------------------------------------------- */

interface TypologyOption {
  id: string;
  name: string;
  desc: string;
  baseDuration: string;
  recommendedFocus: string;
}

const typologies: TypologyOption[] = [
  {
    id: "villa",
    name: "Luxury Private Villa",
    desc: "Single-family bespoke architectural residence with courtyard, terraces, and climate-responsive zoning.",
    baseDuration: "6 - 12 Months",
    recommendedFocus: "Courtyard daylighting, passive cooling, travertine masonry",
  },
  {
    id: "facade",
    name: "Glass & Structural Façade",
    desc: "Specialist structural glazing, slimline sliding portals, curtain walls, and thermal envelope upgrades.",
    baseDuration: "3 - 6 Months",
    recommendedFocus: "Low-iron acoustic glazing, solar heat-gain mitigation, wind load analysis",
  },
  {
    id: "interior",
    name: "Warm Minimal Interior",
    desc: "Comprehensive spatial interior architecture, bespoke millwork, concealed illumination, and natural textures.",
    baseDuration: "4 - 8 Months",
    recommendedFocus: "Smoked oak joinery, architectural lighting scenes, fluted stone portals",
  },
  {
    id: "commercial",
    name: "Boutique Workplace / Gallery",
    desc: "Human-centric studio, commercial headquarters, or experiential retail pavilion in Gurugram.",
    baseDuration: "6 - 14 Months",
    recommendedFocus: "Acoustic zoning, modular flexibility, architectural identity",
  },
];

const plotSizes = [
  { id: "compact", label: "250 – 500 Sq Yds", context: "Bespoke Urban Plot" },
  { id: "medium", label: "500 – 1,000 Sq Yds", context: "Generous Residential Plot" },
  { id: "estate", label: "1,000+ Sq Yds", context: "Estate / Mixed Scale" },
];

export function ProjectScopeBuilder({ business }: { business: BusinessConfig }) {
  const [selectedTypology, setSelectedTypology] = useState<TypologyOption>(typologies[0]);
  const [selectedPlot, setSelectedPlot] = useState(plotSizes[0]);
  const [includeGlassFacade, setIncludeGlassFacade] = useState(true);
  const [includeStatutorySanctions, setIncludeStatutorySanctions] = useState(true);

  const whatsappMessage = `Hello ARCHITECT Studio (Sector 57). I configured a project scope on your website:
• Project: ${selectedTypology.name} (${selectedPlot.label})
• Structural Glazing / Glass Façade: ${includeGlassFacade ? "Included" : "Standard"}
• Statutory & Municipal Sanctioning: ${includeStatutorySanctions ? "Required" : "Client Side"}
I would like to discuss scheduling an initial discovery meeting.`;

  const whatsappUrl = getWhatsAppUrl(business.contact.whatsapp, whatsappMessage);
  const callUrl = getCallUrl(business.contact.phone);

  return (
    <div className="scope-builder bg-[#151614] border border-white/10 rounded-2xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E8963]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#20221E] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase text-[#C5A880]">
              <Compass size={14} /> Interactive Brief Builder
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif mt-3 text-[#F5F3ED]">
              Configure Your Architectural Direction
            </h3>
            <p className="text-sm text-stone-400 mt-1 max-w-xl">
              Tailor project typology, site envelope, and structural requirements for a tailored Sector 57 studio discovery session.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-widest text-stone-400 block">Studio Consultation</span>
            <span className="text-xl sm:text-2xl font-serif text-[#C5A880] font-semibold">Bespoke Scope</span>
            <span className="text-xs text-stone-400 block mt-0.5">Sector 57, Gurugram</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 block">
                1. Select Project Typology
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {typologies.map((t) => {
                  const isSelected = selectedTypology.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTypology(t)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${
                        isSelected
                          ? "bg-white/10 border-[#C5A880] shadow-md ring-1 ring-[#C5A880]/50"
                          : "bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.07]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-white">{t.name}</span>
                        {isSelected && <CheckCircle2 size={16} className="text-[#C5A880]" />}
                      </div>
                      <p className="text-xs text-stone-400 mt-1 line-clamp-2">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 block">
                2. Site / Plot Envelope
              </label>
              <div className="grid grid-cols-3 gap-3">
                {plotSizes.map((p) => {
                  const isSelected = selectedPlot.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPlot(p)}
                      className={`text-center p-3 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? "bg-white/10 border-[#C5A880] text-white ring-1 ring-[#C5A880]/50"
                          : "bg-white/5 border-white/10 text-stone-300 hover:border-white/25 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span className="block font-medium text-xs sm:text-sm">{p.label}</span>
                      <span className="block text-[11px] text-stone-400 mt-0.5">{p.context}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 block">
                3. Specialist Integrations
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeGlassFacade}
                      onChange={(e) => setIncludeGlassFacade(e.target.checked)}
                      className="w-4 h-4 rounded border-stone-600 accent-[#C5A880]"
                    />
                    <div>
                      <span className="text-sm font-medium text-stone-200 block">
                        Structural Glass & Façade Engineering
                      </span>
                      <span className="text-xs text-stone-400">
                        Thermally broken profiles, acoustic glazing, frameless glass thresholds
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#C5A880]">Specialty</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeStatutorySanctions}
                      onChange={(e) => setIncludeStatutorySanctions(e.target.checked)}
                      className="w-4 h-4 rounded border-stone-600 accent-[#C5A880]"
                    />
                    <div>
                      <span className="text-sm font-medium text-stone-200 block">
                        Gurugram Statutory Sanctions & Municipal Liaison
                      </span>
                      <span className="text-xs text-stone-400">
                        Sector 57 bye-law compliance, FAR optimization, NOC documentation
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#C5A880]">Sanctions</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Summary Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest text-stone-400">Scope Overview</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Direct Studio Intake
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <span className="text-xs text-stone-400 block uppercase tracking-wider">Configured Brief</span>
                  <h4 className="text-xl font-serif text-white mt-0.5">{selectedTypology.name}</h4>
                  <p className="text-xs text-stone-300 mt-1">{selectedPlot.label} · {selectedPlot.context}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs">
                  <div>
                    <span className="text-stone-400 block">Estimated Timeline</span>
                    <span className="font-medium text-white">{selectedTypology.baseDuration}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Studio Location</span>
                    <span className="font-medium text-white">Sector 57, Gurugram</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-stone-400 block uppercase tracking-wider">Design Focus</span>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    {selectedTypology.recommendedFocus}
                    {includeGlassFacade && " • Architectural low-iron glass facades"}
                    {includeStatutorySanctions && " • Municipal statutory drawings"}
                  </p>
                </div>

                <div className="bg-[#1C1E1B] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 block">Initial Discovery</span>
                      <span className="text-xs text-[#C5A880] font-medium">In-Studio or Site Briefing</span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30">Available</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-2">
                    Includes site orientation study, volumetric massing discussion, and statutory feasibility review.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2.5">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-emerald-900/30"
                >
                  <MessageCircle size={16} /> Send Brief Via WhatsApp
                </a>
              )}
              {callUrl && (
                <a
                  href={callUrl}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-colors border border-white/10"
                >
                  <Phone size={14} /> Call Studio (+91 94669 40493)
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. TACTILE MATERIAL PALETTE EXPLORER                                        */
/* -------------------------------------------------------------------------- */

const materialsList = [
  {
    id: "travertine",
    name: "Travertine & Honed Limestone",
    tagline: "Natural Mineral Mass & Thermal Inertia",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
    description:
      "Hand-selected pale mineral planes featuring natural porous striations. Used for deep exterior plinths and seamless continuous interior floor planes, anchoring the architecture to the earth.",
    properties: ["Thermal mass retention", "Subtle light absorption", "Ages gracefully with patina"],
    applications: "Main courtyard walls, living room hearth, continuous paving",
  },
  {
    id: "glass",
    name: "Structural Low-Iron Glass & Glazing",
    tagline: "Total Optical Neutrality & Daylighting",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    description:
      "Extra-clear low-iron toughened glass with ultra-narrow thermal breaks. Eliminates the green tint of conventional glass to dissolve the boundary between Gurugram courtyards and interior living halls.",
    properties: ["High UV & solar filtration", "Acoustic attenuation up to 44dB", "Maximized daylight transmission"],
    applications: "Double-height atrium facades, floor-to-ceiling sliding portals, glass clerestories",
  },
  {
    id: "timber",
    name: "Smoked Oak & Shou Sugi Ban",
    tagline: "Warm Tactile Balance & Acoustic Resonance",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    description:
      "Deep smoked oak joinery combined with traditional charred Japanese cedar exterior screens. The charred surface provides natural rot and insect resistance while lending an austere, dark architectural presence.",
    properties: ["Acoustic dampening", "Tactile warmth against stone", "Zero-maintenance fire-hardened finish"],
    applications: "Concealed pivot doors, custom library millwork, facade solar louvers",
  },
  {
    id: "metal",
    name: "Anodized Dark Bronze & Raw Concrete",
    tagline: "Precision Shadow Joints & Structural Integrity",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    description:
      "Off-form board-marked concrete paired with hand-patinated architectural bronze reveals. Emphasizes clean shadow joints and expresses the true weight of the structure.",
    properties: ["Weatherproof exterior endurance", "Minimalist 10mm shadow gaps", "Structural longevity"],
    applications: "Cantilevered roof soffits, threshold transitions, architectural hardware",
  },
];

export function MaterialPaletteExplorer() {
  const [activeMaterial, setActiveMaterial] = useState(materialsList[0]);

  return (
    <div className="material-explorer bg-[#131412] border border-white/10 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="eyebrow text-[#C5A880]">Tactile Materiality</span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F3ED] mt-2">
            The Substance of Thoughtful Architecture
          </h3>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Explore how stone, structural glass, timber, and dark bronze junctions interact under daylight and shadow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Tabs Column */}
        <div className="lg:col-span-5 space-y-3">
          {materialsList.map((m) => {
            const isActive = activeMaterial.id === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMaterial(m)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative ${
                  isActive
                    ? "bg-white/10 border-[#C5A880] ring-1 ring-[#C5A880]/40"
                    : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-white">{m.name}</span>
                  <span className="text-xs uppercase tracking-wider text-[#C5A880] font-mono">0{materialsList.indexOf(m) + 1}</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">{m.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* Display Column */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMaterial.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#1B1D19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <img
                  src={activeMaterial.image}
                  alt={activeMaterial.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1D19] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-[#C5A880] font-mono block">Palette Specification</span>
                  <h4 className="text-xl sm:text-2xl font-serif text-white">{activeMaterial.name}</h4>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <p className="text-sm text-stone-300 leading-relaxed">
                  {activeMaterial.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block font-bold mb-2">
                      Key Performance Attributes
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-300">
                      {activeMaterial.properties.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block font-bold mb-2">
                      Prime Applications
                    </span>
                    <p className="text-xs text-stone-300 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                      {activeMaterial.applications}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. STUDIO SECTOR 57 VERIFIED DIRECTORY & MAP CARD                          */
/* -------------------------------------------------------------------------- */

export function StudioLocationCard({ business }: { business: BusinessConfig }) {
  const mapUrl = getMapsUrl(business.location);
  const callUrl = getCallUrl(business.contact.phone);
  const whatsappUrl = getWhatsAppUrl(business.contact.whatsapp, "Hello ARCHITECT Studio, I would like to visit your Sector 57 office.");

  return (
    <div className="studio-card bg-[#151614] border border-white/10 rounded-2xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} /> Public Listing Verified
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-semibold">
              <Star size={13} className="fill-amber-300" /> 5.0 Rating · Sector 57
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F3ED]">
              ARCHITECT · Sector 57 Studio
            </h3>
            <p className="text-stone-300 text-sm mt-2 leading-relaxed">
              Located in the heart of Sushant Lok 2 / Sector 57, Gurugram. Serving discerning homeowners, developers, and corporate clients across Delhi-NCR.
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Studio Address:</strong>
                <span className="text-stone-300 leading-relaxed block">{business.contact.address.formatted}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pt-2 border-t border-white/5 text-stone-400">
              <Clock size={14} className="text-[#C5A880]" />
              <span>Studio Hours: Monday – Saturday, 10:00 AM – 7:00 PM (By Appointment)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#C5A880] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d5b991] transition-colors shadow-lg"
              >
                <MapPin size={15} /> Open In Google Maps <ExternalLink size={13} />
              </a>
            )}
            {callUrl && (
              <a
                href={callUrl}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors border border-white/10"
              >
                <Phone size={14} /> Call {business.contact.phone}
              </a>
            )}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp Studio
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/60 p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">Gurugram Map Coordinates</span>
              <span className="text-xs text-[#C5A880] font-mono">28.4326° N, 77.0862° E</span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="relative h-44 rounded-xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                  alt="Sector 57 Architectural Practice Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#C5A880] block font-semibold">Flagship Studio</span>
                    <span className="text-sm font-medium text-white">Block G, Sector 57, Gurugram</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#C5A880] text-black flex items-center justify-center font-bold">
                    <Building2 size={16} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-stone-400 block">Consultation Format</span>
                  <span className="text-sm font-serif font-bold text-white mt-0.5 block">By Appointment</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-stone-400 block">Listing Status</span>
                  <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">Active Listing</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 leading-relaxed italic">
                * Consultations scheduled via prior briefing intake and site appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. FLOATING QUICK CONNECT DOCK (Fixed at bottom on all screens)             */
/* -------------------------------------------------------------------------- */

export function StudioQuickBar({ business }: { business: BusinessConfig }) {
  const callUrl = getCallUrl(business.contact.phone);
  const whatsappUrl = getWhatsAppUrl(
    business.contact.whatsapp,
    "Hello ARCHITECT Studio (Sector 57), I am interested in scheduling a consultation.",
  );
  const mapUrl = getMapsUrl(business.location);

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[min(94%,680px)]">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 rounded-full bg-[#121311]/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="hidden sm:block">
            <span className="text-xs font-serif font-medium text-white block">ARCHITECT · Sector 57</span>
            <span className="text-[10px] text-stone-400 block tracking-wider uppercase">Architecture & Façade Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {callUrl && (
            <a
              href={callUrl}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
              title="Call Studio"
            >
              <Phone size={13} className="text-[#C5A880]" />
              <span className="hidden md:inline">Call</span>
            </a>
          )}

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md"
              title="WhatsApp Consultation"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
          )}

          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 text-stone-300 text-xs font-medium transition-colors"
              title="View on Google Maps"
            >
              <MapPin size={14} className="text-[#C5A880]" />
              <span className="hidden lg:inline">Directions</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
