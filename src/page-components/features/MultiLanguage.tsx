import React from 'react';
import { FaLanguage, FaGlobe, FaUserFriends, FaCheckCircle, FaPhone, FaRobot, FaMapMarked, FaComments, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
const MultiLanguage: React.FC = () => {

  return (
    <div className="min-h-screen bg-transparent text-gray-900 relative overflow-hidden">

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-16 sm:py-24 lg:py-32">
          <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] mx-auto pt-24 sm:pt-20 md:pt-16 lg:pt-0">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 rounded-full mb-4 sm:mb-6">
                <span className="text-xs text-[rgba(49,45,43,0.70)] uppercase tracking-widest">Feature</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-thin text-[#37322F] mb-4 sm:mb-6">
                Multi-Language Support
                <br />
                Speak Every Customer's Language
              </h1>

              <p className="text-base sm:text-lg text-[rgba(49,45,43,0.70)] max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                Communicate with customers in 30+ languages automatically. AI detects the language and responds fluently, providing a native experience for every caller.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                  <FaArrowRight className="text-sm" />
                </Link>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
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
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-xl sm:text-2xl text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{feature.description}</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Americas & Europe</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> English (US, UK, AU)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Spanish (ES, LATAM)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> French (FR, CA)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Portuguese (BR, PT)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> German</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Italian</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Dutch</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Russian</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Asia & Pacific</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Mandarin Chinese</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Japanese</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Korean</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Hindi</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Thai</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Vietnamese</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Indonesian</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Tagalog</li>
                  </ul>
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Middle East & Africa</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Arabic (Standard, Gulf)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Hebrew</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Turkish</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Persian (Farsi)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Urdu</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Swahili</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Afrikaans</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> + more languages</li>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { value: '30+', label: 'Languages', suffix: '' },
              { value: '85%', label: 'Customer Satisfaction', suffix: '↑' },
              { value: '2.5x', label: 'Market Reach', suffix: '' },
              { value: '100%', label: 'Accurate Translation', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#37322F] mb-1 sm:mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-lg sm:text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready to Go Global?"
          subtitle="Communicate with every customer in their native language"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
              >
                <FaCalendarCheck />
                Schedule Demo
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/solutions"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto text-center"
              >
                View All Features
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-gray-500">
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
