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
        {stats.map((stat, idx) => (
          <div key={stat.label} className="liquid-3d-card p-6 flex flex-col items-center justify-center text-center animate-float3D" style={{ animationDelay: `${idx * 0.2}s` }}>
            <span className="text-4xl font-display font-bold text-[#38bdf8] mb-2"><AnimatedCounter target={stat.value} suffix={stat.suffix} /></span>
            <span className="text-[#94a3b8] text-sm uppercase tracking-widest">{stat.label}</span>
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
          <div className="liquid-3d-card h-full p-8 md:p-12 hover:bg-[#1e293b]/50 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#0f172a] border border-[#38bdf8]/30 shadow-inner text-xl">
                🚀
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                My Journey
              </h3>
            </div>
            <p className="text-[#94a3b8] text-lg leading-relaxed font-light">
              I am a software engineering student who believes strong fundamentals
              create long-term engineers. I focus on understanding problems deeply,
              writing clean code, and continuously improving through real-world
              projects and open-source collaboration.
            </p>
          </div>
        </motion.article>

        {/* Highlights Card */}
        <motion.article
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="liquid-3d-card h-full p-8 md:p-12 hover:bg-[#1e293b]/50 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#0f172a] border border-[#818cf8]/30 shadow-inner text-xl">
                ✨
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                What Defines Me
              </h3>
            </div>

            <ul className="space-y-4 text-[#94a3b8] text-base font-light">
              {[
                "Strong foundation in Data Structures & Algorithms",
                "Open-source contributor with real PR experience",
                "Clean architecture and reusable component mindset",
                "Focus on clarity, not shortcuts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4 hover:text-[#f8fafc] transition-colors group">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#38bdf8] shrink-0 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.8)] transition-all" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

export default About
