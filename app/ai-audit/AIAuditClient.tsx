'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaComments,
  FaEnvelope,
  FaSms,
  FaUserTie,
  FaFileInvoice,
  FaSync,
  FaChartLine,
  FaCalendarCheck,
  FaBrain,
  FaLayerGroup,
  FaPlug,
  FaCogs,
  FaRobot,
  FaChartBar,
  FaFileAlt,
  FaDatabase,
  FaTimes,
  FaCheck
} from 'react-icons/fa'
import HeroBackgroundGrid from '@/src/components/HeroBackgroundGrid'
import MobileHeroBackground from '@/src/components/MobileHeroBackground'

const AIAuditClient: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme === 'dark'

  const phases = [
    {
      number: '1',
      title: 'Discovery',
      duration: '2 weeks',
      description: 'Stakeholder interviews, workflow mapping, and data source identification',
      activities: [
        'Interview 3–6 key stakeholders across departments',
        'Map existing workflows and identify pain points',
        'Catalog data sources and connected systems',
        'Document decision-making bottlenecks'
      ],
      output: 'Process inventory with 8–15 documented workflows'
    },
    {
      number: '2',
      title: 'Assessment & Mapping',
      duration: '1 week',
      description: 'AI-readiness scoring, data maturity evaluation, and ROI projections',
      activities: [
        'Score opportunities by impact and effort',
        'Evaluate data maturity across systems',
        'Calculate projected ROI for each opportunity',
        'Prioritize implementation sequence'
      ],
      output: 'Scored opportunity matrix with ROI rankings'
    },
    {
      number: '3',
      title: 'Deliverable',
      duration: 'Final week',
      description: 'Comprehensive AI Readiness Report with roadmap and investment analysis',
      activities: [
        'Executive presentation (30–45 min)',
        'Detailed PDF report',
        'Phased implementation roadmap',
        'Investment and risk analysis'
      ],
      output: 'Complete AI transformation blueprint'
    },
  ]

  const deliverables = [
    { title: 'Executive Summary', desc: 'Current state overview, key findings, and investment summary' },
    { title: 'Current State Analysis', desc: 'Process inventory, data infrastructure audit, and maturity assessment' },
    { title: 'Opportunity Assessment', desc: 'Prioritized matrix with use case deep-dives and ROI projections' },
    { title: 'Recommended Roadmap', desc: 'Quick wins (0–6 mo), Foundation (6–12 mo), Transform (12–24 mo)' },
    { title: 'Investment & Risk', desc: 'Implementation costs, ongoing expenses, and risk mitigation strategies' },
    { title: 'Appendices', desc: 'Process documentation, interview summaries, and architecture diagrams' },
  ]

  const customerFacing = [
    { icon: FaComments, name: 'Chatbot', desc: '24/7 support that resolves issues, not just deflects them' },
    { icon: FaPhone, name: 'Voice Agent', desc: 'Phone calls answered and routed intelligently' },
    { icon: FaRobot, name: 'Lead Generation', desc: 'Qualify, score, and route leads automatically' },
    { icon: FaEnvelope, name: 'Email Agent', desc: 'Respond, follow up, and close deals at scale' },
    { icon: FaSms, name: 'SMS Automation', desc: 'Timely reminders and follow-ups without manual effort' },
    { icon: FaUserTie, name: 'Sales Assistant', desc: 'CRM enrichment and personalized outreach' },
  ]

  const internalOps = [
    { icon: FaFileInvoice, name: 'Document Processing', desc: 'Extract, classify, and route documents automatically' },
    { icon: FaSync, name: 'Workflow Automation', desc: 'Connect disparate systems and eliminate manual handoffs' },
    { icon: FaDatabase, name: 'Data Extraction', desc: 'Pull structured insights from any source or format' },
    { icon: FaChartBar, name: 'Report Generation', desc: 'Auto-generate weekly and monthly reports on schedule' },
    { icon: FaCheckCircle, name: 'Quality Control', desc: 'Catch errors before they become costly problems' },
    { icon: FaCalendarCheck, name: 'Scheduling Agent', desc: 'Book, confirm, and reschedule meetings seamlessly' },
  ]

  const dataInfra = [
    { icon: FaBrain, name: 'RAG Systems', desc: 'AI grounded in your organization\'s knowledge' },
    { icon: FaLayerGroup, name: 'Vector Database', desc: 'Semantic search across all your data assets' },
    { icon: FaFileAlt, name: 'Knowledge Base', desc: 'Every document instantly searchable by AI' },
    { icon: FaChartLine, name: 'BI Dashboards', desc: 'Real-time insights without writing SQL' },
    { icon: FaPlug, name: 'API Integrations', desc: 'Connect and orchestrate your existing tools' },
    { icon: FaCogs, name: 'Predictive Models', desc: 'Forecast demand, churn, and inventory needs' },
  ]

  const problems = [
    'Leads come in, but follow-up is inconsistent',
    'We have the data, but we can\'t act on it',
    'We tried AI tools, but nothing stuck',
    'We can\'t measure the ROI',
    'Our team spends hours on repetitive manual work'
  ]

  const typicalConsultants = [
    { text: 'Strategic advice', good: true },
    { text: 'Slide decks', good: true },
    { text: 'Recommendations', good: true },
    { text: 'No implementation', good: false },
    { text: 'No accountability', good: false },
    { text: 'Long engagements', good: false },
  ]

  const typicalDevShops = [
    { text: 'Technical builds', good: true },
    { text: 'Code delivery', good: true },
    { text: 'Fast execution', good: true },
    { text: 'No strategy', good: false },
    { text: 'Build wrong thing', good: false },
    { text: 'No ROI focus', good: false },
  ]

  const cogniaAI = [
    'Strategic roadmap',
    'ROI-ranked priorities',
    'We build what we recommend',
    '20+ successful transformations',
    'ROI measured in weeks, not years',
    'Tangible results from day one',
  ]

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="hidden lg:block absolute inset-0">
          <HeroBackgroundGrid isPlaying={false} />
        </div>
        <div className="lg:hidden absolute inset-0">
          <MobileHeroBackground />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.7) 40%, rgba(17,24,39,0.5) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.5) 100%)'
          }}
        />

        <div className="relative z-10 max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className={`inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1.5 rounded-lg sm:rounded-xl font-serif ${isDark ? 'bg-blue-900/40 text-blue-400 shadow-[0_2px_8px_rgba(59,130,246,0.2)]' : 'bg-blue-100 text-[#1E40AF] shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8)]'}`}>
              AI Transformation Audit
            </span>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              From AI Strategy to<br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-500' : 'from-primary to-primary-dark'}`}>Transformed Operations</span>
              <br />in 60 Days
            </h1>
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Identify your highest-ROI AI opportunities. Then build only what delivers measurable results.
            </p>
            <Link
              href="/demo"
              className="btn-primary inline-flex items-center gap-2 h-11 sm:h-12 md:h-14 px-6 sm:px-8 rounded-full text-sm sm:text-base font-semibold"
            >
              Start Your AI Audit
              <FaArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
        {/* Subtle top divider */}
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-gray-200'}`} />

        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left max-w-3xl mb-6 sm:mb-8 md:mb-12"
          >
            <span className={`inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-serif ${isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-700'}`}>
              The Problem
            </span>
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-2 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Most organizations know they need AI.
              <span className="hidden sm:inline"><br /></span>
              <span className="sm:hidden"> </span>Few know where to start.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
            {/* Failure Rate Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bento-card"
            >
              <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                AI Project Failure Rate
              </h3>
              <div className="flex items-end gap-6 sm:gap-8">
                <div className="text-center">
                  <div className={`text-4xl sm:text-5xl md:text-6xl font-serif font-normal ${isDark ? 'text-red-400' : 'text-red-600'}`}>95%</div>
                  <div className={`text-xs sm:text-sm mt-2 font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>AI Projects</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-serif font-normal ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>40%</div>
                  <div className={`text-xs sm:text-sm mt-2 font-serif ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>IT Projects</div>
                </div>
              </div>
              <p className={`text-[11px] sm:text-xs md:text-sm mt-4 sm:mt-6 leading-relaxed font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                More than twice the failure rate of standard IT projects
              </p>
            </motion.div>

            {/* Common Symptoms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bento-card"
            >
              <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                Sound Familiar?
              </h3>
              <div className="space-y-2.5 sm:space-y-3">
                {problems.map((problem, i) => (
                  <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <span className={`text-sm sm:text-base ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>→</span>
                    <span className={`text-[11px] sm:text-xs md:text-sm font-serif ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>"{problem}"</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Hidden Barriers */}
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[
              { title: 'No Clear Starting Point', stat: '75%', desc: 'of organizations believe in AI\'s potential but lack a roadmap to begin' },
              { title: 'No In-House Expertise', stat: '55%', desc: 'of executives cite data quality issues; 46% face a critical talent gap' },
              { title: 'No ROI Before You Build', stat: '?', desc: 'ROI projections are rarely calculated accurately before projects launch' },
            ].map((barrier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bento-card text-center"
              >
                <div className={`text-2xl sm:text-3xl font-serif font-normal mb-2 ${isDark ? 'text-blue-400' : 'text-primary'}`}>{barrier.stat}</div>
                <h4 className={`text-xs sm:text-sm font-semibold mb-2 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{barrier.title}</h4>
                <p className={`text-[10px] sm:text-xs leading-relaxed font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{barrier.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution - 3 Phases */}
      <section className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left max-w-3xl mb-6 sm:mb-8 md:mb-12"
          >
            <span className={`inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-serif ${isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700'}`}>
              The Solution
            </span>
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-2 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              AI Audit: A 4-Week Process
            </h2>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              A structured approach to identifying and prioritizing high-impact AI opportunities in your organization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bento-card flex flex-col"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <div className={`w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/40' : 'bg-blue-100'}`}>
                    <span className={`text-sm sm:text-base md:text-lg font-bold font-serif ${isDark ? 'text-blue-400' : 'text-[#1E40AF]'}`}>{phase.number}</span>
                  </div>
                  <div>
                    <h3 className={`text-sm sm:text-base md:text-lg font-semibold font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{phase.title}</h3>
                    <span className={`text-[10px] sm:text-xs font-serif ${isDark ? 'text-blue-400' : 'text-primary'}`}>{phase.duration}</span>
                  </div>
                </div>
                <p className={`text-[11px] sm:text-xs md:text-sm mb-3 sm:mb-4 leading-relaxed font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{phase.description}</p>
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-1">
                  {phase.activities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FaCheckCircle className={`w-2.5 sm:w-3 h-2.5 sm:h-3 mt-0.5 sm:mt-1 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span className={`text-[10px] sm:text-xs font-serif ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{activity}</span>
                    </div>
                  ))}
                </div>
                <div className={`pt-3 sm:pt-4 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                  <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider font-serif ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Output</span>
                  <p className={`text-[10px] sm:text-xs mt-1 font-serif ${isDark ? 'text-blue-400' : 'text-primary'}`}>{phase.output}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left max-w-3xl mb-6 sm:mb-8 md:mb-12"
          >
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-2 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              What You Receive
            </h2>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Delivered in two formats: an executive presentation (30–45 min) and a detailed PDF report
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bento-card"
              >
                <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center mb-2.5 sm:mb-3 ${isDark ? 'bg-blue-900/40' : 'bg-blue-100'}`}>
                  <span className={`text-xs sm:text-sm font-bold font-serif ${isDark ? 'text-blue-400' : 'text-[#1E40AF]'}`}>{index + 1}</span>
                </div>
                <h3 className={`text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Can Build - 3 Categories */}
      <section className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left max-w-3xl mb-6 sm:mb-8 md:mb-12"
          >
            <span className={`inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-serif ${isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-[#1E40AF]'}`}>
              Execution
            </span>
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-2 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              We Build What We Recommend
            </h2>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              We don't hand you a report and walk away. We implement the solutions you choose to pursue.
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Customer-Facing AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bento-card"
            >
              <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                1. Customer-Facing AI
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {customerFacing.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-green-900/40' : 'bg-green-100'}`}>
                      <item.icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-semibold font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{item.name}</h4>
                      <p className={`text-[10px] sm:text-xs leading-relaxed font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Internal Operations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bento-card"
            >
              <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                2. Internal Operations
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {internalOps.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-amber-900/40' : 'bg-amber-100'}`}>
                      <item.icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-semibold font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{item.name}</h4>
                      <p className={`text-[10px] sm:text-xs leading-relaxed font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Data Infrastructure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bento-card"
            >
              <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                3. Data Infrastructure
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {dataInfra.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-violet-900/40' : 'bg-violet-100'}`}>
                      <item.icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-semibold font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{item.name}</h4>
                      <p className={`text-[10px] sm:text-xs leading-relaxed font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bento-card"
          >
            <span className={`inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-serif ${isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700'}`}>
              Case Study
            </span>
            <h3 className={`text-lg sm:text-xl md:text-2xl font-serif font-normal mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              124 Missed Calls Recovered Weekly
            </h3>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <h4 className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3 font-serif ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>The Challenge</h4>
                <ul className={`space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm font-serif ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  <li>• 45 minutes every Monday morning sorting voicemails</li>
                  <li>• 124 missed calls per week going unanswered</li>
                  <li>• No systematic follow-up process in place</li>
                </ul>
              </div>
              <div>
                <h4 className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3 font-serif ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>The Solution</h4>
                <ul className={`space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm font-serif ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  <li>• AI receptionist answers missed calls around the clock</li>
                  <li>• Automatic transcription and summary of every voicemail</li>
                  <li>• Appointments booked without staff involvement</li>
                  <li>• Seamless integration with existing practice software</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { value: '90', label: 'Additional Appointments' },
                { value: '$0', label: 'Extra Staff Hired' },
                { value: '$27K', label: 'Additional Revenue' },
                { value: '1 Week', label: 'Time to ROI' },
              ].map((stat, i) => (
                <div key={i} className={`text-center p-3 sm:p-4 rounded-lg sm:rounded-xl ${isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white border border-gray-200/50'}`}>
                  <div className={`text-xl sm:text-2xl md:text-3xl font-serif font-normal ${isDark ? 'text-green-400' : 'text-green-600'}`}>{stat.value}</div>
                  <div className={`text-[10px] sm:text-xs mt-1 font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Cognia - Comparison */}
      <section className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left max-w-3xl mb-6 sm:mb-8 md:mb-12"
          >
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Consultants advise. Engineers build.
              <span className="hidden sm:inline"><br /></span>
              <span className="sm:hidden"> </span>We do both.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Typical Consultants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bento-card"
            >
              <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Typical Consultants</h3>
              <div className="space-y-1.5 sm:space-y-2">
                {typicalConsultants.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {item.good ? (
                      <FaCheck className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    ) : (
                      <FaTimes className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                    )}
                    <span className={`text-[11px] sm:text-xs md:text-sm font-serif ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Typical Dev Shops */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bento-card"
            >
              <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Typical Dev Shops</h3>
              <div className="space-y-1.5 sm:space-y-2">
                {typicalDevShops.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {item.good ? (
                      <FaCheck className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    ) : (
                      <FaTimes className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                    )}
                    <span className={`text-[11px] sm:text-xs md:text-sm font-serif ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cognia AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`bento-card border-2 ${isDark ? 'border-blue-500/40 bg-blue-900/20' : 'border-primary/30 bg-blue-50/50'}`}
            >
              <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 font-serif ${isDark ? 'text-blue-400' : 'text-primary'}`}>Cognia AI</h3>
              <div className="space-y-1.5 sm:space-y-2">
                {cogniaAI.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <FaCheck className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-[11px] sm:text-xs md:text-sm font-serif ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-center mt-6 sm:mt-8 text-xs sm:text-sm md:text-base italic font-serif ${isDark ? 'text-gray-400' : 'text-slate-500'}`}
          >
            "The plan is yours to keep — whether you work with us or not."<br />
            <span className="text-[11px] sm:text-xs md:text-sm not-italic">That's how confident we are in the value we deliver.</span>
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bento-card text-center"
          >
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-3 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Ready to Discover Your AI Opportunities?
            </h2>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Schedule a kick-off call to scope your AI Transformation Audit and start building your roadmap.
            </p>
            <Link
              href="/demo"
              className="btn-primary inline-flex items-center gap-2 h-11 sm:h-12 md:h-14 px-6 sm:px-8 rounded-full text-sm sm:text-base font-semibold"
            >
              Get Started
              <FaArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs md:text-sm">
              {['Free Consultation', 'No Commitment', 'ROI-Focused', 'We Build It'].map((item, i) => (
                <span key={i} className={`flex items-center gap-1.5 sm:gap-2 font-serif ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  <FaCheckCircle className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDark ? 'text-blue-400' : 'text-primary'}`} />
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

export default AIAuditClient
