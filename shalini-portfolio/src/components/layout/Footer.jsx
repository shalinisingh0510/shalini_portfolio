import { siteConfig } from "../../seo/siteConfig"

const identityLinks = [
  { label: "GitHub", href: siteConfig.person.sameAs[0] },
  { label: "LinkedIn", href: siteConfig.person.sameAs[1] },
  { label: "LeetCode", href: siteConfig.person.sameAs[2] },
  { label: "Codeforces", href: siteConfig.person.sameAs[3] },
  { label: "Instagram", href: siteConfig.person.sameAs[4] },
]

const internalLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
]

const Footer = () => {
  return (
    <footer aria-label="Site footer" className="relative z-10 pt-20 pb-8 overflow-hidden bg-[#0a0f18]">
      {/* Footer Aurora Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#818cf8]/5 blur-[120px] rounded-fluid pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="p-[1px] rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent">
          <div className="glass !bg-[#111827]/80 backdrop-blur-3xl rounded-[3rem] px-8 py-12 md:px-14 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="space-y-6 max-w-sm">
              <a href="/" className="text-2xl font-black tracking-widest uppercase text-white">SHA<span className="text-[#818cf8] drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]">.</span></a>
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Engineering intricate logic blocks, designing visually immersive scalable systems, and maintaining aesthetic perfection.
              </p>
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Shalini Kumari.
              </p>
            </div>

            <div className="flex flex-col gap-8 md:items-end">
              <nav aria-label="Internal links" className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end text-sm font-semibold">
                {internalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-white/60 hover:text-[#38bdf8] hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all"
                    aria-label={`Go to ${link.label} page`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <nav aria-label="Identity links" className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end text-sm font-semibold">
                {identityLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="text-white/60 hover:text-[#38bdf8] hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all"
                    aria-label={`Open ${link.label} profile`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
