'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  FaIndustry,
  FaHospital,
  FaHotel,
  FaSeedling,
  FaShoppingCart,
  FaBriefcase
} from 'react-icons/fa'

const IndustriesSection: React.FC = () => {
  const industries = [
    {
      icon: FaIndustry,
      title: 'Manufacturing & Industrial',
      description: 'Production optimization, quality control, supply chain intelligence'
    },
    {
      icon: FaHospital,
      title: 'Healthcare & Medical',
      description: 'Patient scheduling, clinical workflows, compliance automation'
    },
    {
      icon: FaHotel,
      title: 'Hospitality & Tourism',
      description: 'Guest experience, revenue management, operational efficiency'
    },
    {
      icon: FaSeedling,
      title: 'Agriculture & Food',
      description: 'Supply chain visibility, quality tracking, demand forecasting'
    },
    {
      icon: FaShoppingCart,
      title: 'Retail & E-commerce',
      description: 'Inventory optimization, customer insights, omnichannel operations'
    },
    {
      icon: FaBriefcase,
      title: 'Professional Services',
      description: 'Client management, resource planning, workflow automation'
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
            Industries
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-slate-900 mb-6">
            Expertise Across Industries
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We bring deep domain knowledge to every engagement, understanding the unique
            challenges and opportunities in your sector.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                  <industry.icon className="text-xl text-slate-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustriesSection
