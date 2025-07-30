'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, DollarSign } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import BaseHeroSection from '@/components/sections/BaseHeroSection';
import Link from 'next/link';
import FormModal from '@/components/ui/form-modal';
import CalendarModal from '@/components/ui/calendar-modal';

const AdmissionsHeroSection = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const processSteps = [
    {
      icon: Users,
      title: "Apply Online",
      description: "Complete our simple online application (15-20 minutes)"
    },
    {
      icon: CheckCircle,
      title: "Submit Documents",
      description: "Upload records and complete assessment (3 days processing)"
    },
    {
      icon: DollarSign,
      title: "Secure Funding",
      description: "We guide you through funding options (2-4 weeks)"
    },
    {
      icon: Clock,
      title: "Enrollment Confirmation",
      description: "Finalize enrollment and begin your AFA journey (1 week)"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-patriot-50 via-white to-navy-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <BaseHeroSection
            title="The Best Choice You Can Make For Your Child's Future Is Only A Few Steps Away"
            subtitle="A Simple & Supportive Process"
            description={
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  Starting your child's journey at American Faith Academy is straightforward and supportive.
                  Our admissions team is here to guide you through every step, ensuring you have all the
                  information you need to make the best decision for your family.
                </p>
                <p>
                  With flexible learning options and comprehensive support, we make it easy for families
                  to access exceptional classical Christian education.
                </p>
              </div>
            }
            cta={
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsApplicationOpen(true)}
                >
                  Start Enrollment Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                  onClick={() => setIsCalendarOpen(true)}
                >
                  Schedule Discovery Call
                </Button>
              </div>
            }
          >
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: "95%", label: "Family Satisfaction" },
                { number: "48hrs", label: "Response Time" },
                { number: "100%", label: "Support Guarantee" },
                { number: "$0", label: "Application Fee" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl font-bold text-patriot mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </BaseHeroSection>

          {/* Process Steps */}
          <AnimatedSection delay={0.3}>
            <div className="space-y-6">
              <h3 className="font-serif text-3xl font-bold text-navy text-center mb-8">
                Your Enrollment Journey
              </h3>
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <step.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="w-8 h-8 bg-patriot text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                              {index + 1}
                            </span>
                            <h4 className="font-serif text-xl font-bold text-navy">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

      </div>
      
      {/* Admissions Application Form Modal */}
      <FormModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        formId="ZA1Leng5sS8fX1f5nkuU"
        formHeight="1165px"
        formTitle="Admissions Application"
      />
      
      {/* Calendar Modal for Discovery Call */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </section>
  );
};

export default AdmissionsHeroSection;
