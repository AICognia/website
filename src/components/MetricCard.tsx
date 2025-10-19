import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: number | string;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  animated?: boolean;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit = '',
  icon,
  trend,
  animated = true,
  color = 'cyan'
}) => {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);
  
  useEffect(() => {
    if (!animated || typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, animated]);

  const getTrendIcon = () => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 overflow-hidden group"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/10 to-transparent opacity-50`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`p-2 rounded-lg bg-${color}-500/20 text-${color}-400`}>
                {icon}
              </div>
            )}
            <span className="text-gray-400 text-sm font-medium">{label}</span>
          </div>
          {trend && (
            <span className={`${getTrendColor()} text-lg`}>
              {getTrendIcon()}
            </span>
          )}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold bg-gradient-to-r from-${color}-400 to-${color}-300 bg-clip-text text-transparent`}>
            {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
          </span>
          {unit && (
            <span className="text-gray-500 text-sm">{unit}</span>
          )}
        </div>
        
        {/* Live indicator */}
        <div className="mt-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>
      
      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
      />
    </motion.div>
  );
};

export default MetricCard;
