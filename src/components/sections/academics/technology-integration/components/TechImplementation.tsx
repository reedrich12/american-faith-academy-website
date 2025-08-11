import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/ui/animated-section';
import { Shield } from 'lucide-react';
import type { TechImplementation } from '../types';

interface TechImplementationProps {
  steps: Array<TechImplementation & { icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }>;
  prefersReducedMotion: boolean;
}

export function TechImplementation({ steps, prefersReducedMotion }: TechImplementationProps) {
  return (
    <>
      {/* Classical + Technology Balance */}
      <AnimatedSection delay={0.8} className="mb-16">
        <Card className="max-w-5xl mx-auto border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-8 md:p-12">
            <h3 className="font-serif text-3xl font-bold text-navy text-center mb-4">
              Technology Supports, Never Replaces
            </h3>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We thoughtfully blend time-tested classical methods with modern tools,
              ensuring technology enhances rather than dominates the learning experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list" aria-label="Classical and technology balance">
              {steps.map((item, index) => {
                const BalanceIcon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: index * 0.1 }
                    }
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                    role="listitem"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BalanceIcon className="w-6 h-6 text-navy" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy">{item.phase}</p>
                      <p className="text-sm text-gray-600">Enhanced by: {item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-navy mb-2">Parent Controls & Safety</h4>
                  <p className="text-gray-700">
                    Full visibility and control over your child's online experience. Safe,
                    monitored, and age-appropriate at every step.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

    </>
  );
}
