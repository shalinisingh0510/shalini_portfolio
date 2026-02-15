import { siteConfig } from "../../seo/siteConfig"

const identityLinks = [
  { label: "GitHub", href: siteConfig.person.sameAs[0] },
  { label: "LinkedIn", href: siteConfig.person.sameAs[1] },
  { label: "LeetCode", href: siteConfig.person.sameAs[2] },
  { label: "Codeforces", href: siteConfig.person.sameAs[3] },
  { label: "Instagram", href: siteConfig.person.sameAs[4] },
]

const Footer = () => {
  return (
    <footer aria-label="Site footer" className="relative z-10 border-t border-border/70 bg-background/40 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          (c) {new Date().getFullYear()} Shalini Kumari. All rights reserved.
        </p>

        <nav aria-label="Identity links" className="flex flex-wrap gap-5 text-sm">
          {identityLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="text-muted hover:text-foreground transition"
              aria-label={`Open ${link.label} profile`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
