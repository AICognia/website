'use client'

import React from 'react'
import { motion } from 'framer-motion'

const HowWeWorkSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'We learn your business — processes, pain points, data landscape, strategic goals.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '02',
      title: 'Design',
      description: 'We architect your custom AI solution and map the transformation roadmap.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '03',
      title: 'Build',
      description: 'We build, integrate, and deploy. You see progress weekly.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      number: '04',
      title: 'Evolve',
      description: 'We stay on as your AI partner — optimizing, expanding, and evolving the system as your business grows.',
      color: 'from-slate-600 to-slate-700'
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-slate-900 mb-6">
            Partnership, Not Projects
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We don't disappear after launch. We're your ongoing AI team.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-slate-300" />
                )}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full relative z-10 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>

                  <h3 className="text-xl font-serif font-normal text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-base">
            Every engagement is custom. Every solution is built for your specific challenges.
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  )
}

export default HowWeWorkSection
