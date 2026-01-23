export const performanceConfig = {
  isMobile: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  prefersReducedMotion: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  hasGoodPerformance: () => {
    if (typeof window === 'undefined') return true;
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    return (memory ? memory >= 4 : true) && (cores ? cores >= 4 : true);
  },

  getAnimationDuration: (baseValue: number) => {
    if (performanceConfig.prefersReducedMotion()) return 0;
    if (performanceConfig.isMobile()) return baseValue * 0.5;
    if (!performanceConfig.hasGoodPerformance()) return baseValue * 0.7;
    return baseValue;
  },

  shouldShowComplexAnimations: () => {
    return !performanceConfig.isMobile() &&
           !performanceConfig.prefersReducedMotion() &&
           performanceConfig.hasGoodPerformance();
  },

  shouldLazyLoad: (componentType: 'heavy' | 'medium' | 'light') => {
    if (componentType === 'light') return false;
    if (performanceConfig.isMobile()) return true;
    if (componentType === 'heavy') return true;
    return !performanceConfig.hasGoodPerformance();
  },

  getImageFormat: () => {
    if (typeof window === 'undefined') return 'jpg';
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const result = canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
    return result ? 'webp' : 'jpg';
  },

  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

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