import { motion, useScroll, useTransform } from "framer-motion"
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
    <div className="mb-6 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-white tracking-wide">{name}</span>
        <span className="text-sm font-bold text-[#38bdf8]">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-full relative"
        >
          {/* Subtle liquid highlight at the end of the bar */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </motion.div>
      </div>
    </div>
  )
}

const Skills = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <section id="skills" aria-label="Skills section" className="py-32 relative overflow-hidden font-sans" ref={containerRef}>
      
      {/* Liquid 3D Background Abstract Blobs */}
      <motion.div style={{ y: y1 }} className="absolute -left-[10%] top-[10%] w-[50vw] h-[50vw] border border-[#38bdf8]/10 bg-gradient-to-br from-[#1e293b]/50 to-transparent morphing-blob backdrop-blur-3xl -z-10 animate-[spin_30s_linear_infinite]" />
      <motion.div style={{ y: y2 }} className="absolute -right-[10%] top-[40%] w-[40vw] h-[40vw] border border-[#818cf8]/10 bg-gradient-to-tr from-[#111827]/50 to-transparent morphing-blob backdrop-blur-3xl -z-10 animate-[spin_25s_linear_infinite_reverse]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Technical Proficiency"
          subtitle="Advanced skillsets spanning frontend, backend, and algorithmic problem solving."
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-16 perspective-1000">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`liquid-3d-card relative float-3d`}
              style={{ animationDelay: `${idx * 0.3}s` }}
            >
              <div className="h-full bg-gradient-to-br from-[#1e293b]/40 to-transparent rounded-[2.5rem] p-10 relative overflow-hidden transition-colors duration-[1s] hover:bg-[#1e293b]/60">
                
                {/* Subtle soft gradient light flare */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                
                <div className="flex items-center gap-5 mb-10">
                  <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[#0f172a] shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] border border-white/10 text-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#38bdf8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{categoryIcons[group.category] || "📦"}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-widest uppercase">
                    {group.category}
                  </h3>
                </div>

                <div className="relative z-10">
                  {group.items.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Liquid 3D DSA Performance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 liquid-3d-card p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSI+PC9jaXJjbGU+Cjwvc3ZnPg==')] opacity-10 mix-blend-overlay pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#38bdf8]/10 px-5 py-2 mb-8 backdrop-blur-md">
                <span className="text-xs font-bold text-[#38bdf8] uppercase tracking-[0.2em]">DSA & Algorithms</span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-display font-extrabold text-white mb-6 leading-[1.1]">
                Mastering Code<br/><span className="text-gradient-accent">Efficiency.</span>
              </h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-10 font-light max-w-lg">
                {dsaProfile.philosophy}
              </p>

              <div className="flex flex-wrap gap-4">
                {dsaProfile.strengths.map((str) => (
                  <span key={str} className="px-5 py-2.5 rounded-xl border border-white/10 bg-[#1e293b]/50 text-sm font-semibold text-white/90 shadow-sm backdrop-blur-md">
                    {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-center">
              {dsaProfile.profiles.map((profile, i) => (
                <a
                  key={profile.platform}
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-6 rounded-[2rem] bg-[#0f172a]/50 border border-white/5 hover:bg-[#1e293b]/70 hover:border-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg"
                >
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-xl font-display font-bold text-white group-hover:text-[#38bdf8] transition-colors">{profile.platform}</h4>
                    <span className="text-sm text-[#94a3b8]">@{profile.username}</span>
                  </div>
                  
                  <div className="h-14 w-14 rounded-full bg-[#1e293b] flex items-center justify-center text-white border border-white/10 group-hover:bg-[#38bdf8] group-hover:text-[#0f172a] group-hover:border-transparent transition-all duration-300">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Liquid 3D Open Source Container */}
        <div className="mt-32">
          <SectionHeader
            title="Open Source Impact"
            subtitle="Giving back to the global developer community through high-quality code contributions."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid lg:grid-cols-2 gap-10"
          >
            {openSourceContributions.map((item, idx) => (
              <motion.article key={item.project} variants={fadeUp} className="group">
                <div className="h-full p-10 liquid-3d-card float-3d transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(56,189,248,0.15)] overflow-hidden" style={{ animationDelay: `${idx * 0.4}s` }}>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="mb-8 flex items-center justify-between">
                    <h3 className="text-3xl font-display font-bold text-white transition-colors duration-300 group-hover:text-[#38bdf8]">
                      {item.project}
                    </h3>
                    <div className="h-10 w-10 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center text-[#38bdf8] shadow-inner">
                       <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                       </svg>
                    </div>
                  </div>

                  <p className="text-[#94a3b8] text-lg mb-8 leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="space-y-4 mb-10">
                    {item.impact.map((point) => (
                      <div key={point} className="flex items-start gap-4">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.8)] shrink-0" />
                        <span className="text-white/80 font-medium">{point}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-btn-primary px-8 py-4 text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-3 transition-transform hover:scale-105"
                  >
                    <span>View Contribution</span>
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
