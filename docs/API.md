# API Documentation

## Webhook Endpoints

### Overview

Webhooks are HTTP callbacks that allow external services to notify the American Faith Academy application when specific events occur. These endpoints receive POST requests from integrated services and process them accordingly.

### Webhook Security

All webhook endpoints implement the following security measures:

```typescript
// Webhook Security Implementation
interface WebhookSecurity {
  signature_verification: boolean;
  allowed_ips: string[];
  rate_limiting: boolean;
  timeout: number;
  retry_policy: {
    max_attempts: number;
    backoff_multiplier: number;
  };
}
```

### GoHighLevel Webhooks

#### `/api/webhooks/ghl/contact-created`

Triggered when a new contact is created in GoHighLevel CRM.

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
X-GHL-Signature: {signature}
X-GHL-Timestamp: {timestamp}
```

**Request Body:**
```json
{
  "event": "contact.created",
  "timestamp": "2024-01-29T10:30:00Z",
  "data": {
    "contact": {
      "id": "ghl_contact_123456",
      "email": "parent@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1234567890",
      "tags": ["website-lead", "contact-form"],
      "source": "Website - Contact Form",
      "customFields": {
        "preferred_contact_method": "email",
        "student_grade": "5th",
        "inquiry_type": "general"
      }
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "contact_id": "ghl_contact_123456",
    "processed_at": "2024-01-29T10:30:01Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_SIGNATURE",
    "message": "Webhook signature verification failed",
    "timestamp": "2024-01-29T10:30:01Z"
  }
}
```

#### `/api/webhooks/ghl/opportunity-updated`

Triggered when an opportunity (application) status changes in the enrollment pipeline.

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
X-GHL-Signature: {signature}
X-GHL-Timestamp: {timestamp}
```

**Request Body:**
```json
{
  "event": "opportunity.stage_changed",
  "timestamp": "2024-01-29T10:35:00Z",
  "data": {
    "opportunity": {
      "id": "ghl_opp_789012",
      "contact_id": "ghl_contact_123456",
      "pipeline_id": "enrollment_pipeline",
      "stage_id": "application_submitted",
      "previous_stage_id": "new_inquiry",
      "monetary_value": 12000,
      "name": "John Doe - 2024-25 Enrollment",
      "customFields": {
        "grade_level": "5th",
        "program_type": "full_time",
        "start_date": "2024-08-15"
      }
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Opportunity update processed",
  "data": {
    "opportunity_id": "ghl_opp_789012",
    "actions_taken": [
      "email_notification_sent",
      "internal_status_updated"
    ]
  }
}
```

#### `/api/webhooks/ghl/workflow-completed`

Triggered when an automated workflow completes execution.

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
X-GHL-Signature: {signature}
X-GHL-Timestamp: {timestamp}
```

**Request Body:**
```json
{
  "event": "workflow.completed",
  "timestamp": "2024-01-29T10:40:00Z",
  "data": {
    "workflow": {
      "id": "wf_welcome_sequence",
      "name": "New Contact Welcome Sequence",
      "contact_id": "ghl_contact_123456",
      "status": "completed",
      "steps_completed": 5,
      "total_steps": 5,
      "started_at": "2024-01-28T10:40:00Z",
      "completed_at": "2024-01-29T10:40:00Z"
    }
  }
}
```

### Analytics Webhooks

#### `/api/webhooks/analytics/goal-completed`

Receives notifications when specific analytics goals are achieved.

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {webhook_token}
```

**Request Body:**
```json
{
  "event": "goal_completed",
  "timestamp": "2024-01-29T11:00:00Z",
  "data": {
    "goal": {
      "id": "application_submitted",
      "name": "Application Form Submission",
      "value": 100,
      "user_id": "anonymous_123456",
      "session_id": "sess_789012",
      "metadata": {
        "form_type": "full_application",
        "completion_time": 300,
        "device": "mobile",
        "referrer": "google_ads"
      }
    }
  }
}
```

### Email Service Webhooks

#### `/api/webhooks/email/delivery-status`

Receives email delivery status updates from the email service provider.

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
X-Email-Signature: {signature}
```

**Request Body:**
```json
{
  "event_type": "email.delivered",
  "timestamp": "2024-01-29T11:15:00Z",
  "data": {
    "message_id": "msg_345678",
    "to": "parent@example.com",
    "from": "admin@americanfaithacademy.org",
    "subject": "Welcome to American Faith Academy",
    "status": "delivered",
    "smtp_response": "250 2.0.0 OK",
    "delivered_at": "2024-01-29T11:14:58Z"
  }
}
```

**Supported Event Types:**
- `email.delivered` - Email successfully delivered
- `email.bounced` - Email bounced (hard or soft)
- `email.complained` - Recipient marked as spam
- `email.opened` - Email was opened
- `email.clicked` - Link in email was clicked

### Payment Webhooks

#### `/api/webhooks/payment/transaction`

Handles payment transaction notifications from the payment gateway.

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
Stripe-Signature: {signature}  // For Stripe
```

**Request Body (Success):**
```json
{
  "event": "payment_intent.succeeded",
  "timestamp": "2024-01-29T11:30:00Z",
  "data": {
    "payment_intent": {
      "id": "pi_1234567890",
      "amount": 10000,
      "currency": "usd",
      "status": "succeeded",
      "customer": "cus_987654321",
      "metadata": {
        "application_id": "app_2024_001",
        "student_name": "Jane Doe",
        "payment_type": "application_fee",
        "academic_year": "2024-2025"
      }
    }
  }
}
```

**Request Body (Failure):**
```json
{
  "event": "payment_intent.payment_failed",
  "timestamp": "2024-01-29T11:35:00Z",
  "data": {
    "payment_intent": {
      "id": "pi_0987654321",
      "amount": 50000,
      "currency": "usd",
      "status": "failed",
      "failure_code": "insufficient_funds",
      "failure_message": "Your card has insufficient funds.",
      "customer": "cus_123456789",
      "metadata": {
        "payment_type": "tuition_deposit",
        "enrollment_id": "enr_2024_050"
      }
    }
  }
}
```

### Webhook Implementation Example

```typescript
// Example webhook handler implementation
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify webhook signature
    const signature = request.headers.get('x-webhook-signature');
    const timestamp = request.headers.get('x-webhook-timestamp');
    const body = await request.text();
    
    if (!verifyWebhookSignature(body, signature, timestamp)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    // 2. Parse webhook data
    const webhookData = JSON.parse(body);
    
    // 3. Process webhook based on event type
    switch (webhookData.event) {
      case 'contact.created':
        await handleContactCreated(webhookData.data);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(webhookData.data);
        break;
      default:
        console.log(`Unhandled webhook event: ${webhookData.event}`);
    }
    
    // 4. Return success response
    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function verifyWebhookSignature(
  body: string,
  signature: string,
  timestamp: string
): boolean {
  const secret = process.env.WEBHOOK_SECRET;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${body}`)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

