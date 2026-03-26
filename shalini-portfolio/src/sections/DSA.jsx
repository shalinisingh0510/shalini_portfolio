import { motion } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import AnimatedSection from "../components/common/AnimatedSection"
import { dsaProfile } from "../data/dsa"

const DSA = () => {
  return (
    <section id="dsa" className="py-28">
      <AnimatedSection>
        <SectionHeader
          title="Problem Solving & DSA"
          subtitle="My approach to solving problems and consistency across competitive platforms."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Philosophy */}
          <div className="liquid-3d-card p-10 relative overflow-hidden group hover:bg-[#1e293b]/50 transition-colors duration-500">
            <h3 className="text-2xl font-display font-bold text-white mb-6">Algorithm Strategy</h3>
            <p className="text-[#94a3b8] text-lg leading-relaxed font-light">
              {dsaProfile.philosophy}
            </p>

            <h4 className="mt-8 font-display font-semibold text-[#38bdf8] uppercase tracking-widest text-sm mb-4">
              Core Strengths
            </h4>

            <ul className="mt-3 text-[#f8fafc] space-y-3 font-medium">
              {dsaProfile.strengths.map((skill) => (
                <li key={skill} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Profiles */}
          <div className="space-y-5">
            {dsaProfile.profiles.map((profile) => (
              <motion.a
                key={profile.platform}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={
                  "group relative overflow-hidden block rounded-2xl glass-card p-5 transition hover:border-border"
                }
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1e293b]/50 to-transparent opacity-60" />
                <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${profile.color} opacity-20`} />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {profile.platform}
                    </h3>
                    <p className="text-sm text-[#94a3b8] mt-1">
                      @{profile.username}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#38bdf8] transition-all group-hover:gap-3 group-hover:text-white">
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-border/70 bg-foreground/5">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>
                    <span>View Profile</span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}

export default DSA
