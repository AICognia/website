import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaArrowRight, FaCheckCircle, FaRocket, FaShieldAlt, FaClock, FaChartLine, FaUsers, FaHeadset, FaRobot, FaMicrophone, FaLanguage, FaCalendarAlt } from 'react-icons/fa';
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

        {/* Experience Our AI Section */}
        <TechSection
          badge="Try It Now"
          title="Experience Our AI"
          subtitle="Call our AI receptionist and see the magic happen"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Glowing backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 rounded-3xl blur-3xl opacity-50 animate-pulse" />

              {/* Main Container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-purple-500/40 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-purple-500/40 rounded-br-3xl" />

                {/* Content */}
                <div className="text-center space-y-8">
                  {/* Header */}
                  <div>
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                      </span>
                      <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">Live & Ready</span>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Call Our AI Receptionist
                    </h3>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto">
                      Experience firsthand how our AI handles calls, books appointments, and answers questions - just like a human receptionist would.
                    </p>
                  </div>

                  {/* Phone Number Box */}
                  <motion.a
                    href="tel:+16163263328"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative block"
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse" />

                    {/* Phone Box */}
                    <div className="relative bg-gradient-to-r from-purple-600 to-cyan-600 p-1 rounded-2xl">
                      <div className="bg-black rounded-2xl px-8 py-10">
                        <div className="flex items-center justify-center gap-4 mb-3">
                          <FaPhone className="text-3xl text-cyan-400 animate-pulse" />
                          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            +1 616-326-3328
                          </div>
                          <FaPhone className="text-3xl text-purple-400 animate-pulse" />
                        </div>
                        <div className="text-gray-400 text-sm uppercase tracking-widest">
                          Tap to Call Now
                        </div>
                      </div>
                    </div>
                  </motion.a>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: FaMicrophone, label: 'Natural Voice', color: 'cyan' },
                      { icon: FaLanguage, label: '20+ Languages', color: 'blue' },
                      { icon: FaCalendarAlt, label: 'Books Appointments', color: 'purple' },
                      { icon: FaRobot, label: 'Human-Like', color: 'green' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`bg-black/50 backdrop-blur-sm border ${
                          item.color === 'cyan' ? 'border-cyan-500/30' :
                          item.color === 'blue' ? 'border-blue-500/30' :
                          item.color === 'purple' ? 'border-purple-500/30' :
                          'border-green-500/30'
                        } rounded-xl p-4`}
                      >
                        <item.icon className={`text-2xl mb-2 mx-auto ${
                          item.color === 'cyan' ? 'text-cyan-400' :
                          item.color === 'blue' ? 'text-blue-400' :
                          item.color === 'purple' ? 'text-purple-400' :
                          'text-green-400'
                        }`} />
                        <div className="text-xs text-gray-400 font-light">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Instructions */}
                  <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-purple-400 font-bold">1</span>
                      </div>
                      <span>Call the number</span>
                    </div>
                    <FaArrowRight className="text-gray-600 hidden md:block" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                        <span className="text-cyan-400 font-bold">2</span>
                      </div>
                      <span>Ask any question</span>
                    </div>
                    <FaArrowRight className="text-gray-600 hidden md:block" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <span className="text-green-400 font-bold">3</span>
                      </div>
                      <span>Experience the magic</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TechSection>

        {/* Process Section */}
        <TechSection
          badge="How It Works"
          title="Simple Setup Process"
          subtitle="Get started in 48 hours with our streamlined onboarding"
        >
          <div className="max-w-6xl mx-auto">
            {/* Horizontal Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              {/* Connecting Arrows - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0 pointer-events-none">
                {/* Arrow 1 to 2 */}
                <div className="absolute top-1/2 left-[22%] w-[11%] -translate-y-1/2">
                  <div className="relative">
                    <div className="h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
                      <div className="w-0 h-0 border-l-[8px] border-l-blue-500 border-y-[5px] border-y-transparent" />
                    </div>
                  </div>
                </div>
                {/* Arrow 2 to 3 */}
                <div className="absolute top-1/2 left-[47%] w-[11%] -translate-y-1/2">
                  <div className="relative">
                    <div className="h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
                      <div className="w-0 h-0 border-l-[8px] border-l-purple-500 border-y-[5px] border-y-transparent" />
                    </div>
                  </div>
                </div>
                {/* Arrow 3 to 4 */}
                <div className="absolute top-1/2 left-[72%] w-[11%] -translate-y-1/2">
                  <div className="relative">
                    <div className="h-[2px] bg-gradient-to-r from-purple-500 to-green-500 animate-pulse" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
                      <div className="w-0 h-0 border-l-[8px] border-l-green-500 border-y-[5px] border-y-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps */}
              {[
                {
                  title: 'Initial Consultation',
                  description: 'We analyze your business needs and call volume',
                  icon: FaUsers,
                  color: 'cyan'
                },
                {
                  title: 'AI Configuration',
                  description: 'Custom training on your business data and processes',
                  icon: FaChartLine,
                  color: 'blue'
                },
                {
                  title: 'Integration Setup',
                  description: 'Connect with your CRM and booking systems',
                  icon: FaRocket,
                  color: 'purple'
                },
                {
                  title: 'Go Live',
                  description: 'Your AI receptionist starts handling calls 24/7',
                  icon: FaCheckCircle,
                  color: 'green'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <TechCard glowColor={item.color as any} delay={index * 0.1}>
                    <div className="text-center">
                      {/* Icon */}
                      <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${
                        item.color === 'cyan' ? 'from-cyan-500/20 to-cyan-600/20' :
                        item.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                        item.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' :
                        'from-green-500/20 to-green-600/20'
                      } rounded-full flex items-center justify-center border ${
                        item.color === 'cyan' ? 'border-cyan-500/30' :
                        item.color === 'blue' ? 'border-blue-500/30' :
                        item.color === 'purple' ? 'border-purple-500/30' :
                        'border-green-500/30'
                      }`}>
                        <item.icon className={`${
                          item.color === 'cyan' ? 'text-cyan-400' :
                          item.color === 'blue' ? 'text-blue-400' :
                          item.color === 'purple' ? 'text-purple-400' :
                          'text-green-400'
                        } text-2xl`} />
                      </div>

                      {/* Step Badge */}
                      <div className={`inline-block px-3 py-1 mb-3 text-xs font-bold ${
                        item.color === 'cyan' ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' :
                        item.color === 'blue' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                        item.color === 'purple' ? 'text-purple-400 bg-purple-500/10 border-purple-500/30' :
                        'text-green-400 bg-green-500/10 border-green-500/30'
                      } border rounded-full uppercase tracking-wider`}>
                        {index === 3 ? 'Final' : `Step ${index + 1}`}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400 font-light">{item.description}</p>
                    </div>
                  </TechCard>

                  {/* Mobile Arrow - Show only on mobile between steps */}
                  {index < 3 && (
                    <div className="flex justify-center mt-4 md:hidden">
                      <FaArrowRight className={`text-2xl ${
                        index === 0 ? 'text-cyan-400' :
                        index === 1 ? 'text-blue-400' :
                        'text-purple-400'
                      } animate-bounce`} style={{ animationDirection: 'normal', animationDuration: '2s' }} />
                    </div>
                  )}
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
              {/* Primary CTA - Appealing Glowy Blue Button */}
              <motion.a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-auto"
              >
                {/* Subtle Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition duration-300 animate-pulse"></div>

                {/* Button */}
                <div className="relative flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl leading-none shadow-lg">
                  <span className="text-lg font-bold text-white">
                    Schedule Free Demo
                  </span>
                  <FaArrowRight className="text-white text-sm group-hover:translate-x-1 transition-transform" />

                  {/* Inner shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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