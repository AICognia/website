import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTrendingUp, FiGlobe, FiAward } from 'react-icons/fi';
import { BsLightbulb, BsShieldCheck } from 'react-icons/bs';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  const stats = [
    { number: '2021', label: t('about.founded') || 'Founded' },
    { number: '25+', label: t('about.experts') || 'Expert Team' },
    { number: '100+', label: t('about.clients') || 'Happy Clients' },
    { number: '3M+', label: t('about.messages') || 'Messages Processed' }
  ];

  const features = [
    {
      icon: <FiGlobe className="text-3xl" />,
      title: t('about.global'),
      description: t('about.globalDesc')
    },
    {
      icon: <BsLightbulb className="text-3xl" />,
      title: t('about.innovation'),
      description: t('about.innovationDesc')
    },
    {
      icon: <BsShieldCheck className="text-3xl" />,
      title: t('about.support'),
      description: t('about.supportDesc')
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-primary to-darkBlue relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('about.title')}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
            {t('about.subtitle')}
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-secondary/20 to-primary/20 backdrop-blur-lg border border-secondary/30 rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <p className="text-lg text-white/90">
              {t('company.international')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇺🇸</span>
                <span className="text-white font-semibold">{t('company.usOffice')}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-secondary/30"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇹🇷</span>
                <span className="text-white font-semibold">{t('company.turkeyOffice')}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              {t('about.description')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-secondary/20"
                >
                  <div className="text-3xl font-bold text-secondary mb-1">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-darkBlue/50 backdrop-blur-lg border border-secondary/30 rounded-xl p-6 hover:border-secondary/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-secondary">{feature.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/70">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-gradient-to-br from-darkBlue/60 to-primary/30 backdrop-blur-lg border border-secondary/30 rounded-2xl p-8 hover:border-secondary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FiTrendingUp className="text-3xl text-secondary" />
              <h3 className="text-2xl font-bold text-white">{t('about.vision') || 'Our Vision'}</h3>
            </div>
            <p className="text-white/80">
              {t('about.visionText') || 'To empower businesses globally with cutting-edge AI solutions that transform how they operate, compete, and grow in the digital age.'}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary/30 to-darkBlue/60 backdrop-blur-lg border border-secondary/30 rounded-2xl p-8 hover:border-secondary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FiAward className="text-3xl text-secondary" />
              <h3 className="text-2xl font-bold text-white">{t('about.mission') || 'Our Mission'}</h3>
            </div>
            <p className="text-white/80">
              {t('about.missionText') || 'To democratize AI technology by making it accessible, affordable, and easy to implement for businesses of all sizes across the US and Turkey.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;