import React from 'react';
import { FaCog, FaDatabase, FaSync, FaCheckCircle, FaPhone, FaPlug, FaServer, FaCloud } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const CRMIntegration: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollProgress />

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Feature</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                CRM Integration
                <br />
                Connect Your Systems
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Seamlessly integrate with your existing CRM, ERP, and business systems. Automatically log calls, update records, and sync data in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
                >
                  Schedule Demo
                </a>
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

        <TechSection
          badge="Capabilities"
          title="Deep System Integration"
          subtitle="Connect AI to your entire tech stack"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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

        <TechSection
          badge="Platforms"
          title="Supported Systems"
          subtitle="Integrate with popular platforms out of the box"
        >
          <div className="max-w-6xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">CRM Systems</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Salesforce</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> HubSpot</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Zoho CRM</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Microsoft Dynamics</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Pipedrive</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Monday.com</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Business Tools</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Google Workspace</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Microsoft 365</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Slack</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Zapier</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Make (Integromat)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Airtable</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Industry-Specific</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Epic (Healthcare EMR)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Clio (Legal)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Shopify (Retail)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Opera PMS (Hospitality)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> CDK Global (Automotive)</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-white text-xs" /> Custom APIs</li>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '100%', label: 'Data Accuracy', suffix: '' },
              { value: '95%', label: 'Time Saved', suffix: '↑' },
              { value: '0', label: 'Manual Entry', suffix: '' },
              { value: 'Real-Time', label: 'Sync', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready to Connect Your Systems?"
          subtitle="Integrate AI with your existing tools"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
              >
                Schedule Demo
              </a>
              <Link
                to="/solutions"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                View All Features
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
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
