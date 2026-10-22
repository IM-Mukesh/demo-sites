import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BUSINESS_DEMOS } from "../../../../data/business-demos";
import type { DemoRoute } from "../../../../lib/demo-route-resolver";
import { resolveDemoRoute } from "../../../../lib/demo-route-resolver";
import { BusinessDemoRenderer } from "../../../../components/business-demos/site-renderer";

type DemoPageProps = {
  params: Promise<{ slug: string; path?: string[] }>;
};

export function generateStaticParams(): Array<{ slug: string; path?: string[] }> {
  const params: Array<{ slug: string; path?: string[] }> = [];

  for (const business of Object.values(BUSINESS_DEMOS)) {
    params.push({ slug: business.slug });
    params.push(
      ...[
        ["about"],
        ["services"],
        ["projects"],
        ["process"],
        ["insights"],
        ["contact"],
        ["faq"],
        ["privacy"],
        ["terms"],
        ["articles"],
      ].map((path) => ({ slug: business.slug, path })),
    );
    params.push(
      ...business.services.map((service) => ({ slug: business.slug, path: ["services", service.slug] })),
      ...business.projects.map((project) => ({ slug: business.slug, path: ["projects", project.slug] })),
      ...business.articles.flatMap((article) => [
        { slug: business.slug, path: ["insights", article.slug] },
        { slug: business.slug, path: ["articles", article.slug] },
      ]),
    );
  }

  return params;
}

function routeFromParams(params: { slug: string; path?: string[] }): DemoRoute | null {
  return resolveDemoRoute(params.slug, params.path);
}

function getMetadataBase(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) {
    try {
      return new URL(configuredUrl);
    } catch {
      // Keep demo metadata valid if a local environment variable is mistyped.
    }
  }

  return new URL("http://localhost:3000");
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const route = routeFromParams(resolvedParams);

  if (route === null) {
    return { title: "Page not found", robots: { index: false, follow: false } };
  }

  const pageLabel = route.kind === "service"
    ? route.service.name
    : route.kind === "project"
      ? route.project.name
      : route.kind === "article"
        ? route.article.title
        : route.page === "home"
          ? route.business.metadata.title
          : route.page === "articles"
            ? "Insights"
            : route.page.charAt(0).toUpperCase() + route.page.slice(1);

  return {
    title: pageLabel,
    description: route.business.metadata.description,
    metadataBase: getMetadataBase(),
    alternates: { canonical: `/demo/${route.business.slug}/${(resolvedParams.path ?? []).join("/")}`.replace(/\/$/, "") },
    robots: route.business.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: pageLabel,
      description: route.business.metadata.description,
      type: "website",
      images: [{ url: "/brand/architect-social.svg", width: 1200, height: 630, alt: "ARCHITECT concept website preview" }],
    },
    twitter: { card: "summary_large_image", title: pageLabel, description: route.business.metadata.description, images: ["/brand/architect-social.svg"] },
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const resolvedParams = await params;
  const route = routeFromParams(resolvedParams);

  if (route === null) notFound();

  return <BusinessDemoRenderer route={route} />;
}
