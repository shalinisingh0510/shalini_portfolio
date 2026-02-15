import { useEffect, useState } from "react"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import AuroraBackground from "./components/common/AuroraBackground"
import SeoHead from "./components/seo/SeoHead"

import Hero from "./sections/Hero"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Projects from "./sections/Projects"
import Contact from "./sections/Contact"
import Resume from "./sections/Resume"


function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <div className="relative min-h-screen w-full">
      <SeoHead currentHash={currentHash} />

      {/* Global animated background */}
      <AuroraBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content" aria-label="Portfolio content" className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-24 page-3d">
        <Hero />
        <About />
        <Resume />
        <Skills />
        <Projects />

        {/* Subtle divider */}
        <div className="h-px w-full bg-border/70 my-24" />

        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
