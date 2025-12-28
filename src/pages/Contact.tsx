import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
  FaCheck,
  FaSpinner,
  FaShieldAlt,
  FaHeadset,
  FaGlobe,
  FaCalendarCheck
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const topics = [
    { value: '', label: 'Select a topic' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing' },
    { value: 'media', label: 'Media / Press' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xkgbykwq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          topic: formData.topic || 'General Inquiry',
          message: formData.message,
          _subject: `${formData.topic ? `[${formData.topic}] ` : ''}Contact from ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`,
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', topic: '', message: '' });

    } catch (err) {
      console.error('Form submission error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
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
        availableLanguage: ['English', 'Spanish'],
        areaServed: 'Worldwide'
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        page="contact"
        structuredData={[
          structuredDataTemplates.organization,
          contactStructuredData
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-sm text-gray-400">Get in Touch</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
              Let's{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-400">
              Have a question, partnership idea, or need support? We're here to help.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-medium text-white mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-gray-500">
                    We'll get back to you within 24 hours
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                          autoComplete="name"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                          autoComplete="email"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Inc."
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                          autoComplete="organization"
                        />
                      </div>

                      {/* Topic */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                          Topic
                        </label>
                        <select
                          name="topic"
                          value={formData.topic}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                        >
                          {topics.map((topic) => (
                            <option key={topic.value} value={topic.value} className="bg-gray-900">
                              {topic.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="How can we help you?"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm resize-none"
                        />
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-400 text-sm"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <FaArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                        <FaCheck className="text-xl text-green-500" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-400 text-sm mb-5">
                        We'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Schedule Demo Card */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <FaCalendarCheck className="text-xl text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1">
                      Want to See a Demo?
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Book a free 30-minute demo to see how AI can transform your business.
                    </p>
                    <Link
                      to="/demo"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium rounded-xl transition-all text-sm shadow-lg shadow-cyan-500/25"
                    >
                      Schedule Demo
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+12176938413"
                    className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <FaPhone className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Phone</div>
                      <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">+1 (217) 693-8413</div>
                    </div>
                  </a>

                  <a
                    href="mailto:emrebenian@cogniaai.com"
                    className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <FaEnvelope className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Email</div>
                      <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">emrebenian@cogniaai.com</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/cognia-ai-usa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.08] transition-all group"
                  >
                    <FaLinkedin className="text-xl text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/cognia.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.08] transition-all group"
                  >
                    <FaInstagram className="text-xl text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Instagram</span>
                  </a>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <FaShieldAlt className="text-xl text-cyan-400 mx-auto mb-2" />
                  <div className="text-xs text-gray-400">HIPAA Compliant</div>
                </div>
                <div className="text-center p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <FaHeadset className="text-xl text-cyan-400 mx-auto mb-2" />
                  <div className="text-xs text-gray-400">24/7 Support</div>
                </div>
                <div className="text-center p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <FaGlobe className="text-xl text-cyan-400 mx-auto mb-2" />
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
