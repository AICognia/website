import React from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaComments,
  FaCogs,
  FaChartBar,
  FaRobot,
  FaShieldAlt,
  FaBolt,
  FaGlobeAmericas,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

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

  const services = [
    {
      icon: FaPhone,
      title: 'AI Voice Agents',
      description: 'Intelligent phone systems that handle calls 24/7, book appointments, and never miss a lead.',
    },
    {
      icon: FaComments,
      title: 'AI Chatbots',
      description: 'Smart assistants for your website, WhatsApp, and social channels that convert visitors into customers.',
    },
    {
      icon: FaCogs,
      title: 'Workflow Automation',
      description: 'Streamline operations with AI-powered automation that connects your CRM, calendar, and business tools.',
    },
    {
      icon: FaChartBar,
      title: 'Business Intelligence',
      description: 'Turn data into decisions with AI analytics, reporting dashboards, and predictive insights.',
    },
    {
      icon: FaRobot,
      title: 'Custom AI Solutions',
      description: 'Tailored AI systems designed specifically for your industry, workflows, and business goals.',
    },
  ];

  const stats = [
    { value: '50+', label: 'Businesses Transformed' },
    { value: '100K+', label: 'AI Interactions Monthly' },
    { value: '20+', label: 'Languages Supported' },
    { value: '1 Week', label: 'Average Setup Time' },
  ];

  const differentiators = [
    {
      icon: FaBolt,
      title: 'Fast',
      description: 'Live in 1 week, not months. We move fast so you see results quickly.',
    },
    {
      icon: FaShieldAlt,
      title: 'Secure',
      description: 'HIPAA compliant with enterprise-grade encryption. Your data stays protected.',
    },
    {
      icon: FaGlobeAmericas,
      title: 'Scalable',
      description: 'From startups to enterprises. Our solutions grow with your business.',
    },
    {
      icon: FaCheckCircle,
      title: 'Proven',
      description: 'Real results for real businesses. 95% customer satisfaction rate.',
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
              <span className="text-sm text-gray-400">AI Agency</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              We Transform Businesses
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              From voice agents to business intelligence, we build AI solutions
              that drive revenue, cut costs, and give you back your time.
            </p>

            {/* CTA */}
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              See What We Can Build
              <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
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
              What We Do
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              End-to-End AI Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We don't just build chatbots. We architect complete AI systems that transform how your business operates.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <service.icon className="text-xl text-cyan-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
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
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Cognia Section */}
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
              Why Cognia
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Built Different
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're not a platform you configure yourself. We're your AI partner who builds, deploys, and optimizes for you.
            </p>
          </motion.div>

          {/* Differentiators Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-lg text-cyan-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
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
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Let's discuss how AI can solve your specific challenges.
              Book a free consultation with our team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
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

            {/* Trust badges */}
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

export default Company;
