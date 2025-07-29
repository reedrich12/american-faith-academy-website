# Deployment Guide

## Prerequisites

### System Requirements

Before deploying the American Faith Academy website, ensure you have the following prerequisites in place:

#### Development Machine Requirements

```yaml
Operating System:
  - macOS 10.15+ (Catalina or later)
  - Ubuntu 20.04+ LTS
  - Windows 10+ with WSL2

Software Requirements:
  - Node.js: v18.17.0 or higher (LTS recommended)
  - npm: v9.0.0 or higher
  - Git: v2.30.0 or higher
  - Docker: v20.10.0 or higher (optional, for containerized deployment)

Hardware Requirements:
  - RAM: Minimum 8GB (16GB recommended)
  - Storage: At least 10GB free space
  - CPU: 4+ cores recommended for build processes
```

#### Production Server Requirements

```yaml
Server Specifications:
  - CPU: 2+ vCPUs (4+ recommended)
  - RAM: 4GB minimum (8GB recommended)
  - Storage: 20GB SSD minimum
  - Network: 100Mbps+ connection
  - OS: Ubuntu 20.04 LTS or Amazon Linux 2

Web Server Options:
  - Nginx 1.18+ (recommended)
  - Apache 2.4+
  - Built-in Node.js server (for platforms like Vercel)
```

### Required Accounts and Services

```yaml
Essential Services:
  - GitHub Account: For source code repository
  - Domain Registrar: For americanfaithacademy.org
  - DNS Provider: Cloudflare (recommended) or alternative
  - Hosting Platform: One of the following
    - Vercel (recommended for Next.js)
    - Netlify
    - AWS (EC2, Amplify, or S3+CloudFront)
    - DigitalOcean App Platform

Third-party Integrations:
  - GoHighLevel: CRM account with API access
  - Google Account: For Analytics and Tag Manager
  - Email Service: SendGrid/Mailgun/AWS SES account
  - Payment Gateway: Stripe/PayPal merchant account
  - SSL Certificate: Let's Encrypt (free) or paid certificate

Monitoring Services (Optional):
  - Sentry: Error tracking
  - LogRocket: Session replay
  - Datadog/New Relic: APM monitoring
```

### Access Requirements

```bash
# Required access permissions
1. Repository Access:
   - Git repository read access (minimum)
   - Git repository write access (for automated deployments)

2. Server Access:
   - SSH access to production servers (if self-hosted)
   - Deployment platform account with appropriate permissions

3. Domain/DNS Access:
   - DNS management access
   - Domain registrar access (for domain verification)

4. Integration Access:
   - API keys for all third-party services
   - Webhook configuration permissions
   - Analytics property access
```

### Pre-deployment Checklist

```markdown
## Pre-deployment Checklist

### Code Preparation
- [ ] All code committed to repository
- [ ] No uncommitted changes in working directory
- [ ] Latest changes pulled from main branch
- [ ] All tests passing
- [ ] Build completes without errors
- [ ] No console errors in development

### Environment Configuration
- [ ] All environment variables documented
- [ ] Production environment variables set
- [ ] API keys and secrets secured
- [ ] Database connection strings configured
- [ ] Third-party service endpoints verified

### Security Review
- [ ] No hardcoded secrets in codebase
- [ ] Environment variables not exposed
- [ ] CORS configuration appropriate
- [ ] CSP headers configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented

### Performance Check
- [ ] Images optimized
- [ ] JavaScript bundled and minified
- [ ] CSS optimized
- [ ] Lazy loading implemented
- [ ] Caching headers configured
```

## Environment Setup

### Local Development Environment

#### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/american-faith-academy/website.git
cd website

# Install Node.js dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure environment variables
nano .env.local
```

#### 2. Environment Configuration

Create the following environment files:

```bash
# .env.local (Development)
NODE_ENV=development
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://dev:password@localhost:5432/afa_dev

# GoHighLevel
GHL_API_KEY=dev_ghl_api_key
GHL_LOCATION_ID=dev_location_id

