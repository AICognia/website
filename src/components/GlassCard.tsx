'use client'
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'default' | 'premium' | 'highlight' | 'subtle';
  hover?: 'lift' | 'glow' | 'shine' | 'none';
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'default',
  hover = 'lift',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x: `${x}%`, y: `${y}%` });
    };

    const card = cardRef.current;
    card?.addEventListener('mousemove', handleMouseMove);

    return () => {
      card?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const variantClasses = {
    default: 'bg-slate-800/40 backdrop-blur-xl border-slate-700/50',
    premium: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-2xl border-primary/20',
    highlight: 'bg-gradient-to-br from-primary/10 to-primary-dark/10 backdrop-blur-xl border-primary/30',
    subtle: 'bg-slate-900/20 backdrop-blur-md border-slate-800/30'
  };

  const hoverEffects = {
    lift: {},
    glow: {},
    shine: {},
    none: {}
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hoverEffects[hover]}
      onClick={onClick}
      className={`
        relative
        ${variantClasses[variant]}
        rounded-2xl
        border
        shadow-2xl
        overflow-hidden
        transition-all
        duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${hover === 'glow' ? 'hover:shadow-glow-md' : ''}
        ${className}
      `}
      style={{
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y,
      } as React.CSSProperties}
    >
      {variant === 'premium' && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20" />
        </div>
      )}

      {hover === 'shine' && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100"
          whileHover={{
            background: [
              'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
              'linear-gradient(105deg, transparent 60%, rgba(255, 255, 255, 0.1) 70%, transparent 80%)'
            ],
            transition: { duration: 0.5 }
          }}
        />
      )}

      <div className="relative z-10">
        {children}
      </div>

      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </motion.div>
  );
};

export default GlassCard;