import { motion } from "framer-motion"
import Button from "../components/common/Button"

const Resume = () => {
  return (
    <section id="resume" aria-label="Resume section" className="py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="liquid-3d-card p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 hover:bg-[#1e293b]/50 transition-colors duration-500 float-3d group"
      >
        {/* Glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-[#38bdf8]/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

        {/* Text */}
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl font-display font-bold text-white">
            Download My Resume
          </h2>
          <p className="mt-4 text-[#94a3b8] text-lg max-w-2xl font-light">
            A concise overview of my skills, projects, open-source work,
            and problem-solving experience.
          </p>
        </div>

        {/* Button */}
        <a href="/resume.pdf" download className="liquid-btn-primary px-10 py-5 text-sm uppercase tracking-widest whitespace-nowrap z-10">
          Download Resume <span className="ml-3 font-serif">→</span>
        </a>
      </motion.div>
    </section>
  )
}

export default Resume
