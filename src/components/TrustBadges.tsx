import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaCheckCircle, FaAward, FaCertificate, FaUserShield } from 'react-icons/fa';

interface Badge {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const badges: Badge[] = [
  {
    icon: <FaShieldAlt className="text-3xl" />,
    title: "SOC2 Certified",
    description: "Enterprise Security",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaLock className="text-3xl" />,
    title: "HIPAA Compliant",
    description: "Healthcare Ready",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <FaUserShield className="text-3xl" />,
    title: "GDPR Compliant",
    description: "Data Protection",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <FaCertificate className="text-3xl" />,
    title: "ISO 27001",
    description: "Certified Security",
    color: "from-orange-500 to-red-500"
  }
];

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
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-r ${badge.color} bg-clip-text text-transparent`}>
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{badge.title}</p>
                    <p className="text-gray-500 text-xs">{badge.description}</p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl`} />
              </div>
            </motion.div>
          ))}

          {/* Money Back Guarantee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: badges.length * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl p-4 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-3xl text-green-400" />
                <div>
                  <p className="text-white font-bold text-sm">30-Day Guarantee</p>
                  <p className="text-green-400 text-xs">100% Money Back</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBadges;