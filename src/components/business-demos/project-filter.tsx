"use client";

import { useMemo, useState } from "react";
import type { BusinessConfig, Project } from "../../types/business";
import { ProjectCard } from "./shared";

const filters: readonly { label: string; value: "all" | Project["category"] }[] = [
  { label: "All studies", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Interiors", value: "interiors" },
  { label: "Materials", value: "material" },
];

export function ProjectFilter({ business }: { business: BusinessConfig }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const projects = useMemo(
    () => (filter === "all" ? business.projects : business.projects.filter((project) => project.category === filter)),
    [business.projects, filter],
  );

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter concept studies">
        {filters.map((item) => (
          <button
            className="filter-button"
            key={item.value}
            type="button"
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {projects.map((project) => (
          <ProjectCard key={project.id} business={business} project={project} />
        ))}
      </div>
    </>
  );
}
