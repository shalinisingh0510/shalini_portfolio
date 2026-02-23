import { copyFileSync, existsSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"

const distDir = resolve(process.cwd(), "dist")
const indexHtml = resolve(distDir, "index.html")
const routes = ["about", "skills", "projects", "resume", "contact"]

if (!existsSync(indexHtml)) {
  console.error("dist/index.html not found. Run build before prerender.")
  process.exit(1)
}

for (const route of routes) {
  const routeDir = resolve(distDir, route)
  mkdirSync(routeDir, { recursive: true })
  copyFileSync(indexHtml, resolve(routeDir, "index.html"))
}

console.log(`Generated static route entries: ${routes.map((r) => `/${r}`).join(", ")}`)
