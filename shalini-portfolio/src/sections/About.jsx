import { motion } from "framer-motion"
import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"

const About = () => {
  return (
    <section id="about" className="py-28">
      <SectionHeader
        title="About Me"
        subtitle="Not just what I know — but how I think and grow as an engineer."
      />

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <h3 className="text-lg font-semibold mb-3">
              My Journey
            </h3>
            <p className="text-muted text-body leading-relaxed">
              I am a software engineering student who believes strong fundamentals
              create long-term engineers. I focus on understanding problems deeply,
              writing clean code, and continuously improving through real-world
              projects and open-source collaboration.
            </p>
          </Card>
        </motion.div>

        {/* Highlights Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <h3 className="text-lg font-semibold mb-4">
              What Defines Me
            </h3>

            <ul className="space-y-3 text-muted text-sm">
              <li className="hover:text-foreground transition">
                • Strong foundation in Data Structures & Algorithms
              </li>
              <li className="hover:text-foreground transition">
                • Open-source contributor with real PR experience
              </li>
              <li className="hover:text-foreground transition">
                • Clean architecture & reusable component mindset
              </li>
              <li className="hover:text-foreground transition">
                • Focus on clarity, not shortcuts
              </li>
            </ul>
          </Card>
        </motion.div>

      </div>
    </section>
  )
}

export default About
