import { motion, useReducedMotion } from "framer-motion"

const items = [
  { label: "JavaScript", short: "JS", color: "from-yellow-400/30 to-orange-500/20", pos: "top-6 -left-10" },
  { label: "JSX", short: "JSX", color: "from-sky-400/30 to-cyan-500/20", pos: "top-20 right-0" },
  { label: "HTML", short: "HTML", color: "from-amber-400/30 to-red-500/20", pos: "bottom-16 -left-12" },
  { label: "CSS", short: "CSS", color: "from-blue-400/30 to-indigo-500/20", pos: "bottom-6 right-2" },
  { label: "JSON", short: "JSON", color: "from-emerald-400/30 to-teal-500/20", pos: "top-1/2 -right-10" },
]

const FloatingTech = () => {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          animate={reduceMotion ? {} : { y: [0, -12, 0], x: [0, 6, 0] }}
          transition={reduceMotion ? {} : { duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute ${item.pos}`}
        >
          <div className="floating-chip">
            <span className={`floating-chip__icon bg-gradient-to-br ${item.color}`}>
              {item.short}
            </span>
            <span className="floating-chip__label">
              {item.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingTech
