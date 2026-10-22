import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BusinessConfig } from "../../types/business";
import { ContactForm } from "./contact-form";
import { FAQAccordion } from "./faq-accordion";
import { ProjectFilter } from "./project-filter";
import { Reveal } from "./reveal";
import { Breadcrumbs, CallToAction, ConceptNote, ContactActions, Eyebrow, SectionHeading, ServiceCard, SiteImage, siteHref } from "./shared";

export function AboutPage({ business }: { business: BusinessConfig }) {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <Breadcrumbs business={business} items={[{ label: "About" }]} />
            <Eyebrow>A provisional point of view</Eyebrow>
            <h1 className="display display-lg" style={{ marginTop: 19 }}>A considered place for ideas, materials and everyday life.</h1>
            <p>This is a draft studio narrative for ARCHITECT, prepared as a private website demonstration. It is intentionally written as a flexible foundation rather than as a claim about the business&apos;s history, team, qualifications or completed work.</p>
          </div>
          <div className="page-hero__meta"><strong>Current status</strong>Concept website for owner review<br />Content and services pending approval</div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 35 }}>
        <div className="container">
          <Reveal>
            <div className="image-frame" style={{ aspectRatio: "1.6 / .72" }}>
              <SiteImage src="/images/architect/cedar-ridge-retreat.svg" alt="Illustrative architecture framed by cedar, stone and a quiet landscape" sizes="(max-width: 640px) 100vw, 92vw" />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container intro-grid">
          <Reveal><Eyebrow>The idea</Eyebrow></Reveal>
          <Reveal delay={0.08} className="intro-grid__copy">
            <h2 className="display display-sm">Design can be precise without becoming distant.</h2>
            <p>Architecture begins with what is already there: the orientation of a site, the shape of a room, the routines that need to fit and the materials that can make a place feel grounded. The strongest concept is often the one that connects these conditions with restraint.</p>
            <p>For this concept site, the language centres on proportion, light, movement and detail. The owner can replace this draft with an approved studio story, service scope and portfolio when those details are confirmed.</p>
          </Reveal>
        </div>
      </section>
      <section className="section" style={{ background: "#ECE8DE" }}>
        <div className="container">
          <SectionHeading eyebrow="Principles to test" title="A framework for making design decisions visible." />
          <div className="principle-page-grid">
            {["Start with the everyday", "Let light have a direction", "Use materials with purpose", "Make the threshold count"].map((title, index) => (
              <Reveal key={title} delay={index * 0.05} className="principle-page-item">
                <span>0{index + 1}</span><h3>{title}</h3><p>{["The brief becomes clearer when routines, comfort and practical constraints are part of the first conversation.", "Openings, shade and orientation can shape the character of a room before a finish is selected.", "Stone, timber, glass and metal each have a role; harmony comes from how they meet and change over time.", "A stair, doorway, courtyard or window reveal can become a moment of connection rather than leftover space."][index]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CallToAction business={business} />
    </>
  );
}

export function ServicesPage({ business }: { business: BusinessConfig }) {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div className="page-hero__copy"><Breadcrumbs business={business} items={[{ label: "Services" }]} /><Eyebrow>Services · pending owner approval</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>A thoughtful way to begin a spatial question.</h1><p>These service directions are a provisional translation of the public listing and the concept&apos;s design language. They are structured so the owner can confirm, rename or remove them without rewriting the site.</p></div>
          <div className="page-hero__meta"><strong>What this page avoids</strong>No invented fees, guarantees, qualifications or completed-work claims.</div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 35 }}>
         <div className="container"><div className="concept-strip"><ConceptNote>Every service description below is a draft. Confirm scope, responsibilities, locations and deliverables before publication.</ConceptNote></div><div className="service-grid">{business.services.map((service, index) => <Reveal key={service.id} className="service-card-motion" delay={Math.min(index * 0.04, 0.16)}><ServiceCard business={business} service={service} index={index} /></Reveal>)}</div></div>
      </section>
      <section className="section section--tight">
        <div className="container split-feature">
          <div className="split-feature__copy" style={{ background: "var(--ink)", color: "var(--paper)" }}><Eyebrow>Typical considerations</Eyebrow><h2 className="display display-sm" style={{ color: "var(--paper)", marginTop: 18 }}>The useful questions arrive before the polished answer.</h2><p style={{ color: "rgba(245,243,237,.72)" }}>A first enquiry can make room for the real conditions of a project: site, use, light, privacy, material, budget and the decisions that still need to be made.</p><ul className="principle-list" style={{ color: "var(--paper)" }}>{["Site and orientation", "Daily routines", "Privacy and openness", "Material expectations", "Existing constraints", "Next-step clarity"].map((item) => <li key={item} style={{ borderColor: "rgba(245,243,237,.25)" }}>{item}</li>)}</ul></div>
          <div className="image-frame split-feature__image"><SiteImage src="/images/architect/limestone-cantilever.svg" alt="Illustrative stone architecture with a deep overhang and planted edge" sizes="(max-width: 640px) 100vw, 50vw" /></div>
        </div>
      </section>
      <CallToAction business={business} />
    </>
  );
}

