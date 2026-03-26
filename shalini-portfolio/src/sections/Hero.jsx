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
      
      {/* 3D Curved Aurora Overlay strictly for Hero */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.3, 1] }} 
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-accent-dim/20 rounded-fluid blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 perspective-1000">
        
        {/* LEFT PANE - Curved 3D Lifted Glass Panel */}
        <motion.div
          initial={{ opacity: 0, rotateY: 15, z: -100, x: -50 }}
          animate={{ opacity: 1, rotateY: 0, z: 0, x: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="glass-card !bg-surface-bright/20 p-8 md:p-12 !rounded-[2.5rem] border-white/5 relative overflow-hidden">
            
            {/* Inner fluid glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/30 rounded-full blur-[80px]" />
            
            <div className="relative z-10 translate-z-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.2)] mb-8">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Pioneering the Web</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                <span className="block text-foreground mb-2">Architecting</span>
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent via-highlight to-accent-dim animate-gradient-x">
                  Systems at Scale.
                </span>
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 relative z-10 min-h-[40px]">
                <span className="text-xl md:text-2xl text-muted">I am an</span>
                <div className="relative inline-block h-8 w-[300px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roles[index]}
                      initial={{ opacity: 0, y: 30, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -30, rotateX: 90 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="absolute inset-0 text-xl md:text-2xl font-bold text-accent origin-bottom drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] whitespace-nowrap"
                    >
                      {roles[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <p className="mt-8 text-muted/90 text-lg max-w-lg leading-relaxed font-light">
                Shalini Kumari converges heavy backend engineering with liquid UI/UX experiences, carving out a uniquely aesthetic and highly performant digital space.
              </p>

              <div className="mt-10 flex flex-wrap gap-5 translate-z-3">
                <Button as="a" href="/projects" className="shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(255,0,102,0.4)] hover:scale-105 transition-all duration-500 rounded-full px-8 py-4 text-base bg-gradient-to-r from-accent to-highlight border-none text-white font-bold">
                  Explore My Work
                </Button>
                <Button as="a" href="/contact" variant="outline" className="border border-accent/40 text-accent hover:bg-accent/10 rounded-full px-8 py-4 text-base backdrop-blur-md transition-all duration-500">
                  Let's Connect
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANE - Morphing Liquid Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center animate-float3D"
        >
          <div className="absolute inset-x-0 bottom-[-20%] h-32 bg-accent-dim/30 blur-[100px] rounded-full scale-150" />
          
          <FloatingTech />

          {/* Morphing 3D Container */}
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] z-10 group">
            
            {/* Iridescent Outer Ring */}
            <div className="absolute inset-[-10px] md:inset-[-20px] rounded-fluid bg-gradient-to-r from-accent via-highlight to-accent-dim opacity-70 animate-liquid blur-[15px] group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute inset-0 rounded-fluid bg-gradient-to-tr from-accent/40 to-highlight/40 backdrop-blur-3xl animate-liquid border-4 border-white/10 overflow-hidden shadow-[0_0_80px_rgba(176,0,255,0.5)]">
               {/* 3D Spin Flipper inside the Morph Container! */}
               <motion.div
                 className="relative w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-[1.5s] ease-[cubic-bezier(0.4,0,0.2,1)]"
               >
                 {/* Front Layer */}
                 <div className="absolute inset-0 [backface-visibility:hidden] flex items-center justify-center bg-surface-lowest">
                    <img
                      src={profileFront}
                      alt="Shalini Kumari"
                      className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 pointer-events-none scale-110"
                    />
                 </div>
                 {/* Back Layer */}
                 <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center bg-surface-lowest">
                    <img
                      src={profileBack}
                      alt="Shalini Kumari Alt"
                      className="w-full h-full object-cover opacity-90"
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
