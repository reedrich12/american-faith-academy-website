# Performance Guidelines

## Bundle Size Budgets

### Understanding Bundle Size Impact

Bundle size directly affects how quickly users can load and interact with the American Faith Academy website. Every kilobyte matters, especially for users on slower connections or mobile devices. Setting and maintaining bundle size budgets ensures optimal performance across all user scenarios.

### Bundle Size Budget Configuration

```javascript
// next.config.js
module.exports = {
  experimental: {
    webpackBuildWorker: true,
  },
  webpack: (config, { isServer }) => {
    // Bundle analyzer for visualization
    if (process.env.ANALYZE === 'true') {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
          openAnalyzer: false,
        })
      );
    }

    // Performance hints
    config.performance = {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
      maxEntrypointSize: 250000, // 250KB
      maxAssetSize: 200000, // 200KB
    };

    return config;
  },
};
```

### Budget Definitions by Resource Type

```javascript
// config/performance-budgets.js
export const performanceBudgets = {
  // JavaScript budgets
  javascript: {
    total: {
      max: 300, // 300KB total JS
      warning: 250, // Warning at 250KB
    },
    firstParty: {
      max: 200, // 200KB first-party JS
      warning: 150,
    },
    thirdParty: {
      max: 100, // 100KB third-party JS
      warning: 80,
    },
    perRoute: {
      '/': { max: 150, warning: 120 }, // Homepage
      '/soaring-centers': { max: 180, warning: 150 }, // Feature-rich page
      '/contact': { max: 100, warning: 80 }, // Simple form page
    },
  },

  // CSS budgets
  css: {
    total: {
      max: 100, // 100KB total CSS
      warning: 80,
    },
    critical: {
      max: 20, // 20KB critical CSS
      warning: 15,
    },
  },

  // Image budgets
  images: {
    hero: {
      max: 200, // 200KB for hero images
      warning: 150,
    },
    thumbnail: {
      max: 50, // 50KB for thumbnails
      warning: 40,
    },
    icon: {
      max: 10, // 10KB for icons
      warning: 8,
    },
  },

  // Font budgets
  fonts: {
    total: {
      max: 150, // 150KB total fonts
      warning: 120,
    },
    perFont: {
      max: 30, // 30KB per font file
      warning: 25,
    },
  },

  // Total page weight
  totalPageWeight: {
    max: 1500, // 1.5MB total
    warning: 1200, // Warning at 1.2MB
    critical: {
      // First load (above the fold)
      max: 500, // 500KB
      warning: 400,
    },
  },
};
```

### Bundle Size Monitoring

