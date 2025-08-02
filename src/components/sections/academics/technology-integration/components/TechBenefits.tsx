import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/ui/animated-section';
import { Calendar, Sparkles, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DashboardMetric } from '../hooks/useTechnologyIntegration';

interface TechBenefitsProps {
  metrics: DashboardMetric[];
  prefersReducedMotion: boolean;
}

export function TechBenefits({ metrics, prefersReducedMotion }: TechBenefitsProps) {
  return (
    <AnimatedSection delay={0.6} className="mb-20">
      <div className="max-w-6xl mx-auto">
        <h3 className="font-serif text-3xl font-bold text-navy text-center mb-12">
          Stay Connected to Your Child's Journey
        </h3>

        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-navy-600 to-patriot-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-bold">Parent Dashboard</h4>
                <p className="opacity-90">Real-time insights into Emily's progress</p>
              </div>
              <Calendar className="w-8 h-8 opacity-75" aria-hidden="true" />
            </div>
          </div>

          <CardContent className="p-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" role="list" aria-label="Student metrics">
              {metrics.map((metric, index) => {
                const MetricIcon = metric.icon as LucideIcon;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: index * 0.1 }
                    }
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                    role="listitem"
                  >
                    <MetricIcon
                      className={`w-8 h-8 ${metric.color} mx-auto mb-2`}
                      aria-hidden="true"
                    />
                    <p className="text-2xl font-bold text-navy">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
              <h5 className="font-semibold text-lg text-navy mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-green-600 mr-2" aria-hidden="true" />
                Today's Highlights
              </h5>
              <ul className="space-y-3" role="list" aria-label="Today's achievements">
                <li className="flex items-center space-x-3" role="listitem">
                  <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                  <span className="text-gray-700">Mastered fractions in Math</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                  <span className="text-gray-700">Completed Julius Caesar reading</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                  <span className="text-gray-700">Submitted Rome history essay</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
