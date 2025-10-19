import React from 'react';

interface NoiseTextureProps {
  opacity?: number;
  blend?: 'normal' | 'multiply' | 'screen' | 'overlay';
}

const NoiseTexture: React.FC<NoiseTextureProps> = ({ 
  opacity = 0.03, 
  blend = 'overlay' 
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        opacity,
        mixBlendMode: blend,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
      }}
    />
  );
};

export default NoiseTexture;
