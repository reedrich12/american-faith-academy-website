# Analytics Setup

## Google Analytics 4 Configuration

### Initial GA4 Setup

```javascript
// Google Analytics 4 Measurement ID
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Basic GA4 installation in app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'max-age=7200;secure;samesite=none'
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Enhanced Ecommerce Configuration

```javascript
// Enhanced measurement configuration
gtag('config', GA4_MEASUREMENT_ID, {
  // Page tracking
  send_page_view: true,
  
  // Enhanced measurement
  enhanced_measurement: {
    // Automatically track these events
    scroll: true,              // Scroll depth
    outbound_click: true,      // External link clicks
    site_search: true,         // Site search usage
    video_engagement: true,    // Video interactions
    file_download: true,       // Document downloads
    form_interactions: true,   // Form engagement
    
    // Custom parameters
    content_group: 'education',
    user_type: 'parent',
    school_program: 'elementary'
  },
  
  // User properties
  user_properties: {
    account_type: 'prospective',
    preferred_program: 'elementary',
    engagement_score: 'high'
  }
});
```

### Data Streams Configuration

```javascript
// Configure multiple data streams
const DATA_STREAMS = {
  // Web stream
  web: {
    stream_id: '1234567890',
    measurement_id: 'G-XXXXXXXXXX',
    property_id: '123456789',
    
    // Enhanced conversions
    enhanced_conversions: {
      email: true,
      phone_number: true,
      address: false
    }
  },
  
  // iOS app stream (if applicable)
  ios: {
    stream_id: '0987654321',
    firebase_app_id: '1:123456789:ios:abcdef',
    bundle_id: 'com.americanfaithacademy.app'
  },
  
  // Android app stream (if applicable)
  android: {
    stream_id: '1122334455',
    firebase_app_id: '1:123456789:android:fedcba',
    package_name: 'com.americanfaithacademy.app'
  }
};
```

### Server-Side Tracking

```typescript
// lib/analytics/ga4-server.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

class GA4ServerClient {
  private client: BetaAnalyticsDataClient;
  private propertyId: string;
  
  constructor() {
    this.client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA4_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, '\n')
      }
    });
    this.propertyId = process.env.GA4_PROPERTY_ID!;
  }
  
  // Send event from server
  async sendEvent(eventName: string, parameters: Record<string, any>) {
    const measurement_id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    const api_secret = process.env.GA4_API_SECRET;
    
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: parameters.client_id || 'server_generated_id',
          user_id: parameters.user_id,
          events: [{
            name: eventName,
            params: parameters
          }]
        })
      }
    );
    
    return response.ok;
  }
  
  // Query analytics data
  async runReport(dimensions: string[], metrics: string[], dateRange?: any) {
    const [response] = await this.client.runReport({
      property: `properties/${this.propertyId}`,
      dimensions: dimensions.map(name => ({ name })),
      metrics: metrics.map(name => ({ name })),
      dateRanges: [dateRange || { startDate: '7daysAgo', endDate: 'today' }]
    });
    
    return response;
  }
}

