import React from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaCalendar } from 'react-icons/fa';

const TrustBadges: React.FC = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-6"
        >
          {/* HIPAA Compliant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  <FaLock className="text-3xl" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">HIPAA Compliant</p>
                  <p className="text-gray-500 text-xs">Healthcare Ready</p>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>

          {/* 1 Week Free Trial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <FaCalendar className="text-3xl text-cyan-400" />
                <div>
                  <p className="text-white font-bold text-sm">1 Week Free Trial</p>
                  <p className="text-cyan-400 text-xs">No Credit Card Required</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBadges;