# Testing Strategy

## Test File Organization

### Overview

The American Faith Academy project follows a comprehensive testing strategy that ensures code quality, prevents regressions, and maintains confidence in deployments. Tests are organized in a logical structure that mirrors the application architecture.

### Directory Structure

```
american-faith-academy/
├── __tests__/                    # Global test files
│   ├── setup/                    # Test setup and configuration
│   │   ├── jest.setup.ts        # Jest global setup
│   │   ├── test-utils.tsx       # Custom render utilities
│   │   └── mocks/               # Global mocks
│   │       ├── handlers.ts      # MSW request handlers
│   │       └── server.ts        # MSW server setup
│   │
│   ├── integration/             # Integration tests
│   │   ├── api/                 # API integration tests
│   │   │   ├── contact.test.ts
│   │   │   └── webhooks.test.ts
│   │   └── workflows/           # User workflow tests
│   │       ├── enrollment.test.ts
│   │       └── contact-form.test.ts
│   │
│   └── e2e/                     # End-to-end tests
│       ├── home.spec.ts
│       ├── contact.spec.ts
│       └── enrollment.spec.ts
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── __tests__/      # Component unit tests
│   │   │   │   ├── button.test.tsx
│   │   │   │   └── card.test.tsx
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   │
│   │   └── sections/
│   │       ├── __tests__/
│   │       │   └── HeroSection.test.tsx
│   │       └── HeroSection.tsx
│   │
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   └── useScrollProgress.test.ts
│   │   └── useScrollProgress.ts
│   │
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── utils.test.ts
│   │   └── utils.ts
│   │
│   └── app/
│       └── api/
│           └── contact/
│               ├── __tests__/
│               │   └── route.test.ts
│               └── route.ts
│
├── cypress/                      # Cypress E2E tests
│   ├── e2e/
│   │   ├── homepage.cy.ts
│   │   └── user-flows.cy.ts
│   ├── fixtures/                # Test data
│   ├── support/                 # Helper functions
│   └── downloads/              # Test downloads
│
└── tests/                       # Playwright tests (alternative)
    ├── homepage.spec.ts
    └── api.spec.ts
```

### Test File Naming Conventions

```yaml
Unit Tests:
  Pattern: component-name.test.tsx or component-name.spec.tsx
  Location: __tests__ folder next to source file
  Example: button.test.tsx
  
Integration Tests:
  Pattern: feature-name.integration.test.ts
  Location: __tests__/integration/
  Example: user-authentication.integration.test.ts
  
E2E Tests:
  Pattern: user-flow.e2e.test.ts or page-name.spec.ts
  Location: cypress/e2e/ or tests/
  Example: enrollment-process.e2e.test.ts
  
Performance Tests:
  Pattern: component-name.perf.test.ts
  Location: __tests__/performance/
  Example: homepage-load.perf.test.ts
```

### Test Organization Best Practices

#### 1. Co-location Strategy

```typescript
// Keep tests close to source files
src/
├── components/
│   └── Button/
│       ├── Button.tsx           # Component
│       ├── Button.module.css    # Styles
│       ├── Button.test.tsx      # Tests
│       └── Button.stories.tsx   # Storybook
```

#### 2. Test Suite Structure

```typescript
// button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  // Group related tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      // Test implementation
    });

    it('renders with custom className', () => {
      // Test implementation
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      // Test implementation
    });

    it('is disabled when disabled prop is true', () => {
      // Test implementation
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      // Test implementation
    });

    it('is keyboard navigable', () => {
      // Test implementation
    });
  });
});
```

#### 3. Test Data Organization

```typescript
// __tests__/fixtures/user.ts
export const mockUser = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  role: 'parent'
};

// __tests__/fixtures/api-responses.ts
export const successResponse = {
  status: 200,
  data: { message: 'Success' }
};

export const errorResponse = {
  status: 400,
  error: { message: 'Bad Request' }
};
```

## Running Tests Locally

### Initial Setup

