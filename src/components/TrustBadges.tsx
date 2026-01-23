import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaDatabase, FaPlug, FaCloud, FaHospital } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';

const TrustBadges: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {/* Enterprise Security */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border-2 border-slate-700/40 rounded-2xl p-8 hover:border-green-500/40 transition-all duration-300 h-full shadow-xl hover:shadow-2xl hover:shadow-green-500/10">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl shadow-lg">
                  <GiHealthNormal className="text-3xl text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Enterprise Security</p>
                  <p className="text-gray-300 text-sm mt-1">Healthcare Ready</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* 1 Week Free Trial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-primary/20 to-blue-500/20 border-2 border-primary/40 rounded-2xl p-8 hover:border-primary-light/60 transition-all duration-300 h-full shadow-xl hover:shadow-2xl hover:shadow-primary/20">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-primary to-primary-dark p-4 rounded-xl shadow-lg">
                  <FaCalendarCheck className="text-3xl text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">1 Week Free Trial</p>
                  <p className="text-primary-light text-sm mt-1 font-medium">If you book now</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-blue-400 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* PMS Integration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-purple-500/15 to-pink-500/15 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 h-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl shadow-lg">
                  <FaHospital className="text-3xl text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">PMS Integration</p>
                  <p className="text-gray-300 text-sm mt-1">Practice Management</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* CRM Integration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-blue-500/15 to-blue-600/15 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-300 h-full shadow-xl hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                  <FaDatabase className="text-3xl text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">CRM Integration</p>
                  <p className="text-gray-300 text-sm mt-1">Customer Management</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* API Integration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-indigo-500/15 to-blue-500/15 border-2 border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400/50 transition-all duration-300 h-full shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4 rounded-xl shadow-lg">
                  <FaPlug className="text-3xl text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">API Ready</p>
                  <p className="text-gray-300 text-sm mt-1">REST & Webhooks</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* Cloud Hosting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-sky-500/15 to-primary/15 border-2 border-sky-500/30 rounded-2xl p-8 hover:border-sky-400/50 transition-all duration-300 h-full shadow-xl hover:shadow-2xl hover:shadow-sky-500/10">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-sky-500 to-primary p-4 rounded-xl shadow-lg">
                  <FaCloud className="text-3xl text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Cloud Based</p>
                  <p className="text-gray-300 text-sm mt-1">Fully Scalable</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-primary-light opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBadges;