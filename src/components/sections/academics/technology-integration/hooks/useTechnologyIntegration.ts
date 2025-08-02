import { useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import {
  Laptop,
  Brain,
  ChartBar,
  Users,
  Target,
  Sparkles,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle,
  Microscope,
  Clock,
} from 'lucide-react';
import type { TechFeature, TechImplementation } from '../types';
import type { LucideIcon } from 'lucide-react';

interface DashboardMetric {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const useTechnologyIntegration = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const features: Array<TechFeature & { details: string[]; color: string }> = [
    {
      id: 'smart-pacing',
      icon: Brain,
      title: 'Smart Pacing',
      description: 'AI adjusts lesson difficulty based on student performance',
      details: [
        'Automatically slows down for struggling concepts',
        'Accelerates when mastery is demonstrated',
        'Provides additional practice where needed',
        'Never leaves a student behind or holds them back',
      ],
      color: 'from-purple-400 to-pink-400',
    },
    {
      id: 'personalized-pathways',
      icon: Target,
      title: 'Personalized Pathways',
      description: "Custom learning routes for each student's needs",
      details: [
        'Identifies learning style preferences',
        'Adapts content presentation format',
        'Offers multiple ways to demonstrate mastery',
        'Creates unique progression paths',
      ],
      color: 'from-blue-400 to-cyan-400',
    },
    {
      id: 'instant-feedback',
      icon: Sparkles,
      title: 'Instant Feedback',
      description: 'Real-time guidance and encouragement',
      details: [
        'Immediate correction of misconceptions',
        'Positive reinforcement for progress',
        'Hints and scaffolding when stuck',
        'Celebrates achievements big and small',
      ],
      color: 'from-green-400 to-emerald-400',
    },
    {
      id: 'progress-analytics',
      icon: ChartBar,
      title: 'Progress Analytics',
      description: 'Deep insights into learning patterns',
      details: [
        'Track mastery of individual concepts',
        'Identify knowledge gaps early',
        'Predict areas needing support',
        'Measure growth over time',
      ],
      color: 'from-amber-400 to-orange-400',
    },
  ];

  const tools: TechFeature[] = [
    {
      id: 'interactive-lessons',
      title: 'Interactive Lessons',
      icon: Laptop,
      description: 'Engaging multimedia content that brings subjects to life',
    },
    {
      id: 'virtual-labs',
      title: 'Virtual Labs',
      icon: Microscope,
      description: 'Safe, cost-effective science experiments',
    },
    {
      id: 'digital-library',
      title: 'Digital Library',
      icon: BookOpen,
      description: 'Thousands of classical texts at their fingertips',
    },
    {
      id: 'collaboration-tools',
      title: 'Collaboration Tools',
      icon: Users,
      description: 'Connect with classmates for group projects',
    },
  ];

  const metrics: DashboardMetric[] = [
    { label: 'Daily Progress', value: '87%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Mastery Level', value: 'Grade 6.3', icon: Award, color: 'text-blue-600' },
    { label: 'Time Today', value: '3h 24m', icon: Clock, color: 'text-purple-600' },
    { label: 'Lessons Complete', value: '142/180', icon: CheckCircle, color: 'text-amber-600' },
  ];

  const implementation: Array<TechImplementation & { icon: LucideIcon }> = [
    {
      id: 'discussion',
      phase: 'Teacher-Led Discussion',
      description: 'AI-Enhanced Review Sessions',
      duration: 'ongoing',
      icon: Users,
    },
    {
      id: 'essays',
      phase: 'Handwritten Essays',
      description: 'Digital Research Tools',
      duration: 'ongoing',
      icon: BookOpen,
    },
    {
      id: 'seminars',
      phase: 'Socratic Seminars',
      description: 'Virtual Breakout Rooms',
      duration: 'ongoing',
      icon: Brain,
    },
    {
      id: 'manipulatives',
      phase: 'Physical Manipulatives',
      description: 'Interactive Simulations',
      duration: 'ongoing',
      icon: Sparkles,
    },
  ];

  const handleFeatureClick = (index: number) => setActiveFeature(index);

  return {
    activeFeature,
    features,
    tools,
    metrics,
    implementation,
    handleFeatureClick,
    prefersReducedMotion,
  } as const;
};

export type { DashboardMetric };
