import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import profile from "../assets/images/shalini-kumari-alard-university.jpg"
import Button from "../components/common/Button"
import FloatingTech from "../components/common/FloatingTech"

const roles = [
  "Open Source Contributor",
  "DSA & Problem Solving",
  "React & Node.js Developer",
]

const Hero = () => {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 2600)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (event) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const dx = (x - centerX) / centerX
    const dy = (y - centerY) / centerY
    rotateX.set(-dy * 6)
    rotateY.set(dx * 6)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <section aria-label="Hero section" className="min-h-[90vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-16 items-center w-full">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/60 px-4 py-2 backdrop-blur shadow-soft">
            <span className="text-xs uppercase tracking-[0.35em] text-muted">Hello</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs font-semibold text-foreground/80">I'm</span>
          </div>

          <h1 className="mt-5 text-hero font-bold tracking-tight">
            <span className="text-gradient">Shalini Kumari</span>
          </h1>

          <h2 className="mt-4 text-xl md:text-2xl text-muted">
            Software Developer | Alard University
          </h2>

          {/* Animated Role */}
          <div className="relative h-8 mt-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roles[index]}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute text-sm md:text-base text-muted"
              >
                {roles[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Accent underline */}
          <motion.div
            className="mt-3 h-[2px] w-16 bg-gradient-to-r from-accent to-highlight rounded"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.6 }}
          />

          <p className="mt-6 text-muted text-body max-w-xl">
            Shalini Kumari is a Software Developer from Alard University building
            scalable web applications with strong foundations in data structures,
            clean architecture, and real-world engineering.
          </p>

          <div className="mt-8 flex gap-4">
            <Button as="a" href="#projects">
              View Projects
            </Button>
            <Button as="a" href="#contact" variant="outline">
              Contact Me
            </Button>
          </div>
        </motion.div>

        {/* RIGHT — HERO PORTRAIT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <FloatingTech />
          {/* Background glow */}
          <div className="absolute -inset-10 bg-gradient-to-br from-accent/25 via-highlight/20 to-transparent blur-3xl rounded-3xl" />

          {/* Portrait panel */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className="relative z-10 w-[260px] md:w-[320px] aspect-square"
          >
            <motion.div
              animate={reduceMotion ? {} : { y: [0, -8, 0] }}
              transition={reduceMotion ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full overflow-hidden rounded-full border border-border/70 shadow-2xl"
            >
              <img
                src={profile}
                alt="Shalini Kumari Alard University Software Developer"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-center scale-105 hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              <div className="pointer-events-none absolute -inset-2 rounded-full border border-border/50" />
            </motion.div>

            <div className="absolute -bottom-6 left-1/2 h-10 w-40 -translate-x-1/2 rounded-full bg-black/30 blur-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

