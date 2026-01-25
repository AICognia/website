'use client'

import React from 'react'
import { FaUserMd, FaCalendarAlt, FaBell, FaClock, FaNotesMedical, FaHospital, FaShieldAlt } from 'react-icons/fa'
import ProductPageTemplate, { ProductPageData } from '../../components/templates/ProductPageTemplate'

const patientSchedulingData: ProductPageData = {
  pageType: 'usecase',
  slug: 'patient-scheduling',
  seoTitle: 'Patient Scheduling - Medical Appointment Management | Cognia',
  seoDescription: 'Secure AI for healthcare practices. Automate patient appointment booking, reminders, and rescheduling while maintaining full HIPAA compliance.',

  badge: 'Use Case',
  badgeIcon: FaShieldAlt,
  title: 'Patient Scheduling',
  titleHighlight: 'Medical Appointment Management',
  subtitle: 'Secure AI for healthcare practices. Automate patient appointment booking, reminders, and rescheduling while maintaining full security and reducing no-shows by up to 80%.',

  heroStats: [
    { value: '80%', label: 'Fewer No-Shows' },
    { value: '24/7', label: 'Booking Access' },
    { value: '100%', label: 'Secure' },
  ],

  featuresTitle: 'Complete Patient Scheduling Solution',
  featuresSubtitle: 'Everything you need for medical appointment management',
  features: [
    {
      icon: FaCalendarAlt,
      title: 'Appointment Booking',
      description: 'Book new patient and follow-up appointments 24/7 with real-time availability checking. Patients can schedule anytime, anywhere.',
    },
    {
      icon: FaBell,
      title: 'Automated Reminders',
      description: 'Send SMS and email reminders 24-48 hours before appointments to reduce no-shows by 40%. Customizable timing and messaging.',
    },
    {
      icon: FaClock,
      title: 'Rescheduling',
      description: 'Handle patient cancellations and reschedules automatically without staff intervention. Fill cancelled slots from waitlist.',
    },
    {
      icon: FaNotesMedical,
      title: 'EMR Integration',
      description: 'Sync appointments directly with Epic, Cerner, Athenahealth, and other EMR systems. Full bi-directional data flow.',
    },
    {
      icon: FaUserMd,
      title: 'Provider Routing',
      description: 'Route patients to specific doctors based on specialty, availability, and patient history. Intelligent provider matching.',
    },
    {
      icon: FaHospital,
      title: 'Insurance Verification',
      description: 'Collect and verify insurance information during the scheduling call. Reduce front-desk workload and claim denials.',
    },
  ],

  processTitle: 'How Patient Scheduling Works',
  processSubtitle: 'Streamlined booking from call to confirmation',
  steps: [
    {
      step: '01',
      title: 'Patient Calls',
      description: 'Patient calls to book an appointment. AI greets them professionally and asks about their needs.',
    },
    {
      step: '02',
      title: 'Availability Check',
      description: 'AI checks EMR/PMS for doctor availability, considering appointment type and duration.',
    },
    {
      step: '03',
      title: 'Information Collection',
      description: 'Collects patient details, insurance info, reason for visit, and any special requirements.',
    },
    {
      step: '04',
      title: 'Confirmation & Reminders',
      description: 'Confirms appointment, syncs to EMR, sends confirmation, and schedules automated reminders.',
    },
  ],

  benefitsTitle: 'Results for Medical Practices',
  benefitsSubtitle: 'Proven improvements in efficiency and patient satisfaction',
  benefits: [
    { value: '40%', label: 'Fewer No-Shows' },
    { value: '24/7', label: 'Booking Available' },
    { value: '85%', label: 'Staff Time Saved' },
    { value: '100%', label: 'Secure' },
  ],

  integrations: {
    title: 'EMR & Practice Management',
    subtitle: 'Seamless integration with healthcare systems',
    categories: [
      {
        title: 'EMR Systems',
        items: [
          'Epic',
          'Cerner',
          'Athenahealth',
          'eClinicalWorks',
          'NextGen',
          'DrChrono',
        ],
      },
      {
        title: 'Practice Management',
        items: [
          'Dentrix (Dental)',
          'Open Dental',
          'ChiroTouch (Chiropractic)',
          'Mindbody (Wellness)',
          'Custom systems via API',
          'HL7/FHIR protocols',
        ],
      },
    ],
  },

  ctaTitle: 'Ready to Automate Patient Scheduling?',
  ctaSubtitle: 'Join hundreds of medical practices using Cognia AI',
  ctaButtons: [
    { label: 'Schedule Demo', href: '/demo', primary: true },
    { label: 'Healthcare Solutions', href: '/industries/healthcare' },
  ],
  ctaFeatures: ['Enterprise Security', 'EMR Integration', 'Auto Reminders', '24/7 Booking'],
}

const PatientScheduling: React.FC = () => {
  return <ProductPageTemplate data={patientSchedulingData} />
}

export default PatientScheduling
