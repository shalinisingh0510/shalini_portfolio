const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-14">
      <h2 className="text-h2 font-semibold tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-muted text-body max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
