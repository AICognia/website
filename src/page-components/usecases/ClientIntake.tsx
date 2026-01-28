'use client'

import React from 'react'
import { FaUserTie, FaClipboardList, FaBalanceScale, FaFileContract, FaCalendarCheck, FaShieldAlt } from 'react-icons/fa'
import ProductPageTemplate, { ProductPageData } from '../../components/templates/ProductPageTemplate'

const clientIntakeData: ProductPageData = {
  pageType: 'usecase',
  slug: 'client-intake',
  seoTitle: 'Client Intake - Automated Client Onboarding | Cognia',
  seoDescription: 'Streamline client onboarding for law firms, consulting, and professional services. Collect information, screen prospects, and schedule consultations automatically.',

  badge: 'Use Case',
  badgeIcon: FaUserTie,
  title: 'Client Intake',
  titleHighlight: 'Automated Client Onboarding',
  subtitle: 'Streamline client onboarding for law firms, consulting, and professional services. Collect information, screen prospects, and schedule consultations automatically.',

  heroStats: [
    { value: '60%', label: 'More Leads' },
    { value: '24/7', label: 'Availability' },
    { value: '90%', label: 'Time Saved' },
  ],

  featuresTitle: 'Complete Client Intake Solution',
  featuresSubtitle: 'Automate the entire onboarding process',
  features: [
    {
      icon: FaClipboardList,
      title: 'Information Collection',
      description: 'Gather case details, contact information, and background through natural conversation.',
    },
    {
      icon: FaBalanceScale,
      title: 'Conflict Checking',
      description: 'Automatically check for conflicts of interest before scheduling consultations.',
    },
    {
      icon: FaShieldAlt,
      title: 'Qualification Screening',
      description: 'Pre-screen potential clients based on case type, jurisdiction, and fit criteria.',
    },
    {
      icon: FaFileContract,
      title: 'Document Collection',
      description: 'Request and track required documents and forms before first consultation.',
    },
    {
      icon: FaCalendarCheck,
      title: 'Consultation Scheduling',
      description: 'Book initial consultations with the right attorney based on practice area and availability.',
    },
    {
      icon: FaUserTie,
      title: 'CRM Integration',
      description: 'Sync all intake data to Clio, MyCase, or your case management system instantly.',
    },
  ],

  processTitle: 'How Client Intake Works',
  processSubtitle: 'Seamless automation from first contact to consultation',
  steps: [
    {
      step: '01',
      title: 'Initial Contact',
      description: 'Prospect calls or messages. AI greets them professionally and begins the intake process.',
    },
    {
      step: '02',
      title: 'Information Gathering',
      description: 'AI collects case details, contact info, and relevant background through natural conversation.',
    },
    {
      step: '03',
      title: 'Qualification & Screening',
      description: 'AI checks for conflicts, assesses case fit, and determines urgency level.',
    },
    {
      step: '04',
      title: 'Scheduling & Handoff',
      description: 'Qualified prospects are scheduled with the right attorney. All data synced to your CRM.',
    },
  ],

  benefitsTitle: 'Results for Professional Services',
  benefitsSubtitle: 'Faster intake, more qualified leads',
  benefits: [
    { value: '60%', label: 'More Leads Captured' },
    { value: '24/7', label: 'Intake Available' },
    { value: '90%', label: 'Admin Time Saved' },
    { value: '100%', label: 'Confidential' },
  ],

  integrations: {
    title: 'Perfect For',
    subtitle: 'Industries that need professional client intake',
    categories: [
      {
        title: 'Legal Services',
        items: [
          'Personal Injury Firms',
          'Family Law Practices',
          'Criminal Defense',
          'Estate Planning',
          'Immigration Law',
          'General Practice',
        ],
      },
      {
        title: 'Professional Services',
        items: [
          'Accounting Firms',
          'Financial Advisors',
          'Consulting Firms',
          'Healthcare Practices',
          'Real Estate Agencies',
          'Insurance Agencies',
        ],
      },
    ],
  },

  ctaTitle: 'Ready to Automate Client Intake?',
  ctaSubtitle: 'Capture more leads and save time',
  ctaButtons: [
    { label: 'Schedule Demo', href: '/demo', primary: true },
    { label: 'Legal Solutions', href: '/industries/legal' },
  ],
  ctaFeatures: ['Secure & Confidential', 'Conflict Checking', 'Auto Qualification', 'CRM Sync'],
}

const ClientIntake: React.FC = () => {
  return <ProductPageTemplate data={clientIntakeData} />
}

export default ClientIntake
