import React, { useState } from 'react';
import {
  FaPhone, FaEnvelope, FaLinkedin,
  FaInstagram, FaPaperPlane, FaCheckCircle,
  FaGlobe, FaShieldAlt, FaCalendarCheck, FaArrowRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';
import ScrollProgress from '../components/ScrollProgress';
import { Link } from 'react-router-dom';

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
      <ScrollProgress />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO
          page="contact"
          structuredData={[
            structuredDataTemplates.organization,
            contactStructuredData
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {language === 'tr' ? 'Bize Ulaşın' : 'Get in Touch'}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                {language === 'tr' ? 'Hadi Başlayalım' : "Let's Connect"}
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {language === 'tr'
                  ? 'AI dönüşüm yolculuğunuza bugün başlayın'
                  : 'Start your AI transformation journey today'}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <TechSection>
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <TechCard>
              <div className="mb-6">
                <h2 className="text-2xl font-medium text-white mb-2">
                  {language === 'tr' ? 'Mesaj Gönderin' : 'Send Message'}
                </h2>
                <p className="text-sm text-gray-400">
                  {language === 'tr' ? '24 saat içinde yanıt garantisi' : 'Guaranteed response within 24 hours'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    {language === 'tr' ? 'Ad Soyad' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                    placeholder={language === 'tr' ? 'Adınız Soyadınız' : 'John Doe'}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    {language === 'tr' ? 'E-posta' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    {language === 'tr' ? 'Şirket' : 'Company'}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                    placeholder={language === 'tr' ? 'Şirket Adı' : 'Company Name'}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    {language === 'tr' ? 'Mesajınız' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
                    placeholder={language === 'tr' ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>{language === 'tr' ? 'Gönderiliyor...' : 'Sending...'}</span>
                  ) : (
                    <>
                      <span>{language === 'tr' ? 'Mesajı Gönder' : 'Send Message'}</span>
                      <FaPaperPlane />
                    </>
                  )}
                </button>

                {submitStatus !== 'idle' && (
                  <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                    submitStatus === 'success'
                      ? 'bg-green-500/10 text-green-300 border border-green-500/20'
                      : 'bg-red-500/10 text-red-300 border border-red-500/20'
                  }`}>
                    {statusMessage}
                  </div>
                )}
              </form>
            </TechCard>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <TechCard>
                <h3 className="text-xl font-medium text-white mb-4">
                  {language === 'tr' ? 'Hızlı Erişim' : 'Quick Access'}
                </h3>

                <div className="space-y-3">
                  <Link
                    to="/demo"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                  >
                    <FaCalendarCheck />
                    <span>{language === 'tr' ? '30 Dakikalık Demo' : 'Schedule 30-min Demo'}</span>
                    <FaArrowRight className="ml-auto" />
                  </Link>

                  <a
                    href="tel:+12176938413"
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                  >
                    <FaPhone className="text-white" />
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {language === 'tr' ? 'Telefon' : 'Phone'}
                      </div>
                      <div className="text-white font-medium">+1 217 693 8413</div>
                    </div>
                  </a>

                  <a
                    href="mailto:emrebenian@cogniaai.com"
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                  >
                    <FaEnvelope className="text-white" />
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {language === 'tr' ? 'E-posta' : 'Email'}
                      </div>
                      <div className="text-white font-medium text-sm">emrebenian@cogniaai.com</div>
                    </div>
                  </a>
                </div>
              </TechCard>

              {/* Social Links */}
              <TechCard>
                <h3 className="text-xl font-medium text-white mb-4">
                  {language === 'tr' ? 'Sosyal Medya' : 'Social Media'}
                </h3>

                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/cognia-ai-usa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <FaLinkedin className="text-white text-2xl mx-auto" />
                  </a>
                  <a
                    href="https://www.instagram.com/cognia.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <FaInstagram className="text-white text-2xl mx-auto" />
                  </a>
                </div>
              </TechCard>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: FaShieldAlt, label: 'HIPAA' },
                  { icon: FaCheckCircle, label: '24/7 Support' },
                  { icon: FaGlobe, label: '20+ Languages' }
                ].map((indicator, index) => (
                  <div key={index} className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                    <indicator.icon className="text-2xl text-white mx-auto mb-2" />
                    <div className="text-xs text-gray-400">{indicator.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Contact;
