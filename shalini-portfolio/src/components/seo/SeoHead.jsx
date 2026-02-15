import { Helmet } from "react-helmet-async"
import { useMemo } from "react"
import heroImage from "../../assets/images/profile.jpg"
import { pageMetaByHash, siteConfig } from "../../seo/siteConfig"

const SeoHead = ({ currentHash }) => {
  const pageMeta = pageMetaByHash[currentHash] || {}
  const pageTitle = pageMeta.title || siteConfig.defaultTitle
  const description = pageMeta.description || siteConfig.description
  const canonicalUrl = `${siteConfig.siteUrl}/${currentHash || ""}`
  const imageUrl = `${siteConfig.siteUrl}${siteConfig.image}`

  const personSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.person.name,
      alternateName: siteConfig.person.alternateName,
      jobTitle: siteConfig.person.jobTitle,
      description: siteConfig.person.description,
      url: siteConfig.siteUrl,
      image: imageUrl,
      sameAs: siteConfig.person.sameAs,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: siteConfig.person.alumniOf,
      },
      knowsAbout: siteConfig.person.knowsAbout,
      nationality: siteConfig.person.nationality,
      gender: siteConfig.person.gender,
    }),
    [imageUrl],
  )

  return (
    <Helmet
      title={pageTitle}
      titleTemplate={siteConfig.titleTemplate}
      prioritizeSeoTags
    >
      <html lang="en" />
      <meta name="description" content={description} />
      <meta name="keywords" content={siteConfig.keywords.join(", ")} />
      <meta name="author" content={siteConfig.author} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="theme-color" content={siteConfig.themeColor} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  )
}

export default SeoHead
