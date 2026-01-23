import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cogniaai.com'
  const currentDate = new Date().toISOString()

  const mainPages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/solutions', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/demo', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/products/ai-receptionist', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/what-we-do', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/business-intelligence', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/solutions/chatbot', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/solutions/workflow-automation', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/solutions/custom-ai', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/company', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const industryPages = [
    { slug: 'healthcare', priority: 0.9 },
    { slug: 'hospitality', priority: 0.9 },
    { slug: 'automotive', priority: 0.9 },
    { slug: 'legal', priority: 0.9 },
    { slug: 'retail', priority: 0.9 },
    { slug: 'enterprise', priority: 0.9 },
    { slug: 'technology', priority: 0.9 },
    { slug: 'financial-services', priority: 0.9 },
    { slug: 'energy', priority: 0.85 },
    { slug: 'public-sector', priority: 0.85 },
    { slug: 'HomeServices', priority: 0.85 },
  ].map(industry => ({
    url: `/industries/${industry.slug}`,
    priority: industry.priority,
    changeFrequency: 'weekly' as const,
  }))

  const featurePages = [
    'NaturalConversations',
    'SmartScheduling',
    'CallHandling',
    'AnalyticsDashboard',
    'MultiLanguage',
    'CRMIntegration',
  ].map(feature => ({
    url: `/features/${feature}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }))

  const useCasePages = [
    { slug: 'CustomerSupport', priority: 0.85 },
    { slug: 'AfterHoursService', priority: 0.85 },
    { slug: 'ClientIntake', priority: 0.8 },
    { slug: 'LeadQualification', priority: 0.8 },
    { slug: 'OrderProcessing', priority: 0.8 },
    { slug: 'PatientScheduling', priority: 0.85 },
  ].map(useCase => ({
    url: `/usecases/${useCase.slug}`,
    priority: useCase.priority,
    changeFrequency: 'monthly' as const,
  }))

  const allPages = [
    ...mainPages,
    ...industryPages,
    ...featurePages,
    ...useCasePages,
  ]

  return allPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: {
        'en-US': `${baseUrl}${page.url}`,
        'tr-TR': `${baseUrl}${page.url}?lang=tr`,
        'x-default': `${baseUrl}${page.url}`,
      },
    },
  }))
}
