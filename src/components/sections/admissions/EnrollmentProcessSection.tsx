'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Monitor, 
  FileText, 
  DollarSign, 
  CheckCircle, 
  ChevronDown, 
  Clock,
  ArrowRight
} from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import FormModal from '@/components/ui/form-modal';
import CalendarModal from '@/components/ui/calendar-modal';

const EnrollmentProcessSection = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Apply Online",
      duration: "15-20 minutes",
      icon: Monitor,
      status: "Start here",
      shortDescription: "Complete our simple online application",
      details: [
        "Complete simple online application",
        "Provide basic family and student information",
        "No commitment required"
      ],
      expandedContent: {
        requirements: [
          "Student's basic information (name, date of birth, grade)",
          "Parent/guardian contact information",
          "Current or previous school information (optional)"
        ],
        faqs: [
          {
            question: "Is there an application fee?",
            answer: "No, our application is completely free with no obligation."
          },
          {
            question: "What if I need to pause and come back?",
            answer: "Your progress is saved automatically. You can return anytime."
          }
        ]
      },
      cta: {
        text: "Start Application",
        primary: true,
        action: () => setIsApplicationOpen(true)
      }
    },
    {
      number: 2,
      title: "Submit Documents & Assessment",
      duration: "3 days processing",
      icon: FileText,
      shortDescription: "Upload records and complete assessment",
      details: [
        "Upload previous academic records",
        "Complete student assessment",
        "Our team reviews and provides feedback"
      ],
      expandedContent: {
        requirements: [
          "Previous year's report card or transcript",
          "Any IEP or 504 documentation (if applicable)",
          "Immunization records (for in-person programs)"
        ],
        faqs: [
          {
            question: "What if I don't have all documents?",
            answer: "We can work with you to gather necessary information. Start with what you have."
          },
          {
            question: "How long is the assessment?",
            answer: "The placement assessment takes 30-45 minutes and helps us understand your child's learning level."
          }
        ]
      }
    },
    {
      number: 3,
      title: "Secure Funding",
      duration: "2-4 weeks",
      icon: DollarSign,
      shortDescription: "We guide you through funding options",
      details: [
        "Work with AFA team for ESA funding",
        "Explore SGO partner options",
        "Finalize payment arrangements"
      ],
      expandedContent: {
        requirements: [
          "State residency verification",
          "Household income information (for some programs)",
          "Previous year's tax return (for income-based programs)"
        ],
        faqs: [
          {
            question: "What if I don't qualify for ESA?",
            answer: "We offer multiple funding options including payment plans and partner scholarships."
          },
          {
            question: "How long does ESA approval take?",
            answer: "Typically 2-4 weeks, varying by state. We'll guide you through the entire process."
          }
        ]
      }
    },
    {
      number: 4,
      title: "Enrollment Confirmation",
      duration: "1 week to complete",
      icon: CheckCircle,
      status: "Welcome to AFA!",
      shortDescription: "Finalize enrollment and get started",
      details: [
        "Review and sign enrollment agreement",
        "Attend new family orientation",
        "Receive curriculum and technology setup"
      ],
      expandedContent: {
        requirements: [
          "Signed enrollment agreement",
          "Technology check (internet speed, device compatibility)",
          "Calendar availability for orientation session"
        ],
        faqs: [
          {
            question: "When can my child start?",
            answer: "Students can begin as soon as enrollment is confirmed and orientation is completed."
          },
          {
            question: "What technology is provided?",
            answer: "Solo Flights students receive a tablet. All students get access to our learning platform."
          }
        ]
      }
    }
  ];

  const toggleExpanded = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <section id="enrollment" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Simple 4-Step Enrollment Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            From application to first day - we guide you through every step
          </p>
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <Clock className="w-5 h-5 text-patriot mr-2" />
            <span className="text-gray-700 font-medium">Complete in 3-6 weeks</span>
          </div>
        </AnimatedSection>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative max-w-6xl mx-auto mb-16">
          {/* Progress Line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gray-200">
            <motion.div 
              className="h-full bg-gradient-to-r from-navy-500 to-patriot-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.15}>
                <div className="relative">
                  {/* Step Number Circle */}
                  <motion.div 
                    className="w-12 h-12 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
                    whileInView={{ 
                      borderColor: ["#e5e7eb", "#002F6C", "#B22234", "#002F6C"] 
                    }}
                    transition={{ 
                      duration: 2, 
                      times: [0, 0.3, 0.6, 1],
                      delay: index * 0.15 
                    }}
                    viewport={{ once: true }}
                  >
                    <span className="font-bold text-navy">{step.number}</span>
                  </motion.div>

                  {/* Step Card */}
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white h-full">
                    <CardContent className="p-6">
                      {/* Icon & Status */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-lg flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-navy" />
                        </div>
                        {step.status && (
                          <span className="text-xs font-semibold text-patriot bg-patriot-50 px-2 py-1 rounded-full">
                            {step.status}
                          </span>
                        )}
                      </div>

                      {/* Title & Duration */}
                      <h3 className="font-serif text-xl font-bold text-navy mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">{step.duration}</p>

                      {/* Short Description */}
                      <p className="text-gray-600 mb-4">{step.shortDescription}</p>

                      {/* Details List */}
                      <ul className="space-y-2 mb-4">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-patriot rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      {/* CTA or Expand Button */}
                      {step.cta ? (
                        <Button 
                          className={`w-full ${step.cta.primary ? 'bg-patriot hover:bg-patriot-600 text-white' : 'bg-white border-2 border-navy text-navy hover:bg-navy hover:text-white'}`}
                          onClick={step.cta.action}
                        >
                          {step.cta.text}
                        </Button>
                      ) : (
                        <button
                          onClick={() => toggleExpanded(step.number)}
                          className="w-full text-navy hover:text-patriot font-medium text-sm flex items-center justify-center space-x-1 transition-colors"
                        >
                          <span>Learn More</span>
                          <motion.div
                            animate={{ rotate: expandedStep === step.number ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedStep === step.number && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                      >
                        <Card className="border-2 border-navy-100">
                          <CardContent className="p-6">
                            <h4 className="font-semibold text-navy mb-3">Requirements:</h4>
                            <ul className="space-y-1 mb-4">
                              {step.expandedContent.requirements.map((req, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>

                            <h4 className="font-semibold text-navy mb-3">Frequently Asked Questions:</h4>
                            {step.expandedContent.faqs.map((faq, idx) => (
                              <div key={idx} className="mb-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">{faq.question}</p>
                                <p className="text-sm text-gray-600">{faq.answer}</p>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
              <motion.div 
                className="w-full bg-gradient-to-b from-navy-500 to-patriot-500"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <AnimatedSection key={step.number} delay={index * 0.1}>
                  <div className="relative flex">
                    {/* Step Number Circle */}
                    <motion.div 
                      className="w-12 h-12 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                      whileInView={{ 
                        borderColor: ["#e5e7eb", "#002F6C", "#B22234", "#002F6C"] 
                      }}
                      transition={{ 
                        duration: 2, 
                        times: [0, 0.3, 0.6, 1],
                        delay: index * 0.1 
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="font-bold text-navy">{step.number}</span>
                    </motion.div>

                    {/* Step Content */}
                    <div className="ml-6 flex-1">
                      <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white">
                        <CardContent className="p-6">
                          {/* Icon & Status */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-lg flex items-center justify-center">
                              <step.icon className="w-5 h-5 text-navy" />
                            </div>
                            {step.status && (
                              <span className="text-xs font-semibold text-patriot bg-patriot-50 px-2 py-1 rounded-full">
                                {step.status}
                              </span>
                            )}
                          </div>

                          {/* Title & Duration */}
                          <h3 className="font-serif text-lg font-bold text-navy mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">{step.duration}</p>

                          {/* Short Description */}
                          <p className="text-gray-600 text-sm mb-3">{step.shortDescription}</p>

                          {/* Details List */}
                          <ul className="space-y-1 mb-4">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-patriot rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>

                          {/* CTA or Expand Button */}
                          {step.cta ? (
                            <Button 
                              className={`w-full ${step.cta.primary ? 'bg-patriot hover:bg-patriot-600 text-white' : 'bg-white border-2 border-navy text-navy hover:bg-navy hover:text-white'}`}
                              onClick={step.cta.action}
                            >
                              {step.cta.text}
                            </Button>
                          ) : (
                            <button
                              onClick={() => toggleExpanded(step.number)}
                              className="w-full text-navy hover:text-patriot font-medium text-sm flex items-center justify-center space-x-1 transition-colors"
                            >
                              <span>Learn More</span>
                              <motion.div
                                animate={{ rotate: expandedStep === step.number ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </motion.div>
                            </button>
                          )}

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {expandedStep === step.number && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 overflow-hidden"
                              >
                                <div className="border-t pt-4">
                                  <h4 className="font-semibold text-navy mb-2 text-sm">Requirements:</h4>
                                  <ul className="space-y-1 mb-3">
                                    {step.expandedContent.requirements.map((req, idx) => (
                                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        {req}
                                      </li>
                                    ))}
                                  </ul>

                                  <h4 className="font-semibold text-navy mb-2 text-sm">FAQs:</h4>
                                  {step.expandedContent.faqs.map((faq, idx) => (
                                    <div key={idx} className="mb-2">
                                      <p className="text-xs font-medium text-gray-700 mb-0.5">{faq.question}</p>
                                      <p className="text-xs text-gray-600">{faq.answer}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.6} className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-navy mb-4">
              Join 1,000+ Families Who've Completed This Process
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Questions about enrollment? Our team is here to help every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsApplicationOpen(true)}
              >
                Start Your Application
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                onClick={() => setIsCalendarOpen(true)}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Application Form Modal */}
      <FormModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        formId="ZA1Leng5sS8fX1f5nkuU"
        formHeight="1165px"
        formTitle="Admissions Application"
      />
      
      {/* Calendar Modal for Schedule Consultation */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </section>
  );
};

export default EnrollmentProcessSection;