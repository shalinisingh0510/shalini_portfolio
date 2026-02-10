import Navbar from "./components/layout/Navbar"
import AuroraBackground from "./components/common/AuroraBackground"

import Hero from "./sections/Hero"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Projects from "./sections/Projects"
import Contact from "./sections/Contact"
import Resume from "./sections/Resume"


function App() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Global animated background */}
      <AuroraBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-24 page-3d">
        <Hero />
        <About />
        <Resume />
        <Skills />
        <Projects />

        {/* Subtle divider */}
        <div className="h-px w-full bg-border/70 my-24" />

        <Contact />
      </main>
    </div>
  )
}

export default App
