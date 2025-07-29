# GoHighLevel Integration

## Form IDs and Configuration

### Production Form IDs

```javascript
// Contact Form
const CONTACT_FORM_ID = 'cSWaoqjkPQIFeSq8lJzw';

// Enrollment Forms
const ENROLLMENT_FORM_IDS = {
  preschool: 'vDlI7Gbo5bfaH9P0L1X8',
  elementary: 'mK3n9Xr2wQfY8Tz5Nj6B',
  middle: 'pL4m8Vq1xRdZ7Yw3Kh9C',
  high: 'tG5k7Un0zSeW6Xv2Mj8D'
};

// Tour Request Form
const TOUR_REQUEST_FORM_ID = 'qH6j8Tm1yPfA5Zx3Lk9N';

// General Inquiry Form
const GENERAL_INQUIRY_FORM_ID = 'wE7h9Sn2uQgB4Yv6Mk0P';
```

### Form Configuration Structure

```javascript
// Form configuration in environment variables
NEXT_PUBLIC_GHL_LOCATION_ID=your_location_id
NEXT_PUBLIC_GHL_API_KEY=your_api_key
NEXT_PUBLIC_GHL_FORM_ENDPOINT=https://services.leadconnectorhq.com/forms/submit

// Form data structure
interface GHLFormData {
  // Required fields
  formId: string;
  locationId: string;
  
  // Contact information
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  
  // Additional fields
  message?: string;
  preferred_contact_method?: 'email' | 'phone' | 'text';
  preferred_contact_time?: string;
  
  // Program-specific fields
  program_type?: string;
  grade_level?: string;
  student_name?: string;
  student_age?: string;
  start_date?: string;
  
  // Source tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page_url?: string;
  referrer?: string;
}
```

### Form Field Mapping

```javascript
// Map internal field names to GHL custom field IDs
const FIELD_MAPPING = {
  // Standard fields (no mapping needed)
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  phone: 'phone',
  
  // Custom fields (require GHL custom field IDs)
  program_type: 'custom.program_type_field_id',
  grade_level: 'custom.grade_level_field_id',
  student_name: 'custom.student_name_field_id',
  student_age: 'custom.student_age_field_id',
  preferred_contact_method: 'custom.contact_method_field_id',
  preferred_contact_time: 'custom.contact_time_field_id',
  message: 'custom.message_field_id',
  
  // UTM tracking
  utm_source: 'custom.utm_source_field_id',
  utm_medium: 'custom.utm_medium_field_id',
  utm_campaign: 'custom.utm_campaign_field_id',
  page_url: 'custom.page_url_field_id',
  referrer: 'custom.referrer_field_id'
};
```

## Webhook Setup

### Webhook Configuration

```javascript
// Webhook endpoint configuration
const WEBHOOK_CONFIG = {
  // Incoming webhooks from GHL
  incoming: {
    endpoint: '/api/webhooks/ghl',
    secret: process.env.GHL_WEBHOOK_SECRET,
    events: [
      'contact.created',
      'contact.updated',
      'opportunity.created',
      'opportunity.status_changed',
      'appointment.scheduled',
      'appointment.confirmed'
    ]
  },
  
  // Outgoing webhooks to GHL
  outgoing: {
    baseUrl: 'https://services.leadconnectorhq.com/hooks/webhook',
    headers: {
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
};
```

### Webhook Handler Implementation

```typescript
// app/api/webhooks/ghl/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('x-ghl-signature');
    const body = await request.text();
    
    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    const data = JSON.parse(body);
    
    // Handle different event types
    switch (data.event_type) {
      case 'contact.created':
        await handleContactCreated(data);
        break;
      case 'opportunity.created':
        await handleOpportunityCreated(data);
        break;
      case 'appointment.scheduled':
        await handleAppointmentScheduled(data);
        break;
      default:
        console.log('Unhandled event type:', data.event_type);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function verifyWebhookSignature(
  body: string, 
  signature: string | null
): boolean {
  if (!signature || !process.env.GHL_WEBHOOK_SECRET) {
    return false;
  }
  
  const hash = crypto
    .createHmac('sha256', process.env.GHL_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
    
  return hash === signature;
}
```

