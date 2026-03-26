import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState } from "react"
import SectionHeader from "../components/common/SectionHeader"
import { projects } from "../data/projects"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const techColors = {
  "React": "border-sky-500/50 text-sky-400 bg-sky-500/10",
  "Tailwind CSS": "border-teal-500/50 text-teal-400 bg-teal-500/10",
  "Framer Motion": "border-purple-500/50 text-purple-400 bg-purple-500/10",
  "C++": "border-blue-500/50 text-blue-400 bg-blue-500/10",
  "Data Structures": "border-amber-500/50 text-amber-400 bg-amber-500/10",
  "Algorithms": "border-orange-500/50 text-orange-400 bg-orange-500/10",
  "JavaScript": "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
  "GitHub API": "border-gray-500/50 text-gray-400 bg-gray-500/10",
  "REST APIs": "border-emerald-500/50 text-emerald-400 bg-emerald-500/10",
}

const ProjectCard3D = ({ project, index }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative z-10 w-full group"
    >
      <div 
        className="w-full h-full bg-surface-lowest/80 backdrop-blur-md rounded-2xl p-8 border border-border/50 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:border-accent/40"
      >
        {index === 0 && (
          <div className="absolute top-6 right-6 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-accent/20 text-accent border border-accent/30">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Featured
          </div>
        )}

        <h3 className="text-2xl font-bold text-foreground tracking-tight">
          {project.title}
        </h3>

        <p className="mt-4 text-muted leading-relaxed">
          {project.description}
        </p>

        <ul className="mt-6 space-y-2 text-sm text-foreground/80 font-medium">
          {project.highlights.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`text-xs px-3 py-1 rounded-full font-medium border ${techColors[t] || "border-accent/40 text-accent bg-accent/10"}`}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mt-8 items-center justify-center gap-2 w-full rounded-xl bg-surface-bright/50 hover:bg-surface-bright border border-border/50 py-3 text-sm font-semibold text-foreground transition-all group/link"
        >
          <span>View Source on GitHub</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.article>
  )
}

const Projects = () => {
  return (
    <section id="projects" aria-label="Projects section" className="py-24 relative">
      <SectionHeader
        title="Featured Projects"
        subtitle="A selection of my technical work and engineering implementations."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8"
        style={{ perspective: "1500px" }}
      >
        {projects.map((project, i) => (
          <ProjectCard3D key={project.title} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
