import { motion } from "framer-motion"

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-14">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-h2 font-semibold tracking-tight"
      >
        <span className="text-gradient">{title}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 text-muted text-body max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "6rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-6 h-[2px] bg-gradient-to-r from-accent to-highlight/60 rounded-full"
        style={{ backgroundSize: "200% 100%", animation: "shimmer 4s ease-in-out infinite" }}
      />
    </div>
  )
}

export default SectionHeader
