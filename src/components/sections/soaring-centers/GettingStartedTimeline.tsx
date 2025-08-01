'use client';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import CalendarModal from '@/components/ui/calendar-modal';
import { CheckCircle, Target, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import type { useGettingStarted } from '@/hooks/useGettingStarted';

interface Props {
  data: ReturnType<typeof useGettingStarted>;
}

const GettingStartedTimeline = ({ data }: Props) => {
  const {
    activeStep,
    setActiveStep,
    isCalendarOpen,
    setIsCalendarOpen,
    prefersReducedMotion,
    steps,
    handleStepKeyDown
  } = data;

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <AnimatedSection>
      {/* Timeline Visual */}
      <div className="mb-16">
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-0 h-1 -translate-y-1/2"
              style={{
                background:
                  activeStep === 4
                    ? 'linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 80%, #ef4444 80%, #dc2626 100%)'
                    : 'rgba(255, 255, 255, 0.6)',
                boxShadow:
                  activeStep === 4 ? '0 0 10px rgba(239, 68, 68, 0.6)' : '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
            />

            {/* Steps */}
            <div className="relative flex justify-between" role="list" aria-label="Getting started steps">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    role="listitem"
                    className="flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent rounded-lg p-2"
                    onClick={() => handleStepClick(index)}
                    onKeyDown={(e) => handleStepKeyDown(e, index)}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    tabIndex={0}
                    aria-label={`Step ${step.id}: ${step.title} - ${step.duration}`}
                    aria-current={index === activeStep ? 'step' : undefined}
                  >
                    <motion.div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                        index <= activeStep && index < 4 ? 'bg-transparent border-2 border-white/60' : ''
                      }`}
                      style={{
                        background:
                          index === 4 && index <= activeStep
                            ? 'linear-gradient(to right, #ef4444, #dc2626)'
                            : index < 4 && index <= activeStep
                              ? 'transparent'
                              : '#e5e7eb',
                        boxShadow:
                          index <= activeStep
                            ? index === 4
                              ? '0 0 10px rgba(239, 68, 68, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)'
                              : '0 0 10px rgba(255, 255, 255, 0.3)'
                            : 'none',
                        backdropFilter: index < 4 && index <= activeStep ? 'blur(5px)' : 'none'
                      }}
                      animate={prefersReducedMotion ? {} : index === activeStep ? { scale: [1, 1.1, 1] } : {}}
                      transition={prefersReducedMotion ? {} : { duration: 0.5, repeat: index === activeStep ? Infinity : 0, repeatDelay: 2 }}
                    >
                      <Icon
                        className={`w-10 h-10 ${index <= activeStep ? 'text-white' : 'text-gray-500'}`}
                        style={index <= activeStep ? { filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' } : {}}
                        aria-hidden="true"
                      />
                    </motion.div>
                    <h4
                      className={`font-semibold text-center`}
                      style={{
                        color: index <= activeStep ? (index === 4 ? '#ef4444' : 'white') : '#6b7280',
                        textShadow:
                          index <= activeStep
                            ? index === 4
                              ? '0 0 8px rgba(239, 68, 68, 0.4)'
                              : '0 0 5px rgba(255, 255, 255, 0.3)'
                            : 'none'
                      }}
                    >
                      {step.title}
                    </h4>
                    <p
                      className="text-sm mt-1"
                      style={{
                        color: index <= activeStep ? (index === 4 ? '#fca5a5' : 'rgba(255, 255, 255, 0.8)') : '#9ca3af'
                      }}
                    >
                      {step.duration}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-4" role="list" aria-label="Getting started steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                role="listitem"
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent ${
                  index === activeStep && index < 4 ? 'backdrop-blur-sm border-2 border-white/60' : ''
                }`}
                style={{
                  background:
                    index === activeStep
                      ? index === 4
                        ? 'linear-gradient(to right, #ef4444, #dc2626)'
                        : 'rgba(255, 255, 255, 0.1)'
                      : '#f3f4f6',
                  boxShadow:
                    index === activeStep
                      ? index === 4
                        ? '0 0 10px rgba(239, 68, 68, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)'
                        : '0 0 10px rgba(255, 255, 255, 0.3)'
                      : 'none'
                }}
                onClick={() => handleStepClick(index)}
                onKeyDown={(e) => handleStepKeyDown(e, index)}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                tabIndex={0}
                aria-current={index === activeStep ? 'step' : undefined}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === activeStep ? 'bg-white/20' : 'bg-white'
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${index === activeStep ? 'text-white' : 'text-gray-500'}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index === activeStep && (
                  <div className="ml-4 text-gray-500">
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Step Details */}
        <Card className="mt-8 bg-white/20 backdrop-blur-md border border-white/30 text-white">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              {(() => {
                const ActiveIcon = steps[activeStep].icon;
                return <ActiveIcon className="w-6 h-6" aria-hidden="true" />;
              })()}
              <h3 className="text-2xl font-semibold">Step {steps[activeStep].id}: {steps[activeStep].title}</h3>
            </div>
            <p>{steps[activeStep].description}</p>
            {steps[activeStep].details && (
              <div className="space-y-2" role="list">
                {steps[activeStep].details!.map((detail, index) => (
                  <div key={index} role="listitem" className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 text-red-500" aria-hidden="true" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}
            {steps[activeStep].milestones && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
                {steps[activeStep].milestones!.map((milestone, index) => {
                  const MIcon = milestone.icon;
                  return (
                    <div key={index} role="listitem" className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <MIcon className="w-4 h-4 text-patriot" aria-hidden="true" />
                        <span className="font-semibold text-sm text-navy">Week {milestone.week}</span>
                      </div>
                      <p className="text-sm text-gray-700">{milestone.task}</p>
                    </div>
                  );
                })}
              </div>
            )}
            {steps[activeStep].metrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list">
                {steps[activeStep].metrics!.map((metric, index) => (
                  <div
                    key={index}
                    role="listitem"
                    className="text-center p-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/20"
                  >
                    <Sparkles className="w-6 h-6 mx-auto mb-2" aria-hidden="true" />
                    <p className="text-sm font-medium">{metric}</p>
                  </div>
                ))}
              </div>
            )}
            {steps[activeStep].deliverable && (
              <div className="bg-transparent backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-white/20">
                <Target className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span>
                  <strong>Deliverable:</strong> {steps[activeStep].deliverable}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Calendar Modal */}
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </AnimatedSection>
  );
};

export default GettingStartedTimeline;
