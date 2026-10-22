"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BusinessConfig, Project } from "../../types/business";
import { ProjectCard } from "./shared";

const filters: readonly { label: string; value: "all" | Project["category"] }[] = [
  { label: "All Works", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Glass & Façade", value: "commercial" },
  { label: "Interiors", value: "interiors" },
  { label: "Material Studies", value: "material" },
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
        {filters.map((item) => {
          const isActive = filter === item.value;
          return (
            <button
              className={`filter-button relative ${isActive ? "is-active text-white font-semibold" : "text-stone-400 hover:text-white"}`}
              key={item.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(item.value)}
            >
              {isActive && (
                <motion.span
                  layoutId="activeFilterTab"
                  className="absolute inset-0 bg-stone-900 border border-stone-700/60 rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          );
        })}
      </div>
      <motion.div layout className="project-grid" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard business={business} project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