## Health Check Endpoints

### `/api/health`

Primary health check endpoint that verifies the application is running and can respond to requests.

**Method:** `GET`

**Response (Healthy):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-29T12:00:00Z",
  "version": "1.0.0",
  "uptime": 86400,
  "environment": "production"
}
```

**Response (Unhealthy):**
```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-29T12:00:00Z",
  "errors": [
    "Database connection failed"
  ]
}
```

**Status Codes:**
- `200` - Application is healthy
- `503` - Application is unhealthy

### `/api/health/detailed`

Comprehensive health check that verifies all system components and integrations.

**Method:** `GET`

**Headers:**
```
Authorization: Bearer {monitoring_token}
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-29T12:05:00Z",
  "version": "1.0.0",
  "git_commit": "abc123def",
  "uptime": 86400,
  "environment": "production",
  "components": {
    "database": {
      "status": "healthy",
      "latency_ms": 5,
      "connections": {
        "active": 10,
        "idle": 5,
        "max": 100
      }
    },
    "cache": {
      "status": "healthy",
      "latency_ms": 1,
      "hit_rate": 0.95,
      "memory_usage": "125MB / 512MB"
    },
    "integrations": {
      "gohighlevel": {
        "status": "healthy",
        "latency_ms": 150,
        "last_sync": "2024-01-29T11:55:00Z"
      },
      "analytics": {
        "status": "healthy",
        "events_queued": 42
      },
      "email_service": {
        "status": "healthy",
        "queue_size": 5,
        "send_rate": "98.5%"
      },
      "payment_gateway": {
        "status": "healthy",
        "latency_ms": 200
      }
    },
    "filesystem": {
      "status": "healthy",
      "disk_usage": "45%",
      "temp_files": 12
    }
  },
  "metrics": {
    "requests_per_minute": 150,
    "average_response_time_ms": 45,
    "error_rate": 0.001,
    "memory_usage_mb": 256,
    "cpu_usage_percent": 35
  }
}
```

### `/api/health/dependencies`

Checks the health of all external dependencies without exposing sensitive information.

**Method:** `GET`

**Response:**
```json
{
  "timestamp": "2024-01-29T12:10:00Z",
  "dependencies": {
    "gohighlevel_api": {
      "status": "operational",
      "response_time_ms": 145
    },
    "google_analytics": {
      "status": "operational",
      "response_time_ms": 25
    },
    "email_provider": {
      "status": "operational",
      "response_time_ms": 80
    },
    "payment_processor": {
      "status": "operational",
      "response_time_ms": 190
    },
    "cdn": {
      "status": "operational",
      "response_time_ms": 10
    }
  },
  "overall_status": "operational"
}
```

### Health Check Implementation

```typescript
// Example health check implementation
export async function GET(request: Request) {
  const startTime = Date.now();
  const checks = [];
  
  // Basic application health
  const appHealth = {
    name: 'application',
    status: 'healthy',
    details: {
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV,
      uptime: process.uptime()
    }
  };
  checks.push(appHealth);
  
  // Database health check
  try {
    const dbStart = Date.now();
    await db.query('SELECT 1');
    checks.push({
      name: 'database',
      status: 'healthy',
      response_time_ms: Date.now() - dbStart
    });
  } catch (error) {
    checks.push({
      name: 'database',
      status: 'unhealthy',
      error: 'Connection failed'
    });
  }
  
  // External service checks
  const serviceChecks = await Promise.allSettled([
    checkGoHighLevel(),
    checkEmailService(),
    checkPaymentGateway()
  ]);
  
  serviceChecks.forEach((result, index) => {
    const serviceName = ['gohighlevel', 'email', 'payment'][index];
    if (result.status === 'fulfilled') {
      checks.push(result.value);
    } else {
      checks.push({
        name: serviceName,
        status: 'unhealthy',
        error: result.reason.message
      });
    }
  });
  
  // Determine overall health
  const overallHealth = checks.every(c => c.status === 'healthy') 
    ? 'healthy' 
    : 'degraded';
  
  return NextResponse.json({
    status: overallHealth,
    timestamp: new Date().toISOString(),
    response_time_ms: Date.now() - startTime,
    checks: checks
  }, {
    status: overallHealth === 'healthy' ? 200 : 503
  });
}
```

## Environment Variables

### Overview

Environment variables are used to configure the application for different environments (development, staging, production) without hardcoding sensitive information in the codebase.

### Required Environment Variables

```bash
# Application Configuration
NODE_ENV=production                    # Environment: development | staging | production
APP_VERSION=1.0.0                      # Application version
APP_URL=https://americanfaithacademy.org  # Full application URL
PORT=3000                              # Server port (default: 3000)

