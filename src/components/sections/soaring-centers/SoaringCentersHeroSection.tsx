'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, TrendingUp, Heart, ChevronDown, GraduationCap, BookOpen, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import BaseHeroSection from '@/components/sections/BaseHeroSection';
import Link from 'next/link';
import FormModal from '@/components/ui/form-modal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// TypeScript interfaces
interface Opportunity {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FloatingElement {
  icon: LucideIcon;
  delay: number;
  x: string;
  y: string;
}

const SoaringCentersHeroSection = () => {
  const [isSoaringFormOpen, setIsSoaringFormOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Add smooth scrolling behavior with parallax effect
    const handleScroll = () => {
      if (heroRef.current && !prefersReducedMotion) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [prefersReducedMotion]);
  
  const opportunities: Opportunity[] = [
    {
      icon: Building2,
      title: "Church Partnership",
      description: "Transform your church into a thriving learning center"
    },
    {
      icon: Users,
      title: "Edupreneur Program",
      description: "Build a successful education business in your community"
    },
    {
      icon: TrendingUp,
      title: "Proven Growth",
      description: "Join our expanding network of successful centers"
    },
    {
      icon: Heart,
      title: "Kingdom Impact",
      description: "Make a lasting difference in children's lives"
    }
  ];

  const floatingElements: FloatingElement[] = [
    { icon: Building2, delay: 0, x: '10%', y: '20%' },
    { icon: GraduationCap, delay: 1, x: '80%', y: '30%' },
    { icon: BookOpen, delay: 2, x: '15%', y: '70%' },
    { icon: Heart, delay: 1.5, x: '85%', y: '60%' },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-patriot-50 via-white to-navy-50"
      aria-labelledby="soaring-centers-hero-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B22234' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className="absolute text-patriot-200"
            style={{ left: element.x, top: element.y }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 6,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          >
            <Icon className="w-12 h-12 opacity-30" aria-hidden="true" />
          </motion.div>
        );
      })}
      
      <div className="container mx-auto px-4 relative z-10" ref={heroRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <BaseHeroSection
            title="Transform Your Community Through Classical Christian Education"
            titleId="soaring-centers-hero-heading"
            subtitle="Make a Difference While Making a Living—Or Fulfill Your Church's Educational Mission"
            description={
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  Join the American Faith Academy network and bring exceptional classical Christian
                  education to your community. Whether you're a church looking to expand your ministry
                  or an entrepreneur passionate about education, we provide everything you need to succeed.
                </p>
                <p>
                  Our proven model combines the best of classical education with modern technology,
                  creating opportunities for both ministry impact and business success.
                </p>
              </div>
            }
            cta={
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-patriot"
                  onClick={() => setIsSoaringFormOpen(true)}
                  aria-label="Learn more about our church partnership program"
                >
                  Church Partnership
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-navy"
                  onClick={() => setIsSoaringFormOpen(true)}
                  aria-label="Learn more about our edupreneur program"
                >
                  Edupreneur Program
                </Button>
              </div>
            }
          />

          {/* Opportunities Grid */}
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list" aria-label="Soaring center opportunities">
              {opportunities.map((opportunity, index) => {
                const Icon = opportunity.icon;
                return (
                  <motion.div
                    key={index}
                    role="listitem"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group h-full focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy">
                      <CardContent className="p-0">
                        <motion.div 
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                          transition={prefersReducedMotion ? {} : { duration: 0.6 }}
                        >
                          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                        </motion.div>
                        
                        <h3 className="font-serif text-xl font-bold text-navy mb-3">
                          {opportunity.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {opportunity.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 1.5 }}
        >
          <p className="text-sm text-gray-500 mb-2">Discover Two Paths</p>
          <motion.button
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-patriot focus:outline-none"
            onClick={() => {
              const nextSection = document.querySelector('#two-paths');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll to discover two paths section"
          >
            <ChevronDown className="w-6 h-6 text-patriot" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      
      {/* Soaring Center Discovery / Edupreneur Form Modal */}
      <FormModal
        isOpen={isSoaringFormOpen}
        onClose={() => setIsSoaringFormOpen(false)}
        formId="NwX4RaS1RAnoDiIgMein"
        formHeight="893px"
        formTitle="Soaring Center Discovery"
      />
    </section>
  );
};

export default SoaringCentersHeroSection;