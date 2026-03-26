import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import SectionHeader from "../components/common/SectionHeader"
import { skills } from "../data/skills"
import { dsaProfile } from "../data/dsa"
import { openSourceContributions } from "../data/opensource"
import { staggerContainer } from "../animations/stagger"
import { fadeUp } from "../animations/fade"

const categoryIcons = {
  "Frontend": "🎨",
  "Backend & Database": "🗄️",
  "DSA & CS Fundamentals": "🧠",
  "Tools & Platforms": "🛠️",
}

const NeonSkillBar = ({ name, level }) => {
  return (
    <div className="mb-6 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-white tracking-widest uppercase shadow-[0_0_10px_rgba(255,255,255,0.2)]">{name}</span>
        <span className="text-xs font-bold text-accent drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-surface-bright/50 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full bg-gradient-to-r from-accent to-highlight rounded-full relative"
        >
          {/* Glowing head of the progress bar */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,0,102,1)]" />
        </motion.div>
      </div>
    </div>
  )
}

const Skills = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section id="skills" aria-label="Skills section" className="py-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Immersive Parallax Abstract Orbs */}
      <motion.div style={{ y: y1 }} className="absolute -left-[20%] top-[10%] w-[60vw] h-[60vw] bg-accent/10 blur-[150px] rounded-fluid pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute -right-[20%] top-[40%] w-[50vw] h-[50vw] bg-highlight/10 blur-[180px] rounded-fluid pointer-events-none" />
      <div className="absolute top-[80%] left-[30%] w-[40vw] h-[40vw] bg-accent-dim/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-aurora" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Technical Arsenal"
          subtitle="Advanced proficiency visualized through Aurora GlassFlow dynamics."
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-16 perspective-1000">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`p-[1px] bg-gradient-to-br ${idx % 2 === 0 ? "from-accent via-border/10 to-transparent" : "from-highlight via-border/10 to-transparent"} rounded-[3rem] group animate-float3D`}
              style={{ animationDelay: `${idx * 0.5}s` }}
            >
              <div className="h-full glass-card !bg-surface-bright/20 backdrop-blur-3xl rounded-[3rem] p-10 relative overflow-hidden hover:bg-surface-bright/40 transition-colors duration-[1.5s]">
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl" />
                
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/30 to-highlight/30 shadow-[0_0_30px_rgba(0,240,255,0.4)] backdrop-blur-xl border border-white/20 text-2xl">
                    {categoryIcons[group.category] || "📦"}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-widest uppercase bg-clip-text">
                    {group.category}
                  </h3>
                </div>

                <div className="relative z-10">
                  {group.items.map((skill) => (
                    <NeonSkillBar key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DSA Performance & Competitive Strengths */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 glass !bg-surface-bright/10 backdrop-blur-3xl rounded-[4rem] p-12 lg:p-16 border-white/10 shadow-[0_0_100px_rgba(176,0,255,0.15)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSI+PC9jaXJjbGU+Cjwvc3ZnPg==')] opacity-[0.15]" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-highlight/30 bg-highlight/10 px-6 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(255,0,102,0.2)] mb-8">
                <span className="text-sm font-bold text-highlight uppercase tracking-[0.2em]">DSA & Algorithms</span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">Mastering Code<br/><span className="text-gradient">Efficiency.</span></h3>
              <p className="text-muted/80 text-lg leading-relaxed mb-10 font-light">
                {dsaProfile.philosophy}
              </p>

              <div className="flex flex-wrap gap-4">
                {dsaProfile.strengths.map((str) => (
                  <span key={str} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-lg">
                    {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 list-none flex flex-col justify-center">
              {dsaProfile.profiles.map((profile, i) => (
                <a
                  key={profile.platform}
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-6 rounded-3xl bg-surface-bright/30 border border-white/5 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${profile.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl pointer-events-none`} />
                  
                  <div className="flex flex-col gap-1">
                    <h4 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{profile.platform}</h4>
                    <span className="text-muted">@{profile.username}</span>
                  </div>
                  
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Open Source */}
        <div className="mt-32">
          <SectionHeader
            title="Open Source Impact"
            subtitle="Giving back to the global developer community through code and reviews."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid lg:grid-cols-2 gap-10"
          >
            {openSourceContributions.map((item) => (
              <motion.article key={item.project} variants={fadeUp} className="group cursor-pointer">
                <div className="h-full p-10 rounded-[2.5rem] glass border border-white/5 group-hover:border-highlight/30 transition-colors duration-500 hover:bg-surface-bright/30 animate-float3D" style={{ animationDelay: '1s' }}>
                  <div className="mb-8 flex items-center justify-between">
                    <h3 className="text-3xl font-extrabold text-white bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-highlight to-accent transition-all duration-300">
                      {item.project}
                    </h3>
                    <div className="h-3 w-3 rounded-full bg-highlight group-hover:shadow-[0_0_20px_rgba(255,0,102,1)] transition-shadow duration-500 animate-pulse" />
                  </div>
                  <p className="text-lg text-muted/90 mb-8 leading-relaxed font-light">
                    {item.description}
                  </p>
                  <ul className="space-y-4 mb-10">
                    {item.impact.map((point) => (
                      <li key={point} className="flex items-start gap-4 text-white/80 font-medium">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-accent/80 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm font-bold text-accent uppercase tracking-widest group-hover:text-highlight transition-colors"
                  >
                    View Contribution
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
