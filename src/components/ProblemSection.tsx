import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneSlash, FaDollarSign, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const painPoints = [
  {
    icon: FaPhoneSlash,
    stat: '62%',
    label: 'of calls go unanswered',
    description: 'Each missed call is a lost customer',
  },
  {
    icon: FaDollarSign,
    stat: '$1,200',
    label: 'lost per missed call',
    description: 'Average lifetime value you never capture',
  },
  {
    icon: FaClock,
    stat: '8 hrs',
    label: 'staff time on phone daily',
    description: 'Time that could be spent on patients',
  },
  {
    icon: FaExclamationTriangle,
    stat: '35%',
    label: 'of leads never called back',
    description: 'Voicemails that fall through the cracks',
  },
];

const ProblemSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-black overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-black to-black" />

      <div className="relative container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-full">
            The Problem
          </span>
          <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
            Every Missed Call Costs You Money
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            While you're busy with customers, potential revenue walks away
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-red-500/30 hover:bg-red-500/[0.02] transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                <point.icon className="text-xl text-red-400" />
              </div>

              {/* Stat */}
              <div className="text-4xl font-bold text-white mb-1 group-hover:text-red-100 transition-colors">{point.stat}</div>
              <div className="text-sm font-medium text-red-400 mb-2">{point.label}</div>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{point.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-gray-500 mt-12"
        >
          <span className="text-white font-medium">You don't have a phone problem.</span>{' '}
          You have a capacity problem. AI solves it.
        </motion.p>
      </div>
    </section>
  );
};

export default ProblemSection;