#### 1. Install Testing Dependencies

```bash
# Install Jest and React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event @types/jest

# Install Cypress for E2E tests
npm install --save-dev cypress

# Or install Playwright (alternative to Cypress)
npm install --save-dev @playwright/test

# Install MSW for API mocking
npm install --save-dev msw

# Install performance testing tools
npm install --save-dev lighthouse puppeteer
```

#### 2. Configure Jest

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app
  dir: './',
});

const customJestConfig = {
  // Setup files after environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Module name mapper for path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:

```javascript
// Import testing library matchers
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
};

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### Running Different Test Types

#### 1. Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"

# Run tests in specific directory
npm test src/components

# Debug tests
npm test -- --detectOpenHandles --runInBand
```

#### 2. Integration Tests

```bash
# Run integration tests only
npm test -- --testPathPattern=integration

# Run API integration tests
npm test -- __tests__/integration/api

# Run with verbose output
npm test -- --verbose --testPathPattern=integration
```

#### 3. E2E Tests with Cypress

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run

# Run specific spec file
npm run cypress:run -- --spec "cypress/e2e/homepage.cy.ts"

# Run with specific browser
npm run cypress:run -- --browser chrome

# Run with recording
npm run cypress:run -- --record --key YOUR_RECORD_KEY
```

#### 4. E2E Tests with Playwright

```bash
# Install Playwright browsers
npx playwright install

# Run all Playwright tests
npm run test:e2e

# Run tests in headed mode
npm run test:e2e -- --headed

# Run tests in specific browser
npm run test:e2e -- --project=chromium

# Run with UI mode
npm run test:e2e -- --ui

# Generate test report
npm run test:e2e -- --reporter=html
```

### Test Scripts in package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:unit": "jest --testPathPattern='^((?!integration|e2e).)*$'",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:ui": "playwright test --ui",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test:all": "npm run test:unit && npm run test:integration && npm run test:e2e",
    "test:perf": "node scripts/performance-tests.js"
  }
}
```

### Debugging Tests

#### 1. VS Code Debugging

```json
// .vscode/launch.json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest: current file",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}",
        "--runInBand",
        "--watchAll=false"
      ],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest: watch all",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--watchAll"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

#### 2. Debugging in Browser

```typescript
// Add debugger statement
it('should handle form submission', async () => {
  debugger; // Execution will pause here
  const user = userEvent.setup();
  // ... rest of test
});

// Or use console logs
it('should update state', () => {
  console.log('Initial state:', component.state);
  // ... test logic
  console.log('Updated state:', component.state);
});
```

## Writing New Tests

### Unit Test Examples

#### 1. Component Testing

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="primary">Click me</Button>);
    
    let button = screen.getByRole('button');
    expect(button).toHaveClass('btn-primary');
    
    rerender(<Button variant="secondary">Click me</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
  });
});
```

#### 2. Hook Testing

```typescript
// useScrollProgress.test.ts
import { renderHook, act } from '@testing-library/react';
import { useScrollProgress } from './useScrollProgress';

describe('useScrollProgress Hook', () => {
  beforeEach(() => {
    // Mock window properties
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 1000,
    });
    
    Object.defineProperty(document.body, 'scrollHeight', {
      writable: true,
      value: 2000,
    });
  });

  it('returns initial scroll progress of 0', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it('updates progress on scroll', () => {
    const { result } = renderHook(() => useScrollProgress());
    
    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(result.current).toBe(0.5); // 50% scrolled
  });

  it('returns 1 when scrolled to bottom', () => {
    const { result } = renderHook(() => useScrollProgress());
    
    act(() => {
      window.scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(result.current).toBe(1); // 100% scrolled
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollProgress());
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
```

#### 3. Utility Function Testing

```typescript
// utils.test.ts
import { formatCurrency, validateEmail, parsePhoneNumber } from './utils';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats positive numbers', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats negative numbers', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });

    it('formats zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('rounds to 2 decimal places', () => {
      expect(formatCurrency(1234.567)).toBe('$1,234.57');
    });
  });

  describe('validateEmail', () => {
    it('validates correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@example.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test @example.com')).toBe(false);
    });
  });

  describe('parsePhoneNumber', () => {
    it('parses valid US phone numbers', () => {
      expect(parsePhoneNumber('(555) 123-4567')).toBe('+15551234567');
      expect(parsePhoneNumber('555-123-4567')).toBe('+15551234567');
      expect(parsePhoneNumber('5551234567')).toBe('+15551234567');
    });

    it('returns null for invalid numbers', () => {
      expect(parsePhoneNumber('123')).toBeNull();
      expect(parsePhoneNumber('invalid')).toBeNull();
    });
  });
});
```

### Integration Test Examples

#### 1. API Route Testing

```typescript
// __tests__/integration/api/contact.test.ts
import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/contact/route';
import { sendEmail } from '@/lib/email';

// Mock external dependencies
jest.mock('@/lib/email');

describe('Contact API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully processes contact form submission', async () => {
    const { req } = createMocks({
      method: 'POST',
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    });

    (sendEmail as jest.Mock).mockResolvedValue({ success: true });

    const response = await POST(req as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      success: true,
      message: 'Contact form submitted successfully',
    });

    expect(sendEmail).toHaveBeenCalledWith({
      to: 'admin@americanfaithacademy.org',
      subject: 'New Contact Form Submission',
      template: 'contact-notification',
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      },
    });
  });

  it('validates required fields', async () => {
    const { req } = createMocks({
      method: 'POST',
      json: async () => ({
        name: '',
        email: 'invalid-email',
        message: '',
      }),
    });

    const response = await POST(req as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error.code).toBe('VALIDATION_ERROR');
    expect(data.error.details).toHaveProperty('name');
    expect(data.error.details).toHaveProperty('email');
    expect(data.error.details).toHaveProperty('message');
  });

  it('handles email service failures gracefully', async () => {
    const { req } = createMocks({
      method: 'POST',
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    });

    (sendEmail as jest.Mock).mockRejectedValue(new Error('Email service down'));

    const response = await POST(req as any);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error.code).toBe('EMAIL_SEND_FAILED');
  });
});
```

#### 2. User Flow Testing

```typescript
// __tests__/integration/workflows/enrollment.test.ts
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnrollmentFlow } from '@/components/EnrollmentFlow';
import { server } from '@/mocks/server';
import { rest } from 'msw';

describe('Enrollment Flow Integration', () => {
  it('completes full enrollment process', async () => {
    const user = userEvent.setup();
    render(<EnrollmentFlow />);

    // Step 1: Select program
    const programSelect = screen.getByLabelText(/select program/i);
    await user.selectOptions(programSelect, 'full-time');

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Step 2: Enter student information
    await user.type(screen.getByLabelText(/student name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/date of birth/i), '2015-05-15');
    await user.selectOptions(screen.getByLabelText(/grade level/i), '5');
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Step 3: Parent information
    await user.type(screen.getByLabelText(/parent name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'parent@example.com');
    await user.type(screen.getByLabelText(/phone/i), '555-123-4567');
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Step 4: Review and submit
    expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Grade 5/)).toBeInTheDocument();
    expect(screen.getByText(/parent@example.com/)).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit application/i });
    await user.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/application submitted successfully/i)).toBeInTheDocument();
    });
  });

  it('handles API errors during submission', async () => {
    // Mock API failure
    server.use(
      rest.post('/api/enrollment', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: { message: 'Server error' } })
        );
      })
    );

    const user = userEvent.setup();
    render(<EnrollmentFlow />);

    // ... complete form steps ...

    const submitButton = screen.getByRole('button', { name: /submit application/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error submitting application/i)).toBeInTheDocument();
    });
  });
});
```

### Testing Best Practices

#### 1. Test Structure Pattern

```typescript
// Follow the AAA pattern
describe('Feature/Component Name', () => {
  it('should do something specific', () => {
    // Arrange - Set up test data and conditions
    const testData = { name: 'Test' };
    const expectedResult = 'Expected';

    // Act - Execute the functionality
    const result = functionUnderTest(testData);

    // Assert - Verify the outcome
    expect(result).toBe(expectedResult);
  });
});
```

#### 2. Testing Principles

```typescript
// Test behavior, not implementation
// Bad - Testing implementation details
it('sets state.isLoading to true', () => {
  const component = shallow(<MyComponent />);
  component.instance().fetchData();
  expect(component.state('isLoading')).toBe(true);
});

// Good - Testing behavior
it('shows loading indicator when fetching data', async () => {
  render(<MyComponent />);
  
  const fetchButton = screen.getByRole('button', { name: /fetch data/i });
  await userEvent.click(fetchButton);
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
```

#### 3. Test Data Builders

```typescript
// Create test data builders for complex objects
class UserBuilder {
  private user = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
  };

  withName(name: string) {
    this.user.name = name;
    return this;
  }

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  withRole(role: string) {
    this.user.role = role;
    return this;
  }

  build() {
    return { ...this.user };
  }
}

// Usage in tests
const adminUser = new UserBuilder()
  .withRole('admin')
  .withEmail('admin@example.com')
  .build();
```

## E2E Test Setup

### Cypress Setup

#### 1. Installation and Configuration

```bash
# Install Cypress
npm install --save-dev cypress

# Initialize Cypress
npx cypress open
```

Create `cypress.config.ts`:

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    
    env: {
      apiUrl: 'http://localhost:3000/api',
    },
    
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
  
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
```

#### 2. Cypress Support Files

Create `cypress/support/commands.ts`:

```typescript
// Custom commands
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('fillContactForm', (data: ContactFormData) => {
  cy.get('input[name="name"]').type(data.name);
  cy.get('input[name="email"]').type(data.email);
  cy.get('input[name="phone"]').type(data.phone);
  cy.get('textarea[name="message"]').type(data.message);
});

// Type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      fillContactForm(data: ContactFormData): Chainable<void>;
    }
  }
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
```

#### 3. E2E Test Examples

```typescript
// cypress/e2e/homepage.cy.ts
describe('Homepage E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads homepage successfully', () => {
    cy.contains('h1', 'Where Minds Soar and Faith Takes Flight');
    cy.get('nav').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('navigates through main sections', () => {
    // Check hero section
    cy.get('[data-testid="hero-section"]').should('be.visible');
    
    // Scroll to SOAR framework
    cy.get('[data-testid="soar-framework"]').scrollIntoView();
    cy.get('[data-testid="soar-framework"]').should('be.visible');
    
    // Check all SOAR cards are present
    cy.get('[data-testid="soar-card"]').should('have.length', 4);
  });

  it('submits contact form successfully', () => {
    // Navigate to contact section
    cy.get('a[href="/contact"]').click();
    cy.url().should('include', '/contact');
    
    // Fill out form
    cy.fillContactForm({
      name: 'Test User',
      email: 'test@example.com',
      phone: '555-123-4567',
      message: 'This is a test message',
    });
    
    // Submit form
    cy.get('button[type="submit"]').click();
    
    // Check success message
    cy.contains('Thank you for contacting us').should('be.visible');
  });

  it('handles form validation', () => {
    cy.get('a[href="/contact"]').click();
    
    // Try to submit empty form
    cy.get('button[type="submit"]').click();
    
    // Check validation messages
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Message is required').should('be.visible');
  });

  it('is responsive on mobile', () => {
    // Set mobile viewport
    cy.viewport('iphone-x');
    
    // Check mobile menu
    cy.get('[data-testid="mobile-menu-button"]').should('be.visible');
    cy.get('[data-testid="desktop-nav"]').should('not.be.visible');
    
    // Open mobile menu
    cy.get('[data-testid="mobile-menu-button"]').click();
    cy.get('[data-testid="mobile-nav"]').should('be.visible');
  });
});
```

### Playwright Setup

#### 1. Installation and Configuration

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Install browsers
npx playwright install
```

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

