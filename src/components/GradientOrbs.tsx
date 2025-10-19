import React from 'react';
import { motion } from 'framer-motion';

const GradientOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '-10%',
          right: '-10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary Orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          bottom: '-5%',
          left: '-5%',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Accent Orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 60%)',
          filter: 'blur(40px)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default GradientOrbs;
