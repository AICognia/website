import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaComments,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaGlobeAmericas,
  FaChartLine,
  FaPlug,
  FaRobot
} from 'react-icons/fa';
import SEO from '../../components/SEO';

const AIChatbot: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'AI Chatbot', url: '/solutions/chatbot' }
  ];

  const features = [
    {
      icon: FaClock,
      title: '24/7 Availability',
      description: 'Never miss a lead. Your AI chatbot works around the clock, engaging visitors and capturing opportunities while you sleep.'
    },
    {
      icon: FaGlobeAmericas,
      title: '30+ Languages',
      description: 'Speak your customers\' language. Automatic detection and fluent responses in over 30 languages.'
    },
    {
      icon: FaPlug,
      title: 'Multi-Channel',
      description: 'Deploy on your website, WhatsApp, Facebook Messenger, Instagram, and more from a single platform.'
    },
    {
      icon: FaChartLine,
      title: 'Lead Qualification',
      description: 'Automatically qualify leads, book appointments, and route hot prospects to your sales team.'
    }
  ];

  const benefits = [
    'Convert 3x more website visitors into leads',
    'Reduce response time from hours to seconds',
    'Handle unlimited concurrent conversations',
    'Seamless handoff to human agents when needed',
    'Full conversation analytics and insights',
    'Custom-trained on your business knowledge'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        page="solutions"
        breadcrumbs={breadcrumbs}
        customTitle="AI Chatbot | Cognia AI"
        customDescription="Convert more visitors with AI chatbots that work 24/7. Deploy on your website, WhatsApp, and social channels. 30+ languages supported."
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
              <FaComments className="text-cyan-400" />
              <span className="text-sm text-gray-400">AI Chatbot</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Turn Visitors Into
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Customers
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              AI chatbots that engage, qualify, and convert your website visitors 24/7.
              No more missed opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                Get Started
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/chatbot"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-colors"
              >
                <FaRobot className="text-sm" />
                Try Live Demo
              </Link>
            </div>
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
              Why Businesses Choose Our Chatbots
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Not just another chatbot. An AI-powered sales and support agent that understands your business.
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

      {/* Benefits Section */}
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
                What You Get
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
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
              Ready to Convert More Visitors?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Book a free consultation and see how our AI chatbot can transform your customer engagement.
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

export default AIChatbot;
