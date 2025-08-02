'use client';

import { Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import FormModal from '@/components/ui/form-modal';
import CalendarModal from '@/components/ui/calendar-modal';
import { EnrollmentTimeline } from './components/EnrollmentTimeline';
import { EnrollmentSteps } from './components/EnrollmentSteps';
import { EnrollmentFAQ } from './components/EnrollmentFAQ';
import { useEnrollmentProcess } from './hooks/useEnrollmentProcess';

export default function EnrollmentProcessSection() {
  const {
    steps,
    currentStep,
    faqs,
    expandedStep,
    handleStepClick,
    isApplicationOpen,
    openApplication,
    closeApplication,
    isCalendarOpen,
    openCalendar,
    closeCalendar,
    borderColorAnimation,
    prefersReducedMotion,
  } = useEnrollmentProcess();

  return (
    <section id="enrollment" className="py-20 bg-gray-50" aria-labelledby="enrollment-heading">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 id="enrollment-heading" className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Simple 4-Step Enrollment Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            From application to first day - we guide you through every step
          </p>
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <Clock className="w-5 h-5 text-patriot mr-2" aria-hidden="true" />
            <span className="text-gray-700 font-medium">Complete in 3-6 weeks</span>
          </div>
        </AnimatedSection>

        <EnrollmentTimeline steps={steps} currentStep={currentStep} prefersReducedMotion={prefersReducedMotion} />

        <EnrollmentSteps
          steps={steps}
          expandedStep={expandedStep}
          onStepClick={handleStepClick}
          openApplication={openApplication}
          openCalendar={openCalendar}
          borderColorAnimation={borderColorAnimation}
          prefersReducedMotion={prefersReducedMotion}
        />

        <EnrollmentFAQ faqs={faqs} />
      </div>

      <FormModal
        isOpen={isApplicationOpen}
        onClose={closeApplication}
        formId="ZA1Leng5sS8fX1f5nkuU"
        formHeight="1165px"
        formTitle="Admissions Application"
      />

      <CalendarModal isOpen={isCalendarOpen} onClose={closeCalendar} />
    </section>
  );
}
