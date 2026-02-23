import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const siteUrl = (process.env.VITE_SITE_URL || "https://www.shalinikumari.in").replace(/\/$/, "")
const baseRoutes = ["/", "/about", "/skills", "/projects", "/resume", "/contact", "/blog"]
const nowIsoDate = new Date().toISOString().split("T")[0]

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.VITE_SUPABASE_ANON_KEY

async function generateSeoFiles() {
  let routes = [...baseRoutes]

  if (supabaseUrl && supabaseKey) {
    console.log("Fetching blog posts for sitemap...")
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("is_published", true)

    if (!error && posts) {
      const blogRoutes = posts.map((post) => `/blog/${post.slug}`)
      routes = [...routes, ...blogRoutes]
      console.log(`Added ${blogRoutes.length} blog posts to sitemap.`)
    } else {
      console.warn("Failed to fetch blog posts for sitemap:", error)
    }
  } else {
    console.warn("Supabase credentials missing. Blog posts will not be in sitemap.")
  }

  const toAbsoluteUrl = (route) => (route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
      .map((route) => {
        const priority = route === "/" ? "1.0" : route.startsWith("/blog/") ? "0.9" : "0.8"
        const changefreq = route === "/" ? "weekly" : route.startsWith("/blog/") ? "monthly" : "monthly"
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
}

generateSeoFiles().catch(console.error)
