import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaShieldAlt, FaClock, FaHeadset, FaHospital, FaGavel, FaStore, FaBuilding, FaHotel, FaFileInvoiceDollar, FaHome } from 'react-icons/fa';

// Testimonials data
const testimonials = [
  {
    quote: "Cognia AI increased our appointment bookings by 35% in the first month. The AI handles calls just like our best receptionist.",
    author: "Dr. Sarah Mitchell",
    role: "Medical Director",
    company: "Wellness Medical Group",
    industry: "Healthcare",
    rating: 5,
  },
  {
    quote: "We never miss a client inquiry anymore. The 24/7 availability has been a game-changer for our firm.",
    author: "James Rodriguez",
    role: "Managing Partner",
    company: "Rodriguez Legal",
    industry: "Legal",
    rating: 5,
  },
  {
    quote: "The set up took around a week. We were missing out on a lot of calls before. Now, we are getting more jobs than ever thanks to Cognia AI.",
    author: "Elite Auto Repair",
    role: "Auto Repair Shop",
    company: "Elite Auto Repair",
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

// Trust badges
const trustBadges = [
  { icon: FaShieldAlt, label: 'HIPAA Compliant', color: 'text-green-400' },
  { icon: FaHeadset, label: '24/7 Support', color: 'text-cyan-400' },
  { icon: FaClock, label: '99.9% Uptime', color: 'text-purple-400' },
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

        {/* Trust Badges - Horizontal Strip */}
        <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 mb-12 py-4 border-y border-white/5">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <Icon className={`${badge.color}`} />
                <span className="text-sm text-gray-400">{badge.label}</span>
              </motion.div>
            );
          })}
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

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6"
            >
              {/* Quote icon */}
              <FaQuoteLeft className="text-cyan-500/20 text-3xl absolute top-4 right-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-white/10 pt-4">
                <div className="font-medium text-white">{testimonial.author}</div>
                <div className="text-xs text-gray-500">
                  {testimonial.role} at {testimonial.company}
                </div>
                <div className="inline-block mt-2 px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-full">
                  {testimonial.industry}
                </div>
              </div>
            </motion.div>
          ))}
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
