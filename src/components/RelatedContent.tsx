'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ArrowRight, Building2, Sparkles, Target } from 'lucide-react'

// Content relationships for internal linking
const contentRelationships = {
  // Industry to Feature mappings
  industryToFeatures: {
    healthcare: ['SmartScheduling', 'CallHandling', 'CRMIntegration'],
    hospitality: ['MultiLanguage', 'SmartScheduling', 'NaturalConversations'],
    automotive: ['SmartScheduling', 'CallHandling', 'AnalyticsDashboard'],
    legal: ['CallHandling', 'ClientIntake', 'CRMIntegration'],
    retail: ['MultiLanguage', 'CallHandling', 'AnalyticsDashboard'],
    enterprise: ['CRMIntegration', 'AnalyticsDashboard', 'MultiLanguage'],
    technology: ['CRMIntegration', 'AnalyticsDashboard', 'NaturalConversations'],
    'financial-services': ['CallHandling', 'CRMIntegration', 'AnalyticsDashboard'],
    energy: ['CallHandling', 'SmartScheduling', 'AnalyticsDashboard'],
    'public-sector': ['MultiLanguage', 'CallHandling', 'NaturalConversations'],
    HomeServices: ['SmartScheduling', 'CallHandling', 'LeadQualification']
  },
  // Industry to Use Case mappings
  industryToUseCases: {
    healthcare: ['PatientScheduling', 'AfterHoursService', 'CustomerSupport'],
    hospitality: ['CustomerSupport', 'AfterHoursService', 'OrderProcessing'],
    automotive: ['LeadQualification', 'CustomerSupport', 'AfterHoursService'],
    legal: ['ClientIntake', 'LeadQualification', 'AfterHoursService'],
    retail: ['OrderProcessing', 'CustomerSupport', 'LeadQualification'],
    enterprise: ['CustomerSupport', 'LeadQualification', 'ClientIntake'],
    technology: ['CustomerSupport', 'LeadQualification', 'AfterHoursService'],
    'financial-services': ['ClientIntake', 'CustomerSupport', 'LeadQualification'],
    energy: ['CustomerSupport', 'AfterHoursService', 'LeadQualification'],
    'public-sector': ['CustomerSupport', 'AfterHoursService', 'PatientScheduling'],
    HomeServices: ['LeadQualification', 'SmartScheduling', 'AfterHoursService']
  },
  // Feature to Use Case mappings
  featureToUseCases: {
    NaturalConversations: ['CustomerSupport', 'ClientIntake', 'LeadQualification'],
    SmartScheduling: ['PatientScheduling', 'LeadQualification', 'AfterHoursService'],
    CallHandling: ['AfterHoursService', 'CustomerSupport', 'OrderProcessing'],
    AnalyticsDashboard: ['CustomerSupport', 'LeadQualification', 'OrderProcessing'],
    MultiLanguage: ['CustomerSupport', 'OrderProcessing', 'ClientIntake'],
    CRMIntegration: ['LeadQualification', 'ClientIntake', 'CustomerSupport']
  },
  // Use Case to Industry mappings
  useCaseToIndustries: {
    CustomerSupport: ['retail', 'technology', 'enterprise'],
    AfterHoursService: ['healthcare', 'legal', 'hospitality'],
    ClientIntake: ['legal', 'financial-services', 'healthcare'],
    LeadQualification: ['automotive', 'HomeServices', 'enterprise'],
    OrderProcessing: ['retail', 'hospitality', 'enterprise'],
    PatientScheduling: ['healthcare', 'public-sector', 'enterprise']
  }
}

// Labels for display
const featureLabels: Record<string, string> = {
  NaturalConversations: 'Natural Conversations',
  SmartScheduling: 'Smart Scheduling',
  CallHandling: 'Call Handling',
  AnalyticsDashboard: 'Analytics Dashboard',
  MultiLanguage: 'Multi-Language Support',
  CRMIntegration: 'CRM Integration'
}

