'use client';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import type { useGettingStarted } from '@/hooks/useGettingStarted';

interface Props {
  data: ReturnType<typeof useGettingStarted>;
}

const GettingStartedSteps = ({ data }: Props) => {
  const { selectedModel, setSelectedModel, partnershipModels, prefersReducedMotion } = data;

  return (
    <AnimatedSection delay={0.3}>
      <motion.h3
        className="text-3xl font-bold text-center mb-12 text-white"
        style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
      >
        Choose Your Partnership Model
      </motion.h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Partnership model options">
        {partnershipModels.map((model, index) => {
          const ModelIcon = model.icon;
          return (
            <motion.div
              key={model.id}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full cursor-pointer transition-all duration-300 backdrop-blur-md bg-transparent border-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 focus-within:ring-offset-transparent ${
                  selectedModel === model.id ? 'ring-4 ring-red-500 shadow-xl border-red-500/50' : 'hover:shadow-lg border-white/80'
                }`}
                style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)' }}
                onClick={() => setSelectedModel(model.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedModel(model.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={selectedModel === model.id}
                aria-label={`${model.title} partnership model`}
              >
                <CardContent className="p-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(to right, #ef4444, #dc2626)',
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)'
                    }}
                  >
                    <ModelIcon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}>
                    {model.title}
                  </h4>
                  <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {model.description}
                  </p>
                  <div className="space-y-2 mb-4" role="list">
                    {model.benefits.map((benefit, idx) => (
                      <div key={idx} role="listitem" className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 text-red-500" aria-hidden="true" />
                        <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <strong className="text-white" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>Best for:</strong>{' '}
                      {model.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
};

export default GettingStartedSteps;
