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
            <Card key={item.project}>
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
                className="inline-block mt-4 text-sm text-accent hover:underline"
              >
                View Contribution →
              </a>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}

export default OpenSource
