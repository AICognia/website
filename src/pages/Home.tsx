import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaCheckCircle, FaRocket, FaShieldAlt, FaClock, FaChartLine, FaUsers, FaHeadset, FaRobot, FaMicrophone, FaLanguage, FaCalendarAlt, FaHospital, FaBalanceScale, FaStore, FaBuilding, FaHotel, FaCar, FaCalendarAlt as FaCalendar, FaCog, FaUserTie, FaPlug, FaSync, FaCloud, FaDatabase, FaHome, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
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
import { useLeadCapture } from '../contexts/LeadCaptureContext';

const Home: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();

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

        {/* By Industry, Feature, Use Case Section */}
        <TechSection
          badge="Solutions"
          title="Tailored AI for Every Need"
          subtitle="Industry-specific solutions with powerful features for every use case"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {/* BY INDUSTRY */}
              <div>
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-8">By Industry</h3>
                <div className="space-y-6">
                  {[
                    { icon: FaHospital, title: 'Healthcare', desc: 'HIPAA-compliant patient scheduling', link: '/industries/healthcare' },
                    { icon: FaBalanceScale, title: 'Legal Services', desc: 'Client intake and case management', link: '/industries/legal' },
                    { icon: FaStore, title: 'Retail', desc: 'Multi-location customer support', link: '/industries/retail' },
                    { icon: FaBuilding, title: 'Enterprise', desc: 'Scalable call distribution', link: '/industries/enterprise' },
                    { icon: FaHotel, title: 'Hospitality', desc: 'Reservation and guest services', link: '/industries/hospitality' },
                    { icon: FaCar, title: 'Automotive', desc: 'Service scheduling and support', link: '/industries/automotive' },
                    { icon: FaHome, title: 'Home Services', desc: 'Plumbing, HVAC, electrical & more', link: '/industries/home-services' }
                  ].map((item, index) => (
                    <Link key={index} to={item.link} className="flex items-start gap-4 hover:opacity-80 transition-opacity cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="text-white text-lg" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-1">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* BY FEATURE */}
              <div>
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-8">By Feature</h3>
                <div className="space-y-6">
                  {[
                    { icon: FaPhone, title: '24/7 Call Handling', desc: 'Never miss a customer call', link: '/features/call-handling' },
                    { icon: FaCalendarAlt, title: 'Smart Scheduling', desc: 'AI-powered appointment booking', link: '/features/smart-scheduling' },
                    { icon: FaLanguage, title: 'Multi-Language', desc: '20+ languages supported', link: '/features/multi-language' },
                    { icon: FaCog, title: 'CRM Integration', desc: 'Connect with your systems', link: '/features/crm-integration' },
                    { icon: FaRobot, title: 'Natural Conversations', desc: 'Human-like interactions', link: '/features/natural-conversations' },
                    { icon: FaChartLine, title: 'Analytics Dashboard', desc: 'Real-time insights and reports', link: '/features/analytics-dashboard' }
                  ].map((item, index) => (
                    <Link key={index} to={item.link} className="flex items-start gap-4 hover:opacity-80 transition-opacity cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="text-white text-lg" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-1">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* BY USE CASE */}
              <div>
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-8">By Use Case</h3>
                <div className="space-y-6">
                  {[
                    { icon: FaUsers, title: 'Patient Scheduling', desc: 'Medical appointment management', link: '/usecases/patient-scheduling' },
                    { icon: FaUserTie, title: 'Client Intake', desc: 'Automated client onboarding', link: '/usecases/client-intake' },
                    { icon: FaHeadset, title: 'Customer Support', desc: 'Round-the-clock assistance', link: '/usecases/customer-support' },
                    { icon: FaClock, title: 'After-Hours Service', desc: 'Business continuity 24/7', link: '/usecases/after-hours-service' },
                    { icon: FaShieldAlt, title: 'Lead Qualification', desc: 'Screen and route prospects', link: '/usecases/lead-qualification' },
                    { icon: FaCheckCircle, title: 'Order Processing', desc: 'Automated order management', link: '/usecases/order-processing' }
                  ].map((item, index) => (
                    <Link key={index} to={item.link} className="flex items-start gap-4 hover:opacity-80 transition-opacity cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="text-white text-lg" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-1">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TechSection>

        {/* Experience Our AI Section */}
        <TechSection
          badge="Try It Now"
          title="Experience Our AI"
          subtitle="Call our AI receptionist and see the magic happen"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Main Container - Clean and Minimal */}
              <div className="bg-black/50 border border-white/10 rounded-3xl p-8 md:p-12">
                {/* Content */}
                <div className="text-center space-y-8">
                  {/* Header */}
                  <div>
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                      <span className="text-sm font-medium text-green-400">Live & Ready</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Call Our AI Receptionist
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      Experience firsthand how our AI handles calls, books appointments, and answers questions - just like a human receptionist would.
                    </p>
                  </div>

                  {/* Phone Number Box */}
                  <a
                    href="tel:+16163263328"
                    className="block bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl px-8 py-10 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <FaPhone className="text-2xl text-white" />
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        +1 616-326-3328
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Tap to Talk to AI
                    </div>
                  </a>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: FaMicrophone, label: 'Natural Voice' },
                      { icon: FaLanguage, label: '20+ Languages' },
                      { icon: FaCalendarAlt, label: 'Books Appointments' },
                      { icon: FaRobot, label: 'Human-Like' }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                      >
                        <item.icon className="text-xl mb-2 mx-auto text-white" />
                        <div className="text-xs text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </TechSection>

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

        {/* Stats Section */}
        <TechSection
          badge="Results"
          title="Proven Performance"
          subtitle="Real results from real businesses"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '10-20%', label: 'Revenue Increase', suffix: '↑' },
              { value: '95%', label: 'Customer Satisfaction', suffix: '+' },
              { value: '76%', label: 'Cost Reduction', suffix: '↓' },
              { value: '24/7', label: 'Uptime Guarantee', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  <span className="text-2xl ml-1">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
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
              {/* Primary CTA - Premium Design */}
              <motion.button
                onClick={() => openLeadCapture('home_cta')}
                className="group relative overflow-hidden px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Button content */}
                <div className="relative flex items-center justify-center gap-3 text-white">
                  <FaCalendarCheck className="text-xl" />
                  <span>Schedule Free Demo</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </div>
              </motion.button>

              {/* Secondary CTA */}
              <a
                href="tel:+16163263328"
                className="group flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-white text-lg font-medium rounded-xl transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                  <FaPhone className="text-sm text-cyan-400" />
                </div>
                <span>+1 616-326-3328</span>
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