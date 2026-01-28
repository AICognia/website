'use client'

import React from 'react';
import { motion } from 'framer-motion';
import {
    FaShieldAlt,
    FaLock,
    FaFileContract,
    FaUserShield
} from 'react-icons/fa';
import { cn } from "../lib/utils";
import { useState } from 'react';
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash';

export interface OrbitingCirclesProps {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
}

// Data Fragmentation Bars - animates once on mount, no re-triggers
const DataFragmentationBars = () => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const barHeights = [35, 55, 40, 65, 50, 75, 60, 85, 70, 95]

  return (
    <div className="flex-1 w-full h-24 sm:h-28 md:h-32 flex items-end justify-between gap-1 sm:gap-1.5 px-1 sm:px-2 relative">
      {/* Decorative background glow */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent blur-xl pointer-events-none" />

      {barHeights.map((height, i) => (
        <div
          key={i}
          className="flex-1 rounded-full relative overflow-hidden bg-slate-200/50 dark:bg-gray-700/50"
          style={{ height: `${height}%` }}
        >
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '65%' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => setHasAnimated(true)}
            className={`absolute bottom-0 left-0 w-full rounded-full ${
              i % 7 === 0 || i % 7 === 3 ? 'bg-gradient-to-t from-primary/60 to-primary-light' : 'bg-gradient-to-t from-primary/80 to-primary-light'
            }`}
            style={hasAnimated ? { height: '65%' } : undefined}
          >
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent" />
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 w-full h-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      <div
        style={
          {
            "--duration": duration,
            "--radius": radius,
            "--delay": -delay,
          } as React.CSSProperties
        }
        className={cn(
          "absolute flex transform-gpu animate-orbit items-center justify-center rounded-full border bg-black/10 [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10",
          { "[animation-direction:reverse]": reverse },
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}

const WhyChooseUs: React.FC = () => {
    const { isDark } = useThemeWithoutFlash();

    return (
        <section className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900">
            <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-12">
                <div className="text-left max-w-3xl mb-6 sm:mb-8 md:mb-12 lg:mb-14">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-2 sm:mb-4 md:mb-6 text-slate-900 dark:text-gray-100">
                        The Gaps Holding You Back
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl text-slate-600 dark:text-gray-400">
                        <span className="sm:hidden">Disconnected data, manual workflows, and missed insights. AI can fix these — if you know where to start.</span>
                        <span className="hidden sm:inline">Data trapped in silos. Manual workflows draining your team. Insights buried in spreadsheets.
                        Opportunities slipping through the cracks. These gaps cost you every day — and the right AI strategy can fix them.</span>
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">

                        {/* Card 1: From Idea to ROI */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group bento-card flex flex-col gap-4 sm:gap-5 md:flex-row md:gap-8 md:items-center"
                        >
                            <div className="flex-1">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif text-gray-900 dark:text-gray-100">Fragmented Operations</h3>
                                <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                                    <span className="sm:hidden">Data in silos. Manual handoffs. Insights lost between systems.</span>
                                    <span className="hidden sm:inline">Critical data scattered across CRMs, spreadsheets, and inboxes. Manual handoffs between systems. Decisions made on gut feeling instead of real-time intelligence.</span>
                                </p>
                            </div>
                            <DataFragmentationBars />
                        </motion.div>

                        {/* Card 2: Security & Compliance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group bento-card flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif text-gray-900 dark:text-gray-100">Security Without Compromise</h3>
                                <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-5 md:mb-8 text-slate-500 dark:text-gray-400">
                                    <span className="sm:hidden">AI that meets enterprise security and compliance requirements from day one.</span>
                                    <span className="hidden sm:inline">Most AI deployments stall at the security review. Ours ship with encryption, access controls, and audit trails built in — so you move fast without cutting corners.</span>
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-auto">
                                <Badge icon={<FaLock />} text="Encrypted" />
                                <Badge icon={<FaShieldAlt />} text="SOC 2 Ready" />
                                <Badge icon={<FaUserShield />} text="Access Control" />
                                <Badge icon={<FaFileContract />} text="Audit Logs" />
                            </div>
                        </motion.div>

                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

                        {/* Card 3: Enterprise Reliability */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group bento-card flex flex-col overflow-hidden"
                        >
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif text-gray-900 dark:text-gray-100">Built Around Your Data</h3>
                            <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-5 md:mb-6 text-slate-500 dark:text-gray-400">
                                <span className="sm:hidden">AI solutions shaped by your data, processes, and goals.</span>
                                <span className="hidden sm:inline">Every solution is built on your data, tuned to your workflows, and aligned with your business goals — with guardrails and governance built in.</span>
                            </p>

                            <div className="relative h-[120px] sm:h-[160px] md:h-[220px] w-full flex items-center justify-center">
                                {/* Concentric circles */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 220">
                                    {/* Outermost circle */}
                                    <circle
                                        cx="150"
                                        cy="110"
                                        r="100"
                                        fill="none"
                                        stroke={isDark ? '#374151' : '#e5e7eb'}
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                    />
                                    {/* Middle circle */}
                                    <circle
                                        cx="150"
                                        cy="110"
                                        r="70"
                                        fill="none"
                                        stroke={isDark ? '#4b5563' : '#d1d5db'}
                                        strokeWidth="1.5"
                                    />
                                    {/* Inner circle */}
                                    <circle
                                        cx="150"
                                        cy="110"
                                        r="40"
                                        fill="none"
                                        stroke={isDark ? '#374151' : '#e5e7eb'}
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                    />
                                </svg>

                                {/* Center logo */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-lg flex items-center justify-center z-10">
                                    <img src="/cognia-c-icon.png" alt="Cognia AI" className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 brightness-0 invert" />
                                </div>

                                {/* Floating labels */}
                                <div className="absolute top-1 sm:top-2 left-2 sm:left-4 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center justify-center bg-blue-100 shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(30,64,175,0.1)] dark:bg-blue-900/40 dark:shadow-[0_2px_8px_rgba(59,130,246,0.2)]">
                                    <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider font-serif text-[#1E40AF] dark:text-blue-400">Your Data</span>
                                </div>
                                <div className="absolute top-6 sm:top-8 right-1 sm:right-2 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center justify-center bg-blue-100 shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(30,64,175,0.1)] dark:bg-blue-900/40 dark:shadow-[0_2px_8px_rgba(59,130,246,0.2)]">
                                    <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider font-serif text-[#1E40AF] dark:text-blue-400">Guardrails</span>
                                </div>
                                <div className="absolute bottom-8 sm:bottom-12 left-1 sm:left-2 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center justify-center bg-blue-100 shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(30,64,175,0.1)] dark:bg-blue-900/40 dark:shadow-[0_2px_8px_rgba(59,130,246,0.2)]">
                                    <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider font-serif text-[#1E40AF] dark:text-blue-400">Workflows</span>
                                </div>
                                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center justify-center bg-blue-100 shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(30,64,175,0.1)] dark:bg-blue-900/40 dark:shadow-[0_2px_8px_rgba(59,130,246,0.2)]">
                                    <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider font-serif text-[#1E40AF] dark:text-blue-400">Governance</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4: Exceptional CX */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group bento-card flex flex-col"
                        >
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif text-gray-900 dark:text-gray-100">Intelligent Automation</h3>
                            <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-5 md:mb-8 text-slate-500 dark:text-gray-400">
                                <span className="sm:hidden">AI that automates workflows, surfaces insights, and scales with you.</span>
                                <span className="hidden sm:inline">From workflow automation to real-time dashboards — AI that connects your systems, surfaces insights, and scales with your business.</span>
                            </p>

                            <div className="flex-1 space-y-3 sm:space-y-4">
                                <div className="border rounded-lg p-3 sm:p-4 md:p-6 border-gray-200/50 bg-gray-50/30 dark:border-gray-700/50 dark:bg-gray-800/30">
                                    <ToggleRow label="Workflow Automation" active />
                                    <div className="my-2" />
                                    <ToggleRow label="BI Dashboards" active />
                                    <div className="my-2" />
                                    <ToggleRow label="System Integrations" active />
                                    <div className="my-2" />
                                    <ToggleRow label="Predictive Analytics" active />
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 5: Uptime */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group bento-card flex flex-col overflow-hidden sm:col-span-2 md:col-span-1"
                        >
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif text-gray-900 dark:text-gray-100">Always On, Always Ready</h3>
                            <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-5 md:mb-10 text-slate-500 dark:text-gray-400">
                                <span className="sm:hidden">24/7 availability with enterprise-grade reliability.</span>
                                <span className="hidden sm:inline">Your AI solutions run around the clock — automations, dashboards, and agents that never sleep, never miss a beat, and scale on demand.</span>
                            </p>

                            <div className="relative">
                                <div className="border rounded-lg p-3 sm:p-4 border-slate-300/40 bg-gray-50/30 dark:border-gray-600/40 dark:bg-gray-800/30">
                                    <div className="flex justify-center items-center h-12 sm:h-14 md:h-16 gap-0.5 sm:gap-1">
                                        {Array.from({ length: 24 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`flex-1 rounded-full relative overflow-hidden ${
                                                    i % 7 === 0 || i % 7 === 3 ? 'bg-gradient-to-t from-primary/60 to-primary-light' : 'bg-gradient-to-t from-primary/80 to-primary-light'
                                                }`}
                                                style={{ height: '83%' }}
                                            >
                                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center font-bold tracking-tight font-serif text-xs sm:text-sm mt-1.5 sm:mt-2 text-primary dark:text-blue-400">
                                    99.99% Uptime
                                </div>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
};

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center gap-1.5 sm:gap-2 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md bg-white/50 border-slate-100 hover:border-primary/20 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-blue-500/30">
        <div className="text-xs sm:text-sm text-primary dark:text-blue-400">{icon}</div>
        <span className="font-medium text-[10px] sm:text-[13px] font-serif text-slate-700 dark:text-gray-200">{text}</span>
    </div>
);

const ToggleRow = ({ label, active }: { label: string; active?: boolean }) => (
    <div className="flex items-center justify-between group/row">
        <div className="flex items-center gap-2 sm:gap-3">
            <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${active ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-300 dark:bg-gray-600'}`} />
            <span className="text-[11px] sm:text-[14px] font-medium font-serif transition-colors text-slate-600 group-hover/row:text-slate-900 dark:text-gray-300 dark:group-hover/row:text-gray-100">{label}</span>
        </div>
        <div className={`w-8 sm:w-10 h-4 sm:h-5 rounded-full px-0.5 py-0.5 flex items-center justify-end transition-colors duration-300 ${active ? 'bg-primary' : 'bg-slate-200 dark:bg-gray-700'}`}>
            <motion.div
                layout
                className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full shadow-sm"
            />
        </div>
    </div>
);

export default WhyChooseUs;
