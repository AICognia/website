import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gradient?: 'cyan' | 'purple' | 'blue' | 'green';
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  delay = 0,
  gradient = 'cyan'
}) => {
  const gradients = {
    cyan: 'from-cyan-500/20 to-blue-500/20',
    purple: 'from-purple-500/20 to-pink-500/20',
    blue: 'from-blue-500/20 to-indigo-500/20',
    green: 'from-green-500/20 to-emerald-500/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative group ${className}`}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradients[gradient]} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Card Container */}
      <div className="relative">
        {/* Gradient Border */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradients[gradient]} rounded-2xl`} />

        {/* Inner Card */}
        <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-[1px] overflow-hidden">
          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>

          {/* Content */}
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCard;