import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaPuzzlePiece,
  FaHeadset,
  FaShieldAlt
} from 'react-icons/fa';
import SEO from '../../components/SEO';

const CustomAI: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'Custom AI', url: '/solutions/custom-ai' }
  ];

  const features = [
    {
      icon: FaCode,
      title: 'Built for You',
      description: 'Not a template. Custom AI solutions designed specifically for your industry, workflows, and goals.'
    },
    {
      icon: FaPuzzlePiece,
      title: 'Perfect Integration',
      description: 'Works seamlessly with your existing tools and processes. No disruption to current operations.'
    },
    {
      icon: FaHeadset,
      title: 'Ongoing Support',
      description: 'We don\'t just build and disappear. Continuous optimization and support to ensure success.'
    },
    {
      icon: FaShieldAlt,
      title: 'Enterprise Security',
      description: 'Built with security first. HIPAA compliant, SOC 2 ready, with enterprise-grade encryption.'
    }
  ];

  const examples = [
    'AI-powered document processing and extraction',
    'Custom NLP models for your domain',
    'Intelligent process automation',
    'Predictive analytics and forecasting',
    'Computer vision applications',
    'Custom LLM fine-tuning and deployment'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        page="solutions"
        breadcrumbs={breadcrumbs}
        customTitle="Custom AI Solutions | Cognia AI"
        customDescription="Bespoke AI systems built for your unique business needs. From custom models to complex integrations, we build AI that works for you."
      />

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
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <FaRobot className="text-cyan-400" />
              <span className="text-sm text-gray-400">Custom AI Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              AI Built
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Just for You
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Your business is unique. Your AI should be too. We build custom AI solutions that solve your specific challenges.
            </p>

            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
            >
              Discuss Your Project
              <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Our Approach
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From discovery to deployment, we partner with you to build AI that delivers real results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <feature.icon className="text-xl text-cyan-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 lg:p-12"
            >
              <h2 className="text-2xl lg:text-3xl font-light text-white mb-8 text-center">
                What We Can Build
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{example}</span>
                  </div>
                ))}
              </div>
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
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Have a Unique Challenge?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Let's talk about what you're trying to solve. Book a free consultation with our AI architects.
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
    </div>
  );
};

export default CustomAI;
