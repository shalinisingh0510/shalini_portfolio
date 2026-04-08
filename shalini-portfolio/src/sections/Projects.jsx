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
  "Node.js": "text-green-400 bg-green-400/10 border-green-400/20",
  "Express": "text-gray-300 bg-gray-300/10 border-gray-300/20",
  "PostgreSQL": "text-[#336791] bg-[#336791]/10 border-[#336791]/30",
  "Groq AI": "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20",
  "Supabase": "text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/20",
  "Recharts": "text-[#ff6b6b] bg-[#ff6b6b]/10 border-[#ff6b6b]/20",
}

/* ── SVG Icon components ── */
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

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
        {/* Dynamic Highlight overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#38bdf8]/10 via-transparent to-transparent transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-1px)" }} />

        {project.featured && (
          <div className="absolute top-6 right-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30 shadow-inner" style={{ transform: "translateZ(50px)" }}>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
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

        {/* ── Action Buttons ── */}
        <div style={{ transform: "translateZ(70px)" }} className="mt-12 flex gap-3">
          {/* Live Preview Button (Eye Icon) — only if liveLink exists */}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 flex-1 liquid-btn-primary py-4 hover:shadow-[0_15px_30px_-5px_rgba(56,189,248,0.4)] transition-all group/live"
              title="View Live App"
            >
              <span className="transition-transform group-hover/live:scale-110">
                <EyeIcon />
              </span>
              <span className="font-display tracking-wide uppercase text-sm">Live Preview</span>
            </a>
          )}

          {/* GitHub / View Implementation Button */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2.5 py-4 transition-all group/gh ${
              project.liveLink
                ? "flex-1 liquid-btn-secondary hover:shadow-[0_15px_30px_-5px_rgba(255,255,255,0.1)]"
                : "w-full liquid-btn-primary hover:shadow-[0_15px_30px_-5px_rgba(56,189,248,0.4)]"
            }`}
            title="View on GitHub"
          >
            <span className="transition-transform group-hover/gh:scale-110">
              <GitHubIcon />
            </span>
            <span className="font-display tracking-wide uppercase text-sm">View Code</span>
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
