import GlassCard from "./GlassCard"

const Card = ({ children, className = "" }) => {
  return (
    <GlassCard className={`p-6 ${className}`}>
      {children}
    </GlassCard>
  )
}

export default Card
