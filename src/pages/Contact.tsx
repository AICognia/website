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


      {/* Contact Form Section */}
      <TechSection
        badge={language === 'tr' ? 'Bize Ulaşın' : 'Get in Touch'}
        badgeColor="green"
        title={language === 'tr' ? 'Hadi Başlayalım' : "Let's Connect"}
        titleColor="green"
        subtitle={language === 'tr'
          ? 'AI dönüşüm yolculuğunuza bugün başlayın'
          : 'Start your AI transformation journey today'}
        className="pt-28"
      >
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glowing backdrop effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 rounded-2xl blur-2xl opacity-30" />

            <div className="relative bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 shadow-2xl">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-500/50 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-green-500/50 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-green-500/50 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-500/50 rounded-br-2xl" />

              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 shadow-lg shadow-green-500/20">
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
                <div className="space-y-2">
                  <label className="text-xs text-green-400 uppercase tracking-wider font-semibold">
                    {language === 'tr' ? 'Ad Soyad' : 'Full Name'} *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900/80 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300"
                      placeholder={language === 'tr' ? 'Adınız Soyadınız' : 'John Doe'}
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-focus-within:from-green-500/10 group-focus-within:to-emerald-500/10 pointer-events-none transition-all duration-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-green-400 uppercase tracking-wider font-semibold">
                    {language === 'tr' ? 'E-posta' : 'Email'} *
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900/80 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300"
                      placeholder="john@company.com"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-focus-within:from-green-500/10 group-focus-within:to-emerald-500/10 pointer-events-none transition-all duration-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-green-400 uppercase tracking-wider font-semibold">
                    {language === 'tr' ? 'Şirket' : 'Company'}
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900/80 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300"
                      placeholder={language === 'tr' ? 'Şirket Adı' : 'Company Name'}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-focus-within:from-green-500/10 group-focus-within:to-emerald-500/10 pointer-events-none transition-all duration-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-green-400 uppercase tracking-wider font-semibold">
                    {language === 'tr' ? 'Mesajınız' : 'Message'} *
                  </label>
                  <div className="relative group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900/80 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 resize-none"
                      placeholder={language === 'tr' ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'}
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-focus-within:from-green-500/10 group-focus-within:to-emerald-500/10 pointer-events-none transition-all duration-300" />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative"
                >
                  {/* Glowing effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse" />

                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-bold shadow-lg">
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
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
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
            </div>
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