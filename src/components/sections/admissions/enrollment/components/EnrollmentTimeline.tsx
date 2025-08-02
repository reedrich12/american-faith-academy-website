'use client';

import { motion } from 'framer-motion';
import { EnrollmentStep } from '../types';

interface EnrollmentTimelineProps {
  steps: EnrollmentStep[];
  currentStep: string;
  prefersReducedMotion: boolean;
}

export function EnrollmentTimeline({ steps, currentStep, prefersReducedMotion }: EnrollmentTimelineProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="hidden lg:block relative max-w-6xl mx-auto mb-16" role="region" aria-label="Enrollment process timeline">
      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-navy-500 to-patriot-500"
          initial={{ width: '0%' }}
          whileInView={{ width: `${progress}%` }}
          transition={prefersReducedMotion ? {} : { duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
      <ol className="grid grid-cols-4 gap-8 relative" role="list">
        {steps.map((step) => (
          <li key={step.id} className="text-center" role="listitem">
            <div className="w-12 h-12 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold text-navy">{step.id}</span>
            </div>
            <p className="text-sm font-medium text-gray-700">{step.title}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
