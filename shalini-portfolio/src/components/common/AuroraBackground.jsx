import { motion } from "framer-motion"

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Left glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[-20%]
          left-[-20%]
          w-[500px]
          h-[500px]
          bg-accent/20
          rounded-full
          blur-3xl
        "
      />

      {/* Right glow */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[-20%]
          right-[-20%]
          w-[500px]
          h-[500px]
          bg-purple-500/20
          rounded-full
          blur-3xl
        "
      />
    </div>
  )
}

export default AuroraBackground
