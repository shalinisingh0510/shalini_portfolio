import { useEffect } from "react"
import heroImage from "../../assets/images/shalini-kumari-alard-university.jpg"
import { pageMetaByPath, siteConfig } from "../../seo/siteConfig"

const upsertMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    el.setAttribute("data-seo-managed", "true")
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

const upsertCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "canonical")
    el.setAttribute("data-seo-managed", "true")
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

const upsertJsonLd = (id, payload) => {
  let el = document.head.querySelector(`script[data-seo-jsonld="${id}"]`)
  if (!el) {
    el = document.createElement("script")
    el.setAttribute("type", "application/ld+json")
    el.setAttribute("data-seo-jsonld", id)
    el.setAttribute("data-seo-managed", "true")
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(payload)
}

const normalizePath = (path) => {
  if (!path || path === "/") return "/"
  return path.endsWith("/") ? path.slice(0, -1) : path
}

const upsertPreloadImage = (href) => {
  let el = document.head.querySelector('link[rel="preload"][as="image"][data-seo-hero="true"]')
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "preload")
    el.setAttribute("as", "image")
    el.setAttribute("data-seo-hero", "true")
    el.setAttribute("data-seo-managed", "true")
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

const SeoHead = ({ currentPath }) => {
  useEffect(() => {
    const normalizedPath = normalizePath(currentPath)
    const pageMeta = pageMetaByPath[normalizedPath] || pageMetaByPath["/"]
    const pageTitle = pageMeta.title || pageMetaByPath["/"].title
    const description = pageMeta.description || siteConfig.description
    const canonicalUrl = normalizedPath === "/" ? `${siteConfig.siteUrl}/` : `${siteConfig.siteUrl}${normalizedPath}`
    const imageUrl = `${siteConfig.siteUrl}${siteConfig.image}`
    const fullTitle = normalizedPath === "/" ? pageMetaByPath["/"].title : `${pageTitle} | Shalini Kumari`

    document.title = fullTitle
    document.documentElement.lang = "en"

    upsertMeta("name", "description", description)
    upsertMeta("name", "keywords", siteConfig.keywords.join(", "))
    upsertMeta("name", "author", siteConfig.author)
    upsertMeta("name", "robots", "index, follow, max-image-preview:large")
    upsertMeta("name", "googlebot", "index, follow, max-image-preview:large")
    upsertMeta("name", "language", "English")
    upsertMeta("name", "theme-color", siteConfig.themeColor)

    upsertMeta("property", "og:type", "website")
    upsertMeta("property", "og:locale", siteConfig.locale)
    upsertMeta("property", "og:title", fullTitle)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", canonicalUrl)
    upsertMeta("property", "og:image", imageUrl)

    upsertMeta("name", "twitter:card", "summary_large_image")
    upsertMeta("name", "twitter:title", fullTitle)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:image", imageUrl)
    upsertMeta("name", "twitter:site", siteConfig.twitterHandle)

    upsertCanonical(canonicalUrl)
    upsertPreloadImage(heroImage)

    upsertJsonLd("website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Shalini Kumari Portfolio",
      url: `${siteConfig.siteUrl}/`,
      inLanguage: "en",
      publisher: {
        "@type": "Person",
        name: siteConfig.person.name,
      },
    })

    upsertJsonLd("person", {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.person.name,
      alternateName: siteConfig.person.alternateName,
      jobTitle: siteConfig.person.jobTitle,
      description: siteConfig.person.description,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: siteConfig.person.alumniOf,
      },
      knowsAbout: siteConfig.person.knowsAbout,
      nationality: siteConfig.person.nationality,
      gender: siteConfig.person.gender,
      sameAs: siteConfig.person.sameAs,
      url: `${siteConfig.siteUrl}/`,
      image: `${siteConfig.siteUrl}/shalini-kumari-alard-university.jpg`,
    })
  }, [currentPath])

  return null
}

export default SeoHead
