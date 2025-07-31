'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Building, ChevronDown, Check, Calendar, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';
import FormModal from '@/components/ui/form-modal';
import { usePrefersReducedMotion } from '@/hooks';

interface Program {
  icon: LucideIcon;
  title: string;
  price: string;
  features: string[];
  link: string;
  ctaText: string;
  color: string;
}

interface DayOption {
  days: number;
  title: string;
  description: string;
  icon: string;
  popular?: boolean;
}

const ProgramOptionsSection: React.FC = () => {
  const [showDayOptions, setShowDayOptions] = useState<boolean>(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const programs: Program[] = [
    {
      icon: Plane,
      title: "Solo Flights - Online Academy",
      price: "$3,500/year",
      features: [
        "Complete online curriculum platform",
        "Parent as primary educator with coaching",
        "Full schedule flexibility",
        "Perfect for traveling/rural families",
        "Includes tablet & learning materials"
      ],
      link: "/soaring-centers",
      ctaText: "Explore Solo Flights",
      color: "navy"
    },
    {
      icon: Building,
      title: "Soaring Centers - In-Person Community",
      price: "$4,000-$7,000",
      features: [
        "Professional teacher-led instruction",
        "Church partner locations",
        "1-5 day flexible scheduling",
        "Strong community connections",
        "Hands-on enrichment activities"
      ],
      link: "/soaring-centers",
      ctaText: "Find a Center",
      color: "patriot"
    }
  ];

  const dayOptions: DayOption[] = [
    {
      days: 1,
      title: "Discovery Day",
      description: "Enrichment focus with core academics",
      icon: "🌟"
    },
    {
      days: 2,
      title: "Scholar's Quest",
      description: "Core academics with collaborative learning",
      icon: "📚"
    },
    {
      days: 3,
      title: "Balanced Learning",
      description: "Perfect blend of structure and flexibility",
      popular: true,
      icon: "⚖️"
    },
    {
      days: 5,
      title: "Full Support",
      description: "Comprehensive academic and social development",
      icon: "🎯"
    }
  ];

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const dayOptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const expandableVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: "auto" }
  };

  return (
    <section 
      className="py-20 bg-white"
      aria-labelledby="program-options-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="program-options-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Solo Flights (online) or Soaring Centers (in-person) - both paths use our proven 
            classical Christian curriculum, tailored to your family's needs
          </p>
        </AnimatedSection>

        {/* Two-Path Comparison Cards */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12"
          role="list"
          aria-label="Program options"
        >
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.2}>
                <Card 
                  className="h-full group hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy"
                  role="listitem"
                >
                  <CardContent className="p-8">
                    {/* Price Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-navy-500 to-navy-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        role="presentation"
                      >
                        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </motion.div>
                      <div 
                        className="bg-patriot text-white px-4 py-2 rounded-lg font-semibold text-lg"
                        aria-label={`Price: ${program.price}`}
                      >
                        {program.price}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-bold text-navy mb-6">
                      {program.title}
                    </h3>

                    {/* Features List */}
                    <ul 
                      className="space-y-3 mb-8"
                      role="list"
                      aria-label={`Features of ${program.title}`}
                    >
                      {program.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          className="flex items-start space-x-3"
                          variants={featureVariants}
                          initial="hidden"
                          whileInView="visible"
                          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          role="listitem"
                        >
                          <div className="w-5 h-5 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" aria-hidden="true" />
                          </div>
                          <span className="text-gray-600 leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link href={program.link}>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold py-6 text-lg transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-navy"
                        aria-label={`${program.ctaText} - Learn more about ${program.title}`}
                      >
                        {program.ctaText}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Expandable Day Options Section */}
        <AnimatedSection delay={0.4}>
          <div className="max-w-4xl mx-auto">
            <motion.button
              onClick={() => setShowDayOptions(!showDayOptions)}
              className="mx-auto flex items-center space-x-2 text-navy hover:text-patriot transition-colors duration-300 font-semibold text-lg mb-8 focus:ring-2 focus:ring-offset-2 focus:ring-navy rounded-md p-2"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              aria-expanded={showDayOptions}
              aria-controls="day-options-panel"
              aria-label="View Soaring Center day options - click to expand"
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <span>View Soaring Center Day Options</span>
              <motion.div
                animate={{ rotate: showDayOptions ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {showDayOptions && (
                <motion.div
                  id="day-options-panel"
                  variants={expandableVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                  role="region"
                  aria-label="Soaring Center day options"
                >
                  <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3"
                    role="list"
                    aria-label="Available day options"
                  >
                    {dayOptions.map((option, index) => (
                      <motion.div
                        key={index}
                        variants={dayOptionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.1 }}
                        role="listitem"
                      >
                        <Card className="relative h-full hover:shadow-lg transition-all duration-300 border-2 border-gray-100 overflow-visible focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy">
                          {option.popular && (
                            <div 
                              className="absolute -top-2 right-4 bg-patriot text-white px-3 py-1 rounded-full text-xs font-semibold z-10"
                              aria-label="Most popular option"
                            >
                              Most Popular
                            </div>
                          )}
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl mb-3" aria-hidden="true">{option.icon}</div>
                            <div 
                              className="text-4xl font-bold text-navy mb-2"
                              aria-label={`${option.days} ${option.days === 1 ? 'day' : 'days'} per week`}
                            >
                              {option.days}
                            </div>
                            <div className="text-sm text-gray-500 mb-3">
                              {option.days === 1 ? 'Day/Week' : 'Days/Week'}
                            </div>
                            <h4 className="font-serif text-lg font-bold text-navy mb-2">
                              {option.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {option.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.6} className="text-center mt-16">
          <div 
            className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 border border-gray-200 max-w-3xl mx-auto"
            role="region"
            aria-labelledby="program-cta-heading"
          >
            <h3 
              id="program-cta-heading"
              className="font-serif text-2xl font-bold text-navy mb-4"
            >
              Ready to Choose Your Path?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Both paths lead to the same excellent education. The choice is about what works best for your family.
            </p>
            <Button 
              size="lg" 
              className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500"
              onClick={() => setIsApplicationOpen(true)}
              aria-label="Begin your application - opens application form"
            >
              Begin Your Application
            </Button>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Admissions Application Form Modal */}
      <FormModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        formId="ZA1Leng5sS8fX1f5nkuU"
        formHeight="1165px"
        formTitle="Admissions Application"
      />
    </section>
  );
};

export default ProgramOptionsSection;
