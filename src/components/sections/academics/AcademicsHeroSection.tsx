'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Brain, Heart, Target } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import BaseHeroSection from '@/components/sections/BaseHeroSection';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/hooks';
import type { LucideIcon } from 'lucide-react';

interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

const AcademicsHeroSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const highlights: Highlight[] = [
    {
      icon: BookOpen,
      title: "Classical Foundation",
      description: "Time-tested Trivium approach: Grammar, Logic, Rhetoric"
    },
    {
      icon: Brain,
      title: "AI-Enhanced Learning",
      description: "Personalized instruction adapted to each student's needs"
    },
    {
      icon: Heart,
      title: "Biblical Integration",
      description: "Scripture woven throughout all subjects and activities"
    },
    {
      icon: Target,
      title: "Real-World Application",
      description: "Practical skills for college, career, and life success"
    }
  ];

  return (
    <section 
      className="py-20 bg-gradient-to-br from-navy-50 via-white to-patriot-50"
      aria-labelledby="academics-hero-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <BaseHeroSection
            title="Education That Transforms Hearts, Minds, and Futures"
            subtitle="Where Biblical Truth Meets Classical Excellence in a Flexible Learning Environment"
            description={
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  At American Faith Academy, we believe that how you learn matters more than what you learn.
                  Our classical Christian approach develops critical thinking skills, moral character, and
                  a love of learning that lasts a lifetime.
                </p>
                <p>
                  We don't just teach students what to think—we teach them how to think, how to learn,
                  and how to discover truth through the lens of Scripture.
                </p>
              </div>
            }
            cta={
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500"
                  asChild
                >
                  <Link href="/admissions" aria-label="Explore our curriculum and academic programs">
                    Explore Our Curriculum
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-navy"
                  asChild
                >
                  <Link href="/contact" aria-label="Schedule a consultation with our admissions team">
                    Schedule a Consultation
                  </Link>
                </Button>
              </div>
            }
          />

          {/* Highlights Grid */}
          <AnimatedSection delay={0.3}>
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              role="list"
              aria-label="Academic program highlights"
            >
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    role="listitem"
                  >
                    <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group h-full focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy">
                      <CardContent className="p-0">
                        <motion.div 
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          role="presentation"
                        >
                          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                        </motion.div>
                        
                        <h3 className="font-serif text-xl font-bold text-navy mb-3">
                          {highlight.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {highlight.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AcademicsHeroSection;
