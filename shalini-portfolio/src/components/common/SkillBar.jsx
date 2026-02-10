import { motion } from "framer-motion"

const SkillBar = ({ name, level }) => {
  const iconText = name.slice(0, 2).toUpperCase()

  return (
    <motion.div
      whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className="skill-card"
    >
      <div className="skill-icon">
        {iconText}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground font-medium">{name}</span>
          <span className="text-muted">{level}%</span>
        </div>

        <div className="mt-2 h-2.5 w-full rounded-full bg-foreground/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full skill-fill"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default SkillBar
