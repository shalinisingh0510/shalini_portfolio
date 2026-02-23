import { motion } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import { projects } from "../data/projects"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const techColors = {
  "React": "bg-sky-500/15 border-sky-500/30 text-sky-400",
  "Tailwind CSS": "bg-teal-500/15 border-teal-500/30 text-teal-400",
  "Framer Motion": "bg-purple-500/15 border-purple-500/30 text-purple-400",
  "C++": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "Data Structures": "bg-amber-500/15 border-amber-500/30 text-amber-400",
  "Algorithms": "bg-orange-500/15 border-orange-500/30 text-orange-400",
  "JavaScript": "bg-yellow-500/15 border-yellow-500/30 text-yellow-400",
  "GitHub API": "bg-gray-500/15 border-gray-500/30 text-gray-400",
  "REST APIs": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
}

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
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
          >
            <Card className="h-full shimmer-border relative">
              {/* Featured badge for first project */}
              {i === 0 && (
                <div className="featured-badge z-20">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </div>
              )}

              {/* Project Title */}
              <h3 className="text-lg font-semibold translate-z-4">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-muted text-body translate-z-2">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="mt-4 space-y-2 text-sm text-muted translate-z-2">
                {project.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2 hover:text-foreground transition">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Tech Stack — Colored Tags */}
              <div className="mt-4 flex flex-wrap gap-2 translate-z-3">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-xs px-3 py-1 rounded-full font-medium border ${techColors[t] || "bg-accent/10 border-accent/25 text-accent"
                      }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link with animated arrow */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="depth-button mt-6 group"
              >
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full border border-border/70 bg-foreground/5">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
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
