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
          <Card>
            <p className="text-muted text-body leading-relaxed">
              {dsaProfile.philosophy}
            </p>

            <h4 className="mt-6 font-semibold">
              Core Strengths
            </h4>

            <ul className="mt-3 list-disc list-inside text-muted space-y-1">
              {dsaProfile.strengths.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Card>

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
                  "group relative overflow-hidden block rounded-2xl border border-border/70 bg-card/70 p-5 backdrop-blur transition hover:border-border"
                }
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-60" />
                <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${profile.color}`} />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {profile.platform}
                    </h3>
                    <p className="text-sm text-muted">
                      @{profile.username}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition group-hover:gap-3">
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
