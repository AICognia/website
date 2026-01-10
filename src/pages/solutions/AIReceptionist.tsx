import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaPhone,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaCalendarCheck,
  FaUserTie,
  FaGlobeAmericas
} from 'react-icons/fa';
import SEO from '../../components/SEO';
import { trackTalkToAI } from '../../utils/metaPixel';

const AIReceptionist: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'AI Receptionist', url: '/solutions/ai-receptionist' }
  ];

  const features = [
    {
      icon: FaClock,
      title: 'Never Miss a Call',
      description: 'Your AI receptionist answers every call instantly, 24/7/365. No hold times, no voicemail, no missed opportunities.'
    },
    {
      icon: FaCalendarCheck,
      title: 'Smart Scheduling',
      description: 'Books appointments directly into your calendar. Handles reschedules, cancellations, and sends reminders automatically.'
    },
    {
      icon: FaUserTie,
      title: 'Professional & Natural',
      description: 'Callers can\'t tell it\'s AI. Natural conversations that represent your brand exactly how you want.'
    },
    {
      icon: FaGlobeAmericas,
      title: 'Multilingual',
      description: 'Speaks 20+ languages fluently. Serve your diverse customer base without hiring multilingual staff.'
    }
  ];

  const benefits = [
    'Answer 100% of calls on the first ring',
    'Book 40% more appointments',
    'Reduce staffing costs by 60%',
    'Qualify leads before they reach your team',
    'Integrate with your existing phone system',
    'HIPAA compliant for healthcare practices'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        page="solutions"
        breadcrumbs={breadcrumbs}
        customTitle="AI Receptionist | Cognia AI"
        customDescription="Never miss a call again. AI voice agents that answer calls 24/7, book appointments, and qualify leads. Natural conversations in 20+ languages."
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
              <FaPhone className="text-cyan-400" />
              <span className="text-sm text-gray-400">AI Receptionist</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Your Phone Answered
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                24/7
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              AI voice agents that handle calls, book appointments, and never put customers on hold.
              Like having a receptionist that never sleeps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                Get Started
                <FaArrowRight className="text-sm" />
              </Link>
              <a
                href="tel:+16163263328"
                onClick={() => trackTalkToAI('ai_receptionist_page')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-colors"
              >
                <FaPhone className="text-sm" />
                Call Our AI Demo
              </a>
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
              More Than Just Answering Calls
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A complete front-desk solution that handles everything from scheduling to lead qualification.
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
                Results You Can Expect
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
              Ready to Never Miss a Call?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Book a free consultation and hear our AI receptionist in action.
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

export default AIReceptionist;