# Analytics (optional in dev)
GA_MEASUREMENT_ID=G-DEVELOPMENT
GTM_CONTAINER_ID=GTM-DEVELOP

# Email Service
EMAIL_PROVIDER=console  # Logs to console in dev
EMAIL_API_KEY=dev_email_key

# Payment (test keys)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

#### 3. Verify Installation

```bash
# Run development server
npm run dev

# Open browser to http://localhost:3000
# Verify site loads correctly

# Run build test
npm run build

# Check for any build errors
```

### Staging Environment Setup

#### 1. Create Staging Branch

```bash
# Create staging branch from main
git checkout -b staging
git push -u origin staging
```

#### 2. Configure Staging Environment

```bash
# .env.staging
NODE_ENV=staging
APP_URL=https://staging.americanfaithacademy.org

# Use separate staging database
DATABASE_URL=postgresql://staging:password@staging-db:5432/afa_staging

# Use test API keys for integrations
GHL_API_KEY=staging_ghl_api_key
STRIPE_SECRET_KEY=sk_test_staging_xxxxx

# Enable debug features
ENABLE_DEBUG_PANEL=true
LOG_LEVEL=debug
```

#### 3. Deploy to Staging

```bash
# Example: Vercel staging deployment
vercel --env=staging

# Example: Custom server deployment
ssh staging-server
cd /var/www/staging
git pull origin staging
npm install
npm run build
pm2 restart staging-app
```

### Production Environment Setup

#### 1. Production Configuration

```bash
# .env.production (DO NOT commit to repository)
NODE_ENV=production
APP_URL=https://americanfaithacademy.org

# Production Database
DATABASE_URL=postgresql://prod:secure_password@prod-db:5432/afa_production
DATABASE_POOL_MAX=20

# Production API Keys
GHL_API_KEY=live_ghl_api_key_xxxxx
GHL_LOCATION_ID=live_location_id

# Analytics
GA_MEASUREMENT_ID=G-PRODUCTION123
GTM_CONTAINER_ID=GTM-PROD456

# Email Service
EMAIL_PROVIDER=sendgrid
EMAIL_API_KEY=SG.live_key_xxxxx

# Payment Gateway
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_live_xxxxx

# Security
APP_SECRET=generate_64_char_random_string_here
WEBHOOK_SECRET=another_secure_random_string

# Performance
ENABLE_CACHE=true
CACHE_TTL=3600
CDN_URL=https://cdn.americanfaithacademy.org

# Monitoring
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
LOG_LEVEL=error
```

#### 2. Secure Environment Variables

```bash
# Using Vercel
vercel env add DATABASE_URL production
# Enter value when prompted

# Using .env.vault (dotenv-vault)
npx dotenv-vault new
npx dotenv-vault push production

# Using AWS Secrets Manager
aws secretsmanager create-secret \
  --name afa-production-env \
  --secret-string file://.env.production

# Using Kubernetes Secrets
kubectl create secret generic afa-prod-env \
  --from-env-file=.env.production
```

#### 3. Database Setup

```sql
-- Create production database
CREATE DATABASE afa_production;
CREATE USER afa_prod WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE afa_production TO afa_prod;

-- Run migrations
npm run migrate:production

-- Seed initial data (if needed)
npm run seed:production
```

## Build Process

### Understanding the Build Pipeline

```mermaid
graph LR
    A[Source Code] --> B[Install Dependencies]
    B --> C[Run Tests]
    C --> D[Lint Code]
    D --> E[Type Check]
    E --> F[Build Application]
    F --> G[Optimize Assets]
    G --> H[Generate Static Pages]
    H --> I[Create Production Bundle]
    I --> J[Upload to CDN]
    J --> K[Deploy to Server]
```

### Local Build Process

#### 1. Pre-build Verification

```bash
# Clean previous builds
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Install fresh dependencies
npm ci

# Run all checks
npm run lint
npm run type-check
npm run test
```

