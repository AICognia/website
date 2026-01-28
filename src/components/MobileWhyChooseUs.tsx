'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'
import Link from 'next/link'

const MobileWhyChooseUs: React.FC = () => {
  const capabilities = [
    'Unified data platform',
    'Real-time AI analytics',
    'Natural language queries',
  ]

  return (
    <section className="lg:hidden py-12 transition-colors duration-300 bg-white dark:bg-gray-900">
      <div className="container-responsive">
      {/* Header - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="text-xl font-serif font-normal leading-tight mb-3 text-slate-900 dark:text-gray-100">
          Your Data Is an Asset
        </h2>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-gray-400">
          We unify scattered data into actionable intelligence.
        </p>
      </motion.div>

      {/* Capabilities - Inline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {capabilities.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            >
              <FaCheck className="text-[8px] text-blue-500 dark:text-blue-400" />
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Stats Row - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex justify-between py-4 border-y border-gray-100 dark:border-gray-800"
      >
        <div className="text-center">
          <div className="text-xl font-serif text-slate-900 dark:text-gray-100">50+</div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500">Enterprises</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-serif text-slate-900 dark:text-gray-100">99.9%</div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-serif text-slate-900 dark:text-gray-100">$10M+</div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500">Saved</div>
        </div>
      </motion.div>

      {/* Compliance - Inline text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-4"
      >
        <p className="text-xs text-slate-400 dark:text-gray-500">
          <span className="font-medium">Enterprise ready:</span> Secure • Encrypted • Compliant • Reliable
        </p>
      </motion.div>
      </div>
    </section>
  )
}

export default MobileWhyChooseUs
