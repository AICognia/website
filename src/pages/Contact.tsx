import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaCheck,
  FaSpinner,
  FaLinkedin
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const topics = [
    { value: '', label: 'Select a topic' },
    { value: 'partnership', label: 'Partnership Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'media', label: 'Media / Press' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.topic || !formData.message) {
      setError('Please fill in all fields');
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
          topic: formData.topic,
          message: formData.message,
          _subject: `[${formData.topic}] Contact from ${formData.name}`,
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', topic: '', message: '' });

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
        telephone: '+1-616-326-3328',
        contactType: 'sales',
        availableLanguage: ['English', 'Spanish'],
        areaServed: 'Worldwide'
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <SEO
        page="contact"
        structuredData={[
          structuredDataTemplates.organization,
          contactStructuredData
        ]}
      />

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/8 via-blue-500/5 to-purple-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg mx-auto px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl lg:text-3xl font-light text-white mb-2">
              Get in Touch
            </h1>
            <p className="text-sm text-gray-500">
              Questions, partnerships, or support — we're here to help
            </p>
          </div>

          {/* Form Card */}
          <div className="relative">
            {/* Subtle glow behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50" />

            <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                          Your Name
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
                          Email Address
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
                          Message
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
                            className="text-red-400 text-sm text-center"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
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
                    </form>

                    {/* Looking for a demo? */}
                    <p className="mt-5 text-center text-xs text-gray-500">
                      Looking to book a demo?{' '}
                      <Link to="/demo" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        Schedule here
                      </Link>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-8 text-center"
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
          </div>

          {/* Direct Contact Options */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href="tel:+16163263328"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaPhone className="text-xs" />
              <span>+1 (616) 326-3328</span>
            </a>
            <span className="hidden sm:block text-gray-700">•</span>
            <a
              href="mailto:hello@cogniaai.com"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaEnvelope className="text-xs" />
              <span>hello@cogniaai.com</span>
            </a>
            <span className="hidden sm:block text-gray-700">•</span>
            <a
              href="https://www.linkedin.com/company/cognia-ai-usa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin className="text-xs" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Trust indicator */}
          <p className="text-center text-xs text-gray-600 mt-6">
            We typically respond within 24 hours
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
