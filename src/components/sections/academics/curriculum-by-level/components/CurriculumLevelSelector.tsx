'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks';
import { CurriculumLevel } from '../types';

interface CurriculumLevelSelectorProps {
  levels: CurriculumLevel[];
  selected: CurriculumLevel;
  onSelect: (id: string) => void;
}

export function CurriculumLevelSelector({ levels, selected, onSelect }: CurriculumLevelSelectorProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12" role="tablist" aria-label="Grade level selection">
      {levels.map((level) => {
        const Icon = level.icon;
        const active = selected.id === level.id;
        return (
          <motion.button
            key={level.id}
            onClick={() => onSelect(level.id)}
            className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
              active
                ? `bg-gradient-to-r ${level.color} text-white shadow-lg scale-105`
                : 'bg-white text-gray-700 hover:shadow-md border-2 border-gray-200'
            }`}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            role="tab"
            aria-selected={active}
            aria-controls={`tabpanel-${level.id}`}
            id={`tab-${level.id}`}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-lg">{level.grades}</span>
            </div>
            <div className="text-sm font-normal mt-1">{level.name}</div>
          </motion.button>
        );
      })}
    </div>
  );
}
