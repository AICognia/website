import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaSearchDollar,
  FaArrowRight,
  FaCheckCircle,
  FaClipboardList,
  FaLightbulb,
  FaChartPie,
  FaRocket
} from 'react-icons/fa';
import SEO from '../../components/SEO';

const AIAudit: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'AI Audit', url: '/solutions/ai-audit' }
  ];

  const process = [
    {
      icon: FaClipboardList,
      title: 'Discovery',
      description: 'We analyze your current operations, tech stack, and pain points. Where are you losing time and money?'
    },
    {
      icon: FaLightbulb,
      title: 'Opportunity Mapping',
      description: 'Identify specific areas where AI can make an immediate impact—with projected ROI for each.'
    },
    {
      icon: FaChartPie,
      title: 'Priority Ranking',
      description: 'We rank opportunities by impact and implementation effort. Know exactly what to tackle first.'
    },
    {
      icon: FaRocket,
      title: 'Implementation Roadmap',
      description: 'Get a clear action plan with timelines. We can build it for you or hand off to your team.'
    }
  ];

  const deliverables = [
    'Complete AI opportunity assessment',
    'ROI projections for each opportunity',
    'Competitive analysis—what others in your industry are doing',
    'Tech stack recommendations',
    'Prioritized implementation roadmap',
    '60-minute strategy session with our team'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        page="solutions"
        breadcrumbs={breadcrumbs}
        customTitle="AI Audit | Cognia AI"
        customDescription="Discover where AI can transform your business. Comprehensive audit with ROI projections, prioritized opportunities, and implementation roadmap."
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
              <FaSearchDollar className="text-cyan-400" />
              <span className="text-sm text-gray-400">AI Audit</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Find Your AI
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Not sure where AI fits in your business? We'll analyze your operations and show you exactly where AI can drive ROI.
            </p>

            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
            >
              Get Your Free Audit
              <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Audit Process
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A structured approach to uncovering the highest-impact AI opportunities in your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-sm text-cyan-400 font-medium">
                    {index + 1}
                  </div>
                  <step.icon className="text-xl text-cyan-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
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
                What You'll Get
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {deliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
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
              Ready to Discover Your AI Potential?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Book a free consultation and we'll start mapping your AI opportunities.
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

export default AIAudit;
