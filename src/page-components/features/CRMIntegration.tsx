import React from 'react';
import { FaCog, FaDatabase, FaSync, FaCheckCircle, FaPhone, FaPlug, FaServer, FaCloud, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
const CRMIntegration: React.FC = () => {

  return (
    <div className="min-h-screen bg-transparent text-gray-900 relative overflow-hidden">

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-16 sm:py-24 lg:py-32">
          <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] mx-auto pt-24 sm:pt-20 md:pt-16 lg:pt-0">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 rounded-full mb-4 sm:mb-6">
                <span className="text-xs text-[rgba(49,45,43,0.70)] uppercase tracking-widest">Feature</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-thin text-[#37322F] mb-4 sm:mb-6">
                CRM Integration
                <br />
                Connect Your Systems
              </h1>

              <p className="text-base sm:text-lg text-[rgba(49,45,43,0.70)] max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                Seamlessly integrate with your existing CRM, ERP, and business systems. Automatically log calls, update records, and sync data in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                  <FaArrowRight className="text-sm" />
                </Link>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto"
                >
                  <FaPhone className="text-sm" />
                  +1 616-326-3328
                </a>
              </div>
            </div>
          </div>
        </section>

        <TechSection
          badge="Capabilities"
          title="Deep System Integration"
          subtitle="Connect AI to your entire tech stack"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaSync,
                title: 'Real-Time Sync',
                description: 'Bi-directional data sync keeps all systems updated instantly without manual entry.'
              },
              {
                icon: FaDatabase,
                title: 'Automatic Logging',
                description: 'Every call, appointment, and interaction is automatically logged with full details.'
              },
              {
                icon: FaPlug,
                title: 'Pre-Built Connectors',
                description: 'Ready-to-use integrations for Salesforce, HubSpot, Zoho, and 100+ platforms.'
              },
              {
                icon: FaServer,
                title: 'Custom API',
                description: 'Flexible REST API for connecting custom systems and proprietary software.'
              },
              {
                icon: FaCloud,
                title: 'Cloud & On-Premise',
                description: 'Works with cloud-based SaaS and on-premise enterprise systems.'
              },
              {
                icon: FaCog,
                title: 'Workflow Automation',
                description: 'Trigger actions, update pipelines, and automate tasks based on call outcomes.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-xl sm:text-2xl text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Platforms"
          title="Supported Systems"
          subtitle="Integrate with popular platforms out of the box"
        >
          <div className="max-w-6xl mx-auto">
            <TechCard>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">CRM Systems</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Salesforce</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> HubSpot</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Zoho CRM</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Microsoft Dynamics</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Pipedrive</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Monday.com</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Business Tools</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Google Workspace</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Microsoft 365</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Slack</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Zapier</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Make (Integromat)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Airtable</li>
                  </ul>
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Industry-Specific</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Epic (Healthcare EMR)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Clio (Legal)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Shopify (Retail)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Opera PMS (Hospitality)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> CDK Global (Automotive)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs flex-shrink-0" /> Custom APIs</li>
                  </ul>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        <TechSection
          badge="Benefits"
          title="Why Integration Matters"
          subtitle="Eliminate manual data entry and silos"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { value: '100%', label: 'Data Accuracy', suffix: '' },
              { value: '95%', label: 'Time Saved', suffix: '↑' },
              { value: '0', label: 'Manual Entry', suffix: '' },
              { value: 'Real-Time', label: 'Sync', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#37322F] mb-1 sm:mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-lg sm:text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready to Connect Your Systems?"
          subtitle="Integrate AI with your existing tools"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
              >
                <FaCalendarCheck />
                Schedule Demo
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/solutions"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto text-center"
              >
                View All Features
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />100+ Integrations</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Real-Time Sync</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Easy Setup</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Custom API</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default CRMIntegration;
