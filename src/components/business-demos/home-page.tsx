import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { BusinessConfig } from "../../types/business";
import { ArrowLink, CallToAction, ConceptNote, Eyebrow, ProjectCard, SectionHeading, ServiceCard, SiteImage, siteHref } from "./shared";
import { Reveal } from "./reveal";

export function HomePage({ business }: { business: BusinessConfig }) {
  return (
    <>
      <section className="hero">
        <div className="hero__image">
          <SiteImage
            src="/images/architect/monolithic-house.svg"
            alt="Illustrative contemporary residence with strong geometry, stone planes and warm evening light"
            sizes="100vw"
            priority
          />
        </div>
        <div className="hero__content">
          <Reveal>
            <Eyebrow>Architecture · Sector 57, Gurugram</Eyebrow>
            <h1 className="display display-xl" style={{ marginTop: 22 }}>Spaces shaped with purpose. Details designed to endure.</h1>
            <p className="hero__lead">Explore an approach to thoughtful spatial planning, architectural expression and material-led design.</p>
            <div className="button-row">
              <Link className="button button--light" href={siteHref(business, "about")}>Explore our approach <ArrowUpRight size={15} aria-hidden="true" /></Link>
              <Link className="button button--outline" href={siteHref(business, "contact")}>Discuss a project <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
            <div className="hero__bottom">
              <span className="hero__location">Sector 57 · Gurugram · Haryana</span>
              <span className="hero__scroll"><ArrowDown size={14} aria-hidden="true" /> Scroll to explore</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container intro-grid">
          <Reveal>
            <Eyebrow>A point of view</Eyebrow>
          </Reveal>
          <Reveal delay={0.08} className="intro-grid__copy">
            <h2 className="display display-md">Good architecture is felt in the way a space lives.</h2>
            <p>Planning, light, proportion and material choices can work together to make an environment feel both specific and easy to inhabit. This provisional concept site is designed for a local practice whose approved story can grow from an honest first conversation.</p>
            <div style={{ marginTop: 29 }}><ArrowLink href={siteHref(business, "about")}>Read the approach</ArrowLink></div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 62 }}>
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="What we could explore" title="A service language built around the space, not the sales pitch.">
              <p className="muted" style={{ maxWidth: 560, margin: "23px 0 0" }}>The capabilities below are proposed website content based on the public listing and a design-led direction. Each item remains pending owner approval.</p>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="concept-strip" style={{ marginTop: 26 }}><ConceptNote>Provisional service narratives — confirm the final offering, responsibilities and terminology with the business owner before publishing.</ConceptNote></div>
          </Reveal>
          <div className="service-grid">
            {business.services.map((service, index) => <Reveal key={service.id} className="service-card-motion" delay={Math.min(index * 0.04, 0.16)}><ServiceCard business={business} service={service} index={index} /></Reveal>)}
          </div>
          <div style={{ marginTop: 35 }}><ArrowLink href={siteHref(business, "services")}>View all service directions</ArrowLink></div>
        </div>
      </section>

      <section className="section section--tight" style={{ background: "#ECE8DE" }}>
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Illustrative work" title="Concepts that make the conversation visible.">
              <p className="muted" style={{ maxWidth: 570, margin: "23px 0 0" }}>A small collection of original visual studies for residential, commercial and interior conversations. They are not verified commissions or completed projects.</p>
            </SectionHeading>
          </Reveal>
          <div className="project-grid">
            {business.projects.slice(0, 4).map((project, index) => <Reveal key={project.id} className="project-card-motion" delay={Math.min(index * 0.07, 0.2)}><ProjectCard business={business} project={project} /></Reveal>)}
          </div>
          <div style={{ marginTop: 10 }}><ArrowLink href={siteHref(business, "projects")}>Enter the project archive</ArrowLink></div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <Reveal>
          <div className="split-feature">
            <div className="image-frame split-feature__image">
              <SiteImage src="/images/architect/stone-and-shadow.svg" alt="Illustrative material detail showing stone, timber, glass and a precise shadow joint" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
            <div className="split-feature__copy">
              <Eyebrow>Design philosophy</Eyebrow>
              <h2 className="display display-sm" style={{ marginTop: 19 }}>The quiet work is often the work that lasts.</h2>
              <p>Proportion gives a room its measure. Light gives it time. Material gives it touch. Spatial flow gives it a reason to be used. Together, these small decisions can make a larger idea feel natural.</p>
              <ul className="principle-list">
                <li>Proportion</li>
                <li>Natural light</li>
                <li>Material clarity</li>
                <li>Spatial flow</li>
                <li>Functional planning</li>
                <li>Careful detail</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="A proposed approach" title="From a first question to a clearer next step.">
              <p className="muted" style={{ maxWidth: 580, margin: "23px 0 0" }}>A possible client journey for the website — intentionally open to editing once the owner confirms how enquiries, design stages and coordination actually work.</p>
            </SectionHeading>
          </Reveal>
          <div className="process-grid">
            {business.processSteps.map((step, index) => <Reveal key={step.number} delay={Math.min(index * 0.05, 0.2)} className="process-step"><div className="process-step__number">{step.number}</div><h3>{step.title}</h3><p>{step.description}</p></Reveal>)}
          </div>
          <div style={{ marginTop: 44 }}><Link className="text-link" href={siteHref(business, "process")} style={{ color: "var(--paper)" }}>See the proposed process <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <CallToAction business={business} />
    </>
  );
}
