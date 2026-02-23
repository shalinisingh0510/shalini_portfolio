import { motion } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import SkillBar from "../components/common/SkillBar"
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

const Skills = () => {
  return (
    <section id="skills" aria-label="Skills section" className="py-28">
      <SectionHeader
        title="Skills"
        subtitle="A snapshot of my technical strengths, built through practice, projects, and problem-solving."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((group) => (
          <motion.article
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shimmer-border h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-highlight/20 text-lg">
                  {categoryIcons[group.category] || "📦"}
                </span>
                <h3 className="text-lg font-semibold">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-5">
                {group.items.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </Card>
          </motion.article>
        ))}
      </div>

      <div className="mt-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-highlight/20 text-lg">🧩</span>
          <h3 className="text-xl font-semibold">Problem Solving & DSA</h3>
        </div>
        <p className="mt-2 text-muted max-w-2xl">
          My approach to solving problems and consistency across competitive platforms.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <Card className="shimmer-border">
            <p className="text-muted text-body leading-relaxed">
              {dsaProfile.philosophy}
            </p>

            <h4 className="mt-6 font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-accent to-highlight" />
              Core Strengths
            </h4>

            <ul className="mt-3 space-y-2 text-muted">
              {dsaProfile.strengths.map((skill) => (
                <li key={skill} className="flex items-start gap-2 text-sm hover:text-foreground transition">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </Card>

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
                  "shimmer-border group relative overflow-hidden block rounded-2xl border border-border/70 bg-card/70 p-5 backdrop-blur transition hover:border-border"
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
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                    <span>View Profile</span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-highlight/20 text-lg">🌍</span>
          <h3 className="text-xl font-semibold">Open Source</h3>
        </div>
        <p className="mt-2 text-muted max-w-2xl">
          Collaborating, reviewing, and contributing to real-world codebases.
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          {openSourceContributions.map((item) => (
            <motion.article key={item.project} variants={fadeUp}>
              <Card className="h-full shimmer-border">
                <h3 className="text-lg font-semibold">
                  {item.project}
                </h3>

                <p className="mt-2 text-muted">
                  {item.description}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {item.impact.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="depth-button mt-6"
                >
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full border border-border/70 bg-foreground/5">
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
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                  <span>View Contribution</span>
                </a>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
