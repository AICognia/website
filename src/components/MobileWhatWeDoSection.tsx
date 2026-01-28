'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash'

const pillars = [
  {
    id: 1,
    title: "AI Strategy",
    description: "We identify high-impact AI opportunities and build transformation roadmaps.",
  },
  {
    id: 2,
    title: "Data Intelligence",
    description: "Unified dashboards with AI that detects anomalies and forecasts trends.",
    featured: true,
  },
  {
    id: 3,
    title: "Intelligent Ops",
    description: "AI agents and automations for customer interactions 24/7.",
  }
]

const MobileWhatWeDoSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number>(2)
  const { isDark } = useThemeWithoutFlash()

  // Subtle glass style for accordion items (inline styles need isDark)
  const accordionItemStyle = (isExpanded: boolean) => ({
    background: isDark
      ? isExpanded
        ? 'rgba(31, 41, 55, 0.5)'
        : 'rgba(31, 41, 55, 0.2)'
      : isExpanded
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  })

  return (
    <section className="lg:hidden py-10 transition-colors duration-300 bg-gray-950 dark:bg-gray-950 light:bg-gray-50" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <h2 className="text-xl font-serif font-normal mb-2 text-slate-900 dark:text-gray-100">
          What We Do
        </h2>
        <p className="text-sm text-slate-500 dark:text-gray-400">
          Transform how you operate using AI.
        </p>
      </motion.div>

      {/* Accordion */}
      <div className="space-y-2">
        {pillars.map((pillar) => {
          const isExpanded = expandedId === pillar.id

          return (
            <div
              key={pillar.id}
              className={`rounded-xl border transition-all duration-200 ${
                isExpanded
                  ? 'border-gray-200/80 dark:border-gray-700/60'
                  : 'border-gray-200/50 dark:border-gray-800/40'
              }`}
              style={accordionItemStyle(isExpanded)}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? 0 : pillar.id)}
                className="w-full px-4 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${
                    isExpanded ? 'text-blue-500' : 'text-gray-400 dark:text-gray-600'
                  }`}>
                    0{pillar.id}
                  </span>
                  <span className={`text-sm font-semibold ${
                    isExpanded
                      ? 'text-slate-900 dark:text-gray-100'
                      : 'text-slate-600 dark:text-gray-400'
                  }`}>
                    {pillar.title}
                  </span>
                  {pillar.featured && (
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded uppercase bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                      Featured
                    </span>
                  )}
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <FaChevronDown className="text-xs text-gray-400 dark:text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 px-4 pl-12 text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                      {pillar.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
      </div>
    </section>
  )
}

export default MobileWhatWeDoSection
