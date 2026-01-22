import { motion } from "framer-motion"

const Resume = () => {
  return (
    <section id="resume" className="py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-white/5
          p-10
          flex flex-col md:flex-row
          items-center
          justify-between
          gap-8
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 hover:opacity-100 transition duration-700" />

        {/* Text */}
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold">
            Download My Resume
          </h2>
          <p className="mt-3 text-muted max-w-xl">
            A concise overview of my skills, projects, open-source work,
            and problem-solving experience.
          </p>
        </div>

        {/* Button */}
        <a
          href="/resume.pdf"
          download
          className="
            relative z-10
            inline-flex items-center gap-2
            px-6 py-3
            rounded-md
            bg-accent
            text-white
            text-sm font-medium
            transition
            hover:gap-3
            hover:opacity-90
          "
        >
          Download Resume
          <span className="text-lg">↓</span>
        </a>
      </motion.div>
    </section>
  )
}

export default Resume