# Security
APP_SECRET=your-secret-key-here        # Secret for signing sessions/tokens
WEBHOOK_SECRET=webhook-secret-key      # Secret for webhook signature verification

# Database Configuration
DATABASE_URL=postgresql://user:pass@host:5432/dbname  # PostgreSQL connection string
DATABASE_POOL_MIN=2                    # Minimum database connections
DATABASE_POOL_MAX=10                   # Maximum database connections
DATABASE_TIMEOUT=30000                 # Query timeout in milliseconds

# Redis Cache Configuration
REDIS_URL=redis://user:pass@host:6379  # Redis connection string
REDIS_TTL=3600                         # Default cache TTL in seconds
REDIS_PREFIX=afa_                      # Cache key prefix

# GoHighLevel Integration
GHL_API_KEY=your-ghl-api-key          # GoHighLevel API key
GHL_API_URL=https://api.gohighlevel.com/v1  # GHL API base URL
GHL_LOCATION_ID=your-location-id      # GHL location identifier
GHL_WEBHOOK_SECRET=ghl-webhook-secret  # GHL webhook verification secret

# Google Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX         # Google Analytics 4 measurement ID
GTM_CONTAINER_ID=GTM-XXXXXXX          # Google Tag Manager container ID

# Email Service Configuration
EMAIL_PROVIDER=sendgrid                # Email provider: sendgrid | mailgun | ses
EMAIL_API_KEY=your-email-api-key      # Email service API key
EMAIL_FROM_ADDRESS=noreply@americanfaithacademy.org
EMAIL_FROM_NAME=American Faith Academy
EMAIL_REPLY_TO=admin@americanfaithacademy.org

