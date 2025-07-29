# Development Setup

## Local Environment Setup

### Overview

This guide will walk you through setting up a complete development environment for the American Faith Academy website. The setup process typically takes 30-60 minutes depending on your system and internet speed.

### System Requirements

```yaml
Minimum Requirements:
  Operating System:
    - macOS 10.15 (Catalina) or later
    - Windows 10 version 1903+ with WSL2
    - Ubuntu 20.04 LTS or later
  
  Hardware:
    - CPU: Intel i5 or Apple M1 (or equivalent)
    - RAM: 8GB minimum (16GB recommended)
    - Storage: 10GB free space minimum
    - Display: 1920x1080 resolution recommended
  
  Network:
    - Stable internet connection (for package downloads)
    - Access to npm registry
    - Access to GitHub
```

### Step-by-Step Setup Guide

#### 1. Install Core Dependencies

##### macOS Setup

```bash
# Install Homebrew (package manager)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH (for Apple Silicon Macs)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install Node.js and npm
brew install node@18

# Install Git
brew install git

# Install development tools
brew install watchman  # File watcher for hot reload
brew install postgresql@14  # If using local database

# Verify installations
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
git --version   # Should show 2.30+
```

##### Windows Setup (with WSL2)

```powershell
# First, enable WSL2 in PowerShell (Admin)
wsl --install

# Restart computer, then open Ubuntu terminal

# Update package list
sudo apt update && sudo apt upgrade -y

# Install Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install essential build tools
sudo apt-get install -y build-essential

# Install Git
sudo apt-get install -y git

# Install PostgreSQL (if needed)
sudo apt-get install -y postgresql postgresql-contrib

# Verify installations
node --version
npm --version
git --version
```

##### Linux (Ubuntu/Debian) Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install curl if not present
sudo apt install -y curl

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install build essentials
sudo apt-get install -y build-essential

# Install Git
sudo apt-get install -y git

# Install PostgreSQL (optional)
sudo apt-get install -y postgresql postgresql-contrib

# Install additional helpful tools
sudo apt-get install -y htop tree

# Verify installations
node --version
npm --version
git --version
```

#### 2. Clone and Setup Project

```bash
# Create projects directory
mkdir -p ~/projects
cd ~/projects

# Clone the repository
git clone https://github.com/american-faith-academy/website.git afa-website
cd afa-website

# Install project dependencies
npm install

# If you encounter permission issues on macOS/Linux:
sudo npm install --unsafe-perm=true --allow-root

# Copy environment template
cp .env.example .env.local

# Open environment file for editing
# macOS: open .env.local
# Linux: nano .env.local
# Windows: code .env.local
```

#### 3. Configure Environment Variables

Create and configure your `.env.local` file:

```bash
# Application Settings
NODE_ENV=development
APP_URL=http://localhost:3000
APP_NAME="American Faith Academy"

# Database (for local development)
DATABASE_URL=postgresql://localhost:5432/afa_dev
# Or use SQLite for simpler setup:
# DATABASE_URL=file:./dev.db

# API Keys (development/test keys)
# GoHighLevel
GHL_API_KEY=dev_test_key_replace_with_actual
GHL_LOCATION_ID=dev_location_id
GHL_WEBHOOK_SECRET=dev_webhook_secret

# Analytics (optional in development)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DEVELOPMENT
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-DEVELOP

# Email Service (logs to console in dev)
EMAIL_PROVIDER=console
EMAIL_API_KEY=not_needed_in_dev
EMAIL_FROM_ADDRESS=dev@localhost
EMAIL_FROM_NAME="AFA Development"

# Payment Gateway (Stripe test keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_dev...

# Security (generate random strings for dev)
APP_SECRET=dev_secret_min_32_characters_long_replace_this
WEBHOOK_SECRET=dev_webhook_secret_replace_this

# Feature Flags
ENABLE_DEBUG_MODE=true
ENABLE_API_MOCKING=true
LOG_LEVEL=debug

# Development Tools
ANALYZE_BUNDLE=false
NEXT_TELEMETRY_DISABLED=1
```

#### 4. Database Setup (Optional)

##### Option A: PostgreSQL (Recommended)

```bash
# macOS
brew services start postgresql@14
createdb afa_dev

# Linux
sudo systemctl start postgresql
sudo -u postgres createdb afa_dev