export const ga4Server = new GA4ServerClient();
```

## GTM Container Setup

### Google Tag Manager Installation

```html
<!-- GTM Container Code - Add to app/layout.tsx -->
<!-- Google Tag Manager -->
<Script id="gtm-script" strategy="afterInteractive">
  {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');`}
</Script>

<!-- Google Tag Manager (noscript) - Add to body -->
<noscript>
  <iframe 
    src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0" 
    width="0" 
    style={{ display: 'none', visibility: 'hidden' }}
  />
</noscript>
```

### GTM Data Layer Implementation

```typescript
// lib/analytics/gtm-datalayer.ts
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export class GTMDataLayer {
  // Initialize data layer
  static init() {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  }
  
  // Push event to data layer
  static push(data: Record<string, any>) {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(data);
    }
  }
  
  // Page view with enhanced data
  static pageView(pageData: {
    page_path: string;
    page_title: string;
    page_location: string;
    page_category?: string;
    user_type?: string;
  }) {
    this.push({
      event: 'page_view',
      ...pageData,
      timestamp: new Date().toISOString()
    });
  }
  
  // Ecommerce events
  static ecommerce(eventName: string, data: any) {
    this.push({
      event: eventName,
      ecommerce: data
    });
  }
  
  // Clear ecommerce data
  static clearEcommerce() {
    this.push({
      ecommerce: null
    });
  }
}
```

### GTM Variables Configuration

```javascript
// GTM Container Variables Setup
const GTM_VARIABLES = {
  // Built-in Variables to Enable
  builtIn: [
    'Click Element',
    'Click Classes',
    'Click ID',
    'Click URL',
    'Click Text',
    'Form Element',
    'Form Classes',
    'Form ID',
    'Page URL',
    'Page Path',
    'Page Hostname',
    'Referrer',
    'Event',
    'Container Version',
    'Debug Mode',
    'Random Number',
    'HTML ID'
  ],
  
  // Custom JavaScript Variables
  custom: {
    // Get user type
    userType: function() {
      return window.dataLayer.find(item => item.user_type)?.user_type || 'anonymous';
    },
    
    // Get program interest
    programInterest: function() {
      return window.dataLayer.find(item => item.program_interest)?.program_interest || 'none';
    },
    
    // Get scroll depth
    scrollDepth: function() {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      return Math.round((scrolled / height) * 100);
    },
    
    // Get form name
    formName: function() {
      return {{Form Element}}.getAttribute('data-form-name') || {{Form ID}} || 'unknown';
    }
  },
  
  // Data Layer Variables
  dataLayer: {
    'dlv.userId': 'user_id',
    'dlv.userType': 'user_type',
    'dlv.programType': 'program_type',
    'dlv.eventCategory': 'event_category',
    'dlv.eventAction': 'event_action',
    'dlv.eventLabel': 'event_label',
    'dlv.eventValue': 'event_value'
  }
};
```

### GTM Triggers Setup

```javascript
// GTM Trigger Configurations
const GTM_TRIGGERS = {
  // Enhanced page view trigger
  enhancedPageView: {
    type: 'Page View',
    conditions: [
      ['Page Path', 'does not contain', '/admin'],
      ['Page Path', 'does not contain', '/test']
    ]
  },
  
  // Form submission triggers
  formSubmission: {
    inquiryForm: {
      type: 'Form Submission',
      conditions: [
        ['Form ID', 'equals', 'inquiry-form']
      ]
    },
    enrollmentForm: {
      type: 'Form Submission',
      conditions: [
        ['Form ID', 'equals', 'enrollment-form']
      ]
    },
    tourRequestForm: {
      type: 'Form Submission',
      conditions: [
        ['Form ID', 'equals', 'tour-request-form']
      ]
    }
  },
  
  // Click triggers
  clicks: {
    ctaButton: {
      type: 'Click - All Elements',
      conditions: [
        ['Click Classes', 'contains', 'cta-button']
      ]
    },
    phoneNumber: {
      type: 'Click - All Elements',
      conditions: [
        ['Click Element', 'matches CSS selector', 'a[href^="tel:"]']
      ]
    },
    email: {
      type: 'Click - All Elements',
      conditions: [
        ['Click Element', 'matches CSS selector', 'a[href^="mailto:"]']
      ]
    },
    download: {
      type: 'Click - All Elements',
      conditions: [
        ['Click URL', 'contains', '.pdf'],
        ['Click URL', 'contains', '.doc']
      ]
    }
  },
  
  // Scroll triggers
  scroll: {
    depth25: {
      type: 'Scroll Depth',
      verticalThresholds: '25'
    },
    depth50: {
      type: 'Scroll Depth',
      verticalThresholds: '50'
    },
    depth75: {
      type: 'Scroll Depth',
      verticalThresholds: '75'
    },
    depth90: {
      type: 'Scroll Depth',
      verticalThresholds: '90'
    }
  },
  
  // Timer triggers
  timers: {
    engagementTimer: {
      type: 'Timer',
      interval: '15000',  // 15 seconds
      limit: '1'
    },
    longEngagement: {
      type: 'Timer',
      interval: '60000',  // 1 minute
      limit: '1'
    }
  }
};
```

## Custom Events

### Event Tracking Implementation

```typescript
// lib/analytics/custom-events.ts
export class AnalyticsEvents {
  // Track custom event
  static track(eventName: string, parameters?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        send_to: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
      });
    }
    
    // Also push to GTM data layer
    GTMDataLayer.push({
      event: eventName,
      ...parameters
    });
  }
  
  // Enrollment funnel events
  static enrollment = {
    viewProgram: (program: string, level: string) => {
      this.track('view_program', {
        event_category: 'Enrollment',
        event_label: program,
        program_type: program,
        grade_level: level,
        value: 1
      });
    },
    
    startApplication: (program: string) => {
      this.track('begin_enrollment', {
        event_category: 'Enrollment',
        event_label: program,
        program_type: program,
        value: 10
      });
    },
    
    completeStep: (step: number, program: string) => {
      this.track('enrollment_step', {
        event_category: 'Enrollment',
        event_label: `Step ${step}`,
        program_type: program,
        step_number: step,
        value: step * 5
      });
    },
    
    submitApplication: (program: string, applicationId: string) => {
      this.track('submit_application', {
        event_category: 'Enrollment',
        event_label: program,
        program_type: program,
        application_id: applicationId,
        value: 100
      });
    }
  };
  
  // Engagement events
  static engagement = {
    videoPlay: (videoTitle: string, videoDuration: number) => {
      this.track('video_start', {
        event_category: 'Engagement',
        event_label: videoTitle,
        video_title: videoTitle,
        video_duration: videoDuration
      });
    },
    
    videoComplete: (videoTitle: string, watchTime: number) => {
      this.track('video_complete', {
        event_category: 'Engagement',
        event_label: videoTitle,
        video_title: videoTitle,
        watch_time: watchTime
      });
    },
    
    downloadResource: (resourceName: string, resourceType: string) => {
      this.track('file_download', {
        event_category: 'Engagement',
        event_label: resourceName,
        file_name: resourceName,
        file_extension: resourceType,
        value: 5
      });
    },
    
    socialShare: (platform: string, contentType: string) => {
      this.track('share', {
        event_category: 'Engagement',
        event_label: platform,
        method: platform,
        content_type: contentType
      });
    }
  };
  
  // Contact events
  static contact = {
    initiateChat: () => {
      this.track('chat_start', {
        event_category: 'Contact',
        event_label: 'Live Chat',
        value: 20
      });
    },
    
    clickPhone: (phoneNumber: string) => {
      this.track('phone_click', {
        event_category: 'Contact',
        event_label: phoneNumber,
        value: 30
      });
    },
    
    clickEmail: (emailAddress: string) => {
      this.track('email_click', {
        event_category: 'Contact',
        event_label: emailAddress,
        value: 25
      });
    },
    
    scheduleVisit: (visitType: string, date: string) => {
      this.track('schedule_visit', {
        event_category: 'Contact',
        event_label: visitType,
        visit_type: visitType,
        visit_date: date,
        value: 50
      });
    }
  };
  
  // Navigation events
  static navigation = {
    menuClick: (menuItem: string, menuLocation: string) => {
      this.track('menu_click', {
        event_category: 'Navigation',
        event_label: menuItem,
        menu_location: menuLocation
      });
    },
    
    search: (searchTerm: string, resultsCount: number) => {
      this.track('search', {
        event_category: 'Navigation',
        search_term: searchTerm,
        results_count: resultsCount
      });
    },
    
    exitIntent: (currentPage: string) => {
      this.track('exit_intent', {
        event_category: 'Navigation',
        event_label: currentPage,
        page_path: currentPage
      });
    }
  };
}
```

### Event Hook Implementation

```typescript
// hooks/useAnalytics.ts
import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnalyticsEvents } from '@/lib/analytics/custom-events';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Track page views
  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // GA4 page view
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID!, {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title
      });
    }
    
    // GTM page view
    GTMDataLayer.pageView({
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href,
      page_category: pathname.split('/')[1] || 'home'
    });
  }, [pathname, searchParams]);
  
  // Track events
  const trackEvent = useCallback((eventName: string, parameters?: any) => {
    AnalyticsEvents.track(eventName, parameters);
  }, []);
  
  // Track timing
  const trackTiming = useCallback((category: string, variable: string, value: number) => {
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        event_category: category,
        name: variable,
        value: value
      });
    }
  }, []);
  
  // Track errors
  const trackError = useCallback((error: string, fatal: boolean = false) => {
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error,
        fatal: fatal
      });
    }
  }, []);
  
  return {
    trackEvent,
    trackTiming,
    trackError,
    events: AnalyticsEvents
  };
}
```

## Conversion Tracking

### Conversion Goals Setup

```typescript
// lib/analytics/conversions.ts
export const CONVERSION_EVENTS = {
  // Primary conversions
  primary: {
    enrollment_complete: {
      name: 'enrollment_complete',
      value: 1000,
      currency: 'USD',
      parameters: {
        transaction_id: 'string',
        program_type: 'string',
        grade_level: 'string',
        student_count: 'number'
      }
    },
    
    tour_scheduled: {
      name: 'tour_scheduled',
      value: 100,
      currency: 'USD',
      parameters: {
        tour_type: 'string',
        preferred_date: 'string',
        family_size: 'number'
      }
    },
    
    application_submitted: {
      name: 'application_submitted',
      value: 500,
      currency: 'USD',
      parameters: {
        application_id: 'string',
        program_type: 'string',
        submission_type: 'string'
      }
    }
  },
  
  // Micro conversions
  micro: {
    brochure_download: {
      name: 'generate_lead',
      value: 10,
      parameters: {
        content_name: 'string',
        content_type: 'brochure'
      }
    },
    
    contact_form_submit: {
      name: 'contact',
      value: 25,
      parameters: {
        contact_method: 'form',
        inquiry_type: 'string'
      }
    },
    
    newsletter_signup: {
      name: 'sign_up',
      value: 5,
      parameters: {
        method: 'newsletter'
      }
    },
    
    calculator_complete: {
      name: 'view_item',
      value: 15,
      parameters: {
        item_name: 'tuition_calculator',
        calculated_amount: 'number'
      }
    }
  }
};

