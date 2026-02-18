import { useEffect } from "react"
import heroImage from "../../assets/images/shalini-kumari-alard-university.jpg"
import { pageMetaByHash, siteConfig } from "../../seo/siteConfig"

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

const SeoHead = ({ currentHash }) => {
  useEffect(() => {
    const pageMeta = pageMetaByHash[currentHash] || {}
    const pageTitle = pageMeta.title || siteConfig.defaultTitle
    const description = pageMeta.description || siteConfig.description
    const canonicalUrl = `${siteConfig.siteUrl}${currentHash || "/"}`
    const imageUrl = `${siteConfig.siteUrl}${siteConfig.image}`
    const fullTitle = currentHash ? `${pageTitle} | Shalini Kumari` : siteConfig.defaultTitle

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

    upsertMeta("property", "twitter:card", "summary_large_image")
    upsertMeta("property", "twitter:title", fullTitle)
    upsertMeta("property", "twitter:description", description)
    upsertMeta("property", "twitter:image", imageUrl)

    upsertCanonical(canonicalUrl)
    upsertPreloadImage(heroImage)
  }, [currentHash])

  return null
}

export default SeoHead
