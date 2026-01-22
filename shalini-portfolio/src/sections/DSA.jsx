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
                className={`
                  block
                  rounded-xl
                  border border-white/10
                  bg-gradient-to-br ${profile.color}
                  p-5
                  hover:border-white/30
                  transition
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {profile.platform}
                    </h3>
                    <p className="text-sm text-muted">
                      @{profile.username}
                    </p>
                  </div>

                  <span className="text-sm text-accent">
                    View Profile →
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
