import type { DemoRoute } from "../../lib/demo-route-resolver";
import { AboutPage, ContactPage, FAQPage, InsightsPage, LegalPage, ProcessPage, ProjectsPage, ServicesPage } from "./standard-pages";
import { ArticleDetailPage, ProjectDetailPage, ServiceDetailPage } from "./detail-pages";
import { HomePage } from "./home-page";
import { SiteShell } from "./site-shell";

export function BusinessDemoRenderer({ route }: { route: DemoRoute }) {
  const { business } = route;

  const content = route.kind === "service"
    ? <ServiceDetailPage business={business} service={route.service} />
    : route.kind === "project"
      ? <ProjectDetailPage business={business} project={route.project} />
      : route.kind === "article"
        ? <ArticleDetailPage business={business} article={route.article} />
        : route.page === "home"
          ? <HomePage business={business} />
          : route.page === "about"
            ? <AboutPage business={business} />
            : route.page === "services"
              ? <ServicesPage business={business} />
              : route.page === "projects"
                ? <ProjectsPage business={business} />
                : route.page === "articles"
                  ? <InsightsPage business={business} />
                  : route.page === "process"
                    ? <ProcessPage business={business} />
                    : route.page === "faq"
                      ? <FAQPage business={business} />
                      : route.page === "privacy"
                        ? <LegalPage business={business} kind="privacy" />
                        : route.page === "terms"
                          ? <LegalPage business={business} kind="terms" />
                          : <ContactPage business={business} />;

  return <SiteShell business={business}>{content}</SiteShell>;
}
