import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin,
  FaInstagram, FaPaperPlane, FaRocket, FaCheckCircle,
  FaClock, FaGlobe, FaShieldAlt
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';
import GradientOrbs from '../components/GradientOrbs';
import GridPattern from '../components/GridPattern';
import GlassCard from '../components/GlassCard';
import ParticleNetwork from '../components/ParticleNetwork';
import NoiseTexture from '../components/NoiseTexture';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Cognia AI',
      url: 'https://cogniaai.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-217-693-8413',
        contactType: 'sales',
        availableLanguage: ['English', 'Turkish', 'Spanish'],
        areaServed: 'Worldwide'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative">
      <NoiseTexture />

      <SEO
        page="contact"
        structuredData={[
          structuredDataTemplates.organization,
          contactStructuredData
        ]}
      />

      {/* Hero Section - Futuristic Design */}
      <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-32 pt-40 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 opacity-40">
          <ParticleNetwork />
        </div>
        <GridPattern className="opacity-20 animate-pulse-subtle" />
        <GradientOrbs />

        {/* Holographic Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-pulse" />
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-pulse animation-delay-400" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Futuristic Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 backdrop-blur-xl mb-10"
            >
              <div className="relative">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-green-400 to-emerald-400"></span>
                </span>
              </div>
              <span className="text-green-300 text-sm font-semibold tracking-wider uppercase">
                {language === 'tr' ? "İletişim Merkezi" : "Contact Hub"}
              </span>
            </motion.div>

            {/* Enhanced Headlines */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <motion.span
                className="block bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {language === 'tr' ? "İnovasyon" : "Innovation"}
              </motion.span>
              <motion.span
                className="block relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {language === 'tr' ? "Başlar Buradan" : "Starts Here"}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.span>
            </h1>

            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {language === 'tr'
                ? "Enterprise AI çözümleriniz için doğrudan iletişim kanalı."
                : "Direct line to your enterprise AI transformation."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Redesigned */}
      <section className="py-32 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative overflow-hidden">
        <GridPattern className="opacity-10" />

        {/* Animated Tech Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-pulse animation-delay-200" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl" />

                <GlassCard className="relative p-10 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                      <FaRocket className="text-2xl text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        {language === 'tr' ? 'Başlayalım' : 'Get Started'}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {language === 'tr' ? '24 saat içinde yanıt' : 'Response within 24 hours'}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Fields with Enhanced Styling */}
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400 uppercase tracking-wider">
                        {language === 'tr' ? 'Ad Soyad' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-gray-900/70 transition-all"
                        placeholder={language === 'tr' ? 'Adınız Soyadınız' : 'John Doe'}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-gray-400 uppercase tracking-wider">
                        {language === 'tr' ? 'E-posta' : 'Email'} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-gray-900/70 transition-all"
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-gray-400 uppercase tracking-wider">
                        {language === 'tr' ? 'Şirket' : 'Company'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-gray-900/70 transition-all"
                        placeholder={language === 'tr' ? 'Şirket Adı' : 'Company Name'}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-gray-400 uppercase tracking-wider">
                        {language === 'tr' ? 'Mesajınız' : 'Message'} *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-gray-900/70 transition-all resize-none"
                        placeholder={language === 'tr' ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'}
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">
                          {language === 'tr' ? 'Gönderiliyor...' : 'Sending...'}
                        </span>
                      ) : (
                        <>
                          <span>{language === 'tr' ? 'Mesajı Gönder' : 'Send Message'}</span>
                          <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
                    </motion.button>
                  </form>
                </GlassCard>
              </div>
            </motion.div>

            {/* Contact Information - Redesigned */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Quick Actions Card */}
              <GlassCard className="p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                    <FaClock className="text-2xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {language === 'tr' ? 'Hızlı Erişim' : 'Quick Access'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {language === 'tr' ? 'Anında iletişime geçin' : 'Connect instantly'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl hover:from-cyan-900/30 hover:to-blue-900/30 transition-all group"
                  >
                    <div>
                      <div className="font-semibold text-white">
                        {language === 'tr' ? '30 Dakikalık Demo' : 'Schedule 30-min Demo'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {language === 'tr' ? 'Canlı ürün tanıtımı' : 'Live product walkthrough'}
                      </div>
                    </div>
                    <FaRocket className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="tel:+12176938413"
                      className="p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all text-center"
                    >
                      <FaPhone className="text-green-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-300">
                        {language === 'tr' ? 'Hemen Ara' : 'Call Now'}
                      </div>
                    </a>
                    <a
                      href="mailto:emrebenian@cogniaai.com"
                      className="p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all text-center"
                    >
                      <FaEnvelope className="text-purple-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-300">
                        {language === 'tr' ? 'Email Gönder' : 'Send Email'}
                      </div>
                    </a>
                  </div>
                </div>
              </GlassCard>

              {/* Global Presence Card */}
              <GlassCard className="p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <FaGlobe className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {language === 'tr' ? 'Global Erişim' : 'Global Reach'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {language === 'tr' ? '7/24 destek' : '24/7 support worldwide'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">USA</div>
                    <div className="text-xs text-gray-500">Headquarters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">EU</div>
                    <div className="text-xs text-gray-500">Operations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">ASIA</div>
                    <div className="text-xs text-gray-500">Support</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/cognia-ai-usa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all text-center"
                  >
                    <FaLinkedin className="text-blue-400 text-xl mx-auto" />
                  </a>
                  <a
                    href="https://www.instagram.com/cognia.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 bg-pink-500/10 rounded-xl hover:bg-pink-500/20 transition-all text-center"
                  >
                    <FaInstagram className="text-pink-400 text-xl mx-auto" />
                  </a>
                </div>
              </GlassCard>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <FaShieldAlt className="text-3xl text-green-400 mx-auto mb-2" />
                  <div className="text-xs text-gray-400">SOC2 Compliant</div>
                </div>
                <div className="text-center">
                  <FaCheckCircle className="text-3xl text-blue-400 mx-auto mb-2" />
                  <div className="text-xs text-gray-400">HIPAA Ready</div>
                </div>
                <div className="text-center">
                  <FaGlobe className="text-3xl text-purple-400 mx-auto mb-2" />
                  <div className="text-xs text-gray-400">20+ Languages</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;