#### 2. Page Object Model

```typescript
// tests/pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heroTitle: Locator;
  readonly ctaButton: Locator;
  readonly navigation: Locator;
  readonly soarSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroTitle = page.locator('h1');
    this.ctaButton = page.locator('button:has-text("Discover How Your Child Can Soar")');
    this.navigation = page.locator('nav');
    this.soarSection = page.locator('[data-testid="soar-framework"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickCTA() {
    await this.ctaButton.click();
  }

  async scrollToSOAR() {
    await this.soarSection.scrollIntoViewIfNeeded();
  }
}
```

#### 3. Playwright Test Examples

```typescript
// tests/homepage.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Homepage Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('has correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/American Faith Academy/);
    await expect(homePage.heroTitle).toContainText('Where Minds Soar');
  });

  test('CTA button navigates to application', async ({ page }) => {
    await homePage.clickCTA();
    await expect(page).toHaveURL(/\/apply/);
  });

  test('takes screenshot of full page', async ({ page }) => {
    await page.screenshot({ 
      path: 'screenshots/homepage-full.png',
      fullPage: true 
    });
  });

  test('accessibility check', async ({ page }) => {
    const accessibilitySnapshot = await page.accessibility.snapshot();
    expect(accessibilitySnapshot).toBeTruthy();
  });
});

// API testing with Playwright
test.describe('API Tests', () => {
  test('contact form API', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBe(true);
  });
});
```

