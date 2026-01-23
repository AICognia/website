'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Link from 'next/link';
import {
  IconChevronRightFill18,
  IconPaperPlane2Fill18,
  IconPhoneFill18,
  IconFlameFill18
} from 'nucleo-ui-essential-fill-18';
import ROIAnalyticsCard from './ui/analytics-bento';
import { useTheme } from 'next-themes';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

// Pre-defined conversation responses for the fake interactive demo
const demoResponses = [
  "I'd be happy to help! What date works best for your consultation?",
  "Perfect! I have availability at 10 AM, 2 PM, or 4 PM. Which time works for you?",
  "You're all set! I've sent a calendar invite to your email with all the details.",
  "Is there anything else I can help you with today?",
];

const DemoSection: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'd like to book a consultation.", sender: 'user' },
    { id: 2, text: "I'd be happy to help! What date works best for your consultation?", sender: 'bot' },
    { id: 3, text: "How about next Tuesday?", sender: 'user' },
    { id: 4, text: "Tuesday works! I have 10 AM, 2 PM, or 4 PM available. Which time suits you?", sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark';

  // Track if user has interacted with the chat
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-scroll to bottom when new messages arrive (only after user interaction)
  useEffect(() => {
    if (messagesEndRef.current && hasInteracted) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, hasInteracted]);

  const handleSendMessage = () => {
    if (inputValue.trim() && !isTyping) {
      // Mark as interacted so auto-scroll starts working
      setHasInteracted(true);

      // Add user message
      const userMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user' as const,
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      // Simulate bot typing and response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: demoResponses[responseIndex % demoResponses.length],
          sender: 'bot' as const,
        };
        setMessages(prev => [...prev, botResponse]);
        setResponseIndex(prev => prev + 1);
        setIsTyping(false);
      }, 1200);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-responsive">

        <div className="text-left max-w-3xl mb-8 sm:mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-block px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50'}`}
          >
            The Problem
          </motion.span>
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : ''}`}>
            The Hidden Costs of Manual Work
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">

          {/* Card 1: Live Assistant Chat Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-5 relative"
          >
            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className={`absolute -top-2 sm:-top-3 -right-1 sm:-right-2 z-30 rounded-lg sm:rounded-xl shadow-lg border px-2 sm:px-3 py-1.5 sm:py-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200/50'}`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className={`text-[9px] sm:text-[11px] font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Booking Confirmed</div>
                  <div className={`text-[8px] sm:text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Just now</div>
                </div>
              </div>
            </motion.div>

            <div className="bento-card flex flex-col h-full">
              {/* Card Header */}
              <div className="mb-3 sm:mb-4">
                <span className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold rounded-full mb-2 sm:mb-3 ${isDark ? 'text-emerald-400 bg-emerald-900/30' : 'text-emerald-600 bg-emerald-50'}`}>
                  Live Demo
                </span>
                <h3 className={`text-lg sm:text-xl font-serif font-medium mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Never Miss a Customer.</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  AI assistants handle calls 24/7 so you capture every opportunity.
                </p>
              </div>

              {/* Chat Interface */}
              <div className={`flex-1 border rounded-lg sm:rounded-xl overflow-hidden flex flex-col ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'}`}>
                {/* Messages Area - scrollable */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 p-3 sm:p-4 space-y-2 sm:space-y-3 overflow-y-auto scrollbar-hide"
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] sm:max-w-[80%] px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-[13px] leading-relaxed ${msg.sender === 'user'
                        ? 'bg-primary text-white rounded-xl sm:rounded-2xl rounded-br-md'
                        : isDark
                          ? 'bg-gray-700 text-gray-200 border border-gray-600 rounded-xl sm:rounded-2xl rounded-bl-md shadow-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-xl sm:rounded-2xl rounded-bl-md shadow-sm'
                        }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className={`border rounded-xl sm:rounded-2xl rounded-bl-md shadow-sm px-3 sm:px-4 py-2 sm:py-3 ${isDark ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-800 border-gray-200'}`}>
                        <div className="flex gap-1">
                          {[0, 0.15, 0.3].map((delay, i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay }}
                              className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar - fixed at bottom of chat container */}
                <div className={`shrink-0 p-2 sm:p-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`flex items-center gap-2 rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      disabled={isTyping}
                      className={`flex-1 text-xs sm:text-sm outline-none bg-transparent disabled:opacity-50 ${isDark ? 'text-gray-200 placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isTyping || !inputValue.trim()}
                      className="w-7 sm:w-8 h-7 sm:h-8 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <IconPaperPlane2Fill18 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="md:col-span-2 lg:col-span-7 flex flex-col gap-4 sm:gap-5 lg:gap-6">

            {/* Row 1: Problem Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 flex-1">

              {/* Card 2: Missed Revenue - Ring Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bento-card flex flex-col"
              >
                <div className="mb-3 sm:mb-4">
                  <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 border ${isDark ? 'bg-red-900/30 text-red-400 border-red-800/50' : 'bg-red-50 text-red-500 border-red-100'}`}>
                    <IconPhoneFill18 size={16} />
                  </div>
                  <h3 className={`text-base sm:text-lg font-semibold mb-1 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Missed Revenue</h3>
                  <p className={`text-[11px] sm:text-[13px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Unanswered calls during business hours.
                  </p>
                </div>

                {/* Ring chart on glass card */}
                <div className="flex-1 flex items-center justify-center">
                  <div className={`backdrop-blur-sm border rounded-xl sm:rounded-2xl p-3 sm:p-5 ${isDark ? 'bg-gray-800/60 border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'bg-white/60 border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'}`}>
                    <div className="flex items-center gap-3 sm:gap-5">
                      {/* Ring */}
                      <div className="relative w-16 sm:w-24 h-16 sm:h-24 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={isDark ? '#374151' : '#fee2e2'}
                            strokeWidth="10"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="url(#redGradient)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray="251.2"
                            initial={{ strokeDashoffset: 251.2 }}
                            whileInView={{ strokeDashoffset: 251.2 * 0.7 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                          />
                          <defs>
                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-base sm:text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                            <AnimatedCounter value={30} suffix="%" />
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <div>
                          <div className={`text-[8px] sm:text-[10px] uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Calls Missed</div>
                          <div className={`text-sm sm:text-base font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>3 in 10</div>
                        </div>
                        <div>
                          <div className={`text-[8px] sm:text-[10px] uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Monthly Loss</div>
                          <div className={`text-sm sm:text-base font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>~$<AnimatedCounter value={2400} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Team Overload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bento-card flex flex-col"
              >
                <div className="mb-3 sm:mb-4">
                  <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 border ${isDark ? 'bg-orange-900/30 text-orange-400 border-orange-800/50' : 'bg-orange-50 text-orange-500 border-orange-100'}`}>
                    <IconFlameFill18 size={16} />
                  </div>
                  <h3 className={`text-base sm:text-lg font-semibold mb-1 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Team Overload</h3>
                  <p className={`text-[11px] sm:text-[13px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Repetitive questions drain your team.
                  </p>
                </div>

                {/* Capacity bars */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-end justify-between gap-2 sm:gap-3 h-20 sm:h-28 px-1">
                    {[
                      { day: 'Mon', value: 65 },
                      { day: 'Tue', value: 78 },
                      { day: 'Wed', value: 92 },
                      { day: 'Thu', value: 88 },
                      { day: 'Fri', value: 95 },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center flex-1 h-full">
                        <div className="flex-1 w-full flex flex-col justify-end relative">
                          <div className={`absolute inset-0 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${item.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                            className={`relative w-full rounded-lg ${
                              item.value > 85 ? 'bg-gradient-to-t from-red-500 to-red-400' :
                              item.value > 70 ? 'bg-gradient-to-t from-orange-500 to-orange-400' :
                              'bg-gradient-to-t from-amber-500 to-amber-400'
                            }`}
                          />
                        </div>
                        <span className={`text-[8px] sm:text-[10px] mt-1.5 sm:mt-2 font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.day}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center mt-3 sm:mt-4"
                  >
                    <div className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border ${isDark ? 'bg-red-900/30 border-red-800/50' : 'bg-red-50 border-red-100'}`}>
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className={`text-[8px] sm:text-[10px] font-semibold uppercase tracking-wide ${isDark ? 'text-red-400' : 'text-red-600'}`}>At Capacity</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Row 2: Analytics + CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {/* Analytics Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bento-card p-0 overflow-hidden"
              >
                <ROIAnalyticsCard />
              </motion.div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bento-card flex flex-col justify-between"
              >
                <div>
                  <span className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold rounded-full mb-3 sm:mb-4 ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-primary bg-blue-50'}`}>
                    The Solution
                  </span>
                  <h3 className={`text-lg sm:text-xl font-serif font-medium mb-1.5 sm:mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Focus on what matters.</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Let AI handle the routine while your team grows the business. See measurable ROI from day one.
                  </p>
                </div>

                <Link
                  href="/demo"
                  className="btn-primary h-10 sm:h-12 px-4 sm:px-6 rounded-full text-sm sm:text-base mt-4 sm:mt-6 w-full justify-center"
                >
                  <span>Schedule a Consultation</span>
                  <span className="ml-2"><IconChevronRightFill18 size={16} /></span>
                </Link>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DemoSection;
