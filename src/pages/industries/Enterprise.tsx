import React from 'react';
import { FaBuilding, FaUsers, FaChartLine, FaLock, FaPhone, FaGlobe, FaCog, FaNetworkWired, FaClipboardList, FaCheckCircle, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';
import { useLeadCapture } from '../../contexts/LeadCaptureContext';

const Enterprise: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollProgress />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        {/* Hero Section */}
        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  Enterprise Solutions
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                Enterprise-Grade AI
                <br />
                Communication Platform
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Transform enterprise communication with scalable AI solutions designed for large organizations, Fortune 500 companies, and global enterprises.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => openLeadCapture('enterprise_hero')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                >
                  <FaCalendarCheck />
                  Schedule Enterprise Demo
                  <FaArrowRight className="text-sm" />
                </button>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
                >
                  <FaPhone className="text-sm" />
                  +1 616-326-3328
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features for Enterprise */}
        <TechSection
          badge="Features"
          title="Built for Enterprise Scale"
          subtitle="Advanced AI solutions for large-scale operations"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaNetworkWired,
                title: 'Scalable Infrastructure',
                description: 'Handle millions of calls with auto-scaling infrastructure and 99.99% uptime SLA.'
              },
              {
                icon: FaLock,
                title: 'Enterprise Security',
                description: 'Advanced encryption, role-based access controls, and regular security audits to protect your data.'
              },
              {
                icon: FaGlobe,
                title: 'Global Deployment',
                description: 'Multi-region deployment with data residency options and global phone numbers.'
              },
              {
                icon: FaCog,
                title: 'Custom Integration',
                description: 'Deep integration with enterprise systems like Salesforce, SAP, Oracle, and custom APIs.'
              },
              {
                icon: FaUsers,
                title: 'Team Management',
                description: 'Role-based access control, department routing, and team collaboration tools.'
              },
              {
                icon: FaChartLine,
                title: 'Advanced Analytics',
                description: 'Real-time dashboards, custom reports, and business intelligence integration.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* Use Cases */}
        <TechSection
          badge="Use Cases"
          title="Enterprise Organizations We Serve"
          subtitle="Specialized AI solutions for every enterprise need"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FaBuilding,
                title: 'Fortune 500 Companies',
                features: [
                  'Multi-department call routing',
                  'Executive communication management',
                  'Global customer support',
                  'Compliance and audit trails'
                ]
              },
              {
                icon: FaNetworkWired,
                title: 'Distributed Organizations',
                features: [
                  'Multi-location coordination',
                  'Regional office support',
                  'Time zone management',
                  'Centralized reporting'
                ]
              },
              {
                icon: FaUsers,
                title: 'Customer Service Centers',
                features: [
                  'High-volume call handling',
                  'Intelligent call routing',
                  'Queue management',
                  'Agent assistance'
                ]
              },
              {
                icon: FaClipboardList,
                title: 'Shared Services',
                features: [
                  'HR inquiry management',
                  'IT helpdesk support',
                  'Facilities coordination',
                  'Internal service requests'
                ]
              }
            ].map((useCase, index) => (
              <TechCard key={index}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <useCase.icon className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-4">{useCase.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {useCase.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* Benefits */}
        <TechSection
          badge="Benefits"
          title="Why Enterprises Choose Cognia AI"
          subtitle="Proven results for large organizations"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '99.99%', label: 'Uptime SLA', suffix: '' },
              { value: '10M+', label: 'Calls Handled', suffix: '' },
              { value: '70%', label: 'Cost Reduction', suffix: '↓' },
              { value: '150+', label: 'Countries Served', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </TechSection>

        {/* Security & Compliance Section */}
        <TechSection
          badge="Security & Compliance"
          title="Enterprise-Grade Security"
          subtitle="Built to meet the strictest security and compliance requirements"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Security Standards</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>End-to-end encryption (AES-256)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Regular security audits</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Role-based access controls</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>24/7 support available</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Compliance & Privacy</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>GDPR compliant</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>CCPA compliant</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Data residency options</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom DPA agreements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        {/* CTA Section */}
        <TechSection
          badge="Get Started"
          title="Ready to Transform Your Enterprise?"
          subtitle="Join Fortune 500 companies using Cognia AI"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => openLeadCapture('enterprise_cta')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Schedule Enterprise Demo
                <FaArrowRight className="text-sm" />
              </button>
              <Link
                to="/solutions"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                View All Solutions
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                99.9% Uptime
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                24/7 Enterprise Support
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Encrypted & Secure
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Enterprise;
