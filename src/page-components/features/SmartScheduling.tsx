'use client'

import React from 'react'
import { FaCalendarAlt, FaClock, FaBell, FaSync, FaUserClock, FaRobot } from 'react-icons/fa'
import ProductPageTemplate, { ProductPageData } from '../../components/templates/ProductPageTemplate'

const smartSchedulingData: ProductPageData = {
  pageType: 'feature',
  slug: 'smart-scheduling',
  seoTitle: 'Smart Scheduling - AI-Powered Appointment Booking | Cognia',
  seoDescription: 'Intelligent appointment booking that understands context, checks availability in real-time, and confirms appointments instantly through natural conversation.',

  badge: 'Feature',
  badgeIcon: FaCalendarAlt,
  title: 'Smart Scheduling',
  titleHighlight: 'AI-Powered Booking',
  subtitle: 'Intelligent appointment booking that understands context, checks availability in real-time, and confirms appointments instantly—all through natural conversation.',

  heroStats: [
    { value: '40%', label: 'Fewer No-Shows' },
    { value: '85%', label: 'Admin Time Saved' },
    { value: '24/7', label: 'Booking Available' },
  ],

  featuresTitle: 'Intelligent Appointment Management',
  featuresSubtitle: 'Automated scheduling that works like a human assistant',
  features: [
    {
      icon: FaCalendarAlt,
      title: 'Real-Time Availability',
      description: 'Check calendar in real-time and book available slots instantly during the conversation. Our AI syncs with your existing calendar systems to ensure accurate availability.',
    },
    {
      icon: FaRobot,
      title: 'Natural Language Booking',
      description: 'Customers can say "next Tuesday afternoon" and AI finds the perfect time slot. No rigid menus or complex IVR trees—just natural conversation.',
    },
    {
      icon: FaSync,
      title: 'Automatic Rescheduling',
      description: 'Handle cancellations and rescheduling requests without human intervention. The AI manages waitlists and fills cancelled slots automatically.',
    },
    {
      icon: FaBell,
      title: 'Smart Reminders',
      description: 'Automated SMS and email reminders sent before appointments to reduce no-shows. Customizable timing and messaging for your business.',
    },
    {
      icon: FaUserClock,
      title: 'Wait List Management',
      description: 'Automatically offer earlier slots when cancellations open up. Keep your calendar full and your customers happy.',
    },
    {
      icon: FaClock,
      title: 'Buffer Time Control',
      description: 'Intelligent spacing between appointments based on service type and duration. Prevent back-to-back bookings when you need prep time.',
    },
  ],

  processTitle: 'How Smart Scheduling Works',
  processSubtitle: 'From booking request to confirmed appointment in seconds',
  steps: [
    {
      step: '01',
      title: 'Customer Request',
      description: 'Customer calls or messages requesting an appointment. AI understands the request in natural language.',
    },
    {
      step: '02',
      title: 'Availability Check',
      description: 'AI checks your calendar in real-time, considering service duration, buffer times, and staff availability.',
    },
    {
      step: '03',
      title: 'Slot Confirmation',
      description: 'AI proposes available times, customer selects preferred slot, and appointment is instantly confirmed.',
    },
    {
      step: '04',
      title: 'Automated Follow-Up',
      description: 'Confirmation sent immediately, reminders scheduled, and appointment synced to all calendars.',
    },
  ],

  benefitsTitle: 'Why Choose Smart Scheduling',
  benefitsSubtitle: 'Measurable improvements for your business',
  benefits: [
    { value: '40%', label: 'Fewer No-Shows', suffix: '↓' },
    { value: '85%', label: 'Admin Time Saved', suffix: '↑' },
    { value: '24/7', label: 'Booking Available' },
    { value: '<30s', label: 'Booking Time' },
  ],

  integrations: {
    title: 'Works With Your Calendar',
    subtitle: 'Seamless integration with popular scheduling platforms',
    categories: [
      {
        title: 'Calendar Systems',
        items: [
          'Google Calendar & Google Workspace',
          'Microsoft Outlook & Office 365',
          'Apple Calendar & iCloud',
          'Custom calendar APIs',
        ],
      },
      {
        title: 'Booking Platforms',
        items: [
          'Calendly, Acuity Scheduling',
          'Square Appointments',
          'Industry-specific EMR/PMS systems',
          'Custom booking systems via API',
        ],
      },
    ],
  },

  ctaTitle: 'Ready to Automate Scheduling?',
  ctaSubtitle: 'Let AI handle your appointments while you focus on what matters',
  ctaButtons: [
    { label: 'Schedule Demo', href: '/demo', primary: true },
    { label: 'View All Features', href: '/what-we-do' },
  ],
  ctaFeatures: ['Real-Time Sync', 'Automatic Reminders', 'Easy Setup', 'No Manual Work'],
}

const SmartScheduling: React.FC = () => {
  return <ProductPageTemplate data={smartSchedulingData} />
}

export default SmartScheduling
