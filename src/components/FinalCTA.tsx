import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import conversionTracker from '../utils/conversionTracking';

const FinalCTA: React.FC = () => {
  return (
    <section className="relative bg-black py-20 lg:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

      <div className="relative container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-sm text-cyan-400 font-medium">Limited spots available this month</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
            Stop Losing Calls.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Start Closing More.
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Join 50+ businesses that never miss a call.
            Get your AI receptionist live in 1 week.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Primary CTA */}
            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              Start Your Free Trial
              <FaArrowRight className="text-sm" />
            </Link>

            {/* Secondary CTA */}
            <a
              href="tel:+16163263328"
              onClick={() => {
                conversionTracker.trackPhoneCall('+16163263328');
                conversionTracker.trackButtonClick('Talk to AI', 'final_cta_secondary');
              }}
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-colors"
            >
              <FaPhone className="text-sm" />
              <span>Talk to AI</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              1 Week Free Trial
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              HIPAA Compliant
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