#### 2. Development Build

```bash
# Development build (with source maps)
npm run build:dev

# Analyze bundle size
npm run analyze

# Check build output
du -sh .next
ls -la .next/static
```

#### 3. Production Build

```bash
# Production build
npm run build

# Build output structure
.next/
├── cache/           # Build cache
├── server/          # Server-side code
├── static/          # Static assets
│   ├── chunks/      # JavaScript chunks
│   ├── css/         # CSS files
│   └── media/       # Images and fonts
└── BUILD_ID         # Unique build identifier
```

### CI/CD Build Process

#### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Lint code
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        env:
          NEXT_PUBLIC_APP_URL: ${{ secrets.APP_URL }}
          NEXT_PUBLIC_GA_ID: ${{ secrets.GA_MEASUREMENT_ID }}
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: .next
          retention-days: 7

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-output
          path: .next
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          npm i -g vercel
          vercel --prod --token=$VERCEL_TOKEN
```

### Build Optimization

#### 1. Next.js Configuration

```javascript
// next.config.js
module.exports = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: ['americanfaithacademy.org', 'cdn.americanfaithacademy.org'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },
  
  // Configure redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

#### 2. Build Performance Monitoring

```bash
# Measure build performance
time npm run build

# Generate build report
npm run build -- --profile

# Check bundle sizes
npm run analyze

# Lighthouse CI
npm run lighthouse
```

## Deployment Steps

### Vercel Deployment (Recommended)

#### 1. Initial Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
# Follow prompts to connect to your Vercel project
```

#### 2. Configure Project

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### 3. Deploy to Production

```bash
# Deploy to preview (automatic for PRs)
vercel

# Deploy to production
vercel --prod

# Deploy with specific environment
vercel --prod --env=production

# Monitor deployment
vercel logs --follow
```

### Manual Server Deployment

#### 1. Prepare Server

```bash
# SSH into server
ssh user@your-server.com

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Create application directory
sudo mkdir -p /var/www/americanfaithacademy
sudo chown -R $USER:$USER /var/www/americanfaithacademy
```

#### 2. Deploy Application

```bash
# Clone repository
cd /var/www/americanfaithacademy
git clone https://github.com/your-org/afa-website.git .

# Install dependencies
npm ci --production

# Copy environment variables
scp .env.production user@server:/var/www/americanfaithacademy/

# Build application
npm run build

