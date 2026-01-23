'use client'

import React from 'react';
import { motion } from 'framer-motion';
import {
    FaShieldAlt,
    FaLock,
    FaFileContract,
    FaCheckCircle,
    FaDatabase,
    FaRoute,
    FaFingerprint,
    FaTrafficLight
} from 'react-icons/fa';
import { cn } from "../lib/utils";
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export interface OrbitingCirclesProps {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
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
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Default to dark to prevent flash (dark is the default theme)
    const isDark = !mounted || resolvedTheme === 'dark';

    return (
        <section className={`py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="container-responsive">
                <div className="text-left max-w-3xl mb-6 sm:mb-10 md:mb-16">
                    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-2 sm:mb-4 md:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                        Your Data Is an Asset.
                        <span className="hidden sm:inline"> Are You Using It?</span>
                    </h2>
                    <p className={`text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        <span className="sm:hidden">Data lives in silos. No one sees the full picture. We change that.</span>
                        <span className="hidden sm:inline">In most companies, data lives in silos. Sales figures in one system. Operations in another.
                        Logistics in spreadsheets. Everyone knows their piece, but no one sees the full picture. We change that.</span>
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
                            className="group bento-card flex flex-col gap-4 sm:gap-6 md:flex-row md:gap-10 items-center p-4 sm:p-6 md:p-8"
                        >
                            <div className="flex-1">
                                <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Data Fragmentation</h3>
                                <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                    <span className="sm:hidden">Systems scattered across departments with no unified view.</span>
                                    <span className="hidden sm:inline">Every department works in a different system: inventory in one place, sales in another platform, logistics in the ERP.</span>
                                </p>
                            </div>
                            <div className="flex-1 w-full h-24 sm:h-28 md:h-32 flex items-end justify-between gap-1 sm:gap-1.5 px-1 sm:px-2 relative">
                                {/* Decorative background glow */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent blur-xl pointer-events-none" />

                                {[35, 55, 40, 65, 50, 75, 60, 85, 70, 95].map((height, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-full relative overflow-hidden ${isDark ? 'bg-gray-700/50' : 'bg-slate-200/50'}`}
                                        style={{ height: `${height}%` }}
                                    >
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: '65%' }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1, duration: 1 }}
                                            className={`absolute bottom-0 left-0 w-full rounded-full ${
                                                i % 7 === 0 || i % 7 === 3 ? 'bg-gradient-to-t from-primary/60 to-primary-light' : 'bg-gradient-to-t from-primary/80 to-primary-light'
                                            }`}
                                        >
                                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent" />
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Card 2: Security & Compliance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group bento-card flex flex-col justify-between p-4 sm:p-6 md:p-8"
                        >
                            <div>
                                <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>No Strategic Intelligence</h3>
                                <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-5 md:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                    <span className="sm:hidden">No unified view to drive strategic decisions.</span>
                                    <span className="hidden sm:inline">Each unit knows their own numbers, but there's no mechanism that sees the whole picture to drive strategic decisions.</span>
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-auto">
                                <Badge icon={<FaCheckCircle />} text="Encrypted" isDark={isDark} />
                                <Badge icon={<FaLock />} text="Secure" isDark={isDark} />
                                <Badge icon={<FaShieldAlt />} text="Protected" isDark={isDark} />
                                <Badge icon={<FaFileContract />} text="Audited" isDark={isDark} />
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
                            className="group bento-card flex flex-col overflow-hidden p-4 sm:p-6 md:p-8"
                        >
                            <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Manual Bottlenecks</h3>
                            <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-5 md:mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                <span className="sm:hidden">Data sits unused without manual analysis.</span>
                                <span className="hidden sm:inline">Until data is manually assembled and analyzed, it just takes up storage without producing value.</span>
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
                                <div className={`absolute top-1 sm:top-2 left-2 sm:left-4 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/40 shadow-[0_2px_8px_rgba(59,130,246,0.2)]' : 'bg-blue-100 shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(30,64,175,0.1)]'}`}>
                                    <span className={`text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider font-serif ${isDark ? 'text-blue-400' : 'text-[#1E40AF]'}`}>Knowledge Base</span>
                                </div>
                                <div className={`absolute top-6 sm:top-8 right-1 sm:right-2 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/40 shadow-[0_2px_8px_rgba(59,130,246,0.2)]' : 'bg-blue-100 shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(30,64,175,0.1)]'}`}>
                                    <span className={`text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider font-serif ${isDark ? 'text-blue-400' : 'text-[#1E40AF]'}`}>Guardrails</span>
                                </div>
                                <div className={`absolute bottom-8 sm:bottom-12 left-1 sm:left-2 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/40 shadow-[0_2px_8px_rgba(59,130,246,0.2)]' : 'bg-blue-100 shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(30,64,175,0.1)]'}`}>
                                    <span className={`text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider font-serif ${isDark ? 'text-blue-400' : 'text-[#1E40AF]'}`}>Brand</span>
                                </div>
                                <div className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/40 shadow-[0_2px_8px_rgba(59,130,246,0.2)]' : 'bg-blue-100 shadow-[4px_4px_8px_rgba(30,64,175,0.15),-4px_-4px_8px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6),inset_-1px_-1px_2px_rgba(30,64,175,0.1)]'}`}>
                                    <span className={`text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider font-serif ${isDark ? 'text-blue-400' : 'text-[#1E40AF]'}`}>Predictable Flows</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4: Exceptional CX */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group bento-card flex flex-col p-4 sm:p-6 md:p-8"
                        >
                            <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Reactive Decisions</h3>
                            <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-5 md:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                <span className="sm:hidden">Decisions based on stale data, not real-time insights.</span>
                                <span className="hidden sm:inline">Executives make decisions based on incomplete information and historical reports rather than real-time insights.</span>
                            </p>

                            <div className="flex-1 space-y-3 sm:space-y-4">
                                <div className={`border rounded-lg p-3 sm:p-4 md:p-6 ${isDark ? 'border-gray-700/50 bg-gray-800/30' : 'border-gray-200/50 bg-gray-50/30'}`}>
                                    <ToggleRow label="Agent Memory" active isDark={isDark} />
                                    <div className="my-2" />
                                    <ToggleRow label="Smart Routing" active isDark={isDark} />
                                    <div className="my-2" />
                                    <ToggleRow label="Human Escalation" active isDark={isDark} />
                                    <div className="my-2" />
                                    <ToggleRow label="30+ Languages" active isDark={isDark} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 5: Uptime */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group bento-card flex flex-col overflow-hidden p-4 sm:p-6 md:p-8 sm:col-span-2 md:col-span-1"
                        >
                            <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Missed Opportunities</h3>
                            <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-5 md:mb-10 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                <span className="sm:hidden">Hidden patterns cost you market advantage daily.</span>
                                <span className="hidden sm:inline">Patterns, trends, and opportunities hidden in your data remain invisible - costing you market advantage every day.</span>
                            </p>

                            <div className="relative">
                                <div className={`border rounded-lg p-3 sm:p-4 ${isDark ? 'border-gray-600/40 bg-gray-800/30' : 'border-slate-300/40 bg-gray-50/30'}`}>
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
                                <div className={`text-center font-bold tracking-tight font-serif text-xs sm:text-sm mt-1.5 sm:mt-2 ${isDark ? 'text-blue-400' : 'text-primary'}`}>
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

const Badge = ({ icon, text, isDark }: { icon: React.ReactNode; text: string; isDark?: boolean }) => (
    <div className={`flex items-center gap-1.5 sm:gap-2 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md ${isDark ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/30' : 'bg-white/50 border-slate-100 hover:border-primary/20'}`}>
        <div className={`text-xs sm:text-sm ${isDark ? 'text-blue-400' : 'text-primary'}`}>{icon}</div>
        <span className={`font-medium text-[10px] sm:text-[13px] font-serif ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>{text}</span>
    </div>
);

const ToggleRow = ({ label, active, isDark }: { label: string; active?: boolean; isDark?: boolean }) => (
    <div className="flex items-center justify-between group/row">
        <div className="flex items-center gap-2 sm:gap-3">
            <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${active ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : isDark ? 'bg-gray-600' : 'bg-slate-300'}`} />
            <span className={`text-[11px] sm:text-[14px] font-medium font-serif transition-colors ${isDark ? 'text-gray-300 group-hover/row:text-gray-100' : 'text-slate-600 group-hover/row:text-slate-900'}`}>{label}</span>
        </div>
        <div className={`w-8 sm:w-10 h-4 sm:h-5.5 rounded-full p-0.5 sm:p-1 flex items-center justify-end transition-colors duration-300 ${active ? 'bg-primary' : isDark ? 'bg-gray-700' : 'bg-slate-200'}`}>
            <motion.div
                layout
                className="w-3 sm:w-3.5 h-3 sm:h-3.5 bg-white rounded-full shadow-sm"
            />
        </div>
    </div>
);

export default WhyChooseUs;
