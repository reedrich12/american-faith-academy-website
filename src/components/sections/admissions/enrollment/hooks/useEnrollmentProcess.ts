'use client';

import { useState } from 'react';
import { Monitor, FileText, DollarSign, CheckCircle } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks';
import { EnrollmentStep, EnrollmentFAQ } from '../types';

export function useEnrollmentProcess() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const openApplication = () => setIsApplicationOpen(true);
  const closeApplication = () => setIsApplicationOpen(false);
  const openCalendar = () => setIsCalendarOpen(true);
  const closeCalendar = () => setIsCalendarOpen(false);

  const handleStepClick = (id: string) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  const steps: EnrollmentStep[] = [
    {
      id: '1',
      title: 'Apply Online',
      description: 'Complete our simple online application',
      duration: '15-20 minutes',
      icon: Monitor,
      status: 'Start here',
      completed: false,
      details: [
        'Complete simple online application',
        'Provide basic family and student information',
        'No commitment required',
      ],
      expandedContent: {
        requirements: [
          "Student's basic information (name, date of birth, grade)",
          'Parent/guardian contact information',
          'Current or previous school information (optional)',
        ],
        faqs: [
          {
            question: 'Is there an application fee?',
            answer: 'No, our application is completely free with no obligation.',
          },
          {
            question: 'What if I need to pause and come back?',
            answer: 'Your progress is saved automatically. You can return anytime.',
          },
        ],
      },
      cta: {
        text: 'Start Application',
        primary: true,
        action: openApplication,
      },
    },
    {
      id: '2',
      title: 'Submit Documents & Assessment',
      description: 'Upload records and complete assessment',
      duration: '3 days processing',
      icon: FileText,
      completed: false,
      details: [
        'Upload previous academic records',
        'Complete student assessment',
        'Our team reviews and provides feedback',
      ],
      expandedContent: {
        requirements: [
          "Previous year's report card or transcript",
          'Any IEP or 504 documentation (if applicable)',
          'Immunization records (for in-person programs)',
        ],
        faqs: [
          {
            question: "What if I don't have all documents?",
            answer:
              'We can work with you to gather necessary information. Start with what you have.',
          },
          {
            question: 'How long is the assessment?',
            answer:
              "The placement assessment takes 30-45 minutes and helps us understand your child's learning level.",
          },
        ],
      },
    },
    {
      id: '3',
      title: 'Secure Funding',
      description: 'We guide you through funding options',
      duration: '2-4 weeks',
      icon: DollarSign,
      completed: false,
      details: [
        'Work with AFA team for ESA funding',
        'Explore SGO partner options',
        'Finalize payment arrangements',
      ],
      expandedContent: {
        requirements: [
          'State residency verification',
          'Household income information (for some programs)',
          "Previous year's tax return (for income-based programs)",
        ],
        faqs: [
          {
            question: "What if I don't qualify for ESA?",
            answer:
              'We offer multiple funding options including payment plans and partner scholarships.',
          },
          {
            question: 'How long does ESA approval take?',
            answer:
              "Typically 2-4 weeks, varying by state. We'll guide you through the entire process.",
          },
        ],
      },
    },
    {
      id: '4',
      title: 'Enrollment Confirmation',
      description: 'Finalize enrollment and get started',
      duration: '1 week to complete',
      icon: CheckCircle,
      status: 'Welcome to AFA!',
      completed: false,
      details: [
        'Review and sign enrollment agreement',
        'Attend new family orientation',
        'Receive curriculum and technology setup',
      ],
      expandedContent: {
        requirements: [
          'Signed enrollment agreement',
          'Technology check (internet speed, device compatibility)',
          'Calendar availability for orientation session',
        ],
        faqs: [
          {
            question: 'When can my child start?',
            answer:
              'Students can begin as soon as enrollment is confirmed and orientation is completed.',
          },
          {
            question: 'What technology is provided?',
            answer:
              'Solo Flights students receive a tablet. All students get access to our learning platform.',
          },
        ],
      },
    },
  ];

  const currentStep = steps.find((s) => !s.completed)?.id || steps[steps.length - 1].id;

  const faqs: EnrollmentFAQ[] = [
    {
      question: 'Is there an application fee?',
      answer: 'No, our application is completely free with no obligation.',
    },
    {
      question: 'How long does ESA approval take?',
      answer: "Typically 2-4 weeks, varying by state. We'll guide you through the entire process.",
    },
    {
      question: 'When can my child start?',
      answer: 'Students can begin as soon as enrollment is confirmed and orientation is completed.',
    },
  ];

  const borderColorAnimation = prefersReducedMotion
    ? { borderColor: '#002F6C' }
    : { borderColor: ['#e5e7eb', '#002F6C', '#B22234', '#002F6C'] };

  return {
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
  };
}
