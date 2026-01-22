const Button = ({ children, variant = "primary", as = "button", ...props }) => {
  const Component = as

  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium transition"

  const styles = {
    primary: "bg-accent text-white hover:opacity-90",
    outline: "border border-white/20 hover:border-white/40",
  }

  return (
    <Component
      className={`${base} ${styles[variant]}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
