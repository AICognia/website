import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaClock, FaHeadset, FaHospital, FaGavel, FaStore, FaBuilding, FaHotel, FaFileInvoiceDollar, FaHome, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Testimonials data
const testimonials = [
  {
    shortQuote: "Working with Cognia has been a game-changer for our office. They completely transformed our Monday mornings — no more 45-minute voicemail sessions.",
    fullQuote: "Working with Cognia has been a game-changer for our office.\n\nWhat I appreciate the most is how they completely transformed our Monday mornings. Before Cognia, I would spend 45 minutes just waiting for the voicemail system to run so I could go through every message. It was slow, inefficient, and honestly a stressful way to start the week.\n\nNow, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time. And if a patient requests an appointment over the weekend, Cognia schedules it for us — no backlog, no delays.\n\nIt has made our workflow faster, more organized, and much more efficient.",
    author: "Jacob Ojalvo",
    role: "My Smile Miami",
    company: "",
    industry: "Healthcare",
    rating: 5,
  },
  {
    shortQuote: "After we switched to Cognia AI, the whole situation changed. Calls actually get answered now, and we've noticed a pretty clear bump in jobs coming in.",
    fullQuote: "It took about a week to get everything set up, which honestly wasn't bad considering how busy we were at the time. Before this, we were missing way more calls than we ever thought. People would ring while we were on another job, or they'd call after hours, weekends, early mornings, you name it. Half the time we didn't even notice until someone complained that nobody picked up.\n\nAfter we switched to Cognia AI, the whole situation changed. Calls actually get answered now, even when we're tied up or out on the road, and customers get a response right away instead of voicemail. Over the last few weeks, we've noticed a pretty clear bump in jobs coming in. It's not like some dramatic overnight miracle or anything, but the difference is real. You stop missing calls, you stop missing work.\n\nSo yeah, the setup took a week, and now we're getting more jobs than we've ever gotten just because we aren't missing calls anymore.",
    author: "Elite Auto Repair",
    role: "Auto Repair Shop",
    company: "",
    industry: "Automotive",
    rating: 5,
  },
];

// Stats data
const stats = [
  { value: '50+', label: 'Businesses Served', icon: FaBuilding },
  { value: '100K+', label: 'Calls Handled', icon: FaHeadset },
  { value: '95%', label: 'Satisfaction Rate', icon: FaStar },
  { value: '1 Week', label: 'Avg Setup Time', icon: FaClock },
];

// Industries served
const industries = [
  { icon: FaHospital, label: 'Healthcare' },
  { icon: FaGavel, label: 'Legal' },
  { icon: FaStore, label: 'Retail' },
  { icon: FaBuilding, label: 'Enterprise' },
  { icon: FaFileInvoiceDollar, label: 'Insurance' },
  { icon: FaHotel, label: 'Hospitality' },
  { icon: FaHome, label: 'Home Services' },
];

const SocialProofSection: React.FC = () => {
  // Use a Set to allow multiple testimonials to be expanded independently
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const toggleExpand = (index: number) => {
    setExpandedIndices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="relative bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Trusted by Businesses
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
            Join 50+ Companies Using AI
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See why businesses trust Cognia AI to handle their most important customer conversations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 lg:p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <Icon className="text-2xl text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-gray-500">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials - Side by Side Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial, index) => {
            const isExpanded = expandedIndices.has(index);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col"
              >
                {/* Quote icon */}
                <FaQuoteLeft className="text-cyan-500/30 text-2xl mb-4" />

                {/* Quote - Expandable */}
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    {isExpanded ? (
                      <motion.p
                        key="full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-300 text-sm lg:text-base leading-relaxed whitespace-pre-line"
                      >
                        "{testimonial.fullQuote}"
                      </motion.p>
                    ) : (
                      <motion.p
                        key="short"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-300 text-sm lg:text-base leading-relaxed"
                      >
                        "{testimonial.shortQuote}"
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Read More / Read Less Button */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-3 flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <span>Read less</span>
                        <FaChevronUp className="text-xs" />
                      </>
                    ) : (
                      <>
                        <span>Read more</span>
                        <FaChevronDown className="text-xs" />
                      </>
                    )}
                  </button>
                </div>

                {/* Author - Bottom section */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <div className="font-medium text-white">{testimonial.author}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    {testimonial.company ? `${testimonial.role} at ${testimonial.company}` : testimonial.role}
                  </div>
                  <div className="inline-block w-fit px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-full">
                    {testimonial.industry}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Industries Served */}
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
            Industries We Serve
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                >
                  <Icon className="text-gray-400" />
                  <span className="text-sm text-gray-400">{industry.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
