import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const siteUrl = (process.env.VITE_SITE_URL || "https://www.shalinikumari.in").replace(/\/$/, "")
const routes = ["/", "/about", "/skills", "/projects", "/resume", "/contact"]
const nowIsoDate = new Date().toISOString().split("T")[0]

const toAbsoluteUrl = (route) => (route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const priority = route === "/" ? "1.0" : "0.8"
    const changefreq = route === "/" ? "weekly" : "monthly"
    return `  <url>
    <loc>${toAbsoluteUrl(route)}</loc>
    <lastmod>${nowIsoDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join("\n")}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

const publicDir = resolve(process.cwd(), "public")
mkdirSync(publicDir, { recursive: true })
writeFileSync(resolve(publicDir, "sitemap.xml"), sitemap, "utf8")
writeFileSync(resolve(publicDir, "robots.txt"), robots, "utf8")

console.log("Generated public/sitemap.xml and public/robots.txt")
