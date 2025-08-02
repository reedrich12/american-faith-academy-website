'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { MarketForce, ValidationMetric } from '../types';

interface Props {
  marketForces: MarketForce[];
  validationMetrics: ValidationMetric[];
  prefersReducedMotion: boolean;
}

export const MarketProjections = ({ marketForces, validationMetrics, prefersReducedMotion }: Props) => {
  return (
    <>
      <AnimatedSection delay={0.3}>
        <div
          className="relative bg-transparent backdrop-blur-md rounded-2xl p-8 lg:p-12 mb-16 overflow-hidden border-2 border-white/80"
          style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)' }}
        >
          <h3
            className="text-3xl font-bold text-center mb-12 relative z-10 text-white"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
          >
            Market Forces Working in Your Favor
          </h3>
          <div
            className="flex justify-between items-start gap-2 md:gap-4 lg:gap-8 relative z-10 overflow-x-auto"
            role="list"
            aria-label="Market forces"
          >
            {marketForces.map((force, index) => {
              const Icon = force.icon;
              return (
                <motion.div
                  key={index}
                  role="listitem"
                  className="flex-1 min-w-[120px] md:min-w-[150px] text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 border-2 border-white/60"
                    style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)' }}
                  >
                    <Icon
                      className="w-8 h-8 text-white"
                      style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))' }}
                      aria-hidden="true"
                    />
                  </div>
                  <h4
                    className="font-semibold text-sm md:text-lg mb-1 md:mb-2 px-1 text-white"
                    style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}
                  >
                    {force.title}
                  </h4>
                  <p
                    className="text-xs md:text-sm px-1 md:px-2"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    {force.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <div
          className="relative bg-transparent backdrop-blur-md rounded-2xl p-8 lg:p-12 mt-16 overflow-hidden border-2 border-white/80"
          style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)' }}
        >
          <h3
            className="text-3xl font-bold text-center mb-8 relative z-10 text-white"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
          >
            Proven Market Demand
          </h3>
          <div
            className="flex justify-between items-start gap-2 md:gap-4 lg:gap-8 overflow-x-auto relative z-10"
            role="list"
            aria-label="Market validation metrics"
          >
            {validationMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  role="listitem"
                  className="flex-1 min-w-[140px] md:min-w-[180px] text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/60"
                    style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)' }}
                  >
                    <Icon
                      className="w-8 h-8 text-white"
                      style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))' }}
                      aria-hidden="true"
                    />
                  </div>
                  <h4
                    className="font-semibold text-lg mb-2 text-white"
                    style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}
                  >
                    {metric.title}
                  </h4>
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};
