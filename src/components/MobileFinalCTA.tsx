'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { useTheme } from 'next-themes'

const MobileFinalCTA: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  return (
    <section className={`lg:hidden py-12 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className={`text-xl font-serif font-normal mb-3 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
          Ready to Transform?
        </h2>
        <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          Schedule a consultation. We'll show you where AI can move the needle.
        </p>
        <Link
          href="/demo"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform"
        >
          Get Started
          <FaArrowRight className="text-xs" />
        </Link>
      </motion.div>
      </div>
    </section>
  )
}

export default MobileFinalCTA
