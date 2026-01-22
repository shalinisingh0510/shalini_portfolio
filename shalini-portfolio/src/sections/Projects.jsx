import { motion } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import { projects } from "../data/projects"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const Projects = () => {
  return (
    <section id="projects" className="py-28">
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
          <motion.div
            key={project.title}
            variants={fadeUp}
          >
            <Card>
              {/* Project Title */}
              <h3 className="text-lg font-semibold">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-muted text-body">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="mt-4 list-disc list-inside text-sm text-muted space-y-1">
                {project.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-md bg-white/10"
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
                className="
                  inline-flex items-center gap-1 mt-5
                  text-sm text-accent
                  transition-all
                  hover:gap-2
                "
              >
                View on GitHub →
              </a>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
