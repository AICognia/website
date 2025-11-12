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
          badge="Live Demo"
          title="Experience Our AI"
          subtitle="See how our AI receptionist handles real calls"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Demo Interface */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <TechCard glowColor="purple" hoverable={false}>
                  <div className="space-y-6">
                    {/* AI Avatar Header */}
                    <div className="flex items-center gap-4 pb-4 border-b border-purple-500/20">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center animate-pulse">
                        <FaRobot className="text-3xl text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">AI Receptionist</h3>
                        <p className="text-sm text-green-400 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          Online & Ready
                        </p>
                      </div>
                    </div>

                    {/* Conversation Demo */}
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <FaPhone className="text-xs text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Incoming Call</p>
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                            <p className="text-sm text-gray-300">"Hi, I'd like to schedule an appointment for next week"</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <FaRobot className="text-xs text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">AI Response</p>
                          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3">
                            <p className="text-sm text-gray-300">"Of course! I'd be happy to help you schedule an appointment. I have availability on Tuesday at 10 AM or Thursday at 2 PM. Which would work better for you?"</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <FaPhone className="text-xs text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Caller</p>
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                            <p className="text-sm text-gray-300">"Thursday at 2 PM sounds perfect"</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <FaRobot className="text-xs text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">AI Response</p>
                          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3">
                            <p className="text-sm text-gray-300">"Perfect! I've scheduled your appointment for Thursday at 2 PM. May I have your name and phone number for confirmation?"</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-purple-500/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">0.3s</div>
                        <div className="text-xs text-gray-500">Response Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">100%</div>
                        <div className="text-xs text-gray-500">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">Live</div>
                        <div className="text-xs text-gray-500">Status</div>
                      </div>
                    </div>
                  </div>
                </TechCard>
              </motion.div>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-3">Intelligent Capabilities</h3>
                  <p className="text-gray-400 font-light">Our AI doesn't just answer calls - it understands, learns, and delivers exceptional experiences.</p>
                </div>

                {[
                  {
                    icon: FaMicrophone,
                    title: 'Natural Voice',
                    description: 'Human-like conversation with natural speech patterns and emotions',
                    color: 'cyan'
                  },
                  {
                    icon: FaLanguage,
                    title: 'Multilingual Support',
                    description: 'Fluent in 20+ languages with automatic detection',
                    color: 'blue'
                  },
                  {
                    icon: FaCalendarAlt,
                    title: 'Smart Scheduling',
                    description: 'Books appointments, manages calendars, sends reminders',
                    color: 'purple'
                  },
                  {
                    icon: FaChartLine,
                    title: 'Learning & Adapting',
                    description: 'Improves with every interaction, learning your business',
                    color: 'green'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <TechCard glowColor={feature.color as any} delay={index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${
                          feature.color === 'cyan' ? 'from-cyan-500/20 to-cyan-600/20' :
                          feature.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                          feature.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' :
                          'from-green-500/20 to-green-600/20'
                        } shrink-0`}>
                          <feature.icon className={`text-xl ${
                            feature.color === 'cyan' ? 'text-cyan-400' :
                            feature.color === 'blue' ? 'text-blue-400' :
                            feature.color === 'purple' ? 'text-purple-400' :
                            'text-green-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-400 font-light">{feature.description}</p>
                        </div>
                      </div>
                    </TechCard>
                  </motion.div>
                ))}

                {/* Try Demo CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="pt-4"
                >
                  <a
                    href="tel:+16163263328"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 font-semibold rounded-xl transition-all duration-300 hover:scale-105 w-full justify-center"
                  >
                    <FaPhone className="animate-pulse" />
                    <span>Call +1 616-326-3328 to Try Live Demo</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
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