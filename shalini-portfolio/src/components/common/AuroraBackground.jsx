import { motion } from "framer-motion"

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
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
          w-[520px]
          h-[520px]
          rounded-full
          blur-3xl
          bg-accent/25
          dark:bg-accent/20
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
          w-[520px]
          h-[520px]
          rounded-full
          blur-3xl
          bg-highlight/25
          dark:bg-highlight/20
        "
      />

      {/* Center glow */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[10%]
          left-[40%]
          w-[420px]
          h-[420px]
          rounded-full
          blur-3xl
          bg-accent/15
          dark:bg-accent/12
        "
      />
    </div>
  )
}

export default AuroraBackground
