'use client';

import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { CurriculumLevelSelector } from './components/CurriculumLevelSelector';
import { CurriculumLevelCard } from './components/CurriculumLevelCard';
import { CurriculumDetails } from './components/CurriculumDetails';
import { useCurriculumByLevel } from './hooks/useCurriculumByLevel';

export default function CurriculumByLevelSection() {
  const { levels, selectedLevel, subjects, handleLevelSelect } = useCurriculumByLevel();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="curriculum-levels-heading">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 id="curriculum-levels-heading" className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Curriculum by Grade Level
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our classical curriculum progresses through the natural stages of learning, from wonder and discovery to
            mastery and rhetoric.
          </p>
        </AnimatedSection>

        <CurriculumLevelSelector levels={levels} selected={selectedLevel} onSelect={handleLevelSelect} />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLevel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="tabpanel"
            id={`tabpanel-${selectedLevel.id}`}
            aria-labelledby={`tab-${selectedLevel.id}`}
          >
            <CurriculumLevelCard level={selectedLevel} />
            <CurriculumDetails subjects={subjects} levelColor={selectedLevel.color} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
