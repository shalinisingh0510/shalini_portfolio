import { motion } from "framer-motion"
import { useRef } from "react"
import SectionHeader from "../components/common/SectionHeader"
import { skills } from "../data/skills"
import { dsaProfile } from "../data/dsa"
import { openSourceContributions } from "../data/opensource"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const categoryIcons = {
  "Frontend": "💻",
  "Backend & Database": "⚙️",
  "DSA & CS Fundamentals": "🧠",
  "Tools & Platforms": "🛠️",
}

const SkillBar = ({ name, level }) => {
  return (
    <div className="mb-5 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-foreground tracking-wide">{name}</span>
        <span className="text-sm font-bold text-accent">{level}%</span>
      </div>
      <div className="h-2 w-full bg-surface-bright rounded-full overflow-hidden border border-border/50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-accent rounded-full relative"
        />
      </div>
    </div>
  )
}

const Skills = () => {
  const containerRef = useRef(null)

  return (
    <section id="skills" aria-label="Skills section" className="py-24 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Technical Proficiency"
          subtitle="Advanced skillsets spanning frontend, backend, and core computer science concepts."
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-surface-lowest/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-accent/30 transition-all p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-surface-bright border border-border text-xl">
                  {categoryIcons[group.category] || "📦"}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {group.category}
                </h3>
              </div>

              <div className="relative z-10">
                {group.items.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* DSA Performance & Competitive Strengths */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 bg-surface-lowest/50 backdrop-blur-md rounded-2xl border border-border/50 p-10 lg:p-14 shadow-md relative overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface-bright px-4 py-1.5 mb-6">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Problem Solving</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">Mastering Code<br/><span className="text-accent">Efficiency.</span></h3>
              <p className="text-muted text-base leading-relaxed mb-8">
                {dsaProfile.philosophy}
              </p>

              <div className="flex flex-wrap gap-3">
                {dsaProfile.strengths.map((str) => (
                  <span key={str} className="px-4 py-2 rounded-lg bg-surface-bright border border-border/50 text-sm font-medium text-foreground">
                    {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-center">
              {dsaProfile.profiles.map((profile) => (
                <a
                  key={profile.platform}
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 rounded-xl bg-surface-bright/50 border border-border/50 hover:bg-surface-bright transition-all"
                >
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{profile.platform}</h4>
                    <span className="text-sm text-muted">@{profile.username}</span>
                  </div>
                  
                  <div className="h-10 w-10 rounded-full bg-surface-lowest border border-border/50 flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent/50 transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Open Source */}
        <div className="mt-24">
          <SectionHeader
            title="Open Source Impact"
            subtitle="Contributing to the global developer community by enhancing open-source tools."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid lg:grid-cols-2 gap-8"
          >
            {openSourceContributions.map((item) => (
              <motion.article key={item.project} variants={fadeUp} className="group cursor-pointer">
                <div className="h-full p-8 rounded-2xl bg-surface-lowest/80 border border-border/50 hover:border-accent/40 transition-colors shadow-sm hover:shadow-md">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {item.project}
                    </h3>
                  </div>
                  <p className="text-base text-muted mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="space-y-3 mb-8 text-sm">
                    {item.impact.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-foreground/80 font-medium">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent transition-colors group-hover:text-accent/80"
                  >
                    View Contribution
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
