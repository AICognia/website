'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    quote: "Working with Cognia has been a game-changer for our office. What I appreciate the most is how they completely transformed our Monday mornings. Now, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time.",
    author: "Jacob Ojalvo",
    role: "Office Manager, My Smile Miami"
  },
  {
    quote: "After we switched to Cognia AI, the whole situation changed. Calls actually get answered now, even when we're tied up or out on the road, and customers get a response right away instead of voicemail. We've noticed a pretty clear bump in jobs coming in. You stop missing calls, you stop missing work.",
    author: "Elite Auto Repair",
    role: "Auto Repair Shop"
  }
]

const MobileSocialProofSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    setActiveIndex(prev => {
      if (newDirection === 1) return prev === testimonials.length - 1 ? 0 : prev + 1
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 80) navigate(-1)
    else if (info.offset.x < -80) navigate(1)
  }

  return (
    <section className="lg:hidden py-10 overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900">
      <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="text-xl font-serif font-normal text-slate-900 dark:text-gray-100">
          Client Results
        </h2>
      </motion.div>

      {/* Testimonial */}
      <div className="relative min-h-[160px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? 200 : -200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="touch-pan-y"
          >
            <FaQuoteLeft className="text-xl mb-3 text-blue-100 dark:text-blue-500/20" />
            <p className="text-base leading-relaxed mb-4 text-slate-700 dark:text-gray-300">
              "{testimonials[activeIndex].quote}"
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
              — {testimonials[activeIndex].author}, {testimonials[activeIndex].role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center border active:scale-95 border-gray-200 text-slate-500 dark:border-gray-700 dark:text-gray-400"
        >
          <FaChevronLeft className="w-3 h-3" />
        </button>

        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i) }}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? 'w-5 bg-blue-500' : 'w-1.5 bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center border active:scale-95 border-gray-200 text-slate-500 dark:border-gray-700 dark:text-gray-400"
        >
          <FaChevronRight className="w-3 h-3" />
        </button>
      </div>
      </div>
    </section>
  )
}

export default MobileSocialProofSection
