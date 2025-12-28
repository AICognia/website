import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaArrowRight,
  FaCheckCircle,
  FaLightbulb,
  FaCogs,
  FaRocket,
  FaQuoteLeft,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import conversionTracker from '../utils/conversionTracking';

const Company: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Company', url: '/company' }
  ];

  const aboutStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Cognia AI',
      description: 'AI agency that transforms businesses with voice AI, chatbots, automation, and business intelligence.',
      foundingDate: '2023',
    }
  };

  // Initialize Meta Pixel and track PageView
  useEffect(() => {
    // Initialize Meta Pixel if not already loaded
    if (!(window as any).fbq) {
      /* eslint-disable */
      (function(f: any, b: any, e: any, v: any) {
        let n: any;
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        const t = b.createElement(e);
        t.async = !0;
        t.src = v;
        const s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
    }

    (window as any).fbq('set', 'autoConfig', false, '1224660309537951');
    (window as any).fbq('init', '1224660309537951', {}, { autoConfig: false });
    (window as any).fbq('track', 'PageView');
  }, []);

  // Track CTA clicks
  const trackCTAClick = (source: string) => {
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', 'InitiateCheckout', {
        content_name: 'Company Page CTA',
        source: source,
      });
    }
    conversionTracker.trackButtonClick('CTA Click', source);
  };

  // Track phone call
  const trackPhoneClick = () => {
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', 'TalkToAI', {
        source: 'company_page',
      });
    }
    conversionTracker.trackPhoneCall('+16163263328');
  };

  // Problems we solve - outcome focused
  const problemsSolved = [
    {
      problem: 'Missing Calls & Losing Leads',
      outcome: 'Every call answered in under 1 second, 24/7. No more leads going to voicemail or competitors.',
      stat: '10-20% more revenue',
    },
    {
      problem: 'Staff Overwhelmed with Repetitive Tasks',
      outcome: 'AI handles scheduling, follow-ups, and data entry automatically. Your team focuses on what matters.',
      stat: '2+ hours saved daily',
    },
    {
      problem: 'Website Visitors Not Converting',
      outcome: 'AI chat engages visitors instantly, answers questions, and books appointments while they browse.',
      stat: '3x more conversions',
    },
    {
      problem: 'No Time to Analyze Your Data',
      outcome: 'Get real-time dashboards and AI insights that help you make faster, smarter business decisions.',
      stat: 'Decisions in minutes',
    },
    {
      problem: "Not Sure Where AI Fits In",
      outcome: 'We audit your operations and identify exactly where AI will drive the biggest ROI for your business.',
      stat: 'Custom AI roadmap',
    },
    {
      problem: 'Need a Custom AI Solution',
      outcome: 'We design and build AI systems tailored to your industry, workflows, and specific business goals.',
      stat: 'Built for you',
    },
  ];

  // ROI-focused stats
  const stats = [
    { value: '76%', label: 'Cost Reduction', sublabel: 'vs. traditional staff' },
    { value: '10-20%', label: 'Revenue Increase', sublabel: 'from captured leads' },
    { value: '24/7', label: 'Availability', sublabel: 'never miss a call' },
    { value: '1 Week', label: 'Time to Launch', sublabel: 'not months' },
  ];

  // How we work - simple 3 step process
  const process = [
    {
      icon: FaLightbulb,
      step: '01',
      title: 'Discovery',
      description: 'We learn your business, identify opportunities, and design a custom AI solution.',
    },
    {
      icon: FaCogs,
      step: '02',
      title: 'Build & Integrate',
      description: 'We build your AI system and integrate it with your existing tools and workflows.',
    },
    {
      icon: FaRocket,
      step: '03',
      title: 'Launch & Optimize',
      description: 'Go live in 1 week. We monitor, optimize, and ensure you see real results.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        page="company"
        breadcrumbs={breadcrumbs}
        structuredData={[aboutStructuredData]}
      />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-sm text-gray-400">Your AI Transformation Partner</span>
            </div>

            {/* Headline - Outcome focused */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              More Revenue. Less Cost.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Powered by AI.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              We're not a platform you configure yourself. We're your AI partner who
              builds, deploys, and optimizes complete solutions—from voice agents to
              business intelligence.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                onClick={() => trackCTAClick('company_hero')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                Get Your Free AI Audit
                <FaArrowRight className="text-sm" />
              </Link>
              <a
                href="tel:+16163263328"
                onClick={trackPhoneClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-colors"
              >
                <FaPhone className="text-sm" />
                Talk to Our AI
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - ROI focused */}
      <section className="relative py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-white mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full uppercase tracking-wider">
              What We Solve
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Your Problems. Our Solutions.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We don't just build AI. We solve real business problems that cost you
              time, money, and customers.
            </p>
          </motion.div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {problemsSolved.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Problem */}
                <p className="text-sm text-red-400/80 mb-3 font-medium">
                  {item.problem}
                </p>
                {/* Outcome */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {item.outcome}
                </p>
                {/* Stat */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                  <FaCheckCircle className="text-cyan-400 text-xs" />
                  <span className="text-xs text-cyan-400 font-medium">{item.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="relative py-20 lg:py-28 bg-white/[0.01]">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full uppercase tracking-wider">
              How We Work
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              From Idea to Live in 1 Week
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We handle everything. You focus on running your business.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                )}

                {/* Step number */}
                <div className="text-5xl font-bold text-white/5 mb-4">
                  {item.step}
                </div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-lg text-cyan-400" />
                </div>
                {/* Title */}
                <h3 className="text-lg font-medium text-white mb-2">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-8 lg:p-12">
              {/* Quote icon */}
              <FaQuoteLeft className="text-3xl text-cyan-500/30 mb-6" />

              {/* Quote */}
              <blockquote className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8">
                "We were missing 30% of our calls. Now our AI answers every single one.
                We booked 40 more appointments last month alone. The ROI was immediate."
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  JO
                </div>
                <div>
                  <div className="font-medium text-white">Jacob O.</div>
                  <div className="text-sm text-gray-500">My Smile Miami</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Cognia Section */}
      <section className="relative py-20 lg:py-28 bg-white/[0.01]">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full uppercase tracking-wider">
              Why Cognia
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              We're Not a Platform. We're Your Partner.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Unlike DIY tools, we do the work for you. Strategy, development,
              integration, optimization—all handled.
            </p>
          </motion.div>

          {/* Comparison */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {/* DIY Platforms */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl"
            >
              <h3 className="text-lg font-medium text-gray-400 mb-4">DIY AI Platforms</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>You figure out the strategy yourself</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Weeks of learning and configuration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Generic templates that don't fit your business</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Support tickets, not real partnership</span>
                </li>
              </ul>
            </motion.div>

            {/* Cognia */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl"
            >
              <h3 className="text-lg font-medium text-white mb-4">Cognia AI</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                  <span>We audit your business and build the strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                  <span>Live in 1 week, fully configured</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                  <span>Custom-built for your workflows and industry</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                  <span>Dedicated team that optimizes continuously</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-sm text-cyan-400 font-medium">Limited spots available this month</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Book a free AI audit. We'll show you exactly where AI can
              drive revenue and cut costs in your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                onClick={() => trackCTAClick('company_bottom_cta')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                Get Your Free AI Audit
                <FaArrowRight className="text-sm" />
              </Link>
              <a
                href="tel:+16163263328"
                onClick={trackPhoneClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-colors"
              >
                <FaPhone className="text-sm" />
                Talk to Our AI
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 mt-10">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Free Consultation
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                1 Week Free Trial
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                HIPAA Compliant
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Company;
