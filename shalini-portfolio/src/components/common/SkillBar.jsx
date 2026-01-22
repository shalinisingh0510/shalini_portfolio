import { motion } from "framer-motion"

const SkillBar = ({ name, level }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="text-muted">{level}%</span>
      </div>

      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-accent"
        />
      </div>
    </div>
  )
}

export default SkillBar
