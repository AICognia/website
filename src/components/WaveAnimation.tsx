import React from 'react';
import { motion } from 'framer-motion';

interface WaveAnimationProps {
  color?: string;
  opacity?: number;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ 
  color = '#06b6d4',
  opacity = 0.1 
}) => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden pointer-events-none">
      <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 120">
        <motion.path
          d="M0,20 C480,120 960,120 1440,20 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity={opacity}
          animate={{
            d: [
              "M0,20 C480,120 960,120 1440,20 L1440,120 L0,120 Z",
              "M0,100 C480,20 960,20 1440,100 L1440,120 L0,120 Z",
              "M0,20 C480,120 960,120 1440,20 L1440,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,60 C320,20 640,100 960,60 C1280,20 1440,80 1440,80 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity={opacity * 0.7}
          animate={{
            d: [
              "M0,60 C320,20 640,100 960,60 C1280,20 1440,80 1440,80 L1440,120 L0,120 Z",
              "M0,40 C320,80 640,20 960,40 C1280,60 1440,30 1440,30 L1440,120 L0,120 Z",
              "M0,60 C320,20 640,100 960,60 C1280,20 1440,80 1440,80 L1440,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.path
          d="M0,80 C240,40 480,100 720,80 C960,60 1200,100 1440,60 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity={opacity * 0.5}
          animate={{
            d: [
              "M0,80 C240,40 480,100 720,80 C960,60 1200,100 1440,60 L1440,120 L0,120 Z",
              "M0,60 C240,100 480,40 720,60 C960,80 1200,40 1440,80 L1440,120 L0,120 Z",
              "M0,80 C240,40 480,100 720,80 C960,60 1200,100 1440,60 L1440,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>
    </div>
  );
};

export default WaveAnimation;
