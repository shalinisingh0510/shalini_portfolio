const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Name */}
        <div className="text-lg font-semibold tracking-wide">
          Shalini<span className="text-accent">.</span>
        </div>

        {/* Navigation */}
       <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
  <li><a href="#about">About</a></li>
  <li><a href="#skills">Skills</a></li>
  <li><a href="#projects">Projects</a></li>
  <li><a href="#opensource">Open Source</a></li>
  <li><a href="#dsa">DSA</a></li>
  <li><a href="#resume">Resume</a></li>
  <li><a href="#contact">Contact</a></li>

</ul>


      </nav>
    </header>
  )
}

export default Navbar