# Start with PM2
pm2 start npm --name "afa-website" -- start
pm2 save
pm2 startup
```

#### 3. Configure Nginx

```nginx
# /etc/nginx/sites-available/americanfaithacademy
server {
    listen 80;
    server_name americanfaithacademy.org www.americanfaithacademy.org;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name americanfaithacademy.org www.americanfaithacademy.org;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/americanfaithacademy.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/americanfaithacademy.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Proxy configuration
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static file caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache STATIC;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /static {
        alias /var/www/americanfaithacademy/public/static;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

#### 4. Enable Site

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/americanfaithacademy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Check deployment
curl -I https://americanfaithacademy.org
```

### Docker Deployment

#### 1. Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### 2. Build and Deploy

```bash
# Build Docker image
docker build -t afa-website:latest .

# Run locally
docker run -p 3000:3000 --env-file .env.production afa-website:latest

# Push to registry
docker tag afa-website:latest your-registry/afa-website:latest
docker push your-registry/afa-website:latest

# Deploy to server
ssh server "docker pull your-registry/afa-website:latest"
ssh server "docker stop afa-website || true"
ssh server "docker run -d --name afa-website -p 3000:3000 --env-file .env.production --restart unless-stopped your-registry/afa-website:latest"
```

### AWS Deployment

#### 1. AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure AWS
amplify configure

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

#### 2. AWS S3 + CloudFront (Static Export)

```bash
# Configure for static export
# next.config.js
module.exports = {
  output: 'export',
  // ... other config
};

# Build static files
npm run build

# Sync to S3
aws s3 sync out/ s3://americanfaithacademy-website --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Rollback Procedures

### Immediate Rollback

#### 1. Vercel Rollback

```bash
# List recent deployments
vercel list

# Rollback to previous deployment
vercel rollback

# Or rollback to specific deployment
vercel rollback dpl_FhQoH9m8ZKn1aB2C3D4E5F6G7H8I

# Promote specific deployment to production
vercel promote dpl_FhQoH9m8ZKn1aB2C3D4E5F6G7H8I
```

#### 2. Manual Server Rollback

```bash
# SSH into server
ssh user@server

# Stop current application
pm2 stop afa-website

# Checkout previous version
cd /var/www/americanfaithacademy
git fetch --all
git checkout <previous-commit-hash>

# Rebuild and restart
npm ci --production
npm run build
pm2 restart afa-website

# Verify rollback
curl -I https://americanfaithacademy.org
pm2 logs afa-website
```

### Database Rollback

```bash
# 1. Stop application to prevent new writes
pm2 stop afa-website

# 2. Backup current state
pg_dump afa_production > backup_$(date +%Y%m%d_%H%M%S).sql

# 3. Restore from previous backup
psql afa_production < backup_20240128_120000.sql

# 4. Run any necessary migrations
npm run migrate:down -- --to 20240128120000

# 5. Restart application
pm2 restart afa-website
```

### Emergency Rollback Plan

```yaml
Emergency Rollback Checklist:
  1. Identify Issue:
     - [ ] Error logs reviewed
     - [ ] Impact assessed
     - [ ] Stakeholders notified

  2. Immediate Actions:
     - [ ] Switch to maintenance mode
     - [ ] Stop affected services
     - [ ] Preserve current state

  3. Rollback Execution:
     - [ ] Execute rollback procedure
     - [ ] Verify rollback success
     - [ ] Test critical functionality

  4. Post-Rollback:
     - [ ] Monitor system stability
     - [ ] Document incident
     - [ ] Plan fix for next deployment

Emergency Contacts:
  - DevOps Lead: +1-XXX-XXX-XXXX
  - CTO: +1-XXX-XXX-XXXX
  - Hosting Support: support@provider.com
```

### Rollback Automation

```bash
#!/bin/bash
# rollback.sh - Automated rollback script

set -e

echo "Starting rollback procedure..."

# Get the last successful deployment
LAST_GOOD_COMMIT=$(git rev-parse HEAD~1)

# Confirm rollback
read -p "Rollback to commit $LAST_GOOD_COMMIT? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Execute rollback
echo "Stopping application..."
pm2 stop afa-website

echo "Rolling back code..."
git checkout $LAST_GOOD_COMMIT

echo "Installing dependencies..."
npm ci --production

echo "Building application..."
npm run build

echo "Starting application..."
pm2 restart afa-website

echo "Rollback complete!"
pm2 status
```

## SSL/Domain Configuration

### Domain Setup

#### 1. Domain Registration

```yaml
Domain Configuration:
  Primary Domain: americanfaithacademy.org
  Aliases:
    - www.americanfaithacademy.org
    - afa.org (if owned)
    
  DNS Provider: Cloudflare (recommended)
  
  Registrar Settings:
    - Enable domain lock
    - Enable WHOIS privacy
    - Auto-renewal enabled
    - 2FA enabled on account
```

#### 2. DNS Configuration

```bash
# A Records
@     A     1.2.3.4      # Your server IP
www   A     1.2.3.4      # Your server IP

# Or for Vercel
@     A     76.76.21.21  # Vercel IP
www   CNAME  cname.vercel-dns.com

# Additional Records
@     MX    10 mail.americanfaithacademy.org
@     TXT   "v=spf1 include:sendgrid.net ~all"
_dmarc TXT  "v=DMARC1; p=quarantine; rua=mailto:admin@americanfaithacademy.org"
```

#### 3. Cloudflare Configuration

```yaml
Cloudflare Settings:
  SSL/TLS:
    Mode: Full (strict)
    Edge Certificates: On
    Always Use HTTPS: On
    Minimum TLS Version: 1.2
    
  Security:
    Security Level: Medium
    Bot Fight Mode: On
    Challenge Passage: 30 minutes
    
  Speed:
    Auto Minify: HTML, CSS, JS
    Brotli: On
    Rocket Loader: Off (can break Next.js)
    
  Caching:
    Browser Cache TTL: 4 hours
    Cache Level: Standard
    
  Page Rules:
    1. *americanfaithacademy.org/_next/static/*
       Cache Level: Cache Everything
       Edge Cache TTL: 1 month
       
    2. *americanfaithacademy.org/api/*
       Cache Level: Bypass
       
    3. *americanfaithacademy.org/admin/*
       Security Level: High
       Cache Level: Bypass
```

### SSL Certificate Setup

#### 1. Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d americanfaithacademy.org -d www.americanfaithacademy.org

# Test renewal
sudo certbot renew --dry-run

# Setup auto-renewal
sudo crontab -e
# Add: 0 0 * * * certbot renew --quiet
```

#### 2. Commercial SSL Certificate

```bash
# Generate CSR
openssl req -new -newkey rsa:2048 -nodes \
  -keyout americanfaithacademy.org.key \
  -out americanfaithacademy.org.csr

# CSR details
Country: US
State: Your State
City: Your City
Organization: American Faith Academy
Organizational Unit: IT
Common Name: americanfaithacademy.org

# Submit CSR to certificate authority
# Download certificate files

# Install certificate
sudo cp americanfaithacademy.org.crt /etc/ssl/certs/
sudo cp americanfaithacademy.org.key /etc/ssl/private/
sudo cp intermediate.crt /etc/ssl/certs/

# Update Nginx configuration
ssl_certificate /etc/ssl/certs/americanfaithacademy.org.crt;
ssl_certificate_key /etc/ssl/private/americanfaithacademy.org.key;
ssl_trusted_certificate /etc/ssl/certs/intermediate.crt;
```

#### 3. SSL Configuration Best Practices

```nginx
# Strong SSL configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_stapling on;
ssl_stapling_verify on;

# HSTS
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

# Additional security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: *.googletagmanager.com *.google-analytics.com; font-src 'self' data:; connect-src 'self' *.googletagmanager.com *.google-analytics.com *.gohighlevel.com;" always;
```

### Domain Monitoring

#### 1. SSL Certificate Monitoring

```bash
# Check certificate expiration
echo | openssl s_client -servername americanfaithacademy.org -connect americanfaithacademy.org:443 2>/dev/null | openssl x509 -noout -dates

# Monitor with cron
0 0 * * * /usr/local/bin/check-ssl-expiry.sh

# check-ssl-expiry.sh
#!/bin/bash
DOMAIN="americanfaithacademy.org"
EXPIRY=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s)
NOW_EPOCH=$(date +%s)
DAYS_LEFT=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 86400 ))

if [ $DAYS_LEFT -lt 30 ]; then
    echo "SSL certificate expires in $DAYS_LEFT days" | mail -s "SSL Certificate Expiry Warning" admin@americanfaithacademy.org
fi
```

#### 2. Domain Expiration Monitoring

```bash
# Check domain expiration
whois americanfaithacademy.org | grep -E "Expiry|Expiration"

# Setup monitoring service
# Use services like:
# - UptimeRobot
# - Pingdom
# - StatusCake
```

### Post-Deployment Verification

```bash
# SSL Test
curl -vI https://americanfaithacademy.org

# Security Headers Test
curl -I https://americanfaithacademy.org | grep -E "Strict-Transport|X-Frame|X-Content-Type"

# DNS Propagation Check
dig americanfaithacademy.org
nslookup americanfaithacademy.org

# Performance Test
curl -w "@curl-format.txt" -o /dev/null -s https://americanfaithacademy.org

# SSL Labs Test
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=americanfaithacademy.org
```