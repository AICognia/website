'use client'

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { seoConfig, PageSEO } from '../config/seoConfig';

interface SEOProps {
  page: keyof typeof seoConfig;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  customCanonical?: string;
  structuredData?: any[];
  noindex?: boolean;
  breadcrumbs?: Array<{ name: string, url: string }>;
}

const SEO: React.FC<SEOProps> = ({
  page,
  customTitle,
  customDescription,
  customKeywords,
  customCanonical,
  structuredData = [],
  noindex = false,
  breadcrumbs
}) => {
  const { language } = useLanguage();
  const pageConfig: PageSEO = seoConfig[page];

  const lang = language === 'tr' ? 'tr' : 'en';
  const title = customTitle || pageConfig.title[lang];
  const description = customDescription || pageConfig.description[lang];
  const keywords = customKeywords || pageConfig.keywords[lang];
  const canonical = customCanonical || `https://cogniaai.com${pageConfig.canonicalPath}`;
  const ogImage = pageConfig.ogImage || '/og-image.png';

  // Create breadcrumb structured data if provided
  const breadcrumbData = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://cogniaai.com${item.url}`
    }))
  } : null;

  // Combine all structured data
  const allStructuredData = [
    ...(pageConfig.structuredData ? [pageConfig.structuredData] : []),
    ...(breadcrumbData ? [breadcrumbData] : []),
    ...structuredData
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Language and Locale */}
      <html lang={lang} />
      <meta property="og:locale" content={lang === 'tr' ? 'tr_TR' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'tr' ? 'en_US' : 'tr_TR'} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://cogniaai.com${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Cognia AI" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://cogniaai.com${ogImage}`} />
      <meta name="twitter:creator" content="@cognia_ai" />
      <meta name="twitter:site" content="@cognia_ai" />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Additional SEO Tags */}
      <meta name="author" content="Cognia AI" />
      <meta name="publisher" content="Cognia AI" />
      <meta name="copyright" content="Cognia AI" />
      <meta name="application-name" content="Cognia AI" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Cognia AI" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#162B4D" />

      {/* Geo Tags */}
      <meta name="geo.region" content={lang === 'tr' ? 'TR' : 'US'} />
      <meta name="geo.placename" content={lang === 'tr' ? 'Turkey' : 'United States'} />

      {/* Verification Tags */}
      <meta name="google-site-verification" content="googlea9ba80c2320d77e2" />
      {/* <meta name="msvalidate.01" content="your-bing-verification-code" /> */}
      {/* <meta name="yandex-verification" content="your-yandex-verification-code" /> */}

      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Helmet>
  );
};

export default SEO;
