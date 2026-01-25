'use client'

import React from 'react'
import { FaPhone, FaClock, FaBell, FaHeadset, FaChartLine, FaShieldAlt, FaRobot } from 'react-icons/fa'
import ProductPageTemplate, { ProductPageData } from '../../components/templates/ProductPageTemplate'

const callHandlingData: ProductPageData = {
  pageType: 'feature',
  slug: 'call-handling',
  seoTitle: '24/7 Call Handling - Never Miss a Call | Cognia',
  seoDescription: 'Intelligent AI receptionists that answer every call, day or night. Ensure your business is always available to customers with round-the-clock call handling.',

  badge: 'Feature',
  badgeIcon: FaPhone,
  title: '24/7 Call Handling',
  titleHighlight: 'Never Miss a Call',
  subtitle: 'Intelligent AI receptionists that answer every call, day or night. Ensure your business is always available to customers with round-the-clock call handling.',

  heroStats: [
    { value: '0%', label: 'Missed Calls' },
    { value: '24/7', label: 'Availability' },
    { value: '<2s', label: 'Response Time' },
  ],

  featuresTitle: 'Always-On Call Management',
  featuresSubtitle: 'Professional call handling that never sleeps',
  features: [
    {
      icon: FaClock,
      title: 'True 24/7 Availability',
      description: 'Handle calls at any hour, including nights, weekends, and holidays without extra staffing costs. Your business is always open.',
    },
    {
      icon: FaRobot,
      title: 'Instant Response',
      description: 'Answer calls in under 2 seconds with no hold times or waiting queues. Every caller gets immediate attention.',
    },
    {
      icon: FaBell,
      title: 'Overflow Protection',
      description: 'Handle unlimited simultaneous calls during peak hours and busy periods. Never lose a customer to a busy signal.',
    },
    {
      icon: FaHeadset,
      title: 'Professional Greeting',
      description: 'Customized greetings and messaging that match your brand voice. Callers experience a seamless extension of your team.',
    },
    {
      icon: FaShieldAlt,
      title: 'Call Screening',
      description: 'Filter spam, qualify leads, and route urgent calls to the right team member. Protect your time while maximizing opportunities.',
    },
    {
      icon: FaChartLine,
      title: 'Call Analytics',
      description: 'Track call volume, peak hours, common questions, and conversation outcomes. Make data-driven decisions about your operations.',
    },
  ],

  processTitle: 'How 24/7 Call Handling Works',
  processSubtitle: 'Seamless automation from first ring to resolution',
  steps: [
    {
      step: '01',
      title: 'Incoming Call',
      description: 'Customer calls your business number at any time of day or night. AI receptionist answers instantly.',
    },
    {
      step: '02',
      title: 'Intelligent Conversation',
      description: 'Natural language AI engages with the caller, understands their needs, and asks relevant questions.',
    },
    {
      step: '03',
      title: 'Action & Routing',
      description: 'Based on the conversation, AI takes action: books appointments, answers FAQs, or routes to human staff.',
    },
    {
      step: '04',
      title: 'Follow-Up & Analytics',
      description: 'Automated follow-up messages sent, call logged with full transcript, and insights generated.',
    },
  ],

  benefitsTitle: 'Why Choose 24/7 Call Handling',
  benefitsSubtitle: 'Transform your customer experience and business operations',
  benefits: [
    { value: '0%', label: 'Missed Calls' },
    { value: '24/7', label: 'Availability' },
    { value: '90%', label: 'Cost Reduction', suffix: '↓' },
    { value: '<2s', label: 'Response Time' },
  ],

  integrations: {
    title: 'Perfect For',
    subtitle: 'Industries that benefit from 24/7 call handling',
    categories: [
      {
        title: 'Service Businesses',
        items: [
          'Emergency services and on-call support',
          'Healthcare and medical practices',
          'Property management and maintenance',
          'Automotive and roadside assistance',
        ],
      },
      {
        title: 'Customer-Facing Businesses',
        items: [
          'E-commerce and online retailers',
          'Hospitality and hotels',
          'Financial services and banking',
          'Professional services and consulting',
        ],
      },
    ],
  },

  ctaTitle: 'Ready for 24/7 Availability?',
  ctaSubtitle: 'Never miss another customer call',
  ctaButtons: [
    { label: 'Schedule Demo', href: '/demo', primary: true },
    { label: 'View All Features', href: '/what-we-do' },
  ],
  ctaFeatures: ['24/7 Availability', 'Unlimited Calls', 'Instant Setup', 'No Extra Costs'],
}

const CallHandling: React.FC = () => {
  return <ProductPageTemplate data={callHandlingData} />
}

export default CallHandling
