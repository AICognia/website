'use client'

import React from 'react'
import { FaFilter, FaChartLine, FaBullseye, FaUserCheck, FaClipboardCheck, FaShieldAlt } from 'react-icons/fa'
import ProductPageTemplate, { ProductPageData } from '../../components/templates/ProductPageTemplate'

const leadQualificationData: ProductPageData = {
  pageType: 'usecase',
  slug: 'lead-qualification',
  seoTitle: 'Lead Qualification - Screen and Route Prospects | Cognia',
  seoDescription: 'Automatically qualify leads, score prospects, and route qualified opportunities to your sales team. Focus your team\'s time on ready-to-buy customers.',

  badge: 'Use Case',
  badgeIcon: FaFilter,
  title: 'Lead Qualification',
  titleHighlight: 'Screen and Route Prospects',
  subtitle: 'Automatically qualify leads, score prospects, and route qualified opportunities to your sales team. Focus your team\'s time on ready-to-buy customers with intelligent AI-powered qualification.',

  heroStats: [
    { value: '85%', label: 'Time Saved' },
    { value: '3x', label: 'Conversion Rate' },
    { value: '24/7', label: 'Availability' },
  ],

  featuresTitle: 'Intelligent Lead Qualification',
  featuresSubtitle: 'Identify and prioritize your best prospects',
  features: [
    {
      icon: FaFilter,
      title: 'Automated Screening',
      description: 'Ask qualifying questions to assess budget, timeline, authority, and need (BANT framework).',
    },
    {
      icon: FaChartLine,
      title: 'Lead Scoring',
      description: 'Assign scores based on qualification criteria and route high-value leads to senior sales reps.',
    },
    {
      icon: FaBullseye,
      title: 'Intent Detection',
      description: 'Identify buying signals and urgency level through conversation analysis.',
    },
    {
      icon: FaUserCheck,
      title: 'Decision Maker Routing',
      description: 'Identify decision makers vs. researchers and route accordingly.',
    },
    {
      icon: FaClipboardCheck,
      title: 'Instant CRM Update',
      description: 'Log all qualification data directly to Salesforce, HubSpot, or your CRM.',
    },
    {
      icon: FaShieldAlt,
      title: 'Spam Filtering',
      description: 'Automatically filter out spam, solicitors, and unqualified prospects.',
    },
  ],

  processTitle: 'How Lead Qualification Works',
  processSubtitle: 'From initial contact to qualified opportunity',
  steps: [
    {
      step: '01',
      title: 'Lead Capture',
      description: 'Prospect calls or submits inquiry. AI immediately engages to begin qualification.',
    },
    {
      step: '02',
      title: 'Qualification Questions',
      description: 'AI asks targeted questions to assess budget, timeline, authority, and need.',
    },
    {
      step: '03',
      title: 'Scoring & Analysis',
      description: 'Lead is scored based on responses and behavior. Hot leads are flagged for immediate follow-up.',
    },
    {
      step: '04',
      title: 'Smart Routing',
      description: 'Qualified leads are routed to the right sales rep. All data synced to CRM automatically.',
    },
  ],

  benefitsTitle: 'Results for Sales Teams',
  benefitsSubtitle: 'More qualified leads, higher conversion rates',
  benefits: [
    { value: '3x', label: 'More Qualified Leads' },
    { value: '60%', label: 'Time Saved' },
    { value: '45%', label: 'Higher Conversion' },
    { value: '100%', label: 'Lead Capture' },
  ],

  integrations: {
    title: 'Perfect For',
    subtitle: 'Industries that need intelligent lead qualification',
    categories: [
      {
        title: 'B2B Sales',
        items: [
          'SaaS Companies',
          'Professional Services',
          'Manufacturing',
          'Technology',
          'Business Services',
          'Wholesale',
        ],
      },
      {
        title: 'High-Value B2C',
        items: [
          'Real Estate',
          'Financial Services',
          'Insurance',
          'Home Services',
          'Automotive',
          'Healthcare',
        ],
      },
    ],
  },

  ctaTitle: 'Ready to Qualify Leads Automatically?',
  ctaSubtitle: 'Focus your team on ready-to-buy prospects',
  ctaButtons: [
    { label: 'Schedule Demo', href: '/demo', primary: true },
    { label: 'CRM Integration', href: '/features/crm-integration' },
  ],
  ctaFeatures: ['Auto Qualification', 'Lead Scoring', 'Smart Routing', 'CRM Sync'],
}

const LeadQualification: React.FC = () => {
  return <ProductPageTemplate data={leadQualificationData} />
}

export default LeadQualification
