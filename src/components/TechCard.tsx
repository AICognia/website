import React from 'react';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'blue' | 'purple' | 'green';
  hoverable?: boolean;
  delay?: number;
  onClick?: () => void;
}

const TechCard: React.FC<TechCardProps> = ({
  children,
  className = '',
  hoverable = true,
  onClick,
}) => {
  return (
    <div
      className={`bg-black/50 border border-white/10 rounded-3xl p-6 transition-colors duration-200 ${
        hoverable ? 'hover:border-white/20 cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TechCard;