import React from 'react';

interface GridPatternProps {
  className?: string;
  cellSize?: number;
}

const GridPattern: React.FC<GridPatternProps> = ({ 
  className = '',
  cellSize = 40 
}) => {
  return (
    <svg
      className={`absolute inset-0 h-full w-full stroke-gray-300/10 dark:stroke-gray-700/10 ${className}`}
      fill="none"
    >
      <defs>
        <pattern
          id="grid-pattern"
          x="0"
          y="0"
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      
      {/* Gradient fade overlay */}
      <defs>
        <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.05" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#fade-gradient)" />
    </svg>
  );
};

export default React.memo(GridPattern);