### E2E Testing Best Practices

#### 1. Test Data Management

```typescript
// cypress/fixtures/users.json
{
  "validUser": {
    "email": "test@example.com",
    "password": "TestPassword123!"
  },
  "adminUser": {
    "email": "admin@americanfaithacademy.org",
    "password": "AdminPassword123!"
  }
}

// Using fixtures in tests
cy.fixture('users').then((users) => {
  cy.login(users.validUser.email, users.validUser.password);
});
```

#### 2. Wait Strategies

```typescript
// Bad - Using fixed waits
cy.wait(3000); // Avoid this

// Good - Wait for specific conditions
cy.get('[data-testid="loading"]').should('not.exist');
cy.get('[data-testid="data-table"]').should('be.visible');
cy.intercept('GET', '/api/data').as('getData');
cy.wait('@getData');
```

#### 3. Test Isolation

```typescript
// Reset state between tests
beforeEach(() => {
  cy.task('db:seed'); // Reset database
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Clean up after tests
afterEach(() => {
  cy.task('db:cleanup');
});
```

## Performance Testing

### Performance Test Setup

#### 1. Lighthouse CI Configuration

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/contact',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

#### 2. Web Vitals Testing

```typescript
// __tests__/performance/web-vitals.test.ts
import puppeteer from 'puppeteer';

describe('Web Vitals Performance', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  test('measures Core Web Vitals', async () => {
    await page.goto('http://localhost:3000');

    // Inject web-vitals library
    await page.addScriptTag({
      url: 'https://unpkg.com/web-vitals@latest/dist/web-vitals.iife.js',
    });

    // Collect metrics
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const data: any = {};
        
        window.webVitals.onCLS((metric) => { data.CLS = metric.value; });
        window.webVitals.onFID((metric) => { data.FID = metric.value; });
        window.webVitals.onLCP((metric) => { data.LCP = metric.value; });
        window.webVitals.onFCP((metric) => { data.FCP = metric.value; });
        window.webVitals.onTTFB((metric) => { data.TTFB = metric.value; });

        // Wait for metrics to be collected
        setTimeout(() => resolve(data), 5000);
      });
    });

    // Assert performance thresholds
    expect(metrics.CLS).toBeLessThan(0.1); // Good CLS
    expect(metrics.LCP).toBeLessThan(2500); // Good LCP
    expect(metrics.FID).toBeLessThan(100); // Good FID
    expect(metrics.TTFB).toBeLessThan(800); // Good TTFB
  });
});
```

