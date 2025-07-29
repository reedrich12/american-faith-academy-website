# Code Style Guide

## TypeScript Conventions

### Overview

This guide establishes TypeScript coding standards for the American Faith Academy project. Following these conventions ensures code consistency, maintainability, and reduces cognitive load when working across different parts of the codebase.

### Type Definitions

#### Basic Types

```typescript
// ✅ Good - Use explicit types
const userName: string = 'John Doe';
const userAge: number = 25;
const isActive: boolean = true;
const userTags: string[] = ['student', 'enrolled'];

// ❌ Bad - Avoid 'any' type
const userData: any = fetchUser();

// ✅ Good - Use 'unknown' when type is truly unknown
const apiResponse: unknown = await fetch('/api/data');
```

#### Object Types

```typescript
// ✅ Good - Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'educator' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Good - Use type aliases for unions and intersections
type UserRole = 'student' | 'parent' | 'educator' | 'admin';
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// ✅ Good - Extend interfaces for related types
interface Student extends User {
  gradeLevel: number;
  enrollmentDate: Date;
  parentIds: string[];
}

// ❌ Bad - Avoid nested inline types
function processUser(user: { name: string; email: string; profile: { age: number } }) {
  // ...
}

// ✅ Good - Extract to named types
interface UserProfile {
  age: number;
  address?: string;
}

interface UserData {
  name: string;
  email: string;
  profile: UserProfile;
}

function processUser(user: UserData) {
  // ...
}
```

#### Function Types

```typescript
// ✅ Good - Type function parameters and return values
function calculateTuition(
  gradeLevel: number,
  programType: 'full-time' | 'part-time'
): number {
  return gradeLevel * (programType === 'full-time' ? 1000 : 500);
}

// ✅ Good - Use function type aliases for callbacks
type OnSubmitCallback = (data: FormData) => void | Promise<void>;

interface FormProps {
  onSubmit: OnSubmitCallback;
  onCancel?: () => void; // Optional callback
}

// ✅ Good - Type async functions
async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

// ✅ Good - Use generics for reusable functions
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

#### Generic Types

```typescript
// ✅ Good - Use generics for flexible, type-safe code
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ✅ Good - Constrain generics when needed
interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

// ✅ Good - Use utility types
type PartialUser = Partial<User>; // All properties optional
type ReadonlyUser = Readonly<User>; // All properties readonly
type UserKeys = keyof User; // 'id' | 'name' | 'email' | ...
type NameOnly = Pick<User, 'name'>; // { name: string }
type UserWithoutId = Omit<User, 'id'>; // User without id field
```

### Naming Conventions

#### Variables and Functions

```typescript
// ✅ Good - Use camelCase for variables and functions
const firstName = 'John';
const isLoggedIn = true;
const hasPermission = checkUserPermission();

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Good - Use descriptive names
const userAuthenticationToken = localStorage.getItem('auth-token');
const millisecondsPerDay = 24 * 60 * 60 * 1000;

// ❌ Bad - Avoid abbreviations and single letters
const d = new Date(); // Bad
const currentDate = new Date(); // Good

const u = await getUser(); // Bad
const currentUser = await getUser(); // Good
```

#### Types and Interfaces

```typescript
// ✅ Good - Use PascalCase for types and interfaces
interface UserProfile {
  bio: string;
  avatar: string;
}

type ApplicationStatus = 'pending' | 'approved' | 'rejected';

// ✅ Good - Prefix interfaces with 'I' only if it adds clarity (optional)
interface IApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
}

// ✅ Good - Use descriptive suffixes
type UserDto = { /* ... */ };        // Data Transfer Object
type UserEntity = { /* ... */ };     // Database Entity
type UserViewModel = { /* ... */ };  // View Model
type UserResponse = { /* ... */ };   // API Response
type UserRequest = { /* ... */ };    // API Request
```

#### Constants and Enums

```typescript
// ✅ Good - Use UPPER_SNAKE_CASE for constants
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT_MS = 30000;
const DEFAULT_PAGE_SIZE = 20;

// ✅ Good - Use PascalCase for enums
enum UserRole {
  Student = 'STUDENT',
  Parent = 'PARENT',
  Educator = 'EDUCATOR',
  Admin = 'ADMIN',
}

// ✅ Good - Use const assertions for literal types
const GRADE_LEVELS = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
type GradeLevel = typeof GRADE_LEVELS[number];

