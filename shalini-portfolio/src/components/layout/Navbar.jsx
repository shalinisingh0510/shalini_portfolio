import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll state for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on resize
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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen
          ? "bg-background/80 backdrop-blur-xl border-b border-border/70 shadow-[0_10px_30px_rgba(2,6,23,0.25)]"
          : "bg-transparent border-transparent"
        }`}
    >
      <nav aria-label="Primary navigation" className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="/" className="text-lg font-semibold tracking-wide flex-shrink-0 z-50" aria-label="Shalini Homepage" onClick={closeMenu}>
          Shalini<span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a className="nav-link hover:text-foreground transition" href={link.href} aria-label={`Go to ${link.name} section`}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent/10 text-foreground transition-colors z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-border/70 shadow-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="px-6 py-6 pb-8 flex flex-col gap-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <ul className="flex flex-col gap-4 text-center">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 + 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="block text-lg py-2 font-medium text-muted hover:text-foreground transition-colors border-b border-border/30 last:border-0"
                      onClick={closeMenu}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="pt-4 flex justify-center border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 text-sm font-medium text-muted">
                  <span>Theme:</span>
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
