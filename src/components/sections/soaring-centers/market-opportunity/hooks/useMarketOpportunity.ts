'use client';

import { useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  TrendingUp,
  Users,
  DollarSign,
  MapPin,
  Home,
  Building2,
  BookOpen,
  GraduationCap,
  BarChart3,
  Target
} from 'lucide-react';
import {
  MarketStat,
  MarketForce,
  ValidationMetric,
  ScenarioType,
} from '../types';

interface ROICalculation {
  actualStudents: number;
  annualRevenue: number;
  netIncome: number;
  monthlyIncome: number;
  breakEvenMonth: number;
}

export function useMarketOpportunity() {
  const [students, setStudents] = useState(60);
  const [tuition, setTuition] = useState(5500);
  const [scenario, setScenario] = useState<ScenarioType>('conservative');
  const prefersReducedMotion = usePrefersReducedMotion();

  const statistics: MarketStat[] = [
    {
      id: 'homeschool-growth',
      icon: TrendingUp,
      value: '300%',
      label: 'Homeschool Growth',
      subtext: 'in the last 5 years',
      color: 'text-emerald-600',
      hasStars: true,
    },
    {
      id: 'homeschooled-students',
      icon: Users,
      value: '3.7M',
      label: 'Homeschooled Students',
      subtext: 'and growing rapidly',
      color: 'text-blue-600',
      hasStars: true,
      hasStripes: false,
    },
    {
      id: 'esa-funding',
      icon: DollarSign,
      value: '$16B',
      label: 'ESA Funding Available',
      subtext: 'across 32 states',
      color: 'text-purple-600',
      hasStars: true,
    },
    {
      id: 'underserved',
      icon: MapPin,
      value: '87%',
      label: 'Communities Underserved',
      subtext: 'lacking quality options',
      color: 'text-orange-600',
      hasStars: true,
      hasStripes: false,
    },
  ];

  const marketForces: MarketForce[] = [
    {
      icon: Home,
      title: 'Remote Work Revolution',
      description: 'More families seeking flexible education options',
    },
    {
      icon: Building2,
      title: 'School Choice Expansion',
      description: 'ESA programs making private education accessible',
    },
    {
      icon: BookOpen,
      title: 'Classical Renaissance',
      description: 'Growing demand for time-tested education methods',
    },
    {
      icon: GraduationCap,
      title: 'Hybrid Model Appeal',
      description: 'Families want community without full-time commitment',
    },
  ];

  const validationMetrics: ValidationMetric[] = [
    {
      icon: BarChart3,
      title: 'Existing Centers Thriving',
      description: 'Average 85% capacity within first year',
    },
    {
      icon: Target,
      title: 'High Parent Satisfaction',
      description: '92% retention rate year-over-year',
    },
    {
      icon: MapPin,
      title: 'Geographic Opportunity',
      description: 'Less than 13% market penetration nationally',
    },
  ];

  const calculateROI = (): ROICalculation => {
    const enrollmentRate = scenario === 'conservative' ? 0.85 : 0.95;
    const actualStudents = Math.floor(students * enrollmentRate);
    const annualRevenue = actualStudents * tuition;
    const operatingMargin = scenario === 'conservative' ? 0.35 : 0.45;
    const netIncome = annualRevenue * operatingMargin;
    const monthlyIncome = netIncome / 12;

    return {
      actualStudents,
      annualRevenue,
      netIncome,
      monthlyIncome,
      breakEvenMonth: scenario === 'conservative' ? 8 : 6,
    };
  };

  const roi = calculateROI();

  const handleCTAClick = () => {
    console.log('CTA clicked');
  };

  return {
    statistics,
    marketForces,
    validationMetrics,
    students,
    setStudents,
    tuition,
    setTuition,
    scenario,
    setScenario,
    roi,
    prefersReducedMotion,
    handleCTAClick,
  };
}

export type UseMarketOpportunityReturn = ReturnType<typeof useMarketOpportunity>;
