'use client';

import { useEffect } from 'react';

// Type definitions for web-vitals
interface Metric {
  name: string;
  value: number;
  rating?: string;
  delta?: number;
  id?: string;
}

interface WebVitals {
  onCLS: (callback: (metric: Metric) => void) => void;
  onLCP: (callback: (metric: Metric) => void) => void;
  onTTFB: (callback: (metric: Metric) => void) => void;
  onINP: (callback: (metric: Metric) => void) => void;
  onFCP?: (callback: (metric: Metric) => void) => void;
}

// Dynamically import web-vitals to avoid SSR issues
let webVitals: WebVitals | null = null;

export function PerformanceMonitor() {
  useEffect(() => {
    const loadWebVitals = async () => {
      if (!webVitals) {
        webVitals = await import('web-vitals') as WebVitals;
      }
      
      const logMetric = (metric: Metric) => {
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
      webVitals.onLCP(logMetric);     // Largest Contentful Paint
      webVitals.onTTFB(logMetric);    // Time to First Byte
      webVitals.onINP(logMetric);     // Interaction to Next Paint
      
      // FID was deprecated in web-vitals v3+, removed in v4+
      // Use INP (Interaction to Next Paint) instead
      
      // Additional metrics
      if (webVitals.onFCP) {
        webVitals.onFCP(logMetric);   // First Contentful Paint
      }
    };

    loadWebVitals();
  }, []);

  return null;
}

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}