# Payment Gateway Configuration
PAYMENT_PROVIDER=stripe                # Payment provider: stripe | paypal | square
STRIPE_SECRET_KEY=sk_live_xxxxx       # Stripe secret key
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx  # Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_xxxxx     # Stripe webhook endpoint secret
PAYMENT_CURRENCY=usd                  # Default currency

# CDN and Assets
CDN_URL=https://cdn.americanfaithacademy.org  # CDN URL for static assets
ASSET_PREFIX=/                         # Asset URL prefix
IMAGE_DOMAINS=americanfaithacademy.org,cdn.americanfaithacademy.org

# Feature Flags
ENABLE_ANALYTICS=true                  # Enable analytics tracking
ENABLE_PERFORMANCE_MONITORING=true     # Enable performance monitoring
ENABLE_ERROR_TRACKING=true            # Enable error tracking
ENABLE_MAINTENANCE_MODE=false         # Enable maintenance mode

# Rate Limiting
RATE_LIMIT_WINDOW=60000               # Rate limit window in ms (1 minute)
RATE_LIMIT_MAX_REQUESTS=100           # Max requests per window
RATE_LIMIT_WEBHOOK_MULTIPLIER=10      # Webhook rate limit multiplier

# Monitoring and Logging
LOG_LEVEL=info                        # Log level: debug | info | warn | error
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx  # Sentry error tracking DSN
MONITORING_TOKEN=monitoring-secret     # Token for monitoring endpoints

# Development Only
NEXT_PUBLIC_API_MOCKING=false         # Enable API mocking in development
ANALYZE_BUNDLE=false                  # Enable webpack bundle analyzer
```

### Environment Variable Validation

```typescript
// env.validation.ts
import { z } from 'zod';

const envSchema = z.object({
  // Required variables
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  APP_URL: z.string().url(),
  APP_SECRET: z.string().min(32),
  
  // Database
  DATABASE_URL: z.string(),
  DATABASE_POOL_MAX: z.string().transform(Number).default('10'),
  
  // GoHighLevel
  GHL_API_KEY: z.string(),
  GHL_LOCATION_ID: z.string(),
  
  // Analytics
  GA_MEASUREMENT_ID: z.string().regex(/^G-[A-Z0-9]+$/),
  
  // Email
  EMAIL_API_KEY: z.string(),
  EMAIL_FROM_ADDRESS: z.string().email(),
  
  // Payment
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  
  // Feature flags
  ENABLE_ANALYTICS: z.string().transform(v => v === 'true').default('true'),
  ENABLE_MAINTENANCE_MODE: z.string().transform(v => v === 'true').default('false'),
});

export const env = envSchema.parse(process.env);
```

### Environment Configuration Files

```bash
# .env.local (Development)
NODE_ENV=development
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://dev:devpass@localhost:5432/afa_dev

# .env.staging
NODE_ENV=staging
APP_URL=https://staging.americanfaithacademy.org
DATABASE_URL=postgresql://staging:pass@staging-db:5432/afa_staging

# .env.production
NODE_ENV=production
APP_URL=https://americanfaithacademy.org
DATABASE_URL=postgresql://prod:pass@prod-db:5432/afa_prod
```

## Rate Limiting Details

### Overview

Rate limiting protects the API from abuse and ensures fair usage across all clients. Different endpoints have different rate limits based on their resource intensity and purpose.

### Rate Limit Configuration

```typescript
// Rate Limit Tiers
interface RateLimitTier {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Maximum requests per window
  message: string;       // Error message when limit exceeded
  skipFailedRequests: boolean;
  skipSuccessfulRequests: boolean;
}

