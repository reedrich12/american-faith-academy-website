import { useState } from 'react';
import {
  Phone,
  ChartBar,
  Handshake,
  Rocket,
  PartyPopper,
  Building,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  Target,
  LucideIcon
} from 'lucide-react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export interface Milestone {
  week: string;
  task: string;
  icon: LucideIcon;
}

export interface Step {
  id: number;
  title: string;
  duration: string;
  icon: LucideIcon;
  description: string;
  details?: string[];
  milestones?: Milestone[];
  metrics?: string[];
  deliverable?: string;
  color: string;
}

export interface PartnershipModel {
  id: 'church' | 'independent' | 'hybrid';
  title: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  bestFor: string;
}

export type ModelType = 'church' | 'independent' | 'hybrid';

export const useGettingStarted = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const steps: Step[] = [
    {
      id: 1,
      title: 'Discovery Call',
      duration: '1 hour',
      icon: Phone,
      description: 'Vision discussion and goal alignment',
      details: [
        'Explore your vision for education in your community',
        'Discuss your background and resources',
        'Review partnership models and requirements',
        'Get answers to all your questions'
      ],
      deliverable: 'Clear understanding of partnership fit',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Market Analysis',
      duration: '2-3 weeks',
      icon: ChartBar,
      description: 'Demographics, competition, and projections',
      details: [
        'Analyze local demographics and demand',
        'Evaluate competitive landscape',
        'Project enrollment and financial scenarios',
        'Identify optimal location and facility options'
      ],
      deliverable: 'Comprehensive market report',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 3,
      title: 'Partnership Agreement',
      duration: '1-2 weeks',
      icon: Handshake,
      description: 'Legal documentation and timeline establishment',
      details: [
        'Review and sign partnership agreement',
        'Establish launch timeline and milestones',
        'Set up business entity and banking',
        'Begin facility preparation planning'
      ],
      deliverable: 'Official partnership status',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Launch Preparation',
      duration: '8-12 weeks',
      icon: Rocket,
      description: 'Facility setup, hiring, training, and marketing',
      milestones: [
        { week: '1-2', task: 'Facility setup and design', icon: Building },
        { week: '3-4', task: 'Teacher recruitment and hiring', icon: Users },
        { week: '5-6', task: 'Staff training and onboarding', icon: GraduationCap },
        { week: '7-8', task: 'Marketing campaign launch', icon: Target },
        { week: '9-10', task: 'Student enrollment drive', icon: FileText },
        { week: '11-12', task: 'Final preparations and soft launch', icon: Calendar }
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Grand Opening',
      duration: 'Ongoing',
      icon: PartyPopper,
      description: 'Launch support, optimization, and growth',
      details: [
        'Grand opening event and community celebration',
        'First day of classes support',
        'Ongoing optimization and coaching',
        'Growth planning and expansion opportunities'
      ],
      metrics: ['Enrollment targets', 'Parent satisfaction', 'Financial performance', 'Expansion readiness'],
      color: 'from-patriot to-patriot-dark'
    }
  ];

  const partnershipModels: PartnershipModel[] = [
    {
      id: 'church',
      title: 'Church-Hosted',
      icon: Building,
      description: 'Leverage your existing facilities and congregation',
      benefits: ['Minimal facility costs', 'Built-in community', 'Mission alignment', 'Shared resources'],
      bestFor: 'Churches with education vision and available space'
    },
    {
      id: 'independent',
      title: 'Independent Center',
      icon: Target,
      description: 'Stand-alone facility with full control',
      benefits: ['Complete autonomy', 'Custom facility design', 'Flexible scheduling', 'Maximum growth potential'],
      bestFor: 'Entrepreneurs ready to build from scratch'
    },
    {
      id: 'hybrid',
      title: 'Hybrid Model',
      icon: Users,
      description: 'Partner with existing organizations',
      benefits: ['Shared facility costs', 'Collaborative approach', 'Risk mitigation', 'Community partnerships'],
      bestFor: 'Those seeking collaborative opportunities'
    }
  ];

  const handleStepKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveStep(index);
    }
  };

  return {
    activeStep,
    setActiveStep,
    selectedModel,
    setSelectedModel,
    isCalendarOpen,
    setIsCalendarOpen,
    prefersReducedMotion,
    steps,
    partnershipModels,
    handleStepKeyDown
  };
};
