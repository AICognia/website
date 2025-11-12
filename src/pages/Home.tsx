import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaArrowRight, FaCheckCircle, FaRocket, FaShieldAlt, FaClock, FaChartLine, FaUsers, FaGlobe, FaHeadset } from 'react-icons/fa';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';
import ScrollProgress from '../components/ScrollProgress';
import OptimizedHero from '../components/OptimizedHero';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';

// Lazy load heavy components
const ROICalculator = lazy(() => import('../components/ROICalculator'));
const MobileROICalculator = lazy(() => import('../components/MobileROICalculator'));

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
          text: 'We set up your system within 48 hours. After analyzing your needs, we configure and activate your AI assistant.'
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

        {/* Hero Section */}
        <OptimizedHero />

        {/* Features Section - Professional Grid Layout */}
        <TechSection
          badge="Core Features"
          title="Enterprise AI Capabilities"
          subtitle="Advanced features designed for scale and reliability"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-7xl mx-auto">
            <TechCard glowColor="cyan" delay={0.1}>
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 rounded-lg flex items-center justify-center border border-cyan-500/20">
                  <FaPhone className="text-cyan-400 text-xl" />
                </div>
                <h3 className="text-base font-semibold text-cyan-400 mb-2">24/7 Availability</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed flex-grow">
                  Never miss a call. Your AI receptionist works around the clock without breaks, holidays, or sick days.
                </p>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-cyan-400/70">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    <span>Always Active</span>
                  </div>
                </div>
              </div>
            </TechCard>

            <TechCard glowColor="blue" delay={0.2}>
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/20">
                  <FaRocket className="text-blue-400 text-xl" />
                </div>
                <h3 className="text-base font-semibold text-blue-400 mb-2">Instant Response</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed flex-grow">
                  0.5 second response time with natural conversation flow and intelligent context understanding.
                </p>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-blue-400/70">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    <span>Lightning Fast</span>
                  </div>
                </div>
              </div>
            </TechCard>

            <TechCard glowColor="purple" delay={0.3}>
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                  <FaGlobe className="text-purple-400 text-xl" />
                </div>
                <h3 className="text-base font-semibold text-purple-400 mb-2">Multi-Language</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed flex-grow">
                  Support for 20+ languages with native-level fluency and cultural context awareness.
                </p>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-purple-400/70">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                    <span>Global Ready</span>
                  </div>
                </div>
              </div>
            </TechCard>

            <TechCard glowColor="green" delay={0.4}>
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-lg flex items-center justify-center border border-green-500/20">
                  <FaShieldAlt className="text-green-400 text-xl" />
                </div>
                <h3 className="text-base font-semibold text-green-400 mb-2">HIPAA Compliant</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed flex-grow">
                  Enterprise-grade security with end-to-end encryption and full regulatory compliance.
                </p>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-green-400/70">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span>Fully Secure</span>
                  </div>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        {/* ROI Calculator Section */}
        <TechSection
          badge="ROI Calculator"
          title="Calculate Your Savings"
          subtitle="See how much revenue you're losing to missed calls"
        >
          <div className="max-w-6xl mx-auto">
            <TechCard glowColor="cyan" hoverable={false}>
              {/* Mobile ROI Calculator */}
              <div className="lg:hidden">
                <Suspense fallback={
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-cyan-400 animate-pulse">Loading calculator...</div>
                  </div>
                }>
                  <MobileROICalculator />
                </Suspense>
              </div>

              {/* Desktop ROI Calculator */}
              <div className="hidden lg:block">
                <Suspense fallback={
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-cyan-400 animate-pulse">Loading calculator...</div>
                  </div>
                }>
                  <ROICalculator />
                </Suspense>
              </div>
            </TechCard>
          </div>
        </TechSection>

        {/* Process Section */}
        <TechSection
          badge="How It Works"
          title="Simple Setup Process"
          subtitle="Get started in 48 hours with our streamlined onboarding"
        >
          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 hidden sm:block" />

              {/* Steps */}
              {[
                {
                  step: '01',
                  title: 'Initial Consultation',
                  description: 'We analyze your business needs and call volume',
                  icon: FaUsers,
                  color: 'cyan'
                },
                {
                  step: '02',
                  title: 'AI Configuration',
                  description: 'Custom training on your business data and processes',
                  icon: FaChartLine,
                  color: 'blue'
                },
                {
                  step: '03',
                  title: 'Integration Setup',
                  description: 'Connect with your CRM and booking systems',
                  icon: FaRocket,
                  color: 'purple'
                },
                {
                  step: '04',
                  title: 'Go Live',
                  description: 'Your AI receptionist starts handling calls 24/7',
                  icon: FaCheckCircle,
                  color: 'green'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-center mb-12 last:mb-0"
                >
                  {/* Step number */}
                  <div className={`relative z-10 w-16 h-16 bg-black border-2 ${
                    index === 0 ? 'border-cyan-500/50' :
                    index === 1 ? 'border-blue-500/50' :
                    index === 2 ? 'border-purple-500/50' :
                    'border-green-500/50'
                  } rounded-full flex items-center justify-center`}>
                    <item.icon className={`${
                      index === 0 ? 'text-cyan-400' :
                      index === 1 ? 'text-blue-400' :
                      index === 2 ? 'text-purple-400' :
                      'text-green-400'
                    } text-xl`} />
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`text-xs font-bold ${
                        index === 0 ? 'text-cyan-400' :
                        index === 1 ? 'text-blue-400' :
                        index === 2 ? 'text-purple-400' :
                        'text-green-400'
                      } uppercase tracking-widest`}>
                        Step {item.step}
                      </span>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-700 to-transparent" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 font-light">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TechSection>

        {/* Stats Section */}
        <TechSection
          badge="Results"
          title="Proven Performance"
          subtitle="Real results from real businesses"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '10-20%', label: 'Revenue Increase', suffix: '↑', color: 'green' },
              { value: '95%', label: 'Customer Satisfaction', suffix: '+', color: 'cyan' },
              { value: '76%', label: 'Cost Reduction', suffix: '↓', color: 'blue' },
              { value: '24/7', label: 'Uptime Guarantee', suffix: '', color: 'purple' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${
                  index === 0 ? 'from-green-400 to-green-300' :
                  index === 1 ? 'from-cyan-400 to-cyan-300' :
                  index === 2 ? 'from-blue-400 to-blue-300' :
                  'from-purple-400 to-purple-300'
                } bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                  <span className="text-2xl ml-1">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
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
                answer: 'We set up your system within 48 hours. After analyzing your needs, we configure and activate your AI assistant.',
                color: 'cyan'
              },
              {
                question: 'Which languages do you support?',
                answer: 'We support over 20 languages. Your AI assistant can communicate naturally in your customers\' preferred language.',
                color: 'blue'
              },
              {
                question: 'Does it integrate with existing systems?',
                answer: 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide full API support.',
                color: 'purple'
              },
              {
                question: 'What about data security?',
                answer: 'We are HIPAA compliant and SOC 2 certified. All data is encrypted and stored securely with regular audits.',
                color: 'green'
              }
            ].map((faq, index) => (
              <TechCard key={index} glowColor={faq.color as any} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 bg-gradient-to-br ${
                    index === 0 ? 'from-cyan-500/20 to-cyan-600/20' :
                    index === 1 ? 'from-blue-500/20 to-blue-600/20' :
                    index === 2 ? 'from-purple-500/20 to-purple-600/20' :
                    'from-green-500/20 to-green-600/20'
                  } rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <span className={`${
                      index === 0 ? 'text-cyan-400' :
                      index === 1 ? 'text-blue-400' :
                      index === 2 ? 'text-purple-400' :
                      'text-green-400'
                    } font-bold`}>?</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{faq.answer}</p>
                  </div>
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
              <motion.a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative flex items-center justify-center gap-3 px-10 py-5 bg-black rounded-lg leading-none">
                  <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Schedule Free Demo
                  </span>
                  <FaArrowRight className="text-cyan-400 text-sm group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="tel:+16163263328"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group w-full sm:w-auto"
              >
                <div className="relative flex items-center justify-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 rounded-lg transition-all duration-200">
                  <FaPhone className="text-cyan-400 text-sm animate-pulse" />
                  <span className="text-lg font-medium text-gray-300 group-hover:text-cyan-400 transition-colors">
                    +1 616-326-3328
                  </span>
                </div>
              </motion.a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 font-light">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                HIPAA Compliant
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-blue-400" />
                48hr Setup
              </span>
              <span className="flex items-center gap-2">
                <FaHeadset className="text-purple-400" />
                24/7 Support
              </span>
              <span className="flex items-center gap-2">
                <FaShieldAlt className="text-cyan-400" />
                SOC 2 Certified
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Home;