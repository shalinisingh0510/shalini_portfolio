import { Suspense, lazy, useEffect, useState } from "react"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import AuroraBackground from "./components/common/AuroraBackground"
import SeoHead from "./components/seo/SeoHead"

import Hero from "./sections/Hero"
const About = lazy(() => import("./sections/About"))
const Skills = lazy(() => import("./sections/Skills"))
const Projects = lazy(() => import("./sections/Projects"))
const Contact = lazy(() => import("./sections/Contact"))
const Resume = lazy(() => import("./sections/Resume"))

const sectionByPath = {
  "/about": "about",
  "/skills": "skills",
  "/projects": "projects",
  "/resume": "resume",
  "/contact": "contact",
}

const normalizePath = (path) => {
  if (!path) return "/"
  const clean = path.trim()
  if (!clean || clean === "/") return "/"
  return clean.endsWith("/") ? clean.slice(0, -1) : clean
}

function App() {
  const [currentPath, setCurrentPath] = useState(normalizePath(window.location.pathname))

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(normalizePath(window.location.pathname))
    }

    window.addEventListener("popstate", handleLocationChange)
    return () => window.removeEventListener("popstate", handleLocationChange)
  }, [])

  useEffect(() => {
    const sectionId = sectionByPath[currentPath]
    if (!sectionId) return

    let tries = 0
    const maxTries = 45

    const scrollToTarget = () => {
      const target = document.getElementById(sectionId)
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "auto" })
        return
      }
      tries += 1
      if (tries < maxTries) requestAnimationFrame(scrollToTarget)
    }

    scrollToTarget()
  }, [currentPath])

  useEffect(() => {
    const hashId = window.location.hash?.replace("#", "")
    if (!hashId) return
    const target = document.getElementById(hashId)
    if (target) target.scrollIntoView({ block: "start", behavior: "auto" })
  }, [])

  return (
    <div className="relative min-h-screen w-full">
      <SeoHead currentPath={currentPath} />

      {/* Global animated background */}
      <AuroraBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content" aria-label="Portfolio content" className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-24 page-3d">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Resume />
          <Skills />
          <Projects />
        </Suspense>

        {/* Subtle divider */}
        <div className="h-px w-full bg-border/70 my-24" />

        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
