import { motion } from "framer-motion"
import { fadeUp } from "../../animations/fade"

const AnimatedSection = ({ children }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
