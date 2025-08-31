import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiHeadphones, FiZap, FiGlobe } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';
import { useLanguage } from '../contexts/LanguageContext';

const VoiceAgent: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <FiPhone className="text-2xl" />,
      title: t('voice.feature1.title'),
      description: t('voice.feature1.desc')
    },
    {
      icon: <FiGlobe className="text-2xl" />,
      title: t('voice.feature2.title'),
      description: t('voice.feature2.desc')
    },
    {
      icon: <FiZap className="text-2xl" />,
      title: t('voice.feature3.title'),
      description: t('voice.feature3.desc')
    }
  ];

  return (
    <section id="voice-agent" className="py-20 bg-gradient-to-br from-lightBlue to-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('voice.title')}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {t('voice.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('voice.whatIs')}
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                {t('voice.description')}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 bg-darkBlue/30 backdrop-blur-sm p-4 rounded-lg border border-secondary/20"
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-secondary">{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactCTA = document.querySelector('.contact-cta-section');
                if (contactCTA) {
                  contactCTA.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-8 bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 group"
            >
              <span>{t('voice.requestDemo')}</span>
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Column - Demo Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-darkBlue/40 backdrop-blur-lg border border-secondary/30 rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <FiHeadphones className="text-5xl text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-6">
                  {t('voice.tryNow')}
                </h3>

                {/* Phone Numbers */}
                <div className="mt-8 space-y-4">
                  <p className="text-white/90 text-lg mb-6">
                    {t('voice.callDemo')}
                  </p>
                  
                  {/* US Phone Number */}
                  <div className="space-y-3">
                    <p className="text-secondary font-semibold">{t('voice.demoUS')}</p>
                    <div className="bg-gradient-primary p-5 rounded-xl">
                      <a href="tel:+16163263328" className="flex items-center justify-center space-x-3 text-white hover:scale-105 transition-transform">
                        <FiPhone className="text-2xl" />
                        <span className="text-xl font-bold">+1 616 326-3328</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Turkey Phone Number */}
                  <div className="space-y-3">
                    <p className="text-secondary font-semibold">{t('voice.demoTR')}</p>
                    <div className="bg-gradient-primary p-5 rounded-xl">
                      <a href="tel:+908508402689" className="flex items-center justify-center space-x-3 text-white hover:scale-105 transition-transform">
                        <FiPhone className="text-2xl" />
                        <span className="text-xl font-bold">+90 850 840 26 89</span>
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm mt-4">
                    {t('voice.callNow')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-darkBlue/30 backdrop-blur-lg border border-secondary/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            {t('voice.fullAutomation')}
          </h3>
          <p className="text-white/80 max-w-3xl mx-auto">
            {t('voice.fullAutomationDesc')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceAgent; 