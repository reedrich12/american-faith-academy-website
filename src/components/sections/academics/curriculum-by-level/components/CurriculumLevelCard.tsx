'use client';

import { CurriculumLevel } from '../types';

interface CurriculumLevelCardProps {
  level: CurriculumLevel;
}

export function CurriculumLevelCard({ level }: CurriculumLevelCardProps) {
  return (
    <div className={`${level.bgColor} rounded-2xl p-8 mb-8 text-center`}>
      <h3 className="font-serif text-3xl font-bold text-navy mb-2">
        Grades {level.grades}: {level.name}
      </h3>
      <p className="text-lg text-gray-600">{level.description}</p>
    </div>
  );
}
