import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaTwitter, FaPaperPlane } from 'react-icons/fa';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
    <div className="min-h-screen bg-gray-950 relative">
      <NoiseTexture />
      
      <SEO 
        page="contact"
        structuredData={[
          structuredDataTemplates.organization,
          contactStructuredData
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <ParticleNetwork />
        </div>
        <GridPattern className="opacity-10" />
        <GradientOrbs />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
              <span className="text-green-400 text-sm font-medium">
                {language === 'tr' ? "İletişime Geç" : "Get in Touch"}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {language === 'tr' ? "Başlayalım" : "Let's Start"}
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                {language === 'tr' ? "Konuşmaya" : "The Conversation"}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-400">
              {language === 'tr'
                ? "AI yolculuğunuza bugün başlayın. 48 saat içinde kurulum."
                : "Start your AI journey today. Setup within 48 hours."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <GridPattern className="opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  {language === 'tr' ? 'Mesaj Gönderin' : 'Send a Message'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">
                      {language === 'tr' ? 'Ad Soyad' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">
                      {language === 'tr' ? 'E-posta' : 'Email'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">
                      {language === 'tr' ? 'Şirket' : 'Company'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">
                      {language === 'tr' ? 'Mesajınız' : 'Your Message'}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    <span>{language === 'tr' ? 'Gönder' : 'Send Message'}</span>
                    <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                </form>
              </GlassCard>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Direct Contact Card */}
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {language === 'tr' ? 'Doğrudan İletişim' : 'Direct Contact'}
                </h3>
                
                <div className="space-y-4">
                  <a href="tel:+16163263328" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors">
                    <div className="p-3 rounded-lg bg-cyan-500/10">
                      <FaPhone className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-semibold">+1 616 326-3328</div>
                      <div className="text-sm text-gray-500">
                        {language === 'tr' ? 'AI Asistanı Deneyin' : 'Try our AI Assistant'}
                      </div>
                    </div>
                  </a>
                  
                  <a href="mailto:contact@cogniaai.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <FaEnvelope className="text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold">contact@cogniaai.com</div>
                      <div className="text-sm text-gray-500">
                        {language === 'tr' ? 'E-posta Gönderin' : 'Send us an email'}
                      </div>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="p-3 rounded-lg bg-green-500/10">
                      <FaMapMarkerAlt className="text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Global Presence</div>
                      <div className="text-sm text-gray-500">USA, Europe, Asia</div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Social Media Card */}
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {language === 'tr' ? 'Sosyal Medya' : 'Follow Us'}
                </h3>
                
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/cognia-ai-usa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                  >
                    <FaLinkedin className="text-blue-400 text-xl" />
                  </a>
                  <a
                    href="https://www.instagram.com/cognia.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
                  >
                    <FaInstagram className="text-pink-400 text-xl" />
                  </a>
                  <a
                    href="https://twitter.com/cogniaai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 transition-colors"
                  >
                    <FaTwitter className="text-sky-400 text-xl" />
                  </a>
                </div>
              </GlassCard>

              {/* Quick Links Card */}
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {language === 'tr' ? 'Hızlı Başlangıç' : 'Quick Start'}
                </h3>
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all"
                >
                  {language === 'tr' ? '30 Dakikalık Demo' : 'Book 30-min Demo'}
                </a>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-950 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === 'tr' ? 'Sık Sorulan Sorular' : 'Common Questions'}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: language === 'tr' ? 'Demo nasıl alırım?' : 'How do I get a demo?',
                a: language === 'tr' 
                  ? 'Yukarıdaki formu doldurun veya doğrudan bizi arayın. 24 saat içinde size dönüş yapacağız.'
                  : 'Fill out the form above or call us directly. We\'ll get back to you within 24 hours.'
              },
              {
                q: language === 'tr' ? 'Kurulum ne kadar sürer?' : 'How long is the setup?',
                a: language === 'tr'
                  ? '48 saat içinde sisteminiz hazır olur. Entegrasyon ve eğitim dahil.'
                  : 'Your system will be ready within 48 hours, including integration and training.'
              },
              {
                q: language === 'tr' ? 'Hangi sistemlerle entegre olur?' : 'What systems integrate?',
                a: language === 'tr'
                  ? 'Google Calendar, Outlook, Salesforce, HubSpot ve 100+ sistem ile entegre.'
                  : 'Integrates with Google Calendar, Outlook, Salesforce, HubSpot, and 100+ systems.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;