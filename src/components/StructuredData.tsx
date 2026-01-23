'use client'

import Script from 'next/script'

interface BreadcrumbItem {
  name: string
  url: string
}

interface FAQItem {
  question: string
  answer: string
}

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'LocalBusiness' | 'Service' | 'Product' | 'FAQPage' | 'BreadcrumbList' | 'AboutPage' | 'ContactPage'
  data?: Record<string, unknown>
  breadcrumbs?: BreadcrumbItem[]
  faqs?: FAQItem[]
}

const baseUrl = 'https://cogniaai.com'

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${baseUrl}/#organization`,
  name: 'Cognia AI',
  url: baseUrl,
  logo: `${baseUrl}/cognia-logo.png`,
  description: 'AI Receptionist and Voice Agent Solutions for businesses. Transform your customer experience with intelligent automation.',
  foundingDate: '2023',
  founder: {
    '@type': 'Person',
    name: 'Emre Benian',
    jobTitle: 'CEO & Founder'
  },
  address: [
    {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'Michigan',
      addressLocality: 'Grand Rapids'
    },
    {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressRegion: 'Istanbul',
      addressLocality: 'Istanbul'
    }
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-616-326-3328',
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: ['English']
    },
    {
      '@type': 'ContactPoint',
      telephone: '+90-531-773-9053',
      contactType: 'sales',
      areaServed: 'TR',
      availableLanguage: ['Turkish', 'English']
    }
  ],
  sameAs: [
    'https://www.linkedin.com/company/cogniaai',
    'https://www.instagram.com/cogniaai',
    'https://twitter.com/cognia_ai'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Voice Agents',
    'Chatbots',
    'Customer Service Automation',
    'Natural Language Processing',
    'Machine Learning'
  ]
}

// WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: 'Cognia AI',
  url: baseUrl,
  description: 'AI Receptionist and Voice Agent Solutions',
  publisher: {
    '@id': `${baseUrl}/#organization`
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
}

// Service Schema
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${baseUrl}/#service`,
  name: 'AI Voice Agent and Automation Solutions',
  description: 'Enterprise-grade AI solutions including voice agents, chatbots, and business automation.',
  provider: {
    '@id': `${baseUrl}/#organization`
  },
  areaServed: ['US', 'TR'],
  serviceType: 'AI Automation Services',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Receptionist',
          description: '24/7 AI-powered phone answering and appointment booking'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Chatbot Solutions',
          description: 'Intelligent chatbots for WhatsApp, Instagram, and web'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Automation',
          description: 'End-to-end workflow automation with AI'
        }
      }
    ]
  }
}

// LocalBusiness Schema
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}/#localbusiness`,
  name: 'Cognia AI',
  image: `${baseUrl}/cognia-logo.png`,
  url: baseUrl,
  telephone: '+1-616-326-3328',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'Michigan',
    addressLocality: 'Grand Rapids'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59'
  },
  priceRange: '$$'
}

// Generate BreadcrumbList Schema
function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  }
}

// Generate FAQPage Schema
function generateFAQSchema(faqs: FAQItem[]) {
  return {
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
}

// AboutPage Schema
const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${baseUrl}/about#webpage`,
  url: `${baseUrl}/about`,
  name: 'About Cognia AI',
  description: 'Learn about Cognia AI, your AI transformation partner. We bridge the gap between business operations and AI technology.',
  isPartOf: {
    '@id': `${baseUrl}/#website`
  },
  about: {
    '@id': `${baseUrl}/#organization`
  }
}

// ContactPage Schema
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${baseUrl}/contact#webpage`,
  url: `${baseUrl}/contact`,
  name: 'Contact Cognia AI',
  description: 'Get in touch with Cognia AI. Schedule a demo or consultation to explore AI solutions for your business.',
  isPartOf: {
    '@id': `${baseUrl}/#website`
  },
  mainEntity: {
    '@id': `${baseUrl}/#organization`
  }
}

export default function StructuredData({ type, data, breadcrumbs, faqs }: StructuredDataProps) {
  let schema: Record<string, unknown>

  switch (type) {
    case 'Organization':
      schema = { ...organizationSchema, ...data }
      break
    case 'WebSite':
      schema = { ...websiteSchema, ...data }
      break
    case 'LocalBusiness':
      schema = { ...localBusinessSchema, ...data }
      break
    case 'Service':
      schema = { ...serviceSchema, ...data }
      break
    case 'Product':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        ...data
      }
      break
    case 'FAQPage':
      schema = faqs ? generateFAQSchema(faqs) : { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [] }
      break
    case 'BreadcrumbList':
      schema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [] }
      break
    case 'AboutPage':
      schema = { ...aboutPageSchema, ...data }
      break
    case 'ContactPage':
      schema = { ...contactPageSchema, ...data }
      break
    default:
      schema = {}
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Combined schemas for homepage
export function HomePageStructuredData() {
  const homeFAQs = [
    {
      question: 'What is Cognia AI?',
      answer: 'Cognia AI provides AI-powered receptionist and voice agent solutions that handle phone calls, schedule appointments, and automate customer interactions 24/7.'
    },
    {
      question: 'How quickly can I set up the AI receptionist?',
      answer: 'Most businesses can be fully set up within 1 week. Our team handles the entire implementation process including integration with your existing systems.'
    },
    {
      question: 'What languages does Cognia AI support?',
      answer: 'Cognia AI supports over 45 languages with native fluency, enabling global customer communication without language barriers.'
    },
    {
      question: 'Is Cognia AI secure for healthcare?',
      answer: 'Yes, Cognia AI provides enterprise-grade security for healthcare applications with encrypted data transmission, secure storage, and comprehensive audit logging.'
    }
  ]

  return (
    <>
      <StructuredData type="Organization" />
      <StructuredData type="WebSite" />
      <StructuredData type="Service" />
      <StructuredData type="FAQPage" faqs={homeFAQs} />
    </>
  )
}

// Industry page structured data
export function IndustryPageStructuredData({
  industry,
  title,
  description,
  faqs
}: {
  industry: string
  title: string
  description: string
  faqs?: FAQItem[]
}) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Industries', url: '/solutions' },
    { name: title, url: `/industries/${industry}` }
  ]

  return (
    <>
      <StructuredData type="Organization" />
      <StructuredData type="BreadcrumbList" breadcrumbs={breadcrumbs} />
      <StructuredData
        type="Service"
        data={{
          name: `AI Solutions for ${title}`,
          description: description,
          serviceType: `${title} AI Automation`
        }}
      />
      {faqs && faqs.length > 0 && <StructuredData type="FAQPage" faqs={faqs} />}
    </>
  )
}

// Feature page structured data
export function FeaturePageStructuredData({
  feature,
  title,
  description
}: {
  feature: string
  title: string
  description: string
}) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Features', url: '/solutions' },
    { name: title, url: `/features/${feature}` }
  ]

  return (
    <>
      <StructuredData type="Organization" />
      <StructuredData type="BreadcrumbList" breadcrumbs={breadcrumbs} />
      <StructuredData
        type="Product"
        data={{
          name: title,
          description: description,
          brand: {
            '@type': 'Organization',
            name: 'Cognia AI'
          },
          category: 'AI Software Features'
        }}
      />
    </>
  )
}
