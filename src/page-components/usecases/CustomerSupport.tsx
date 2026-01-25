'use client'

import React from 'react'
import { FaHeadset, FaClock, FaUsers, FaComments, FaStar, FaQuestionCircle, FaTicketAlt, FaSmile } from 'react-icons/fa'
import ProductPageTemplate, { ProductPageData } from '../../components/templates/ProductPageTemplate'

const customerSupportData: ProductPageData = {
  pageType: 'usecase',
  slug: 'customer-support',
  seoTitle: 'Customer Support - Round-the-Clock Assistance | Cognia',
  seoDescription: 'Provide instant, consistent customer support 24/7. Handle common questions, troubleshoot issues, and escalate complex cases seamlessly.',

  badge: 'Use Case',
  badgeIcon: FaHeadset,
  title: 'Customer Support',
  titleHighlight: 'Round-the-Clock Assistance',
  subtitle: 'Provide instant, consistent customer support 24/7. Handle common questions, troubleshoot issues, and escalate complex cases seamlessly while reducing support costs by up to 60%.',

  heroStats: [
    { value: '60%', label: 'Cost Reduction' },
    { value: '24/7', label: 'Availability' },
    { value: '95%', label: 'CSAT Score' },
  ],

  featuresTitle: 'Complete Customer Support Solution',
  featuresSubtitle: 'AI-powered support that delights customers',
  features: [
    {
      icon: FaQuestionCircle,
      title: 'FAQ Handling',
      description: 'Answer common questions instantly with accurate, up-to-date information from your knowledge base. Consistent answers every time.',
    },
    {
      icon: FaTicketAlt,
      title: 'Ticket Creation',
      description: 'Automatically create support tickets for complex issues and track through resolution. Full context preserved.',
    },
    {
      icon: FaClock,
      title: '24/7 Availability',
      description: 'Provide support round the clock, including nights, weekends, and holidays. No waiting for business hours.',
    },
    {
      icon: FaUsers,
      title: 'Smart Escalation',
      description: 'Route complex or sensitive issues to human agents with full context and conversation history. Seamless handoff.',
    },
    {
      icon: FaSmile,
      title: 'Sentiment Analysis',
      description: 'Detect customer frustration and automatically escalate to preserve customer satisfaction. Proactive care.',
    },
    {
      icon: FaHeadset,
      title: 'Multi-Channel Support',
      description: 'Handle support via phone, web chat, SMS, and email from a single platform. Unified customer experience.',
    },
  ],

  processTitle: 'How Customer Support Works',
  processSubtitle: 'From customer inquiry to resolution',
  steps: [
    {
      step: '01',
      title: 'Customer Contact',
      description: 'Customer reaches out via phone, chat, or email. AI responds instantly with a personalized greeting.',
    },
    {
      step: '02',
      title: 'Issue Identification',
      description: 'AI understands the issue, searches knowledge base, and provides accurate answers or troubleshooting steps.',
    },
    {
      step: '03',
      title: 'Resolution or Escalation',
      description: 'Simple issues are resolved immediately. Complex cases are escalated to human agents with full context.',
    },
    {
      step: '04',
      title: 'Follow-Up & Feedback',
      description: 'AI sends follow-up to ensure satisfaction and collects feedback to improve future interactions.',
    },
  ],

  benefitsTitle: 'Results for Customer-Facing Businesses',
  benefitsSubtitle: 'Better support, happier customers',
  benefits: [
    { value: '90%', label: 'Issues Resolved' },
    { value: '<30s', label: 'Response Time' },
    { value: '24/7', label: 'Availability' },
    { value: '4.8/5', label: 'Customer Rating' },
  ],

  integrations: {
    title: 'Integrations & Channels',
    subtitle: 'Meet customers where they are',
    categories: [
      {
        title: 'Support Platforms',
        items: [
          'Zendesk',
          'Freshdesk',
          'Intercom',
          'HubSpot Service Hub',
          'Salesforce Service Cloud',
          'Help Scout',
        ],
      },
      {
        title: 'Communication Channels',
        items: [
          'Phone/Voice',
          'Web Chat',
          'SMS/Text',
          'Email',
          'WhatsApp',
          'Social Media DMs',
        ],
      },
    ],
  },

  ctaTitle: 'Ready for 24/7 Customer Support?',
  ctaSubtitle: 'Delight customers with instant assistance',
  ctaButtons: [
    { label: 'Schedule Demo', href: '/demo', primary: true },
    { label: 'Retail Solutions', href: '/industries/retail' },
  ],
  ctaFeatures: ['24/7 Support', 'Multi-Channel', 'Smart Escalation', 'Instant Answers'],
}

const CustomerSupport: React.FC = () => {
  return <ProductPageTemplate data={customerSupportData} />
}

export default CustomerSupport
