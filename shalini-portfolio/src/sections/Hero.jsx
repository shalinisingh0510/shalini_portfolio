import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import profileFront from "../assets/images/profile.jpeg"
import profileBack from "../assets/images/shalini-kumari-alard-university.jpg"
import FloatingTech from "../components/common/FloatingTech"

const roles = [
  "Software Engineer",
  "React & Node Developer",
  "Open Source Contributor",
]

const Hero = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section aria-label="Hero section" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden perspective-1000">
      
      {/* Liquid 3D Background Elements - Professional Colors */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Slate/Blue Blurs */}
        <div className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-[#38bdf8]/10 blur-[130px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-[#818cf8]/10 blur-[150px] rounded-full mix-blend-screen" />
        
        {/* Morphing Liquid Shapes in Background */}
        <div className="absolute top-[30%] left-[80%] w-[30vw] h-[30vw] border border-[#38bdf8]/10 bg-gradient-to-br from-[#111827]/50 to-transparent morphing-blob backdrop-blur-3xl -z-10 animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-[20%] right-[70%] w-[25vw] h-[25vw] border border-[#818cf8]/10 bg-gradient-to-tr from-[#1f2937]/50 to-transparent morphing-blob backdrop-blur-3xl -z-10 animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT PANE - Liquid 3D Container */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: 10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative perspective-1000"
        >
          {/* Main 3D Glass Pane */}
          <div className="liquid-3d-card p-10 md:p-14 relative float-3d z-20">
            {/* Subtle Inner Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 mb-8 shadow-inner backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]"></span>
              </span>
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-[0.2em]">Open to Work</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
              <span className="block text-white filter drop-shadow-md">Engineering</span>
              <span className="text-gradient-accent filter drop-shadow-lg">
                Scalable Systems.
              </span>
            </h1>

            <div className="h-[50px] md:h-[60px] flex items-center mb-8 relative z-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[index]}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl lg:text-4xl font-display font-extrabold text-[#38bdf8] tracking-tight origin-bottom drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {roles[index]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="text-[#94a3b8] text-lg lg:text-xl font-sans max-w-lg leading-relaxed mb-10 font-light">
              Architecting fluid user interfaces and high-performance backend systems with precision, deep problem solving, and modern tech.
            </p>

            <div className="flex flex-wrap gap-5">
              <a href="/projects" className="liquid-btn-primary px-8 py-4 text-sm tracking-wide uppercase transition-transform hover:scale-105">
                Explore Work
              </a>
              <a href="/contact" className="liquid-3d-card px-8 py-4 text-sm font-semibold text-white tracking-wide uppercase transition-all hover:bg-white/10 hover:scale-105 border-white/20">
                Contact Me
              </a>
            </div>
          </div>
          
          {/* Decorative Liquid Orbit Behind Text Card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-[#38bdf8]/20 to-transparent blur-3xl opacity-50 -z-10 rounded-[3rem]" />
        </motion.div>

        {/* RIGHT PANE - 3D Liquid Profile Morph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center font-sans h-full"
        >
          <FloatingTech />

          {/* Morphing 3D Profile Frame */}
          <div className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] z-10 group perspective-1000">
            {/* The outer liquid container */}
            <div className="absolute inset-0 morphing-blob bg-gradient-to-br from-[#38bdf8]/30 via-transparent to-[#818cf8]/30 p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-transform duration-700 ease-out group-hover:scale-105">
               
               <motion.div
                 className="relative w-full h-full morphing-blob overflow-hidden bg-[#0f172a] shadow-[inset_0_4px_20px_rgba(255,255,255,0.1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
               >
                 {/* Front Layer */}
                 <div className="absolute inset-0 [backface-visibility:hidden]">
                    <img
                      src={profileFront}
                      alt="Shalini Kumari Front"
                      className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18]/80 via-transparent to-transparent" />
                 </div>
                 {/* Back Layer */}
                 <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <img
                      src={profileBack}
                      alt="Shalini Kumari Back"
                      className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18]/80 via-transparent to-transparent" />
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
