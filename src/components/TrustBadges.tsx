import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaDatabase, FaPlug, FaRobot, FaCloud, FaHospital, FaPhone } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';

const TrustBadges: React.FC = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {/* HIPAA Compliant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5 hover:border-green-500/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                  <GiHealthNormal className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm flex items-center gap-1">
                    🏥 HIPAA Compliant
                  </p>
                  <p className="text-gray-400 text-xs">Healthcare Ready</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
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
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-xl p-5 hover:border-cyan-400/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
                  <FaCalendarCheck className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm flex items-center gap-1">
                    🎁 1 Week Free Trial
                  </p>
                  <p className="text-cyan-400 text-xs">If you book now</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
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
            <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5 hover:border-purple-400/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <FaHospital className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm flex items-center gap-1">
                    🏨 PMS Systems
                  </p>
                  <p className="text-gray-400 text-xs">Practice Management</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
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
            <div className="relative bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-5 hover:border-orange-400/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <FaDatabase className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm flex items-center gap-1">
                    📊 CRM Systems
                  </p>
                  <p className="text-gray-400 text-xs">Salesforce, HubSpot</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
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
            <div className="relative bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/30 rounded-xl p-5 hover:border-indigo-400/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded-lg">
                  <FaPlug className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm flex items-center gap-1">
                    🔌 API Ready
                  </p>
                  <p className="text-gray-400 text-xs">REST & Webhooks</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* AI Powered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-5 hover:border-yellow-400/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-2 rounded-lg">
                  <FaRobot className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm flex items-center gap-1">
                    🤖 AI Powered
                  </p>
                  <p className="text-gray-400 text-xs">GPT-4 Technology</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* Cloud Hosting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border border-sky-500/30 rounded-xl p-5 hover:border-sky-400/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-sky-500 to-cyan-500 p-2 rounded-lg">
                  <FaCloud className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm flex items-center gap-1">
                    ☁️ Cloud Based
                  </p>
                  <p className="text-gray-400 text-xs">AWS & Azure</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* 24/7 Support */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-teal-500/10 to-green-500/10 border border-teal-500/30 rounded-xl p-5 hover:border-teal-400/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-teal-500 to-green-500 p-2 rounded-lg">
                  <FaPhone className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm flex items-center gap-1">
                    📞 24/7 Support
                  </p>
                  <p className="text-gray-400 text-xs">Always Available</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBadges;