import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const steps = [
  {
    number: '01',
    title: 'Quick Consultation',
    description: 'We analyze your call flow and business requirements',
    duration: 'Day 1',
  },
  {
    number: '02',
    title: 'AI Configuration',
    description: 'Custom training on your business data and processes',
    duration: 'Days 2-4',
  },
  {
    number: '03',
    title: 'Integration Setup',
    description: 'Connect with your CRM, calendar, and booking systems',
    duration: 'Days 5-6',
  },
  {
    number: '04',
    title: 'Go Live',
    description: 'Your AI receptionist starts handling calls 24/7',
    duration: 'Day 7',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative bg-black py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
            Live in 1 Week
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From first call to fully operational in just 7 days
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center gap-6 lg:gap-12 mb-8 lg:mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="text-xs text-cyan-400 font-medium mb-1">{step.duration}</div>
                  <h3 className="text-lg font-medium text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>

                {/* Number Badge - Center on desktop */}
                <div className="hidden lg:flex w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 rounded-full items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/10">
                  <span className="text-sm font-bold text-cyan-400">{step.number}</span>
                </div>

                {/* Mobile number badge */}
                <div className="lg:hidden flex w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 rounded-full items-center justify-center flex-shrink-0 order-first shadow-lg shadow-cyan-500/10">
                  <span className="text-xs font-bold text-cyan-400">{step.number}</span>
                </div>

                {/* Spacer for desktop layout */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
          >
            Get Your AI Receptionist
            <FaArrowRight className="text-sm" />
          </Link>
          <p className="text-xs text-gray-500 mt-4">
            No credit card required. 1 week free trial.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
