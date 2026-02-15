import { motion } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import { projects } from "../data/projects"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const Projects = () => {
  return (
    <section id="projects" aria-label="Projects section" className="py-28">
      <SectionHeader
        title="Projects"
        subtitle="Selected work demonstrating engineering thinking, clean architecture, and real-world problem solving."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8"
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
          >
            <Card className="h-full">
              {/* Project Title */}
              <h3 className="text-lg font-semibold translate-z-4">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-muted text-body translate-z-2">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="mt-4 list-disc list-inside text-sm text-muted space-y-1 translate-z-2">
                {project.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="mt-4 flex flex-wrap gap-2 translate-z-3">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-foreground/5 border border-border/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="depth-button mt-6"
              >
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full border border-border/70 bg-foreground/5">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <span>View on GitHub</span>
              </a>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