// Conversion tracking class
export class ConversionTracker {
  // Track conversion
  static track(conversionType: string, parameters: Record<string, any>) {
    const conversion = this.getConversionConfig(conversionType);
    
    if (!conversion) {
      console.error(`Unknown conversion type: ${conversionType}`);
      return;
    }
    
    // Send to GA4
    if (window.gtag) {
      window.gtag('event', conversion.name, {
        ...parameters,
        value: conversion.value,
        currency: conversion.currency || 'USD',
        send_to: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
      });
    }
    
    // Send to GTM
    GTMDataLayer.push({
      event: 'conversion',
      conversion_type: conversionType,
      conversion_name: conversion.name,
      conversion_value: conversion.value,
      ...parameters
    });
    
    // Send to server for backup
    this.sendToServer(conversionType, parameters);
  }
  
  // Get conversion configuration
  private static getConversionConfig(type: string) {
    return CONVERSION_EVENTS.primary[type] || CONVERSION_EVENTS.micro[type];
  }
  
  // Server-side backup
  private static async sendToServer(type: string, parameters: any) {
    try {
      await fetch('/api/analytics/conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          parameters,
          timestamp: new Date().toISOString(),
          session_id: this.getSessionId()
        })
      });
    } catch (error) {
      console.error('Failed to send conversion to server:', error);
    }
  }
  
  // Get or create session ID
  private static getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }
}
```

### Enhanced Ecommerce Tracking

```typescript
// lib/analytics/ecommerce.ts
export class EcommerceTracker {
  // Track product/program views
  static viewItem(item: {
    item_id: string;
    item_name: string;
    item_category: string;
    price: number;
    quantity?: number;
  }) {
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'USD',
        value: item.price,
        items: [item]
      });
    }
    
    GTMDataLayer.clearEcommerce();
    GTMDataLayer.ecommerce('view_item', {
      currency: 'USD',
      value: item.price,
      items: [item]
    });
  }
  
  // Track add to cart (enrollment start)
  static addToCart(item: any) {
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: item.price,
        items: [item]
      });
    }
    
    GTMDataLayer.clearEcommerce();
    GTMDataLayer.ecommerce('add_to_cart', {
      currency: 'USD',
      value: item.price,
      items: [item]
    });
  }
  
  // Track checkout progress
  static beginCheckout(items: any[], step: number) {
    const value = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: value,
        items: items,
        checkout_step: step
      });
    }
    
    GTMDataLayer.clearEcommerce();
    GTMDataLayer.ecommerce('checkout', {
      step: step,
      items: items
    });
  }
  
  // Track purchase completion
  static purchase(transactionData: {
    transaction_id: string;
    value: number;
    tax?: number;
    shipping?: number;
    currency?: string;
    items: any[];
  }) {
    const data = {
      ...transactionData,
      currency: transactionData.currency || 'USD'
    };
    
    if (window.gtag) {
      window.gtag('event', 'purchase', data);
    }
    
    GTMDataLayer.clearEcommerce();
    GTMDataLayer.ecommerce('purchase', {
      actionField: {
        id: data.transaction_id,
        revenue: data.value,
        tax: data.tax,
        shipping: data.shipping
      },
      products: data.items
    });
  }
}
```

### Conversion Testing

```typescript
// lib/analytics/conversion-testing.ts
export class ConversionTester {
  // Test conversion in debug mode
  static testConversion(conversionType: string) {
    console.group(`🧪 Testing Conversion: ${conversionType}`);
    
    // Enable debug mode
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID!, {
        debug_mode: true
      });
    }
    
    // Create test parameters
    const testParams = this.generateTestParams(conversionType);
    console.log('Test Parameters:', testParams);
    
    // Track conversion
    ConversionTracker.track(conversionType, testParams);
    
    // Check data layer
    console.log('Data Layer:', window.dataLayer);
    
    console.groupEnd();
  }
  
  // Generate test parameters
  private static generateTestParams(type: string): any {
    const timestamp = Date.now();
    
    switch (type) {
      case 'enrollment_complete':
        return {
          transaction_id: `TEST_${timestamp}`,
          program_type: 'elementary',
          grade_level: '3rd',
          student_count: 1
        };
        
      case 'tour_scheduled':
        return {
          tour_type: 'in-person',
          preferred_date: new Date().toISOString(),
          family_size: 4
        };
        
      default:
        return {
          test_id: `TEST_${timestamp}`,
          test_type: type
        };
    }
  }
}
```

## Privacy Compliance

### Cookie Consent Implementation

```typescript
// components/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';
import { gtag } from '@/lib/analytics';

