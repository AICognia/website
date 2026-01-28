'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrentPage?: boolean
}

// Map route segments to human-readable labels
const segmentLabels: Record<string, string> = {
  // Main sections
  industries: 'Industries',
  features: 'Features',
  usecases: 'Use Cases',
  products: 'Products',
  solutions: 'Solutions',
  about: 'About',
  contact: 'Contact',
  demo: 'Demo',
  company: 'Company',
  'what-we-do': 'What We Do',
  'business-intelligence': 'Business Intelligence',
  'privacy-policy': 'Privacy Policy',

  // Industries
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
  HomeServices: 'Home Services',

  // Features
  NaturalConversations: 'Natural Conversations',
  SmartScheduling: 'Smart Scheduling',
  CallHandling: 'Call Handling',
  AnalyticsDashboard: 'Analytics Dashboard',
  MultiLanguage: 'Multi-Language Support',
  CRMIntegration: 'CRM Integration',

  // Use Cases
  CustomerSupport: 'Customer Support',
  AfterHoursService: 'After Hours Service',
  ClientIntake: 'Client Intake',
  LeadQualification: 'Lead Qualification',
  OrderProcessing: 'Order Processing',
  PatientScheduling: 'Patient Scheduling',

  // Products
  'ai-receptionist': 'AI Receptionist',
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ]

  let currentPath = ''

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLastSegment = index === segments.length - 1

    const label = segmentLabels[segment] || segment
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()

    breadcrumbs.push({
      label,
      href: currentPath,
      isCurrentPage: isLastSegment
    })
  })

  return breadcrumbs
}

interface BreadcrumbsProps {
  className?: string
  showHomeIcon?: boolean
  maxItems?: number
}

export default function Breadcrumbs({
  className = '',
  showHomeIcon = true,
  maxItems = 4
}: BreadcrumbsProps) {
  // Breadcrumbs disabled - return null for all pages
  return null

  const pathname = usePathname()

  // Don't show breadcrumbs on home page
  if (pathname === '/') return null

  const allBreadcrumbs = generateBreadcrumbs(pathname)

  // If we have too many items, collapse middle ones
  let displayBreadcrumbs = allBreadcrumbs
  if (allBreadcrumbs.length > maxItems) {
    displayBreadcrumbs = [
      allBreadcrumbs[0],
      { label: '...', href: '', isCurrentPage: false },
      ...allBreadcrumbs.slice(-2)
    ]
  }

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={`hidden lg:block py-3 ${className}`}
    >
      <ol
        className="flex items-center flex-wrap gap-1 text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {displayBreadcrumbs.map((item, index) => {
          const isLast = index === displayBreadcrumbs.length - 1
          const position = index + 1

          return (
            <li
              key={item.href || index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight
                  className="w-4 h-4 mx-1 flex-shrink-0 text-slate-400 dark:text-gray-500"
                  aria-hidden="true"
                />
              )}

              {item.label === '...' ? (
                <span
                  className="px-1 text-slate-400 dark:text-gray-500"
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : isLast ? (
                <span
                  className="font-medium text-slate-900 dark:text-gray-200"
                  aria-current="page"
                  itemProp="name"
                >
                  {index === 0 && showHomeIcon ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:underline underline-offset-4 transition-colors text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200"
                  itemProp="item"
                >
                  {index === 0 && showHomeIcon ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    <span itemProp="name">{item.label}</span>
                  )}
                </Link>
              )}

              <meta itemProp="position" content={String(position)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Compact version for use in page headers
export function CompactBreadcrumbs({ className = '' }: { className?: string }) {
  return (
    <Breadcrumbs
      className={`text-xs ${className}`}
      showHomeIcon={true}
      maxItems={3}
    />
  )
}