export function ProjectsPage({ business }: { business: BusinessConfig }) {
  return (
    <>
      <section className="page-hero"><div className="container page-hero__grid"><div className="page-hero__copy"><Breadcrumbs business={business} items={[{ label: "Projects" }]} /><Eyebrow>Illustrative archive</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>A catalogue of questions, not claims.</h1><p>These original visual studies are here to make an architecture conversation tangible. They are clearly marked as concepts and do not represent verified completed work by the business.</p></div><div className="page-hero__meta"><strong>Archive note</strong>Concept visualizations · no clients, addresses, budgets or delivery claims</div></div></section>
      <section className="section" style={{ paddingTop: 30 }}><div className="container"><ProjectFilter business={business} /></div></section>
      <CallToAction business={business} />
    </>
  );
}

export function ProcessPage({ business }: { business: BusinessConfig }) {
  return (
    <>
      <section className="page-hero"><div className="container page-hero__grid"><div className="page-hero__copy"><Breadcrumbs business={business} items={[{ label: "Process" }]} /><Eyebrow>Proposed approach</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>A clear path from a first conversation to a useful next step.</h1><p>This process is a draft website narrative. It is intended to help the owner review how enquiries and design conversations could be explained, not to document a verified current workflow.</p></div><div className="page-hero__meta"><strong>Pending confirmation</strong>Stages, responsibilities, fees and deliverables are not defined by this demo.</div></div></section>
        <section className="section" style={{ paddingTop: 35 }}><div className="container process-detail-list">{business.processSteps.map((step) => <Reveal key={step.number} className="process-detail-motion"><article className="process-detail-item"><div className="process-detail-item__image image-frame"><SiteImage src={step.image} alt={step.imageAlt} sizes="(max-width: 640px) 100vw, 38vw" /></div><div className="process-detail-item__copy"><span className="eyebrow">{step.number}</span><h2 className="display display-sm">{step.title}</h2><p>{step.description}</p><span className="concept-note">Proposed website content pending owner approval.</span></div></article></Reveal>)}</div></section>
      <CallToAction business={business} />
    </>
  );
}

export function InsightsPage({ business }: { business: BusinessConfig }) {
  return (
    <>
      <section className="page-hero"><div className="container page-hero__grid"><div className="page-hero__copy"><Breadcrumbs business={business} items={[{ label: "Insights" }]} /><Eyebrow>Notes on space</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>Useful questions for making a place feel considered.</h1><p>Short, original editorial notes for people beginning to think about light, materials, briefs and the everyday life of a project.</p></div><div className="page-hero__meta"><strong>Editorial status</strong>Draft articles for review · no invented quotations, statistics or credentials</div></div></section>
       <section className="section" style={{ paddingTop: 30 }}><div className="container"><div className="article-grid">{business.articles.map((article, index) => <Reveal key={article.id} className="article-card-motion" delay={index * 0.06}><article className="article-card"><Link href={siteHref(business, "insights", article.slug)}><div className="image-frame article-card__image"><SiteImage src={article.image} alt={article.imageAlt} sizes="(max-width: 640px) 100vw, 33vw" /></div><div className="article-card__meta"><span>{article.readTime}</span><span>{article.publishedLabel}</span></div><h2>{article.title}</h2><p>{article.excerpt}</p><span className="text-link">Read the note <ArrowUpRight size={15} aria-hidden="true" /></span></Link></article></Reveal>)}</div></div></section>
      <CallToAction business={business} />
    </>
  );
}

export function FAQPage({ business }: { business: BusinessConfig }) {
  return (
    <>
       <section className="page-hero"><div className="container page-hero__grid"><div className="page-hero__copy"><Breadcrumbs business={business} items={[{ label: "FAQs" }]} /><Eyebrow>Questions worth asking</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>A useful first answer is often a better beginning.</h1><p>Draft responses for common project questions. Where the answer depends on the business&apos;s actual policy, it is deliberately marked for owner review.</p></div><div className="page-hero__meta"><strong>Read before launch</strong>Review scope, fees, delivery, privacy and approval language with the owner.</div></div></section>
      <section className="section" style={{ paddingTop: 30 }}><div className="container"><FAQAccordion items={business.faqs} /></div></section>
      <CallToAction business={business} />
    </>
  );
}

