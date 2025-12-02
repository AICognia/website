// Performance configuration for optimizing the website
export const performanceConfig = {
  // Check if device is mobile
  isMobile: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check if device has good performance
  hasGoodPerformance: () => {
    if (typeof window === 'undefined') return true;
    // Check for high-end device indicators
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;

    // If device has less than 4GB RAM or less than 4 cores, consider it low-end
    return (memory ? memory >= 4 : true) && (cores ? cores >= 4 : true);
  },

  // Animation durations based on device
  getAnimationDuration: (baseValue: number) => {
    if (performanceConfig.prefersReducedMotion()) return 0;
    if (performanceConfig.isMobile()) return baseValue * 0.5;
    if (!performanceConfig.hasGoodPerformance()) return baseValue * 0.7;
    return baseValue;
  },

  // Should show complex animations
  shouldShowComplexAnimations: () => {
    return !performanceConfig.isMobile() &&
           !performanceConfig.prefersReducedMotion() &&
           performanceConfig.hasGoodPerformance();
  },

  // Should lazy load component
  shouldLazyLoad: (componentType: 'heavy' | 'medium' | 'light') => {
    if (componentType === 'light') return false;
    if (performanceConfig.isMobile()) return true;
    if (componentType === 'heavy') return true;
    return !performanceConfig.hasGoodPerformance();
  },

  // Get optimal image format
  getImageFormat: () => {
    if (typeof window === 'undefined') return 'jpg';
    // Check WebP support
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const result = canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
    return result ? 'webp' : 'jpg';
  },

  // Debounce function for performance
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function for performance
  throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

export default performanceConfig;