```typescript
// scripts/check-bundle-size.ts
import fs from 'fs';
import path from 'path';
import gzipSize from 'gzip-size';
import { performanceBudgets } from '../config/performance-budgets';

interface BundleReport {
  name: string;
  size: number;
  gzipSize: number;
  budget: number;
  overBudget: boolean;
}

class BundleSizeChecker {
  private buildDir = '.next';
  private reports: BundleReport[] = [];

  async checkBundleSizes(): Promise<void> {
    console.log('🔍 Checking bundle sizes...\n');

    // Check JavaScript bundles
    await this.checkJavaScriptBundles();

    // Check CSS bundles
    await this.checkCSSBundles();

    // Generate report
    this.generateReport();

    // Exit with error if over budget
    const hasViolations = this.reports.some(r => r.overBudget);
    if (hasViolations) {
      console.error('\n❌ Bundle size budget violations found!');
      process.exit(1);
    } else {
      console.log('\n✅ All bundles within budget!');
    }
  }

  private async checkJavaScriptBundles(): Promise<void> {
    const jsDir = path.join(this.buildDir, 'static/chunks');
    const files = fs.readdirSync(jsDir);

    let totalSize = 0;
    let totalGzipSize = 0;

    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(jsDir, file);
        const content = fs.readFileSync(filePath);
        const size = content.length;
        const gzipped = await gzipSize(content);

        totalSize += size;
        totalGzipSize += gzipped;

        // Check individual chunk size
        if (size > performanceBudgets.javascript.perChunk?.max * 1024) {
          this.reports.push({
            name: `JS Chunk: ${file}`,
            size: size,
            gzipSize: gzipped,
            budget: performanceBudgets.javascript.perChunk.max * 1024,
            overBudget: true,
          });
        }
      }
    }

    // Check total JS size
    const jsBudget = performanceBudgets.javascript.total.max * 1024;
    this.reports.push({
      name: 'Total JavaScript',
      size: totalSize,
      gzipSize: totalGzipSize,
      budget: jsBudget,
      overBudget: totalGzipSize > jsBudget,
    });
  }

  private async checkCSSBundles(): Promise<void> {
    const cssDir = path.join(this.buildDir, 'static/css');
    if (!fs.existsSync(cssDir)) return;

    const files = fs.readdirSync(cssDir);
    let totalSize = 0;
    let totalGzipSize = 0;

    for (const file of files) {
      if (file.endsWith('.css')) {
        const filePath = path.join(cssDir, file);
        const content = fs.readFileSync(filePath);
        const size = content.length;
        const gzipped = await gzipSize(content);

        totalSize += size;
        totalGzipSize += gzipped;
      }
    }

    // Check total CSS size
    const cssBudget = performanceBudgets.css.total.max * 1024;
    this.reports.push({
      name: 'Total CSS',
      size: totalSize,
      gzipSize: totalGzipSize,
      budget: cssBudget,
      overBudget: totalGzipSize > cssBudget,
    });
  }

  private generateReport(): void {
    console.log('📊 Bundle Size Report\n');
    console.log('Resource'.padEnd(30) + 'Size'.padEnd(12) + 'Gzipped'.padEnd(12) + 'Budget'.padEnd(12) + 'Status');
    console.log('─'.repeat(78));

    for (const report of this.reports) {
      const sizeKB = (report.size / 1024).toFixed(1) + 'KB';
      const gzipKB = (report.gzipSize / 1024).toFixed(1) + 'KB';
      const budgetKB = (report.budget / 1024).toFixed(1) + 'KB';
      const status = report.overBudget ? '❌ OVER' : '✅ OK';

      console.log(
        report.name.padEnd(30) +
        sizeKB.padEnd(12) +
        gzipKB.padEnd(12) +
        budgetKB.padEnd(12) +
        status
      );
    }
  }
}

// Run the checker
const checker = new BundleSizeChecker();
checker.checkBundleSizes();
```

### Code Splitting Strategies

```typescript
// lib/performance/code-splitting.ts
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Route-based code splitting (automatic with Next.js)
// Pages are automatically code-split

// Component-based code splitting
export const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false, // Disable SSR for client-only components
  }
);

// Conditional code splitting
export const AdminDashboard = dynamic(
  () => import('@/components/AdminDashboard'),
  {
    loading: () => <div>Loading admin dashboard...</div>,
    // Only load for authenticated admin users
    ssr: false,
  }
);

// Library code splitting
export const loadChartLibrary = () => import('chart.js');
export const loadPDFLibrary = () => import('pdfjs-dist');

// Dynamic imports with prefetching
export function usePrefetch() {
  const prefetchComponent = (componentPath: string) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        import(componentPath);
      });
    }
  };

  return { prefetchComponent };
}

// Split vendor bundles
// next.config.js
module.exports = {
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        // Vendor chunk
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
        },
        // Common chunk
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
        // Framework chunks
        framework: {
          name: 'framework',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
        },
      },
    };
    return config;
  },
};
```

### Tree Shaking Optimization

