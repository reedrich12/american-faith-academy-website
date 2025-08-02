import type { LucideIcon } from 'lucide-react';

export interface TechFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TechBenefit {
  id: string;
  benefit: string;
  impact: string;
}

export interface TechImplementation {
  id: string;
  phase: string;
  description: string;
  duration: string;
}
