'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCheckCircle, FaSpinner } from 'react-icons/fa'

const FinalCTASection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    challenge: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/mqarlrwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Consultation Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'consultation_request',
          source: 'final_cta_section',
          submitted_at: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', role: '', challenge: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="py-12 sm:py-24 md:py-32 bg-white relative">
      <div className="container-responsive px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-slate-900 mb-3 sm:mb-6">
              Ready to Transform?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2 sm:px-0">
              Schedule a consultation. We'll show you exactly where AI can move the needle in your business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="Your role"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="challenge" className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                  What's your biggest operational challenge?
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  rows={3}
                  value={formData.challenge}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-base sm:rows-4"
                  placeholder="Tell us about your data, operations, or processes that could benefit from AI..."
                />
              </div>

              <div className="text-center pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 h-12 sm:h-14 px-6 sm:px-10 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full transition-all text-base sm:text-lg group w-full sm:w-auto min-h-[44px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Schedule a Consultation</span>
                      <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl text-center text-sm font-medium ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {submitStatus === 'success'
                    ? 'Thank you! We\'ll be in touch soon.'
                    : 'Something went wrong. Please try again.'}
                </motion.div>
              )}
            </form>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-6 mt-4 sm:mt-8 pt-4 sm:pt-8 border-t border-slate-200">
              <span className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                No obligation
              </span>
              <span className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                30-minute call
              </span>
              <span className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                Custom assessment
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
