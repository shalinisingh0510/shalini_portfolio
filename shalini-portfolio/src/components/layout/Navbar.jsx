import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "./ThemeToggle"
import TerminalModal from "../common/TerminalModal"
import SnowEffect from "../common/SnowEffect"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isSnowing, setIsSnowing] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <SnowEffect isActive={isSnowing} />
      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-white/90 dark:bg-[#0a0f18]/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-xl font-bold tracking-wide flex-shrink-0 z-50 text-black dark:text-white" aria-label="Shalini Homepage" onClick={closeMenu}>
              Shalini<span className="text-blue-500 dark:text-[#38bdf8]">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6">
              <ul className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a className="relative px-3 py-2 text-sm font-semibold tracking-wide text-gray-600 dark:text-[#94a3b8] hover:text-black dark:hover:text-white transition-colors duration-300 group overflow-hidden" href={link.href} aria-label={`Go to ${link.name} section`}>
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 dark:bg-[#38bdf8] scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                      <span className="absolute inset-0 bg-blue-500/10 dark:bg-[#38bdf8]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-0 rounded-t-lg" />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => setIsSnowing(!isSnowing)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-[#0f172a] border border-gray-300 dark:border-[#38bdf8]/20 hover:border-blue-500 dark:hover:border-[#38bdf8]/50 hover:bg-blue-50 dark:hover:bg-[#38bdf8]/10 text-gray-600 dark:text-[#f8fafc] transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] dark:hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  aria-label="Toggle snow effect"
                >
                  {isSnowing ? '❄️' : '☁️'}
                </button>
                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#0f172a] border border-gray-300 dark:border-[#818cf8]/20 hover:border-blue-500 dark:hover:border-[#818cf8]/50 hover:bg-blue-50 dark:hover:bg-[#818cf8]/10 transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] dark:hover:shadow-[0_0_15px_rgba(129,140,248,0.4)] text-gray-600 dark:text-[#f8fafc] font-mono text-sm flex items-center gap-2"
                  aria-label="Open Terminal"
                >
                  <span className="text-blue-500 dark:text-[#38bdf8] font-bold">&gt;_</span> CLI
                </button>
                <div className="w-px h-5 bg-gray-300 dark:bg-white/20 mx-1" />
                <ThemeToggle />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-surface-bright/50 text-foreground transition-colors z-50"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-5 h-4 flex flex-col justify-between overflow-hidden">
                  <span className={`w-full h-[2px] bg-current rounded-sm transform transition-all duration-300 origin-left ${isOpen ? "rotate-45 translate-x-[2px]" : ""}`} />
                  <span className={`w-full h-[2px] bg-current rounded-sm transform transition-all duration-300 ${isOpen ? "opacity-0 translate-x-4" : ""}`} />
                  <span className={`w-full h-[2px] bg-current rounded-sm transform transition-all duration-300 origin-left ${isOpen ? "-rotate-45 translate-x-[2px]" : ""}`} />
                </div>
              </button>
            </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-16 left-0 w-full bg-[#111827] dark:bg-[#111827] backdrop-blur-lg border-b border-white/10 shadow-lg overflow-hidden"
            >
              <div className="px-6 py-6 pb-8 flex flex-col gap-4 max-h-[80vh] overflow-y-auto"
                   style={{
                     backgroundColor: 'var(--bg-secondary, #111827)',
                   }}>
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="block text-base py-3 px-4 rounded-md font-medium text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
                        onClick={closeMenu}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 mt-2 flex flex-col gap-4 border-t border-white/10">
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-sm font-medium text-[#94a3b8]">Terminal</span>
                    <button
                      onClick={() => { setIsTerminalOpen(true); closeMenu(); }}
                      className="px-3 py-1.5 rounded-md bg-[#1f2937] text-white font-mono text-xs border border-white/20"
                    >
                      &gt;_ Open
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-sm font-medium text-[#94a3b8]">Snow Effect</span>
                    <button
                      onClick={() => setIsSnowing(!isSnowing)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1f2937] border border-white/20 text-white transition-all"
                    >
                      {isSnowing ? '❄️' : '☁️'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-sm font-medium text-[#94a3b8]">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

export default Navbar
