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
            ? "bg-surface-lowest/80 backdrop-blur-md shadow-sm border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-xl font-bold tracking-wide flex-shrink-0 z-50 text-foreground" aria-label="Shalini Homepage" onClick={closeMenu}>
              Shalini<span className="text-accent">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6">
              <ul className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a className="text-sm font-medium text-muted hover:text-foreground transition-colors py-2" href={link.href} aria-label={`Go to ${link.name} section`}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => setIsSnowing(!isSnowing)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-bright/50 transition-colors text-muted hover:text-foreground text-sm"
                  aria-label="Toggle snow effect"
                >
                  {isSnowing ? '❄️' : '☁️'}
                </button>
                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="px-3 py-1.5 rounded-md hover:bg-surface-bright/80 transition-colors text-foreground font-mono text-xs border border-border/50 bg-surface-lowest flex items-center gap-2"
                  aria-label="Open Terminal"
                >
                  <span className="text-accent font-bold">&gt;_</span> CLI
                </button>
                <div className="w-px h-5 bg-border/50 mx-1" />
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
              className="md:hidden absolute top-16 left-0 w-full bg-surface-lowest/95 backdrop-blur-lg border-b border-border/50 shadow-lg overflow-hidden"
            >
              <div className="px-6 py-6 pb-8 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="block text-base py-3 px-4 rounded-md font-medium text-muted hover:text-foreground hover:bg-surface-bright/50 transition-colors"
                        onClick={closeMenu}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 mt-2 flex flex-col gap-4 border-t border-border/50">
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-sm font-medium text-muted">Terminal</span>
                    <button
                      onClick={() => { setIsTerminalOpen(true); closeMenu(); }}
                      className="px-3 py-1.5 rounded-md bg-surface-bright text-foreground font-mono text-xs border border-border/50"
                    >
                      &gt;_ Open
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-sm font-medium text-muted">Snow Effect</span>
                    <button
                      onClick={() => setIsSnowing(!isSnowing)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-surface-bright border border-border/50 text-foreground transition-all"
                    >
                      {isSnowing ? '❄️' : '☁️'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-sm font-medium text-muted">Theme</span>
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
