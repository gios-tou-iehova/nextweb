'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and if performance API is available
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return;
    }

    const metrics: PerformanceMetrics = {};

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // First Contentful Paint
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
      if (fcpEntry) {
        metrics.fcp = fcpEntry.startTime;
      }

      // Time to First Byte
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            if (lastEntry) {
              metrics.lcp = lastEntry.startTime;
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                metrics.fid = entry.processingStart - entry.startTime;
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            metrics.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Send metrics after page load
          setTimeout(() => {
            sendMetrics(metrics);
          }, 5000);
        } catch (error) {
          console.warn('Performance monitoring not supported:', error);
        }
      }
    };

    const sendMetrics = (metrics: PerformanceMetrics) => {
      // In a real application, you would send these to your analytics service
      // For now, we'll just log them in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metrics:', {
          'First Contentful Paint': metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
          'Largest Contentful Paint': metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
          'First Input Delay': metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
          'Cumulative Layout Shift': metrics.cls ? metrics.cls.toFixed(4) : 'N/A',
          'Time to First Byte': metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A',
        });
      }

      // Example: Send to Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        Object.entries(metrics).forEach(([metric, value]) => {
          if (value !== undefined) {
            (window as any).gtag('event', metric, {
              value: Math.round(metric === 'cls' ? value * 1000 : value),
              metric_id: metric,
            });
          }
        });
      }
    };

    // Start measuring when DOM is ready
    if (document.readyState === 'complete') {
      measureWebVitals();
    } else {
      window.addEventListener('load', measureWebVitals);
    }

    return () => {
      window.removeEventListener('load', measureWebVitals);
    };
  }, []);

  return null; // This component doesn't render anything
}