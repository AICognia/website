import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRobot, FaPhone, FaChartLine, FaShieldAlt, FaCalculator } from 'react-icons/fa';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';
import { structuredDataTemplates } from '../config/seoConfig';

const Home: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  
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
              Never Miss a Call. Book 24/7.
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-cyan-100 max-w-3xl mx-auto">
              <span className="text-cyan-300 font-bold">10-20% more customers, guaranteed.</span>
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-cyan-200">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Setup in 48 hours</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold rounded-lg hover:from-cyan-700 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-xl"
              >
                Start Free Demo
                <FaArrowRight className="ml-2" />
              </Link>
              <a 
                href="tel:+16163263328"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-cyan-900 transition-all"
              >
                Call Now: +1 616 326-3328
              </a>
            </div>
            {/* Value Proposition */}
            <p className="text-lg md:text-xl font-semibold text-cyan-200">
              Every missed call = Lost revenue. We never miss.
            </p>
          </motion.div>
        </div>
      </section>


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
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Calculate Your Revenue Opportunity
              </h2>
              <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl">
                Discover how much additional revenue your business could generate with AI-powered call handling
              </p>
              
              {!showCalculator ? (
                <motion.button
                  onClick={() => setShowCalculator(true)}
                  whileHover={{ scale: 1.05 }}
                  className="group px-10 py-5 bg-white text-teal-700 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all shadow-2xl flex items-center"
                >
                  <FaCalculator className="mr-3 text-2xl group-hover:rotate-6 transition-transform" />
                  Open Revenue Calculator
                </motion.button>
              ) : (
                <button
                  onClick={() => setShowCalculator(false)}
                  className="mb-6 px-6 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-all"
                >
                  Hide Calculator
                </button>
              )}
              
              {/* Info text */}
              {!showCalculator && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-cyan-100 text-sm"
                >
                  Takes only 30 seconds • No email required • Instant results
                </motion.p>
              )}
            </motion.div>
            
            {/* Calculator Display */}
            {showCalculator && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 max-w-6xl mx-auto"
              >
                <ROICalculator />
              </motion.div>
            )}
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
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Try Before You Buy</h3>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Experience firsthand how our AI handles real customer conversations with natural, human-like interactions
            </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
              className="inline-block bg-white px-16 py-10 rounded-2xl shadow-2xl"
            >
              <p className="text-gray-700 mb-4 font-bold text-xl">US Demo Line</p>
              <a href="tel:+16163263328" className="text-4xl font-bold bg-gradient-to-r from-cyan-700 to-cyan-500 bg-clip-text text-transparent hover:from-cyan-800 hover:to-cyan-600 transition-all">
                +1 616 326-3328
              </a>
              <p className="text-gray-500 mt-4 text-sm">🇺🇸 Available 24/7 • Instant Response</p>
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Start capturing every opportunity with AI-powered customer engagement
            </p>
            
            {/* Trust badges */}
            <div className="flex justify-center gap-8 mb-10 text-gray-400">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span> No Setup Fees
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span> ROI Guarantee
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 text-lg shadow-2xl"
              >
                Start My Free Trial Now
                <FaArrowRight className="ml-3" />
              </Link>
              <a
                href="tel:+16163263328"
                className="inline-flex items-center px-12 py-5 bg-white/10 backdrop-blur border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-lg"
              >
                Schedule a Demo Call
              </a>
            </div>
            
            <p className="mt-6 text-gray-400 text-sm">
              No credit card required • Setup in 48 hours • Instant ROI
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