const useCaseLabels: Record<string, string> = {
  CustomerSupport: 'Customer Support',
  AfterHoursService: 'After Hours Service',
  ClientIntake: 'Client Intake',
  LeadQualification: 'Lead Qualification',
  OrderProcessing: 'Order Processing',
  PatientScheduling: 'Patient Scheduling'
}

const industryLabels: Record<string, string> = {
  healthcare: 'Healthcare',
  hospitality: 'Hospitality',
  automotive: 'Automotive',
  legal: 'Legal Services',
  retail: 'Retail',
  enterprise: 'Enterprise',
  technology: 'Technology',
  'financial-services': 'Financial Services',
  energy: 'Energy',
  'public-sector': 'Public Sector',
  HomeServices: 'Home Services'
}

interface RelatedContentProps {
  pageType: 'industry' | 'feature' | 'usecase'
  currentSlug: string
  className?: string
  maxItems?: number
}

export default function RelatedContent({
  pageType,
  currentSlug,
  className = '',
  maxItems = 3
}: RelatedContentProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  // Get related content based on page type
  let relatedFeatures: string[] = []
  let relatedUseCases: string[] = []
  let relatedIndustries: string[] = []

  if (pageType === 'industry') {
    relatedFeatures = contentRelationships.industryToFeatures[currentSlug as keyof typeof contentRelationships.industryToFeatures] || []
    relatedUseCases = contentRelationships.industryToUseCases[currentSlug as keyof typeof contentRelationships.industryToUseCases] || []
  } else if (pageType === 'feature') {
    relatedUseCases = contentRelationships.featureToUseCases[currentSlug as keyof typeof contentRelationships.featureToUseCases] || []
  } else if (pageType === 'usecase') {
    relatedIndustries = contentRelationships.useCaseToIndustries[currentSlug as keyof typeof contentRelationships.useCaseToIndustries] || []
  }

  const hasRelatedContent = relatedFeatures.length > 0 || relatedUseCases.length > 0 || relatedIndustries.length > 0

  if (!hasRelatedContent) return null

  return (
    <section className={`py-12 ${className}`} aria-labelledby="related-content-heading">
      <div className="container-responsive px-4 sm:px-6">
        <h2
          id="related-content-heading"
          className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          Related Solutions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Related Features */}
          {relatedFeatures.length > 0 && (
            <div
              className={`rounded-xl border p-6 ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Key Features
                </h3>
              </div>
              <ul className="space-y-3">
                {relatedFeatures.slice(0, maxItems).map((feature) => (
                  <li key={feature}>
                    <Link
                      href={`/features/${feature}`}
                      className={`flex items-center justify-between group ${
                        isDark
                          ? 'text-gray-300 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{featureLabels[feature] || feature}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Use Cases */}
          {relatedUseCases.length > 0 && (
            <div
              className={`rounded-xl border p-6 ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Common Use Cases
                </h3>
              </div>
              <ul className="space-y-3">
                {relatedUseCases.slice(0, maxItems).map((useCase) => (
                  <li key={useCase}>
                    <Link
                      href={`/usecases/${useCase}`}
                      className={`flex items-center justify-between group ${
                        isDark
                          ? 'text-gray-300 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{useCaseLabels[useCase] || useCase}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Industries */}
          {relatedIndustries.length > 0 && (
            <div
              className={`rounded-xl border p-6 ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Building2 className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Industries Using This
                </h3>
              </div>
              <ul className="space-y-3">
                {relatedIndustries.slice(0, maxItems).map((industry) => (
                  <li key={industry}>
                    <Link
                      href={`/industries/${industry}`}
                      className={`flex items-center justify-between group ${
                        isDark
                          ? 'text-gray-300 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{industryLabels[industry] || industry}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/solutions"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-[#162B4D] hover:bg-[#1e3a5f] text-white'
            }`}
          >
            Explore All Solutions
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Export content relationships for use elsewhere
export { contentRelationships, featureLabels, useCaseLabels, industryLabels }
