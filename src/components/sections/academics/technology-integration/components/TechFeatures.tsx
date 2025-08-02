import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/ui/animated-section';
import { CheckCircle } from 'lucide-react';
import type { TechFeature } from '../types';

interface TechFeaturesProps {
  features: Array<TechFeature & { details: string[]; color: string }>;
  tools: TechFeature[];
  activeFeature: number;
  onFeatureClick: (index: number) => void;
  prefersReducedMotion: boolean;
}

export function TechFeatures({
  features,
  tools,
  activeFeature,
  onFeatureClick,
  prefersReducedMotion,
}: TechFeaturesProps) {
  return (
    <>
      {/* Adaptive Learning Features */}
      <AnimatedSection delay={0.2} className="mb-20">
        <h3 className="font-serif text-3xl font-bold text-navy text-center mb-12">
          How Technology Adapts to Your Child
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Feature Selector */}
          <div className="space-y-4" role="list" aria-label="Adaptive learning features">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.5, delay: index * 0.1 }
                  }
                  viewport={{ once: true }}
                  role="listitem"
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      activeFeature === index
                        ? 'shadow-xl border-2 border-patriot'
                        : 'hover:shadow-lg border border-gray-200'
                    } focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy`}
                    onClick={() => onFeatureClick(index)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onFeatureClick(index);
                      }
                    }}
                    role="button"
                    aria-pressed={activeFeature === index}
                    aria-label={`${feature.title}: ${feature.description}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center`}
                          whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                        >
                          <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-navy">{feature.title}</h4>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                        {activeFeature === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-patriot rounded-full"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Feature Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8"
              role="region"
              aria-live="polite"
              aria-label="Feature details"
            >
              <div
                className={`w-20 h-20 bg-gradient-to-br ${features[activeFeature].color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
              >
                {(() => {
                  const ActiveIcon = features[activeFeature].icon;
                  return <ActiveIcon className="w-10 h-10 text-white" aria-hidden="true" />;
                })()}
              </div>
              <h4 className="font-serif text-2xl font-bold text-navy text-center mb-6">
                {features[activeFeature].title}
              </h4>
              <ul className="space-y-3" role="list">
                {features[activeFeature].details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.1 }}
                    className="flex items-start space-x-3"
                    role="listitem"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatedSection>

      {/* Technology Tools Grid */}
      <AnimatedSection delay={0.4} className="mb-20">
        <div className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-3xl p-8 md:p-12">
          <h3 className="font-serif text-3xl font-bold text-navy text-center mb-12">
            Tools That Enhance Classical Learning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Technology tools">
            {tools.map((tool, index) => {
              const ToolIcon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.5, delay: index * 0.1 }
                  }
                  viewport={{ once: true }}
                  role="listitem"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white transform hover:scale-105 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                      >
                        <ToolIcon className="w-8 h-8 text-white" aria-hidden="true" />
                      </motion.div>
                      <h4 className="font-semibold text-lg text-navy mb-2">{tool.title}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
