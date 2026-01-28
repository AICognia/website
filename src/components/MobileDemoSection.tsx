'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaPaperPlane, FaArrowRight } from 'react-icons/fa'
import { useTheme } from 'next-themes'

const demoResponses = [
  "I'd be happy to help! What date works best for your consultation?",
  "Perfect! I have availability at 10 AM, 2 PM, or 4 PM. Which time works for you?",
  "You're all set! I've sent a calendar invite with all the details.",
  "Is there anything else I can help you with today?",
]

const MobileDemoSection: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'd like to book a consultation.", sender: 'user' },
    { id: 2, text: "I'd be happy to help! What date works best?", sender: 'bot' },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [responseIndex, setResponseIndex] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  // Track user interaction to only auto-scroll after user sends a message
  const [hasInteracted, setHasInteracted] = useState(false)

  // Use scrollTo on container instead of scrollIntoView to prevent page-level scroll jumps
  useEffect(() => {
    if (chatContainerRef.current && hasInteracted) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, isTyping, hasInteracted])

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return

    setHasInteracted(true)
    setMessages(prev => [...prev, { id: Date.now(), text: inputValue, sender: 'user' }])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: demoResponses[responseIndex % demoResponses.length],
        sender: 'bot'
      }])
      setResponseIndex(prev => prev + 1)
      setIsTyping(false)
    }, 1200)
  }

  return (
    <section className={`lg:hidden py-16 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
          isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-50 text-red-600'
        }`}>
          The Problem
        </span>
        <h2 className={`text-2xl font-serif font-normal mb-3 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
          The Hidden Costs of Manual Operations
        </h2>
        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
          Teams waste hours on repetitive tasks that AI can automate.
        </p>
      </motion.div>

      {/* Stats - Inline, no cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`flex justify-between py-6 mb-8 border-y ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
      >
        <div className="text-center">
          <div className={`text-2xl font-serif font-normal ${isDark ? 'text-red-400' : 'text-red-600'}`}>30%</div>
          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>Still Manual</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-serif font-normal ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>95%</div>
          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>Team at Capacity</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-serif font-normal ${isDark ? 'text-red-400' : 'text-red-600'}`}>$2.4K</div>
          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>Wasted Monthly</div>
        </div>
      </motion.div>

      {/* Chat Demo - Simplified */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`rounded-2xl border overflow-hidden mb-8 ${
          isDark
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-gray-50 border-gray-200'
        }`}
      >
        {/* Chat Header */}
        <div className={`px-4 py-3 border-b flex items-center gap-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <div className="flex-1">
            <div className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>Cognia AI Assistant</div>
            <div className="text-[10px] text-emerald-500 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Online
            </div>
          </div>
          <span className={`px-2 py-0.5 text-[9px] font-semibold rounded-full uppercase ${
            isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
          }`}>
            Live Demo
          </span>
        </div>

        {/* Messages - fixed height to prevent layout shifts */}
        <div ref={chatContainerRef} className="h-48 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-2xl rounded-br-md'
                  : isDark
                    ? 'bg-gray-700 text-gray-200 rounded-2xl rounded-bl-md'
                    : 'bg-white text-slate-800 rounded-2xl rounded-bl-md border border-gray-200'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className={`rounded-2xl rounded-bl-md px-4 py-3 ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className="flex gap-1">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay }}
                      className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className={`p-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              disabled={isTyping}
              className={`flex-1 text-sm outline-none bg-transparent ${
                isDark ? 'text-gray-200 placeholder-gray-500' : 'text-slate-800 placeholder-gray-400'
              }`}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !inputValue.trim()}
              className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white disabled:opacity-50 active:scale-95 transition-transform"
            >
              <FaPaperPlane className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Solution CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
          isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'
        }`}>
          The Solution
        </span>
        <h3 className={`text-xl font-serif font-normal mb-3 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
          Focus on what matters.
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          Let AI automate the routine while your team drives strategy.
        </p>
        <Link
          href="/demo"
          className="inline-flex items-center justify-center h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform"
        >
          Schedule a Consultation
          <FaArrowRight className="ml-2 text-xs" />
        </Link>
      </motion.div>
      </div>
    </section>
  )
}

export default MobileDemoSection
