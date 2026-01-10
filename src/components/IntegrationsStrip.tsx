import React from 'react';
import { motion } from 'framer-motion';

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

        {/* System Types */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 lg:gap-x-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <span className="text-lg lg:text-xl text-white font-medium">CRM</span>
            <p className="text-xs text-gray-500 mt-1">Customer Relationship</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <span className="text-lg lg:text-xl text-white font-medium">PMS</span>
            <p className="text-xs text-gray-500 mt-1">Practice Management</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <span className="text-lg lg:text-xl text-white font-medium">ERP</span>
            <p className="text-xs text-gray-500 mt-1">Enterprise Resource</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <span className="text-lg lg:text-xl text-white font-medium">EHR</span>
            <p className="text-xs text-gray-500 mt-1">Electronic Health Records</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-default"
          >
            <span className="text-lg lg:text-xl text-white font-medium">Calendars</span>
            <p className="text-xs text-gray-500 mt-1">Scheduling Systems</p>
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-600 mt-8"
        >
          Custom API available for any system
        </motion.p>
      </div>
    </section>
  );
};

export default IntegrationsStrip;
