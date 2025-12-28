import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCogs,
  FaArrowRight,
  FaCheckCircle,
  FaPlug,
  FaBolt,
  FaSync,
  FaShieldAlt
} from 'react-icons/fa';
import SEO from '../../components/SEO';

const WorkflowAutomation: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'Workflow Automation', url: '/solutions/workflow-automation' }
  ];

  const features = [
    {
      icon: FaPlug,
      title: 'Connect Everything',
      description: 'Link your CRM, calendar, email, billing, and 1000+ other tools. No more copy-pasting between systems.'
    },
    {
      icon: FaBolt,
      title: 'Instant Triggers',
      description: 'New lead? Send an email, add to CRM, notify sales, and schedule follow-up—all automatically in seconds.'
    },
    {
      icon: FaSync,
      title: 'Keep Data in Sync',
      description: 'Update once, update everywhere. Customer data stays consistent across all your systems.'
    },
    {
      icon: FaShieldAlt,
      title: 'Error-Free Operations',
      description: 'Eliminate human error in repetitive tasks. Automations run perfectly every single time.'
    }
  ];

  const useCases = [
    'Automatic lead routing and follow-up sequences',
    'Invoice generation and payment reminders',
    'Customer onboarding workflows',
    'Appointment confirmations and reminders',
    'Report generation and distribution',
    'Data entry and CRM updates'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        page="solutions"
        breadcrumbs={breadcrumbs}
        customTitle="Workflow Automation | Cognia AI"
        customDescription="Automate repetitive tasks and connect your business tools. Custom workflows that save hours every week and eliminate human error."
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
              <FaCogs className="text-cyan-400" />
              <span className="text-sm text-gray-400">Workflow Automation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Stop Doing
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Repetitive Work
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Custom automations that connect your tools, eliminate manual tasks, and free your team to focus on what matters.
            </p>

            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
            >
              Get Started
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
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We build custom automations tailored to your exact workflows and tech stack.
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

      {/* Use Cases Section */}
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
                Common Automations We Build
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{useCase}</span>
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
              Ready to Automate Your Workflows?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Book a free consultation and we'll identify automation opportunities that save you hours every week.
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

export default WorkflowAutomation;
