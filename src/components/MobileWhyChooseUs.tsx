'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const MobileWhyChooseUs: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  const capabilities = [
    'Unified data platform',
    'Real-time AI analytics',
    'Natural language queries',
  ]

  return (
    <section className={`lg:hidden py-12 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container-responsive">
      {/* Header - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className={`text-xl font-serif font-normal leading-tight mb-3 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
          Your Data Is an Asset
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                isDark
                  ? 'bg-gray-800 text-gray-300 border border-gray-700'
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <FaCheck className={`text-[8px] ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
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
        className={`flex justify-between py-4 border-y ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
      >
        <div className="text-center">
          <div className={`text-xl font-serif ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>50+</div>
          <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Enterprises</div>
        </div>
        <div className="text-center">
          <div className={`text-xl font-serif ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>99.9%</div>
          <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Uptime</div>
        </div>
        <div className="text-center">
          <div className={`text-xl font-serif ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>$10M+</div>
          <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Saved</div>
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
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
          <span className="font-medium">Enterprise ready:</span> SOC 2 • HIPAA • GDPR • PCI DSS
        </p>
      </motion.div>
      </div>
    </section>
  )
}

export default MobileWhyChooseUs
