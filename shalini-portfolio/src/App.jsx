import Navbar from "./components/layout/Navbar"
import AuroraBackground from "./components/common/AuroraBackground"

import Hero from "./sections/Hero"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Projects from "./sections/Projects"
import OpenSource from "./sections/OpenSource"
import DSA from "./sections/DSA"
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
      <main className="max-w-6xl mx-auto px-6 pt-24">
        <Hero />
        <About />
        <Resume />
        <Skills />
        <Projects />

        {/* Subtle divider */}
        <div className="h-px w-full bg-white/10 my-24" />

        <OpenSource />
        <DSA />
        <Contact />
      </main>
    </div>
  )
}

export default App
