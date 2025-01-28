import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
}

export default function SEO({ title, description, keywords, ogImage }: SEOProps) {
  const siteTitle = "Telegram Forum"
  const fullTitle = `${title} | ${siteTitle}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
