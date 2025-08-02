import { LucideIcon } from 'lucide-react';

export interface EnrollmentFAQ {
  question: string;
  answer: string;
}

export interface ExpandedContent {
  requirements: string[];
  faqs: EnrollmentFAQ[];
}

export interface StepCTA {
  text: string;
  primary: boolean;
  action: () => void;
}

export interface EnrollmentStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  duration: string;
  icon: LucideIcon;
  status?: string;
  details: string[];
  expandedContent: ExpandedContent;
  cta?: StepCTA;
}
