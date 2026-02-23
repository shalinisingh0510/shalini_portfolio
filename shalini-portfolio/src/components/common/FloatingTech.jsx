import { motion, useReducedMotion } from "framer-motion"

const items = [
  { label: "React", short: "⚛️", color: "from-sky-400/30 to-cyan-500/20", angle: 0 },
  { label: "JavaScript", short: "JS", color: "from-yellow-400/30 to-orange-500/20", angle: 45 },
  { label: "Node.js", short: "🟢", color: "from-green-400/30 to-emerald-500/20", angle: 90 },
  { label: "Tailwind", short: "🎨", color: "from-teal-400/30 to-cyan-500/20", angle: 135 },
  { label: "MongoDB", short: "🍃", color: "from-emerald-400/30 to-green-500/20", angle: 180 },
  { label: "Git", short: "🔀", color: "from-orange-400/30 to-red-500/20", angle: 225 },
  { label: "HTML", short: "🌐", color: "from-amber-400/30 to-red-500/20", angle: 270 },
  { label: "CSS", short: "💎", color: "from-blue-400/30 to-indigo-500/20", angle: 315 },
]

const RADIUS = 210 // px from center

const FloatingTech = () => {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      {items.map((item, i) => {
        const rad = (item.angle * Math.PI) / 180
        const x = Math.cos(rad) * RADIUS
        const y = Math.sin(rad) * RADIUS

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              reduceMotion
                ? { opacity: 1, scale: 1 }
                : {
                  opacity: 1,
                  scale: 1,
                  y: [y, y - 10, y],
                  x: [x, x + 5, x],
                }
            }
            transition={
              reduceMotion
                ? { duration: 0.5 }
                : {
                  opacity: { duration: 0.6, delay: i * 0.1 },
                  scale: { duration: 0.6, delay: i * 0.1 },
                  y: { duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                  x: { duration: 6 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                }
            }
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              marginLeft: x,
              marginTop: y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="floating-chip group hover:scale-110 transition-transform duration-300">
              <span className={`floating-chip__icon bg-gradient-to-br ${item.color}`}>
                {item.short}
              </span>
              <span className="floating-chip__label">
                {item.label}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingTech
