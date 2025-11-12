import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone, FaEnvelope, FaLinkedin,
  FaInstagram, FaPaperPlane, FaRocket, FaCheckCircle,
  FaClock, FaGlobe, FaShieldAlt, FaChevronRight
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xkgbykwq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(language === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Message sent successfully!');
        // Reset form
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(language === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setStatusMessage(language === 'tr' ? 'Bağlantı hatası. Lütfen daha sonra tekrar deneyin.' : 'Connection error. Please try again later.');
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
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
        telephone: '+1-616-326-3328',
        contactType: 'sales',
        availableLanguage: ['English', 'Turkish', 'Spanish'],
        areaServed: 'Worldwide'
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <DynamicTechBackground />

      <SEO
        page="contact"
        structuredData={[
          structuredDataTemplates.organization,
          contactStructuredData
        ]}
      />

      {/* Hero Section */}
      <TechSection noPadding className="pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Tech Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-green-500" />
              <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">
                    {language === 'tr' ? 'İletişim Merkezi' : 'Contact Hub'}
                  </span>
                </div>
              </div>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-green-500" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-6">
            <span className="block">
              <span className="font-extralight text-gray-400">
                {language === 'tr' ? 'İnovasyon' : 'Innovation'}
              </span>
            </span>
            <span className="block font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              {language === 'tr' ? 'Başlar Buradan' : 'Starts Here'}
            </span>
          </h1>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gray-600" />
            <p className="text-lg sm:text-xl text-gray-400 font-light max-w-3xl">
              {language === 'tr'
                ? 'Enterprise AI çözümleriniz için doğrudan iletişim kanalı.'
                : 'Direct line to your enterprise AI transformation.'}
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gray-600" />
          </div>
        </motion.div>
      </TechSection>

      {/* Contact Form Section */}
      <TechSection
        badge={language === 'tr' ? 'Bize Ulaşın' : 'Get in Touch'}
        badgeColor="green"
        title={language === 'tr' ? 'Hadi Başlayalım' : "Let's Connect"}
        titleColor="green"
        subtitle={language === 'tr'
          ? 'AI dönüşüm yolculuğunuza bugün başlayın'
          : 'Start your AI transformation journey today'}
      >
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TechCard glowColor="green" hoverable={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                  <FaRocket className="text-2xl text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {language === 'tr' ? 'Mesaj Gönderin' : 'Send Message'}
                  </h2>
                  <p className="text-sm text-gray-400 font-light">
                    {language === 'tr' ? '24 saat içinde yanıt garantisi' : 'Guaranteed response within 24 hours'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Form Fields */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    {language === 'tr' ? 'Ad Soyad' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-black/70 transition-all"
                    placeholder={language === 'tr' ? 'Adınız Soyadınız' : 'John Doe'}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    {language === 'tr' ? 'E-posta' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-black/70 transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    {language === 'tr' ? 'Şirket' : 'Company'}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-black/70 transition-all"
                    placeholder={language === 'tr' ? 'Şirket Adı' : 'Company Name'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    {language === 'tr' ? 'Mesajınız' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-black/70 transition-all resize-none"
                    placeholder={language === 'tr' ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-400/50 text-green-400 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300" />
                </motion.button>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-3 rounded-xl text-center text-sm font-medium ${
                      submitStatus === 'success'
                        ? 'bg-green-500/10 text-green-300 border border-green-500/30'
                        : 'bg-red-500/10 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {statusMessage}
                  </motion.div>
                )}
              </form>
            </TechCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quick Actions Card */}
            <TechCard glowColor="cyan" hoverable={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                  <FaClock className="text-2xl text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {language === 'tr' ? 'Hızlı Erişim' : 'Quick Access'}
                  </h3>
                  <p className="text-sm text-gray-400 font-light">
                    {language === 'tr' ? 'Anında iletişime geçin' : 'Connect instantly'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-black/30 border border-cyan-500/20 rounded-xl group hover:border-cyan-400/40 transition-all"
                >
                  <div>
                    <div className="font-semibold text-white">
                      {language === 'tr' ? '30 Dakikalık Demo' : 'Schedule 30-min Demo'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {language === 'tr' ? 'Canlı ürün tanıtımı' : 'Live product walkthrough'}
                    </div>
                  </div>
                  <FaChevronRight className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="grid gap-3">
                  <a
                    href="tel:+16163263328"
                    className="flex items-center gap-3 p-3 bg-black/30 border border-gray-700/30 rounded-xl hover:border-gray-600/40 transition-all"
                  >
                    <FaPhone className="text-green-400" />
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {language === 'tr' ? 'Telefon' : 'Phone'}
                      </div>
                      <div className="text-white font-semibold">+1 616 326 3328</div>
                    </div>
                  </a>

                  <a
                    href="mailto:emrebenian@cogniaai.com"
                    className="flex items-center gap-3 p-3 bg-black/30 border border-gray-700/30 rounded-xl hover:border-gray-600/40 transition-all"
                  >
                    <FaEnvelope className="text-purple-400" />
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {language === 'tr' ? 'E-posta' : 'Email'}
                      </div>
                      <div className="text-white font-semibold text-sm">emrebenian@cogniaai.com</div>
                    </div>
                  </a>
                </div>
              </div>
            </TechCard>

            {/* Global Presence Card */}
            <TechCard glowColor="purple" hoverable={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <FaGlobe className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {language === 'tr' ? 'Global Erişim' : 'Global Reach'}
                  </h3>
                  <p className="text-sm text-gray-400 font-light">
                    {language === 'tr' ? '7/24 destek' : '24/7 support worldwide'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { location: 'USA', role: 'Headquarters', color: 'text-cyan-400' },
                  { location: 'EU', role: 'Operations', color: 'text-blue-400' },
                  { location: 'ASIA', role: 'Support', color: 'text-purple-400' }
                ].map((office, index) => (
                  <div key={index} className="text-center p-3 bg-black/30 rounded-xl border border-gray-700/30">
                    <div className={`text-xl font-bold ${office.color}`}>{office.location}</div>
                    <div className="text-xs text-gray-500">{office.role}</div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/cognia-ai-usa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 bg-blue-500/10 rounded-xl text-center hover:bg-blue-500/20 transition-all border border-blue-500/20 hover:border-blue-400/40"
                >
                  <FaLinkedin className="text-blue-400 text-xl mx-auto" />
                </a>
                <a
                  href="https://www.instagram.com/cognia.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 bg-pink-500/10 rounded-xl text-center hover:bg-pink-500/20 transition-all border border-pink-500/20 hover:border-pink-400/40"
                >
                  <FaInstagram className="text-pink-400 text-xl mx-auto" />
                </a>
              </div>
            </TechCard>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <FaShieldAlt className="text-2xl text-green-400" />, label: 'SOC2 Compliant' },
                { icon: <FaCheckCircle className="text-2xl text-blue-400" />, label: 'HIPAA Ready' },
                { icon: <FaGlobe className="text-2xl text-purple-400" />, label: '20+ Languages' }
              ].map((indicator, index) => (
                <div key={index} className="text-center p-4 bg-black/50 backdrop-blur-sm border border-gray-700/30 rounded-xl">
                  <div className="mx-auto mb-2">{indicator.icon}</div>
                  <div className="text-xs text-gray-400">{indicator.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </TechSection>
    </div>
  );
};

export default Contact;