# Create user and grant permissions
psql -d afa_dev -c "CREATE USER afa_user WITH PASSWORD 'development';"
psql -d afa_dev -c "GRANT ALL PRIVILEGES ON DATABASE afa_dev TO afa_user;"

# Update DATABASE_URL in .env.local
# DATABASE_URL=postgresql://afa_user:development@localhost:5432/afa_dev

# Run migrations
npm run db:migrate:dev
```

##### Option B: SQLite (Simpler)

```bash
# No installation needed, just update .env.local
# DATABASE_URL=file:./dev.db

# Run migrations
npm run db:migrate:dev
```

#### 5. Verify Setup

```bash
# Run development server
npm run dev

# Output should show:
# ▲ Next.js 15.4.4
# - Local:        http://localhost:3000
# - Network:      http://192.168.x.x:3000
# 
# ✓ Ready in XXXXms

# Open browser to http://localhost:3000
# You should see the AFA homepage

# Run tests to verify everything works
npm test

# Check for linting issues
npm run lint

# Type check
npm run type-check
```

### Development Workflow Setup

#### 1. Git Configuration

```bash
# Set up Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Configure Git aliases for common commands
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Set up default branch name
git config --global init.defaultBranch main

# Configure line endings
# macOS/Linux
git config --global core.autocrlf input
# Windows
git config --global core.autocrlf true

# Enable color output
git config --global color.ui auto
```

#### 2. Pre-commit Hooks

```bash
# Install husky for Git hooks
npm install --save-dev husky

# Initialize husky
npx husky init

# Add pre-commit hook
echo "npm run pre-commit" > .husky/pre-commit

# Create pre-commit script in package.json
# "pre-commit": "lint-staged"

# Install lint-staged
npm install --save-dev lint-staged

# Configure lint-staged in package.json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{css,scss}": [
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
```

#### 3. Development Scripts

Add these helpful scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:turbo": "next dev --turbo",
    "dev:https": "next dev --experimental-https",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "analyze": "ANALYZE=true next build",
    "clean": "rm -rf .next node_modules/.cache",
    "fresh": "rm -rf node_modules package-lock.json && npm install",
    "db:migrate:dev": "prisma migrate dev",
    "db:studio": "prisma studio",
    "check-all": "npm run type-check && npm run lint && npm run test"
  }
}
```

## Required Tools/Versions

### Core Requirements

```yaml
Essential Tools:
  Node.js:
    Version: 18.17.0 or higher (LTS)
    Check: node --version
    Install: https://nodejs.org/
    Notes: Use LTS version for stability
  
  npm:
    Version: 9.0.0 or higher
    Check: npm --version
    Comes with: Node.js installation
    Alternative: Can use yarn or pnpm
  
  Git:
    Version: 2.30.0 or higher
    Check: git --version
    Install: https://git-scm.com/
    Notes: Required for version control
```

### Framework and Libraries

```yaml
Project Dependencies:
  Next.js:
    Version: 15.4.4
    Purpose: React framework
    Documentation: https://nextjs.org/docs
  
  React:
    Version: 18.3.1
    Purpose: UI library
    Documentation: https://react.dev/
  
  TypeScript:
    Version: 5.7.3
    Purpose: Type safety
    Documentation: https://www.typescriptlang.org/
  
  Tailwind CSS:
    Version: 3.4.17
    Purpose: Utility-first CSS
    Documentation: https://tailwindcss.com/
  
  Framer Motion:
    Version: 11.18.0
    Purpose: Animations
    Documentation: https://www.framer.com/motion/
```

### Development Tools

```yaml
Recommended Tools:
  VS Code Extensions:
    - ESLint: dbaeumer.vscode-eslint
    - Prettier: esbenp.prettier-vscode
    - Tailwind CSS IntelliSense: bradlc.vscode-tailwindcss
    - TypeScript: ms-vscode.vscode-typescript-next
    - GitLens: eamodio.gitlens
    - Error Lens: usernamehw.errorlens
    - Auto Rename Tag: formulahendry.auto-rename-tag
    - Path Intellisense: christian-kohler.path-intellisense
  
  Browser Extensions:
    - React Developer Tools
    - Redux DevTools (if using Redux)
    - Lighthouse
    - JSON Viewer
  
  Terminal Tools:
    - Oh My Zsh (macOS/Linux)
    - Windows Terminal (Windows)
    - iTerm2 (macOS)
    - tmux (terminal multiplexer)
```