// ✅ Good - Group related constants
const API_ENDPOINTS = {
  USERS: '/api/users',
  ENROLLMENT: '/api/enrollment',
  CONTACT: '/api/contact',
} as const;
```

### Type Safety Best Practices

#### Null and Undefined Handling

```typescript
// ✅ Good - Use optional chaining and nullish coalescing
const userEmail = user?.email ?? 'no-email@example.com';
const profilePicture = user?.profile?.avatar;

// ✅ Good - Use type guards
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value
  );
}

// ✅ Good - Handle null/undefined explicitly
function getDisplayName(user: User | null): string {
  if (!user) {
    return 'Guest User';
  }
  return user.name || user.email;
}

// ❌ Bad - Don't use non-null assertion without checks
const userName = user!.name; // Dangerous!

// ✅ Good - Validate first
if (user) {
  const userName = user.name; // Safe
}
```

#### Error Handling

```typescript
// ✅ Good - Define error types
class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

// ✅ Good - Use Result types for operations that can fail
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function enrollStudent(data: EnrollmentData): Promise<Result<Student>> {
  try {
    const student = await api.enrollStudent(data);
    return { success: true, data: student };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

// Usage
const result = await enrollStudent(formData);
if (result.success) {
  console.log('Enrolled:', result.data);
} else {
  console.error('Failed:', result.error.message);
}
```

### Module Organization

```typescript
// ✅ Good - Organize imports
// 1. External dependencies
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

// 2. Internal absolute imports
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

// 3. Relative imports
import { UserProfile } from './UserProfile';
import { formatDate } from './utils';

// 4. Type imports
import type { User, UserRole } from '@/types/user';

// ✅ Good - Use named exports for utilities and components
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// ✅ Good - Use default export for page components
export default function HomePage() {
  return <div>Welcome to AFA</div>;
}

// ✅ Good - Re-export from index files
// components/ui/index.ts
export { Button } from './button';
export { Card } from './card';
export { Input } from './input';
```

## React Patterns

### Component Structure

#### Functional Components

```typescript
// ✅ Good - Use function declarations for components
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  return (
    <div className={clsx('rounded-lg border p-4', className)}>
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      {onEdit && (
        <button
          onClick={() => onEdit(user)}
          className="mt-2 text-blue-600 hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}

// ✅ Good - Use arrow functions for simple components
export const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
);

// ❌ Bad - Don't use React.FC (deprecated pattern)
const BadComponent: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
```

#### Component Organization

```typescript
// ✅ Good - Organize component logic
export function EnrollmentForm() {
  // 1. Hooks first
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Derived state
  const canSubmit = !isLoading && user !== null;
  const currentStep = calculateCurrentStep();

  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependency]);

  // 4. Event handlers
  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await api.submitEnrollment(data);
      router.push('/success');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Render helpers (if needed)
  const renderError = () => {
    if (!error) return null;
    return <div className="text-red-600">{error}</div>;
  };

  // 6. Main render
  return (
    <form onSubmit={handleSubmit}>
      {renderError()}
      {/* Form content */}
    </form>
  );
}
```

### Hooks Patterns

#### Custom Hooks

```typescript
// ✅ Good - Create custom hooks for reusable logic
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// ✅ Good - Compose hooks
export function useUser() {
  const { data: user, error, isLoading } = useSWR<User>('/api/user', fetcher);
  
  const updateUser = useCallback(async (updates: Partial<User>) => {
    const response = await api.updateUser(updates);
    mutate('/api/user', response, false);
    return response;
  }, []);

  return {
    user,
    error,
    isLoading,
    isLoggedIn: !!user,
    updateUser,
  };
}
```

#### Effect Patterns

```typescript
// ✅ Good - Cleanup effects
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal,
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }
  }

  fetchData();

  return () => {
    controller.abort();
  };
}, [dependency]);

// ✅ Good - Debounce effects
useEffect(() => {
  const timeoutId = setTimeout(() => {
    performSearch(searchTerm);
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchTerm]);

// ✅ Good - Handle mounting state
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
}
```

### State Management Patterns

#### Local State

```typescript
// ✅ Good - Use appropriate state structure
export function ContactForm() {
  // Simple state for primitive values
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Object state for related data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // ✅ Good - Update object state immutably
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ✅ Good - Use reducer for complex state
  const [state, dispatch] = useReducer(formReducer, initialState);
}

// ✅ Good - Define reducer outside component
type FormState = {
  values: FormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
};

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'TOUCH_FIELD'; field: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' },
      };
    // ... other cases
    default:
      return state;
  }
}
```

#### Context Patterns

```typescript
// ✅ Good - Create typed context with custom hook
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ... implementation

  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ✅ Good - Custom hook with error handling
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Performance Patterns

