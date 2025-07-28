'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, CheckCircle, School, Users } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import FormModal from '@/components/ui/form-modal';

const ESAFundingSection = () => {
  const [isESAFormOpen, setIsESAFormOpen] = useState(false);

  const fundingBenefits = [
    {
      icon: DollarSign,
      title: "100% Tuition Coverage",
      description: "Most families qualify for complete tuition funding through state programs"
    },
    {
      icon: CheckCircle,
      title: "Simple Application",
      description: "We guide you through the entire ESA application process"
    },
    {
      icon: School,
      title: "Approved Provider",
      description: "American Faith Academy is an approved ESA education provider"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team helps you maximize your educational funding benefits"
    }
  ];

  const eligibleStates = [
    "Arizona", "Florida", "Iowa", "Utah", "Tennessee",
    "New Hampshire", "Arkansas", "West Virginia", "Texas", "Alabama",
    "Georgia", "Louisiana"
  ];

  return (
    <section id="esa-funding" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center"
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(34, 197, 94, 0.4)",
                "0 0 0 30px rgba(34, 197, 94, 0)",
                "0 0 0 0 rgba(34, 197, 94, 0.4)"
              ]
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <DollarSign className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Tuition-Free Education for Most Families
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Thanks to ESA and state-based funding options, American Faith Academy is tuition-free 
            for most families. We\'ll help you navigate the process to secure funding for your child\'s education.
          </p>
        </AnimatedSection>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {fundingBenefits.map((benefit, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* State Eligibility */}
        <AnimatedSection delay={0.5}>
          <div className="bg-navy text-white rounded-2xl p-8 mb-16">
            <h3 className="font-serif text-3xl font-bold mb-6 text-center">
              ESA-Eligible States
            </h3>
            <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
              If you live in one of these states, your child likely qualifies for 100% tuition coverage 
              through Education Savings Account (ESA) programs:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {eligibleStates.map((state, index) => (
                <motion.div
                  key={state}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  {state}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={0.7} className="text-center">
          <div className="bg-gradient-to-r from-patriot-50 to-navy-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="font-serif text-3xl font-bold text-navy mb-4">
              Ready to Learn About Your Funding Options?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Our expert team will guide you through the entire process, from checking eligibility 
              to completing your application. Most families are approved within 2-3 weeks.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsESAFormOpen(true)}
              >
                Check Eligibility & Funding Options
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ESA / Scholarship Funding Form Modal */}
      <FormModal
        isOpen={isESAFormOpen}
        onClose={() => setIsESAFormOpen(false)}
        formId="RrLKlFElXjPdY9uxcAu6"
        formHeight="903px"
        formTitle="ESA / Scholarship Funding Information"
      />
    </section>
  );
};

export default ESAFundingSection;