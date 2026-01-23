'use client'
import React from 'react';

interface CirclePatternProps {
  variant?: 'hero' | 'section' | 'subtle';
  className?: string;
}

const CirclePattern: React.FC<CirclePatternProps> = ({ variant = 'hero', className = '' }) => {
  const configs = {
    hero: {
      circles: [
        { size: 800, x: '80%', y: '-20%', opacity: 0.04 },
        { size: 600, x: '-10%', y: '60%', opacity: 0.03 },
        { size: 400, x: '60%', y: '80%', opacity: 0.05 },
        { size: 300, x: '20%', y: '10%', opacity: 0.03 },
      ],
      dots: true,
    },
    section: {
      circles: [
        { size: 500, x: '90%', y: '50%', opacity: 0.03 },
        { size: 350, x: '-5%', y: '30%', opacity: 0.025 },
      ],
      dots: false,
    },
    subtle: {
      circles: [
        { size: 400, x: '85%', y: '20%', opacity: 0.02 },
      ],
      dots: false,
    },
  };

  const config = configs[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large circle patterns */}
      {config.circles.map((circle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            left: circle.x,
            top: circle.y,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(59, 130, 246, ${circle.opacity}) 0%, transparent 70%)`,
          }}
        />
      ))}
      
      {/* Concentric ring patterns */}
      {variant === 'hero' && (
        <>
          <div 
            className="absolute"
            style={{
              width: 600,
              height: 600,
              right: '-10%',
              top: '20%',
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: 120 + i * 100,
                  height: 120 + i * 100,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: `rgba(59, 130, 246, ${0.08 - i * 0.015})`,
                  borderWidth: 1,
                }}
              />
            ))}
          </div>
          
          <div 
            className="absolute"
            style={{
              width: 400,
              height: 400,
              left: '5%',
              bottom: '10%',
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: 80 + i * 80,
                  height: 80 + i * 80,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: `rgba(59, 130, 246, ${0.06 - i * 0.012})`,
                  borderWidth: 1,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Dot grid pattern */}
      {config.dots && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.08) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
};

export default CirclePattern;
