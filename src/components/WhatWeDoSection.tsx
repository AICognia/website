'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  IconChartBarTrendUpFill18,
  IconNodesFill18,
  IconGear2Fill18
} from 'nucleo-ui-essential-fill-18';
import { useTheme } from 'next-themes';

const WhatWeDoSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1) // Start with featured item open
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark';

  // Subtle glass style for accordion cards
  const accordionGlassStyle = (isExpanded: boolean) => ({
    background: isDark
      ? isExpanded
        ? 'rgba(31, 41, 55, 0.7)'
        : 'rgba(31, 41, 55, 0.4)'
      : isExpanded
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: isDark
      ? isExpanded
        ? 'inset 0 1px 1px rgba(255, 255, 255, 0.03), 0 4px 12px rgba(0, 0, 0, 0.25)'
        : 'inset 0 1px 1px rgba(255, 255, 255, 0.02), 0 2px 6px rgba(0, 0, 0, 0.15)'
      : isExpanded
        ? 'inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.06)'
        : 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 2px 6px rgba(0, 0, 0, 0.03)',
  });

  const pillars = [
    {
      id: 1,
      icon: <IconNodesFill18 size={18} />,
      title: "AI Audit & Strategy",
      description: "Our 4-week discovery process identifies highest-ROI AI opportunities and builds your roadmap. The plan is yours to keep — whether you work with us or not.",
      keywords: ["Discovery & Interviews", "ROI-Ranked Matrix", "Implementation Roadmap", "Starts at $1,000"],
      featured: true,
      cta: { text: "Start with AI Audit", href: "/demo" }
    },
    {
      id: 2,
      icon: <IconChartBarTrendUpFill18 size={18} />,
      title: "Build & Ship",
      description: "We implement the solutions from your audit. Customer-facing AI, internal operations, and data infrastructure — we build what we recommend.",
      keywords: ["Voice Agents & Chatbots", "Workflow Automation", "BI Dashboards", "RAG Systems"],
      featured: false
    },
    {
      id: 3,
      icon: <IconGear2Fill18 size={18} />,
      title: "Data Intelligence",
      description: "Ongoing partnership for BI systems, automation expansion, and continuous optimization. Real-time insights without SQL.",
      keywords: ["Real-time Dashboards", "Predictive Models", "API Integrations", "Continuous Optimization"],
      featured: false
    }
  ]

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className={`py-12 sm:py-16 lg:py-20 xl:py-24 relative transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
      {/* Subtle top divider */}
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-gray-200'}`} />

      <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-start">
          {/* Left: Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-32"
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : ''}`}>
              What We Do
            </h2>
            <p className={`text-sm sm:text-base md:text-lg body-large mb-3 sm:mb-4 font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              From AI strategy to transformed operations in 60 days. Consultants advise. Engineers build. We do both.
            </p>
            <p className={`text-[13px] sm:text-[14px] md:text-[15px] mb-6 sm:mb-8 font-serif leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
              Find the highest-ROI AI opportunities. Then build only what pays back.
            </p>
            <Link
              href="/demo"
              className="btn-primary h-10 sm:h-11 px-4 sm:px-6 rounded-full text-xs sm:text-sm inline-flex w-full sm:w-auto justify-center"
            >
              <span>Schedule a Consultation</span>
            </Link>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            {pillars.map((pillar, index) => {
              const isExpanded = expandedId === pillar.id

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`
                    rounded-xl border transition-all duration-300
                    ${isExpanded
                      ? isDark
                        ? 'border-gray-700/80'
                        : 'border-gray-200/80'
                      : isDark
                        ? 'border-gray-700/50 hover:border-gray-700/70'
                        : 'border-gray-200/50 hover:border-gray-200/80'
                    }
                  `}
                  style={accordionGlassStyle(isExpanded)}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleExpand(pillar.id)}
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                      <div className={`
                        w-8 sm:w-9 h-8 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300
                        ${isExpanded
                          ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/25'
                          : isDark
                            ? 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                        }
                      `}>
                        {pillar.icon}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                        <h3 className={`
                          text-[13px] sm:text-[15px] font-semibold font-serif transition-colors duration-200
                          ${isExpanded
                            ? isDark ? 'text-gray-100' : 'text-gray-900'
                            : isDark ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-700 group-hover:text-gray-900'}
                        `}>
                          {pillar.title}
                        </h3>
                        {pillar.featured && (
                          <span className={`px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold rounded-md sm:rounded-lg uppercase tracking-wider w-fit ${isDark ? 'bg-blue-900/50 text-blue-400 shadow-[2px_2px_4px_rgba(59,130,246,0.1)]' : 'bg-blue-100 text-[#1E40AF] shadow-[2px_2px_4px_rgba(30,64,175,0.1),-1px_-1px_2px_rgba(255,255,255,0.8)]'}`}>
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div className={`
                      w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-2
                      ${isExpanded
                        ? 'bg-primary/10 text-primary'
                        : isDark
                          ? 'bg-gray-700 text-gray-500 group-hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                      }
                    `}>
                      <motion.svg
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="w-3.5 sm:w-4 h-3.5 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </div>
                  </button>

                  {/* Accordion Content */}
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
                          <p className={`text-[12px] sm:text-[14px] leading-relaxed mb-3 sm:mb-4 font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                            {pillar.description}
                          </p>

                          {/* Keywords - styled like WhyChooseUs badges */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            {pillar.keywords.map((keyword, i) => (
                              <span
                                key={i}
                                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-bold tracking-wider font-serif ${isDark ? 'bg-blue-900/40 text-blue-400 shadow-[2px_2px_4px_rgba(59,130,246,0.1)]' : 'bg-blue-100 text-[#1E40AF] shadow-[2px_2px_4px_rgba(30,64,175,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.5)]'}`}
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>

                          {/* CTA for Featured */}
                          {pillar.cta && (
                            <Link
                              href={pillar.cta.href}
                              className={`group/link inline-flex items-center text-[11px] sm:text-[13px] font-medium font-serif transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary'}`}
                            >
                              <span>{pillar.cta.text}</span>
                              <span className="ml-1 mr-2 flex items-center transition-all duration-300 group-hover/link:ml-2 group-hover/link:mr-1">
                                <svg
                                  className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                            </Link>
                          )}
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

      {/* Subtle bottom divider */}
      <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-gray-200'}`} />
    </section>
  )
}

export default WhatWeDoSection
