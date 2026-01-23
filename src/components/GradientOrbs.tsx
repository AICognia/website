'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GradientOrbsProps {
  variant?: 'default' | 'minimal' | 'intense';
  reduced?: boolean; // For mobile/performance mode
}

const GradientOrbs: React.FC<GradientOrbsProps> = ({
  variant = 'default',
  reduced = false
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(20, 184, 166, 0.05) 50%, rgba(99, 102, 241, 0.03) 100%)',
          }}
        />
      </div>
    );
  }

  if (isMobile || reduced) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(circle at 70% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    );
  }

  const variants = {
    default: {
      primary: { color: 'rgba(6, 182, 212, 0.15)', size: 600, blur: 60, duration: 15 },
      secondary: { color: 'rgba(20, 184, 166, 0.12)', size: 500, blur: 50, duration: 18 },
      accent: { color: 'rgba(99, 102, 241, 0.08)', size: 400, blur: 40, duration: 20 },
    },
    minimal: {
      primary: { color: 'rgba(6, 182, 212, 0.08)', size: 500, blur: 80, duration: 25 },
      secondary: { color: 'rgba(20, 184, 166, 0.06)', size: 400, blur: 70, duration: 30 },
      accent: { color: 'rgba(99, 102, 241, 0.04)', size: 300, blur: 60, duration: 35 },
    },
    intense: {
      primary: { color: 'rgba(6, 182, 212, 0.25)', size: 700, blur: 40, duration: 12 },
      secondary: { color: 'rgba(20, 184, 166, 0.2)', size: 600, blur: 35, duration: 15 },
      accent: { color: 'rgba(99, 102, 241, 0.15)', size: 500, blur: 30, duration: 18 },
    },
  };

  const config = variants[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full will-change-transform"
        style={{
          width: `${config.primary.size}px`,
          height: `${config.primary.size}px`,
          background: `radial-gradient(circle at center, ${config.primary.color} 0%, transparent 70%)`,
          filter: `blur(${config.primary.blur}px)`,
          top: '-10%',
          right: '-10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: config.primary.duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute rounded-full will-change-transform"
        style={{
          width: `${config.secondary.size}px`,
          height: `${config.secondary.size}px`,
          background: `radial-gradient(circle at center, ${config.secondary.color} 0%, transparent 70%)`,
          filter: `blur(${config.secondary.blur}px)`,
          bottom: '-5%',
          left: '-5%',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: config.secondary.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {!isMobile && (
        <motion.div
          className="absolute rounded-full will-change-transform"
          style={{
            width: `${config.accent.size}px`,
            height: `${config.accent.size}px`,
            background: `radial-gradient(circle at center, ${config.accent.color} 0%, transparent 60%)`,
            filter: `blur(${config.accent.blur}px)`,
            top: '40%',
            left: '30%',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: config.accent.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      )}
    </div>
  );
};

export default React.memo(GradientOrbs);