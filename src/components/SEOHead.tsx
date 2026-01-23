'use client'

import Script from 'next/script'
import { structuredDataTemplates, generateBreadcrumbs } from '@/src/config/seoConfig'

interface SEOHeadProps {
  pageType: 'home' | 'about' | 'contact' | 'solutions' | 'demo' | 'what-we-do' | 'business-intelligence' | 'company' | 'privacy' | 'ai-receptionist' | 'industry' | 'industries' | 'feature' | 'usecase'
  breadcrumbs?: string[]
  industryData?: {
    name: string
    description: string
    features: string[]
  }
  customSchemas?: unknown[]
}

export default function SEOHead({ pageType, breadcrumbs, industryData, customSchemas }: SEOHeadProps) {
  // Build the structured data array based on page type
  const structuredDataArray: unknown[] = []

  // Always include organization and website schema
  structuredDataArray.push(structuredDataTemplates.organization)
  structuredDataArray.push(structuredDataTemplates.webSite)

  // Add page-specific schemas
  switch (pageType) {
    case 'home':
      structuredDataArray.push(structuredDataTemplates.service)
      structuredDataArray.push(structuredDataTemplates.faqPage)
      structuredDataArray.push(structuredDataTemplates.howTo)
      // Add customer reviews for social proof
      if (structuredDataTemplates.customerReviews) {
        structuredDataArray.push(...structuredDataTemplates.customerReviews)
      }
      break
    case 'solutions':
      structuredDataArray.push(structuredDataTemplates.service)
      break
    case 'about':
      structuredDataArray.push(structuredDataTemplates.aboutPage)
      break
    case 'contact':
      structuredDataArray.push(structuredDataTemplates.contactPage)
      structuredDataArray.push(structuredDataTemplates.localBusinessTurkey)
      structuredDataArray.push(structuredDataTemplates.localBusinessUS)
      break
    case 'ai-receptionist':
      structuredDataArray.push(structuredDataTemplates.product)
      structuredDataArray.push(structuredDataTemplates.softwareApplication)
      break
    case 'demo':
      structuredDataArray.push(structuredDataTemplates.howTo)
      break
    case 'industry':
      if (industryData) {
        structuredDataArray.push(structuredDataTemplates.industryService(industryData))
      }
      break
    case 'industries':
      structuredDataArray.push(structuredDataTemplates.service)
      break
    default:
      break
  }

  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    structuredDataArray.push(generateBreadcrumbs(breadcrumbs))
  }

  // Add any custom schemas
  if (customSchemas) {
    structuredDataArray.push(...customSchemas)
  }

  return (
    <>
      {structuredDataArray.map((schema, index) => (
        <Script
          key={`structured-data-${index}`}
          id={`structured-data-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}

// Individual schema components for flexibility
export function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.organization),
      }}
    />
  )
}

export function WebsiteSchema() {
  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.webSite),
      }}
    />
  )
}

export function FAQSchema() {
  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.faqPage),
      }}
    />
  )
}

export function ProductSchema() {
  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.product),
      }}
    />
  )
}

export function ServiceSchema() {
  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.service),
      }}
    />
  )
}

export function LocalBusinessSchema() {
  return (
    <>
      <Script
        id="local-business-us-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataTemplates.localBusinessUS),
        }}
      />
      <Script
        id="local-business-tr-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataTemplates.localBusinessTurkey),
        }}
      />
    </>
  )
}

export function BreadcrumbSchema({ pathSegments }: { pathSegments: string[] }) {
  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateBreadcrumbs(pathSegments)),
      }}
    />
  )
}

export function HowToSchema() {
  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.howTo),
      }}
    />
  )
}

export function SoftwareApplicationSchema() {
  return (
    <Script
      id="software-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.softwareApplication),
      }}
    />
  )
}

// Industry-specific schema component
export function IndustryServiceSchema({ industry }: { industry: { name: string; description: string; features: string[] } }) {
  return (
    <Script
      id="industry-service-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.industryService(industry)),
      }}
    />
  )
}

// Custom FAQ Schema for specific pages
export function CustomFAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <Script
      id="custom-faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