```typescript
// ✅ Good - Memoize expensive computations
const MemoizedComponent = memo(function ExpensiveList({ items }: Props) {
  const sortedItems = useMemo(
    () => items.sort((a, b) => b.priority - a.priority),
    [items]
  );

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + item.value, 0),
    [items]
  );

  return (
    <div>
      <p>Total: {totalValue}</p>
      {sortedItems.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
});

// ✅ Good - Memoize callbacks
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // No dependencies, function never changes

  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Using updater function, no dependencies needed

  return <ChildComponent onClick={handleClick} onIncrement={handleIncrement} />;
};

// ✅ Good - Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## CSS/Tailwind Guidelines

### Tailwind Best Practices

#### Class Organization

```tsx
// ✅ Good - Organize classes logically
<div className="
  /* Layout */
  flex flex-col items-center justify-between
  
  /* Spacing */
  p-4 md:p-6 lg:p-8
  
  /* Sizing */
  w-full max-w-4xl min-h-screen
  
  /* Colors & Background */
  bg-white dark:bg-gray-900
  
  /* Borders */
  border border-gray-200 rounded-lg
  
  /* Effects */
  shadow-md hover:shadow-lg
  
  /* Transitions */
  transition-shadow duration-200
  
  /* Typography */
  text-gray-900 dark:text-gray-100
">
  {content}
</div>

// ✅ Good - Use clsx for conditional classes
import clsx from 'clsx';

<button
  className={clsx(
    // Base classes
    'px-4 py-2 font-medium rounded-lg transition-colors',
    
    // Variant classes
    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    
    // State classes
    disabled && 'opacity-50 cursor-not-allowed',
    isLoading && 'relative',
    
    // Custom className
    className
  )}
>
  {children}
</button>
```

#### Component Styling Patterns

```tsx
// ✅ Good - Create style constants
const styles = {
  card: 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
  cardHover: 'hover:shadow-md hover:border-gray-300 transition-all duration-200',
  cardTitle: 'text-xl font-semibold text-gray-900 mb-2',
  cardDescription: 'text-gray-600 leading-relaxed',
} as const;

export function Card({ title, description }: CardProps) {
  return (
    <div className={clsx(styles.card, styles.cardHover)}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

// ✅ Good - Use Tailwind's component classes sparingly
// In global.css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white font-medium rounded-lg
           hover:bg-blue-700 focus:outline-none focus:ring-2 
           focus:ring-blue-500 focus:ring-offset-2
           disabled:opacity-50 disabled:cursor-not-allowed
           transition-colors duration-200;
  }
}
```

#### Responsive Design

```tsx
// ✅ Good - Mobile-first responsive design
<div className="
  /* Mobile (default) */
  grid grid-cols-1 gap-4 p-4
  
  /* Tablet (md) */
  md:grid-cols-2 md:gap-6 md:p-6
  
  /* Desktop (lg) */
  lg:grid-cols-3 lg:gap-8 lg:p-8
  
  /* Wide screens (xl) */
  xl:grid-cols-4
">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>

// ✅ Good - Use container with responsive padding
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// ✅ Good - Responsive typography
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>
```

#### Dark Mode Support

```tsx
// ✅ Good - Always consider dark mode
<div className="bg-white dark:bg-gray-900">
  <h2 className="text-gray-900 dark:text-gray-100">
    Dark mode aware heading
  </h2>
  <p className="text-gray-600 dark:text-gray-400">
    Secondary text with proper contrast
  </p>
</div>

// ✅ Good - Create dark mode variants
const colorScheme = {
  background: 'bg-white dark:bg-gray-900',
  card: 'bg-gray-50 dark:bg-gray-800',
  border: 'border-gray-200 dark:border-gray-700',
  text: {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-400',
    muted: 'text-gray-500 dark:text-gray-500',
  },
} as const;
```

### Custom CSS Guidelines

#### CSS Modules

```scss
// styles/Button.module.scss
.button {
  @apply px-4 py-2 font-medium rounded-lg transition-colors;
  
  &.primary {
    @apply bg-blue-600 text-white;
    
    &:hover:not(:disabled) {
      @apply bg-blue-700;
    }
  }
  
  &.secondary {
    @apply bg-gray-200 text-gray-900;
    
    &:hover:not(:disabled) {
      @apply bg-gray-300;
    }
  }
  
  &:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  
  &.loading {
    @apply relative text-transparent;
    
    &::after {
      content: '';
      @apply absolute inset-0 flex items-center justify-center;
      @apply text-current;
    }
  }
}

