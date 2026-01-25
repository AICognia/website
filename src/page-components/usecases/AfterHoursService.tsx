'use client'

import React from 'react'
import { FaClock, FaMoon, FaBell, FaCalendarAlt, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa'
import ProductPageTemplate, { ProductPageData } from '../../components/templates/ProductPageTemplate'

const afterHoursServiceData: ProductPageData = {
  pageType: 'usecase',
  slug: 'after-hours-service',
  seoTitle: 'After-Hours Service - Business Continuity 24/7 | Cognia',
  seoDescription: 'Never miss an opportunity or urgent call. Provide professional service outside business hours with intelligent AI that knows when to escalate emergencies.',

  badge: 'Use Case',
  badgeIcon: FaMoon,
  title: 'After-Hours Service',
  titleHighlight: 'Business Continuity 24/7',
  subtitle: 'Never miss an opportunity or urgent call. Provide professional service outside business hours with intelligent AI that knows when to escalate emergencies.',

  heroStats: [
    { value: '100%', label: 'Calls Answered' },
    { value: '24/7', label: 'Availability' },
    { value: '<2min', label: 'Emergency Response' },
  ],

  featuresTitle: 'Complete After-Hours Coverage',
  featuresSubtitle: 'Professional service when your office is closed',
  features: [
    {
      icon: FaMoon,
      title: 'Night & Weekend Coverage',
      description: 'Handle calls during evenings, weekends, and holidays without extra staffing. Your business never sleeps.',
    },
    {
      icon: FaExclamationTriangle,
      title: 'Emergency Detection',
      description: 'Identify urgent situations and immediately alert on-call staff via SMS, call, or email. Smart triage based on keywords and context.',
    },
    {
      icon: FaCalendarAlt,
      title: 'Next-Day Scheduling',
      description: 'Book appointments for next business day and send confirmation to customers. Fill your calendar even after hours.',
    },
    {
      icon: FaBell,
      title: 'Custom Escalation Rules',
      description: 'Define what constitutes an emergency and who to contact based on issue type, customer, or time of day.',
    },
    {
      icon: FaShieldAlt,
      title: 'Message Taking',
      description: 'Collect detailed messages and information for your team to review in the morning. Full context and caller details.',
    },
    {
      icon: FaClock,
      title: 'Time Zone Awareness',
      description: 'Automatically adjust for different time zones and business hour configurations. Global coverage made simple.',
    },
  ],

  processTitle: 'How After-Hours Service Works',
  processSubtitle: 'Seamless coverage from close of business to next morning',
  steps: [
    {
      step: '01',
      title: 'Business Hours End',
      description: 'When your office closes, AI seamlessly takes over call handling with after-hours messaging.',
    },
    {
      step: '02',
      title: 'Caller Engagement',
      description: 'AI answers professionally, identifies the caller\'s needs, and determines if it\'s an emergency.',
    },
    {
      step: '03',
      title: 'Smart Triage',
      description: 'Emergencies are escalated immediately. Non-urgent calls get messages taken or next-day appointments.',
    },
    {
      step: '04',
      title: 'Morning Summary',
      description: 'Your team receives a complete summary of all after-hours calls with transcripts and action items.',
    },
  ],

  benefitsTitle: 'Results for Service Businesses',
  benefitsSubtitle: 'Capture opportunities and handle emergencies 24/7',
  benefits: [
    { value: '100%', label: 'Calls Answered' },
    { value: '24/7', label: 'Availability' },
    { value: '<2min', label: 'Emergency Response' },
    { value: '$0', label: 'Overtime Costs' },
  ],

  integrations: {
    title: 'Perfect For',
    subtitle: 'Industries that need after-hours coverage',
    categories: [
      {
        title: 'Emergency Services',
        items: [
          'HVAC & Plumbing',
          'Property Management',
          'Healthcare & Medical',
          'Veterinary Clinics',
          'IT Support',
          'Security Services',
        ],
      },
      {
        title: 'Professional Services',
        items: [
          'Law Firms',
          'Accounting',
          'Real Estate',
          'Insurance Agencies',
          'Consulting Firms',
          'Financial Services',
        ],
      },
    ],
  },

  ctaTitle: 'Ready for 24/7 Coverage?',
  ctaSubtitle: 'Never miss an urgent call or opportunity',
  ctaButtons: [
    { label: 'Schedule Demo', href: '/demo', primary: true },
    { label: '24/7 Call Handling', href: '/features/CallHandling' },
  ],
  ctaFeatures: ['24/7 Coverage', 'Emergency Routing', 'No Overtime', 'Professional Service'],
}

const AfterHoursService: React.FC = () => {
  return <ProductPageTemplate data={afterHoursServiceData} />
}

export default AfterHoursService
