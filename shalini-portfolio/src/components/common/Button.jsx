const Button = ({ children, variant = "primary", as = "button", className = "", ...props }) => {
  const Component = as

  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:opacity-60 disabled:cursor-not-allowed"

  const styles = {
    primary:
      "bg-gradient-to-r from-accent to-highlight text-white shadow-glow hover:opacity-95 hover:-translate-y-0.5",
    outline:
      "border border-border/80 text-foreground hover:border-border hover:bg-foreground/5",
  }

  return (
    <Component
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
