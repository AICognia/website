import { lazy, Suspense, ComponentType } from 'react';
import React from 'react';

// Loading component for lazy loaded components
export const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#162B4D]"></div>
  </div>
);

// Utility function for lazy loading with retry logic
export function lazyLoadWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  retries = 3,
  interval = 1000
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, interval));
        return await componentImport();
      }
      throw error;
    }
  });
}

// Wrapper component for lazy loaded components with error boundary
export const LazyLoadWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
};
