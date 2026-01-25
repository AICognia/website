'use client'

import React from 'react'
import { FaCog, FaDatabase, FaSync, FaPlug, FaServer, FaCloud } from 'react-icons/fa'
import ProductPageTemplate, { ProductPageData } from '../../components/templates/ProductPageTemplate'

const crmIntegrationData: ProductPageData = {
  pageType: 'feature',
  slug: 'crm-integration',
  seoTitle: 'CRM Integration - Connect Your Systems | Cognia',
  seoDescription: 'Seamlessly integrate with your existing CRM, ERP, and business systems. Automatically log calls, update records, and sync data in real-time.',

  badge: 'Feature',
  badgeIcon: FaPlug,
  title: 'CRM Integration',
  titleHighlight: 'Connect Your Systems',
  subtitle: 'Seamlessly integrate with your existing CRM, ERP, and business systems. Automatically log calls, update records, and sync data in real-time.',

  heroStats: [
    { value: '100%', label: 'Data Accuracy' },
    { value: '95%', label: 'Time Saved' },
    { value: 'Real-Time', label: 'Sync' },
  ],

  featuresTitle: 'Deep System Integration',
  featuresSubtitle: 'Connect AI to your entire tech stack',
  features: [
    {
      icon: FaSync,
      title: 'Real-Time Sync',
      description: 'Bi-directional data sync keeps all systems updated instantly without manual entry. Changes flow automatically between AI and your CRM.',
    },
    {
      icon: FaDatabase,
      title: 'Automatic Logging',
      description: 'Every call, appointment, and interaction is automatically logged with full details. Complete call transcripts, outcomes, and action items.',
    },
    {
      icon: FaPlug,
      title: 'Pre-Built Connectors',
      description: 'Ready-to-use integrations for Salesforce, HubSpot, Zoho, and 100+ platforms. Get connected in hours, not weeks.',
    },
    {
      icon: FaServer,
      title: 'Custom API',
      description: 'Flexible REST API for connecting custom systems and proprietary software. Full documentation and developer support.',
    },
    {
      icon: FaCloud,
      title: 'Cloud & On-Premise',
      description: 'Works with cloud-based SaaS and on-premise enterprise systems. Secure connections regardless of your infrastructure.',
    },
    {
      icon: FaCog,
      title: 'Workflow Automation',
      description: 'Trigger actions, update pipelines, and automate tasks based on call outcomes. Build powerful automated workflows.',
    },
  ],

  processTitle: 'How CRM Integration Works',
  processSubtitle: 'Seamless connection from call to record',
  steps: [
    {
      step: '01',
      title: 'Connect Your Systems',
      description: 'Use pre-built connectors or our API to connect your CRM, calendar, and other business tools.',
    },
    {
      step: '02',
      title: 'Configure Mappings',
      description: 'Map data fields between AI and your systems. Define what gets logged and where.',
    },
    {
      step: '03',
      title: 'Automatic Sync',
      description: 'Every call is logged, contacts are updated, and tasks are created automatically in real-time.',
    },
    {
      step: '04',
      title: 'Unified Reporting',
      description: 'See complete customer history and call data directly in your CRM. Full visibility across all touchpoints.',
    },
  ],

  benefitsTitle: 'Why Integration Matters',
  benefitsSubtitle: 'Eliminate manual data entry and silos',
  benefits: [
    { value: '100%', label: 'Data Accuracy' },
    { value: '95%', label: 'Time Saved', suffix: '↑' },
    { value: '0', label: 'Manual Entry' },
    { value: 'Real-Time', label: 'Sync' },
  ],

  integrations: {
    title: 'Supported Systems',
    subtitle: 'Integrate with popular platforms out of the box',
    categories: [
      {
        title: 'CRM Systems',
        items: [
          'Salesforce',
          'HubSpot',
          'Zoho CRM',
          'Microsoft Dynamics',
          'Pipedrive',
          'Monday.com',
        ],
      },
      {
        title: 'Business Tools',
        items: [
          'Google Workspace',
          'Microsoft 365',
          'Slack',
          'Zapier & Make',
          'Airtable',
          'Custom APIs',
        ],
      },
    ],
  },

  ctaTitle: 'Ready to Connect Your Systems?',
  ctaSubtitle: 'Integrate AI with your existing tools',
  ctaButtons: [
    { label: 'Schedule Demo', href: '/demo', primary: true },
    { label: 'View All Features', href: '/what-we-do' },
  ],
  ctaFeatures: ['500+ Integrations', 'Real-Time Sync', 'Easy Setup', 'Custom API'],
}

const CRMIntegration: React.FC = () => {
  return <ProductPageTemplate data={crmIntegrationData} />
}

export default CRMIntegration
