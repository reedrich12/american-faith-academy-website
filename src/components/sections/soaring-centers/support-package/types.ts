import { LucideIcon } from 'lucide-react';

export interface SupportPackage {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export interface SupportFeature {
  id: string;
  name: string;
  packages: string[];
}

export interface SupportPillar extends SupportPackage {
  subtitle: string;
  highlights: string[];
  details: {
    included: string[];
    additional: string[];
  };
}

export interface SupportIconFeature {
  id: string;
  name: string;
  icon: LucideIcon;
}
