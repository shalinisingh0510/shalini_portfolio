import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import profileFront from "../assets/images/shalini-kumari-alard-university.jpg"
import profileBack from "../assets/images/shalini-boat.jpg"
import Button from "../components/common/Button"
import FloatingTech from "../components/common/FloatingTech"

const roles = [
  "Open Source Contributor",
  "DSA & Problem Solving",
  "React & Node.js Developer",
]

const Hero = () => {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section aria-label="Hero section" className="min-h-screen flex items-center justify-center relative pt-16">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-accent-dim/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* LEFT PANE - Clean Professional Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="p-8 md:p-12 relative overflow-hidden bg-surface-lowest/40 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-bright/50 px-4 py-1.5 mb-8 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-muted uppercase tracking-widest">Available for Opportunities</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                <span className="block text-foreground mb-2">Engineering</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dim">
                  Scalable Systems.
                </span>
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 relative z-10 min-h-[40px]">
                <span className="text-xl md:text-2xl text-muted font-medium">I am an</span>
                <div className="relative inline-block h-8 w-[300px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roles[index]}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 text-xl md:text-2xl font-bold text-accent whitespace-nowrap"
                    >
                      {roles[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <p className="mt-6 text-muted text-lg max-w-lg leading-relaxed">
                I specialize in building robust backend architectures and sleek, responsive user interfaces, delivering highly performant digital applications.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button as="a" href="/projects" className="rounded-xl px-8 py-3.5 text-base bg-accent hover:bg-accent/90 border-none text-white font-semibold shadow-lg shadow-accent/20 transition-all cursor-pointer">
                  Explore My Work
                </Button>
                <Button as="a" href="/contact" variant="outline" className="rounded-xl px-8 py-3.5 text-base border-border hover:bg-surface-bright text-foreground font-medium transition-all cursor-pointer">
                  Let's Connect
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANE - Clean Circular Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-x-0 bottom-[-10%] h-32 bg-accent/10 blur-[80px] rounded-full scale-125 pointer-events-none" />
          
          <FloatingTech />

          <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] z-10 group perspective-1000">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 to-accent-dim/20 p-1 shadow-2xl">
               <motion.div
                 className="relative w-full h-full rounded-full overflow-hidden border-4 border-surface-lowest shadow-inner [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-1000 ease-in-out"
               >
                 {/* Front Layer */}
                 <div className="absolute inset-0 [backface-visibility:hidden] bg-surface-lowest">
                    <img
                      src={profileFront}
                      alt="Shalini Kumari"
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                    />
                 </div>
                 {/* Back Layer */}
                 <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-surface-lowest">
                    <img
                      src={profileBack}
                      alt="Shalini Kumari Alternative view"
                      className="w-full h-full object-cover"
                    />
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
