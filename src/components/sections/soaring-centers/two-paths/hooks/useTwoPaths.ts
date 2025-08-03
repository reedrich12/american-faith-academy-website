import { useState, useMemo } from 'react';
import { Church, Briefcase, Users, Target, Heart, TrendingUp, LucideIcon } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { PathOption, PathComparison } from '../types';

interface ExtendedPathOption extends PathOption {
  icon: LucideIcon;
  color: string;
}

interface ExtendedPathComparison extends PathComparison {
  icon: LucideIcon;
}

export const useTwoPaths = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const paths: ExtendedPathOption[] = [
    {
      id: 'church',
      title: 'Education as Mission',
      description: "Your Church's Greatest Opportunity",
      features: [
        "Extend your church's mission to weekday education",
        "Serve families in your congregation and community",
        "Generate sustainable revenue for ministry expansion",
        "Build deeper family relationships",
        "Create a lasting legacy of faith and learning",
      ],
      target: 'Transform your existing facilities into a thriving educational ministry that impacts generations.',
      icon: Church,
      color: 'from-blue-900 to-blue-950',
    },
    {
      id: 'edupreneur',
      title: 'Purpose-Driven Business',
      description: 'Make a Difference While Making a Living',
      features: [
        'Build a profitable business with eternal impact',
        'Be your own boss while serving families',
        'Tap into the growing education market',
        'Create flexible work-life balance',
        'Join a network of like-minded entrepreneurs',
      ],
      target: 'Launch a successful education business that changes lives while providing financial freedom.',
      icon: Briefcase,
      color: 'from-red-700 to-red-800',
    },
  ];

  const comparison: ExtendedPathComparison[] = [
    { feature: 'Serve 40-80 families in your community', path1: true, path2: true, icon: Users },
    { feature: 'Deliver excellence in classical Christian education', path1: true, path2: true, icon: Target },
    { feature: 'Make kingdom impact through education', path1: true, path2: true, icon: Heart },
    { feature: 'Build a sustainable, growing enterprise', path1: true, path2: true, icon: TrendingUp },
  ];

  const starPositions = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        top: `${(i * 37 + (i % 3) * 13) % 90 + 5}%`,
        left: `${(i * 29 + (i % 5) * 7) % 90 + 5}%`,
        size: i % 5 === 0 ? 30 : i % 3 === 0 ? 18 : 24,
        delay: (i % 4) * 0.5,
      })),
    []
  );

  const handlePathSelect = (id: string) => setSelectedPath(id);

  return { paths, selectedPath, comparison, handlePathSelect, prefersReducedMotion, starPositions };
};

export type { ExtendedPathOption, ExtendedPathComparison };
