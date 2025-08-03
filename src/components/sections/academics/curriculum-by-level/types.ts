import { LucideIcon } from 'lucide-react';

export interface CurriculumSubject {
  id: string;
  name: string;
  topics: string[];
  description: string;
  icon: LucideIcon;
  pacing: 'Student-Paced' | 'School-Paced';
}

export interface CurriculumLevel {
  id: string;
  name: string;
  grades: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
  subjects: CurriculumSubject[];
}