#### 3. Load Testing

```javascript
// scripts/load-test.js
const autocannon = require('autocannon');

async function runLoadTest() {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 100, // concurrent connections
    pipelining: 10, // requests per connection
    duration: 30, // seconds
    headers: {
      'accept': 'text/html,application/xhtml+xml',
    },
  });

  console.log('Load Test Results:');
  console.log(`Requests/sec: ${result.requests.average}`);
  console.log(`Latency (ms): ${result.latency.average}`);
  console.log(`Throughput (MB/s): ${result.throughput.average / 1024 / 1024}`);
  
  // Check if performance meets criteria
  if (result.requests.average < 1000) {
    console.error('Performance below threshold!');
    process.exit(1);
  }
}

runLoadTest();
```

#### 4. Bundle Size Analysis

```javascript
// scripts/bundle-analysis.js
const { readFileSync } = require('fs');
const { join } = require('path');
const gzipSize = require('gzip-size');

const BUILD_DIR = '.next/static/chunks';
const MAX_JS_SIZE = 200 * 1024; // 200KB
const MAX_CSS_SIZE = 50 * 1024; // 50KB

function analyzeBundles() {
  const results = [];
  const files = readdirSync(BUILD_DIR);

  files.forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.css')) {
      const filePath = join(BUILD_DIR, file);
      const content = readFileSync(filePath);
      const size = content.length;
      const gzipped = gzipSize.sync(content);

      results.push({
        file,
        size: size / 1024,
        gzipped: gzipped / 1024,
        oversized: size > (file.endsWith('.js') ? MAX_JS_SIZE : MAX_CSS_SIZE),
      });
    }
  });

  console.table(results);

  const oversized = results.filter(r => r.oversized);
  if (oversized.length > 0) {
    console.error('Found oversized bundles:', oversized);
    process.exit(1);
  }
}

analyzeBundles();
```

