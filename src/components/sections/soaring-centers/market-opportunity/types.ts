import { LucideIcon } from 'lucide-react';

export interface MarketStatistic {
  id: string;
  label: string;
  value: string | number;
  change?: number;
}

export interface MarketProjection {
  year: number;
  value: number;
  growth: number;
}

// Extended interfaces used internally
export interface MarketStat extends MarketStatistic {
  icon: LucideIcon;
  subtext: string;
  color: string;
  hasStars: boolean;
  hasStripes?: boolean;
}

export interface MarketForce {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ValidationMetric {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type ScenarioType = 'conservative' | 'optimistic';
