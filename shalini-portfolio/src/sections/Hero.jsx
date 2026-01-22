import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import profile from "../assets/images/profile.jpg"
import Button from "../components/common/Button"

const roles = [
  "Software Engineer",
  "Open Source Contributor",
  "DSA & Problem Solving",
]

const Hero = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 2600)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm text-muted mb-4">
            Hi, I’m
          </p>

          <h1 className="text-hero font-bold tracking-tight">
            Shalini Kumari
          </h1>

          {/* Animated Role */}
          <div className="relative h-10 mt-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roles[index]}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute text-xl md:text-2xl text-muted"
              >
                {roles[index]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Accent underline */}
          <motion.div
            className="mt-2 h-[2px] w-16 bg-accent rounded"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.6 }}
          />

          <p className="mt-6 text-muted text-body max-w-xl">
            I build scalable web applications with a strong foundation in
            data structures, clean architecture, and real-world engineering.
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
          {/* Background glow */}
          <div className="absolute -inset-10 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-transparent blur-3xl rounded-3xl" />

          {/* Portrait panel */}
          <div className="relative z-10 w-[260px] md:w-[300px]">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Image */}
              <img
                src={profile}
                alt="Shalini Kumari"
                className="w-full h-full object-cover"
              />

              {/* Gradient fade (bottom) */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