const rateLimitTiers = {
  // Standard API endpoints
  standard: {
    windowMs: 60 * 1000,  // 1 minute
    maxRequests: 100,
    message: 'Too many requests, please try again later.',
    skipFailedRequests: false,
    skipSuccessfulRequests: false
  },
  
  // Form submission endpoints
  forms: {
    windowMs: 15 * 60 * 1000,  // 15 minutes
    maxRequests: 5,
    message: 'Too many form submissions. Please wait before trying again.',
    skipFailedRequests: true,
    skipSuccessfulRequests: false
  },
  
  // Webhook endpoints
  webhooks: {
    windowMs: 60 * 1000,  // 1 minute
    maxRequests: 1000,
    message: 'Webhook rate limit exceeded.',
    skipFailedRequests: false,
    skipSuccessfulRequests: false
  },
  
  // Authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000,  // 15 minutes
    maxRequests: 10,
    message: 'Too many authentication attempts.',
    skipFailedRequests: false,
    skipSuccessfulRequests: true
  },
  
  // Health check endpoints (no limit)
  health: {
    windowMs: 60 * 1000,
    maxRequests: Infinity,
    message: '',
    skipFailedRequests: true,
    skipSuccessfulRequests: true
  }
};
```

### Rate Limit Headers

All API responses include rate limit information in the headers:

```
X-RateLimit-Limit: 100              # Maximum requests allowed
X-RateLimit-Remaining: 95           # Requests remaining in window
X-RateLimit-Reset: 1706537400       # Unix timestamp when limit resets
X-RateLimit-Reset-After: 45         # Seconds until limit resets
X-RateLimit-Retry-After: 45         # Seconds to wait before retry (429 only)
```

### Rate Limit Implementation

```typescript
// middleware/rateLimit.ts
import { NextRequest, NextResponse } from 'next/server';
import { RateLimiter } from '@/lib/rateLimiter';

export async function rateLimitMiddleware(
  request: NextRequest,
  tier: keyof typeof rateLimitTiers = 'standard'
) {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const identifier = `${tier}:${ip}`;
  const limit = rateLimitTiers[tier];
  
  const rateLimiter = new RateLimiter({
    windowMs: limit.windowMs,
    max: limit.maxRequests
  });
  
  const result = await rateLimiter.check(identifier);
  
  const headers = new Headers({
    'X-RateLimit-Limit': limit.maxRequests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
    'X-RateLimit-Reset-After': result.resetAfter.toString()
  });
  
  if (!result.allowed) {
    headers.set('X-RateLimit-Retry-After', result.resetAfter.toString());
    
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: limit.message,
          retry_after: result.resetAfter
        }
      }),
      {
        status: 429,
        headers: headers
      }
    );
  }
  
  return { allowed: true, headers };
}
```

### Endpoint-Specific Rate Limits

```yaml
# API Endpoint Rate Limits

/api/contact:
  tier: forms
  method: POST
  limit: 5 requests per 15 minutes per IP
  notes: Prevent spam submissions

/api/application:
  tier: forms
  method: POST
  limit: 3 requests per 15 minutes per IP
  notes: Application form submission

/api/newsletter:
  tier: standard
  method: POST
  limit: 10 requests per hour per IP
  notes: Newsletter subscription

/api/search:
  tier: standard
  method: GET
  limit: 100 requests per minute per IP
  notes: Site search functionality

/api/analytics/track:
  tier: standard
  method: POST
  limit: 1000 requests per minute per IP
  notes: Analytics event tracking

