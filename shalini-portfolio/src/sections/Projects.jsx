import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState } from "react"
import SectionHeader from "../components/common/SectionHeader"
import { projects } from "../data/projects"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const techColors = {
  "React": "border-sky-500/50 text-sky-300 shadow-[0_0_10px_rgba(14,165,233,0.3)]",
  "Tailwind CSS": "border-teal-500/50 text-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.3)]",
  "Framer Motion": "border-purple-500/50 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]",
  "C++": "border-blue-500/50 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]",
  "Data Structures": "border-amber-500/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]",
  "Algorithms": "border-orange-500/50 text-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.3)]",
  "JavaScript": "border-yellow-500/50 text-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.3)]",
  "GitHub API": "border-gray-400/50 text-gray-200 shadow-[0_0_10px_rgba(156,163,175,0.3)]",
  "REST APIs": "border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]",
}

const ProjectCard3D = ({ project, index }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"])

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
      className="relative z-10 w-full rounded-[2.5rem] p-[1px] bg-gradient-to-br from-highlight/50 via-border/10 to-accent/50 group"
    >
      <div 
        className="w-full h-full glass-card !bg-surface-bright/30 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden transition-colors duration-500 group-hover:bg-surface-bright/50"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        {/* Glow Element Tracking Hover (simulated by inner gradient pulse) */}
        <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-accent/20 to-highlight/20 blur-[60px] transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-1px)" }} />

        {index === 0 && (
          <div className="absolute top-6 right-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-highlight to-accent-dim text-white shadow-[0_0_20px_rgba(255,0,102,0.4)]" style={{ transform: "translateZ(50px)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Featured
          </div>
        )}

        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight" style={{ transform: "translateZ(60px)" }}>
          {project.title}
        </h3>

        <p className="mt-4 text-muted/90 leading-relaxed" style={{ transform: "translateZ(40px)" }}>
          {project.description}
        </p>

        <ul className="mt-6 space-y-3 text-sm text-foreground/80 font-medium" style={{ transform: "translateZ(35px)" }}>
          {project.highlights.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-accent shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3" style={{ transform: "translateZ(80px)" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              className={`text-xs px-4 py-1.5 rounded-full font-bold border backdrop-blur-md ${techColors[t] || "border-accent/40 text-accent shadow-[0_0_10px_rgba(0,240,255,0.3)]"}`}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mt-10 items-center justify-center gap-3 w-full rounded-full border border-white/10 bg-white/5 py-4 text-sm font-bold text-white shadow-soft transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group/link"
          style={{ transform: "translateZ(90px)" }}
        >
          <span>View Source on GitHub</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </motion.article>
  )
}

const Projects = () => {
  return (
    <section id="projects" aria-label="Projects section" className="py-32 relative">
      <SectionHeader
        title="Engineering Artifacts"
        subtitle="Exploring the limits of front-end dynamics and algorithmic efficiency."
      />

      {/* Aurora Ambient Elements */}
      <div className="absolute top-[20%] right-0 w-[40vw] h-[40vw] bg-accent/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-aurora" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12"
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
