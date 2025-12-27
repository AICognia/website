import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone, FaCheckCircle } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    conversionTracker.trackButtonClick('Final CTA Form Submit', 'final_cta');

    // Track Meta Pixel Lead event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Final CTA Form Submission',
        content_category: 'Lead Capture'
      });
    }

    // Redirect to Calendly with pre-filled info
    const calendlyUrl = `https://calendly.com/cognia-ai/demo?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    window.open(calendlyUrl, '_blank');
    setIsSubmitting(false);
  };

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

          {/* Lead Capture Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50"
            >
              {isSubmitting ? 'Opening Calendly...' : 'Start Your Free Trial'}
              <FaArrowRight className="text-sm" />
            </button>
          </form>

          {/* Secondary CTA */}
          <a
            href="tel:+16163263328"
            onClick={() => {
              conversionTracker.trackPhoneCall('+16163263328');
              conversionTracker.trackButtonClick('Talk to AI', 'final_cta_secondary');
            }}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <FaPhone className="text-sm" />
            <span>Or call to talk to our AI: +1 616-326-3328</span>
          </a>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-10 text-xs text-gray-500">
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
