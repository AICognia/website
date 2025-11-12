import React from 'react';

interface SkeletonLoaderProps {
  height?: string;
  width?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  height = 'h-4',
  width = 'w-full',
  className = ''
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-800 rounded ${height} ${width} ${className}`}
      style={{ contain: 'layout' }}
    />
  );
};

export default SkeletonLoader;