// Component usage
import styles from './Button.module.scss';

export function Button({ variant = 'primary', loading, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        loading && styles.loading
      )}
      {...props}
    />
  );
}
```

#### Global Styles

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
@layer base {
  /* Typography */
  html {
    @apply antialiased;
  }
  
  /* Focus styles */
  *:focus-visible {
    @apply outline-none ring-2 ring-blue-500 ring-offset-2;
  }
  
  /* Scrollbar styles */
  ::-webkit-scrollbar {
    @apply w-2 h-2;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-gray-400 dark:bg-gray-600 rounded-full;
  }
}

/* Component styles */
@layer components {
  /* Container with responsive padding */
  .container-fluid {
    @apply w-full px-4 sm:px-6 lg:px-8;
  }
  
  /* Section spacing */
  .section {
    @apply py-12 md:py-16 lg:py-20;
  }
  
  /* Prose styling for content */
  .prose-custom {
    @apply prose prose-lg prose-gray dark:prose-invert
           prose-headings:font-bold prose-a:text-blue-600
           prose-a:no-underline hover:prose-a:underline;
  }
}

/* Utility styles */
@layer utilities {
  /* Text balance for better line breaks */
  .text-balance {
    text-wrap: balance;
  }
  
  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Custom animations */
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
}
```

## Component Naming

### File Naming Conventions

```
components/
├── ui/                          # Base UI components
│   ├── Button.tsx              # PascalCase for components
│   ├── Button.test.tsx         # Test files with .test suffix
│   ├── Button.stories.tsx      # Storybook files with .stories suffix
│   └── index.ts                # Index file for exports
│
├── forms/                       # Form-related components
│   ├── ContactForm.tsx         # Descriptive component names
│   ├── EnrollmentForm.tsx
│   └── FormField.tsx           # Reusable form components
│
├── layout/                      # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── Sidebar.tsx
│
└── sections/                    # Page sections
    ├── HeroSection.tsx         # Section suffix for clarity
    ├── AboutSection.tsx
    └── TestimonialsSection.tsx
```

### Component Naming Rules

```typescript
// ✅ Good - Use PascalCase for components
export function UserProfile() { }
export function NavigationMenu() { }
export function EnrollmentWizard() { }

// ✅ Good - Be descriptive and specific
export function StudentEnrollmentForm() { } // Not just "Form"
export function CourseSelectionModal() { }  // Not just "Modal"
export function TuitionPaymentButton() { }  // Not just "Button"

// ✅ Good - Use consistent suffixes
export function UserCard() { }        // Card components
export function AdminDashboardPage() { }    // Page components
export function DatePickerModal() { }       // Modal components
export function LoadingSpinner() { }        // Loader components
export function ErrorBoundary() { }         // Error components

// ❌ Bad - Avoid generic names
export function Component() { }  // Too generic
export function MyComponent() { } // Meaningless prefix
export function Temp() { }        // Temporary names
export function Test() { }        // Test names in production

// ✅ Good - Compound component naming
export function Accordion() { }
export function AccordionItem() { }
export function AccordionHeader() { }
export function AccordionContent() { }
```

### Props Interface Naming

```typescript
// ✅ Good - Use ComponentNameProps pattern
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

// ✅ Good - Use descriptive names for callback props
interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  onFieldChange?: (field: string, value: any) => void;
}

// ✅ Good - Extend native HTML props when appropriate
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

// ✅ Good - Use composition for complex props
interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
}
```

## File Organization

### Project Structure

```
american-faith-academy/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Route groups
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (marketing)/        # Public pages
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── (dashboard)/        # Protected pages
│   │   │   ├── layout.tsx
│   │   │   └── students/
│   │   ├── api/                # API routes
│   │   │   ├── auth/
│   │   │   └── students/
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components
│   │   └── features/           # Feature-specific components
│   │
│   ├── lib/                    # Utility functions
│   │   ├── api/                # API client functions
│   │   ├── auth/               # Auth utilities
│   │   ├── utils/              # General utilities
│   │   └── constants.ts        # App constants
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── types/                  # TypeScript types
│   │   ├── api.ts              # API types
│   │   ├── database.ts         # Database types
│   │   └── index.ts            # Common types
│   │
│   ├── styles/                 # Global styles
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   └── config/                 # Configuration files
│       ├── site.ts             # Site metadata
│       └── navigation.ts       # Navigation config
│
├── public/                     # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── docs/                       # Documentation
    ├── API.md
    ├── COMPONENTS.md
    └── DEPLOYMENT.md
```

