'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconChevronRightFill18,
  IconChartBarTrendUpFill18,
  IconCheckFill18,
  IconNodesFill18,
  IconHeadsetFill18,
  IconLayers3Fill18,
  IconHeartFill18,
  IconCloudFill18,
  IconEnvelopeFill18
} from 'nucleo-ui-essential-fill-18';
import { OrbitingCircles } from './ui/orbiting-circles';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-visible">
      <div className="container-responsive">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-8 sm:mb-12 md:mb-16 text-left"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-4 sm:mb-6">
            Built for Business Operations
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6">

          {/* Card 1: Operations Leaders (Large, Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-7 bento-card p-4 sm:p-6 md:p-8 relative overflow-hidden group h-[220px] sm:h-[250px] md:h-[280px]"
          >
            <div className="relative z-10 max-w-md">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 sm:mb-6 text-blue-600">
                <IconChartBarTrendUpFill18 size={18} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 font-serif">Operations Teams</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-serif max-w-full sm:max-w-[75%] md:max-w-[65%]">
                Automate customer service and scheduling to reduce overhead by up to 40% while maintaining quality.
              </p>
            </div>

            {/* Visual: Efficiency Graph */}
            <div className="absolute -right-2 sm:-right-4 -bottom-24 sm:-bottom-20 w-[55%] sm:w-[50%] h-[180px] sm:h-[200px] md:h-[220px] bg-white rounded-tl-[1.5rem] sm:rounded-tl-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.05)] px-4 sm:px-6 pt-6 sm:pt-10 pb-4 sm:pb-6 group-hover:-bottom-20 sm:group-hover:-bottom-16 transition-all duration-500 border-l border-t border-[rgba(55,50,47,0.12)]">
              <div className="flex justify-between items-end h-full w-full px-2 pb-2 gap-2">
                {[40, 65, 55, 80, 70, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-blue-50 rounded-t-lg relative group-hover:bg-blue-100 transition-colors duration-300"
                  >
                    <div className="absolute top-0 w-full h-1 bg-blue-500 rounded-t-lg opacity-80"></div>
                  </motion.div>
                ))}
              </div>
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/95 backdrop-blur shadow-sm border border-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 z-20 whitespace-nowrap">
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[8px] sm:text-[10px] font-semibold text-gray-700 font-sans">Efficiency +87%</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Healthcare (Small, Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 lg:col-span-5 bento-card p-4 sm:p-6 md:p-8 relative overflow-hidden group h-[220px] sm:h-[250px] md:h-[280px]"
          >
            <div className="relative z-10">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-[#ecfdf5] border border-green-100 flex items-center justify-center mb-4 sm:mb-6 text-green-600">
                <IconHeartFill18 size={18} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 font-serif">Healthcare Teams</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-serif max-w-full sm:max-w-[80%]">
                Secure patient scheduling and routine inquiry automation.
              </p>
            </div>

            {/* Visual: Clean Horizontal Patient Flow */}
            <div className="absolute -right-2 sm:-right-4 -bottom-12 sm:-bottom-8 left-[20%] sm:left-[30%] group-hover:-bottom-8 sm:group-hover:-bottom-4 transition-all duration-500">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-emerald-100 shadow-lg p-2.5 sm:p-4">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[10px] font-bold">
                      JD
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-800">John Doe</div>
                      <div className="text-[9px] text-slate-400">ID: #8821</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded-full">Priority</span>
                </div>
                
                {/* Horizontal Flow Steps */}
                <div className="flex items-center gap-2">
                  {/* Step 1 */}
                  <div className="flex-1 bg-emerald-50 rounded-lg p-2 text-center">
                    <div className="text-[8px] text-slate-400 font-semibold uppercase mb-0.5">Symptoms</div>
                    <div className="text-[10px] text-slate-700 font-medium">Analyzed</div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-emerald-300 text-[10px]">→</div>
                  
                  {/* Step 2 */}
                  <div className="flex-1 bg-emerald-100 rounded-lg p-2 text-center border border-emerald-200">
                    <div className="text-[8px] text-emerald-600 font-semibold uppercase mb-0.5">Triage</div>
                    <div className="text-[10px] text-emerald-700 font-bold">High</div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-emerald-300 text-[10px]">→</div>
                  
                  {/* Step 3 */}
                  <div className="flex-1 bg-emerald-500 rounded-lg p-2 text-center">
                    <div className="text-[8px] text-emerald-100 font-semibold uppercase mb-0.5">Booked</div>
                    <div className="text-[10px] text-white font-bold">10:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Sales & Support (Small, Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 lg:col-span-5 bento-card p-4 sm:p-6 md:p-8 relative overflow-hidden group h-[220px] sm:h-[250px] md:h-[280px]"
          >
            <div className="relative z-10">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 sm:mb-6 text-indigo-600">
                <IconHeadsetFill18 size={18} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 font-serif">Sales & Service</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-serif max-w-full sm:max-w-[85%]">
                Capture every lead and handle customer questions instantly, 24/7.
              </p>
            </div>

            {/* Visual: Premium Chat Interface */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 sm:-bottom-16 w-[90%] sm:w-[85%] group-hover:-bottom-16 sm:group-hover:-bottom-12 transition-all duration-500">
              <div className="flex flex-col gap-2 sm:gap-3">
                {/* Outgoing */}
                <div className="self-end max-w-[80%] sm:max-w-[75%] px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-[13px] leading-relaxed bg-blue-600 text-white rounded-xl sm:rounded-2xl rounded-br-md shadow-md shadow-blue-500/20">
                  Can we move our meeting to 2 PM?
                </div>

                {/* AI Processing Indicator */}
                <div className="self-start flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-slate-50/80 backdrop-blur rounded-full border border-slate-100">
                  <div className="flex gap-0.5 sm:gap-1">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay }}
                        className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-indigo-400 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-medium text-indigo-400 font-sans">AI is thinking...</span>
                </div>

                {/* Incoming */}
                <div className="self-start max-w-[80%] sm:max-w-[75%] px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-[13px] leading-relaxed bg-white text-gray-800 border border-gray-200 rounded-xl sm:rounded-2xl rounded-bl-md shadow-sm">
                  Absolutely, 2 PM works perfectly for the team. Calendar updated.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Data-Driven Orgs (Large, Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 lg:col-span-7 bento-card p-4 sm:p-6 md:p-8 relative overflow-hidden group h-[220px] sm:h-[250px] md:h-[280px]"
          >
            <div className="relative z-10 max-w-md">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4 sm:mb-6 text-purple-600">
                <IconLayers3Fill18 size={18} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 font-serif">Growing Companies</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-serif max-w-full sm:max-w-[65%] md:max-w-[55%]">
                Connect with your existing CRM and tools for seamless workflow automation.
              </p>
            </div>

            {/* Visual: Advanced Analytics Dashboard */}
            <div className="absolute -right-2 sm:-right-4 -bottom-36 sm:-bottom-32 w-[60%] sm:w-[55%] bg-white/50 backdrop-blur-xl rounded-tl-[1.5rem] sm:rounded-tl-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.08)] px-3 sm:px-6 pt-5 sm:pt-8 pb-4 sm:pb-6 group-hover:-bottom-32 sm:group-hover:-bottom-28 transition-all duration-500 border-l border-t border-[rgba(55,50,47,0.12)]">
              {/* Dashboard Header */}
              <div className="mb-2 sm:mb-3">
                <span className="text-[7px] sm:text-[9px] font-semibold text-slate-600 font-sans">LIVE ANALYTICS</span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-blue-100/50"
                >
                  <div className="text-[8px] sm:text-[10px] text-blue-600 font-semibold mb-0.5 sm:mb-1">CRM Sync</div>
                  <div className="text-base sm:text-lg font-bold text-blue-700">98.5%</div>
                  <div className="h-0.5 sm:h-1 bg-blue-200 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '98.5%' }}
                      transition={{ duration: 1.2, delay: 0.7 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-sky-100/50"
                >
                  <div className="text-[8px] sm:text-[10px] text-sky-600 font-semibold mb-0.5 sm:mb-1">ERP Flow</div>
                  <div className="text-base sm:text-lg font-bold text-sky-700">87.2%</div>
                  <div className="h-0.5 sm:h-1 bg-sky-200 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '87.2%' }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-sky-400 to-sky-600"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Real-time Chart */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-[rgba(55,50,47,0.08]">
                <div className="text-[10px] text-slate-500 font-semibold mb-3">DATA INTEGRATION</div>
                <div className="flex items-end justify-between h-16 gap-1 px-1">
                  {[45, 72, 58, 89, 67, 95, 78, 82, 91, 73, 65, 88, 54, 79, 92, 68, 85, 71, 96, 63].map((height, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full relative overflow-hidden transition-all duration-500 ${height > 75 ? 'bg-blue-100' : 'bg-slate-100'}`}
                      style={{ height: `${height}%` }}
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 1 }}
                        className={`absolute bottom-0 left-0 w-full rounded-full ${height > 75 ? 'bg-gradient-to-t from-blue-500 to-blue-400' : 'bg-gradient-to-t from-slate-400/30 to-slate-400/20'
                          }`}
                      >
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent" />
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[rgba(55,50,47,0.06)]">
                  <span className="text-[8px] text-slate-400 font-sans">Last sync: 2s ago</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[8px] text-emerald-600 font-semibold">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <Link
            href="/demo"
            className="btn-primary h-10 sm:h-12 px-6 sm:px-8 rounded-full text-sm sm:text-base w-full sm:w-auto inline-flex justify-center"
          >
            <span>Schedule a Consultation</span>
            <span className="ml-2"><IconChevronRightFill18 size={16} /></span>
          </Link>
          <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-slate-400 font-serif">See how it works for your business</p>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
