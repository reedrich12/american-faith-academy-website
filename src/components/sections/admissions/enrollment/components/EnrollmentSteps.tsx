'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, CheckCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { EnrollmentStep } from '../types';
import { EnrollmentFAQ } from './EnrollmentFAQ';

interface EnrollmentStepsProps {
  steps: EnrollmentStep[];
  expandedStep: string | null;
  onStepClick: (id: string) => void;
  openApplication: () => void;
  openCalendar: () => void;
  borderColorAnimation: { borderColor: string | string[] };
  prefersReducedMotion: boolean;
}

export function EnrollmentSteps({
  steps,
  expandedStep,
  onStepClick,
  openApplication,
  openCalendar,
  borderColorAnimation,
  prefersReducedMotion,
}: EnrollmentStepsProps) {
  return (
    <div>
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <AnimatedSection key={step.id} delay={index * 0.15}>
              <li className="relative" role="listitem">
                <motion.div
                  className="w-12 h-12 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileInView={borderColorAnimation}
                  transition={prefersReducedMotion ? {} : { duration: 2, times: [0, 0.3, 0.6, 1], delay: index * 0.15 }}
                  viewport={{ once: true }}
                  role="presentation"
                >
                  <span className="font-bold text-navy" aria-label={`Step ${step.id}`}>
                    {step.id}
                  </span>
                </motion.div>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white h-full focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-navy" aria-hidden="true" />
                      </div>
                      {step.status && (
                        <span className="text-xs font-semibold text-patriot bg-patriot-50 px-2 py-1 rounded-full">
                          {step.status}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{step.duration}</p>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2 mb-4" role="list">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600" role="listitem">
                          <div className="w-1.5 h-1.5 bg-patriot rounded-full mt-1.5 mr-2 flex-shrink-0" aria-hidden="true" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    {step.cta ? (
                      <Button
                        className={`w-full ${
                          step.cta.primary
                            ? 'bg-patriot hover:bg-patriot-600 text-white'
                            : 'bg-white border-2 border-navy text-navy hover:bg-navy hover:text-white'
                        } focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500`}
                        onClick={step.cta.action}
                        aria-label={`${step.cta.text} for step ${step.id}: ${step.title}`}
                      >
                        {step.cta.text}
                      </Button>
                    ) : (
                      <button
                        onClick={() => onStepClick(step.id)}
                        className="w-full text-navy hover:text-patriot font-medium text-sm flex items-center justify-center space-x-1 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-navy rounded-md p-2"
                        aria-expanded={expandedStep === step.id}
                        aria-controls={`step-${step.id}-details`}
                        aria-label={`Learn more about step ${step.id}: ${step.title}`}
                      >
                        <span>Learn More</span>
                        <motion.div animate={{ rotate: expandedStep === step.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="w-4 h-4" aria-hidden="true" />
                        </motion.div>
                      </button>
                    )}
                  </CardContent>
                </Card>
                <AnimatePresence>
                  {expandedStep === step.id && (
                    <motion.div
                      id={`step-${step.id}-details`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                      role="region"
                      aria-label={`Additional details for step ${step.id}`}
                    >
                      <Card className="border-2 border-navy-100">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-navy mb-3">Requirements:</h4>
                          <ul className="space-y-1 mb-4" role="list">
                            {step.expandedContent.requirements.map((req, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start" role="listitem">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                {req}
                              </li>
                            ))}
                          </ul>
                          <h4 className="font-semibold text-navy mb-3">Frequently Asked Questions:</h4>
                          <EnrollmentFAQ faqs={step.expandedContent.faqs} compact />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </AnimatedSection>
          );
        })}
      </ol>

      <AnimatedSection delay={0.6} className="text-center mt-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-3xl mx-auto" role="region" aria-labelledby="bottom-cta-heading">
          <h3 id="bottom-cta-heading" className="font-serif text-2xl font-bold text-navy mb-4">
            Join 1,000+ Families Who've Completed This Process
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Questions about enrollment? Our team is here to help every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500"
              onClick={openApplication}
              aria-label="Start your application - opens application form"
            >
              Start Your Application
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-navy"
              onClick={openCalendar}
              aria-label="Schedule a consultation with our admissions team"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
