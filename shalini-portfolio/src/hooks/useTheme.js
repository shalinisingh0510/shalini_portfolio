import { useEffect, useState } from "react"

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark"
  const stored = window.localStorage.getItem("theme")
  if (stored === "light" || stored === "dark") return stored
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove both classes first
    root.classList.remove("dark", "light")
    
    // Add the appropriate class
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.add("light")
    }
    
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return { theme, setTheme, toggle }
}

export default useTheme
