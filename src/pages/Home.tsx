import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaRobot, FaPhone, FaChartLine, FaShieldAlt, FaHotel, FaUserMd } from 'react-icons/fa';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';
import { structuredDataTemplates } from '../config/seoConfig';
import LiveTranscript from '../components/LiveTranscript';
import BookingVisualization from '../components/BookingVisualization';
import PerformanceMetrics from '../components/PerformanceMetrics';
import HealthcareSection from '../components/HealthcareSection';
import HospitalitySection from '../components/HospitalitySection';
import AIvsHumanComparison from '../components/AIvsHumanComparison';

const Home: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState<'healthcare' | 'hospitality'>('healthcare');
  
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
    <div className="min-h-screen">
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
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          {/* Logo Hero - Enlarged and Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20">
              <img 
                src="/cognia_logo_final.svg" 
                alt="Cognia AI" 
                className="h-32 md:h-40 w-auto"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              AI Receptionist for Healthcare & Hospitality
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-cyan-100 max-w-3xl mx-auto">
              Never miss another patient or guest. Book appointments & reservations 24/7.
            </p>
            
            {/* Industry Toggle Buttons */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveIndustry('healthcare')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  activeIndustry === 'healthcare'
                    ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-xl'
                    : 'bg-white/20 backdrop-blur border-2 border-white/40 text-white hover:bg-white/30'
                }`}
              >
                <FaUserMd className="inline-block mr-2" />
                Healthcare
              </button>
              <button
                onClick={() => setActiveIndustry('hospitality')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  activeIndustry === 'hospitality'
                    ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-xl'
                    : 'bg-white/20 backdrop-blur border-2 border-white/40 text-white hover:bg-white/30'
                }`}
              >
                <FaHotel className="inline-block mr-2" />
                Hospitality
              </button>
            </div>

            {/* Industry-Specific Metrics */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                {activeIndustry === 'healthcare' ? (
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2">
                      Save $50,000/month in missed appointments
                    </p>
                    <p className="text-lg text-cyan-100">
                      42% of patients won't call back if first call unanswered
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2">
                      Capture 30% more bookings after hours
                    </p>
                    <p className="text-lg text-cyan-100">
                      67% of travelers book outside business hours
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold rounded-lg hover:from-cyan-700 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-xl"
              >
                Book a Call
                <FaArrowRight className="ml-2" />
              </a>
              <a 
                href="tel:+16163263328"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-cyan-900 transition-all"
              >
                Call AI Receptionist: +1 616 326-3328
              </a>
            </div>
            {/* Value Proposition */}
            <p className="text-lg md:text-xl font-semibold text-cyan-200">
              {activeIndustry === 'healthcare' 
                ? 'Every missed call = $200-5,000 lost. We never miss.'
                : 'Every missed call = Lost room booking. We never miss.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Demo Section - Show the Magic */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-green-500 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
              <span className="text-white font-semibold">LIVE DEMO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              See Your AI Receptionist in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch real conversations, live bookings, and performance metrics happening right now
            </p>
          </motion.div>

          {/* Live Components Grid */}
          <div className="space-y-8">
            {/* Transcript and Booking Visualization */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-white font-bold text-xl mb-4">Live Call Transcript</h3>
                <LiveTranscript industry={activeIndustry} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-white font-bold text-xl mb-4">Real-Time Bookings</h3>
                <BookingVisualization industry={activeIndustry} />
              </motion.div>
            </div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white font-bold text-xl mb-4">Performance Analytics</h3>
              <PerformanceMetrics industry={activeIndustry} />
            </motion.div>
          </div>

          {/* Try It Yourself CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-br from-cyan-900 to-cyan-800 rounded-2xl p-8 border-2 border-cyan-500/30 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Try It Yourself - Call Our AI Receptionist</h3>
              <a 
                href="tel:+16163263328"
                className="inline-flex items-center px-12 py-5 bg-white text-cyan-900 font-bold text-xl rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                <FaPhone className="mr-3 animate-pulse" />
                +1 616 326-3328
              </a>
              <p className="text-cyan-200 mt-4 text-sm">This is a live demo showcasing our AI technology</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry-Specific Sections */}
      <AnimatePresence mode="wait">
        {activeIndustry === 'healthcare' ? (
          <motion.div
            key="healthcare"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HealthcareSection />
          </motion.div>
        ) : (
          <motion.div
            key="hospitality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HospitalitySection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI vs Human Comparison */}
      <AIvsHumanComparison />

      {/* ROI Calculator Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-cyan-700 to-blue-800 py-16 overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-300 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center max-w-5xl">
                Calculate How Much Revenue You're Losing to Missed Calls
              </h2>
              
              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300"></div>
                <div className="h-2 w-2 bg-cyan-300 rounded-full animate-pulse"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-300"></div>
              </div>
              
              {/* Subheadline with enhanced styling */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg md:text-2xl text-cyan-100 mb-8 text-center max-w-3xl font-light"
              >
                And see how much <span className="font-semibold text-white">Cognia AI</span> can recover for you
              </motion.p>
            </motion.div>
            
            {/* Calculator Display - Always Visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 max-w-6xl mx-auto"
            >
              <ROICalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Voice Agent Demo */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center bg-green-500 px-6 py-3 rounded-full mb-6"
            >
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-3"></div>
              <span className="text-lg font-bold text-white">LIVE DEMO AVAILABLE</span>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-10">Try Before You Buy</h3>
              <motion.div 
                whileHover={{ scale: 1.05 }}
              className="inline-block bg-white px-16 py-10 rounded-2xl shadow-2xl"
            >
              <p className="text-gray-700 mb-4 font-bold text-xl">Call our AI Receptionist</p>
              <a href="tel:+16163263328" className="text-4xl font-bold bg-gradient-to-r from-cyan-700 to-cyan-500 bg-clip-text text-transparent hover:from-cyan-800 hover:to-cyan-600 transition-all">
                +1 616 326-3328
              </a>
              <p className="text-gray-500 mt-4 text-sm italic">This is a demo line showcasing our AI technology</p>
              </motion.div>
          </div>
        </div>
      </section>


      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Cognia AI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Technology solutions that deliver results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaRobot />,
                title: 'Advanced AI',
                description: 'State-of-the-art NLP and machine learning'
              },
              {
                icon: <FaPhone />,
                title: 'Omnichannel',
                description: 'Voice, chat, and messaging in one platform'
              },
              {
                icon: <FaChartLine />,
                title: 'Scalable',
                description: 'Handle millions of conversations instantly'
              },
              {
                icon: <FaShieldAlt />,
                title: 'Security',
                description: 'Enterprise-grade data protection'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-xl hover:shadow-xl transition-all border border-slate-200 hover:border-cyan-600"
              >
                <div className="text-4xl text-cyan-700 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-semibold text-green-700">📈 PROVEN RESULTS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Real ROI, Real Results
            </h2>
              <p className="text-xl text-gray-600">
                Quick setup, immediate revenue growth
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-cyan-700 to-cyan-600 p-8 rounded-2xl text-white shadow-xl"
              >
                <div className="text-5xl font-bold mb-3">10-20%</div>
                <h3 className="text-xl font-semibold mb-2">More Customers</h3>
                <p className="text-green-100">Book appointments 24/7, including nights & weekends</p>
                <div className="mt-4 text-sm text-green-200">
                  Guaranteed revenue increase
                </div>
              </motion.div>
              <motion.div 
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl text-white shadow-xl"
              >
                <div className="text-5xl font-bold mb-3">87%</div>
                <h3 className="text-xl font-semibold mb-2">Conversion Rate</h3>
                <p className="text-blue-100">Of callers successfully book appointments</p>
                <div className="mt-4 text-sm text-blue-200">
                  Never lose a customer
                </div>
              </motion.div>
              <motion.div 
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-2xl text-white shadow-xl"
              >
                <div className="text-5xl font-bold mb-3">$45K</div>
                <h3 className="text-xl font-semibold mb-2">Additional Revenue</h3>
                <p className="text-purple-100">Average annual revenue increase per business</p>
                <div className="mt-4 text-sm text-purple-200">
                  Turn missed calls into revenue
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Process Section - MOVED UP FOR BETTER FLOW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
              How We Get Started
            </h2>
            <p className="text-xl text-center mb-16 text-gray-600">
              Your AI assistant ready in 3 simple steps
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Needs Analysis
                </h3>
                <p className="text-gray-600">
                  We understand your business needs and design a custom solution
                </p>
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Setup & Integration
                </h3>
                <p className="text-gray-600">
                  We integrate with your systems and set up your AI assistant within 48 hours
                </p>
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Go Live
                </h3>
                <p className="text-gray-600">
                  Your AI assistant is active! Starting to serve your customers 24/7
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'How long does setup take?',
                  a: 'We set up your system within 48 hours. After analyzing your needs, we configure and activate your AI assistant.'
                },
                {
                  q: 'Which languages do you support?',
                  a: 'We support over 20 languages. Your AI assistant can communicate naturally in your customers\' preferred language.'
                },
                {
                  q: 'Does it integrate with existing systems?',
                  a: 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide API support.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-10">
              Ready to Transform Your Business?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 text-lg shadow-2xl"
              >
                Start Free Trial
                <FaArrowRight className="ml-3" />
              </a>
              <a
                href="tel:+16163263328"
                className="inline-flex items-center px-12 py-5 bg-white/10 backdrop-blur border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-lg"
              >
                Try the AI Receptionist: +1 616 326-3328
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