export function ContactPage({ business }: { business: BusinessConfig }) {
  return (
    <>
      <section className="page-hero"><div className="container page-hero__grid"><div className="page-hero__copy"><Breadcrumbs business={business} items={[{ label: "Contact" }]} /><Eyebrow>Start with the question</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>Tell us a little about the space you have in mind.</h1><p>A focused first message can include the project type, location, what you would like to change and the questions that are still open.</p></div><div className="page-hero__meta"><strong>Demo contact</strong>Publicly listed phone and location shown below. No email or office hours are claimed.</div></div></section>
      <section className="section" style={{ paddingTop: 35 }}><div className="container contact-grid"><div className="contact-panel"><Eyebrow>Find the right starting point</Eyebrow><h2>Let the brief begin simply.</h2><p>You can call, open WhatsApp, ask for directions or preview an enquiry using the form. In this concept, no form submission is transmitted.</p><ContactActions business={business} /><ul className="contact-details"><li><span>Phone</span><a href="tel:+919466940493">+91 94669 40493</a></li><li><span>Address</span>{business.contact.address.formatted}</li><li><span>Project note</span>Residential, commercial, interior and glass-related questions can be selected in the draft form.</li></ul></div><ContactForm /></div></section>
    </>
  );
}

export function LegalPage({ business, kind }: { business: BusinessConfig; kind: "privacy" | "terms" }) {
  const privacy = kind === "privacy";
  return (
    <>
      <section className="page-hero"><div className="container page-hero__grid"><div className="page-hero__copy"><Breadcrumbs business={business} items={[{ label: privacy ? "Privacy" : "Terms" }]} /><Eyebrow>Editable draft</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>{privacy ? "Privacy policy" : "Terms of use"}</h1><p>{privacy ? "A transparent draft describing what this demonstration currently does, and what would need to be configured before a live website collects enquiries." : "A reasonable starting draft for review before the website is published under an approved name, domain and service scope."}</p></div><div className="page-hero__meta"><strong>Important</strong>This page is not legal advice and should be reviewed before launch.</div></div></section>
      <section className="section" style={{ paddingTop: 30 }}><div className="container legal-copy"><div className="concept-strip"><ConceptNote>This is an editable draft for owner and professional review. It does not describe a live analytics, CRM, email or payment system.</ConceptNote></div>{privacy ? <PrivacyDraft business={business} /> : <TermsDraft business={business} />}</div></section>
    </>
  );
}

function PrivacyDraft({ business }: { business: BusinessConfig }) {
  return <>
    <h2>What this demo does</h2><p>This private demonstration renders a local website concept for {business.branding.name}. The contact form validates entries in the browser and shows a demo confirmation. It does not currently send, store or print the submitted personal details.</p>
    <h2>Information planned for a live enquiry flow</h2><p>If the owner approves a live version, the form may request a name, phone number, optional email, project type, project location, optional budget range and project description. The final implementation should identify the approved delivery provider, retention period, access controls and contact method before collecting live enquiries.</p>
    <h2>Third-party links</h2><p>Call, WhatsApp and Google Maps links open services operated by their respective providers. Their handling of information is governed by their own policies. No social profiles, analytics tools or email address are claimed in this draft.</p>
    <h2>Before launch</h2><ul><li>Replace this draft with reviewed business and legal wording.</li><li>Connect an approved email or CRM service only after credentials and consent language are configured.</li><li>Confirm whether analytics, cookies, embeds or other tracking will be used.</li></ul>
  </>;
}

function TermsDraft({ business }: { business: BusinessConfig }) {
  return <>
    <h2>Concept status</h2><p>This website is a private design and content demonstration for {business.branding.name}. The name, visual identity, service descriptions, concept projects and articles may be changed or removed after owner review.</p>
    <h2>Content and imagery</h2><p>Images and project narratives are illustrative concepts created for this demonstration. They do not establish ownership, authorship, completion, client approval or a promise of future work. Approved portfolio content should replace them before publication.</p>
    <h2>Enquiries and links</h2><p>The draft contact form does not create an appointment, quote, contract or promise of service. Phone, WhatsApp and map links are provided as convenience actions based on the public listing supplied for this concept. External services are subject to their own terms.</p>
    <h2>Review before publication</h2><p>Confirm the legal business name, domain, service scope, address, contact details, professional responsibilities and any terms that apply to a real engagement. This draft should be reviewed by the owner and appropriate legal adviser.</p>
  </>;
}