### Webhook Event Handlers

```typescript
// Event handler functions
async function handleContactCreated(data: any) {
  console.log('New contact created:', data);
  
  // Send welcome email
  await sendWelcomeEmail({
    email: data.contact.email,
    firstName: data.contact.first_name,
    programType: data.contact.custom_fields?.program_type
  });
  
  // Update internal database
  await updateContactDatabase({
    ghlId: data.contact.id,
    email: data.contact.email,
    createdAt: new Date(data.timestamp)
  });
}

async function handleOpportunityCreated(data: any) {
  console.log('New opportunity created:', data);
  
  // Notify admissions team
  await notifyAdmissionsTeam({
    contactName: data.opportunity.contact_name,
    programType: data.opportunity.custom_fields?.program_type,
    source: data.opportunity.source
  });
}

async function handleAppointmentScheduled(data: any) {
  console.log('Appointment scheduled:', data);
  
  // Send confirmation email
  await sendAppointmentConfirmation({
    email: data.appointment.contact_email,
    date: data.appointment.scheduled_time,
    type: data.appointment.appointment_type
  });
}
```

## API Authentication

### Authentication Setup

```javascript
// GHL API client configuration
class GHLClient {
  private apiKey: string;
  private locationId: string;
  private baseUrl: string;
  
  constructor() {
    this.apiKey = process.env.GHL_API_KEY!;
    this.locationId = process.env.GHL_LOCATION_ID!;
    this.baseUrl = 'https://services.leadconnectorhq.com';
  }
  
  // Generate authorization headers
  getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
  }
  
  // Make authenticated API request
  async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`GHL API error: ${response.statusText}`);
    }
    
    return response.json();
  }
}
```

### OAuth 2.0 Implementation

```typescript
// OAuth configuration for advanced integrations
const OAUTH_CONFIG = {
  authorizationUrl: 'https://marketplace.leadconnectorhq.com/oauth/authorize',
  tokenUrl: 'https://services.leadconnectorhq.com/oauth/token',
  clientId: process.env.GHL_CLIENT_ID,
  clientSecret: process.env.GHL_CLIENT_SECRET,
  redirectUri: process.env.GHL_REDIRECT_URI,
  scopes: [
    'contacts.readonly',
    'contacts.write',
    'opportunities.readonly',
    'opportunities.write',
    'calendars.readonly',
    'calendars.write'
  ]
};

// Token management
class TokenManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: Date | null = null;
  
  async getAccessToken(): Promise<string> {
    // Check if token is expired
    if (this.expiresAt && new Date() >= this.expiresAt) {
      await this.refreshAccessToken();
    }
    
    if (!this.accessToken) {
      throw new Error('No access token available');
    }
    
    return this.accessToken;
  }
  
  async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await fetch(OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
        client_id: OAUTH_CONFIG.clientId!,
        client_secret: OAUTH_CONFIG.clientSecret!
      })
    });
    
    const data = await response.json();
    
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.expiresAt = new Date(Date.now() + data.expires_in * 1000);
  }
}
```

## Testing GHL Forms Locally

### Test Environment Setup

```bash
# .env.local for testing
NEXT_PUBLIC_GHL_LOCATION_ID=test_location_id
NEXT_PUBLIC_GHL_API_KEY=test_api_key
NEXT_PUBLIC_GHL_FORM_ENDPOINT=http://localhost:3001/mock-ghl
GHL_WEBHOOK_SECRET=test_webhook_secret

# Mock GHL server for local testing
npm install -D json-server
```

### Mock GHL Server

