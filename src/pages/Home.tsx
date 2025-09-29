import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRobot, FaPhone, FaChartLine, FaShieldAlt, FaBrain, FaGlobe, FaClock, FaCheckCircle, FaMicrophone, FaComments, FaDatabase, FaCloud } from 'react-icons/fa';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';
import ROIModal from '../components/ROIModal';
import { structuredDataTemplates } from '../config/seoConfig';

const Home: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showROIModal, setShowROIModal] = useState(false);
  
  // Auto-open ROI modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowROIModal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
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
      {/* ROI Modal */}
      <ROIModal isOpen={showROIModal} onClose={() => setShowROIModal(false)} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Never Miss a Lead. Book 24/7.
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-purple-100 max-w-3xl mx-auto">
              Book appointments while you sleep. <span className="text-yellow-300 font-bold">3x more customers, guaranteed.</span>
            </p>
            <p className="text-lg text-purple-200 mb-10">
              📈 3x more bookings • ⚡ 48hr setup • 🌍 20+ languages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-xl"
              >
                🚀 Start Free Demo
                <FaArrowRight className="ml-2" />
              </Link>
              <a 
                href="tel:+16163263328"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-900 transition-all"
              >
                📞 Call Now: +1 616 326-3328
              </a>
            </div>
            {/* Value Proposition */}
            <p className="text-sm text-yellow-200">
              💰 Every missed call = Lost revenue. We never miss.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Voice Agent Demo */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
            >
              <span className="text-lg font-bold text-white animate-pulse">🔴 LIVE - Test it right now!</span>
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-4">Experience Our AI Voice Assistant</h3>
            <p className="text-xl text-orange-100 mb-10">
              🎆 Call now and hear the difference AI makes
            </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
              className="inline-block bg-white px-16 py-10 rounded-2xl shadow-2xl"
            >
              <p className="text-gray-700 mb-4 font-bold text-xl">US Demo Line</p>
              <a href="tel:+16163263328" className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:from-orange-600 hover:to-red-600 transition-all">
                  +1 616 326-3328
                </a>
              <p className="text-gray-500 mt-4 text-sm">🇺🇸 Available 24/7 • Instant Response</p>
              </motion.div>
          </div>
        </div>
      </section>

      {/* ROI & Benefits Section - MOVED UP FOR BETTER CONVERSION */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Technology Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI technologies to empower your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBrain className="text-3xl" />,
                title: 'Natural Language Processing',
                description: 'Advanced NLP that understands customer intent'
              },
              {
                icon: <FaMicrophone className="text-3xl" />,
                title: 'Speech Recognition',
                description: 'Perfect performance even in noisy environments'
              },
              {
                icon: <FaComments className="text-3xl" />,
                title: 'Multi-Channel',
                description: 'WhatsApp, Instagram, Phone, Web'
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: '20+ Languages',
                description: 'Speak with your global customers'
              },
              {
                icon: <FaClock className="text-3xl" />,
                title: '24/7 Service',
                description: 'Uninterrupted customer support'
              },
              {
                icon: <FaDatabase className="text-3xl" />,
                title: 'CRM Integration',
                description: 'Integrates with your existing systems'
              },
              {
                icon: <FaCloud className="text-3xl" />,
                title: 'Cloud Based',
                description: 'Secure and scalable infrastructure'
              },
              {
                icon: <FaCheckCircle className="text-3xl" />,
                title: 'Easy Setup',
                description: 'Go live within 48 hours'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
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
                className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-xl hover:shadow-xl transition-all border border-orange-100 hover:border-orange-300"
              >
                <div className="text-4xl text-orange-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-purple-50">
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
                className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white shadow-xl"
              >
                <div className="text-5xl font-bold mb-3">3x</div>
                <h3 className="text-xl font-semibold mb-2">More Bookings</h3>
                <p className="text-green-100">Book appointments 24/7, including nights & weekends</p>
                <div className="mt-4 text-sm text-green-200">
                  📈 Guaranteed revenue increase
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
                  🔒 Never lose a customer
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
                  💰 Turn missed calls into revenue
                </div>
              </motion.div>
            </div>
            {/* ROI Calculator Section */}
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              {!showCalculator ? (
                <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    🧮 How Much Revenue Are You Losing?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Calculate your personalized ROI instantly
                  </p>
                  <button
                    onClick={() => setShowCalculator(true)}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-lg hover:from-orange-500 hover:to-red-500 transition-all transform hover:scale-105 shadow-lg"
                  >
                    📊 Open ROI Calculator
                    <FaChartLine className="ml-2" />
                  </button>
                </div>
              ) : (
                <ROICalculator />
              )}
            </motion.div>
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
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
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
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
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
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
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

      {/* Technology Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-semibold text-purple-700">🌟 {false ? 'EN İYİ ÖZELLİKLER' : 'BEST-IN-CLASS FEATURES'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {false ? 'Rakiplerimizden Farkımız' : 'What Sets Us Apart'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {false ? 'Gerçek sonuçlar getiren kurumsal düzeyde AI teknolojisi' : 'Enterprise-grade AI technology that delivers real results'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBrain className="text-3xl" />,
                title: false ? 'Doğal Dil İşleme' : 'Natural Language Processing',
                description: false ? 'Müşteri niyetini %99 doğrulukla anlar' : 'Understands customer intent with 99% accuracy',
                stat: '99%'
              },
              {
                icon: <FaMicrophone className="text-3xl" />,
                title: false ? 'Ses Tanıma' : 'Speech Recognition',
                description: false ? 'Gürültülü ortamlarda bile mükemmel performans' : 'Perfect performance even in noisy environments'
              },
              {
                icon: <FaComments className="text-3xl" />,
                title: false ? 'Çok Kanallı' : 'Multi-Channel',
                description: false ? 'WhatsApp, Instagram, Telefon, Web' : 'WhatsApp, Instagram, Phone, Web'
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: false ? '20+ Dil' : '20+ Languages',
                description: false ? 'Global müşterilerinizle konuşun' : 'Speak with your global customers'
              },
              {
                icon: <FaClock className="text-3xl" />,
                title: false ? '7/24 Hizmet' : '24/7 Service',
                description: false ? 'Yılda 8760 saat kesintisiz hizmet' : '8,760 hours of uptime per year',
                stat: '99.9%'
              },
              {
                icon: <FaDatabase className="text-3xl" />,
                title: false ? 'CRM Entegrasyonu' : 'CRM Integration',
                description: false ? 'Mevcut sistemlerinizle entegre' : 'Integrates with your existing systems'
              },
              {
                icon: <FaCloud className="text-3xl" />,
                title: false ? 'Bulut Tabanlı' : 'Cloud Based',
                description: false ? 'Güvenli ve ölçeklenebilir altyapı' : 'Secure and scalable infrastructure'
              },
              {
                icon: <FaCheckCircle className="text-3xl" />,
                title: false ? 'Kolay Kurulum' : 'Easy Setup',
                description: false ? '48 saat içinde canlıya alın' : 'Go live within 48 hours'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
                {feature.stat && (
                  <div className="mt-3 text-2xl font-bold text-cyan-600">{feature.stat}</div>
                )}
              </motion.div>
            ))}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#162B4D] to-[#0A1628] text-white">
        <div className="container mx-auto px-6 text-center">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              Experience the power of AI-driven customer engagement
            </p>
          <Link 
            to="/contact"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#162B4D] to-[#162B4D] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-lg"
          >
                          Get Started Today
            <FaArrowRight className="ml-3" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