/api/webhooks/*:
  tier: webhooks
  method: POST
  limit: 1000 requests per minute per IP
  notes: External service webhooks

/api/health/*:
  tier: health
  method: GET
  limit: Unlimited
  notes: Health check endpoints

/api/admin/*:
  tier: auth
  method: ALL
  limit: 50 requests per 15 minutes per user
  notes: Admin panel endpoints
```

### Rate Limit Bypass

Certain requests can bypass rate limits with proper authentication:

```typescript
// Bypass for monitoring services
const bypassTokens = [
  process.env.MONITORING_TOKEN,
  process.env.INTERNAL_API_KEY
];

if (request.headers.get('Authorization')) {
  const token = request.headers.get('Authorization').replace('Bearer ', '');
  if (bypassTokens.includes(token)) {
    // Skip rate limiting
    return { allowed: true, headers: new Headers() };
  }
}
```

## Error Response Formats

### Standard Error Response

All API errors follow a consistent format for easy parsing and handling by clients.

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;          // Machine-readable error code
    message: string;       // Human-readable error message
    details?: any;         // Additional error details (optional)
    field?: string;        // Field that caused error (validation)
    timestamp: string;     // ISO 8601 timestamp
    request_id?: string;   // Unique request identifier for debugging
  };
}
```

### Common Error Codes and Responses

#### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request body is invalid",
    "details": {
      "validation_errors": [
        {
          "field": "email",
          "message": "Invalid email format"
        },
        {
          "field": "phone",
          "message": "Phone number must include area code"
        }
      ]
    },
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_abc123"
  }
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_def456"
  }
}
```

#### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to access this resource",
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_ghi789"
  }
}
```

#### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {
      "resource": "contact",
      "id": "12345"
    },
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_jkl012"
  }
}
```

#### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_RESOURCE",
    "message": "A contact with this email already exists",
    "details": {
      "field": "email",
      "value": "user@example.com"
    },
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_mno345"
  }
}
```

#### 422 Unprocessable Entity

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The provided data failed validation",
    "details": {
      "errors": [
        {
          "field": "grade_level",
          "message": "Grade level must be between K and 12"
        },
        {
          "field": "start_date",
          "message": "Start date must be in the future"
        }
      ]
    },
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_pqr678"
  }
}
```

#### 429 Too Many Requests

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests, please try again later",
    "details": {
      "limit": 100,
      "window": "1 minute",
      "retry_after": 45
    },
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_stu901"
  }
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_vwx234"
  }
}
```

#### 502 Bad Gateway

```json
{
  "success": false,
  "error": {
    "code": "UPSTREAM_ERROR",
    "message": "Error communicating with external service",
    "details": {
      "service": "payment_gateway",
      "status": 503
    },
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_yza567"
  }
}
```

#### 503 Service Unavailable

```json
{
  "success": false,
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "The service is temporarily unavailable",
    "details": {
      "reason": "maintenance",
      "estimated_downtime": "30 minutes"
    },
    "timestamp": "2024-01-29T13:00:00Z",
    "request_id": "req_bcd890"
  }
}
```

### Error Code Reference

```typescript
// Common error codes used throughout the API
export const ErrorCodes = {
  // Client errors (4xx)
  INVALID_REQUEST: 'INVALID_REQUEST',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  CONFLICT: 'CONFLICT',
  DUPLICATE_RESOURCE: 'DUPLICATE_RESOURCE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Server errors (5xx)
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  UPSTREAM_ERROR: 'UPSTREAM_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Business logic errors
  ENROLLMENT_CLOSED: 'ENROLLMENT_CLOSED',
  INVALID_GRADE_LEVEL: 'INVALID_GRADE_LEVEL',
  CAPACITY_REACHED: 'CAPACITY_REACHED',
  PAYMENT_REQUIRED: 'PAYMENT_REQUIRED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  
  // Integration errors
  GHL_API_ERROR: 'GHL_API_ERROR',
  EMAIL_SEND_FAILED: 'EMAIL_SEND_FAILED',
  WEBHOOK_VERIFICATION_FAILED: 'WEBHOOK_VERIFICATION_FAILED'
} as const;
```

### Error Handling Best Practices

```typescript
// Example error handler implementation
export class ApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);
  
  // Handle known API errors
  if (error instanceof ApiError) {
    return NextResponse.json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
        request_id: generateRequestId()
      }
    }, { status: error.statusCode });
  }
  
  // Handle validation errors
  if (error instanceof ValidationError) {
    return NextResponse.json({
      success: false,
      error: {
        code: ErrorCodes.VALIDATION_ERROR,
        message: 'Validation failed',
        details: {
          errors: error.errors
        },
        timestamp: new Date().toISOString(),
        request_id: generateRequestId()
      }
    }, { status: 422 });
  }
  
  // Handle database errors
  if (error instanceof DatabaseError) {
    return NextResponse.json({
      success: false,
      error: {
        code: ErrorCodes.DATABASE_ERROR,
        message: 'A database error occurred',
        timestamp: new Date().toISOString(),
        request_id: generateRequestId()
      }
    }, { status: 500 });
  }
  
  // Default error response
  return NextResponse.json({
    success: false,
    error: {
      code: ErrorCodes.INTERNAL_ERROR,
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
      request_id: generateRequestId()
    }
  }, { status: 500 });
}
```