import useTheme from "../../hooks/useTheme"

const ThemeToggle = () => {
  const { theme, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="
        group
        relative
        inline-flex
        items-center
        justify-center
        h-10
        w-10
        rounded-full
        border
        border-border/70
        bg-card/60
        backdrop-blur
        transition
        hover:border-border
        hover:shadow-soft
        focus:outline-none
        focus:ring-2
        focus:ring-ring/50
      "
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/15 to-highlight/10 opacity-0 transition group-hover:opacity-100" />

      {theme === "dark" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="relative z-10 h-5 w-5 text-foreground transition group-hover:scale-110"
          fill="currentColor"
        >
          <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="relative z-10 h-5 w-5 text-foreground transition group-hover:scale-110"
          fill="currentColor"
        >
          <path d="M12 6a6 6 0 1 0 6 6 6.01 6.01 0 0 0-6-6Zm0-4a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1ZM4.93 4.93a1 1 0 0 1 1.41 0l1.41 1.41a1 1 0 0 1-1.41 1.41L4.93 6.34a1 1 0 0 1 0-1.41Zm11.32 11.32a1 1 0 0 1 1.41 0l1.41 1.41a1 1 0 1 1-1.41 1.41l-1.41-1.41a1 1 0 0 1 0-1.41ZM2 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm16 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM4.93 19.07a1 1 0 0 1 0-1.41l1.41-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41 0Zm11.32-11.32a1 1 0 0 1 0-1.41l1.41-1.41a1 1 0 0 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41 0Z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
