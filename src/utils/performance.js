// Performance optimization utilities
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image optimization utilities
export const generateImageSrc = (originalSrc, options = {}) => {
  const {
    width = 800,
    quality = 75,
    format = 'webp',
    auto = true
  } = options;

  if (!originalSrc) return '';

  // For Unsplash images
  if (originalSrc.includes('unsplash.com')) {
    const url = new URL(originalSrc);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', format);
    if (auto) url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // For other images, return as is
  return originalSrc;
};

// Animation performance utilities
export const getReducedMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

export const shouldAnimate = () => {
  return !getReducedMotion();
};

// Lazy loading utility
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, defaultOptions);
  }
  return null;
};

// Preload critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload images
export const preloadImages = async (srcs) => {
  try {
    await Promise.all(srcs.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }
  return fn();
};

// Memory optimization
export const cleanupEventListeners = (element, events) => {
  events.forEach(event => {
    element.removeEventListener(event.type, event.handler);
  });
};

// Responsive image sizes
export const getResponsiveSizes = (breakpoints = {}) => {
  const defaultBreakpoints = {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1200px) 50vw',
    desktop: '33vw'
  };

  const sizes = Object.entries({ ...defaultBreakpoints, ...breakpoints })
    .map(([key, value]) => value)
    .join(', ');

  return sizes;
};

// Animation frame optimization
export const requestAnimationFrame = (callback) => {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16); // ~60fps fallback
};

// Cancel animation frame
export const cancelAnimationFrame = (id) => {
  if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(id);
  }
  return clearTimeout(id);
};