```javascript
// lib/utils/index.ts
// ❌ Bad - Exports everything, prevents tree shaking
export * from './string-utils';
export * from './date-utils';
export * from './number-utils';

// ✅ Good - Named exports allow tree shaking
export { formatCurrency, parseAmount } from './number-utils';
export { formatDate, parseDate } from './date-utils';
export { capitalize, truncate } from './string-utils';

// Component library optimization
// ❌ Bad - Imports entire library
import { Button, Card, Input } from 'antd';

// ✅ Good - Import specific components
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';

// Even better - Use babel-plugin-import
// .babelrc
{
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

## Core Web Vitals Targets

### Target Metrics

```typescript
// config/web-vitals-targets.ts
export const webVitalsTargets = {
  // Largest Contentful Paint (LCP)
  LCP: {
    good: 2500,        // < 2.5s is good
    needsImprovement: 4000,  // 2.5s - 4s needs improvement
    poor: 4000,        // > 4s is poor
    target: 2000,      // Our target: 2s
  },

  // First Input Delay (FID) - being replaced by INP
  FID: {
    good: 100,         // < 100ms is good
    needsImprovement: 300,   // 100ms - 300ms needs improvement
    poor: 300,         // > 300ms is poor
    target: 50,        // Our target: 50ms
  },

  // Interaction to Next Paint (INP) - replaces FID
  INP: {
    good: 200,         // < 200ms is good
    needsImprovement: 500,   // 200ms - 500ms needs improvement
    poor: 500,         // > 500ms is poor
    target: 150,       // Our target: 150ms
  },

  // Cumulative Layout Shift (CLS)
  CLS: {
    good: 0.1,         // < 0.1 is good
    needsImprovement: 0.25,  // 0.1 - 0.25 needs improvement
    poor: 0.25,        // > 0.25 is poor
    target: 0.05,      // Our target: 0.05
  },

  // Additional metrics
  FCP: {
    good: 1800,        // First Contentful Paint
    target: 1500,
  },
  TTFB: {
    good: 800,         // Time to First Byte
    target: 600,
  },
  TBT: {
    good: 200,         // Total Blocking Time
    target: 150,
  },
};
```

### Web Vitals Monitoring Component

```typescript
// components/WebVitalsReporter.tsx
import { useEffect } from 'react';
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP, CLSMetric, FIDMetric, LCPMetric, FCPMetric, TTFBMetric, INPMetric } from 'web-vitals';
import { webVitalsTargets } from '@/config/web-vitals-targets';

type MetricType = CLSMetric | FIDMetric | LCPMetric | FCPMetric | TTFBMetric | INPMetric;

