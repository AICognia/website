import React from 'react';
import { motion } from 'framer-motion';

const TechGrid: React.FC = () => {
  const gridSize = 8;
  const nodes = Array.from({ length: gridSize * gridSize }, (_, i) => ({
    id: i,
    row: Math.floor(i / gridSize),
    col: i % gridSize,
    delay: Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="grid gap-8 opacity-10"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: '80%',
            height: '80%'
          }}
        >
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="relative"
            >
              {/* Node Point */}
              <motion.div
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 3,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)'
                }}
              />

              {/* Connection Lines */}
              {node.col < gridSize - 1 && (
                <motion.div
                  className="absolute top-1/2 left-full w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    delay: node.delay + 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: 'left center' }}
                />
              )}
              {node.row < gridSize - 1 && (
                <motion.div
                  className="absolute left-1/2 top-full h-8 w-px bg-gradient-to-b from-cyan-400 to-transparent"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    delay: node.delay + 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: 'top center' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scanning Line Effect */}
      <motion.div
        className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)'
        }}
      />
      
      <motion.div
        className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-teal-400 to-transparent opacity-50"
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{
          duration: 4,
          delay: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          boxShadow: '0 0 20px rgba(20, 184, 166, 0.8)'
        }}
      />
    </div>
  );
};

export default TechGrid;
