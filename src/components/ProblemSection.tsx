'use client'

import React from 'react'
import { motion } from 'framer-motion'

const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container-responsive">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-6">
              The Challenge
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-slate-900 mb-8 leading-tight">
              Your Data Is an Asset.
              <br />
              <span className="text-slate-500">Are You Using It?</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12"
          >
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center mb-12">
              In most companies, data lives in silos. Sales figures in one system. Operations in another.
              Logistics in spreadsheets. Everyone knows their piece, but no one sees the full picture.
            </p>

            {/* Visual representation of data silos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Sales Data', location: 'CRM System' },
                { label: 'Operations', location: 'ERP Platform' },
                { label: 'Logistics', location: 'Spreadsheets' },
                { label: 'Financials', location: 'Accounting Software' }
              ].map((silo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-3 bg-slate-200 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-400 rounded" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700">{silo.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{silo.location}</div>
                </motion.div>
              ))}
            </div>

            {/* The solution statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-10 text-center"
            >
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                We change that.
              </p>
              <p className="text-slate-400 mt-4 text-base md:text-lg">
                We connect your systems, unify your data, and give you the complete picture
                you need to make strategic decisions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
