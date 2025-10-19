import React from 'react';
import { motion } from 'framer-motion';

const DataFlowVisualization: React.FC = () => {
  const dataPoints = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    size: Math.random() * 4 + 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal Data Stream */}
      <div className="absolute top-1/4 w-full h-1">
        {dataPoints.map((point) => (
          <motion.div
            key={`h-${point.id}`}
            className="absolute bg-cyan-400 rounded-full"
            style={{
              width: `${point.size}px`,
              height: `${point.size}px`,
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
            }}
            initial={{ left: '-10px' }}
            animate={{ left: '100%' }}
            transition={{
              duration: 8,
              delay: point.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Vertical Data Stream */}
      <div className="absolute left-1/4 h-full w-1">
        {dataPoints.map((point) => (
          <motion.div
            key={`v-${point.id}`}
            className="absolute bg-teal-400 rounded-full"
            style={{
              width: `${point.size}px`,
              height: `${point.size}px`,
              boxShadow: '0 0 10px rgba(20, 184, 166, 0.8)'
            }}
            initial={{ top: '-10px' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 10,
              delay: point.delay * 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Diagonal Data Stream */}
      <svg className="absolute inset-0 w-full h-full">
        {dataPoints.slice(0, 6).map((point) => (
          <motion.circle
            key={`d-${point.id}`}
            r={point.size}
            fill="#06b6d4"
            opacity="0.3"
            initial={{ cx: 0, cy: 0 }}
            animate={{ 
              cx: ['0%', '100%'],
              cy: ['0%', '100%']
            }}
            transition={{
              duration: 12,
              delay: point.delay * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </svg>

      {/* Binary Rain Effect */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-cyan-400 font-mono text-xs"
            style={{ left: `${i * 5}%` }}
            initial={{ top: '-20px' }}
            animate={{ top: '100%' }}
            transition={{
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DataFlowVisualization;
