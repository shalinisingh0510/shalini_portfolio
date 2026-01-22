import { motion } from "framer-motion"

const Card = ({ children }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="
        relative
        rounded-2xl
        border border-white/10
        bg-white/5
        p-6
        overflow-hidden
      "
    >
      {/* Glow on hover */}
      <div className="
        pointer-events-none
        absolute inset-0
        opacity-0
        hover:opacity-100
        transition
        duration-500
        bg-gradient-to-br
        from-accent/20
        via-transparent
        to-transparent
      " />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default Card