#### 5. React Component Performance Testing

```typescript
// __tests__/performance/component-render.test.tsx
import { render } from '@testing-library/react';
import { Profiler } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';

describe('Component Performance', () => {
  const renderMetrics: any[] = [];

  const onRenderCallback = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    renderMetrics.push({
      id,
      phase,
      actualDuration,
      baseDuration,
    });
  };

  test('HeroSection renders within performance budget', () => {
    const { rerender } = render(
      <Profiler id="HeroSection" onRender={onRenderCallback}>
        <HeroSection />
      </Profiler>
    );

    // Force re-render
    rerender(
      <Profiler id="HeroSection" onRender={onRenderCallback}>
        <HeroSection />
      </Profiler>
    );

    // Check initial mount performance
    const mountMetric = renderMetrics.find(m => m.phase === 'mount');
    expect(mountMetric.actualDuration).toBeLessThan(16); // 60fps = 16ms per frame

    // Check update performance
    const updateMetric = renderMetrics.find(m => m.phase === 'update');
    expect(updateMetric.actualDuration).toBeLessThan(16);
  });
});
```

### Performance Testing Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "test:perf": "npm run test:perf:vitals && npm run test:perf:lighthouse && npm run test:perf:bundle",
    "test:perf:vitals": "jest __tests__/performance/web-vitals.test.ts",
    "test:perf:lighthouse": "lhci autorun",
    "test:perf:bundle": "node scripts/bundle-analysis.js",
    "test:perf:load": "node scripts/load-test.js",
    "test:perf:profile": "react-devtools-profiler"
  }
}
```

### Performance Monitoring in CI

```yaml
# .github/workflows/performance.yml
name: Performance Tests

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
          
  bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build and analyze
        run: |
          npm run build
          npm run test:perf:bundle
          
      - name: Upload bundle stats
        uses: actions/upload-artifact@v3
        with:
          name: bundle-stats
          path: bundle-stats.json
```