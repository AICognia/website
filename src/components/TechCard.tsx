import React from 'react';
import { motion } from 'framer-motion';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'blue' | 'purple' | 'green';
  hoverable?: boolean;
  delay?: number;
  onClick?: () => void;
}

const TechCard: React.FC<TechCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  hoverable = true,
  delay = 0,
  onClick,
}) => {
  const glowColors = {
    cyan: 'from-cyan-500/20',
    blue: 'from-blue-500/20',
    purple: 'from-purple-500/20',
    green: 'from-green-500/20',
  };

  const borderColors = {
    cyan: 'border-cyan-500/20 hover:border-cyan-400/40',
    blue: 'border-blue-500/20 hover:border-blue-400/40',
    purple: 'border-purple-500/20 hover:border-purple-400/40',
    green: 'border-green-500/20 hover:border-green-400/40',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`relative group ${hoverable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Glow effect */}
      {hoverable && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${glowColors[glowColor]} to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      )}

      {/* Card content */}
      <div
        className={`relative bg-black/50 backdrop-blur-sm border ${borderColors[glowColor]} rounded-xl p-6 transition-all duration-300 ${
          hoverable ? 'group-hover:transform group-hover:scale-[1.02]' : ''
        } ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default TechCard;