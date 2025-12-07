import React from 'react';
import { FaLanguage, FaGlobe, FaUserFriends, FaCheckCircle, FaPhone, FaRobot, FaMapMarked, FaComments, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';
import { useLeadCapture } from '../../contexts/LeadCaptureContext';

const MultiLanguage: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollProgress />

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Feature</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                Multi-Language Support
                <br />
                Speak Every Customer's Language
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Communicate with customers in 30+ languages automatically. AI detects the language and responds fluently, providing a native experience for every caller.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => openLeadCapture('multilanguage_hero')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                  <FaArrowRight className="text-sm" />
                </motion.button>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
                >
                  <FaPhone className="text-sm" />
                  +1 616-326-3328
                </a>
              </div>
            </div>
          </div>
        </section>

        <TechSection
          badge="Capabilities"
          title="Global Communication Made Simple"
          subtitle="Break down language barriers with AI"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaLanguage,
                title: '30+ Languages',
                description: 'Support for major global languages including Spanish, French, Mandarin, Arabic, and more.'
              },
              {
                icon: FaRobot,
                title: 'Auto-Detection',
                description: 'Automatically detects the customer\'s language and switches seamlessly mid-conversation.'
              },
              {
                icon: FaUserFriends,
                title: 'Native Fluency',
                description: 'Natural, fluent conversations that sound like native speakers, not robotic translations.'
              },
              {
                icon: FaGlobe,
                title: 'Cultural Awareness',
                description: 'Understands cultural nuances, local expressions, and region-specific terminology.'
              },
              {
                icon: FaComments,
                title: 'Real-Time Translation',
                description: 'Instant translation of customer requests and responses without delay.'
              },
              {
                icon: FaMapMarked,
                title: 'Regional Dialects',
                description: 'Handles regional variations and dialects within the same language.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Languages"
          title="Supported Languages"
          subtitle="Comprehensive global coverage"
        >
          <div className="max-w-6xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Americas & Europe</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> English (US, UK, AU)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Spanish (ES, LATAM)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> French (FR, CA)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Portuguese (BR, PT)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> German</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Italian</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Dutch</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Russian</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Asia & Pacific</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Mandarin Chinese</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Japanese</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Korean</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Hindi</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Thai</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Vietnamese</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Indonesian</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Tagalog</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Middle East & Africa</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Arabic (Standard, Gulf)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Hebrew</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Turkish</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Persian (Farsi)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Urdu</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Swahili</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Afrikaans</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> + more languages</li>
                  </ul>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        <TechSection
          badge="Benefits"
          title="Why Multi-Language Matters"
          subtitle="Expand your reach and improve customer experience"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '30+', label: 'Languages', suffix: '' },
              { value: '85%', label: 'Customer Satisfaction', suffix: '↑' },
              { value: '2.5x', label: 'Market Reach', suffix: '' },
              { value: '100%', label: 'Accurate Translation', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready to Go Global?"
          subtitle="Communicate with every customer in their native language"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                onClick={() => openLeadCapture('multilanguage_cta')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Schedule Demo
                <FaArrowRight className="text-sm" />
              </motion.button>
              <Link
                to="/solutions"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                View All Features
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />30+ Languages</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Auto-Detection</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Native Fluency</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Real-Time</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default MultiLanguage;
