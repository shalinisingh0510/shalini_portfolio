import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-border/70 shadow-[0_10px_30px_rgba(2,6,23,0.25)]">
      <nav aria-label="Primary navigation" className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <div className="text-lg font-semibold tracking-wide">
          Shalini<span className="text-accent">.</span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
            <li>
              <a className="nav-link hover:text-foreground transition" href="/about" aria-label="Go to About section">About</a>
            </li>
            <li>
              <a className="nav-link hover:text-foreground transition" href="/skills" aria-label="Go to Skills section">Skills</a>
            </li>
            <li>
              <a className="nav-link hover:text-foreground transition" href="/projects" aria-label="Go to Projects section">Projects</a>
            </li>
            <li>
              <a className="nav-link hover:text-foreground transition" href="/resume" aria-label="Go to Resume section">Resume</a>
            </li>
            <li>
              <a className="nav-link hover:text-foreground transition" href="/contact" aria-label="Go to Contact section">Contact</a>
            </li>
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
