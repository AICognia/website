'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import MobileHeroBackground from './MobileHeroBackground'

const MobileHero: React.FC = () => {
  return (
    <section className="lg:hidden relative overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900">

      {/* Lightweight animated background - runs for 3s then pauses */}
      <div className="absolute inset-0">
        <MobileHeroBackground />
      </div>

      {/* Gradient overlay for text readability - uses CSS var for no-flash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'var(--hero-gradient-mobile)',
        }}
      />

      <div className="relative z-10 px-5 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/30">
            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
            <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">
              AI Transformation Agency
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-[2rem] leading-[1.15] font-serif font-light tracking-tight mb-5 text-slate-900 dark:text-white"
        >
          From Data Chaos to{' '}
          <span className="text-blue-600 dark:text-blue-400">
            Strategic Clarity
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base leading-relaxed mb-8 text-slate-600 dark:text-gray-300"
        >
          We design and deploy AI solutions that automate your workflows, empower your teams, and accelerate your business.
        </motion.p>

        {/* Stats row - simpler design */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex justify-between mb-8 px-2"
        >
          {[
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '3x', label: 'Faster Decisions' },
            { value: '500+', label: 'Integrations' },
          ].map((stat, i) => (
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-3"
        >
          {/* Primary CTA */}
          <Link
            href="/demo"
            className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold"
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/what-we-do"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors bg-slate-900/5 dark:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/20 active:bg-slate-100 dark:active:bg-white/15"
          >
            <span>See What We Do</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

export default MobileHero
