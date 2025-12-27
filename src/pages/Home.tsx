import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaCheckCircle, FaRocket, FaShieldAlt, FaClock, FaChartLine, FaUsers, FaHeadset, FaCalendarAlt, FaHospital, FaHotel, FaPlug, FaSync, FaCloud, FaDatabase, FaBuilding, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';
import ScrollProgress from '../components/ScrollProgress';
import OptimizedHero from '../components/OptimizedHero';
import MobileHeroRedesigned from '../components/MobileHeroRedesigned';
import FeaturesSection from '../components/FeaturesSection';
import SolutionsGrid from '../components/SolutionsGrid';
import DemoSection from '../components/DemoSection';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';
import SocialProofSection from '../components/SocialProofSection';
import { VideoProvider } from '../contexts/VideoContext';
const Home: React.FC = () => {

  // FAQ structured data for the home page
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does setup take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We set up your system within 1 week. After analyzing your needs, we configure and activate your AI assistant.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which languages do you support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support over 20 languages. Your AI assistant can communicate naturally in your customers\' preferred language.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it integrate with existing systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide full API support.'
        }
      }
    ]
  };

  return (
    <VideoProvider>
      <div className="min-h-screen relative bg-black text-white">
        <ScrollProgress />

        {/* Dynamic Tech Background - Fixed position for entire page */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <SEO
            page="home"
            structuredData={[
              structuredDataTemplates.organization,
              structuredDataTemplates.webSite,
              structuredDataTemplates.service,
              faqStructuredData
            ]}
          />

          {/* Hero Section - Desktop */}
          <OptimizedHero />

          {/* Hero Section - Mobile (Redesigned with audio demo) */}
          <MobileHeroRedesigned />

          {/* Social Proof Section - Testimonials & Trust Badges */}
          <SocialProofSection />

          {/* Features Section - Scale.com style */}
          <FeaturesSection />

        {/* Solutions Grid - Scale.com style */}
        <SolutionsGrid />

        {/* Demo Section - Scale.com style */}
        <DemoSection />

        {/* Seamless Software Integration Section */}
        <TechSection
          badge="Integrations"
          title="Seamless Software Integration"
          subtitle="Connect with your existing tools and workflows"
        >
          <div className="max-w-6xl mx-auto">
            {/* Integration Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: FaDatabase,
                  title: 'CRM Systems',
                  items: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive']
                },
                {
                  icon: FaCalendarAlt,
                  title: 'Scheduling',
                  items: ['Google Calendar', 'Calendly', 'Acuity', 'Cal.com']
                },
                {
                  icon: FaCloud,
                  title: 'PMS & EHR',
                  items: ['Epic', 'Cerner', 'Athenahealth', 'Opera PMS']
                },
                {
                  icon: FaSync,
                  title: 'Communication',
                  items: ['Twilio', 'RingCentral', 'Vonage', 'Slack']
                }
              ].map((category, index) => (
                <TechCard key={index}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                      <category.icon className="text-xl text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">{category.title}</h3>
                    <div className="space-y-2">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-400">
                          <FaCheckCircle className="text-green-400 text-xs" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TechCard>
              ))}
            </div>

            {/* Industry-Specific Integrations */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-white text-center mb-8">Industry-Specific Software</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Healthcare */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <FaHospital className="text-cyan-400" />
                    <span className="text-white font-medium">Healthcare</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Practice Management Systems (PMS)
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Electronic Health Records (EHR)
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Patient Scheduling Systems
                    </li>
                  </ul>
                </div>

                {/* Hospitality */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <FaHotel className="text-cyan-400" />
                    <span className="text-white font-medium">Hospitality</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Property Management Systems (PMS)
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Reservation Platforms
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Channel Managers
                    </li>
                  </ul>
                </div>

                {/* Home Services */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <FaBuilding className="text-cyan-400" />
                    <span className="text-white font-medium">Home Services</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      ServiceTitan, Housecall Pro
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Field Service Software
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Dispatch & Routing Tools
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* API Badge */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FaPlug className="text-cyan-400" />
                Custom API Available
              </span>
              <span className="flex items-center gap-2">
                <FaSync className="text-cyan-400" />
                Real-time Sync
              </span>
              <span className="flex items-center gap-2">
                <FaShieldAlt className="text-cyan-400" />
                Secure Connections
              </span>
            </div>
          </div>
        </TechSection>

        {/* Process Section */}
        <TechSection
          badge="How It Works"
          title="Simple Setup Process"
          subtitle="Get started in 1 week with our streamlined onboarding"
        >
          <div className="max-w-6xl mx-auto">
            {/* Horizontal Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Steps */}
              {[
                {
                  title: 'Initial Consultation',
                  description: 'We analyze your business needs and call volume',
                  icon: FaUsers,
                },
                {
                  title: 'AI Configuration',
                  description: 'Custom training on your business data and processes',
                  icon: FaChartLine,
                },
                {
                  title: 'Integration Setup',
                  description: 'Connect with your CRM and booking systems',
                  icon: FaRocket,
                },
                {
                  title: 'Go Live',
                  description: 'Your AI receptionist starts handling calls 24/7',
                  icon: FaCheckCircle,
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <TechCard>
                    <div className="text-center">
                      {/* Icon */}
                      <div className="w-14 h-14 mx-auto mb-4 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                        <item.icon className="text-white text-xl" />
                      </div>

                      {/* Step Badge */}
                      <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full">
                        {index === 3 ? 'Final' : `Step ${index + 1}`}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </TechCard>
                </div>
              ))}
            </div>
          </div>
        </TechSection>

        {/* FAQ Section */}
        <TechSection
          badge="FAQ"
          title="Common Questions"
          subtitle="Everything you need to know about our AI solution"
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: 'How long does setup take?',
                answer: 'We set up your system within 1 week. After analyzing your needs, we configure and activate your AI assistant.',
              },
              {
                question: 'Which languages do you support?',
                answer: 'We support over 20 languages. Your AI assistant can communicate naturally in your customers\' preferred language.',
              },
              {
                question: 'Does it integrate with existing systems?',
                answer: 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide full API support.',
              },
              {
                question: 'What about data security?',
                answer: 'We are HIPAA compliant. All data is encrypted and stored securely with regular audits.',
              }
            ].map((faq, index) => (
              <TechCard key={index}>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* CTA Section */}
        <TechSection
          badge="Get Started"
          title="Ready to Transform Your Business?"
          subtitle="Join hundreds of businesses already using AI receptionists"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {/* Primary CTA */}
              <Link
                to="/demo"
                className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-colors"
              >
                <span>Schedule a Demo</span>
                <FaArrowRight className="text-sm" />
              </Link>

              {/* Secondary CTA */}
              <a
                href="tel:+16163263328"
                className="group flex items-center gap-3 px-8 py-4 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-900 text-white font-medium rounded-xl transition-colors"
              >
                <FaPhone className="text-sm text-neutral-400" />
                <span>Talk to AI</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                HIPAA Compliant
              </span>
              <span className="flex items-center gap-2">
                <FaClock />
                1 Week Setup
              </span>
              <span className="flex items-center gap-2">
                <FaHeadset />
                24/7 Support
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
    </VideoProvider>
  );
};

export default Home;