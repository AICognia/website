import React from 'react';
import { motion } from 'framer-motion';

const DataFlowVisualization: React.FC = () => {
  const dataPoints = Array.from({ length: 6 }, (_, i) => ({ // Fewer points
    id: i,
    delay: i * 0.5,
    size: 2 // Uniform small size
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal Data Stream */}
      <div className="absolute top-1/3 w-full h-px bg-gradient-to-r from-transparent via-gray-200/5 to-transparent">
        {dataPoints.map((point) => (
          <motion.div
            key={`h-${point.id}`}
            className="absolute bg-gray-400/30 rounded-full"
            style={{
              width: `${point.size}px`,
              height: `${point.size}px`
            }}
            initial={{ left: '-10px' }}
            animate={{ left: '100%' }}
            transition={{
              duration: 20, // Much slower
              delay: point.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Vertical Data Stream */}
      <div className="absolute left-2/3 h-full w-px bg-gradient-to-b from-transparent via-gray-200/5 to-transparent">
        {dataPoints.map((point) => (
          <motion.div
            key={`v-${point.id}`}
            className="absolute bg-gray-400/30 rounded-full"
            style={{
              width: `${point.size}px`,
              height: `${point.size}px`
            }}
            initial={{ top: '-10px' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 25, // Much slower
              delay: point.delay * 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DataFlowVisualization;
