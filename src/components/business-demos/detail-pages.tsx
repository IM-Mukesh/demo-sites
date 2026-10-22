import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Article, BusinessConfig, Project, Service } from "../../types/business";
import { ProjectGallery } from "./gallery";
import { Reveal } from "./reveal";
import { Breadcrumbs, CallToAction, ConceptNote, Eyebrow, ProjectCard, SectionHeading, SiteImage, siteHref } from "./shared";

const serviceNarratives: Readonly<Record<string, { lead: string; heading: string; body: string; questions: readonly string[] }>> = {
  "architectural-planning": {
    lead: "A possible first layer for making a brief, a site and a spatial direction easier to discuss.",
    heading: "Start by giving the brief a shape.",
    body: "The first architectural conversation can bring together what a place needs to do, what the site is already saying and where there is room to make a different choice. This concept page is a proposed description only; the business owner would confirm the actual scope, professional responsibilities and deliverables.",
    questions: ["What should the space make easier?", "How does the site receive light and movement?", "Which constraints are known, and which need checking?", "What would a useful first design decision look like?"],
  },
  "glass-facade-solutions": {
    lead: "A material-led conversation about glazing, partitions, mirrors, screens and the edges between inside and out.",
    heading: "Let transparency have a degree.",
    body: "The public listing connects the lead with glass-related products and services, including toughened glass, mirrors, partitions and façades. This draft reframes that starting point as a design conversation about reflection, privacy, shade, depth and the technical questions that should be confirmed before any specification or installation claim is made.",
    questions: ["Where should a glazed edge open a view?", "Where should it filter sound, heat or privacy?", "How will glass meet stone, metal or timber?", "Which technical and safety requirements need a specialist review?"],
  },
  "interior-spatial-planning": {
    lead: "A calm way to test how rooms connect, how objects live within them and how a day moves from one space to the next.",
    heading: "Make the everyday sequence visible.",
    body: "An interior is more than a collection of finishes. It is the distance between a door and a chair, the storage that keeps a room calm, the light that arrives at a work surface and the threshold that helps one activity become another. This is a provisional service direction awaiting approval.",
    questions: ["Which rooms need to connect, and which need separation?", "What needs to be stored, displayed or hidden?", "Where should daylight and task light work together?", "Which materials can carry daily contact gracefully?"],
  },
  "3d-visualization": {
    lead: "A clear visual language for comparing atmosphere, massing and material direction while an idea is still open.",
    heading: "Make the emerging idea easier to share.",
    body: "A visual study can help a client and a design team talk about a space before every decision is fixed. Views, diagrams and material prompts can reveal what feels right, what needs more thought and what should remain deliberately unresolved. This draft does not promise a specific software, output or production timeline.",
    questions: ["Which decision would benefit from a visual comparison?", "Is the important question about mass, light, material or use?", "What should a concept image leave open for discussion?", "How will the visual be reviewed and approved?"],
  },
  "material-detail-exploration": {
    lead: "A slower look at the surfaces, junctions and tactile decisions that give a space its character.",
    heading: "The detail is where materials meet.",
    body: "The strongest material palettes are often quiet. Their richness comes from weight, touch, reflectivity and the way one surface ends beside another. This proposed service direction can become a more precise owner-approved offering after the business confirms its materials and detail capabilities.",
    questions: ["Which surface should hold the eye or the hand?", "Where can a shadow gap create calm?", "How will a material age and be maintained?", "Which details require technical or fabrication review?"],
  },
  "design-consultation": {
    lead: "A focused first conversation for an idea that is still becoming a brief.",
    heading: "Begin with what you know—and what you do not.",
    body: "A short enquiry can be useful even when the project is early. Location, routines, constraints and the desired feeling can create a shared starting point. This is a draft consultation narrative and does not imply a guaranteed appointment or any fee arrangement.",
    questions: ["What is the project, in one or two sentences?", "Where is it, and what is already known about the site?", "What should change first?", "What would you like to understand next?"],
  },
};

