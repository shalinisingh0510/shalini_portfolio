import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import { projects } from "../data/projects"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const techColors = {
  "React": "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20",
  "Tailwind CSS": "text-teal-400 bg-teal-400/10 border-teal-400/20",
  "Framer Motion": "text-[#818cf8] bg-[#818cf8]/10 border-[#818cf8]/20",
  "C++": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Data Structures": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Algorithms": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "JavaScript": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "GitHub API": "text-gray-300 bg-gray-300/10 border-gray-300/20",
  "REST APIs": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
}

const ProjectCardLiquid3D = ({ project, index }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

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
      className="relative z-10 w-full group isolate"
    >
      {/* 3D Liquid Extruded Card */}
      <div 
        className="liquid-3d-card w-full h-full p-8 md:p-10 relative overflow-hidden transition-colors duration-500 group-hover:bg-[#1f2937]/90"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        {/* Dynamic Highlight overlay that follows mouse (using simple opacity transition for pure CSS approach) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#38bdf8]/10 via-transparent to-transparent transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-1px)" }} />

        {index === 0 && (
          <div className="absolute top-6 right-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30 shadow-inner" style={{ transform: "translateZ(50px)" }}>
            Featured
          </div>
        )}

        <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mb-4" style={{ transform: "translateZ(60px)" }}>
          {project.title}
        </h3>

        <p className="text-[#94a3b8] font-sans leading-relaxed text-base md:text-lg" style={{ transform: "translateZ(40px)" }}>
          {project.description}
        </p>

        <ul className="mt-8 space-y-3 text-sm font-sans text-[#f8fafc]/90" style={{ transform: "translateZ(45px)" }}>
          {project.highlights.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#38bdf8] shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-2" style={{ transform: "translateZ(55px)" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold border ${techColors[t] || "border-white/10 text-white/80 bg-white/5"}`}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ transform: "translateZ(70px)" }} className="mt-12">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full liquid-btn-primary py-4 hover:shadow-[0_15px_30px_-5px_rgba(56,189,248,0.4)] transition-all group/link"
          >
            <span className="font-display tracking-wide uppercase text-sm">View Implementation</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 transition-transform group-hover/link:translate-x-1"
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
      </div>
    </motion.article>
  )
}

const Projects = () => {
  return (
    <section id="projects" aria-label="Projects section" className="py-32 relative font-sans">
      <SectionHeader
        title="Engineering Artifacts"
        subtitle="Exploring the limits of front-end dynamics, scalable architecture, and algorithmic efficiency."
      />

      {/* Subtle Liquid Gradient Blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#38bdf8]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 mt-16"
        style={{ perspective: "1500px" }}
      >
        {projects.map((project, i) => (
          <ProjectCardLiquid3D key={project.title} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