### Version Management

```bash
# Using nvm (Node Version Manager)
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use correct Node version
nvm install 18
nvm use 18
nvm alias default 18

# Create .nvmrc file
echo "18" > .nvmrc

# Auto-switch on directory change
# Add to ~/.zshrc or ~/.bashrc
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## IDE Configuration

### Visual Studio Code Setup

#### 1. Essential Settings

Create `.vscode/settings.json` in your project:

```json
{
  // Editor settings
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.quickSuggestions": {
    "strings": true
  },
  
  // File settings
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.exclude": {
    "**/.git": true,
    "**/.next": true,
    "**/node_modules": true,
    "**/.DS_Store": true
  },
  
  // TypeScript settings
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  
  // Tailwind CSS settings
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  
  // ESLint settings
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  
  // Prettier settings
  "prettier.requireConfig": true,
  "prettier.configPath": ".prettierrc",
  
  // Git settings
  "git.autofetch": true,
  "git.confirmSync": false,
  
  // Search settings
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/out": true,
    "**/coverage": true
  }
}
```

#### 2. Recommended Extensions

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    // Essential
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    
    // React/Next.js
    "dsznajder.es7-react-js-snippets",
    "burkeholland.simple-react-snippets",
    "pulkitgangwar.nextjs-snippets",
    
    // Git
    "eamodio.gitlens",
    "mhutchie.git-graph",
    
    // Productivity
    "usernamehw.errorlens",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "naumovs.color-highlight",
    "wayou.vscode-todo-highlight",
    "gruntfuggly.todo-tree",
    
    // Testing
    "orta.vscode-jest",
    "firsttris.vscode-jest-runner",
    
    // Other helpful tools
    "yzhang.markdown-all-in-one",
    "streetsidesoftware.code-spell-checker",
    "mikestead.dotenv",
    "prisma.prisma"
  ]
}
```

#### 3. Launch Configuration

Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}",
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${workspaceFolder}/src/*"
      }
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "- Local:.+(https?://\\S+|[0-9]+)",
        "uriFormat": "http://localhost:3000",
        "action": "debugWithChrome"
      }
    },
    {
      "name": "Jest: debug tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--watchAll=false"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

#### 4. Code Snippets

Create `.vscode/snippets/typescript.json`:

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  ${2}",
      "}",
      "",
      "export function ${1:ComponentName}({ ${3} }: ${1:ComponentName}Props) {",
      "  return (",
      "    <div>",
      "      ${4}",
      "    </div>",
      "  );",
      "}"
    ],
    "description": "Create a React functional component with TypeScript"
  },
  "Next.js Page": {
    "prefix": "nextpage",
    "body": [
      "import { Metadata } from 'next';",
      "",
      "export const metadata: Metadata = {",
      "  title: '${1:Page Title}',",
      "  description: '${2:Page description}',",
      "};",
      "",
      "export default function ${3:PageName}Page() {",
      "  return (",
      "    <div>",
      "      <h1>${1:Page Title}</h1>",
      "      ${4}",
      "    </div>",
      "  );",
      "}"
    ],
    "description": "Create a Next.js page component"
  },
  "API Route": {
    "prefix": "nextapi",
    "body": [
      "import { NextRequest, NextResponse } from 'next/server';",
      "",
      "export async function GET(request: NextRequest) {",
      "  try {",
      "    // Your logic here",
      "    return NextResponse.json({ message: 'Success' });",
      "  } catch (error) {",
      "    return NextResponse.json(",
      "      { error: 'Internal Server Error' },",
      "      { status: 500 }",
      "    );",
      "  }",
      "}",
      "",
      "export async function POST(request: NextRequest) {",
      "  try {",
      "    const body = await request.json();",
      "    // Your logic here",
      "    return NextResponse.json({ message: 'Created' }, { status: 201 });",
      "  } catch (error) {",
      "    return NextResponse.json(",
      "      { error: 'Internal Server Error' },",
      "      { status: 500 }",
      "    );",
      "  }",
      "}"
    ],
    "description": "Create a Next.js API route"
  }
}
```

### WebStorm/IntelliJ IDEA Setup

#### 1. Project Configuration

```xml
<!-- .idea/jsLibraryMappings.xml -->
<project version="4">
  <component name="JavaScriptLibraryMappings">
    <includedPredefinedLibrary name="Node.js Core" />
    <excludedPredefinedLibrary name="HTML" />
  </component>
</project>
```

#### 2. Code Style Settings

```
File > Settings > Editor > Code Style > TypeScript:
- Tab size: 2
- Indent: 2
- Continuation indent: 2
- Use semicolons: true
- Trailing comma: ES5
- Quote marks: Single
```

#### 3. Run Configurations

```
Run > Edit Configurations > Add New Configuration > npm:
- Name: dev
- Scripts: dev
- Node interpreter: Project node
- Package manager: npm
```

## Debugging Guides

### Browser Debugging

#### 1. Chrome DevTools Setup

```javascript
// Enable detailed React debugging
// In browser console:
localStorage.debug = 'app:*';

// Enable React DevTools Profiler
// React DevTools > Profiler > Start profiling

// Preserve console logs across navigation
// DevTools > Settings > Preserve log
```

#### 2. Debugging React Components

```typescript
// Add debugging helpers to components
import { useEffect } from 'react';

export function MyComponent({ data }: Props) {
  // Debug props
  useEffect(() => {
    console.log('MyComponent mounted with props:', { data });
    return () => {
      console.log('MyComponent unmounting');
    };
  }, []);

  // Debug renders
  console.log('MyComponent rendering');

  // Conditional breakpoint
  if (data.items.length > 10) {
    debugger; // Pause here when condition is met
  }

  return <div>{/* Component content */}</div>;
}

