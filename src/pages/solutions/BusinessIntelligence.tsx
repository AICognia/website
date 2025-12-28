import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaChartBar,
  FaArrowRight,
  FaCheckCircle,
  FaDatabase,
  FaChartLine,
  FaBrain,
  FaFileAlt
} from 'react-icons/fa';
import SEO from '../../components/SEO';
import { trackCTAClick } from '../../utils/metaPixel';

const BusinessIntelligence: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'Business Intelligence', url: '/solutions/business-intelligence' }
  ];

  const features = [
    {
      icon: FaDatabase,
      title: 'Unified Data',
      description: 'Connect all your data sources—CRM, accounting, marketing, ops—into one clear picture.'
    },
    {
      icon: FaChartLine,
      title: 'Real-Time Dashboards',
      description: 'Live metrics that update automatically. Know exactly how your business is performing right now.'
    },
    {
      icon: FaBrain,
      title: 'AI-Powered Insights',
      description: 'Go beyond charts. AI analyzes your data to surface trends, anomalies, and opportunities you\'d miss.'
    },
    {
      icon: FaFileAlt,
      title: 'Automated Reports',
      description: 'Weekly, monthly, or custom reports delivered to your inbox. No manual work required.'
    }
  ];

  const useCases = [
    'Sales performance tracking and forecasting',
    'Customer behavior and retention analytics',
    'Marketing ROI and attribution',
    'Operational efficiency metrics',
    'Financial reporting and KPIs',
    'Predictive analytics for demand planning'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        page="solutions"
        breadcrumbs={breadcrumbs}
        customTitle="Business Intelligence | Cognia AI"
        customDescription="Turn your data into decisions. AI-powered dashboards, automated reports, and predictive insights that drive business growth."
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
              <FaChartBar className="text-cyan-400" />
              <span className="text-sm text-gray-400">Business Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Data That Drives
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Decisions
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Stop guessing. Get real-time dashboards, AI-powered insights, and automated reports that show you exactly what's working.
            </p>

            <Link
              to="/demo"
              onClick={() => trackCTAClick('business_intelligence_page')}
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
              From Data Chaos to Clarity
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We build custom BI solutions that give you the insights you need to grow.
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
                What We Build
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
              Ready to Unlock Your Data?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Book a free consultation and we'll show you how to turn your data into actionable insights.
            </p>

            <Link
              to="/demo"
              onClick={() => trackCTAClick('business_intelligence_page')}
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

export default BusinessIntelligence;
