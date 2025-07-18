// Performance monitoring utilities

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

/**
 * Measure and report Core Web Vitals
 */
export function measureWebVitals(): void {
  if (typeof window === 'undefined') return;

  const metrics: PerformanceMetrics = {};

  // Measure First Contentful Paint (FCP)
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      metrics.fcp = fcpEntry.startTime;
      console.log('FCP:', metrics.fcp);
    }
  });

  try {
    fcpObserver.observe({ entryTypes: ['paint'] });
  } catch (e) {
    console.warn('FCP measurement not supported');
  }

  // Measure Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    metrics.lcp = lastEntry.startTime;
    console.log('LCP:', metrics.lcp);
  });

  try {
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('LCP measurement not supported');
  }

  // Measure First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      metrics.fid = entry.processingStart - entry.startTime;
      console.log('FID:', metrics.fid);
    });
  });

  try {
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    console.warn('FID measurement not supported');
  }

  // Measure Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    metrics.cls = clsValue;
    console.log('CLS:', metrics.cls);
  });

  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.warn('CLS measurement not supported');
  }

  // Measure Time to First Byte (TTFB)
  if ('navigation' in performance) {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    console.log('TTFB:', metrics.ttfb);
  }

  // Report metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      reportMetrics(metrics);
    }, 1000);
  });
}

/**
 * Report performance metrics (can be extended to send to analytics)
 */
function reportMetrics(metrics: PerformanceMetrics): void {
  console.group('Performance Metrics');
  console.log('First Contentful Paint (FCP):', metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'Not measured');
  console.log('Largest Contentful Paint (LCP):', metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'Not measured');
  console.log('First Input Delay (FID):', metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'Not measured');
  console.log('Cumulative Layout Shift (CLS):', metrics.cls ? metrics.cls.toFixed(4) : 'Not measured');
  console.log('Time to First Byte (TTFB):', metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'Not measured');
  console.groupEnd();

  // Here you could send metrics to your analytics service
  // Example: sendToAnalytics(metrics);
}

/**
 * Optimize images with lazy loading and intersection observer
 */
export function optimizeImages(): void {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach((img) => {
      (img as HTMLImageElement).classList.add('loaded');
    });
  }
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(): void {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Preload critical images (hero images, etc.)
  const criticalImages = [
    '/favicon.svg'
    // Add other critical images here
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations(): void {
  if (typeof window === 'undefined') return;

  // Measure web vitals in development
  if (import.meta.env.DEV) {
    measureWebVitals();
  }

  // Optimize images
  optimizeImages();

  // Preload critical resources
  preloadCriticalResources();

  // Add performance observer for long tasks
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 50) {
          console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task measurement not supported');
    }
  }
}