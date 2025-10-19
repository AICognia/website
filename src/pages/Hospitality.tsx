import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone, FaGlobeAmericas } from 'react-icons/fa';
import SEO from '../components/SEO';
import HospitalitySection from '../components/HospitalitySection';
import LiveTranscript from '../components/LiveTranscript';
import BookingVisualization from '../components/BookingVisualization';
import AIvsHumanComparison from '../components/AIvsHumanComparison';

const Hospitality: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'Hospitality', url: '/hospitality' }
  ];

  const hospitalityStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Cognia AI Hospitality Solutions',
    description: 'AI receptionist for hotels and resorts. Multi-language support, PMS integration, 24/7 booking capabilities.',
    url: 'https://cogniaai.com/hospitality',
    telephone: '+1-616-326-3328',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        page="solutions" 
        breadcrumbs={breadcrumbs}
        structuredData={[hospitalityStructuredData]}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full mb-6">
              <FaGlobeAmericas className="text-blue-900 mr-2" />
              <span className="text-blue-900 font-semibold">HOSPITALITY SOLUTIONS</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI Concierge for Hotels & Resorts
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              From boutique hotels to global chains. Multi-language support, PMS integrated, 
              and designed to deliver 5-star service 24/7.
            </p>
            
            <div className="bg-indigo-800/30 backdrop-blur rounded-xl p-6 mb-8 max-w-2xl mx-auto border border-indigo-500/30">
              <p className="text-3xl font-bold text-indigo-300 mb-2">
                Capture 30% more bookings after hours
              </p>
              <p className="text-lg text-indigo-200">
                67% of travelers book outside business hours • 20+ languages supported
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-900 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Get Your Free Demo
                <FaArrowRight className="ml-2" />
              </a>
              <a 
                href="tel:+16163263328"
                className="inline-flex items-center px-8 py-4 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all border-2 border-indigo-500"
              >
                <FaPhone className="mr-2" />
                Call AI: +1 616 326-3328
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hospitality Section Component */}
      <HospitalitySection />

      {/* Live Demo Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Experience the Future of Hotel Reception
            </h2>
            <p className="text-xl text-gray-300">
              Watch how our AI handles international guests and complex bookings
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-white font-bold text-xl mb-4">Live Guest Interaction</h3>
              <LiveTranscript industry="hospitality" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-white font-bold text-xl mb-4">Real-Time Room Bookings</h3>
              <BookingVisualization industry="hospitality" />
            </motion.div>
          </div>

          {/* International Support Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 mt-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Serve Guests in Their Language
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['🇺🇸 English', '🇪🇸 Spanish', '🇫🇷 French', '🇩🇪 German', '🇨🇳 Chinese', '🇯🇵 Japanese',
                '🇮🇹 Italian', '🇷🇺 Russian', '🇰🇷 Korean', '🇵🇹 Portuguese', '🇦🇪 Arabic', '🇮🇳 Hindi'].map((lang, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur rounded-lg p-3 text-center"
                >
                  <span className="text-white">{lang}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-indigo-200 mt-6">
              And many more languages to serve your international guests perfectly
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI vs Human Comparison */}
      <AIvsHumanComparison />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-700 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Deliver 5-Star Service 24/7?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join leading hotels and resorts using AI to capture more bookings 
              and deliver exceptional guest experiences around the clock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-12 py-5 bg-white text-indigo-700 font-bold text-xl rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Your Free Trial
                <FaArrowRight className="ml-3" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center px-12 py-5 bg-indigo-800 text-white font-bold text-xl rounded-xl hover:bg-indigo-900 transition-all border-2 border-indigo-500"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hospitality;
