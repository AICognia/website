import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import SEO from '../components/SEO';
import HealthcareSection from '../components/HealthcareSection';
import LiveTranscript from '../components/LiveTranscript';
import PerformanceMetrics from '../components/PerformanceMetrics';
import AIvsHumanComparison from '../components/AIvsHumanComparison';

const Healthcare: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'Healthcare', url: '/healthcare' }
  ];

  const healthcareStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Cognia AI Healthcare Solutions',
    description: 'AI receptionist for healthcare providers. HIPAA compliant, PMS integration, automated appointment scheduling.',
    url: 'https://cogniaai.com/healthcare',
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
        structuredData={[healthcareStructuredData]}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center bg-cyan-100 px-4 py-2 rounded-full mb-6">
              <span className="text-cyan-900 font-semibold">HEALTHCARE SOLUTIONS</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI Receptionist Built for Healthcare
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-cyan-100 max-w-3xl mx-auto">
              From solo practitioners to hospital systems. HIPAA compliant, PMS integrated, 
              and designed to handle the unique needs of healthcare providers.
            </p>
            
            <div className="bg-cyan-800/30 backdrop-blur rounded-xl p-6 mb-8 max-w-2xl mx-auto border border-cyan-500/30">
              <p className="text-3xl font-bold text-cyan-300 mb-2">
                Save $50,000/month in missed appointments
              </p>
              <p className="text-lg text-cyan-200">
                42% of patients won't call back • Average loss: $200-5,000 per missed appointment
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-cyan-900 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Get Your Free Demo
                <FaArrowRight className="ml-2" />
              </a>
              <a 
                href="tel:+16163263328"
                className="inline-flex items-center px-8 py-4 bg-cyan-700 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all border-2 border-cyan-500"
              >
                <FaPhone className="mr-2" />
                Call AI: +1 616 326-3328
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Healthcare Section Component */}
      <HealthcareSection />

      {/* Live Demo Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-gray-300">
              Watch how our AI handles real healthcare scenarios
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-white font-bold text-xl mb-4">Live Patient Call</h3>
              <LiveTranscript industry="healthcare" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-white font-bold text-xl mb-4">Performance Dashboard</h3>
              <PerformanceMetrics industry="healthcare" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI vs Human Comparison */}
      <AIvsHumanComparison />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-700 to-teal-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Stop Losing Patients to Voicemail?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of healthcare providers already using AI to capture more appointments 
              and deliver better patient experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-12 py-5 bg-white text-cyan-700 font-bold text-xl rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Your Free Trial
                <FaArrowRight className="ml-3" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center px-12 py-5 bg-cyan-800 text-white font-bold text-xl rounded-xl hover:bg-cyan-900 transition-all border-2 border-cyan-500"
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

export default Healthcare;