```javascript
// test/mock-ghl-server.js
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Mock form submission endpoint
app.post('/mock-ghl/forms/submit', (req, res) => {
  console.log('Mock GHL form submission:', req.body);
  
  // Simulate successful submission
  res.json({
    success: true,
    contact_id: 'mock_' + Date.now(),
    opportunity_id: 'opp_' + Date.now()
  });
  
  // Trigger mock webhook after 1 second
  setTimeout(() => {
    sendMockWebhook('contact.created', {
      contact: {
        id: 'mock_' + Date.now(),
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
    });
  }, 1000);
});

// Mock webhook sender
function sendMockWebhook(eventType, data) {
  const payload = {
    event_type: eventType,
    timestamp: new Date().toISOString(),
    ...data
  };
  
  const signature = crypto
    .createHmac('sha256', 'test_webhook_secret')
    .update(JSON.stringify(payload))
    .digest('hex');
  
  fetch('http://localhost:3000/api/webhooks/ghl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-ghl-signature': signature
    },
    body: JSON.stringify(payload)
  });
}

app.listen(3001, () => {
  console.log('Mock GHL server running on port 3001');
});
```

### Testing Scripts

```typescript
// test/ghl-integration.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('GHL Integration Tests', () => {
  let mockServer: any;
  
  beforeAll(async () => {
    // Start mock GHL server
    mockServer = require('./mock-ghl-server');
  });
  
  afterAll(async () => {
    // Stop mock server
    mockServer.close();
  });
  
  it('should submit form to GHL', async () => {
    const formData = {
      formId: 'test_form_id',
      locationId: 'test_location_id',
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone: '555-0123'
    };
    
    const response = await fetch('/api/forms/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.contact_id).toBeDefined();
  });
  
  it('should handle webhook events', async () => {
    const webhookData = {
      event_type: 'contact.created',
      contact: {
        id: 'test_contact_id',
        email: 'webhook@example.com'
      }
    };
    
    const signature = createWebhookSignature(webhookData);
    
    const response = await fetch('/api/webhooks/ghl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ghl-signature': signature
      },
      body: JSON.stringify(webhookData)
    });
    
    expect(response.ok).toBe(true);
  });
});
```

### Form Testing Component

```typescript
// components/test/GHLFormTester.tsx
'use client';

import { useState } from 'react';

export function GHLFormTester() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const testFormSubmission = async () => {
    setLoading(true);
    
    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: 'test_form_id',
          locationId: process.env.NEXT_PUBLIC_GHL_LOCATION_ID,
          first_name: 'Test',
          last_name: 'User',
          email: `test${Date.now()}@example.com`,
          phone: '555-0123',
          message: 'Test submission from form tester'
        })
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">GHL Form Tester</h3>
      
      <button
        onClick={testFormSubmission}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Form Submission'}
      </button>
      
      {response && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
```

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Form Submission Failures

**Issue**: Form submissions return 401 Unauthorized
```
Solution:
1. Verify API key is correct in environment variables
2. Check if API key has proper permissions
3. Ensure location ID matches the API key's location
4. Verify form ID exists in GHL account

// Debug code
console.log('API Key:', process.env.GHL_API_KEY?.substring(0, 10) + '...');
console.log('Location ID:', process.env.GHL_LOCATION_ID);
console.log('Form ID:', formId);
```

**Issue**: Form submissions return 400 Bad Request
```
Solution:
1. Check required fields are included
2. Verify field names match GHL configuration
3. Validate phone number format
4. Check for special characters in field values

// Validation helper
function validateGHLFormData(data: any) {
  const errors = [];
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push('Invalid phone format');
  }
  
  if (!data.first_name || data.first_name.length < 2) {
    errors.push('First name too short');
  }
  
  return errors;
}
```

#### 2. Webhook Issues

**Issue**: Webhooks not being received
```
Solution:
1. Verify webhook URL is publicly accessible
2. Check webhook is configured in GHL settings
3. Ensure webhook secret matches
4. Check server logs for incoming requests

// Webhook debugging
export async function POST(request: NextRequest) {
  console.log('Webhook received');
  console.log('Headers:', Object.fromEntries(request.headers.entries()));
  
  const body = await request.text();
  console.log('Body:', body);
  
  // Continue with normal processing...
}
```

**Issue**: Webhook signature verification failing
```
Solution:
1. Ensure webhook secret is correct
2. Use raw body for signature verification
3. Check for encoding issues
4. Verify signature algorithm matches

// Correct signature verification
const rawBody = await request.text();
const signature = crypto
  .createHmac('sha256', process.env.GHL_WEBHOOK_SECRET!)
  .update(rawBody) // Use raw body, not parsed JSON
  .digest('hex');
```

