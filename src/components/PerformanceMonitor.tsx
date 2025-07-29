'use client';

import { useEffect } from 'react';

// Dynamically import web-vitals to avoid SSR issues
let webVitals: any = null;

export function PerformanceMonitor() {
  useEffect(() => {
    const loadWebVitals = async () => {
      if (!webVitals) {
        webVitals = await import('web-vitals');
      }
      
      const logMetric = (metric: any) => {
        const value = metric.value.toFixed(2);
        const rating = metric.rating || 'N/A';
        
        // Color code based on rating
        const color = rating === 'good' ? 'color: green' : 
                     rating === 'needs-improvement' ? 'color: orange' : 
                     rating === 'poor' ? 'color: red' : 'color: gray';
        
        console.log(
          `%c[${metric.name}] ${value}ms (${rating})`,
          color
        );
        
        // In production, send to analytics
        if (process.env.NODE_ENV === 'production' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: metric.name,
            value: Math.round(metric.value),
            metric_rating: rating,
            non_interaction: true
          });
        }
      };

      // Core Web Vitals
      webVitals.onCLS(logMetric);     // Cumulative Layout Shift
      webVitals.onFID(logMetric);     // First Input Delay
      webVitals.onLCP(logMetric);     // Largest Contentful Paint
      webVitals.onTTFB(logMetric);    // Time to First Byte
      webVitals.onINP(logMetric);     // Interaction to Next Paint
      
      // Additional metrics
      webVitals.onFCP((metric: any) => {  // First Contentful Paint
        logMetric(metric);
      });
    };

    loadWebVitals();
  }, []);

  return null;
}

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}