'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import type { ExtendedPathComparison } from '../hooks/useTwoPaths';

interface PathComparisonProps {
  data: ExtendedPathComparison[];
  prefersReducedMotion: boolean;
}

export function PathComparison({ data, prefersReducedMotion }: PathComparisonProps) {
  return (
    <AnimatedSection delay={0.3}>
      <div
        className="bg-transparent backdrop-blur-md rounded-2xl p-8 lg:p-12 border-2 border-white/80"
        style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)' }}
      >
        <motion.h3
          className="text-3xl font-bold text-center mb-8"
          style={{ color: 'white', textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
        >
          Shared Outcomes for Both Paths
        </motion.h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white">Feature</th>
                <th className="px-4 py-2 text-center text-white">Church</th>
                <th className="px-4 py-2 text-center text-white">Edupreneur</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.tr
                    key={item.feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                        <span className="text-white">{item.feature}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.path1 === true ? (
                        <CheckCircle2 className="w-5 h-5 text-white mx-auto" aria-hidden="true" />
                      ) : (
                        <span className="text-white">{item.path1}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.path2 === true ? (
                        <CheckCircle2 className="w-5 h-5 text-white mx-auto" aria-hidden="true" />
                      ) : (
                        <span className="text-white">{item.path2}</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AnimatedSection>
  );
}
