import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"

const stats = [
  { value: 500, suffix: "+", label: "DSA Problems" },
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 5, suffix: "+", label: "Open Source PRs" },
]

const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="stat-card__number">
      {count}{suffix}
    </span>
  )
}

const About = () => {
  return (
    <section id="about" aria-label="About section" className="py-28">
      <SectionHeader
        title="About Me"
        subtitle="Not just what I know, but how I think and grow as an engineer."
      />

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-3 gap-4 mb-10"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <span className="stat-card__label">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Story Card */}
        <motion.article
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shimmer-border h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-highlight/20 text-lg">
                🚀
              </span>
              <h3 className="text-lg font-semibold">
                My Journey
              </h3>
            </div>
            <p className="text-muted text-body leading-relaxed">
              I am a software engineering student who believes strong fundamentals
              create long-term engineers. I focus on understanding problems deeply,
              writing clean code, and continuously improving through real-world
              projects and open-source collaboration.
            </p>
          </Card>
        </motion.article>

        {/* Highlights Card */}
        <motion.article
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shimmer-border h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-highlight/20 text-lg">
                ✨
              </span>
              <h3 className="text-lg font-semibold">
                What Defines Me
              </h3>
            </div>

            <ul className="space-y-3 text-muted text-sm">
              {[
                "Strong foundation in Data Structures & Algorithms",
                "Open-source contributor with real PR experience",
                "Clean architecture and reusable component mindset",
                "Focus on clarity, not shortcuts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 hover:text-foreground transition group">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-accent to-highlight shrink-0 group-hover:scale-125 transition-transform" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.article>
      </div>
    </section>
  )
}

export default About