export function WebVitalsReporter() {
  useEffect(() => {
    const sendToAnalytics = (metric: MetricType) => {
      const { name, value, rating, delta, id } = metric;
      
      // Determine if metric meets our targets
      const target = webVitalsTargets[name]?.target || webVitalsTargets[name]?.good;
      const meetsTarget = name === 'CLS' ? value <= target : value <= target;
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${name}:`, {
          value: value.toFixed(name === 'CLS' ? 3 : 0),
          rating,
          meetsTarget,
          target,
          delta: delta.toFixed(name === 'CLS' ? 3 : 0),
        });
      }
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: id,
          value: Math.round(name === 'CLS' ? value * 1000 : value),
          metric_rating: rating,
          metric_delta: delta,
          meets_target: meetsTarget,
          non_interaction: true,
        });
      }
      
      // Send to custom monitoring endpoint
      fetch('/api/metrics/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: name,
          value,
          rating,
          delta,
          id,
          meetsTarget,
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Silently fail - don't impact user experience
      });
    };

    // Register all metrics
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onLCP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics);
  }, []);

  return null;
}
```

### Optimizing for Core Web Vitals

#### Largest Contentful Paint (LCP) Optimization

```typescript
// lib/performance/lcp-optimization.ts

// 1. Preload critical resources
export function generateLCPPreloads(): JSX.Element[] {
  return [
    // Preload hero image
    <link
      key="hero-image"
      rel="preload"
      as="image"
      href="/images/hero-bg.webp"
      type="image/webp"
    />,
    // Preload critical fonts
    <link
      key="font-serif"
      rel="preload"
      as="font"
      href="/fonts/merriweather-bold.woff2"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    // Preconnect to critical third-party origins
    <link key="preconnect-ghl" rel="preconnect" href="https://api.gohighlevel.com" />,
    <link key="preconnect-ga" rel="preconnect" href="https://www.google-analytics.com" />,
  ];
}

// 2. Optimize image loading
import Image from 'next/image';

export function HeroImage() {
  return (
    <Image
      src="/images/hero-bg.webp"
      alt="American Faith Academy"
      width={1920}
      height={1080}
      priority // Load immediately, don't lazy load
      quality={85} // Balance quality vs size
      placeholder="blur" // Show blurred placeholder
      blurDataURL="data:image/jpeg;base64,..." // Base64 encoded tiny version
    />
  );
}

// 3. Resource hints for faster loading
export function ResourceHints() {
  return (
    <>
      {/* DNS Prefetch for third-party domains */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Prefetch likely next navigation */}
      <link rel="prefetch" href="/about" />
      <link rel="prefetch" href="/admissions" />
    </>
  );
}
```

#### Cumulative Layout Shift (CLS) Prevention

```typescript
// lib/performance/cls-prevention.ts

// 1. Reserve space for dynamic content
export const ImageWithPlaceholder = ({ src, alt, width, height }) => {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: `${(height / width) * 100}%`,
        overflow: 'hidden',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

// 2. Stable loading states
export const StableLoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Reserve exact space that content will occupy */}
      <div className="h-64 bg-gray-200 rounded-lg mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
};

// 3. Font loading optimization to prevent FOUT
export const fontOptimization = `
  /* Prevent layout shift from font loading */
  @font-face {
    font-family: 'Merriweather';
    src: url('/fonts/merriweather.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: optional; /* Prevents layout shift */
    size-adjust: 105%; /* Adjust fallback font size to match */
  }
  
  /* Fallback font stack with similar metrics */
  body {
    font-family: 'Merriweather', Georgia, serif;
  }
`;

// 4. Avoid injecting content above existing content
export function SafeNotificationBanner({ message }: { message: string }) {
  // Use transform instead of changing layout
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300"
      style={{ transform: 'translateY(-100%)' }} // Start hidden above viewport
    >
      {message}
    </div>
  );
}
```

#### Interaction to Next Paint (INP) Optimization

```typescript
// lib/performance/inp-optimization.ts

// 1. Debounce expensive operations
import { useCallback, useRef } from 'react';

export function useDebounce(callback: Function, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
}

// 2. Use CSS for animations instead of JavaScript
export const cssAnimations = `
  /* Use CSS transitions instead of JS animations */
  .smooth-transition {
    transition: transform 0.3s ease, opacity 0.3s ease;
    will-change: transform, opacity;
  }
  
  /* Use CSS animations */
  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  
  .slide-in {
    animation: slideIn 0.3s ease-out;
  }
`;

// 3. Optimize event handlers
export function OptimizedButton({ onClick, children }) {
  // Use passive event listeners for scroll/touch
  useEffect(() => {
    const handleScroll = () => {
      // Scroll logic
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Defer non-critical work
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Immediate feedback
    e.currentTarget.classList.add('clicked');
    
    // Defer heavy computation
    requestIdleCallback(() => {
      onClick(e);
    });
  }, [onClick]);

  return (
    <button onClick={handleClick} className="transition-transform active:scale-95">
      {children}
    </button>
  );
}

// 4. Virtual scrolling for long lists
import { FixedSizeList } from 'react-window';

export function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

## Image Optimization

### Next.js Image Component Configuration

```typescript
// next.config.js
module.exports = {
  images: {
    // Supported image formats
    formats: ['image/avif', 'image/webp'],
    
    // Image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Domains for external images
    domains: [
      'americanfaithacademy.org',
      'images.ctfassets.net', // Contentful
      'res.cloudinary.com',   // Cloudinary
    ],
    
    // Image optimization provider
    loader: 'default', // Can be 'cloudinary', 'imgix', etc.
    
    // Minimize images in production
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
};
```

### Image Optimization Utilities

```typescript
// lib/image-optimization.ts
import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminAvif from 'imagemin-avif';

export class ImageOptimizer {
  // Generate responsive image sizes
  async generateResponsiveImages(
    inputPath: string,
    outputDir: string,
    sizes: number[] = [320, 640, 960, 1280, 1920]
  ) {
    const results = [];

    for (const width of sizes) {
      // Generate WebP
      const webpPath = `${outputDir}/image-${width}.webp`;
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(webpPath);
      
      // Generate AVIF
      const avifPath = `${outputDir}/image-${width}.avif`;
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .avif({ quality: 80 })
        .toFile(avifPath);
      
      // Fallback JPEG
      const jpegPath = `${outputDir}/image-${width}.jpg`;
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(jpegPath);
      
      results.push({ width, webp: webpPath, avif: avifPath, jpeg: jpegPath });
    }

    return results;
  }

  // Optimize images for web
  async optimizeForWeb(inputPath: string): Promise<Buffer> {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if too large
    if (metadata.width! > 2048) {
      image.resize(2048, null, { withoutEnlargement: true });
    }

    // Convert to WebP with optimization
    return image
      .webp({
        quality: 85,
        effort: 6, // Higher effort = better compression
      })
      .toBuffer();
  }

  // Generate blur placeholder
  async generateBlurPlaceholder(inputPath: string): Promise<string> {
    const buffer = await sharp(inputPath)
      .resize(10, null, { withoutEnlargement: true })
      .blur()
      .webp({ quality: 70 })
      .toBuffer();

    return `data:image/webp;base64,${buffer.toString('base64')}`;
  }
}

// React component for optimized images
interface OptimizedImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  sizes = '100vw',
  priority = false,
  className = ''
}: OptimizedImageProps) {
  // Generate srcset for different formats
  const generateSrcSet = (format: string) => {
    const widths = [640, 960, 1280, 1920];
    return widths
      .map(w => `/_next/image?url=${src}&w=${w}&q=85&fm=${format} ${w}w`)
      .join(', ');
  };

  return (
    <picture>
      {/* AVIF - Best compression */}
      <source
        type="image/avif"
        srcSet={generateSrcSet('avif')}
        sizes={sizes}
      />
      
      {/* WebP - Good compression, wide support */}
      <source
        type="image/webp"
        srcSet={generateSrcSet('webp')}
        sizes={sizes}
      />
      
      {/* Fallback */}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  );
}
```

### Image Loading Strategies

```typescript
// lib/image-loading-strategies.ts
import { useEffect, useRef, useState } from 'react';

// Progressive image loading
export function ProgressiveImage({ 
  placeholder, 
  src, 
  alt,
  ...props 
}: {
  placeholder: string;
  src: string;
  alt: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className="relative">
      <img
        src={currentSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-50' : 'opacity-100'
        }`}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
    </div>
  );
}

// Intersection Observer for lazy loading
export function useLazyLoad() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        // Start loading 50px before entering viewport
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isIntersecting };
}

// Responsive image component with art direction
export function ResponsiveImage({ 
  mobile, 
  tablet, 
  desktop, 
  alt 
}: {
  mobile: string;
  tablet: string;
  desktop: string;
  alt: string;
}) {
  return (
    <picture>
      {/* Mobile */}
      <source
        media="(max-width: 639px)"
        srcSet={mobile}
      />
      
      {/* Tablet */}
      <source
        media="(max-width: 1023px)"
        srcSet={tablet}
      />
      
      {/* Desktop */}
      <source
        media="(min-width: 1024px)"
        srcSet={desktop}
      />
      
      {/* Fallback */}
      <img src={desktop} alt={alt} />
    </picture>
  );
}
```

### Image Optimization Checklist

```typescript
// config/image-optimization-checklist.ts
export const imageOptimizationChecklist = {
  formats: {
    preferredFormats: ['avif', 'webp'],
    fallbackFormat: 'jpeg',
    rules: [
      'Use AVIF for best compression (30-50% smaller than JPEG)',
      'Provide WebP as fallback for wider browser support',
      'Always include JPEG/PNG fallback for maximum compatibility',
    ],
  },
  
  sizing: {
    heroImages: {
      desktop: { width: 1920, quality: 85 },
      tablet: { width: 1024, quality: 85 },
      mobile: { width: 640, quality: 80 },
    },
    contentImages: {
      maxWidth: 800,
      quality: 85,
    },
    thumbnails: {
      sizes: [150, 300, 450],
      quality: 80,
    },
  },
  
  performance: {
    lazyLoading: {
      enabled: true,
      rootMargin: '50px',
      exceptions: ['hero images', 'above-the-fold content'],
    },
    preloading: {
      critical: ['hero image', 'logo'],
      strategy: 'Use rel="preload" for critical images',
    },
  },
  
  accessibility: {
    altText: 'Always provide descriptive alt text',
    decorativeImages: 'Use empty alt="" for decorative images',
  },
};
```

## Caching Strategies

### Browser Caching Configuration

```typescript
// middleware.ts - Caching headers
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;

  // Static assets - long cache
  if (url.pathname.startsWith('/_next/static') || 
      url.pathname.startsWith('/static')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }
  
  // Images - long cache with revalidation
  else if (url.pathname.startsWith('/images') || 
           url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=86400, stale-while-revalidate=604800'
    );
  }
  
  // API routes - no cache or short cache
  else if (url.pathname.startsWith('/api')) {
    if (url.pathname.includes('/static-data')) {
      // Cache static API data
      response.headers.set(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400'
      );
    } else {
      // Don't cache dynamic API routes
      response.headers.set(
        'Cache-Control',
        'no-store, no-cache, must-revalidate'
      );
    }
  }
  
  // HTML pages - short cache with revalidation
  else if (url.pathname.endsWith('/') || 
           url.pathname.match(/\.html?$/i) ||
           !url.pathname.includes('.')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  return response;
}
```

### Application-Level Caching

```typescript
// lib/cache/cache-manager.ts
import { LRUCache } from 'lru-cache';
import Redis from 'ioredis';

// In-memory cache for development
class InMemoryCache {
  private cache: LRUCache<string, any>;

  constructor(options: { max?: number; ttl?: number } = {}) {
    this.cache = new LRUCache({
      max: options.max || 500,
      ttl: options.ttl || 1000 * 60 * 5, // 5 minutes default
    });
  }

  async get<T>(key: string): Promise<T | null> {
    return this.cache.get(key) || null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    this.cache.set(key, value, { ttl: ttl ? ttl * 1000 : undefined });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

// Redis cache for production
class RedisCache {
  private client: Redis;

  constructor(url: string) {
    this.client = new Redis(url);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttl) {
      await this.client.setex(key, ttl, serialized);
    } else {
      await this.client.set(key, serialized);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async clear(): Promise<void> {
    await this.client.flushdb();
  }
}

// Cache manager with multiple strategies
export class CacheManager {
  private cache: InMemoryCache | RedisCache;
  private keyPrefix: string;

  constructor(keyPrefix: string = 'afa:') {
    this.keyPrefix = keyPrefix;
    this.cache = process.env.REDIS_URL
      ? new RedisCache(process.env.REDIS_URL)
      : new InMemoryCache();
  }

  private prefixKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    const prefixedKey = this.prefixKey(key);
    return this.cache.get<T>(prefixedKey);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const prefixedKey = this.prefixKey(key);
    await this.cache.set(prefixedKey, value, ttl);
  }

  async remember<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const fresh = await factory();
    await this.set(key, fresh, ttl);
    return fresh;
  }

  async invalidate(key: string): Promise<void> {
    const prefixedKey = this.prefixKey(key);
    await this.cache.delete(prefixedKey);
  }

  async invalidatePattern(pattern: string): Promise<void> {
    if (this.cache instanceof RedisCache) {
      const keys = await this.cache.client.keys(`${this.keyPrefix}${pattern}`);
      if (keys.length > 0) {
        await this.cache.client.del(...keys);
      }
    }
  }
}

// Usage example
const cache = new CacheManager();

export async function getCachedUserData(userId: string) {
  return cache.remember(
    `user:${userId}`,
    async () => {
      // Expensive database query
      const user = await db.user.findUnique({ where: { id: userId } });
      return user;
    },
    300 // Cache for 5 minutes
  );
}
```

### React Query Configuration

```typescript
// lib/react-query-config.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: 1000 * 60 * 5, // 5 minutes
      
      // Cache time - how long data stays in cache after becoming inactive
      cacheTime: 1000 * 60 * 10, // 10 minutes
      
      // Refetch strategies
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
      refetchOnMount: true,
      
      // Retry configuration
      retry: (failureCount, error) => {
        if (error.status === 404) return false;
        if (error.status === 401) return false;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false,
    },
  },
});

// Custom hooks with caching
import { useQuery, useMutation } from '@tanstack/react-query';

export function useUserData(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // Consider fresh for 10 minutes
    cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });
}

// Prefetching for performance
export function usePrefetchUserData() {
  const queryClient = useQueryClient();
  
  return useCallback((userId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: async () => {
        const response = await fetch(`/api/users/${userId}`);
        return response.json();
      },
      staleTime: 1000 * 60 * 10,
    });
  }, [queryClient]);
}
```

### Service Worker Caching

```javascript
// public/sw.js
const CACHE_NAME = 'afa-v1';
const urlsToCache = [
  '/',
  '/offline',
  '/manifest.json',
  '/_next/static/css/app.css',
  '/_next/static/js/app.js',
  '/images/logo.svg',
  '/fonts/merriweather.woff2',
];

// Install event - cache initial resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // HTML - Network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return response || caches.match('/offline');
          });
        })
    );
    return;
  }

  // Static assets - Cache first, fallback to network
  if (url.pathname.startsWith('/_next/static') ||
      url.pathname.startsWith('/images') ||
      url.pathname.startsWith('/fonts')) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
    );
    return;
  }

  // API calls - Network only
  if (url.pathname.startsWith('/api')) {
    event.respondWith(fetch(request));
    return;
  }

  // Default - Network first
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

## CDN Configuration

### Cloudflare Configuration

```javascript
// cloudflare-config.js
export const cloudflareConfig = {
  // Page Rules
  pageRules: [
    {
      url: '*.americanfaithacademy.org/_next/static/*',
      actions: {
        cacheLevel: 'cache_everything',
        edgeCacheTTL: 31536000, // 1 year
        browserCacheTTL: 31536000,
      },
    },
    {
      url: '*.americanfaithacademy.org/images/*',
      actions: {
        cacheLevel: 'cache_everything',
        edgeCacheTTL: 86400, // 1 day
        browserCacheTTL: 86400,
        polish: 'lossless', // Automatic image optimization
        mirage: 'on', // Mobile image optimization
      },
    },
    {
      url: '*.americanfaithacademy.org/api/*',
      actions: {
        cacheLevel: 'bypass',
        disableApps: true,
      },
    },
    {
      url: '*.americanfaithacademy.org/*',
      actions: {
        cacheLevel: 'standard',
        edgeCacheTTL: 3600, // 1 hour
        browserCacheTTL: 300, // 5 minutes
        alwaysOnline: 'on',
      },
    },
  ],

  // Transform Rules
  transformRules: {
    // URL Normalization
    normalize: {
      incoming: {
        removeQueryStrings: ['fbclid', 'gclid', 'utm_*'],
        lowercaseURLs: true,
      },
    },
    
    // Request Headers
    requestHeaders: [
      {
        action: 'set',
        header: 'X-Forwarded-Proto',
        value: 'https',
      },
    ],
    
    // Response Headers
    responseHeaders: [
      {
        action: 'set',
        header: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        action: 'set',
        header: 'X-Frame-Options',
        value: 'DENY',
      },
    ],
  },

  // Workers for edge computing
  workers: {
    routes: [
      {
        pattern: '*.americanfaithacademy.org/*',
        script: 'edge-optimizer',
      },
    ],
  },
};

// Cloudflare Worker Script
const workerScript = `
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Redirect www to non-www
  if (url.hostname === 'www.americanfaithacademy.org') {
    url.hostname = 'americanfaithacademy.org'
    return Response.redirect(url.toString(), 301)
  }
  
  // Add security headers
  const response = await fetch(request)
  const newResponse = new Response(response.body, response)
  
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Cache static assets at edge
  if (url.pathname.startsWith('/_next/static')) {
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  return newResponse
}
`;
```

### Multi-CDN Strategy

```typescript
// lib/cdn/multi-cdn.ts
interface CDNProvider {
  name: string;
  baseUrl: string;
  healthCheckUrl: string;
  priority: number;
}

export class MultiCDN {
  private providers: CDNProvider[] = [
    {
      name: 'cloudflare',
      baseUrl: 'https://cdn-cf.americanfaithacademy.org',
      healthCheckUrl: 'https://cdn-cf.americanfaithacademy.org/health',
      priority: 1,
    },
    {
      name: 'fastly',
      baseUrl: 'https://cdn-fastly.americanfaithacademy.org',
      healthCheckUrl: 'https://cdn-fastly.americanfaithacademy.org/health',
      priority: 2,
    },
    {
      name: 'cloudfront',
      baseUrl: 'https://d1234567890.cloudfront.net',
      healthCheckUrl: 'https://d1234567890.cloudfront.net/health',
      priority: 3,
    },
  ];

  private healthStatus = new Map<string, boolean>();

  async getOptimalCDN(): Promise<string> {
    // Check health of all CDNs
    await this.checkHealth();

    // Sort by priority and health
    const available = this.providers
      .filter(p => this.healthStatus.get(p.name) !== false)
      .sort((a, b) => a.priority - b.priority);

    return available[0]?.baseUrl || this.providers[0].baseUrl;
  }

  private async checkHealth(): Promise<void> {
    const checks = this.providers.map(async (provider) => {
      try {
        const response = await fetch(provider.healthCheckUrl, {
          method: 'HEAD',
          signal: AbortSignal.timeout(2000),
        });
        this.healthStatus.set(provider.name, response.ok);
      } catch {
        this.healthStatus.set(provider.name, false);
      }
    });

    await Promise.all(checks);
  }

  getAssetUrl(path: string): string {
    const cdnUrl = this.getOptimalCDN();
    return `${cdnUrl}${path}`;
  }
}

// React hook for CDN assets
export function useCDNAsset(path: string) {
  const [url, setUrl] = useState<string>('');
  
  useEffect(() => {
    const cdn = new MultiCDN();
    cdn.getOptimalCDN().then(baseUrl => {
      setUrl(`${baseUrl}${path}`);
    });
  }, [path]);

  return url;
}
```

### CDN Purge Automation

```typescript
// scripts/cdn-purge.ts
import fetch from 'node-fetch';

interface PurgeOptions {
  paths?: string[];
  tags?: string[];
  all?: boolean;
}

class CDNPurgeManager {
  private cloudflareApiToken = process.env.CLOUDFLARE_API_TOKEN!;
  private cloudflareZoneId = process.env.CLOUDFLARE_ZONE_ID!;

  async purgeCloudflare(options: PurgeOptions): Promise<void> {
    const endpoint = `https://api.cloudflare.com/client/v4/zones/${this.cloudflareZoneId}/purge_cache`;
    
    let body: any = {};
    
    if (options.all) {
      body.purge_everything = true;
    } else if (options.paths) {
      body.files = options.paths.map(path => 
        `https://americanfaithacademy.org${path}`
      );
    } else if (options.tags) {
      body.tags = options.tags;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.cloudflareApiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Cloudflare purge failed: ${response.statusText}`);
    }

    console.log('✅ Cloudflare cache purged successfully');
  }

  async purgeFastly(options: PurgeOptions): Promise<void> {
    const fastlyApiKey = process.env.FASTLY_API_KEY!;
    const serviceId = process.env.FASTLY_SERVICE_ID!;

    if (options.all) {
      const response = await fetch(
        `https://api.fastly.com/service/${serviceId}/purge_all`,
        {
          method: 'POST',
          headers: {
            'Fastly-Key': fastlyApiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Fastly purge failed: ${response.statusText}`);
      }
    } else if (options.paths) {
      // Purge individual paths
      for (const path of options.paths) {
        await fetch(`https://americanfaithacademy.org${path}`, {
          method: 'PURGE',
          headers: {
            'Fastly-Key': fastlyApiKey,
          },
        });
      }
    }

    console.log('✅ Fastly cache purged successfully');
  }

  async purgeAll(options: PurgeOptions): Promise<void> {
    await Promise.all([
      this.purgeCloudflare(options),
      this.purgeFastly(options),
    ]);
  }
}

// Usage in deployment script
async function postDeploymentPurge() {
  const purgeManager = new CDNPurgeManager();
  
  // Purge specific paths after deployment
  await purgeManager.purgeAll({
    paths: [
      '/',
      '/about',
      '/admissions',
      '/_next/static/*',
    ],
  });

  // Or purge by cache tags
  await purgeManager.purgeAll({
    tags: ['static-content', 'api-v1'],
  });
}
```

### CDN Performance Monitoring

```typescript
// lib/cdn/performance-monitor.ts
interface CDNMetrics {
  provider: string;
  latency: number;
  cacheHitRate: number;
  bandwidth: number;
  errors: number;
  timestamp: Date;
}

export class CDNPerformanceMonitor {
  private metrics: CDNMetrics[] = [];

  async collectMetrics(): Promise<void> {
    // Cloudflare Analytics API
    const cloudflareMetrics = await this.getCloudflareMetrics();
    this.metrics.push(cloudflareMetrics);

    // Send to monitoring service
    await this.sendToMonitoring(cloudflareMetrics);
  }

  private async getCloudflareMetrics(): Promise<CDNMetrics> {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/analytics/dashboard`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    const totals = data.result.totals;

    return {
      provider: 'cloudflare',
      latency: totals.averageOriginResponseTime,
      cacheHitRate: (totals.cachedRequests / totals.requests) * 100,
      bandwidth: totals.bytes,
      errors: totals.threats,
      timestamp: new Date(),
    };
  }

  private async sendToMonitoring(metrics: CDNMetrics): Promise<void> {
    // Send to your monitoring service
    await fetch('/api/metrics/cdn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics),
    });
  }

  getCacheHitRate(): number {
    if (this.metrics.length === 0) return 0;
    
    const recent = this.metrics.slice(-10);
    const avgHitRate = recent.reduce((sum, m) => sum + m.cacheHitRate, 0) / recent.length;
    
    return avgHitRate;
  }
}
```