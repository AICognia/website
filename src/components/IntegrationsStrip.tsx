import React from 'react';
import { motion } from 'framer-motion';

// Simple text logos for integrations
const integrations = [
  'Salesforce',
  'HubSpot',
  'Google Calendar',
  'Calendly',
  'Twilio',
  'Slack',
  'Epic',
  'Athenahealth',
  'ServiceTitan',
  'Zoho CRM',
];

const IntegrationsStrip: React.FC = () => {
  return (
    <section className="relative bg-black py-12 lg:py-16 border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-500 uppercase tracking-wider mb-8"
        >
          Integrates with your existing tools
        </motion.p>

        {/* Logo Strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 lg:gap-x-12">
          {integrations.map((name, index) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="text-sm lg:text-base text-gray-500 hover:text-gray-300 transition-colors font-medium"
            >
              {name}
            </motion.span>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-gray-600 mt-8"
        >
          + 50 more integrations via API
        </motion.p>
      </div>
    </section>
  );
};

export default IntegrationsStrip;