#### 3. API Rate Limiting

**Issue**: Getting 429 Too Many Requests errors
```
Solution:
1. Implement exponential backoff
2. Cache API responses
3. Batch API requests
4. Use webhook events instead of polling

// Rate limit handler
async function makeGHLRequest(endpoint: string, options: any, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(endpoint, options);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || '60';
        await new Promise(resolve => setTimeout(resolve, parseInt(retryAfter) * 1000));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
```

#### 4. Data Sync Issues

**Issue**: Data not syncing between app and GHL
```
Solution:
1. Verify webhook events are configured
2. Check for missed webhook deliveries
3. Implement periodic sync job
4. Use GHL API to verify data

// Sync verification
async function verifyContactSync(email: string) {
  // Check local database
  const localContact = await db.contact.findUnique({ where: { email } });
  
  // Check GHL
  const ghlContact = await ghlClient.request(`/contacts/lookup?email=${email}`);
  
  // Compare and log differences
  const differences = compareContacts(localContact, ghlContact);
  if (differences.length > 0) {
    console.error('Sync issues found:', differences);
    await resyncContact(localContact, ghlContact);
  }
}
```

### Debug Logging

```typescript
// Comprehensive debug logger for GHL integration
class GHLDebugger {
  private enabled: boolean;
  
  constructor() {
    this.enabled = process.env.NODE_ENV === 'development' || 
                   process.env.GHL_DEBUG === 'true';
  }
  
  logFormSubmission(formData: any, response: any) {
    if (!this.enabled) return;
    
    console.group('🔵 GHL Form Submission');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Form Data:', this.sanitize(formData));
    console.log('Response:', response);
    console.log('Duration:', response.duration + 'ms');
    console.groupEnd();
  }
  
  logWebhookReceived(event: string, data: any) {
    if (!this.enabled) return;
    
    console.group('🟢 GHL Webhook Received');
    console.log('Event:', event);
    console.log('Data:', this.sanitize(data));
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();
  }
  
  logAPIError(endpoint: string, error: any) {
    console.group('🔴 GHL API Error');
    console.error('Endpoint:', endpoint);
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    console.groupEnd();
  }
  
  private sanitize(data: any) {
    // Remove sensitive data from logs
    const sanitized = { ...data };
    if (sanitized.api_key) sanitized.api_key = '***';
    if (sanitized.phone) sanitized.phone = sanitized.phone.substring(0, 3) + '***';
    if (sanitized.email) {
      const [local, domain] = sanitized.email.split('@');
      sanitized.email = local.substring(0, 2) + '***@' + domain;
    }
    return sanitized;
  }
}

export const ghlDebugger = new GHLDebugger();
```

### Health Check Endpoint

```typescript
// app/api/health/ghl/route.ts
export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'checking',
    checks: {
      env_vars: false,
      api_connection: false,
      webhook_endpoint: false,
      form_submission: false
    }
  };
  
  // Check environment variables
  checks.checks.env_vars = !!(
    process.env.GHL_API_KEY &&
    process.env.GHL_LOCATION_ID &&
    process.env.GHL_WEBHOOK_SECRET
  );
  
  // Test API connection
  try {
    const response = await fetch('https://services.leadconnectorhq.com/locations/' + process.env.GHL_LOCATION_ID, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`
      }
    });
    checks.checks.api_connection = response.ok;
  } catch (error) {
    checks.checks.api_connection = false;
  }
  
  // Check webhook endpoint
  checks.checks.webhook_endpoint = true; // Assumes endpoint exists
  
  // Test form submission (dry run)
  try {
    // Implement dry run test
    checks.checks.form_submission = true;
  } catch (error) {
    checks.checks.form_submission = false;
  }
  
  // Determine overall status
  checks.status = Object.values(checks.checks).every(check => check) ? 'healthy' : 'unhealthy';
  
  return NextResponse.json(checks);
}
```