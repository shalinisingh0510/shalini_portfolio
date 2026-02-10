import { motion } from "framer-motion"

const GlassCard = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`glass-card card-3d relative overflow-hidden rounded-2xl ${className}`}
      {...props}
    >
      <div className="glass-card__glow" />
      <div className="glass-card__border" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default GlassCard
