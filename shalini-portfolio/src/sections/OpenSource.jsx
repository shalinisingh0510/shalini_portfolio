import SectionHeader from "../components/common/SectionHeader"
import Card from "../components/ui/Card"
import AnimatedSection from "../components/common/AnimatedSection"
import { openSourceContributions } from "../data/opensource"

const OpenSource = () => {
  return (
    <section id="opensource" className="py-24">
      <AnimatedSection>
        <SectionHeader
          title="Open Source"
          subtitle="Collaborating, reviewing, and contributing to real-world codebases."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {openSourceContributions.map((item) => (
            <Card key={item.project} className="h-full">
              <h3 className="text-lg font-semibold">
                {item.project}
              </h3>

              <p className="mt-2 text-muted">
                {item.description}
              </p>

              <ul className="mt-4 list-disc list-inside text-sm text-muted space-y-1">
                {item.impact.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-accent hover:gap-3 transition"
              >
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-border/70 bg-foreground/5">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <span>View Contribution</span>
              </a>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}

export default OpenSource