// Debug React hooks
function useDebugValue(value: any, label: string) {
  useEffect(() => {
    console.log(`${label}:`, value);
  }, [value, label]);
}
```

#### 3. Network Debugging

```typescript
// Intercept and log API calls
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  console.log('Fetch called:', args);
  const response = await originalFetch(...args);
  console.log('Fetch response:', response.status);
  return response;
};

// Debug specific API endpoints
export async function debugApiCall(endpoint: string) {
  console.time(`API Call: ${endpoint}`);
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(`API Response (${endpoint}):`, data);
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  } finally {
    console.timeEnd(`API Call: ${endpoint}`);
  }
}
```

### Server-Side Debugging

#### 1. Next.js Server Debugging

```bash
# Enable debug mode
DEBUG=* npm run dev

# Debug specific modules
DEBUG=next:* npm run dev
DEBUG=app:* npm run dev

# Add debug statements
# In your code:
import Debug from 'debug';
const debug = Debug('app:api');

export async function GET() {
  debug('API route called');
  // Your code
}
```

#### 2. Node.js Debugging

```json
// .vscode/launch.json configuration
{
  "type": "node",
  "request": "attach",
  "name": "Attach to Node Process",
  "port": 9229,
  "restart": true,
  "protocol": "inspector"
}
```

```bash
# Start with inspector
node --inspect npm run dev

# Or with breakpoint at start
node --inspect-brk npm run dev
```

#### 3. Memory Debugging

```javascript
// Check memory usage
console.log('Memory Usage:', process.memoryUsage());

// Find memory leaks
if (global.gc) {
  global.gc();
  console.log('Memory after GC:', process.memoryUsage());
}

// Profile memory
const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
}
```

### Performance Debugging

#### 1. React Performance Profiling

```typescript
// Measure component performance
import { Profiler } from 'react';

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Set<any>
) {
  console.log(`Component ${id} (${phase}) took ${actualDuration}ms`);
}

export function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourComponents />
    </Profiler>
  );
}
```

#### 2. Build Performance Analysis

```bash
# Analyze bundle size
ANALYZE=true npm run build

# Measure build time
time npm run build

# Profile webpack build
npm run build -- --profile > build-stats.json

# Next.js build analysis
npm run build -- --debug
```

## Common Issues & Solutions

### Installation Issues

#### Issue: `npm install` fails with permission errors

```bash
# Solution 1: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Solution 2: Use npx
npx npm install

# Solution 3: Change npm default directory
npm config set cache ~/.npm-cache --global
```

#### Issue: Node version mismatch

```bash
# Check current version
node --version

# Solution: Use nvm to switch versions
nvm install 18
nvm use 18
nvm alias default 18

# Or use n (alternative to nvm)
npm install -g n
n 18
```

#### Issue: `ENOENT` errors during install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If still failing, use yarn
npm install -g yarn
yarn install
```

### Build Issues

