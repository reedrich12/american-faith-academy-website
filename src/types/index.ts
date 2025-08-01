// ========================================
// Navigation & Layout Types
// ========================================

export interface NavItem {
  href: string;
  label: string;
  target?: '_blank' | '_self';
  rel?: string;
}

export interface SocialLink {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube';
  href: string;
  ariaLabel: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
}

// ========================================
// Component Props Types
// ========================================

// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export interface FormModalProps extends ModalProps {
  formType?: 'application' | 'contact' | 'newsletter';
  onSubmit?: (data: FormData) => void | Promise<void>;
}

export interface CalendarModalProps extends ModalProps {
  onSelectDate?: (date: Date) => void;
  availableDates?: Date[];
}

// Section Props
export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export interface HeroSectionProps extends SectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

// Card Props
export interface CardProps {
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  link?: {
    href: string;
    text: string;
  };
  className?: string;
}

// Button Props Extension
export interface ExtendedButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ========================================
// Form Types
// ========================================

export interface FormData {
  // Contact Form
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  
  // Application Form
  studentFirstName?: string;
  studentLastName?: string;
  studentGrade?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  programInterest?: 'solo-flights' | 'soaring-center' | 'both';
  
  // Newsletter
  newsletterEmail?: string;
}

export interface FormField {
  name: keyof FormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

// ========================================
// API Response Types
// ========================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    field?: string;
  };
}

export interface ContactFormResponse {
  id: string;
  submittedAt: string;
  message: string;
}

// ========================================
// Animation Types
// ========================================

export interface AnimationConfig {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    repeat?: number;
    repeatType?: 'loop' | 'reverse' | 'mirror';
  };
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  whileInView?: Record<string, unknown>;
  viewport?: {
    once?: boolean;
    amount?: number | 'all' | 'some';
    margin?: string;
  };
}

// ========================================
// Academic/Program Types
// ========================================

export interface Program {
  id: string;
  name: string;
  type: 'online' | 'in-person' | 'hybrid';
  description: string;
  grades: string[];
  features: string[];
  tuition?: {
    amount: number;
    period: 'monthly' | 'quarterly' | 'yearly';
    esaEligible: boolean;
  };
}

export interface Curriculum {
  subject: string;
  description: string;
  gradeRange: {
    start: number;
    end: number;
  };
  topics: string[];
}

// ========================================
// Utility Types
// ========================================

// Make all properties of T optional recursively
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// Extract props type from a component
export type PropsOf<C extends React.ComponentType<unknown>> =
  C extends React.ComponentType<infer P> ? P : never;

// Ensure at least one property is provided
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys];

// ========================================
// Event Handler Types
// ========================================

export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type TextAreaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type SelectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;

// ========================================
// Hook Return Types
// ========================================

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface UseFormReturn<T = FormData> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (name: keyof T, value: unknown) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => FormSubmitHandler;
  reset: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}