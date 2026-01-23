'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaGlobe } from 'react-icons/fa'

const GlobalPresenceSection: React.FC = () => {
  const locations = [
    {
      country: 'United States',
      flag: '🇺🇸',
      description: 'Serving North American enterprises with local expertise and support'
    },
    {
      country: 'Turkey',
      flag: '🇹🇷',
      description: 'Deep roots in the Turkish market, serving enterprises across the region'
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-1/4 -right-32 w-[300px] h-[300px] rounded-full opacity-15 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-responsive relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full mb-4">
            <FaGlobe className="text-xs" />
            Global Reach
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-white mb-6">
            US + Turkey Operations
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We serve clients across both markets with local expertise and global perspective.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center hover:border-slate-600 transition-colors"
            >
              <div className="text-5xl mb-4">{location.flag}</div>
              <h3 className="text-xl font-serif font-normal text-white mb-3">
                {location.country}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {location.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm">
            International operations. Local understanding. Enterprise-grade delivery.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default GlobalPresenceSection