export function ServiceDetailPage({ business, service }: { business: BusinessConfig; service: Service }) {
  const narrative = serviceNarratives[service.slug] ?? serviceNarratives["design-consultation"];
  const relatedProjects = business.projects.filter((project) => {
    if (service.slug === "interior-spatial-planning") return project.category === "interiors";
    if (service.slug === "glass-facade-solutions") return project.category === "commercial" || project.category === "material";
    if (service.slug === "3d-visualization") return true;
    return project.category === "residential";
  }).slice(0, 2);

  return (
    <>
      <section className="detail-hero"><div className="container detail-hero__copy"><Breadcrumbs business={business} items={[{ label: "Services", href: siteHref(business, "services") }, { label: service.name }]} /><Eyebrow>Service direction · pending approval</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>{service.name}</h1><p>{narrative.lead}</p></div><div className="container image-frame detail-hero__image"><SiteImage src={service.image} alt={service.imageAlt} sizes="(max-width: 900px) 100vw, 52vw" priority /></div></section>
      <section className="section section--tight"><div className="container detail-content-grid"><div><ConceptNote>{service.disclosureNote}</ConceptNote></div><div className="detail-content"><h2>{narrative.heading}</h2><p>{narrative.body}</p><p>{service.description}</p><h2>Questions to bring into the conversation</h2><ul className="detail-content__list">{narrative.questions.map((question) => <li key={question}><Check size={15} style={{ marginRight: 9, color: "var(--olive)", verticalAlign: "-2px" }} aria-hidden="true" />{question}</li>)}</ul><h2>A possible starting set of outputs</h2><ul className="detail-content__list">{service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul><div style={{ marginTop: 34 }}><Link className="button" href={siteHref(business, "contact")}>Discuss this direction <ArrowUpRight size={15} aria-hidden="true" /></Link></div></div></div></section>
      <section className="section" style={{ background: "#ECE8DE" }}><div className="container"><SectionHeading eyebrow="Related concept studies" title="Ideas that help make the material conversation concrete." /><div className="project-grid">{relatedProjects.map((project) => <ProjectCard key={project.id} business={business} project={project} />)}</div></div></section>
      <CallToAction business={business} />
    </>
  );
}

export function ProjectDetailPage({ business, project }: { business: BusinessConfig; project: Project }) {
  const related = business.projects.filter((item) => item.id !== project.id).slice(0, 2);
  return (
    <>
      <section className="detail-hero"><div className="container detail-hero__copy"><Breadcrumbs business={business} items={[{ label: "Projects", href: siteHref(business, "projects") }, { label: project.name }]} /><Eyebrow>{project.projectType} · concept visualization</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>{project.name}</h1><p>{project.summary}</p></div><div className="container image-frame detail-hero__image"><SiteImage src={project.image} alt={project.imageAlt} sizes="(max-width: 900px) 100vw, 52vw" priority /></div></section>
      <section className="section section--tight"><div className="container"><div className="concept-strip"><ConceptNote>This is an illustrative concept visualization, not a verified completed project or client commission.</ConceptNote></div><ProjectGallery images={project.gallery} alt={project.name} /></div></section>
      <section className="section"><div className="container detail-content-grid"><div><Eyebrow>Design intent</Eyebrow><p className="muted" style={{ marginTop: 18, maxWidth: 220 }}>{project.locationLabel}</p></div><div className="detail-content"><h2>What this study is exploring</h2><p>{project.description}</p><p>{project.designIntent}</p><h2>Materials in the conversation</h2><ul className="detail-content__list">{project.materials.map((item) => <li key={item}>{item}</li>)}</ul><h2>Key visual details</h2><ul className="detail-content__list">{project.details.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
      <section className="section section--tight" style={{ background: "#ECE8DE" }}><div className="container"><SectionHeading eyebrow="Continue exploring" title="Another way into the archive." /><div className="project-grid">{related.map((item) => <ProjectCard key={item.id} business={business} project={item} />)}</div></div></section>
      <CallToAction business={business} />
    </>
  );
}

export function ArticleDetailPage({ business, article }: { business: BusinessConfig; article: Article }) {
  return (
    <>
      <section className="detail-hero"><div className="container detail-hero__copy"><Breadcrumbs business={business} items={[{ label: "Insights", href: siteHref(business, "insights") }, { label: article.title }]} /><Eyebrow>{article.readTime} · {article.publishedLabel}</Eyebrow><h1 className="display display-lg" style={{ marginTop: 19 }}>{article.title}</h1><p>{article.excerpt}</p></div><div className="container image-frame detail-hero__image"><SiteImage src={article.image} alt={article.imageAlt} sizes="(max-width: 900px) 100vw, 52vw" priority /></div></section>
      <section className="section section--tight"><div className="container"><div className="concept-strip"><ConceptNote>This is a draft editorial note for a private website concept. Review authorship, publication status and wording before launch.</ConceptNote></div></div></section>
      <section className="section" style={{ paddingTop: 26 }}><div className="container article-reading"><article className="detail-content"><p className="article-reading__standfirst">{article.excerpt}</p>{article.body.map((paragraph, index) => <Reveal key={`${article.id}-${index}`} delay={Math.min(index * 0.04, 0.12)}>{index < article.headings.length ? <><h2>{article.headings[index]}</h2><p>{paragraph}</p></> : <p>{paragraph}</p>}</Reveal>)}<div style={{ marginTop: 48 }}><Link className="button" href={siteHref(business, "contact")}>Discuss a project question <ArrowUpRight size={15} aria-hidden="true" /></Link></div></article></div></section>
      <CallToAction business={business} />
    </>
  );
}
