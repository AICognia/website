'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  FaCogs,
  FaPlug,
  FaLifeRing,
  FaShieldAlt,
  FaCheckCircle,
  FaFileAlt,
  FaBrain,
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaMicrochip
} from 'react-icons/fa'
import { ArrowRight, Sparkles, Settings, Lock, Headphones } from 'lucide-react'
import SEO from '../../components/SEO'
import HeroBackgroundGrid from '../../components/HeroBackgroundGrid'
import MobileHeroBackground from '../../components/MobileHeroBackground'

const CustomAI: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    challenge: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const glassStyle = {
    borderWidth: '0.5px',
    background: 'var(--hero-glass-bg)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    boxShadow: 'var(--hero-glass-shadow)',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert('Thank you! Our AI architects will be in touch soon.')
    setFormData({ name: '', email: '', company: '', challenge: '' })
  }

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const accordionGlassStyle = (isExpanded: boolean) => ({
    background: isExpanded ? 'var(--accordion-bg-expanded)' : 'var(--accordion-bg)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: isExpanded ? 'var(--accordion-shadow-expanded)' : 'var(--accordion-shadow)',
  })

  const approach = [
    {
      icon: FaBrain,
      title: 'RAG Systems',
      description: 'AI that actually knows your business. Retrieval-augmented generation connects AI to your documents, data, and knowledge for accurate, contextual answers.',
      features: ['Document Search', 'Contextual Answers', 'Source Citations', 'Real-time Updates']
    },
    {
      icon: FaDatabase,
      title: 'Vector Database & Knowledge Base',
      description: 'Semantic search across all your data. All docs instantly searchable by AI. Find information by meaning, not just keywords.',
      features: ['Semantic Search', 'Embeddings', 'Fast Retrieval', 'Scalable Storage']
    },
    {
      icon: FaChartLine,
      title: 'BI Dashboards & Predictive Models',
      description: 'Real-time insights without SQL. Forecast demand, churn, and inventory. Turn your data into actionable intelligence.',
      features: ['Real-time Insights', 'Demand Forecasting', 'Churn Prediction', 'No SQL Required']
    },
    {
      icon: FaPlug,
      title: 'API Integrations',
      description: 'Connect all your existing tools. Works seamlessly with your current systems. We adapt to your tech stack, not the other way around.',
      features: ['500+ Connectors', 'Custom APIs', 'Real-time Sync', 'Zero Disruption']
    }
  ]

  const capabilities = [
    { icon: FaBrain, text: 'RAG Systems: AI that actually knows your business' },
    { icon: FaDatabase, text: 'Vector Database: Semantic search across all data' },
    { icon: FaFileAlt, text: 'Knowledge Base: All docs instantly searchable by AI' },
    { icon: FaChartLine, text: 'BI Dashboards: Real-time insights without SQL' },
    { icon: FaPlug, text: 'API Integrations: Connect all your existing tools' },
    { icon: FaMicrochip, text: 'Predictive Models: Forecast demand, churn, inventory' },
  ]

  const stats = [
    { value: '100+', label: 'Projects Delivered' },
    { value: '40%', label: 'Avg Cost Reduction' },
    { value: '3x', label: 'Faster Processing' },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle="Data Infrastructure for AI - RAG, Vector DB, BI Dashboards | Cognia AI"
        customDescription="RAG systems, vector databases, knowledge bases, BI dashboards, API integrations, and predictive models. Build the data foundation for AI that knows your business."
      />

      {/* Mobile Hero */}
      <section className="lg:hidden relative overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900">
        <div className="absolute inset-0">
          <MobileHeroBackground />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--hero-gradient-mobile)' }}
        />

        <div className="relative z-10 px-5 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 dark:bg-violet-500/20 dark:border-violet-400/30"
            >
              <div className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400" />
              <span className="text-xs font-semibold tracking-wide text-violet-700 dark:text-violet-300">
                Custom AI Solutions
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[2rem] leading-[1.15] font-serif font-light tracking-tight mb-5 text-slate-900 dark:text-white"
          >
            Data Infrastructure{' '}
            <span className="text-violet-600 dark:text-violet-400">
              for AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base leading-relaxed mb-8 text-slate-600 dark:text-gray-300"
          >
            RAG, vector DB, knowledge base, BI dashboards, predictive models.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-between mb-8 px-2"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-serif font-medium text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider font-medium mt-1 text-slate-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-3"
          >
            <Link
              href="/demo"
              className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Desktop Hero */}
      <section className="hidden lg:flex h-screen max-h-[960px] min-h-[700px] flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />

        <div className="absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />

        <div
          className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{ background: 'var(--hero-radial-desktop)' }}
        />

        <div className="w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] 3xl:max-w-[1584px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10 flex-1 flex items-start pb-24" style={{ paddingTop: '10rem' }}>
          <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

            <motion.div
              className="col-span-12 lg:col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full border-[#e2e8f0] dark:border-violet-500/30"
              style={glassStyle}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 lg:mb-8 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200/60 dark:bg-violet-900/40 dark:from-violet-900/40 dark:to-violet-900/40 dark:border-violet-500/30"
                  style={{
                    boxShadow: 'var(--hero-badge-shadow)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full border-[1.5px] border-violet-500 dark:border-violet-400" />
                  <span className="text-xs font-semibold tracking-wide text-violet-700 dark:text-violet-400">
                    Custom AI Solutions
                  </span>
                </motion.div>

                <p className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-serif font-light leading-[1.08] mb-4 lg:mb-6 text-slate-900 dark:text-gray-100" aria-hidden="true">
                  Data Infrastructure<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                    for AI
                  </span>
                </p>

                <p className="text-base lg:text-lg 2xl:text-xl max-w-xl lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed text-slate-500 dark:text-gray-500">
                  RAG systems, vector databases, knowledge bases, BI dashboards, API integrations, and predictive models—the foundation for AI that knows your business.
                </p>

                <div className="flex flex-wrap items-stretch gap-3 lg:gap-4 mb-6 lg:mb-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 min-w-[110px] rounded-xl border px-4 py-3 border-slate-200/80 bg-white/50 dark:border-gray-700 dark:bg-gray-800/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className="text-2xl lg:text-3xl 2xl:text-4xl font-serif font-normal text-slate-800 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-[9px] 2xl:text-[10px] uppercase tracking-[0.12em] font-medium mt-1 text-slate-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/demo"
                    className="btn-primary h-11 sm:h-12 px-5 sm:px-6 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Sparkles className="w-4 h-4" />
                    Discuss Your Project
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full pointer-events-auto border-[#e2e8f0] dark:border-gray-700"
              style={glassStyle}
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal mb-2 text-slate-900 dark:text-gray-100">
                  Data Infrastructure We Build
                </h2>
                <p className="text-sm sm:text-base mb-5 sm:mb-8 text-slate-500 dark:text-gray-400">
                  The foundation for AI that knows your business.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {capabilities.map((capability, i) => {
                    const Icon = capability.icon
                    return (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 sm:gap-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 bg-violet-50 border border-violet-100 dark:bg-violet-900/50 dark:border-violet-500/30">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-200">
                          {capability.text}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>

{/* HIDDEN: Compliance badges - uncomment to re-enable
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className={`flex items-center justify-center gap-3 sm:gap-4 flex-wrap grayscale opacity-60 dark:grayscale-0 dark:opacity-50`}>
                    <img src="/SOC2_Type1.svg" alt="SOC 2 Type I Certified" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                    <img src="/SOC2_Type2.svg" alt="SOC 2 Type II Certified" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                    <img src="/HIPAA.svg" alt="HIPAA Compliant" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                  </div>
                </div>
                */}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative bg-slate-50/50 dark:bg-gray-800/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-32"
            >
              <span className="inline-block px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full mb-4 sm:mb-6 text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-900/30">
                Data Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
                The Foundation for Smart AI
              </h2>
              <p className="text-base sm:text-lg mb-4 text-slate-600 dark:text-gray-400">
                RAG systems, vector databases, knowledge bases, BI dashboards, and predictive models—everything your AI needs to truly understand your business.
              </p>

              <Link
                href="/demo"
                className="btn-primary h-10 sm:h-11 px-5 sm:px-6 rounded-full text-xs sm:text-sm inline-flex mt-5 sm:mt-8 w-full sm:w-auto justify-center"
              >
                <span>Start Your Project</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2 sm:space-y-3"
            >
              {approach.map((item, index) => {
                const isExpanded = expandedId === index
                const Icon = item.icon

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`
                      rounded-lg sm:rounded-xl border transition-all duration-300
                      ${isExpanded
                        ? 'border-gray-200/80 dark:border-gray-700/80'
                        : 'border-gray-200/50 hover:border-gray-200/80 dark:border-gray-700/50 dark:hover:border-gray-700/70'
                      }
                    `}
                    style={accordionGlassStyle(isExpanded)}
                  >
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3.5">
                        <div className={`
                          w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0
                          ${isExpanded
                            ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600'
                          }
                        `}>
                          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h3 className={`
                          text-sm sm:text-[15px] font-semibold transition-colors duration-200
                          ${isExpanded
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100'}
                        `}>
                          {item.title}
                        </h3>
                      </div>

                      <div className={`
                        w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                        ${isExpanded
                          ? 'bg-violet-500/10 text-violet-500'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-500 dark:group-hover:bg-gray-600'
                        }
                      `}>
                        <motion.svg
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 sm:px-5 pb-4 sm:pb-5 pt-0 pl-[2.75rem] sm:pl-[3.75rem]">
                            <p className="text-[13px] sm:text-[14px] leading-relaxed mb-3 sm:mb-4 text-slate-600 dark:text-gray-400">
                              {item.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {item.features.map((f, i) => (
                                <span
                                  key={i}
                                  className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-slate-50/50 dark:bg-gray-800/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border p-6 sm:p-8 lg:p-12 xl:p-16 text-center border-slate-200 dark:border-gray-700"
            style={glassStyle}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
              Ready to Build Your Data Foundation?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-5 sm:mb-8 text-slate-600 dark:text-gray-400">
              Let's discuss RAG systems, vector databases, BI dashboards, and predictive models for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/demo"
                className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg w-full sm:w-auto"
              >
                <Sparkles className="w-5 h-5" />
                Book Free Consultation
              </Link>
            </div>

            <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
              {['Free Consultation', 'No Commitment', 'Expert Architects', 'Custom Proposal'].map((item, i) => (
                <span key={i} className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-slate-500 dark:text-gray-500">
                  <FaCheckCircle className="text-[10px] sm:text-xs text-violet-500 dark:text-violet-400" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CustomAI
