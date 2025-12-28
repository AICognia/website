import React from 'react';
import {
  FaComments, FaPhone, FaCogs, FaSearchDollar, FaChartBar, FaRobot,
  FaArrowRight, FaCheckCircle, FaCalendarCheck
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Solutions: React.FC = () => {
  const products = [
    {
      icon: FaComments,
      title: 'AI Chatbot',
      description: 'Convert website visitors into customers 24/7 with intelligent chatbots that engage, qualify, and close.',
      path: '/solutions/chatbot',
      features: [
        'Deploy on website, WhatsApp, Facebook, Instagram',
        'Automatic lead qualification and routing',
        '30+ languages supported',
        'Seamless human handoff when needed'
      ],
      color: 'cyan'
    },
    {
      icon: FaPhone,
      title: 'AI Receptionist',
      description: 'Never miss a call again. AI voice agents that answer, book appointments, and handle inquiries 24/7.',
      path: '/solutions/ai-receptionist',
      features: [
        'Instant call answering, no hold times',
        'Smart scheduling with calendar sync',
        'Natural, human-like conversations',
        'HIPAA compliant for healthcare'
      ],
      color: 'green'
    },
    {
      icon: FaCogs,
      title: 'Workflow Automation',
      description: 'Connect your tools and eliminate repetitive work. Custom automations that save hours every week.',
      path: '/solutions/workflow-automation',
      features: [
        'Connect CRM, calendar, email, and 1000+ tools',
        'Automatic lead follow-up sequences',
        'Invoice and payment automation',
        'Error-free data synchronization'
      ],
      color: 'purple'
    },
    {
      icon: FaSearchDollar,
      title: 'AI Audit',
      description: 'Discover where AI can transform your business. Comprehensive analysis with ROI projections.',
      path: '/solutions/ai-audit',
      features: [
        'Complete AI opportunity assessment',
        'ROI projections for each opportunity',
        'Prioritized implementation roadmap',
        '60-minute strategy session included'
      ],
      color: 'yellow'
    },
    {
      icon: FaChartBar,
      title: 'Business Intelligence',
      description: 'Turn data into decisions. AI-powered dashboards, automated reports, and predictive insights.',
      path: '/solutions/business-intelligence',
      features: [
        'Connect all your data sources',
        'Real-time dashboards and KPIs',
        'AI-powered trend analysis',
        'Automated report generation'
      ],
      color: 'blue'
    },
    {
      icon: FaRobot,
      title: 'Custom AI Solutions',
      description: 'Your business is unique. We build custom AI systems designed for your specific challenges.',
      path: '/solutions/custom-ai',
      features: [
        'Bespoke AI model development',
        'Enterprise-grade security',
        'Seamless integration with existing systems',
        'Ongoing support and optimization'
      ],
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
      green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
      yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
      pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400' }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO page="solutions" />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-sm text-gray-400">Our Products</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              AI Solutions That
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Drive Results
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              From voice agents to business intelligence, we build AI that transforms how you work and serve customers.
            </p>

            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
            >
              Book Free Consultation
              <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => {
              const colors = getColorClasses(product.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={product.path}
                    className="block h-full p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/20 hover:bg-white/[0.04] transition-all group"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <product.icon className={`text-2xl ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                          <FaCheckCircle className={`mt-0.5 flex-shrink-0 ${colors.text}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      Learn more
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-sm text-gray-400">Businesses Transformed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">100K+</div>
                  <div className="text-sm text-gray-400">AI Interactions Monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">30+</div>
                  <div className="text-sm text-gray-400">Languages Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">1 Week</div>
                  <div className="text-sm text-gray-400">Average Setup Time</div>
                </div>
              </div>
            </div>
          </motion.div>
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
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Book a free consultation. We'll analyze your business and recommend the right AI solutions for your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Book Free Consultation
                <FaArrowRight className="text-sm" />
              </Link>
              <a
                href="tel:+16163263328"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-colors"
              >
                <FaPhone className="text-sm" />
                Talk to Our AI
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 mt-10">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Free Consultation
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                No Obligation
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

export default Solutions;
