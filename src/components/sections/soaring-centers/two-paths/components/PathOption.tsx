'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import type { ExtendedPathOption } from '../hooks/useTwoPaths';

interface PathOptionProps {
  path: ExtendedPathOption;
  isSelected: boolean;
  onSelect: () => void;
  prefersReducedMotion: boolean;
  starPositions: { top: string; left: string; size: number; delay: number }[];
  delay?: number;
}

export function PathOption({
  path,
  isSelected,
  onSelect,
  prefersReducedMotion,
  starPositions,
  delay = 0,
}: PathOptionProps) {
  const Icon = path.icon;
  const starColor = path.id === 'church' ? 'rgba(30, 58, 138, 0.4)' : 'rgba(185, 28, 28, 0.4)';
  const starShadow =
    path.id === 'church'
      ? '0 0 8px rgba(30, 58, 138, 0.6), 0 0 16px rgba(30, 58, 138, 0.3)'
      : '0 0 8px rgba(185, 28, 28, 0.6), 0 0 16px rgba(185, 28, 28, 0.3)';
  const ringColor = path.id === 'church' ? 'ring-blue-900' : 'ring-red-700';
  const focusRing = path.id === 'church' ? 'focus-within:ring-blue-900' : 'focus-within:ring-red-700';
  const borderColor = path.id === 'church' ? 'border-blue-300' : 'border-red-200';
  const bgGradient =
    path.id === 'church'
      ? 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #ffe4e4 50%, #ffcccc 100%)';
  const borderStyle =
    path.id === 'church'
      ? '2px solid rgba(59, 130, 246, 0.2)'
      : '2px solid rgba(239, 68, 68, 0.2)';

  return (
    <AnimatedSection delay={delay}>
      <Card
        className={`h-full cursor-pointer transition-all duration-300 focus-within:ring-4 focus-within:ring-offset-2 ${focusRing} ${isSelected ? `ring-4 ${ringColor} shadow-2xl` : 'hover:shadow-xl'}`}
        style={{ background: bgGradient, border: borderStyle }}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        tabIndex={0}
        role="button"
        aria-pressed={isSelected}
        aria-label={`View ${path.id} partnership details`}
      >
        <CardContent className="p-8 relative">
          {isSelected && !prefersReducedMotion && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                borderRadius: '12px',
                pointerEvents: 'none',
                zIndex: 0,
              }}
              aria-hidden="true"
            >
              {starPositions.map((star, i) => (
                <motion.span
                  key={i}
                  style={{
                    position: 'absolute',
                    top: star.top,
                    left: star.left,
                    fontSize: `${star.size}px`,
                    color: starColor,
                    textShadow: starShadow,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                    filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: 'easeInOut',
                  }}
                >
                  ★
                </motion.span>
              ))}
            </div>
          )}

          <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center mb-6 relative z-10`}>
            <Icon className="w-10 h-10 text-white" aria-hidden="true" />
          </div>

          <h3 className="text-3xl font-bold text-navy mb-2 relative z-10">{path.title}</h3>
          <p className="text-lg text-gray-600 mb-6 relative z-10">{path.description}</p>

          <div className="space-y-3 mb-6 relative z-10" role="list" aria-label={`${path.title} benefits`}>
            {path.features.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                role="listitem"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isSelected ? 1 : 0.7, x: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
              >
                <CheckCircle2
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${path.id === 'church' ? 'text-blue-900' : 'text-red-700'}`}
                  aria-hidden="true"
                />
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className={`p-4 rounded-lg border ${borderColor} relative z-10 ${path.id === 'church' ? 'bg-blue-50' : 'bg-red-50'}`}>
            <p className={`text-sm font-semibold ${path.id === 'church' ? 'text-blue-900' : 'text-red-900'}`}>{path.target}</p>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
