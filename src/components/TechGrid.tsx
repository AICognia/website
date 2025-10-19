import React from 'react';
import { motion } from 'framer-motion';

const TechGrid: React.FC = () => {
  const gridSize = 6; // Smaller grid
  const nodes = Array.from({ length: gridSize * gridSize }, (_, i) => ({
    id: i,
    row: Math.floor(i / gridSize),
    col: i % gridSize,
    delay: Math.random() * 4 // Slower delays
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="grid gap-12 opacity-[0.03]" // Very subtle opacity
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: '70%',
            height: '70%'
          }}
        >
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="relative"
            >
              {/* Node Point */}
              <motion.div
                className="w-1 h-1 bg-gray-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 6, // Much slower
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Connection Lines - removed for cleaner look */}
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TechGrid;
