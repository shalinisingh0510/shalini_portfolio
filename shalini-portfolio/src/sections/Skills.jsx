import { motion } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import SkillBar from "../components/common/SkillBar"
import { skills } from "../data/skills"

const Skills = () => {
  return (
    <section id="skills" className="py-28">
      <SectionHeader
        title="Skills"
        subtitle="A snapshot of my technical strengths, built through practice, projects, and problem-solving."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((group) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <h3 className="text-lg font-semibold mb-6">
                {group.category}
              </h3>

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
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