### Import Organization

```typescript
// ✅ Good - Organized imports with clear sections
// 1. React and Next.js imports
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party libraries
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

// 3. UI components
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// 4. Feature components
import { UserProfile } from '@/components/features/UserProfile';
import { EnrollmentForm } from '@/components/forms/EnrollmentForm';

// 5. Hooks and utilities
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { formatCurrency, parsePhoneNumber } from '@/lib/utils';

// 6. Types
import type { User, Student, Enrollment } from '@/types';

// 7. Styles (if using CSS modules)
import styles from './Component.module.css';
```

### Feature-Based Organization

```
// ✅ Good - Organize by feature
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── PasswordReset.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useSession.ts
│   │   ├── api/
│   │   │   ├── login.ts
│   │   │   └── logout.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts          # Public exports
│   │
│   ├── enrollment/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── student-dashboard/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── types/
│       └── index.ts
```

### Index Files and Exports

```typescript
// ✅ Good - Use index files for clean exports
// components/ui/index.ts
export { Button } from './button';
export { Card, CardHeader, CardContent, CardFooter } from './card';
export { Input } from './input';
export { Label } from './label';
export { Select, SelectItem } from './select';

// ✅ Good - Feature index with selective exports
// features/authentication/index.ts
// Public API
export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { useAuth } from './hooks/useAuth';
export type { User, AuthState } from './types/auth.types';

// Internal components not exported
// - ./components/PasswordStrengthIndicator
// - ./utils/validation

// ✅ Good - Barrel exports for types
// types/index.ts
export type { User, Student, Parent, Educator } from './user';
export type { Course, Enrollment, Grade } from './academic';
export type { ApiResponse, ApiError } from './api';
```

### Configuration Files

```typescript
// ✅ Good - Centralized configuration
// config/site.ts
export const siteConfig = {
  name: 'American Faith Academy',
  description: 'Where Minds Soar and Faith Takes Flight',
  url: 'https://americanfaithacademy.org',
  ogImage: 'https://americanfaithacademy.org/og.jpg',
  links: {
    facebook: 'https://facebook.com/americanfaithacademy',
    instagram: 'https://instagram.com/americanfaithacademy',
  },
} as const;

// config/navigation.ts
export const mainNavigation = [
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Contact', href: '/contact' },
] as const;

export const footerNavigation = {
  academics: [
    { name: 'Programs', href: '/programs' },
    { name: 'Curriculum', href: '/curriculum' },
  ],
  admissions: [
    { name: 'Apply Now', href: '/apply' },
    { name: 'Tuition', href: '/tuition' },
  ],
} as const;
```

### Best Practices Summary

```typescript
/*
 * File Organization Best Practices:
 * 
 * 1. Group related files together (components with their tests, styles)
 * 2. Use consistent naming patterns across the project
 * 3. Keep files focused and single-purpose
 * 4. Limit file size to ~300 lines (split if larger)
 * 5. Use index files for clean imports
 * 6. Separate concerns (UI, business logic, data)
 * 7. Follow the proximity principle (related code stays close)
 * 8. Use feature folders for large features
 * 9. Keep the dependency graph shallow
 * 10. Document complex file relationships
 */

// Example of well-organized component file
// components/features/EnrollmentWizard/EnrollmentWizard.tsx
import React, { useState } from 'react';

// Types at the top
interface EnrollmentWizardProps {
  initialStep?: number;
  onComplete: (data: EnrollmentData) => void;
}

// Main component
export function EnrollmentWizard({ 
  initialStep = 0, 
  onComplete 
}: EnrollmentWizardProps) {
  // Component implementation
}

// Sub-components in separate files if complex
// ./StepOne.tsx, ./StepTwo.tsx, etc.

// Styles in separate file
// ./EnrollmentWizard.module.css

// Tests in separate file
// ./EnrollmentWizard.test.tsx

// Export from index
// ./index.ts
// export { EnrollmentWizard } from './EnrollmentWizard';
```