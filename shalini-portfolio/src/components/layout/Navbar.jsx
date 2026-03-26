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

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[90%] max-w-6xl z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[2rem] p-[1px] ${
          scrolled || isOpen
            ? "bg-gradient-to-r from-accent/20 via-border/10 to-highlight/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "bg-transparent shadow-none"
        }`}
      >
        <div className={`transition-all duration-700 w-full h-full rounded-[2rem] ${scrolled || isOpen ? "bg-surface-lowest/60 backdrop-blur-3xl border border-white/5" : "bg-transparent"}`}>
          <nav aria-label="Primary navigation" className="px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-xl font-black tracking-widest uppercase flex-shrink-0 z-50 text-white" aria-label="Shalini Homepage" onClick={closeMenu}>
              SHA<span className="text-accent drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6">
              <ul className="hidden md:flex items-center gap-1 p-1 rounded-full border border-white/5 bg-white/5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a className="px-4 py-1.5 rounded-full text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all flex items-center" href={link.href} aria-label={`Go to ${link.name} section`}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => setIsSnowing(!isSnowing)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-accent/10 border border-white/5 bg-white/5 transition-colors text-white text-sm"
                  aria-label="Toggle snow effect"
                >
                  {isSnowing ? '❄️' : '☁️'}
                </button>
                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="px-4 py-1.5 rounded-full hover:bg-surface-bright/60 transition-colors text-white font-mono text-xs border border-white/10 bg-surface-lowest/50 backdrop-blur-md flex items-center gap-2 group shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  aria-label="Open Terminal"
                >
                  <span className="text-highlight font-black group-hover:text-accent transition-colors">&gt;_</span> CLI
                </button>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <ThemeToggle />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-accent/10 text-white transition-colors z-50"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-5 h-4 flex flex-col justify-between overflow-hidden">
                  <span className={`w-full h-[2px] bg-current rounded-full transform transition-all duration-300 origin-left ${isOpen ? "rotate-45 translate-x-[2px]" : ""}`} />
                  <span className={`w-full h-[2px] bg-current rounded-full transform transition-all duration-300 ${isOpen ? "opacity-0 translate-x-4" : ""}`} />
                  <span className={`w-full h-[2px] bg-current rounded-full transform transition-all duration-300 origin-left ${isOpen ? "-rotate-45 translate-x-[2px]" : ""}`} />
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="md:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-surface-lowest/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="px-6 py-6 pb-8 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      <a
                        href={link.href}
                        className="block text-lg py-3 px-6 rounded-2xl font-bold border border-transparent text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all text-center"
                        onClick={closeMenu}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="pt-6 mt-2 flex flex-col gap-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white/50 uppercase tracking-widest border border-transparent">Terminal Module</span>
                    <button
                      onClick={() => { setIsTerminalOpen(true); closeMenu(); }}
                      className="px-4 py-2 rounded-xl bg-accent/20 text-accent font-mono text-xs border border-accent/40 font-bold tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    >
                      &gt;_ OPEN
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Snow Protocol</span>
                    <button
                      onClick={() => setIsSnowing(!isSnowing)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white shadow-soft transition-all"
                    >
                      {isSnowing ? '❄️' : '☁️'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white/50 uppercase tracking-widest">UI Theme</span>
                    <ThemeToggle />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default Navbar