interface ConsentSettings {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentSettings>({
    analytics: false,
    marketing: false,
    functional: true,
    timestamp: ''
  });
  
  useEffect(() => {
    // Check for existing consent
    const savedConsent = localStorage.getItem('cookie_consent');
    
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
      applyConsent(parsedConsent);
    }
  }, []);
  
  // Apply consent settings
  const applyConsent = (settings: ConsentSettings) => {
    // Update GA4 consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: settings.analytics ? 'granted' : 'denied',
        ad_storage: settings.marketing ? 'granted' : 'denied',
        functionality_storage: settings.functional ? 'granted' : 'denied',
        personalization_storage: settings.marketing ? 'granted' : 'denied',
        security_storage: 'granted'
      });
    }
    
    // Update GTM consent
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_update',
        consent_analytics: settings.analytics,
        consent_marketing: settings.marketing,
        consent_functional: settings.functional
      });
    }
  };
  
  // Handle consent acceptance
  const handleAcceptAll = () => {
    const newConsent: ConsentSettings = {
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    };
    
    setConsent(newConsent);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    applyConsent(newConsent);
    setShowBanner(false);
    
    // Track consent event
    if (window.gtag) {
      window.gtag('event', 'consent_given', {
        consent_type: 'all'
      });
    }
  };
  
  // Handle custom consent
  const handleSavePreferences = () => {
    const newConsent = {
      ...consent,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    applyConsent(newConsent);
    setShowBanner(false);
    setShowDetails(false);
    
    // Track consent event
    if (window.gtag) {
      window.gtag('event', 'consent_given', {
        consent_type: 'custom',
        analytics: consent.analytics,
        marketing: consent.marketing,
        functional: consent.functional
      });
    }
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              Manage Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Accept All
            </button>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={consent.functional}
                  onChange={(e) => setConsent({ ...consent, functional: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm">
                  <strong>Functional Cookies</strong> - Required for site functionality
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm">
                  <strong>Analytics Cookies</strong> - Help us improve our website
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm">
                  <strong>Marketing Cookies</strong> - Used for targeted advertising
                </span>
              </label>
            </div>
            
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Privacy-Safe Analytics

```typescript
// lib/analytics/privacy-safe.ts
export class PrivacySafeAnalytics {
  // Check if analytics is allowed
  static isAnalyticsAllowed(): boolean {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) return false;
    
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  }
  
  // IP anonymization
  static configureIPAnonymization() {
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID!, {
        anonymize_ip: true
      });
    }
  }
  
  // Remove PII from URLs
  static sanitizeUrl(url: string): string {
    // Remove email addresses
    url = url.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '[email]');
    
    // Remove phone numbers
    url = url.replace(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/g, '[phone]');
    
    // Remove common PII parameters
    const piiParams = ['email', 'name', 'phone', 'address', 'ssn', 'dob'];
    const urlObj = new URL(url);
    
    piiParams.forEach(param => {
      if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.set(param, '[redacted]');
      }
    });
    
    return urlObj.toString();
  }
  
  // Hash sensitive data
  static hashData(data: string): string {
    if (!data) return '';
    
    // Simple hash function for client-side
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return Math.abs(hash).toString(36);
  }
  
  // Data retention settings
  static configureDataRetention() {
    // Set cookie expiration
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID!, {
        cookie_expires: 63072000, // 2 years in seconds
        cookie_prefix: 'afa_',
        cookie_domain: 'auto',
        cookie_flags: 'SameSite=None;Secure'
      });
    }
  }
}
```

### GDPR/CCPA Compliance

```typescript
// lib/analytics/compliance.ts
export class ComplianceManager {
  // Get user location for compliance
  static async getUserLocation(): Promise<string> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_code;
    } catch {
      return 'US'; // Default to US compliance
    }
  }
  
  // Apply regional compliance
  static async applyRegionalCompliance() {
    const location = await this.getUserLocation();
    
    // EU GDPR compliance
    if (this.isEU(location)) {
      this.applyGDPR();
    }
    
    // California CCPA compliance
    if (location === 'US') {
      const state = await this.getUserState();
      if (state === 'CA') {
        this.applyCCPA();
      }
    }
  }
  
  // Check if EU country
  private static isEU(countryCode: string): boolean {
    const euCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
    ];
    return euCountries.includes(countryCode);
  }
  
  // Apply GDPR settings
  private static applyGDPR() {
    // Default to denied until consent
    if (window.gtag) {
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        wait_for_update: 500
      });
    }
    
    // Show consent banner immediately
    window.dispatchEvent(new Event('show_consent_banner'));
  }
  
  // Apply CCPA settings
  private static applyCCPA() {
    // Add Do Not Sell link
    this.addDoNotSellLink();
    
    // Check for opt-out
    const optOut = localStorage.getItem('ccpa_opt_out');
    if (optOut === 'true') {
      this.restrictDataCollection();
    }
  }
  
  // Add Do Not Sell link
  private static addDoNotSellLink() {
    const link = document.createElement('a');
    link.href = '/privacy/do-not-sell';
    link.textContent = 'Do Not Sell My Personal Information';
    link.className = 'ccpa-link';
    
    // Add to footer
    const footer = document.querySelector('footer');
    if (footer) {
      footer.appendChild(link);
    }
  }
  
  // Restrict data collection
  private static restrictDataCollection() {
    if (window.gtag) {
      window.gtag('set', {
        restricted_data_processing: true
      });
    }
  }
  
  // Data deletion request
  static async requestDataDeletion(email: string) {
    const response = await fetch('/api/privacy/delete-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    return response.json();
  }
  
  // Data export request
  static async requestDataExport(email: string) {
    const response = await fetch('/api/privacy/export-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    return response.json();
  }
}
```

### Privacy Policy Integration

```typescript
// app/api/privacy/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const consent = request.cookies.get('cookie_consent');
  
  return NextResponse.json({
    consent: consent ? JSON.parse(consent.value) : null,
    privacyPolicy: '/privacy-policy',
    cookiePolicy: '/cookie-policy',
    dataController: {
      name: 'American Faith Academy',
      email: 'privacy@americanfaithacademy.org',
      address: '123 School Street, City, State 12345'
    }
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Update consent settings
  const response = NextResponse.json({ success: true });
  
  response.cookies.set('cookie_consent', JSON.stringify(body.consent), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 365 * 24 * 60 * 60 // 1 year
  });
  
  return response;
}
```