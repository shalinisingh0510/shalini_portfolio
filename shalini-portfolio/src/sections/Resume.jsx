import { motion } from "framer-motion"
import Button from "../components/common/Button"

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
          border border-border/70
          bg-card/75
          p-10
          flex flex-col md:flex-row
          items-start md:items-center
          justify-between
          gap-8
          shadow-soft
          backdrop-blur
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-highlight/15 to-transparent opacity-0 hover:opacity-100 transition duration-700" />

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
        <Button as="a" href="/resume.pdf" download className="relative z-10">
          Download Resume <span className="ml-2 text-lg">?</span>
        </Button>
      </motion.div>
    </section>
  )
}

export default Resume
