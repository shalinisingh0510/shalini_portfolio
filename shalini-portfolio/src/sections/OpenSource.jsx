import SectionHeader from "../components/common/SectionHeader"
import AnimatedSection from "../components/common/AnimatedSection"
import { openSourceContributions } from "../data/opensource"
import { motion } from "framer-motion"

const OpenSource = () => {
  return (
    <section id="opensource" className="py-24 relative font-sans overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[5%] w-[40vw] h-[40vw] bg-[#818cf8]/5 blur-[120px] rounded-full pointer-events-none" />

      <AnimatedSection>
        <SectionHeader
          title="Open Source"
          subtitle="Collaborating, reviewing, and contributing to real-world codebases."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 relative z-10">
          {openSourceContributions.map((item, idx) => (
            <motion.div 
              key={item.project} 
              className="liquid-3d-card p-10 flex flex-col group hover:shadow-[0_20px_40px_-5px_rgba(56,189,248,0.15)] transition-all duration-500 float-3d"
              style={{ animationDelay: `${idx * 0.3}s` }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                  {item.project}
                </h3>
                <div className="h-10 w-10 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center text-[#38bdf8] shadow-inner">
                   <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                   </svg>
                </div>
              </div>

              <p className="text-[#94a3b8] text-base leading-relaxed mb-8 font-light flex-grow">
                {item.description}
              </p>

              <div className="space-y-3 mb-10">
                {item.impact.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.8)] shrink-0" />
                    <span className="text-sm text-[#94a3b8] leading-relaxed font-light">{point}</span>
                  </div>
                ))}
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 group/btn"
              >
                <span>View Contribution</span>
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.25 12c1.24-2.88 4.49-5 9.75-5s8.51 2.12 9.75 5c-1.24 2.88-4.49 5-9.75 5s-8.51-2.12-9.75-5Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}

export default OpenSource