#### Issue: Out of memory during build

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or add to package.json scripts
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

#### Issue: Build fails with module not found

```typescript
// Check import paths are correct
// Wrong:
import Component from 'components/Component';

// Correct:
import Component from '@/components/Component';

// Configure path aliases in tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Issue: CSS/Tailwind not working

```javascript
// Ensure Tailwind is imported in globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Check tailwind.config.js content paths
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ...
}
```

### Runtime Issues

#### Issue: Hydration errors

```typescript
// Common cause: Date/time rendering
// Wrong:
<div>{new Date().toLocaleString()}</div>

// Correct:
import { useEffect, useState } from 'react';

function DateTime() {
  const [date, setDate] = useState<string>('');
  
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);
  
  return <div>{date}</div>;
}

// Or use suppressHydrationWarning
<div suppressHydrationWarning>{new Date().toLocaleString()}</div>
```

#### Issue: API routes not working

```typescript
// Check file location and naming
// Correct structure:
// app/api/route-name/route.ts

// Check method export names
export async function GET() {} // Correct
export async function get() {} // Wrong (lowercase)

// Check for proper response
return NextResponse.json({ data }); // Correct
return { data }; // Wrong
```

#### Issue: Environment variables not loading

```bash
# Check .env.local exists and is not .env.local.txt
ls -la .env*

# Ensure NEXT_PUBLIC_ prefix for client-side vars
NEXT_PUBLIC_API_URL=http://localhost:3000  # Accessible in browser
API_SECRET=secret                          # Server-side only

# Restart dev server after changing env vars
npm run dev
```

### TypeScript Issues

#### Issue: Type errors in IDE but build works

```bash
# Restart TypeScript service in VS Code
Cmd/Ctrl + Shift + P > "TypeScript: Restart TS Server"

# Or reload window
Cmd/Ctrl + Shift + P > "Developer: Reload Window"

# Check TypeScript version
npx tsc --version

# Ensure using workspace TypeScript
# VS Code: Bottom right -> TypeScript version -> Use Workspace Version
```

#### Issue: Cannot find module types

```bash
# Install type definitions
npm install --save-dev @types/node @types/react @types/react-dom

# For other packages
npm install --save-dev @types/package-name

# If no types exist, create declaration
// types/package-name.d.ts
declare module 'package-name' {
  export default function(): any;
}
```

### Database Issues

#### Issue: Database connection failed

```bash
# Check PostgreSQL is running
# macOS:
brew services list
brew services start postgresql

# Linux:
sudo systemctl status postgresql
sudo systemctl start postgresql

# Check connection string format
# postgresql://username:password@localhost:5432/database_name

# Test connection
psql -U username -d database_name -h localhost
```

#### Issue: Migrations failing

```bash
# Reset database (development only!)
npm run db:reset

# Or manually
npx prisma db push --force-reset

# Check migration files
ls prisma/migrations/

# Create new migration
npx prisma migrate dev --name fix_issue
```

### Performance Issues

#### Issue: Slow development server

```bash
# Use Turbopack (experimental)
npm run dev -- --turbo

# Exclude large folders from watching
// next.config.js
module.exports = {
  watchOptions: {
    ignored: ['**/node_modules', '**/.next']
  }
}

# Clear cache
rm -rf .next
npm run dev
```

#### Issue: Memory leaks in development

```javascript
// Check for event listener cleanup
useEffect(() => {
  const handler = () => {};
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);

// Check for interval/timeout cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

### Git Issues

#### Issue: Large files blocking push

```bash
# Check file sizes
find . -type f -size +100M

# Add to .gitignore
echo "*.log" >> .gitignore
echo ".next/" >> .gitignore
echo "node_modules/" >> .gitignore

# Remove from history (if needed)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/large/file' \
  --prune-empty --tag-name-filter cat -- --all
```

#### Issue: Merge conflicts in package-lock.json

```bash
# Delete and regenerate
rm package-lock.json
npm install

# Or use npm's resolution
npm install --package-lock-only
```

### Quick Fixes Reference

```bash
# Nuclear option - reset everything
rm -rf node_modules .next package-lock.json
npm cache clean --force
npm install
npm run dev

# Check what's using a port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process on port
kill -9 $(lsof -t -i:3000)  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Update all dependencies
npm update

# Check for vulnerabilities
npm audit
npm audit fix

# Check outdated packages
npm outdated
```